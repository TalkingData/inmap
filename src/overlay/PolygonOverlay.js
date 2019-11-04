import Parameter from './base/Parameter.js';
import Color from '../common/Color.js';
import {
    clearPushArray,
    geoJsonPolygonRectangle
} from '../common/Util.js';
import PolygonConfig from '../config/PolygonConfig.js';
import State from '../config/OnStateConfig.js';


export default class PolygonOverlay extends Parameter {
    constructor(ops) {
        super(PolygonConfig, ops);
        this._TRightClick = this._TRightClick.bind(this);
        this._subscriptions = {
            onMouseClick: [],
            onMouseOver: [],
            onMouseLeave: [],
            onRightClick: [],
            onState: [],
            onInit: [],
            isInit: true,
            preEmitName: null
        };

        this._patchSplitList();
        this._state = null;
        this._customZoom = null;
        if (!this._styleConfig.isHighlight) {
            this._swopData = () => {};
        }
        this._bindEmit();
    }
    _parameterInit() {
        this._initLegend();
        this._map.addEventListener('rightclick', this._TRightClick);
    }
    _initLegend() {
        const splitList = this._styleConfig.splitList;
        if (splitList.length === 0) {
            this._compileSplitList(this._styleConfig.colors, this._getTransformData());
        }
        this._patchSplitList();
        this._setLegend(this._legendConfig, this._styleConfig.splitList);
    }

    setCustomZoom(zoom) {
        this._customZoom = zoom;
        this._drawMap();
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
    setOptionStyle(ops, callback) {
        this._setStyle(this._option, ops, callback);
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

        data.length > 0 && split.push({
            start: star,
            end: null,
            backgroundColor: colors[colorIndex],
        });

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
    _toDraw(callback) {
        this._drawMap(callback);
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
    _TRightClick(event) {
        if (this._eventType == 'onmoving') return;

        let result = this._getTarget(event.pixel.x, event.pixel.y);
        if (result.index == -1) {
            return;
        }

        this._emit('onRightClick', [result.item], event, this);
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
        this._drawPolygon(this.getRenderData());
        this._setState(State.drawAfter);
    }
    _drawMap(callback) {
        this._setState(State.computeBefore);
        let parameter = {
            data: this._getTransformData(),
            enable: this._styleConfig.normal.label.enable,
            centerType: this._styleConfig.normal.label.centerType,
            customZoom: this._customZoom
        };
        this._postMessage('PolygonOverlay.calculatePixel', parameter, (pixels, margin) => {
            this._setWorkerData(pixels);
            if (this._eventType == 'onmoving') {
                return;
            }
            this._setState(State.computeAfter);
            this._translation(margin.left - this._margin.left, margin.top - this._margin.top);
            pixels = null, margin = null;
            callback && callback(this);
            this._emitInit();
        });
    }

    pushData(data, callback) {
        if (!Array.isArray(data)) return;
        this._setState(State.computeBefore);
        let parameter = {
            data: data,
            enable: this._styleConfig.normal.label.enable,
            centerType: this._styleConfig.normal.label.centerType,
            customZoom: this._customZoom
        };


        this._postMessage('PolygonOverlay.calculatePixel', parameter, (pixels, margin) => {
            if (this._eventType == 'onmoving') {
                return;
            }
            this._workerData.push(...pixels);
            this._setState(State.computeAfter);
            if (data.length > 0 && data.length === this._workerData.length && this._styleConfig.splitList == 0) {
                this._initLegend();
            }
            this._translation(margin.left - this._margin.left, margin.top - this._margin.top);
            pixels = null, margin = null;
            callback && callback(this);
        });
    }

    _getTarget(x, y) {
        let data = this.getRenderData();
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
            if (pixel[0] != item[0] || pixel[1] != item[1]) {
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
    _drawPath(pixels, style) {

        for (let j = 0; j < pixels.length; j++) {
            this._ctx.save();
            this._ctx.beginPath();
            if (style.borderStyle == 'dashed') {
                if (style.dashed) {
                    this._ctx.setLineDash(style.dashed);
                } else {
                    this._ctx.setLineDash([style.borderWidth * 10, style.borderWidth * 3]);
                }
            }

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
    _drawPolygon(data) {
        this._ctx.lineCap = 'round';
        this._ctx.lineJoin = 'round';
        this._ctx.miterLimit = 4;
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let geometry = item.geometry;
            let pixels = geometry.pixels;
            let style = this._setDrawStyle(item, true, i);
            this._ctx.beginPath();
            this._ctx.shadowColor = style.shadowColor || 'transparent';
            this._ctx.shadowBlur = style.shadowBlur || 0;
            this._ctx.shadowOffsetX = 0;
            this._ctx.shadowOffsetY = 0;
            this._ctx.fillStyle = style.backgroundColor;
            if (geometry.type == 'MultiPolygon') {
                for (let k = 0; k < pixels.length; k++) {
                    this._drawPath(pixels[k], style);
                }

            } else {
                this._drawPath(pixels, style);
            }
            style = null, pixels = null, geometry = null, item = null;
            this._ctx.closePath();
        }

        if (this._styleConfig.normal.label.show) {
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                let geometry = item.geometry;
                let pixels = geometry.pixels;
                let style = this._setDrawStyle(item, true, i);
                let labelPixels = geometry.labelPixels;
                this._ctx.shadowBlur = 0;
                this._ctx.lineWidth = style.label.lineWidth;
                this._ctx.font = style.label.font;
                this._ctx.fillStyle = style.label.color;
                for (let j = 0; j < labelPixels.length; j++) {
                    let bestCell = labelPixels[j];

                    this._ctx.beginPath();

                    if (geometry.type == 'MultiPolygon') {
                        let maxPixels = [];
                        for (let k = 0; k < pixels.length; k++) {
                            let item = pixels[k][0];
                            if (item.length > maxPixels.length) {
                                maxPixels = item;
                                bestCell = labelPixels[k];
                            }
                        }
                        this._drawLabel(bestCell, item, maxPixels, style);

                    } else {
                        this._drawLabel(bestCell, item, pixels[j], style);
                    }
                }
            }
        }
    }
    _compileTooltipTemplate(formatter) {
        //语法解析 先暂时不支持ie11
        let RexStr = /\{|\}/g;
        formatter = formatter.replace(RexStr, function (MatchStr) {
            switch (MatchStr) {
                case '{':
                    return 'overItem.';
                case '}':
                    return '';
                default:
                    break;
            }
        });
        return new Function('overItem', 'return ' + formatter);
    }
    _drawLabel(bestCell, item, pixels, style) {
        let text = item.name;

        if (style.label.formatter) {
            text = this._compileTooltipTemplate(style.label.formatter)(item);
        }

        const width = this._ctx.measureText(text).width;
        if (bestCell && text != null) {

            if (style.label.overflow == 'hidden') {

                if (this._getMaxWidth(pixels) > width) {
                    this._ctx.fillText(text, bestCell.x - width / 2, bestCell.y);
                }

            } else {
                this._ctx.fillText(text, bestCell.x - width / 2, bestCell.y);
            }

        }
    }
    _TDispose() {
        this._map.removeEventListener('rightclick', this._TRightClick);
    }
    getLngLatRectangle() {
        return geoJsonPolygonRectangle(this._getTransformData());
    }
}