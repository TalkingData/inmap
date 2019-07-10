import CanvasOverlay from './base/CanvasOverlay';
import {
    merge,
    clearPushArray,
    checkGeoJSON
} from './../common/Util';

import HeatConfig from './../config/HeatConfig';
import State from './../config/OnStateConfig';
export default class HeatOverlay extends CanvasOverlay {
    constructor(ops) {
        super(ops);
        this._data = [];
        this._workerData = [];
        this._setStyle(HeatConfig, ops);
        this._delteOption();
        this._state = null;
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
        let option = merge(config, ops);
        this._option = option;
        this._styleConfig = option.style;
        this._eventConfig = option.event;
        this._gradient = option.style.gradient;
        this._palette = this._getColorPaint();
        if (ops.data !== undefined) {
            this.setData(ops.data);
        } else {
            this._map && this.refresh();
        }
        this._tMapStyle(option.skin);

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
        this._map && this._drawMap(callback);
    }
   
    /**
     * 屏蔽参数
     */
    _delteOption() {
        this._tooltipConfig = {
            show: false
        };
        this._legendConfig = {
            show: false
        };
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
        this.refresh();
        this._setState(State.drawAfter);

    }
    _setWorkerData(val) {
        this._data = []; //优化
        clearPushArray(this._workerData, val);
    }
    _drawMap(callback) {
        this._setState(State.computeBefore);

        this._postMessage('HeatOverlay.pointsToPixels', this._getTransformData(), (pixels, margin) => {

            if (this._eventType == 'onmoving') {
                return;
            }
            this._setWorkerData(pixels);
            this._setState(State.conputeAfter);

            this._translation(margin.left - this._margin.left, margin.top - this._margin.top);

            margin = null;
            pixels = null;
            callback && callback(this);
        });
    }
    refresh() {
        this._clearCanvas();

        let normal = this._styleConfig;
        let mapSize = this._map.getSize();
        let maxValue = normal.maxValue;
        if (normal.maxValue == null) {
            maxValue = this._getMax();
        }
        let minValue = normal.minValue;
        if (normal.minValue == null) {
            minValue = this._getMin();
        }

        if (mapSize.width <= 0) {
            return;
        }

        let ctx = this._ctx;
        for (let i = 0, len = this._workerData.length; i < len; i++) {
            let item = this._workerData[i];
            let pixel = item.geometry.pixel;
            if (pixel.x > -normal.radius && pixel.y > -normal.radius && pixel.x < mapSize.width + normal.radius && pixel.y < mapSize.height + normal.radius) {
                let opacity = (item.count - minValue) / (maxValue - minValue);
                opacity = opacity > 1 ? 1 : opacity;
                this._drawPoint(pixel.x, pixel.y, normal.radius, opacity);
            }

        }

        let palette = this._palette;
        let img = ctx.getImageData(0, 0, mapSize.width * this._devicePixelRatio, mapSize.height * this._devicePixelRatio);
        let imgData = img.data;

        let max_opacity = normal.maxOpacity * 255;
        let min_opacity = normal.minOpacity * 255;
        //权重区间
        let max_scope = (normal.maxScope > 1 ? 1 : normal.maxScope) * 255;
        let min_scope = (normal.minScope < 0 ? 0 : normal.minScope) * 255;
        let len = imgData.length;
        for (let i = 3; i < len; i += 4) {
            let alpha = imgData[i];
            let offset = alpha * 4;
            if (!offset) {
                continue;
            }
            imgData[i - 3] = palette[offset];
            imgData[i - 2] = palette[offset + 1];
            imgData[i - 1] = palette[offset + 2];

            // 范围区间
            if (imgData[i] > max_scope) {
                imgData[i] = 0;
            }
            if (imgData[i] < min_scope) {
                imgData[i] = 0;
            }

            // 透明度
            if (imgData[i] > max_opacity) {
                imgData[i] = max_opacity;
            }
            if (imgData[i] < min_opacity) {
                imgData[i] = min_opacity;
            }
        }

        ctx.putImageData(img, 0, 0, 0, 0, mapSize.width * this._devicePixelRatio, mapSize.height * this._devicePixelRatio);
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

}
