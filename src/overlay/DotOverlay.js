/*
 * 点的绘制
 */

import {
    Parameter
} from './base/Parameter';

import {
    LabelRender
} from './helper/LabelRender.js';

export class DotOverlay extends Parameter {
    constructor(opts) {
        super(opts);
        this.labelRender = new LabelRender(opts);
    }
    resize() {
        this.drawMap();
    }
    drawMap() {
        let me = this;
        this.postMessage('HeatOverlay.pointsToPixels', this.points, function (pixels) {
            if (me.eventType == 'onmoving') {
                return;
            };
            // debugger
            // me.workerData = pixels;
            me.setWorkerData(pixels);
            me._dataRender();
        });
    }
    setPoints(points) {
        if (!points) {
            return
        }
        this.cancerSelectd();
        this.points = points;
        if (this.style.colors.length > 0) {
            this.compileSplitList(this.points);
        }
        this.drawMap();
    }
    getTarget(x, y) {
        let pixels = this.workerData,
            ctx = this.ctx;
        for (let i = 0, len = pixels.length; i < len; i++) {
            let item = pixels[i];
            let pixel = item.pixel;
            let style = this.setDrawStyle(item);
            ctx.beginPath();
            ctx.arc(pixel.x, pixel.y, style.size, 0, 2 * Math.PI, true);
            ctx.lineWidth = style.lineWidth;
            if (ctx.isPointInPath(x * this.devicePixelRatio, y * this.devicePixelRatio)) {
                return {
                    index: i,
                    item: item
                };
            }
        }
        return {
            index: -1,
            item: null
        }


    }
    findIndexSelectItem(item) {
        let index = -1;
        if (item) {
            // debugger
            index = this.selectItem.findIndex(function (val) {
                return val && val.lat == item.lat && val.lng == item.lng;
            });
        }

        return index
    }
    _dataRender() {
        this.clearCanvas();
        this.canvasResize();
        this._loopDraw(this.ctx, this.workerData);
        this._drawLabel(this.ctx, this.workerData);
    }
    _loopDraw(ctx, pixels) {
        for (var i = 0, len = pixels.length; i < len; i++) {
            let item = pixels[i];
            let pixel = item.pixel;
            let style = this.setDrawStyle(item);
            if (style.shadowBlur) {
                ctx.shadowBlur = style.shadowBlur;
            }
            if (style.shadowColor) {
                ctx.shadowColor = style.shadowColor;
            }
            if (style.globalCompositeOperation) {
                ctx.globalCompositeOperation = style.globalCompositeOperation;
            }
            this._drawCircle(ctx, pixel.x, pixel.y, style.size, style.backgroundColor, style.borderWidth, style.borderColor);
        }
    }
    _drawLabel(ctx, pixels){
        var labelRender = this.labelRender;

        labelRender.drawLabel(ctx, pixels);

        // pixels.forEach(function(item) {
        //     let pixel = item.pixel;

        //     // ctx.fillText(item.name, pixel.x, pixel.y)
        // })
    }
    _drawCircle(ctx, x, y, radius, color, lineWidth, strokeStyle) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        ctx.fill();
        if (lineWidth) {
            ctx.lineWidth = lineWidth;
            if (strokeStyle) {
                ctx.strokeStyle = strokeStyle;
            }
            ctx.stroke();
        }
    }
}