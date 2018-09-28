/*
 * 点的绘制
 */
import CanvasOverlay from '../base/CanvasOverlay.js';
import Parameter from '../base/Parameter.js';
import {
    isEmpty
} from '../../common/Util.js';

import PointDragConfig from '../../config/PointDragConfig.js';


export default class PointOverlay extends Parameter {
    constructor(opts) {
        super(PointDragConfig, opts);
        this._loopDraw = this._loopDraw.bind(this);
        this._mouseupFun = this._mouseupFun.bind(this);
        this._mousedownFun = this._mousedownFun.bind(this);
        this._dblclickFun = this._dblclickFun.bind(this);
        this._selectItemIndex = -1;
        this._mouseLayer = new CanvasOverlay({
            zIndex: this._zIndex + 1
        });
        this._isDragging = false;
        this._dragStartPixel = {
            x: 0,
            y: 0
        };

    }

    _onOptionChange() {

    }
    setZIndex(zIndex) {
        this._zIndex = zIndex;
        if (this._container) this._container.style.zIndex = this._zIndex;

        this._mouseLayer.setZIndex(this._zIndex + 1);
    }
    _onDataChangee() {

    }
    _parameterInit() {
        this._map.addOverlay(this._mouseLayer);
        this._map.addEventListener('mouseup', this._mouseupFun);
        this._map.addEventListener('mousedown', this._mousedownFun);
        this._map.addEventListener('dblclick', this._dblclickFun);

    }

    setOptionStyle(ops) {
        this._setStyle(this._option, ops);
    }
    _toDraw() {

    }

    _drawMouseLayer() {
        let overArr = this._overItem ? [this._overItem] : [];
        this._mouseLayer._clearCanvas();
        this._loopDraw(this._mouseLayer._getContext(), this._selectItem.concat(overArr), true);

    }
    _clearAll() {
        this._overItem = null;
        this._mouseLayer._clearCanvas();
        this._clearCanvas();
    }

    _updateOverClickItem() {
        let overArr = this._overItem ? [this._overItem] : [];
        let allItems = this._selectItem.concat(overArr);

        for (let i = 0; i < allItems.length; i++) {
            let item = allItems[i];
            let ret = this._workerData.find(function (val) {
                let itemCoordinates = item.geometry.coordinates;
                let valCoordinates = val.geometry.coordinates;
                return val && itemCoordinates[0] == valCoordinates[0] && itemCoordinates[1] == valCoordinates[1] && val.count == item.count;
            });
            item.geometry.pixel = ret.geometry.pixel;
        }
    }

    _getTarget(mouseX, mouseY) {
        let pixels = this._workerData,
            ctx = this._ctx;
        let mapSize = this._map.getSize();
        for (let i = 0, len = pixels.length; i < len; i++) {
            let item = pixels[i];
            let {
                x,
                y,
            } = item.geometry.pixel;
            let style = this._setDrawStyle(item, false, i);
            let size = style.size;
            size += style.borderWidth || 0;
            if (x > -size && y > -size && x < mapSize.width + size && y < mapSize.height + size) {
                ctx.beginPath();
                ctx.arc(x, y, size, 0, 2 * Math.PI, true);
                if (ctx.isPointInPath(mouseX * this._devicePixelRatio, mouseY * this._devicePixelRatio)) {
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
    _findIndexSelectItem(item) {
        let index = -1;
        if (item) {
            index = this._selectItem.findIndex(function (val) {
                let itemCoordinates = item.geometry.coordinates;
                let valCoordinates = val.geometry.coordinates;
                return val && itemCoordinates[0] == valCoordinates[0] && itemCoordinates[1] == valCoordinates[1] && val.count == item.count;
            });
        }
        return index;
    }
    refresh() {

        this._clearCanvas();
        this._mouseLayer._canvasResize();
        this._loopDraw(this._ctx, this._workerData, false);
        this._drawMouseLayer();

    }
    _swopData(index, item) {
        if (index > -1) { //导致文字闪
            this._workerData[index] = this._workerData[this._workerData.length - 1];
            this._workerData[this._workerData.length - 1] = item;
        }
    }
    _loopDraw(ctx, pixels, otherMode) {
        let mapSize = this._map.getSize();
        let pre = null;
        for (let i = 0, len = pixels.length; i < len; i++) {
            let item = pixels[i];
            let pixel = item.geometry.pixel;
            let {
                x,
                y
            } = pixel;
            if (pre == null || (pre.x != x && pre.y != y)) {
                let style = this._setDrawStyle(item, otherMode, i);
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
        this._map.removeEventListener('mouseup', this._mouseupFun);
        this._map.removeEventListener('mousedown', this._mousedownFun);
        this._map.removeEventListener('dblclick', this._dblclickFun);

    }
    _Tdispose() {
        this._removeMoveEvent();
        this._map.removeOverlay(this._mouseLayer);
        this._mouseLayer.dispose();
    }
    _tMousemove(event) {
        if (this._isDragging) {
            let point = this._selectItem[0];
            if (!point) return;

            let dragEndPixel = {
                x: event.offsetX,
                y: event.offsetY
            };
            point.geometry.pixel.x = dragEndPixel.x;
            point.geometry.pixel.y = dragEndPixel.y;
            point.geometry.coordinates = [event.point.lng, event.point.lat];
            this.refresh();
            this._eventConfig.onDragging.call(this, point, this._selectItemIndex, event);
        } else {
            if (this._eventType == 'onmoving') {
                return;
            }
            let result = this._getTarget(event.pixel.x, event.pixel.y);
            let temp = result.item;

            if (temp != this._overItem) { //防止过度重新绘画
                this._overItem = temp;
                this._eventType = 'mousemove';
                if (!isEmpty(this._styleConfig.mouseOver)) {
                    this._drawMouseLayer();
                }
            }
            if (temp) {
                this._map.setDefaultCursor('pointer');
            } else {
                this._map.setDefaultCursor('default');
            }
        }


    }
    _mousedownFun(event) {
        if (this._eventType == 'onmoving') return;
        let result = this._getTarget(event.pixel.x, event.pixel.y);
        this._selectItemIndex = result.index;
        if (result.index == -1) {
            return;
        }
        this._isDragging = this._styleConfig.isDrag;

        if (this._isDragging) {
            this._dragStartPixel = {
                x: event.offsetX,
                y: event.offsetY
            };
            this._map.disableDragging();
            this._eventConfig.onDragStart.call(this, result.item, this._selectItemIndex, event);
        }

        this._selectItem = [result.item];
        this._drawMouseLayer();
    }
    _mouseupFun(event) {

        if (this._isDragging) {
            let dragEndPixel = {
                x: event.offsetX,
                y: event.offsetY
            };
            if (this._dragStartPixel.x == dragEndPixel.x && this._dragStartPixel.y == dragEndPixel.y) {
                this._map.enableDragging();
            } else {
                let point = this._selectItem[0];
                if (point) {
                    point.geometry.coordinates = [event.point.lng, event.point.lat];
                    this._map.enableDragging();
                    this._eventConfig.onDragEnd.call(this, point, this._selectItemIndex, event);
                }
            }

        }
        this._isDragging = false;

    }
    _dblclickFun(event) {
        if (this._selectItemIndex > -1) {
            this._eventConfig.onDblclick.call(this, this._selectItem[0], this._selectItemIndex, event);
        }

    }
    _tMouseClick() {

    }
}