import {
    isEmpty,
    isArray,
    detectmob,
    clearPushArray
} from './../common/util';
import CanvasOverlay from './base/CanvasOverlay.js';
import Parameter from './base/Parameter';
import LineStringConfig from '../config/LineStringConfig';
import State from './../config/OnState';
let isMobile = detectmob();
export default class LineStringOverlay extends Parameter {
    constructor(ops) {
        super(LineStringConfig, ops);
        // this.styleConfig = {};
        this.state = null;
        this.mouseLayer = new CanvasOverlay();
        this.selectItemIndex = -1;
        this.onDataChange();
    }
    setOptionStyle(ops) {
        this._setStyle(LineStringConfig, ops);
    }
    onDataChange() {
        this.selectItemIndex = -1;
        if (this.selectItem.length > 0) {
            this.selectItemIndex = this.points.findIndex((item) => {
                return this.selectItem[0] == item;
            });
        }

    }

    parameterInit() {
        this.map.addOverlay(this.mouseLayer);
    }
    drawMouseLayer() {
        let overArr = this.overItem ? [this.overItem] : [];

        this.mouseLayer.clearCanvas();
        this.drawLine(this.mouseLayer.ctx, this.selectItem.concat(overArr));
    }
    clearAll() {
        this.mouseLayer.clearCanvas();
        this.clearCanvas();
    }
    setState(val) {
        this.state = val;
        this.eventConfig.onState(this.state);
    }
    translation(distanceX, distanceY) {
        for (let i = 0; i < this.workerData.length; i++) {
            let pixels = this.workerData[i].geometry.pixels;
            for (let j = 0; j < pixels.length; j++) {
                let pixel = pixels[j];
                pixel[0] = pixel[0] + distanceX;
                pixel[1] = pixel[1] + distanceY;
            }
        }
        this.refresh();
    }
    getTarget(mouseX, mouseY) {

        for (let i = 0, len = this.workerData.length; i < len; i++) {
            let item = this.workerData[i];
            let pixels = item.geometry.pixels;
            let style = this.setDrawStyle(item);
            for (let k = 0, len = pixels.length; k < len - 1; k++) {
                let pixel1 = pixels[k];
                let pixel2 = pixels[k + 1];
                if (this.calcIsInsideThickLineSegment(pixel1, pixel2, mouseX, mouseY, style.borderWidth)) {
                    return {
                        index: i,
                        item: item
                    };
                }
            }
        }
        return {
            index: -1,
            item: null
        };
    }
    findIndexSelectItem(item) {
        let index = -1;
        if (item) {
            index = this.selectItem.findIndex(function (val) {
                return item == val;
            });
        }
        return index;
    }

