import Parameter from './base/Parameter';
import PointConfig from '../config/LabelConfig';
import State from './../config/OnState';

export default class LabelOverlay extends Parameter {
    constructor(opts) {
        super(PointConfig, opts);
        this.state = null;
    }
    onOptionChange() {

    }
    onDataChange() {

    }
    setOptionStyle(ops) {
        this._setStyle(this.baseConfig, ops);
    }
    setState(val) {
        this.state = val;
        this.eventConfig.onState(this.state);
    }
    resize() {
        this.drawMap();
    }
    translation(distanceX, distanceY) {
        for (let i = 0; i < this.workerData.length; i++) {
            let pixel = this.workerData[i].geometry.pixel;
            pixel.x = pixel.x + distanceX;
            pixel.y = pixel.y + distanceY;
        }
        this.refresh();
    }

    drawMap() {
        this.clearCanvas();
        this.setState(State.computeBefore);
        this.postMessage('HeatOverlay.pointsToPixels', this.getTransformData(), (pixels, margin, zoom) => {
            this.setState(State.conputeAfter);
            this.setWorkerData(pixels);
            this.updateOverClickItem();

            if (this.map.getZoom() == zoom) {
                this.translation(margin.left - this.margin.left, margin.top - this.margin.top);
            } else {
                this.translation(0, 0);
            }
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


    getTarget(mouseX, mouseY) {
        let data = this.workerData;
        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            let pixel = item.geometry.pixel;
            let x1 = pixel.x - pixel.width / 2;
            let y1 = pixel.y;
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
        this._drawLabel(this.ctx, this.workerData);
        this.setState(State.drawAfter);
    }
    swopData(index, item) {
        if (index > -1) {
            this.workerData[index] = this.workerData[this.workerData.length - 1];
            this.workerData[this.workerData.length - 1] = item;
        }
    }
    _drawLabel(ctx, pixels) {
        ctx.textBaseline = 'top';
        for (let i = 0; i < pixels.length; i++) {
            let item = pixels[i];
            let pixel = item.geometry.pixel;
            ctx.beginPath();
            let style = this.setDrawStyle(item);
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

            ctx.beginPath();
            ctx.fillText(item.name, pixel.x - byteWidth / 2, pixel.y);
            ctx.fill();
        }
    }
}