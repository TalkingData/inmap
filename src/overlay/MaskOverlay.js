import CanvasOverlay from './base/CanvasOverlay';
import MaskConfig from '../config/MaskConfig';
import State from '../config/OnStateConfig.js';
import {
    clearPushArray,
    checkGeoJSON,
    merge
} from '../common/Util';

export default class MaskOverlay extends CanvasOverlay {
    constructor(ops) {
        super();
        this._data = [];
        this._workerData = [];
        this._option = {};
        this._setStyle(MaskConfig, ops);
    }
    _setStyle(config, ops, callback) {
        ops = ops || {};
        let option = merge(config, ops);
        this._option = option;
        this._eventConfig = option.event;
        this._styleConfig = option.style;
        if (ops.data !== undefined) {
            this.setData(ops.data, callback);
        } else {
            this._map && this.refresh();
            callback && callback(this);
        }
        delete this._option.data;
        this._tMapStyle(option.skin);
    }
    setOptionStyle(ops, callback) {
        this._setStyle(this._option, ops, callback);
    }
    setData(points, callback) {
        if (points) {
            checkGeoJSON(points, false, false);
            this._data = points;
        } else {
            this._data = [];
        }

        this._clearData();
        this._map && this._drawMap(callback);
    }
    getRenderData() {
        return this._workerData;
    }
    _clearData() {
        clearPushArray(this._workerData);
    }
    _toDraw(callback) {
        this._drawMap(callback);
    }
    _drawMap(callback) {
        this._setState(State.computeBefore);
        let parameter = {
            data: this._getTransformData(),
            enable: false
        };

        this._postMessage('PolygonOverlay.calculatePixel', parameter, (pixels, margin) => {
            if (this._eventType == 'onmoving') {
                return;
            }
            this._setWorkerData(pixels);
            this._setState(State.conputeAfter);
            this._translation(margin.left - this._margin.left, margin.top - this._margin.top);
            pixels = null, margin = null;
            callback && callback(this);
        });
    }

    _setWorkerData(val) {
        this._data = [];
        clearPushArray(this._workerData, val);
    }
    _getTransformData() {
        return this._workerData.length > 0 ? this._workerData : this._data;
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

        }
        this.refresh();
    }
    _setState(val) {
        this._state = val;
        this._eventConfig.onState(this._state, this);
    }
    refresh() {

        this._setState(State.drawBefore);
        this._clearCanvas();
        this._drawPolygon(this.getRenderData());
        this._setState(State.drawAfter);
    }
    _drawLine(pixels, style) {
        for (let j = 0; j < pixels.length; j++) {
            if (j == 0) {
                this._ctx.save();
                this._ctx.beginPath();
                let pixelItem = pixels[j];
                this._drawData(pixelItem);
                this._ctx.clip();
                this._clearCanvas();
                if (style.borderColor) {
                    this._ctx.strokeStyle = style.borderColor;
                }
                if (style.borderWidth) {
                    this._ctx.lineWidth = style.borderWidth;
                }
                this._ctx.stroke();
                this._ctx.restore();
                pixelItem = null;
            }
        }
    }
    _drawPolygon(data) {
        let style = this._styleConfig;
        this._ctx.lineCap = 'round';
        this._ctx.lineJoin = 'round';
        this._ctx.miterLimit = 4;
        this._ctx.shadowColor = style.shadowColor || 'transparent';
        this._ctx.shadowBlur = style.shadowBlur || 10;
        this._ctx.shadowOffsetX = 0;
        this._ctx.shadowOffsetY = 0;
        this._ctx.fillStyle = style.backgroundColor;
        let size = this._map.getSize();
        this._ctx.fillRect(0, 0, size.width, size.height);
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let geometry = item.geometry;
            let pixels = geometry.pixels;
            this._ctx.beginPath();
            if (geometry.type == 'MultiPolygon') {
                for (let k = 0; k < pixels.length; k++) {
                    this._drawLine(pixels[k], style);
                }

            } else {
                this._drawLine(pixels, style);
            }


        }
        this._ctx.closePath();
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
}