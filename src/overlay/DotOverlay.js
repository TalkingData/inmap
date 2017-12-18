/*
 * 点的绘制
 */

import {
    Label
} from './helper/Label';
import {
    Parameter
} from './base/Parameter';
export class DotOverlay extends Parameter {
    constructor(opts) {
        super(opts);

        this.polyme = opts.type == 'polyme';
    }
    resize() {
        this.drawMap();
    }
    drawMap() {

        let me = this;
        let path = me.polyme ? 'polymeOverlay.mergePoint' : 'HeatOverlay.pointsToPixels';
        let data = me.polyme ? {
            points: this.points,
            mergeCount: this.style.normal.mergeCount,
            size: this.style.normal.size
        } : this.points;

        this.postMessage(path, data, function (pixels) {
            if (me.eventType == 'onmoving') {
                return;
            }
            me.setWorkerData(pixels);
            me._dataRender();
        });
    }
    setPoints(points) {
        if (!points) {
            return;
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
        };


    }
    findIndexSelectItem(item) {
        let index = -1;
        if (item) {

            index = this.selectItem.findIndex(function (val) {
                return val && val.lat == item.lat && val.lng == item.lng;
            });
        }

        return index;
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

            let style = this.polyme ? this.style.normal : this.setDrawStyle(item);
            if (style.shadowBlur) {
                ctx.shadowBlur = style.shadowBlur;
            }
            if (style.shadowColor) {
                ctx.shadowColor = style.shadowColor;
            }
            if (style.globalCompositeOperation) {
                ctx.globalCompositeOperation = style.globalCompositeOperation;
            }
            let size = this.polyme ? pixel.radius : style.size;
            this._drawCircle(ctx, pixel.x, pixel.y, size, style.backgroundColor, style.borderWidth, style.borderColor);
        }
    }
    _drawLabel(ctx, pixels) {

        let labels = pixels.map((val) => {
            return new Label(ctx, val);
        });
        //x排序从小到大
        labels.sort((a, b) => {
            return b.x - a.x;
        });
        do {
            var meet = false; //本轮是否有相交
            for (let i = 0; i < labels.length; i++) {
                let temp = labels[i];
                for (let j = 0; j < labels.length; j++) {
                    if (i != j && temp.show &&labels[j].show && temp.isAnchorMeet(labels[j])) {
                        temp.next();
                        meet = true;

                    }
                }
            }
        } while (meet);

        //排序 x 从小到大
        //逐一遍历  判断是否相交 就移动label文字方位 当都不满足时隐藏当前label  
        labels.forEach(function (item) {
            if (item.show) {
                let pixel = item.getCurrentRect();
               
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.font = '13px Arial';
                ctx.textBaseline = "top";
                ctx.fillStyle = "#fff";
                ctx.fillText(item.text, pixel.minX, pixel.minY);
              
                ctx.fill();
            }

        })
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