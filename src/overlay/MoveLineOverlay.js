import {
    CanvasOverlay
} from './base/CanvasOverlay.js';
import BaseClass from './base/BaseClass';


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
    }
    getPointList(from, to) {
        var points = [
            [from.x, from.y],
            [to.x, to.y]
        ];
        var ex = points[1][0];
        var ey = points[1][1];
        points[3] = [ex, ey];
        points[1] = this.getOffsetPoint(points[0], points[3]);
        points[2] = this.getOffsetPoint(points[3], points[0]);
        points = this.smoothSpline(points, false);
        points[points.length - 1] = [ex, ey];
        return points;
    }
    getOffsetPoint(start, end) {
        var distance = this.getDistance(start, end) / 3;
        var angle, dX, dY;
        var mp = [start[0], start[1]];
        var deltaAngle = -0.2;
        if (start[0] != end[0] && start[1] != end[1]) {
            var k = (end[1] - start[1]) / (end[0] - start[0]);
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
        var len = points.length;
        var ret = [];
        var distance = 0;
        for (var i = 1; i < len; i++) {
            distance += this.getDistance(points[i - 1], points[i]);
        }
        var segs = distance / 2;
        segs = segs < len ? len : segs;
        for (var i = 0; i < segs; i++) {
            var pos = i / (segs - 1) * (isLoop ? len : len - 1);
            var idx = Math.floor(pos);
            var w = pos - idx;
            var p0;
            var p1 = points[idx % len];
            var p2;
            var p3;
            if (!isLoop) {
                p0 = points[idx === 0 ? idx : idx - 1];
                p2 = points[idx > len - 2 ? len - 1 : idx + 1];
                p3 = points[idx > len - 3 ? len - 1 : idx + 2];
            } else {
                p0 = points[(idx - 1 + len) % len];
                p2 = points[(idx + 1) % len];
                p3 = points[(idx + 2) % len];
            }
            var w2 = w * w;
            var w3 = w * w2;

            ret.push([
                this.interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3),
                this.interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)
            ]);
        }
        return ret;
    }
    interpolate(p0, p1, p2, p3, t, t2, t3) {
        var v0 = (p2 - p0) * 0.5;
        var v1 = (p3 - p1) * 0.5;
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
        var len = pointList.length;
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
        var pointList = this.path || this.getPointList(map.pointToPixel(this.from.point), map.pointToPixel(this.to.point));
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
        //默认参数
        this.options = {
            //marker点半径
            markerRadius: 3,
            //marker点颜色,为空或null则默认取线条颜色
            markerColor: '#fff',
            //线条类型 solid、dashed、dotted
            lineType: 'solid',
            //线条宽度
            lineWidth: 1,
            //线条颜色
            colors: ['#F9815C', '#F8AB60', '#EDCC72', '#E2F194', '#94E08A', '#4ECDA5'],
            //移动点半径
            moveRadius: 2,
            //移动点颜色
            fillColor: '#fff',
            //移动点阴影颜色
            shadowColor: '#fff',
            //移动点阴影大小
            shadowBlur: 5,
        };
        this.markLines = [];
        this.map = null;
        this.data = opts.data || [];
        this.baseLayer = null;
        this.animationLayer = null;
        Object.assign(this.options, opts.style.normal);
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
            var animationCtx = animationLayer.ctx;
            if (!animationCtx) {
                return;
            }

            if (!animationLayer.animationFlag) {
                animationLayer.clearCanvas();
                return;
            }
            animationCtx.fillStyle = 'rgba(0,0,0,0.93)';
            var prev = animationCtx.globalCompositeOperation;
            animationCtx.globalCompositeOperation = 'destination-in';
            let size = map.getSize();
            animationCtx.fillRect(0, 0, size.width, size.height);
            animationCtx.globalCompositeOperation = prev;

            for (var i = 0; i < markLines.length; i++) {
                var markLine = markLines[i];
                markLine.drawMoveCircle(animationCtx, options, map); //移动圆点
            }
        }

        (function drawFrame() {
            requestAnimationFrame(drawFrame);
            render();
        }());
    }
    drawBaseLayer() {
        var baseCtx = this.baseLayer.ctx;
        if (!baseCtx) {
            return;
        }
        this.addMarkLine();
        let {
            options,
            map
        } = this;
        this.baseLayer.clearCanvas();
        this.markLines.forEach(function (line) {
            line.drawMarker(baseCtx, map);
            line.drawLinePath(baseCtx, options, map);
        });

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