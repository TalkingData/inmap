import {
    Parameter
} from './base/Parameter.js';

import {
    Color
} from './../common/Color';
import {
    isArray
} from './../common/util';
import BoundaryConfig from './../config/BoundaryConfig';
import State from './../config/OnState';


export class BoundaryOverlay extends Parameter {
    constructor(ops) {
        super(BoundaryConfig, ops);
        this.patchSplitList();

        this.selectedExp = {
            show: false,
            exp: null,
        };
    }
    TInit() {
        this.initLegend();
    }
    initLegend() {
        this.compileSplitList(this.style.colors, this.points);
        this.patchSplitList();
        this.setlegend(this.legend, this.style.splitList);
    }

    setOptionStyle(ops) {
        this._setStyle(this.baseConfig, ops);
        this.initLegend();
        this.refresh();
    }

    /**
     * 颜色等分策略
     * @param {} data 
     */
    compileSplitList(colors, data) {

        if (colors.length <= 0) return;

        if (!Array.isArray(this.points)) {
            /*eslint-disable */
            console.error(' array is not defined <shouild be setPoints(Array)>');
            /*eslint-enable */
            return;
        }
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

        this.style.splitList = split;

    }
    patchSplitList() {
        let normal = this.style.normal;
        if (normal.borderWidth != null && normal.borderColor == null) {
            normal.borderColor = (new Color(normal.backgroundColor)).getRgbaStyle();
        }
        let splitList = this.style.splitList;
        for (let i = 0; i < splitList.length; i++) {
            let condition = splitList[i];
            if ((condition.borderWidth != null || normal.borderColor != null) && condition.borderColor == null) {
                condition.borderColor = (new Color(condition.backgroundColor)).getRgbaStyle();
            }
        }

    }
    /**
     * 设置选中
     * @param {*} exp  表达式
     */
    setSelectd(exp) {

        if (this.points.length > 0) {
            let filterFun = new Function('item', 'with(item){ return ' + exp + ' }');
            let temp = this.points.filter(filterFun);

            if (temp.length > 0) {
                this.setCenterAndZoom(temp[0].geo, exp); //default first
            }
        }
    }
    /**
     * 取消选中
     */
    cancerSelectd() {
        this.cancerExp();
        this.selectItem = [];
        this.refresh();
    }
    setWorkerData(val) {
        this.workerData = val;
        if (this.filterFun) {
            this.selectItem = this.workerData.filter(this.filterFun);
        }

    }
    parserExp(exp) {
        if (exp) {
            this.selectedExp.show = true;
            this.selectedExp.exp = exp;
            this.filterFun = new Function('item', 'with(item){ return ' + exp + ' }');
        }
    }
    swopData(index, item) {
        if (index > -1) {
            this.workerData[index] = this.workerData[this.workerData.length - 1];
            this.workerData[this.workerData.length - 1] = item;
        }
        this.cancerExp();
    }
    cancerExp() {
        this.selectedExp.show = false;
        this.selectedExp.exp = null;
        this.filterFun = null;
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
    setMapCenter(geo, exp) {
        let me = this;
        this.parserExp(exp);

        if (me.workerData.length > 0) {
            me.selectItem = me.workerData.filter(me.filterFun);
            me.refresh();
        }
    }
    setMapCenterAndZoom(geo, exp) {
        let arr = [];
        geo.forEach(val => {
            arr.push(new BMap.Point(val[0], val[1]));

        });

        let view = this.map.getViewport(arr);
        let me = this;

        function zoomEnd() {

            me.map.removeEventListener('zoomend', zoomEnd);
            me.map.panTo(view.center);
        }

        function moveend() {

            me.map.removeEventListener('moveend', moveend);
            me.parserExp(exp);
            if (me.workerData.length > 0) {
                me.selectItem = me.workerData.filter(me.filterFun);
                me.refresh();
            }
        }


        let scale = view.zoom - 1;
        this.map.addEventListener('zoomend', zoomEnd);
        this.map.addEventListener('moveend', moveend);
        if (this.map.getZoom() == scale) {
            zoomEnd();
        } else {
            this.map.setZoom(scale);
        }
    }
    setCenterAndZoom(geo, exp, isScale) {
        if (isScale) {
            this.setMapCenterAndZoom(geo, exp);
        } else {
            this.setMapCenter(geo, exp);
        }

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
        this.clearCanvas();
        this.drawLine(this.workerData);
        this.cancerExp();
    }
    drawMap() {
        this.event.onState(State.computeBefore);
        this.postMessage('BoundaryOverlay.calculatePixel', this.points, (pixels) => {
            if (this.eventType == 'onmoving') {
                return;
            }
            this.event.onState(State.conputeAfter);
            this.clearCanvas();
            this.canvasResize();
            this.overItem = null;
            this.setWorkerData(pixels);
            this.event.onState(State.drawBefore);
            this.drawLine(pixels);
            this.event.onState(State.drawAfter);
        });
    }
    setPoints(points) {
        if (!isArray(points)) {
            throw new TypeError('data must be a Array');
        }
        this.cancerSelectd();
        this.points = points;
        this.initLegend();
        this.drawMap();
    }
    getTarget(x, y) {
        let data = this.workerData;
        this.ctx.beginPath();
        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            let geo = item.pgeo;
            this.ctx.beginPath();
            this.ctx.moveTo(geo[0][0], geo[0][1]);
            for (let j = 1; j < geo.length; j++) {
                this.ctx.lineTo(geo[j][0], geo[j][1]);
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
            let geo = item.pgeo;
            let style = this.setDrawStyle(item);
            this.ctx.beginPath();
            this.ctx.shadowColor = style.shadowColor || 'transparent';
            this.ctx.shadowBlur = style.shadowBlur || 10;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            this.ctx.fillStyle = style.backgroundColor;
            this.ctx.moveTo(geo[0][0], geo[0][1]);
            for (let j = 1; j < geo.length; j++) {
                this.ctx.lineTo(geo[j][0], geo[j][1]);
            }
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.strokeStyle = style.borderColor;
            this.ctx.lineWidth = style.borderWidth;
            this.ctx.stroke();

        }

        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            let geo = item.pgeo;
            let bestCell = item.bestCell;
            let label = this.setDrawStyle(item).label;

            if (bestCell && label.show) {
                this.ctx.shadowBlur = 0;
                this.ctx.lineWidth = label.lineWidth;
                this.ctx.font = label.font;
                this.ctx.fillStyle = label.color;
                let width = this.ctx.measureText(item.name).width;
                if (this.getMaxWidth(geo) > width) {
                    this.ctx.fillText(item.name, bestCell.x - width / 2, bestCell.y);
                }
            }
        }
        this.ctx.closePath();
    }
}