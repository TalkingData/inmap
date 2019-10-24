import CanvasOverlay from './base/CanvasOverlay.js';
import {
    merge,
    clearPushArray,
    checkGeoJSON,
    geoJsonLineStringRectangle
} from '../common/Util.js';

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
        this._data = [];
        this._workerData = [];
        this._markLineData = [];
        this._setStyle(LineStringAnimationConfig, ops);
    }
    setOptionStyle(ops, callback) {
        this._setStyle(this._option, ops);
        this._map && this._drawMap(callback);
    }
    _setStyle(config, ops, callback) {
        ops = ops || {};
        let option = this._option = merge(config, ops);
        this._styleConfig = option.style;
        this._eventConfig = option.event;
        this._tMapStyle(option.skin);

        delete this._option.data;

        if (ops.data !== undefined) {
            this.setData(ops.data, callback);
        } else {
            this._map && this.refresh();
        }

    }
    _translation(distanceX, distanceY) {
        for (let i = 0; i < this._markLineData.length; i++) {
            let pixels = this._markLineData[i].path;
            for (let j = 0; j < pixels.length; j++) {
                let pixel = pixels[j];
                pixel[0] = pixel[0] + distanceX;
                pixel[1] = pixel[1] + distanceY;
            }
        }
        this.refresh();
    }
    setData(points, callback) {
        if (points) {
            this._data = points;
            checkGeoJSON(points, this._option.checkDataType.name, this._option.checkDataType.count);
        } else {
            this._data = [];
        }
        clearPushArray(this._workerData);
        this._map && this._drawMap(callback);
    }
    _toDraw() {
        if (!this.animationDraw) {
            this._initAnimation();
        }
        this._drawMap();
    }
    _getTransformData() {
        return this._workerData.length > 0 ? this._workerData : this._data;
    }
    _drawMap(callback) {
        let zoomUnit = Math.pow(2, 18 - this._map.getZoom());
        let projection = this._map.getMapType().getProjection();
        let mcCenter = projection.lngLatToPoint(this._map.getCenter());
        let nwMc = new BMap.Pixel(mcCenter.x - this._map.getSize().width / 2 * zoomUnit, mcCenter.y + this._map.getSize().height / 2 * zoomUnit); //左上角墨卡托坐标

        let params = {
            points: this._getTransformData(),
            nwMc: nwMc,
            zoomUnit: zoomUnit,
            isAnimation: true,
            lineOrCurve: this._styleConfig.lineOrCurve,
            deltaAngle: this._styleConfig.deltaAngle
        };

        this._animationFlag = false;
        this._postMessage('LineStringOverlay.calculatePixel', params, (pixels, margin) => {
            if (this._eventType == 'onmoving') {
                this._animationFlag = false;
                return;
            }
            this._animationFlag = true;
            clearPushArray(this._workerData, pixels);
            this._createMarkLine(pixels);
            this._translation(margin.left - this._margin.left, margin.top - this._margin.top);
            params = null;
            margin = null;
            callback && callback(this);
            this._emitInit();
        });
    }
    _createMarkLine(data) {
        clearPushArray(this._markLineData);
        for (let i = 0; i < data.length; i++) {
            let pixels = data[i].geometry.pixels;
            this._markLineData.push(new MarkLine({
                path: pixels
            }));
        }
    }
    _initAnimation() {
        let now;
        let then = Date.now();
        let interval = 1000 / this._styleConfig.fps;
        let delta;
        let me = this;

        function drawFrame() {
            !me.isDispose && requestAnimationFrame(drawFrame);
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
            _markLineData,
            _styleConfig
        } = this;

        if (!this._ctx) {
            return;
        }

        if (!this._animationFlag) {
            this._clearCanvas();
            return;
        }
        this._ctx.fillStyle = 'rgba(0,0,0,0.93)';
        let prev = this._ctx.globalCompositeOperation;
        this._ctx.globalCompositeOperation = 'destination-in';
        let size = this._map.getSize();
        this._ctx.fillRect(0, 0, size.width, size.height);
        this._ctx.globalCompositeOperation = prev;

        for (let i = 0; i < _markLineData.length; i++) {
            let markLine = _markLineData[i];
            markLine.drawMoveCircle(this._ctx, _styleConfig, this._map);
        }
    }
    getLngLatRectangle() {
        return geoJsonLineStringRectangle(this._getTransformData());
    }
}
