import {
    isEmpty,
    detectmob,
    clearPushArray
} from '../common/Util';
import CanvasOverlay from './base/CanvasOverlay.js';
import Parameter from './base/Parameter';
import LineStringConfig from '../config/LineStringConfig';
import State from './../config/OnStateConfig';
let isMobile = detectmob();
export default class LineStringOverlay extends Parameter {
    constructor(ops) {
        super(LineStringConfig, ops);
        this._state = null;
        this._mouseLayer = new CanvasOverlay({
            zIndex: this._zIndex + 1
        });
        this._selectItemIndex = -1;
        this._onDataChange();
    }
    setOptionStyle(ops) {
        this._setStyle(this._option, ops);
    }
    setZIndex(zIndex) {
        this._zIndex = zIndex;
        if (this._container) this._container.style.zIndex = this._zIndex;

        this._mouseLayer.setZIndex(this._zIndex + 1);
    }
    _onDataChange() {
        this._selectItemIndex = -1;
        if (this._selectItem.length > 0) {
            this._selectItemIndex = this._data.findIndex((item) => {
                return this._selectItem[0] == item;
            });
        }

    }

    _parameterInit() {
        this._map.addOverlay(this._mouseLayer);
    }
    _drawMouseLayer() {
        let overArr = this._overItem ? [this._overItem] : [];

        this._mouseLayer._clearCanvas();
        this._drawLine(this._mouseLayer._getContext(), this._selectItem.concat(overArr), true);
    }
    _clearAll() {
        this._mouseLayer._clearCanvas();
        this._clearCanvas();
    }
    _setState(val) {
        this._state = val;
        this._eventConfig.onState.call(this, this._state);
    }
    _translation(distanceX, distanceY) {
        for (let i = 0; i < this._workerData.length; i++) {
            let pixels = this._workerData[i].geometry.pixels;
            for (let j = 0; j < pixels.length; j++) {
                let pixel = pixels[j];
                pixel[0] = pixel[0] + distanceX;
                pixel[1] = pixel[1] + distanceY;
            }
        }
        this.refresh();
    }
    _getTarget(mouseX, mouseY) {

        for (let i = 0, len = this._workerData.length; i < len; i++) {
            let item = this._workerData[i];
            let pixels = item.geometry.pixels;
            let style = this._setDrawStyle(item, false, i);
            for (let k = 0, len = pixels.length; k < len - 2; k++) {
                let pixel1 = pixels[k];
                let pixel2 = pixels[k + 1];
                if (this._calcIsInsideThickLineSegment(pixel1, pixel2, mouseX, mouseY, style.borderWidth)) {
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
                return item == val;
            });
        }
        return index;
    }

    _calcIsInsideThickLineSegment(line1, line2, mouseX, mouseY, lineThickness) {
        let L2 = (((line2[0] - line1[0]) * (line2[0] - line1[0])) + ((line2[1] - line1[1]) * (line2[1] - line1[1])));
        if (L2 == 0) return false;
        let r = (((mouseX - line1[0]) * (line2[0] - line1[0])) + ((mouseY - line1[1]) * (line2[1] - line1[1]))) / L2;
        if (r < 0) {
            return (Math.sqrt(((line1[0] - mouseX) * (line1[0] - mouseX)) + ((line1[1] - mouseY) * (line1[1] - mouseY))) <= lineThickness);
        } else if ((0 <= r) && (r <= 1)) {
            let s = (((line1[1] - mouseY) * (line2[0] - line1[0])) - ((line1[0] - mouseX) * (line2[1] - line1[1]))) / L2;
            return (Math.abs(s) * Math.sqrt(L2) <= lineThickness);
        } else {
            return (Math.sqrt(((line2[0] - mouseX) * (line2[0] - mouseX)) + ((line2[1] - mouseY) * (line2[1] - mouseY))) <= lineThickness);
        }
    }

