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
    isEmpty,
    detectmob,
} from './../common/util';
import BatchesData from './base/BatchesData';
import DotConfig from './../config/DotConfig';
import State from './../config/OnState';
let isMobile = detectmob();
export class DotOverlay extends Parameter {
    constructor(opts) {
        super(DotConfig, opts);

        this._loopDraw = this._loopDraw.bind(this);
        if (!isEmpty(this._option.draw)) {
            this.batchesData = new BatchesData(this._option.draw);
        }
        this.mouseLayer = new CanvasOverlay();
        this.state = null;
    }
    initLegend() {
        if (this.styleConfig.colors.length > 0) {
            this.compileSplitList(this.getTransformData());
        } else {
            this.setlegend(this.legendConfig, this.styleConfig.splitList);
        }

    }
    onOptionChange() {
        this.map && this.initLegend();
    }
    onDataChange() {
        this.map && this.initLegend();
    }
    parameterInit() {
        this.map.addOverlay(this.mouseLayer);
        this.initLegend();
    }
    setOptionStyle(ops) {
        this._setStyle(this.baseConfig, ops);
        if (!isEmpty(this._option.draw)) {
            this.batchesData = new BatchesData(this._option.draw);
        } else {
            this.batchesData = null;
        }
    }
    setState(val) {
        this.state = val;
        this.eventConfig.onState(this.state);
    }
    resize() {
        this.drawMap();
    }
    translation(distanceX, distanceY) {
        this.batchesData && this.batchesData.clear();
        for (let i = 0; i < this.workerData.length; i++) {
            let pixel = this.workerData[i].geometry.pixel;
            pixel.x = pixel.x + distanceX;
            pixel.y = pixel.y + distanceY;
        }
        this.refresh();
    }
    drawMouseLayer() {
        let overArr = this.overItem ? [this.overItem] : [];
        this.mouseLayer.clearCanvas();
        this._loopDraw(this.mouseLayer.ctx, this.selectItem.concat(overArr));

    }
    drawMap() {
        this.batchesData && this.batchesData.clear();

        this.setState(State.computeBefore);
        this.postMessage('HeatOverlay.pointsToPixels', this.getTransformData(), (pixels, margin) => {
            if (this.eventType == 'onmoving') {
                return;
            }

            this.setState(State.conputeAfter);
            this.setWorkerData(pixels);
            this.updateOverClickItem();
            this.translation(margin.left - this.margin.left, margin.top - this.margin.top);
            margin = null;
            pixels = null;

        });
    }
    updateOverClickItem() {
        let overArr = this.overItem ? [this.overItem] : [];
        let allItems = this.selectItem.concat(overArr);

        for (let i = 0; i < allItems.length; i++) {
            let item = allItems[i];
            let ret = this.workerData.find(function (val) {
                let itemCoordinates = item.geometry.coordinates;
                let valCoordinates = val.geometry.coordinates;
                return val && itemCoordinates[0] == valCoordinates[0] && itemCoordinates[1] == valCoordinates[1] && val.count == item.count;
            });
            item.geometry.pixel = ret.geometry.pixel;
        }
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

    getTarget(mouseX, mouseY) {
        let pixels = this.workerData,
            ctx = this.ctx;
        let mapSize = this.map.getSize();
        for (let i = 0, len = pixels.length; i < len; i++) {
            let item = pixels[i];
            let style = this.setDrawStyle(item);
            let {
                x,
                y,
            } = item.geometry.pixel;
            let r = style.size + this.styleConfig.normal.borderWidth;
            if (x > -r && y > -r && x < mapSize.width + r && y < mapSize.height + r) {
                ctx.beginPath();
                ctx.arc(x, y, r, 0, 2 * Math.PI, true);
                if (ctx.isPointInPath(mouseX * this.devicePixelRatio, mouseY * this.devicePixelRatio)) {
                    return {
                        index: i,
                        item: item
                    };
                }
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
                let itemCoordinates = item.geometry.coordinates;
                let valCoordinates = val.geometry.coordinates;
                return val && itemCoordinates[0] == valCoordinates[0] && itemCoordinates[1] == valCoordinates[1] && val.count == item.count;
            });
        }
        return index;
    }
    refresh() {
        this.setState(State.drawBefore);
        this.clearCanvas();
        this.mouseLayer.canvasResize();
        if (this.batchesData) {
            this.batchesData.clear();
            this.batchesData.action(this.workerData, this._loopDraw, this.ctx);
        } else {
            this._loopDraw(this.ctx, this.workerData);
        }
        if (this.styleConfig.normal.label.show) {
            this._drawLabel(this.ctx, this.workerData);
        }
        this.drawMouseLayer();
        this.setState(State.drawAfter);
    }
    swopData(index, item) {
        if (index > -1 && !this.styleConfig.normal.label.show) { //导致文字闪
            this.workerData[index] = this.workerData[this.workerData.length - 1];
            this.workerData[this.workerData.length - 1] = item;
        }
    }
    _loopDraw(ctx, pixels) {
        let mapSize = this.map.getSize();
        for (let i = 0, len = pixels.length; i < len; i++) {
            let item = pixels[i];
            let pixel = item.geometry.pixel;
            let {
                x,
                y
            } = pixel;
            let style = this.setDrawStyle(item);
            let size = style.size;
            if (this.styleConfig.normal.label.show) {
                pixel['radius'] = size;
            }
            if (x > -size && y > -size && x < mapSize.width + size && y < mapSize.height + size) {
                if (style.shadowColor) {
                    ctx.shadowColor = style.shadowColor || 'transparent';
                    ctx.shadowBlur = style.shadowBlur || 10;
                } else {
                    ctx.shadowColor = 'transparent';
                    ctx.shadowBlur = 0;
                }
                if (style.globalCompositeOperation) {
                    ctx.globalCompositeOperation = style.globalCompositeOperation;
                }
                this._drawCircle(ctx, x, y, size, style.backgroundColor, style.borderWidth, style.borderColor);
            }
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
            let {
                radius,
                x,
                y
            } = val.geometry.pixel;
            let r = radius + this.styleConfig.normal.borderWidth;
            return new Label(x, y, r, fontSize, byteWidth, val.name);
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
        this.batchesData && this.batchesData.clear();
        this.map.removeOverlay(this.mouseLayer);
        this.mouseLayer.dispose();
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