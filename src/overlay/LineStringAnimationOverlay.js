import {
    CanvasOverlay
} from './base/CanvasOverlay.js';
import {
    merge,
    isArray,
    clearPushArray
} from './../common/util';
import State from './../config/OnState';
import LineStringAnimationConfig from './../config/LineStringAnimationConfig';
class MarkLine {
    constructor(opts) {
        this.path = opts.path;
        this.step = 0;
    }
    drawMarker(context, map) {
        this.from.draw(context, map);
        this.to.draw(context, map);
    }

    drawLinePath(context, styleConfig) {
        let pointList = this.path;
        let len = pointList.length;
        context.save();
        context.beginPath();
        context.lineWidth = styleConfig.lineWidth;
        context.strokeStyle = styleConfig.colors[this.id];

        if (!styleConfig.lineType || styleConfig.lineType == 'solid') {
            context.moveTo(pointList[0][0], pointList[0][1]);
            for (let i = 0; i < len; i++) {
                context.lineTo(pointList[i][0], pointList[i][1]);
            }
        } else if (styleConfig.lineType == 'dashed' || styleConfig.lineType == 'dotted') {
            for (let i = 1; i < len; i += 2) {
                context.moveTo(pointList[i - 1][0], pointList[i - 1][1]);
                context.lineTo(pointList[i][0], pointList[i][1]);
            }
        }
        context.stroke();
        context.restore();
    }
    drawMoveCircle(context, styleConfig) {
        let pointList = this.path;
        if (pointList.length <= 0) return;
        context.save();
        context.fillStyle = styleConfig.fillColor;
        context.shadowColor = styleConfig.shadowColor;
        context.shadowBlur = styleConfig.shadowBlur;
        context.beginPath();
        context.arc(pointList[this.step][0], pointList[this.step][1], styleConfig.size, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
        context.restore();
        this.step += 1;
        if (this.step >= pointList.length) {
            this.step = 0;
        }
    }
}

export default class LineStringAnimationOverlay extends CanvasOverlay {
    constructor(ops) {
        super(ops);
        this.points = [];
        this.workerData = [];
        this.markLineData = [];
        this._setStyle(LineStringAnimationConfig, ops);
    }
    setOptionStyle(ops) {

        this._setStyle(LineStringAnimationConfig, ops);
        this.map && this.drawMap();
    }
    _setStyle(config, ops) {
        let option = merge(config, ops);

        this.styleConfig = option.style;
        this.eventConfig = option.event;
        this.tMapStyle(option.skin);


        if (ops.data) {
            this.setData(ops.data);
        } else {
            this.map && this.refresh();
        }

    }
    translation(distanceX, distanceY) {
        for (let i = 0; i < this.markLineData.length; i++) {
            let pixels = this.markLineData[i].path;
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
    resize() {
        if (!this.animationDraw) {

            this.initAnimation();
        }
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
            isAnimation: true,
            lineOrCurve: this.styleConfig.lineOrCurve,
            deltaAngle: this.styleConfig.deltaAngle
        };

        
        this.postMessage('LineStringOverlay.calculatePixel', params, (pixels, margin) => {
            if (this.eventType == 'onmoving') {
                return;
            }
            clearPushArray(this.workerData, pixels);

            

            this.createMarkLine(pixels);
            this.translation(margin.left - this.margin.left, margin.top - this.margin.top);
            params = null;
            margin = null;
        });
    }
    createMarkLine(data) {
        clearPushArray(this.markLineData);
        for (let i = 0; i < data.length; i++) {
            let pixels = data[i].geometry.pixels;
            this.markLineData.push(new MarkLine({
                path: pixels
            }));
        }
    }
    initAnimation() {
        let now;
        let then = Date.now();
        let interval = 1000 / this.styleConfig.fps;
        let delta;
        let me = this;

        function drawFrame() {
            requestAnimationFrame(drawFrame);
            now = Date.now();
            delta = now - then;
            if (delta > interval) {
                then = now - (delta % interval);
                me.refresh();
            }
        }
        this.animationDraw = drawFrame;
        this.animationDraw();

    }
    refresh() {
        let {
            markLineData,
            styleConfig
        } = this;

        if (!this.ctx) {
            return;
        }

        if (!this.animationFlag) {
            this.clearCanvas();
            return;
        }
        this.ctx.fillStyle = 'rgba(0,0,0,0.93)';
        let prev = this.ctx.globalCompositeOperation;
        this.ctx.globalCompositeOperation = 'destination-in';
        let size = this.map.getSize();
        this.ctx.fillRect(0, 0, size.width, size.height);
        this.ctx.globalCompositeOperation = prev;

        for (let i = 0; i < markLineData.length; i++) {
            let markLine = markLineData[i];
            markLine.drawMoveCircle(this.ctx, styleConfig, this.map);
        }
    }
}