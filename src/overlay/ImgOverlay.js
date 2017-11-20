import {
    Parameter
} from './base/Parameter';
import baseConfig from './../config/imgConfig';
import {
    isString
} from './../common/util';
/*
 * 点的绘制
 */
export class ImgOverlay extends Parameter {
    constructor(opts) {
        super(opts);
        this._setOptionStyle(baseConfig, opts);
        this.cacheImg = {}; //缓存图片对象
    }
    resize() {
        this.drawMap();
    }
    drawMap() {
        let me = this;
        this.postMessage('HeatOverlay.pointsToPixels', this.points, function (pixels) {
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
        this.drawMap();
    }
    _isMouseOver(x, y, imgX, imgY, imgW, imgH) {
        return !(x < imgX || x > imgX + imgW || y < imgY || y > imgY + imgH);
    }
    getTarget(x, y) {
        let pixels = this.workerData,
            ctx = this.ctx;
        for (let i = 0, len = pixels.length; i < len; i++) {
            let item = pixels[i];
            let pixel = item.pixel;
            let style = this.setDrawStyle(item);
            ctx.beginPath();
            let img = this.cacheImg[style.icon];
            //img  Not Loaded return 
            if (!img) break;
            if (style.width && style.height) {
                let xy = this._getDrawXY(pixel, style.offsets.left, style.offsets.top, style.width, style.height, 1);
                // debugger
                if (this._isMouseOver(x, y, xy.x, xy.y, style.width * style.scale, style.height * style.scale)) {
                    return {
                        index: i,
                        item: item
                    };
                }
            } else {

                let xy = this._getDrawXY(pixel, style.offsets.left, style.offsets.top, style.width, style.height, style.scale);
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
    findIndexSelectItem(item) {
        let index = -1;
        if (item) {
            // debugger
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
    }
    loadImg(img, fun) {
        let me = this;
        // debugger
        if (isString(img)) {
            let image = me.cacheImg[img];
            if (!image) {
                let image = new Image();
                image.src = img;
                image.onload = function () {
                    // debugger
                    me.cacheImg[img] = image;
                    fun(image);
                };
            } else {
                fun(image);
            }

        } else {
            fun(img);
        }
    }
    isPercent(val) {
        if (val.toString().indexOf('%') > -1) {
            return true;
        } else {
            return false;
        }

    }
    _getDrawXY(pixel, offsetL, offsetT, width, height, scale) {
        let x = 0,
            y = 0;
        let scaleW = width * scale;
        let scaleH = height * scale;
        let offsetLeft = parseFloat(offsetL);
        let offsetTop = parseFloat(offsetT);

        if (this.isPercent(offsetL)) {
            x = pixel.x + scaleW * offsetLeft / 100;
        } else {
            x = pixel.x + offsetLeft;
        }
        if (this.isPercent(offsetT)) {
            y = pixel.y + scaleH * offsetTop / 100;
        } else {
            y = pixel.y + offsetTop;
        }
        return {
            x: x,
            y: y
        };
    }
    /**
     * 根据用户配置，设置用户绘画样式
     * @param {*} item 
     */
    setDrawStyle(item) {
        let normal = this.style.normal;//正常样式
        let result = {};
        Object.assign(result, normal);
        //区间样式
        //  debugger
        let splitList = this.style.splitList;
        for (let i = 0; i < splitList.length; i++) {
            let condition = splitList[i];
            if (condition.end == null) {
                if (item.count >= condition.start) {
                    Object.assign(result, normal, condition);
                    break;
                }
            } else if (item.count >= condition.start && item.count < condition.end) {
                Object.assign(result, normal, condition);
                break;
            }
        }
        

        return result;

    }
    _loopDraw(ctx, pixels) {
        for (var i = 0, len = pixels.length; i < len; i++) {
            let item = pixels[i];
            let pixel = item.pixel;
            let style = this.setDrawStyle(item);
            this.loadImg(style.icon, (img) => {
                if (style.width && style.height) {
                    let xy = this._getDrawXY(pixel, style.offsets.left, style.offsets.top, style.width, style.height, style.scale);
                    this._drawImage(this.ctx, img, xy.x, xy.y, style.width * style.scale, style.height * style.scale);

                } else {
                    let xy = this._getDrawXY(pixel, style.offsets.left, style.offsets.top, img.width, img.height, 1);
                    this._drawImage(this.ctx, img, xy.x, xy.y, img.width, img.height);
                }
            });
        }
    }
    _drawImage(ctx, img, x, y, width, height) {
        ctx.drawImage(img, x, y, width, height);
    }
}