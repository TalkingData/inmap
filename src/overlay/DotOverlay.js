/*
 * 点的绘制
 */
import {
    CanvasOverlay
} from './base/CanvasOverlay.js';
import {
    Label
} from './../worker/helper/Label';
import {
    Parameter
} from './base/Parameter';
import {
    isArray,
    isEmpty,
    detectmob
} from './../common/util';
import BatchesData from './base/BatchesData';
import DotConfig from './../config/DotConfig';
import State from './../config/OnState';
let isMobile = detectmob();
export class DotOverlay extends Parameter {
    constructor(opts) {
        super(DotConfig, opts);
        this.polyme = opts.type == 'polyme';
        this._loopDraw = this._loopDraw.bind(this);
        if (!isEmpty(this._option.draw)) {
            this.batchesData = new BatchesData(this._option.draw);
        }
        this.mouseLayer = new CanvasOverlay();
        this.state = null;
    }


    parameterInit() {
        this.map.addOverlay(this.mouseLayer);
        if (this.styleConfig.colors.length > 0) {
            this.compileSplitList(this.points);
        } else {
            this.setlegend(this.legendConfig, this.styleConfig.splitList);
        }
    }
    setOptionStyle(ops) {
        this._setStyle(this.baseConfig, ops);
        if (!isEmpty(this._option.draw)) {
            this.batchesData = new BatchesData(this._option.draw);
        } else {
            this.batchesData = null;
        }
        
        this.refresh();
    }
    setState(val) {
        this.state = val;
        this.eventConfig.onState(this.state);
    }
    resize() {
        this.drawMap();
    }
    drawMouseLayer() {
        let overArr = this.overItem ? [this.overItem] : [];
        this.mouseLayer.clearCanvas();
        this._loopDraw(this.mouseLayer.ctx, this.selectItem.concat(overArr));

    }
    drawMap() {

        this.batchesData && this.batchesData.clear();
        let path = this.polyme ? 'PolymeOverlay.mergePoint' : 'HeatOverlay.pointsToPixels';
        let data = this.polyme ? {
            points: this.points,
            mergeCount: this.styleConfig.normal.mergeCount,
            size: this.styleConfig.normal.size
        } : this.points;
        this.setState(State.computeBefore);
        this.postMessage(path, data, (pixels) => {
            if (this.eventType == 'onmoving') {
                return;
            }
            this.setState(State.conputeAfter);
            this.setWorkerData(pixels);
            this.updateOverClickItem();
            this.setState(State.drawBefore);
            this.refresh();
            this.setState(State.drawAfter);

        });
    }
    updateOverClickItem() {
        let overArr = this.overItem ? [this.overItem] : [];
        let allItems = this.selectItem.concat(overArr);
        for (let i = 0; i < allItems.length; i++) {
            let item = allItems[i];
            let ret = this.workerData.find(function (val) {
                return val && val.lat == item.lat && val.lng == item.lng && val.count == item.count;
            });
            item.pixel = ret.pixel;
        }
    }

    cancerSelectd() {
        this.selectItem = [];
    }
    setPoints(points) {
        if (!isArray(points)) {
            throw new TypeError('inMap: data must be a Array');
        }
        this.cancerSelectd();
        this.points = points;
        if (this.styleConfig.colors.length > 0) {
            this.compileSplitList(this.points);
        }
        this.drawMap();
    }
    /**
     * 颜色等分策略
     * @param {} data 
     */
    compileSplitList(data) {
        let colors = this.styleConfig.colors;
        if (colors.length <= 0) return;
        data = data.sort((a, b) => {
            return parseFloat(a.count) - parseFloat(b.count);
        });
        let splitCount = data.length / colors.length;
        let colorIndex = 0;
        let split = [];
        let star = 0,
            end = 0;

        for (let i = 0; i < data.length; i++) {

            if (i > splitCount * (colorIndex + 1)) {
                if (split.length == 0) {
                    star = data[0].count;
                }

                end = data[i].count;

                split.push({
                    start: star,
                    end: end,
                    backgroundColor: colors[colorIndex],
                });
                colorIndex++;
                star = data[i].count;
            }
        }
        //去除最后判断区间，防止区间遗漏
        if (split.length > 0) {
            split.push({
                start: star,
                end: null,
                backgroundColor: colors[colorIndex],
            });

        }

        this.styleConfig.splitList = split;
        this.setlegend(this.legendConfig, this.styleConfig.splitList);
    }

