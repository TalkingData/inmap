import {
    CanvasOverlay
} from './base/CanvasOverlay.js';
import config from './../config/moveLineConfig';
import BaseClass from './base/BaseClass';
import deepmerge from 'deepmerge';

class Marker {
    constructor(opts) {
        this.options = {
            markerColor: opts.markerColor || opts.color,
            markerRadius: 2,
            fontColor: opts.color
        };
        this.text = opts.name;
        this.point = opts.point;
    }
    draw(ctx, map) {
        let {
            x,
            y
        } = map.pointToPixel(this.point);
        let {
            markerColor,
            markerRadius,
            fontColor
        } = this.options;

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = markerColor || this.color;
        ctx.arc(x, y, markerRadius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '12px Microsoft YaHei';
        ctx.fillStyle = fontColor;
        ctx.fillText(this.text, x, y - 10);
        ctx.restore();
    }

}

class MarkLine {
    constructor(opts) {
        this.from = opts.from;
        this.to = opts.to;
        this.id = opts.id;
        this.step = 0;
        this.path = null;
    }
    getPointList(from, to) {
        let points = [
            [from.x, from.y],
            [to.x, to.y]
        ];
        let ex = points[1][0];
        let ey = points[1][1];
        points[3] = [ex, ey];
        points[1] = this.getOffsetPoint(points[0], points[3]);
        points[2] = this.getOffsetPoint(points[3], points[0]);
        points = this.smoothSpline(points, false);
        points[points.length - 1] = [ex, ey];
        return points;
    }
    getOffsetPoint(start, end) {
        let distance = this.getDistance(start, end) / 3;
        let angle, dX, dY;
        let mp = [start[0], start[1]];
        let deltaAngle = -0.2;
        if (start[0] != end[0] && start[1] != end[1]) {
            let k = (end[1] - start[1]) / (end[0] - start[0]);
            angle = Math.atan(k);
        } else if (start[0] == end[0]) {
            angle = (start[1] <= end[1] ? 1 : -1) * Math.PI / 2;
        } else {
            angle = 0;
        }
        if (start[0] <= end[0]) {
            angle -= deltaAngle;
            dX = Math.round(Math.cos(angle) * distance);
            dY = Math.round(Math.sin(angle) * distance);
            mp[0] += dX;
            mp[1] += dY;
        } else {
            angle += deltaAngle;
            dX = Math.round(Math.cos(angle) * distance);
            dY = Math.round(Math.sin(angle) * distance);
            mp[0] -= dX;
            mp[1] -= dY;
        }
        return mp;
    }
    smoothSpline(points, isLoop) {
        let len = points.length;
        let ret = [];
        let distance = 0;
        for (let i = 1; i < len; i++) {
            distance += this.getDistance(points[i - 1], points[i]);
        }
        let segs = distance / 2;
        segs = segs < len ? len : segs;
        for (let i = 0; i < segs; i++) {
            let pos = i / (segs - 1) * (isLoop ? len : len - 1);
            let idx = Math.floor(pos);
            let w = pos - idx;
            let p0;
            let p1 = points[idx % len];
            let p2;
            let p3;
            if (!isLoop) {
                p0 = points[idx === 0 ? idx : idx - 1];
                p2 = points[idx > len - 2 ? len - 1 : idx + 1];
                p3 = points[idx > len - 3 ? len - 1 : idx + 2];
            } else {
                p0 = points[(idx - 1 + len) % len];
                p2 = points[(idx + 1) % len];
                p3 = points[(idx + 2) % len];
            }
            let w2 = w * w;
            let w3 = w * w2;

            ret.push([
                this.interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3),
                this.interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)
            ]);
        }
        return ret;
    }
    interpolate(p0, p1, p2, p3, t, t2, t3) {
        let v0 = (p2 - p0) * 0.5;
        let v1 = (p3 - p1) * 0.5;
        return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
    }
    getDistance(p1, p2) {
        return Math.sqrt(
            (p1[0] - p2[0]) * (p1[0] - p2[0]) +
            (p1[1] - p2[1]) * (p1[1] - p2[1])
        );
    }

    drawMarker(context, map) {
        this.from.draw(context, map);
        this.to.draw(context, map);
    }

    drawLinePath(context, options, map) {
        let pointList = this.path = this.getPointList(map.pointToPixel(this.from.point), map.pointToPixel(this.to.point));
        let len = pointList.length;
        context.save();
        context.beginPath();
        context.lineWidth = options.lineWidth;
        context.strokeStyle = options.colors[this.id];

        if (!options.lineType || options.lineType == 'solid') {
            context.moveTo(pointList[0][0], pointList[0][1]);
            for (let i = 0; i < len; i++) {
                context.lineTo(pointList[i][0], pointList[i][1]);
            }
        } else if (options.lineType == 'dashed' || options.lineType == 'dotted') {
            for (let i = 1; i < len; i += 2) {
                context.moveTo(pointList[i - 1][0], pointList[i - 1][1]);
                context.lineTo(pointList[i][0], pointList[i][1]);
            }
        }
        context.stroke();
        context.restore();
        this.step = 0; //缩放地图时重新绘制动画
    }

    drawMoveCircle(context, options, map) {
        let pointList = this.path || this.getPointList(map.pointToPixel(this.from.point), map.pointToPixel(this.to.point));
        context.save();
        context.fillStyle = options.fillColor;
        context.shadowColor = options.shadowColor;
        context.shadowBlur = options.shadowBlur;
        context.beginPath();
        context.arc(pointList[this.step][0], pointList[this.step][1], options.moveRadius, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
        context.restore();
        this.step += 1;
        if (this.step >= pointList.length) {
            this.step = 0;
        }
    }
}

