/*
 * 点的绘制
 */

import {
    Label
} from './../worker/helper/Label';
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
        let path = me.polyme ? 'PolymeOverlay.mergePoint' : 'HeatOverlay.pointsToPixels';
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
        if (this.style.normal.label.show) {
            this._drawLabel(this.ctx, this.workerData);
        }
    }
    swopeData(index, item) {
        if (index > -1 && !this.style.normal.label.show) { //导致文字散
            this.workerData[index] = this.workerData[this.workerData.length - 1];
            this.workerData[this.workerData.length - 1] = item;
        }
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
            pixel['radius'] = size;
            this._drawCircle(ctx, pixel.x, pixel.y, size, style.backgroundColor, style.borderWidth, style.borderColor);
        }
    }
    _drawLabel(ctx, pixels) {
        let fontStyle = this.style.normal.label;
        let fontSize = parseInt(fontStyle.font);
        ctx.font = fontStyle.font;
        ctx.textBaseline = "top";
        ctx.fillStyle = fontStyle.color;
        let byteWidth = ctx.measureText('a').width;

        // let param = {
        //     pixels: pixels,
        //     height: fontSize,
        //     borderWidth: this.style.normal.borderWidth,
        //     byteWidth: byteWidth
        // };
        // this.postMessage('LablEvading.merge', param, (labels) => {
        //     if (this.eventType == 'onmoving') {
        //         return;
        //     }
        //     labels.forEach(function (item) {
        //         ctx.beginPath();
        //         ctx.fillText(item.text, item.x, item.y);
        //         ctx.fill();
        //     });
        // });

        let labels = pixels.map((val) => {
            let radius = val.pixel.radius + this.style.normal.borderWidth;
            return new Label(val.pixel.x, val.pixel.y, radius, fontSize, byteWidth, val.name);
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
                    if (i != j && temp.show && temp.isAnchorMeet(labels[j])) {
                        temp.next();
                        meet = true;
                        break;
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
                ctx.fillText(item.text, pixel.x, pixel.y);
                ctx.fill();
            }
        });
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