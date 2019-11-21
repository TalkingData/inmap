import CanvasOverlay from './base/CanvasOverlay';
import TWEEN from '../lib/Tween';


import {
    merge,
    clearPushArray,
    checkGeoJSON,
    geoJsonPointRectangle,
    setDevicePixelRatio
} from './../common/Util';

import HeatConfig from './../config/HeatConfig';
import State from './../config/OnStateConfig';
export default class HeatOverlay extends CanvasOverlay {
    constructor(ops) {
        super(ops);
        this._data = [];
        this._workerData = [];
        this._subscriptions = {
            onMouseMove: [],
            onState: [],
            onInit: [],
            isInit: true,
            preEmitName: null
        };
        this._setStyle(HeatConfig, ops);
        this._state = null;
        if (ops.canvasDom) {
            this._initCanvas(ops.canvasDom);
        }

    }
    _initCanvas(dom) {
        this._container = dom;
        this._ctx = dom.getContext('2d');
        this.size.width = dom.offsetWidth;
        this.size.height = dom.offsetHeight;
        // setDevicePixelRatio(this._ctx);
    }
    setOptionStyle(ops, callback) {
        this._setStyle(this._option, ops, callback);
    }
    _toDraw(callback) {
        this._drawMap(callback);
    }
    getRenderData() {
        return this._workerData;
    }
    _getTransformData() {
        return this._workerData.length > 0 ? this._workerData : this._data;
    }
    _setStyle(config, ops) {
        ops = ops || {};
        const option = merge(config, ops);
        this._option = option;
        this._tooltipConfig = option.tooltip;
        this._styleConfig = option.style;
        this._eventConfig = option.event;
        this._gradient = option.style.gradient;
        this._animationOptions = option.animation;
        this._palette = this._getColorPaint();
        const {
            radius,
            blur
        } = this._styleConfig;
        this._templates = this._getPointTemplate(radius, blur);
        if (ops.data !== undefined) {
            this.setData(ops.data);
        } else {
            this.refresh();
        }

        this.emitEvent = this._eventConfig.emitEvent;
        this._tMapStyle(option.skin);
        this._clearBindEmit(config.event);
        this._bindEmit();
        
    }