export class MoveLineOverlay extends BaseClass {
    constructor(opts) {
        super();
        this.markLines = [];
        this.map = null;
        this.data = opts.data || [];
        this.baseLayer = null;
        this.animationLayer = null;

        this.options = deepmerge.all([
            config, opts.style.normal
        ], {
            arrayMerge: function (destinationArray, sourceArray) {
                if (sourceArray.length > 0) {
                    return sourceArray;
                } else {
                    return destinationArray;
                }

            }
        });
    }

    initialize(map) {
        this.map = map;
        this.baseLayer = new CanvasOverlay({
            repaintEnd: this.draw.bind(this),
        });
        this.animationLayer = new CanvasOverlay();
        map.addOverlay(this.baseLayer);
        map.addOverlay(this.animationLayer);
        let {
            markLines,
            animationLayer,
            options
        } = this;

        function render() {
            let animationCtx = animationLayer.ctx;
            if (!animationCtx) {
                return;
            }

            if (!animationLayer.animationFlag) {
                animationLayer.clearCanvas();
                return;
            }
            animationCtx.fillStyle = 'rgba(0,0,0,0.93)';
            let prev = animationCtx.globalCompositeOperation;
            animationCtx.globalCompositeOperation = 'destination-in';
            let size = map.getSize();
            animationCtx.fillRect(0, 0, size.width, size.height);
            animationCtx.globalCompositeOperation = prev;

            for (let i = 0; i < markLines.length; i++) {
                let markLine = markLines[i];
                markLine.drawMoveCircle(animationCtx, options, map);
            }

        }
        let now;
        let then = Date.now();
        let interval = 1000 / options.fps;
        let delta;
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
    drawBaseLayer() {
        let baseCtx = this.baseLayer.ctx;
        if (!baseCtx) {
            return;
        }
        if (this.markLines.length == 0) {
            this.addMarkLine();
        }
        let {
            options,
            map
        } = this;
        this.baseLayer.clearCanvas();
        this.markLines.forEach(function (line) {
            line.drawMarker(baseCtx, map);
            line.drawLinePath(baseCtx, options, map);
        });
        //文字避让

    }
    addMarkLine() {
        let {
            options,
            markLines,
            data,
        } = this;
        markLines.length = 0;
        data.forEach(function (line, i) {
            markLines.push(new MarkLine({
                id: i,
                from: new Marker({
                    name: line.from.city,
                    markerRadius: options.markerRadius,
                    point: new BMap.Point(line.from.lnglat[0], line.from.lnglat[1]),
                    color: options.colors[i]
                }),
                to: new Marker({
                    name: line.to.city,
                    markerRadius: options.markerRadius,
                    point: new BMap.Point(line.to.lnglat[0], line.to.lnglat[1]),
                    color: options.colors[i]
                })
            }));
        });
    }

    draw() {
        this.baseLayer.canvasResize();
        this.animationLayer.canvasResize();
        this.drawBaseLayer();
    }
}