    refresh() {
        this._setState(State.drawBefore);
        this._mouseLayer._canvasResize();
        this._clearCanvas();
        this._drawLine(this._ctx, this._workerData, false);
        this._anewSelectItem();
        this._drawMouseLayer();
        this._setState(State.drawAfter);
    }
    _anewSelectItem() {
        if (this._selectItemIndex > -1) {
            this._selectItem = [this._workerData[this._selectItemIndex]];
        } else {
            this._selectItem = [];
        }
    }
    _toDraw() {
        this._drawMap();
    }
    _getTransformData() {
        return this._workerData.length > 0 ? this._workerData : this._data;
    }
    _drawMap() {
        this._clearAll();
        let zoomUnit = Math.pow(2, 18 - this._map.getZoom());
        let projection = this._map.getMapType().getProjection();
        let mcCenter = projection.lngLatToPoint(this._map.getCenter());
        let nwMc = new BMap.Pixel(mcCenter.x - this._map.getSize().width / 2 * zoomUnit, mcCenter.y + this._map.getSize().height / 2 * zoomUnit); //左上角墨卡托坐标
        let params = {
            points: this._getTransformData(),
            nwMc: nwMc,
            zoomUnit: zoomUnit,
            lineOrCurve: this._styleConfig.normal.lineOrCurive,
            deltaAngle: this._styleConfig.normal.deltaAngle
        };
        this._setState(State.computeBefore);
        this._postMessage('LineStringOverlay.calculatePixel', params, (pixels, margin) => {
            if (this._eventTypee == 'onmoving') {
                return;
            }
            this._setState(State.conputeAfter);
            clearPushArray(this._workerData, pixels);
            this._translation(margin.left - this._margin.left, margin.top - this._margin.top);

            params = null;
            margin = null;
        });
    }
    /**
     * 
     * @param {*} ctx 上下文
     * @param {*} data 数据集
     * @param {*} otherMode 是否绘画选中数据样式
     */
    _drawLine(ctx, data, otherMode) {
        let normal = this._styleConfig.normal;
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        if (normal.globalCompositeOperation) {
            ctx.globalCompositeOperation = normal.globalCompositeOperation;
        }
        if (normal.shadowColor) {
            ctx.shadowColor = normal.shadowColor;

        }
        if (normal.shadowBlur) {
            ctx.shadowBlur = normal.shadowBlur;
        }

        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let style = this._setDrawStyle(item, otherMode, i);
            ctx.strokeStyle = style.borderColor;
            let pixels = item.geometry.pixels;
            ctx.beginPath();
            ctx.moveTo(pixels[0][0], pixels[0][1]);
            for (let j = 1; j < pixels.length; j++) {
                ctx.lineTo(pixels[j][0], pixels[j][1]);
            }
            ctx.lineWidth = style.borderWidth;
            pixels = null;
            ctx.stroke();
        }


    }
    _Tdispose() {
        this._map.removeOverlay(this._mouseLayer);
        this._mouseLayer.dispose();
    }
    _tMousemove(event) {
        if (this._eventTypee == 'onmoving') {
            return;
        }
        if (!this._tooltipConfig.show && isEmpty(this._styleConfig.mouseOver)) {
            return;
        }
        let result = this._getTarget(event.pixel.x, event.pixel.y);
        let temp = result.item;

        if (temp != this._overItem) { //防止过度重新绘画
            this._overItem = temp;
            this._eventTypee = 'mousemove';
            if (!isEmpty(this._styleConfig.mouseOver)) {
                this._drawMouseLayer();
            }
        }
        if (temp) {
            this._map.setDefaultCursor('pointer');
        } else {
            this._map.setDefaultCursor('default');
        }

        this._setTooltip(event);

    }
    _tMouseClick(event) {
        if (this._eventTypee == 'onmoving') return;
        let result = this._getTarget(event.pixel.x, event.pixel.y);
        if (result.index == -1) {
            return;
        }

        let item = result.item;
        this._selectItem = [result.item];
        this._selectItemIndex = result.index;

        this._eventConfig.onMouseClick(this._selectItem, event);
        if (isMobile) {
            this._overItem = item;
            this._setTooltip(event);
        }
        this._drawMouseLayer();
    }
}