    getTarget(x, y) {
        let pixels = this.workerData,
            ctx = this.ctx;
        for (let i = 0, len = pixels.length; i < len; i++) {
            let item = pixels[i];
            let pixel = item.pixel;
            let style = this.polyme ? this.styleConfig.normal : this.setDrawStyle(item);
            ctx.beginPath();
            ctx.arc(pixel.x, pixel.y, style.size, 0, 2 * Math.PI, true);
            ctx.lineWidth = style.borderWidth;
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
                return val && val.lat == item.lat && val.lng == item.lng && val.count == item.count;
            });
        }
        return index;
    }
    refresh() {
        this.clearCanvas();
        this.canvasResize();
        this.mouseLayer.canvasResize();
        if (this.batchesData) {
            this.batchesData.action(this.workerData, this._loopDraw, this.ctx);
        } else {
            this._loopDraw(this.ctx, this.workerData);
        }
        if (this.styleConfig.normal.label.show) {
            this._drawLabel(this.ctx, this.workerData);
        }
        this.drawMouseLayer();
    }
    swopData(index, item) {
        if (index > -1 && !this.styleConfig.normal.label.show) { //导致文字闪
            this.workerData[index] = this.workerData[this.workerData.length - 1];
            this.workerData[this.workerData.length - 1] = item;
        }
    }
    _loopDraw(ctx, pixels) {

        for (let i = 0, len = pixels.length; i < len; i++) {
            let item = pixels[i];
            let pixel = item.pixel;
            let style = this.polyme ? this.styleConfig.normal : this.setDrawStyle(item);
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
        let fontStyle = this.styleConfig.normal.label;
        let fontSize = parseInt(fontStyle.font);
        ctx.font = fontStyle.font;
        ctx.textBaseline = 'top';
        ctx.fillStyle = fontStyle.color;
        let byteWidth = ctx.measureText('a').width;

        // let param = {
        //     pixels: pixels,
        //     height: fontSize,
        //     borderWidth: this.styleConfig.normal.borderWidth,
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
            let radius = val.pixel.radius + this.styleConfig.normal.borderWidth;
            return new Label(val.pixel.x, val.pixel.y, radius, fontSize, byteWidth, val.name);
        });
        //x排序从小到大
        labels.sort((a, b) => {
            return b.x - a.x;
        });
        let meet;
        do {
            meet = false; //本轮是否有相交
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
    Tdispose() {
        this.map.removeOverlay(this.mouseLayer);
    }

    tMousemove(event) {

        if (this.eventType == 'onmoving') {
            return;
        }
        if (!this.tooltipConfig.show && isEmpty(this.styleConfig.mouseOver)) {
            return;
        }
        let result = this.getTarget(event.pixel.x, event.pixel.y);
        let temp = result.item;

        if (temp != this.overItem) { //防止过度重新绘画
            this.overItem = temp;
            this.eventType = 'mousemove';
            if (!isEmpty(this.styleConfig.mouseOver)) {
                this.drawMouseLayer();
            }
        }
        if (temp) {
            this.map.setDefaultCursor('pointer');
        } else {
            this.map.setDefaultCursor('default');
        }

        this.setTooltip(event);

    }
    tMouseClick(event) {
        if (this.eventType == 'onmoving') return;
        let {
            multiSelect
        } = this.eventConfig;
        let result = this.getTarget(event.pixel.x, event.pixel.y);
        if (result.index == -1) {
            return;
        }

        let item = result.item;
        if (multiSelect) {
            if (this.selectItemContains(item)) {
                this.deleteSelectItem(item); //二次点击取消选中
            } else {
                this.selectItem.push(result.item);
            }

        } else {
            this.selectItem = [result.item];
        }

        this.eventConfig.onMouseClick(this.selectItem, event);


        if (isMobile) {
            this.overItem = [item];
            this.setTooltip(event);
        }
        this.drawMouseLayer();


    }
}