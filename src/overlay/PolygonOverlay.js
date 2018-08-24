import Parameter from './base/Parameter.js';
import Color from '../common/Color.js';
import {
    clearPushArray
} from '../common/util.js';
import PolygonConfig from '../config/PolygonConfig.js';
import State from '../config/OnStateConfig.js';


export default class PolygonOverlay extends Parameter {
    constructor(ops) {
        super(PolygonConfig, ops);
        this._patchSplitList();
        this._state = null;
    }
    _parameterInit() {
        this._initLegend();
    }
    _initLegend() {
        this._compileSplitList(this._styleConfig.colors, this._getTransformData());
        this._patchSplitList();
        this._setlegend(this._legendConfig, this._styleConfig.splitList);
    }
    /**
     * 设置选中集合，但不会触发绘画
     * 
     * @memberof Parameter
     */
    _setSelectedList(list) {
        clearPushArray(this._selectItem, list);
    }
    _clearSelectedList() {
        clearPushArray(this._selectItem);
    }
    _getSelectedList() {
        return this._selectItem;
    }
    _translation(distanceX, distanceY) {
        for (let i = 0; i < this._workerData.length; i++) {
            let geometry = this._workerData[i].geometry;
            let pixels = geometry.pixels;
            if (geometry.type == 'MultiPolygon') {
                for (let j = 0; j < pixels.length; j++) {
                    let pixelItem = pixels[j];
                    for (let k = 0, len = pixelItem.length; k < len; k++) {
                        let pixels = pixelItem[k];
                        for (let n = 0; n < pixels.length; n++) {
                            let pixel = pixels[n];
                            pixel[0] = pixel[0] + distanceX;
                            pixel[1] = pixel[1] + distanceY;
                        }
                    }
                }
            } else {
                for (let j = 0; j < pixels.length; j++) {
                    let pixelItem = pixels[j];
                    for (let k = 0, len = pixelItem.length; k < len; k++) {
                        let pixel = pixelItem[k];
                        pixel[0] = pixel[0] + distanceX;
                        pixel[1] = pixel[1] + distanceY;
                    }
                }
            }

            let labelPixels = geometry.labelPixels;
            for (let j = 0; j < labelPixels.length; j++) {
                let bestCell = labelPixels[j];
                if (bestCell) {
                    bestCell.x = bestCell.x + distanceX;
                    bestCell.y = bestCell.y + distanceY;
                }

            }

        }
        this.refresh();
    }
    setOptionStyle(ops) {
        this._setStyle(this._option, ops);
    }
    _setState(val) {
        this._state = val;
        this._eventConfig.onState.call(this, this._state);
    }
    _onOptionChange() {
        this._map && this._initLegend();
    }
    _onDataChange() {
        this._map && this._initLegend();
    }
    /**
     * 颜色等分策略
     * @param {} data 
     */
    _compileSplitList(colors, data) {

        if (colors.length <= 0) return;
        data = data.sort((a, b) => {
            return parseFloat(a.count) - parseFloat(b.count);
        });
        let splitCount = data.length / colors.length;
        let colorIndex = 0;
        let split = [];
        let star = 0,
            end = 0;

        for (let i = 0; i < data.length; i++) {

            if (i > splitCount * (colorIndex + 1)) {
                if (split.length == 0) {
                    star = data[0].count;
                }

                end = data[i].count;

                split.push({
                    start: star,
                    end: end,
                    backgroundColor: colors[colorIndex],
                });
                colorIndex++;
                star = data[i].count;
            }
        }
        //去除最后判断区间，防止区间遗漏
        if (split.length > 0) {
            split.push({
                start: star,
                end: null,
                backgroundColor: colors[colorIndex],
            });

        }
        let result = [];
        for (let i = 0; i < split.length; i++) {
            let item = split[i];
            if (item.start != item.end) {
                item.backgroundColor = colors[result.length];
                result.push(item);
            }
        }

        this._styleConfig.splitList = result;
    }
    _patchSplitList() {
        let normal = this._styleConfig.normal;
        if (normal.borderWidth != null && normal.borderColor == null) {
            normal.borderColor = (new Color(normal.backgroundColor)).getRgbaValue();
        }
        let splitList = this._styleConfig.splitList;
        for (let i = 0; i < splitList.length; i++) {
            let condition = splitList[i];
            if ((condition.borderWidth != null || normal.borderColor != null) && condition.borderColor == null) {
                condition.borderColor = (new Color(condition.backgroundColor)).getRgbaValue();
            }
        }

    }
    _toDraw() {
        this._drawMap();
    }
    _getGeoCenter(geo) {
        let minX = geo[0][0];
        let minY = geo[0][1];
        let maxX = geo[0][0];
        let maxY = geo[0][1];
        for (let i = 1; i < geo.length; i++) {
            minX = Math.min(minX, geo[i][0]);
            maxX = Math.max(maxX, geo[i][0]);
            minY = Math.min(minY, geo[i][1]);
            maxY = Math.max(maxY, geo[i][1]);
        }
        return [minX + (maxX - minX) / 2, minY + (maxY - minY) / 2];
    }
    _getMaxWidth(geo) {
        let minX = geo[0][0];
        let minY = geo[0][1];
        let maxX = geo[0][0];
        let maxY = geo[0][1];
        for (let i = 1; i < geo.length; i++) {
            minX = Math.min(minX, geo[i][0]);
            maxX = Math.max(maxX, geo[i][0]);
            minY = Math.min(minY, geo[i][1]);
            maxY = Math.max(maxY, geo[i][1]);
        }
        return maxX - minX;
    }

