/*
 * 点的绘制
 */
import CanvasOverlay from '../base/CanvasOverlay.js';
import Parameter from '../base/Parameter.js';
import {
    isEmpty
} from '../../common/util.js';

import PointDragConfig from '../../config/PointDragConfig.js';


export default class PointOverlay extends Parameter {
    constructor(opts) {
        super(PointDragConfig, opts);
        this._loopDraw = this._loopDraw.bind(this);
        this._mouseupFun = this._mouseupFun.bind(this);
        this._mousedownFun = this._mousedownFun.bind(this);
        this._dblclickFun = this._dblclickFun.bind(this);
        this._selectItemIndex = -1;
        this._mouseLayer = new CanvasOverlay();
        this._isDragging = false;
        this._dragStartPixel = {
            x: 0,
            y: 0
        };

    }

    onOptionChange() {

    }
    onDataChange() {

    }
    parameterInit() {
        this.map.addOverlay(this._mouseLayer);
        this.map.addEventListener('mouseup', this._mouseupFun);
        this.map.addEventListener('mousedown', this._mousedownFun);
        this.map.addEventListener('dblclick', this._dblclickFun);
       
    }

    setOptionStyle(ops) {
        this._setStyle(this._option, ops);
    }
    resize() {

    }

    drawMouseLayer() {
        let overArr = this.overItem ? [this.overItem] : [];
        this._mouseLayer.clearCanvas();
        this._loopDraw(this._mouseLayer.ctx, this.selectItem.concat(overArr), true);

    }
    clearAll() {
        this.overItem = [];
        this._mouseLayer.clearCanvas();
        this.clearCanvas();
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

    getTarget(mouseX, mouseY) {
        let pixels = this.workerData,
            ctx = this.ctx;
        let mapSize = this.map.getSize();
        for (let i = 0, len = pixels.length; i < len; i++) {
            let item = pixels[i];
            let {
                x,
                y,
            } = item.geometry.pixel;
            let style = this.setDrawStyle(item);
            let size = style.size;
            size += style.borderWidth || 0;
            if (x > -size && y > -size && x < mapSize.width + size && y < mapSize.height + size) {
                ctx.beginPath();
                ctx.arc(x, y, size, 0, 2 * Math.PI, true);
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

        this.clearCanvas();
        this._mouseLayer.canvasResize();
        this._loopDraw(this.ctx, this.workerData, false);
        this.drawMouseLayer();

    }
    swopData(index, item) {
        if (index > -1) { //导致文字闪
            this.workerData[index] = this.workerData[this.workerData.length - 1];
            this.workerData[this.workerData.length - 1] = item;
        }
    }
    _loopDraw(ctx, pixels, otherMode) {
        let mapSize = this.map.getSize();
        let pre = null;
        for (let i = 0, len = pixels.length; i < len; i++) {
            let item = pixels[i];


            let pixel = item.geometry.pixel;
            let {
                x,
                y
            } = pixel;
            if (pre == null || (pre.x != x && pre.y != y)) {
                let style = this.setDrawStyle(item, otherMode);
                let size = style.size;

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
                pre = pixel;
            }

        }
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
    _removeMoveEvent() {
        this.map.removeEventListener('mouseup', this._mouseupFun);
        this.map.removeEventListener('mousedown', this._mousedownFun);
        this.map.removeEventListener('dblclick', this._dblclickFun);
       
    }
    Tdispose() {
        this._removeMoveEvent();
        this.map.removeOverlay(this._mouseLayer);
        this._mouseLayer.dispose();
    }
    tMousemove(event) {
        if (this._isDragging) {
            let point = this.selectItem[0];
            if (!point) return;

            let dragEndPixel = {
                x: event.offsetX,
                y: event.offsetY
            };
            point.geometry.pixel.x = dragEndPixel.x;
            point.geometry.pixel.y = dragEndPixel.y;
            point.geometry.coordinates = [event.point.lng, event.point.lat];
            this.refresh();
            this.eventConfig.onDragging.call(this, point, this._selectItemIndex, event);
        } else {
            if (this.eventType == 'onmoving') {
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
        }


    }
    _mousedownFun(event) {
        if (this.eventType == 'onmoving') return;
        let result = this.getTarget(event.pixel.x, event.pixel.y);
        this._selectItemIndex = result.index;
        if (result.index == -1) {
            return;
        }
        this._isDragging = this.styleConfig.isDrag;

        if (this._isDragging) {
            this._dragStartPixel = {
                x: event.offsetX,
                y: event.offsetY
            };
            this.map.disableDragging();
            this.eventConfig.onDragStart.call(this, result.item, this._selectItemIndex, event);
        }

        this.selectItem = [result.item];
        this.drawMouseLayer();
    }
    _mouseupFun(event) {

        if (this._isDragging) {
            let dragEndPixel = {
                x: event.offsetX,
                y: event.offsetY
            };
            if (this._dragStartPixel.x == dragEndPixel.x && this._dragStartPixel.y == dragEndPixel.y) {
                this.map.enableDragging();
            } else {
                let point = this.selectItem[0];
                if (point) {
                    point.geometry.coordinates = [event.point.lng, event.point.lat];
                    this.map.enableDragging();
                    this.eventConfig.onDragEnd.call(this, point, this._selectItemIndex, event);
                }
            }

        }
        this._isDragging = false;

    }
    _dblclickFun(event) {
        if (this._selectItemIndex > -1) {
            this.eventConfig.onDblclick.call(this, this.selectItem[0], this._selectItemIndex, event);
        }

    }
    tMouseClick() {

    }
}