    _initAniator() {

        if (this._isEnabledTime()) {


            const steps = {
                step: this._animationOptions.stepsRange.start
            };
            const duration = this._animationOptions.duration * 1000 || 5000;
            if (this.animator) {
                this.animator.stop();
            }
            // const self = this;
            this.animator = new TWEEN.Tween(steps) // Create a new tween that modifies 'coords'.
                .to({
                    step: this._animationOptions.stepsRange.end
                }, duration)
                .onUpdate((step) => { // Called after tween.js updates 'coords'.
                    this.refresh(step);
                }).repeat(0)
                .start();

        } else {
            this.animator && this.animator.stop();
        }
    }
    _canvasInit() {
        this.toolTip && this.toolTip.setOption(this._tooltipConfig);

    }
    _checkGeoJSON(data) {
        checkGeoJSON(data, this._option.checkDataType.name, this._option.checkDataType.count);
    }
    setData(points, callback) {
        if (points) {
            this._data = points;
            this._checkGeoJSON(points);
        } else {
            this._data = [];
        }
        clearPushArray(this._workerData, []);
        this._initAniator();
        this._map && this._drawMap(callback);
        
    }
    setPixelData(data) {
        this._workerData = data.map((item) => {
            return {
                geometry: {
                    pixel: {
                        x: item.x,
                        y: item.y
                    }
                },
                count: item.count
            };
        });
        this._initAniator();
    }
    _getMax() {
        if (this._workerData.length == 0) {
            return 0;
        }
        let maxValue = 0;
        for (let i = 0, len = this._workerData.length; i < len; i++) {
            if (this._workerData[i].count > maxValue) {
                maxValue = this._workerData[i].count;
            }
        }

        return maxValue;
    }
    _getMin() {
        if (this._workerData.length == 0) {
            return 0;
        }

        let minValue = 0;
        for (let i = 0, len = this._workerData.length; i < len; i++) {
            if (this._workerData[i].count < minValue) {
                minValue = this._workerData[i].count;
            }
        }

        return minValue;
    }
    _translation(distanceX, distanceY) {
        for (let i = 0; i < this._workerData.length; i++) {
            let pixel = this._workerData[i].geometry.pixel;
            pixel.x = pixel.x + distanceX;
            pixel.y = pixel.y + distanceY;
        }
        this._setState(State.drawBefore);
        if (!this._isEnabledTime()) {
            this.refresh();
        }

        this._setState(State.drawAfter);

    }
    _setWorkerData(val) {
        this._data = []; //优化
        clearPushArray(this._workerData, val);
    }
    _drawMap(callback) {
        if (!this._map) return;
        this._setState(State.computeBefore);

        this._postMessage('HeatOverlay.pointsToPixels', this._getTransformData(), (pixels, margin) => {
            this._setWorkerData(pixels);
            if (this._eventType == 'onmoving') {
                return;
            }

            this._setState(State.computeAfter);

            this._translation(margin.left - this._margin.left, margin.top - this._margin.top);

            margin = null;
            pixels = null;
            callback && callback(this);
            this._emitInit();
        });
    }
    _isEnabledTime() {
        return this._animationOptions && this._animationOptions.enabled !== false;
    }
    refresh(time) {


        if (!this._ctx) return;
        if (this._isEnabledTime()) {
            if (time === undefined) {
                this._clear();
                return;
            }
            let prev = this._ctx.globalCompositeOperation;
            // this._ctx.save();
            this._ctx.globalCompositeOperation = 'destination-in';
            this._ctx.fillStyle = 'rgba(0, 0, 0, .1)';
            this._ctx.fillRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
            this._ctx.globalCompositeOperation = prev;
            // this._ctx.restore();
        } else {
            this._clear();
        }

        let normal = this._styleConfig;
        let mapSize = this._getSize();
        let maxValue = normal.maxValue;
        if (normal.maxValue == null) {
            maxValue = this._getMax();
        }
        let minValue = normal.minValue;
        if (normal.minValue == null) {
            minValue = this._getMin();
        }
        let length = this._workerData.length;
        if (mapSize.width <= 0 || length == 0) {
            return;
        }
        this.maxValue = maxValue, this.minValue = minValue;
        const tpl = this._templates;
        let ctx = this._ctx;

        if (time !== undefined && length !== 0) {
            length = Math.floor(length * time);
        }
        for (let i = 0, len = length; i < len; i++) {
            let item = this._workerData[i];
            let pixel = item.geometry.pixel;
            if (pixel.x > -normal.radius && pixel.y > -normal.radius && pixel.x < mapSize.width + normal.radius && pixel.y < mapSize.height + normal.radius) {
                let opacity = (item.count - minValue) / (maxValue - minValue);
                opacity = opacity < .01 ? .01 : opacity;
                ctx.globalAlpha = opacity;
                const rectX = pixel.x - normal.radius;
                const rectY = pixel.y - normal.radius;
                ctx.drawImage(tpl, rectX, rectY);
            }

        }

        const palette = this._palette;
        const img = ctx.getImageData(0, 0, mapSize.width * this._devicePixelRatio, mapSize.height * this._devicePixelRatio);
        const imgData = img.data;

        const max_opacity = normal.maxOpacity * 255;
        const min_opacity = normal.minOpacity * 255;

        const len = imgData.length,
            opacity = 0;
        for (let i = 3; i < len; i += 4) {
            let alpha = imgData[i];
            let offset = alpha * 4;
            if (!offset) {
                continue;
            }
            let finalAlpha;
            if (opacity > 0) {
                finalAlpha = opacity;
            } else {
                if (alpha < max_opacity) {
                    if (alpha < min_opacity) {
                        finalAlpha = min_opacity;
                    } else {
                        finalAlpha = alpha;
                    }
                } else {
                    finalAlpha = max_opacity;
                }
            }

            imgData[i - 3] = palette[offset];
            imgData[i - 2] = palette[offset + 1];
            imgData[i - 1] = palette[offset + 2];
            imgData[i] = finalAlpha;

        }

        ctx.putImageData(img, 0, 0, 0, 0, mapSize.width * this._devicePixelRatio, mapSize.height * this._devicePixelRatio);
    }
    _getPointTemplate(radius, blurFactor, opacity) {
        const tplCanvas = document.createElement('canvas');
        const tplCtx = tplCanvas.getContext('2d');
        const x = radius;
        const y = radius;
        tplCanvas.width = tplCanvas.height = radius * 2;

        if (opacity)
            tplCtx.globalAlpha = opacity;

        if (blurFactor == 1) {
            tplCtx.beginPath();
            tplCtx.arc(x, y, radius, 0, 2 * Math.PI, false);
            tplCtx.fillStyle = 'rgba(0,0,0,1)';
            tplCtx.fill();
        } else {
            const gradient = tplCtx.createRadialGradient(x, y, radius * blurFactor, x, y, radius);
            gradient.addColorStop(0, 'rgba(0,0,0,1)');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');

            tplCtx.fillStyle = gradient;
            tplCtx.fillRect(0, 0, 2 * radius, 2 * radius);
        }

        return tplCanvas;
    }
    _drawPoint(x, y, radius, opacity) {
        let ctx = this._ctx;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        let gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'rgba(0,0,0,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    _getColorPaint() {
        let gradientConfig = this._gradient;
        let paletteCanvas = document.createElement('canvas');
        let paletteCtx = paletteCanvas.getContext('2d');

        paletteCanvas.width = 256;
        paletteCanvas.height = 1;

        let gradient = paletteCtx.createLinearGradient(0, 0, 256, 1);
        for (let key in gradientConfig) {
            gradient.addColorStop(key, gradientConfig[key]);
        }

        paletteCtx.fillStyle = gradient;
        paletteCtx.fillRect(0, 0, 256, 1);
        return paletteCtx.getImageData(0, 0, 256, 1).data;
    }
    getValueAt(x, y) {
        let value;
        const img = this._ctx.getImageData(x * this._devicePixelRatio, y * this._devicePixelRatio, 1, 1);
        let data = img.data[3];
        value = (Math.abs(this.maxValue - this.minValue) * (data / 255)) >> 0;

        return value;
    }

    _tMousemove() {
        if (this._eventType == 'onmoving') return;
        this._emit('onMouseMove', event, this);
        this._subscriptions.preEmitName = null;
    }
    getLngLatRectangle() {
        return geoJsonPointRectangle(this._data);
    }
}