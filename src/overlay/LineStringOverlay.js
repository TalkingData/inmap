/**
 * draw cireuit
 */
import {
    isArray,
    clearPushArray
} from './../common/util';
import Parameter from './base/Parameter';
import LineStringConfig from '../config/LineStringConfig';
import State from './../config/OnState';

export default class LineStringOverlay extends Parameter {
    constructor(ops) {
        super(LineStringConfig, ops);
        this.points = [];
        this.styleConfig = {};
        this._setStyle(LineStringConfig, ops);
        this.state = null;
        this.workerData = [];
    }
    setOptionStyle(ops) {
        this._setStyle(LineStringConfig, ops);
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

    setData(points) {
        if (!isArray(points)) {
            throw new TypeError('inMap: data must be a Array');
        }
        this.points = points;
        this.map && this.drawMap();
    }
    refresh() {
        this.setState(State.drawBefore);
        this.drawLine(this.workerData);
        this.setState(State.drawAfter);
    }
    resize() {
        this.drawMap();
    }
    getTransformData() {
        return this.workerData.length > 0 ? this.workerData : this.points;
    }
    drawMap() {
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
    drawLine() {
        this.clearCanvas();
        let normal = this.styleConfig.normal;
        let ctx = this.ctx;
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
       
        for (let i = 0; i < this.workerData.length; i++) {
            let item = this.workerData[i];
            let style = this.setDrawStyle(item);
            this.ctx.strokeStyle = style.borderColor;
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
}