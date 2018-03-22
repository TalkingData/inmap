import {
    CanvasOverlay
} from './base/CanvasOverlay.js';
import {
    merge
} from './../common/util';
import config from './../config/FlashDotConfig';


class Marker {
    constructor(opts, map) {
        this.city = opts.name;
        this.location = new BMap.Point(opts.lnglat[0], opts.lnglat[1]);
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
export default class FlashDotOverlay extends CanvasOverlay {
    constructor(ops) {
        super();
        this.data = [];
        this.style = null;
        this.markers = [];
        this.render = this.render.bind(this);
        this.setOptionStyle(ops);
    }
    TInit() {
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
        let option = merge(config, ops);
        this.style = option.style.normal;
        this.data = ops.data ? option.data : this.data;
        this.tMapStyle(option.skin);
        this.map && this.addMarker();
    }
    addMarker() {
        this.markers = [];
        for (let i = 0; i < this.data.length; i++) {
            let item = merge(this.style,this.data[i]);
            this.markers.push(new Marker(item, this.map));
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