import Parameter from './base/Parameter';
import ImgConfig from './../config/ImgConfig';
import {
    isString,
    clearPushArray
} from './../common/Util';
import State from './../config/OnStateConfig';
/*
 * 点的绘制
 */
export default class ImgOverlay extends Parameter {
    constructor(opts) {
        super(ImgConfig, opts);
        this._cacheImg = {}; //缓存图片对象
        this._state = null;
    }
    _toDraw(callback) {
        this._drawMap(callback);
    }
    setOptionStyle(ops, callback) {
        this._setStyle(this._option, ops, callback);
    }
    _setState(val) {
        this._state = val;
        this._eventConfig.onState(this._state, this);
    }
    _translation(distanceX, distanceY) {
        for (let i = 0; i < this._workerData.length; i++) {
            let pixel = this._workerData[i].geometry.pixel;
            pixel.x = pixel.x + distanceX;
            pixel.y = pixel.y + distanceY;
            pixel = null;
        }

        this.refresh();

    }
    pushData(data, callback) {
        if (!Array.isArray(data)) return;
        this._setState(State.computeBefore);
        this._postMessage('HeatOverlay.pointsToPixels', data, (pixels, margin) => {
            if (this._eventType == 'onmoving') {
                return;
            }
            this._workerData.push(...pixels);
            this._setState(State.conputeAfter);
            this._translation(margin.left - this._margin.left, margin.top - this._margin.top);
            callback && callback(this);
        });
    }
    filter(func) {
        const arrData = this._workerData.filter(func);
        clearPushArray(this._workerData, arrData);
        this.refresh();
    }
    _drawMap(callback) {

        this._setState(State.computeBefore);
        this._postMessage('HeatOverlay.pointsToPixels', this._getTransformData(), (pixels, margin) => {
            if (this._eventType == 'onmoving') {
                return;
            }
            this._setState(State.conputeAfter);

            this._setWorkerData(pixels);
            this._translation(margin.left - this._margin.left, margin.top - this._margin.top);
            margin = null;
            pixels = null;
            callback && callback(this);
            this._emitInit();
        });
    }

    _isMouseOver(x, y, imgX, imgY, imgW, imgH) {
        return !(x < imgX || x > imgX + imgW || y < imgY || y > imgY + imgH);
    }
    _getTarget(x, y) {
        let pixels = this._workerData;

        for (let i = 0, len = pixels.length; i < len; i++) {
            let item = pixels[i];
            let pixel = item.geometry.pixel;
            let style = this._setDrawStyle(item, i);
            let img;
            if (isString(img)) {
                img = this._cacheImg[style.icon];
            } else {
                img = style.icon;
            }

            //img  Not Loaded return
            if (!img) break;
            if (style.width && style.height) {
                let xy = this._getDrawXY(pixel, style.offsets.left, style.offsets.top, style.width, style.height, 1);

                if (this._isMouseOver(x, y, xy.x, xy.y, style.width, style.height)) {
                    return {
                        index: i,
                        item: item
                    };
                }
            } else {

                let xy = this._getDrawXY(pixel, style.offsets.left, style.offsets.top, style.width, style.height);
                if (this._isMouseOver(x, y, xy.x, xy.y, img.width, img.height)) {

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
        this._setState(State.drawBefore);
        this._clearCanvas();
        this._loopDraw(this._ctx, this._workerData);
        this._setState(State.drawAfter);

    }
    _loadImg(img, fun) {
        let me = this;
        if (isString(img)) {
            let image = me._cacheImg[img];
            if (!image) {
                let image = new Image();
                image.src = img;
                image.onload = function () {
                    me._cacheImg[img] = image;
                    fun(image);
                };
            } else {
                fun(image);
            }

        } else {
            fun(img);
        }
    }
    _isPercent(val) {
        if (val.toString().indexOf('%') > -1) {
            return true;
        } else {
            return false;
        }

    }
    _getDrawXY(pixel, offsetL, offsetT, width, height) {
        let x = 0,
            y = 0;
        let scaleW = width;
        let scaleH = height;
        let offsetLeft = parseFloat(offsetL);
        let offsetTop = parseFloat(offsetT);

        if (this._isPercent(offsetL)) {
            x = pixel.x + scaleW * offsetLeft / 100;
        } else {
            x = pixel.x + offsetLeft;
        }
        if (this._isPercent(offsetT)) {
            y = pixel.y + scaleH * offsetTop / 100;
        } else {
            y = pixel.y + offsetTop;
        }
        return {
            x: x,
            y: y
        };
    }
    _loopDraw(ctx, pixels) {
        let mapSize = this._map.getSize();
        for (let i = 0, len = pixels.length; i < len; i++) {
            let item = pixels[i];
            let pixel = item.geometry.pixel;
            let style = this._setDrawStyle(item, true, i);
            if (pixel.x > -style.width && pixel.y > -style.height && pixel.x < mapSize.width + style.width && pixel.y < mapSize.height + style.height) {
                this._loadImg(style.icon, (img) => {
                    if (style.width && style.height) {
                        let xy = this._getDrawXY(pixel, style.offsets.left, style.offsets.top, style.width, style.height);
                        this._drawImage(this._ctx, img, xy.x, xy.y, style.width, style.height);

                    } else {
                        let xy = this._getDrawXY(pixel, style.offsets.left, style.offsets.top, img.width, img.height, 1);
                        this._drawImage(this._ctx, img, xy.x, xy.y, img.width, img.height);
                    }
                    if (style.label.show) {
                        this._ctx.font = style.label.font;
                        this._ctx.fillStyle = style.label.color;
                        let width = this._ctx.measureText(item.name).width;
                        const x = (pixel.x - width / 2) + style.label.offsets.left;
                        const y = pixel.y + style.label.offsets.top;
                        this._ctx.fillText(item.name, x, y);
                    }
                });
            }
        }
    }
    _drawImage(ctx, img, x, y, width, height) {
        ctx.drawImage(img, x, y, width, height);
    }
}
