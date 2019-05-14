import Parameter from './base/Parameter';
import Config from '../config/LabelConfig';
import State from './../config/OnStateConfig';

export default class LabelOverlay extends Parameter {
    constructor(opts) {
        super(Config, opts);
        this._state = null;
    }
    _onOptionChange() {

    }
    _onDataChangee() {

    }
    setOptionStyle(ops) {
        this._setStyle(this._option, ops);
    }
    _setState(val) {
        this._state = val;
        this._eventConfig.onState(this._state, this);
    }
    _toDraw() {
        this._drawMap();
    }
    _translation(distanceX, distanceY) {
        for (let i = 0; i < this._workerData.length; i++) {
            let pixel = this._workerData[i].geometry.pixel;
            pixel.x = pixel.x + distanceX;
            pixel.y = pixel.y + distanceY;
        }
        this.refresh();
    }

    _drawMap() {
        this._clearCanvas();
        this._setState(State.computeBefore);
        this._postMessage('HeatOverlay.pointsToPixels', this._getTransformData(), (pixels, margin, zoom) => {
            this._setState(State.conputeAfter);
            this._setWorkerData(pixels);
            this._updateOverClickItem();

            if (this._map.getZoom() == zoom) {
                this._translation(margin.left - this._margin.left, margin.top - this._margin.top);
            } else {
                this._translation(0, 0);
            }
            margin = null;
            pixels = null;
        });
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
        let data = this._workerData;
        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            let pixel = item.geometry.pixel;
            let style = this._setDrawStyle(item, i);
            let x1 = (pixel.x - pixel.width / 2) + style.offsets.left;
            let y1 = pixel.y + style.offsets.top;
            if (this._isMouseOver(mouseX, mouseY, x1, y1, pixel.width, pixel.height)) {
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
    _isMouseOver(mouseX, mouseY, x, y, w, h) {
        return !(mouseX < x || mouseX > x + w || mouseY < y || mouseY > y + h);
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
        this._setState(State.drawBefore);
        this._clearCanvas();
        this._drawLabel(this._ctx, this._workerData);
        this._setState(State.drawAfter);
    }
    _swopData(index, item) {
        if (index > -1) {
            this._workerData[index] = this._workerData[this._workerData.length - 1];
            this._workerData[this._workerData.length - 1] = item;
        }
    }
    _drawLabel(ctx, pixels) {
        ctx.textBaseline = 'top';
        for (let i = 0; i < pixels.length; i++) {
            let item = pixels[i];
            let pixel = item.geometry.pixel;
            ctx.beginPath();
            let style = this._setDrawStyle(item, true, i);
            ctx.font = style.font;
            ctx.fillStyle = style.color;

            if (style.shadowColor) {
                ctx.shadowColor = style.shadowColor || 'transparent';
                ctx.shadowBlur = style.shadowBlur || 10;
            } else {
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
            }

            let byteWidth = ctx.measureText(item.name).width;
            if (!pixel.width) {
                pixel['width'] = byteWidth;
                pixel['height'] = parseInt(style.font);
            }
            const x = (pixel.x - pixel.width / 2) + style.offsets.left;
            const y = pixel.y + style.offsets.top;
            ctx.beginPath();
            ctx.fillText(item.name, x, y);
            ctx.fill();
        }
    }
}