    _findIndexSelectItem(item) {
        let index = -1;
        if (item) {
            index = this._selectItem.findIndex(function (val) {
                return val && val.name == item.name;
            });
        }
        return index;
    }
    refresh() {

        this._setState(State.drawBefore);
        this._clearCanvas();
        this._drawLine(this.getData());
        this._setState(State.drawAfter);
    }
    _drawMap() {
        this._setState(State.computeBefore);
        let parameter = {
            data: this._getTransformData(),
            enable: this._styleConfig.normal.label.enable
        };

        this._postMessage('PolygonOverlay.calculatePixel', parameter, (pixels, margin) => {
            if (this._eventType == 'onmoving') {
                return;
            }
            this._setWorkerData(pixels);
            this._setState(State.conputeAfter);
            this._translation(margin.left - this._margin.left, margin.top - this._margin.top);
            pixels = null, margin = null;
        });
    }
    _getTarget(x, y) {
        let data = this.getData();
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let geometry = item.geometry;
            let pixels = geometry.pixels;

            if (geometry.type == 'MultiPolygon') {
                for (let k = 0; k < pixels.length; k++) {
                    if (this._containPolygon(x, y, pixels[k])) {
                        return {
                            index: i,
                            item: item
                        };
                    }
                }

            } else {
                if (this._containPolygon(x, y, pixels)) {
                    return {
                        index: i,
                        item: item
                    };
                }

            }

            pixels = null, geometry = null, item = null;
        }

        return {
            index: -1,
            item: null
        };
    }
    _drawData(pixelItem) {

        if (pixelItem.length == 0)
            return;
        let pixel = pixelItem[0];
        this._ctx.moveTo(pixel[0], pixel[1]);
        for (let k = 1, len = pixelItem.length; k < len; k++) {
            let item = pixelItem[k];
            if (pixel[0] != item[0] && pixel[1] != item[1]) {
                this._ctx.lineTo(pixelItem[k][0], pixelItem[k][1]);
                pixel = item;
            }
        }
    }
    _containPolygon(x, y, pixels) {
        let outerRace = false;
        for (let j = 0; j < pixels.length; j++) {
            this._ctx.beginPath();
            let pixelItem = pixels[j];
            if (j == 0) {
                this._drawData(pixelItem);
                this._ctx.closePath();
                if (this._ctx.isPointInPath(x * this._devicePixelRatio, y * this._devicePixelRatio)) {
                    outerRace = true;
                } else {
                    return false;
                }
            } else {

                this._drawData(pixelItem);
                this._ctx.closePath();
                //内环包含
                if (this._ctx.isPointInPath(x * this._devicePixelRatio, y * this._devicePixelRatio)) {
                    return false;
                }
            }

        }
        return outerRace;
    }
    _drawPolygon(pixels, style) {

        for (let j = 0; j < pixels.length; j++) {
            this._ctx.save();
            this._ctx.beginPath();
            let pixelItem = pixels[j];
            if (j == 0) {
                this._drawData(pixelItem);
                this._ctx.closePath();
                this._ctx.fill();
            } else {
                this._drawData(pixelItem);
                this._ctx.clip();
                this._clearCanvas();
            }
            this._ctx.strokeStyle = style.borderColor;
            this._ctx.lineWidth = style.borderWidth;
            this._ctx.stroke();
            this._ctx.restore();
            pixelItem = null;

        }
    }
    _drawLine(data) {
        this._ctx.lineCap = 'round';
        this._ctx.lineJoin = 'round';
        this._ctx.miterLimit = 4;
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let geometry = item.geometry;
            let pixels = geometry.pixels;
            let style = this._setDrawStyle(item, true);
            this._ctx.beginPath();
            this._ctx.shadowColor = style.shadowColor || 'transparent';
            this._ctx.shadowBlur = style.shadowBlur || 10;
            this._ctx.shadowOffsetX = 0;
            this._ctx.shadowOffsetY = 0;
            this._ctx.fillStyle = style.backgroundColor;
            if (geometry.type == 'MultiPolygon') {
                for (let k = 0; k < pixels.length; k++) {
                    this._drawPolygon(pixels[k], style);
                }

            } else {
                this._drawPolygon(pixels, style);
            }

            if (this._styleConfig.normal.label.show) {
                let labelPixels = geometry.labelPixels;
                this._ctx.shadowBlur = 0;
                this._ctx.lineWidth = style.label.lineWidth;
                this._ctx.font = style.label.font;
                this._ctx.fillStyle = style.label.color;
                for (let j = 0; j < labelPixels.length; j++) {
                    let bestCell = labelPixels[j];
                    this._ctx.beginPath();
                    let width = this._ctx.measureText(item.name).width;
                    if (geometry.type == 'MultiPolygon') {
                        let maxPixels = [];
                        for (let k = 0; k < pixels.length; k++) {
                            let item = pixels[k][0];
                            if (item.length > maxPixels.length) {
                                maxPixels = item;
                                bestCell = labelPixels[k];
                            }
                            item = null;
                        }
                        if (bestCell && item.name && this._getMaxWidth(maxPixels) > width) {
                            this._ctx.fillText(item.name, bestCell.x - width / 2, bestCell.y);
                        }
                        maxPixels = null;
                    } else {
                        if (bestCell && item.name && this._getMaxWidth(pixels[j]) > width) {
                            this._ctx.fillText(item.name, bestCell.x - width / 2, bestCell.y);
                        }
                    }

                    bestCell = null, width = null;
                }
                labelPixels = null;
            }
            style = null, pixels = null, geometry = null, item = null;
        }
        this._ctx.closePath();
    }
}