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
        this.patchSplitList();
        this.state = null;
    }
    parameterInit() {
        this.initLegend();
    }
    initLegend() {
        this.compileSplitList(this.styleConfig.colors, this.getTransformData());
        this.patchSplitList();
        this.setlegend(this.legendConfig, this.styleConfig.splitList);
    }
    /**
     * 设置选中集合，但不会触发绘画
     * 
     * @memberof Parameter
     */
    setSelectedList(list) {
        clearPushArray(this.selectItem, list);
    }
    clearSelectedList() {
        clearPushArray(this.selectItem);
    }
    getSelectedList() {
        return this.selectItem;
    }
    translation(distanceX, distanceY) {
        for (let i = 0; i < this.workerData.length; i++) {
            let geometry = this.workerData[i].geometry;
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
    setState(val) {
        this.state = val;
        this.eventConfig.onState.call(this, this.state);
    }
    onOptionChange() {
        this.map && this.initLegend();
    }
    onDataChange() {
        this.map && this.initLegend();
    }
    /**
     * 颜色等分策略
     * @param {} data 
     */
    compileSplitList(colors, data) {

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

        this.styleConfig.splitList = result;
    }
    patchSplitList() {
        let normal = this.styleConfig.normal;
        if (normal.borderWidth != null && normal.borderColor == null) {
            normal.borderColor = (new Color(normal.backgroundColor)).getRgbaStyle();
        }
        let splitList = this.styleConfig.splitList;
        for (let i = 0; i < splitList.length; i++) {
            let condition = splitList[i];
            if ((condition.borderWidth != null || normal.borderColor != null) && condition.borderColor == null) {
                condition.borderColor = (new Color(condition.backgroundColor)).getRgbaStyle();
            }
        }

    }
    resize() {

        this.drawMap();
    }
    getGeoCenter(geo) {
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
    getMaxWidth(geo) {
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

    findIndexSelectItem(item) {
        let index = -1;
        if (item) {
            index = this.selectItem.findIndex(function (val) {
                return val && val.name == item.name;
            });
        }
        return index;
    }
    refresh() {

        this.setState(State.drawBefore);
        this.clearCanvas();
        this.drawLine(this.getData());
        this.setState(State.drawAfter);
    }
    drawMap() {
        this.setState(State.computeBefore);
        let parameter = {
            data: this.getTransformData(),
            enable: this.styleConfig.normal.label.enable
        };

        this.postMessage('PolygonOverlay.calculatePixel', parameter, (pixels, margin) => {
            if (this.eventType == 'onmoving') {
                return;
            }
            this.setWorkerData(pixels);
            this.setState(State.conputeAfter);
            this.translation(margin.left - this.margin.left, margin.top - this.margin.top);
            pixels = null, margin = null;
        });
    }
    getTarget(x, y) {
        let data = this.getData();
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let geometry = item.geometry;
            let pixels = geometry.pixels;

            if (geometry.type == 'MultiPolygon') {
                for (let k = 0; k < pixels.length; k++) {
                    if (this.containPolygon(x, y, pixels[k])) {
                        return {
                            index: i,
                            item: item
                        };
                    }
                }

            } else {
                if (this.containPolygon(x, y, pixels)) {
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
    drawData(pixelItem) {

        if (pixelItem.length == 0)
            return;
        let pixel = pixelItem[0];
        this.ctx.moveTo(pixel[0], pixel[1]);
        for (let k = 1, len = pixelItem.length; k < len; k++) {
            let item = pixelItem[k];
            if (pixel[0] != item[0] && pixel[1] != item[1]) {
                this.ctx.lineTo(pixelItem[k][0], pixelItem[k][1]);
                pixel = item;
            }
        }
    }
    containPolygon(x, y, pixels) {
        let outerRace = false;
        for (let j = 0; j < pixels.length; j++) {
            this.ctx.beginPath();
            let pixelItem = pixels[j];
            if (j == 0) {
                this.drawData(pixelItem);
                this.ctx.closePath();
                if (this.ctx.isPointInPath(x * this.devicePixelRatio, y * this.devicePixelRatio)) {
                    outerRace = true;
                } else {
                    return false;
                }
            } else {

                this.drawData(pixelItem);
                this.ctx.closePath();
                //内环包含
                if (this.ctx.isPointInPath(x * this.devicePixelRatio, y * this.devicePixelRatio)) {
                    return false;
                }
            }

        }
        return outerRace;
    }
    drawPolygon(pixels, style) {

        for (let j = 0; j < pixels.length; j++) {
            this.ctx.save();
            this.ctx.beginPath();
            let pixelItem = pixels[j];
            if (j == 0) {
                this.drawData(pixelItem);
                this.ctx.closePath();
                this.ctx.fill();
            } else {
                this.drawData(pixelItem);
                this.ctx.clip();
                this.clearCanvas();
            }
            this.ctx.strokeStyle = style.borderColor;
            this.ctx.lineWidth = style.borderWidth;
            this.ctx.stroke();
            this.ctx.restore();
            pixelItem = null;

        }
    }
    drawLine(data) {
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.miterLimit = 4;
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let geometry = item.geometry;
            let pixels = geometry.pixels;
            let style = this.setDrawStyle(item, true);
            this.ctx.beginPath();
            this.ctx.shadowColor = style.shadowColor || 'transparent';
            this.ctx.shadowBlur = style.shadowBlur || 10;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            this.ctx.fillStyle = style.backgroundColor;
            if (geometry.type == 'MultiPolygon') {
                for (let k = 0; k < pixels.length; k++) {
                    this.drawPolygon(pixels[k], style);
                }

            } else {
                this.drawPolygon(pixels, style);
            }

            if (this.styleConfig.normal.label.show) {
                let labelPixels = geometry.labelPixels;
                this.ctx.shadowBlur = 0;
                this.ctx.lineWidth = style.label.lineWidth;
                this.ctx.font = style.label.font;
                this.ctx.fillStyle = style.label.color;
                for (let j = 0; j < labelPixels.length; j++) {
                    let bestCell = labelPixels[j];
                    this.ctx.beginPath();
                    let width = this.ctx.measureText(item.name).width;
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
                        if (bestCell && item.name && this.getMaxWidth(maxPixels) > width) {
                            this.ctx.fillText(item.name, bestCell.x - width / 2, bestCell.y);
                        }
                        maxPixels = null;
                    } else {
                        if (bestCell && item.name && this.getMaxWidth(pixels[j]) > width) {
                            this.ctx.fillText(item.name, bestCell.x - width / 2, bestCell.y);
                        }
                    }

                    bestCell = null, width = null;
                }
                labelPixels = null;
            }
            style = null, pixels = null, geometry = null, item = null;
        }
        this.ctx.closePath();
    }
}