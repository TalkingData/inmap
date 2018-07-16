import {
    Parameter
} from './base/Parameter.js';

import {
    Color
} from './../common/Color';
import {
    clearPushArray
} from './../common/util';
import BoundaryConfig from './../config/BoundaryConfig';
import State from './../config/OnState';


export class BoundaryOverlay extends Parameter {
    constructor(ops) {
        super(BoundaryConfig, ops);
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
            let pixels = this.workerData[i].pixels;
            for (let j = 0; j < pixels.length; j++) {
                let pixel = pixels[j];
                pixel[0] = pixel[0] + distanceX;
                pixel[1] = pixel[1] + distanceY;
            }
            let bestCell = this.workerData[i].bestCell;
            if (bestCell) {
                bestCell.x = bestCell.x + distanceX;
                bestCell.y = bestCell.y + distanceY;
            }
        }

        this.refresh();

    }
    setOptionStyle(ops) {
        this._setStyle(this.baseConfig, ops);
    }
    setState(val) {
        this.state = val;
        this.eventConfig.onState(this.state);
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
            labelShow: true
        };

        this.postMessage('BoundaryOverlay.calculatePixel', parameter, (pixels, margin) => {
            if (this.eventType == 'onmoving') {
                return;
            }

            this.setState(State.conputeAfter);
            this.setWorkerData(pixels);
            this.translation(margin.left - this.margin.left, margin.top - this.margin.top);
            pixels = null, margin = null;
        });
    }
    getTarget(x, y) {
        let data = this.getData();
        this.ctx.beginPath();
        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            let pixel = item.pixels;
            this.ctx.beginPath();
            this.ctx.moveTo(pixel[0][0], pixel[0][1]);
            for (let j = 1; j < pixel.length; j++) {
                this.ctx.lineTo(pixel[j][0], pixel[j][1]);
            }
            this.ctx.closePath();
            if (this.ctx.isPointInPath(x * this.devicePixelRatio, y * this.devicePixelRatio)) {
                return {
                    index: i,
                    item: item
                };
            }
        }
        return {
            index: -1,
            item: null
        };
    }
    drawLine(data) {
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.miterLimit = 4;
        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            let pixel = item.pixels;

            let style = this.setDrawStyle(item);
            this.ctx.beginPath();
            this.ctx.shadowColor = style.shadowColor || 'transparent';
            this.ctx.shadowBlur = style.shadowBlur || 10;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            this.ctx.fillStyle = style.backgroundColor;
            this.ctx.moveTo(pixel[0][0], pixel[0][1]);
            for (let j = 1; j < pixel.length; j++) {
                this.ctx.lineTo(pixel[j][0], pixel[j][1]);
            }
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.strokeStyle = style.borderColor;
            this.ctx.lineWidth = style.borderWidth;
            this.ctx.stroke();


        }

        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            let pixel = item.pixels;
            let bestCell = item.bestCell;
            let label = this.setDrawStyle(item).label;

            if (bestCell && label.show) {
                this.ctx.shadowBlur = 0;
                this.ctx.lineWidth = label.lineWidth;
                this.ctx.font = label.font;
                this.ctx.fillStyle = label.color;
                let width = this.ctx.measureText(item.name).width;
                if (this.getMaxWidth(pixel) > width) {
                    this.ctx.fillText(item.name, bestCell.x - width / 2, bestCell.y);
                }
            }
        }
        this.ctx.closePath();
    }
}