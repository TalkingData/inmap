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
        this.data = [];
        this.styleConfig = null;
        this.markers = [];
        this.render = this.render.bind(this);
        this.setOptionStyle(ops);
    }
    canvasInit() {
        this.addMarker();
        let now;
        let then = Date.now();
        let interval = 1000 / 25;
        let delta;
        let render = this.render;
        (function drawFrame() {
            requestAnimationFrame(drawFrame);
            now = Date.now();
            delta = now - then;
            if (delta > interval) {
                then = now - (delta % interval);
                render();
            }
        }());
    }
    setOptionStyle(ops) {
        if (!ops) return;
        let option = merge(config, ops);
        this.styleConfig = option.style;
        this.tMapStyle(option.skin);
        if (ops.data === null) {
            option.data = [];
        } else if (ops.data === undefined) {
            option.data = this.data;
        }
        this.setData(option.data);
    }
    setData(points) {
        if (points) {
            if (!isArray(points)) {
                throw new TypeError('inMap: data must be a Array');
            }
            this.data = points;
        } else {
            this.data = [];
        }

        this.map && this.addMarker();
    }
    translation(distanceX, distanceY) {

        for (let i = 0; i < this.markers.length; i++) {
            let pixel = this.markers[i].pixel;
            pixel.x = pixel.x + distanceX;
            pixel.y = pixel.y + distanceY;
        }

    }
    addMarker() {
        this.markers = [];
        for (let i = 0; i < this.data.length; i++) {
            let style = merge(this.styleConfig, this.data[i].style || {});
            this.markers.push(new Marker(style, this.data[i], this.map));
        }

    }
    resize() {
        this.addMarker();
        this.canvasResize();
    }
    render() {
        let ctx = this.ctx;
        if (!ctx) {
            return;
        }
        if (!this.animationFlag) {
            this.clearCanvas();
            return;
        }

        let size = this.map.getSize();
        ctx.fillStyle = 'rgba(0,0,0,.95)';
        let prev = ctx.globalCompositeOperation;
        ctx.globalCompositeOperation = 'destination-in';

        ctx.fillRect(0, 0, size.width, size.height);
        ctx.globalCompositeOperation = prev;

        for (let i = 0; i < this.markers.length; i++) {
            let marker = this.markers[i];
            marker.draw(ctx);
        }
    }
}