import CanvasOverlay from './base/CanvasOverlay.js';
import {
    merge,
    isArray
} from './../common/util';
import config from '../config/PointAnimation';


class Marker {
    constructor(opts, data, map) {
        this.city = opts.name;
        this.location = new BMap.Point(data.geometry.coordinates[0], data.geometry.coordinates[1]);
        this.pixel = map.pointToPixel(this.location);
        this.color = opts.color;
        this.speed = opts.speed;
        this.radius = 0;
        this.size = opts.size;
    }
    draw(context) {
        let pixel = this.pixel;
        context.save();
        context.beginPath();
        context.strokeStyle = this.color;
        context.moveTo(pixel.x + pixel.radius, pixel.y);
        context.arc(pixel.x, pixel.y, this.radius, 0, Math.PI * 2);
        context.stroke();
        context.closePath();
        context.restore();
        this.radius += this.speed;
        if (this.radius > this.size) {
            this.radius = 0;
        }
    }

}
export default class PointAnimationOverlay extends CanvasOverlay {
    constructor(ops) {
        super();
        this._data = [];
        this._styleConfig = null;
        this._markers = [];
        this._render = this._render.bind(this);
        this.setOptionStyle(ops);
    }
    _canvasInit() {
        this._addMarker();
        let now, me = this;
        let then = Date.now();
        let interval = 1000 / 25;
        let delta;
        let _render = this._render;
        (function drawFrame() {
            !me.isDispose && requestAnimationFrame(drawFrame);
            now = Date.now();
            delta = now - then;
            if (delta > interval) {
                then = now - (delta % interval);
                _render();
            }
        }());
    }
    setOptionStyle(ops) {
        if (!ops) return;
        let option = merge(config, ops);
        this._styleConfig = option.style;
        this._tMapStyle(option.skin);
        if (ops.data === null) {
            option.data = [];
        } else if (ops.data === undefined) {
            option.data = this._data;
        }
        this.setData(option.data);
    }
    setData(points) {
        if (points) {
            if (!isArray(points)) {
                throw new TypeError('inMap: data must be a Array');
            }
            this._data = points;
        } else {
            this._data = [];
        }

        this._map && this._addMarker();
    }
    _translation(distanceX, distanceY) {

        for (let i = 0; i < this._markers.length; i++) {
            let pixel = this._markers[i].pixel;
            pixel.x = pixel.x + distanceX;
            pixel.y = pixel.y + distanceY;
        }

    }
    _addMarker() {
        this._markers = [];
        for (let i = 0; i < this._data.length; i++) {
            let style = merge(this._styleConfig, this._data[i].style || {});
            this._markers.push(new Marker(style, this._data[i], this._map));
        }

    }
    _toDraw() {
        this._addMarker();
        this._canvasResize();
    }
    _render() {
        let ctx = this._ctx;
        if (!ctx) {
            return;
        }
        if (!this._animationFlag) {
            this._clearCanvas();
            return;
        }

        let size = this._map.getSize();
        ctx.fillStyle = 'rgba(0,0,0,.95)';
        let prev = ctx.globalCompositeOperation;
        ctx.globalCompositeOperation = 'destination-in';

        ctx.fillRect(0, 0, size.width, size.height);
        ctx.globalCompositeOperation = prev;

        for (let i = 0; i < this._markers.length; i++) {
            let marker = this._markers[i];
            marker.draw(ctx);
        }
    }
}