    calcIsInsideThickLineSegment(line1, line2, mouseX, mouseY, lineThickness) {
        let L2 = (((line2[0] - line1[0]) * (line2[0] - line1[0])) + ((line2[1] - line1[1]) * (line2[1] - line1[1])));
        if (L2 == 0) return false;
        let r = (((mouseX - line1[0]) * (line2[0] - line1[0])) + ((mouseY - line1[1]) * (line2[1] - line1[1]))) / L2;
        if (r < 0) {
            return (Math.sqrt(((line1[0] - mouseX) * (line1[0] - mouseX)) + ((line1[1] - mouseY) * (line1[1] - mouseY))) <= lineThickness);
        } else if ((0 <= r) && (r <= 1)) {
            let s = (((line1[1] - mouseY) * (line2[0] - line1[0])) - ((line1[0] - mouseX) * (line2[1] - line1[1]))) / L2;
            return (Math.abs(s) * Math.sqrt(L2) <= lineThickness);
        } else {
            return (Math.sqrt(((line2[0] - mouseX) * (line2[0] - mouseX)) + ((line2[1] - mouseY) * (line2[1] - mouseY))) <= lineThickness);
        }
    }
    setData(points) {
        if (!isArray(points)) {
            throw new TypeError('inMap: data must be a Array');
        }
        this.points = points;
        this.map && this.drawMap();
    }
    refresh() {
        this.setState(State.drawBefore);
        this.mouseLayer.canvasResize();
        this.clearCanvas();
        this.drawLine(this.ctx, this.workerData);
        this.anewSelectItem();
        this.drawMouseLayer();
        this.setState(State.drawAfter);
    }
    anewSelectItem() {
        if (this.selectItemIndex > -1) {
            this.selectItem = [this.workerData[this.selectItemIndex]];
        } else {
            this.selectItem = [];
        }
    }
    resize() {
        this.drawMap();
    }
    getTransformData() {
        return this.workerData.length > 0 ? this.workerData : this.points;
    }
    drawMap() {
        this.clearAll();
        let zoomUnit = Math.pow(2, 18 - this.map.getZoom());
        let projection = this.map.getMapType().getProjection();
        let mcCenter = projection.lngLatToPoint(this.map.getCenter());
        let nwMc = new BMap.Pixel(mcCenter.x - this.map.getSize().width / 2 * zoomUnit, mcCenter.y + this.map.getSize().height / 2 * zoomUnit); //左上角墨卡托坐标
        let params = {
            points: this.getTransformData(),
            nwMc: nwMc,
            zoomUnit: zoomUnit,
            lineOrCurve: this.styleConfig.normal.lineCurive,
            deltaAngle: this.styleConfig.normal.deltaAngle
        };
        this.setState(State.computeBefore);
        this.postMessage('LineStringOverlay.calculatePixel', params, (pixels, margin) => {
            if (this.eventType == 'onmoving') {
                return;
            }
            this.setState(State.conputeAfter);
            clearPushArray(this.workerData, pixels);
            this.translation(margin.left - this.margin.left, margin.top - this.margin.top);

            params = null;
            margin = null;
        });
    }

    drawLine(ctx, data) {
        let normal = this.styleConfig.normal;
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        if (normal.globalCompositeOperation) {
            ctx.globalCompositeOperation = normal.globalCompositeOperation;
        }
        if (normal.shadowColor) {
            ctx.shadowColor = normal.shadowColor;

        }
        if (normal.shadowBlur) {
            ctx.shadowBlur = normal.shadowBlur;
        }

        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let style = this.setDrawStyle(item, i);
            ctx.strokeStyle = style.borderColor;
            let pixels = item.geometry.pixels;
            ctx.beginPath();
            ctx.moveTo(pixels[0][0], pixels[0][1]);
            for (let j = 1; j < pixels.length; j++) {
                ctx.lineTo(pixels[j][0], pixels[j][1]);
            }
            ctx.lineWidth = style.borderWidth;
            pixels = null;
            ctx.stroke();
        }


    }
    Tdispose() {
        this.map.removeOverlay(this.mouseLayer);
        this.mouseLayer.dispose();
    }
    tMousemove(event) {
        if (this.eventType == 'onmoving') {
            return;
        }
        if (!this.tooltipConfig.show && isEmpty(this.styleConfig.mouseOver)) {
            return;
        }
        let result = this.getTarget(event.pixel.x, event.pixel.y);
        let temp = result.item;

        if (temp != this.overItem) { //防止过度重新绘画
            this.overItem = temp;
            this.eventType = 'mousemove';
            if (!isEmpty(this.styleConfig.mouseOver)) {
                this.drawMouseLayer();
            }
        }
        if (temp) {
            this.map.setDefaultCursor('pointer');
        } else {
            this.map.setDefaultCursor('default');
        }

        this.setTooltip(event);

    }
    tMouseClick(event) {
        if (this.eventType == 'onmoving') return;
        let result = this.getTarget(event.pixel.x, event.pixel.y);
        if (result.index == -1) {
            return;
        }

        let item = result.item;
        this.selectItem = [result.item];
        this.selectItemIndex = result.index;

        this.eventConfig.onMouseClick(this.selectItem, event);
        if (isMobile) {
            this.overItem = [item];
            this.setTooltip(event);
        }
        this.drawMouseLayer();
    }
}