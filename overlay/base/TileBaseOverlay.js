import {
    CanvasOverlay
} from './CanvasOverlay';
import {
    isArray,
    isObject
} from './../../common/util';
import {
    pointToPixel
} from '../../geo/index';
import {
    Point
} from '../../geo/Point';
import {
    ajax
} from '../../common/ajax';

export class TileBaseOverlay extends CanvasOverlay {

    constructor() {
        super();
        this._cacheData = [];
        // this.resize();
    }
    /**
     * 查找屏幕可展示哪些围栏
     */
    getScreenShowTilesData() {
        let zoom = this.map.getZoom();
        let kb = this.map.KB;
        let arr = [],
            requestTiles = [];
        for (let j = 0; j < kb.length; j++) {
            let temp = kb[j];
            let tile = this._cacheData.find((item) => {
                return item.x == temp.x && item.y == temp.y
            })
            if (tile) {
                arr.push(tile);
            } else {
                requestTiles.push({
                    x: temp.x,
                    y: temp.y,
                    zoom: zoom
                });
            }
        }

        return {
            cacheTiles: arr,
            requestTiles: requestTiles
        };
    }

    getScreenShowTiles() {
        return this.map.KB;
    }
    setDrawData(cacheData) {
        let me = this;
        let data = [], //新数据
            data2 = []; //历史数据
        let zo = me.map.getZoom();
        cacheData.forEach((item) => {
            if (item.pixelData.length == 0 || zo != item.zoom) {
                data.push(item);
            } else {
                data2.push(item);
            }
        });

        this.postMessage('HeatTileOverlay.pointsToPixels', data, function (pixels) {
            if (me.eventType == 'onmoving') {
                return
            };
            let center = me.map.getCenter();
            let zoom = me.map.getZoom();
            console.log('zoom', zoom)
            data.forEach((item) => {
                item.center.lng = center.lng;
                item.center.lat = center.lat;
                item.zoom = zoom;
                let temp = pixels.find((a) => {
                    return a.x == item.x && a.y == item.y;
                });
                if (temp) {
                    item.pixelData = temp.pixelData;
                }
            });
            //向量差运算 求出像素坐标

            let projection = me.map.getMapType().getProjection();
            let pixels1 = projection.lngLatToPoint(new Point(center.lng, center.lat));
            data2.forEach((item) => {
                let _center = item.center;
                let pixels2 = projection.lngLatToPoint(new Point(_center.lng, _center.lat));
                item.center.lng = center.lng;
                item.center.lat = center.lat;
                console.log(pixels1, pixels2);
                let differenceX = pixels1.x - pixels2.x;
                let differenceY = pixels1.y - pixels2.y;
                item.pixelData.forEach((pixel) => {
                    pixel.x = pixel.x - differenceX;
                    pixel.y = pixel.y - differenceY;
                })
            });
            me._toDraw(data, data2);
        });
    }

    resize() {
        //获取需要
        let result = this.getScreenShowTilesData();
        let cacheTiles = result.cacheTiles;
        let me = this;
        if (result.requestTiles.length > 0) {
            ajax({
                url: "/inMap/tile",
                type: "post",
                data: result.requestTiles,
                success(data) {
                    //debugger
                    data.data.forEach((item) => {
                        let temp = me.pushRow(item);
                        cacheTiles.push(temp);
                    })
                    me.setDrawData(cacheTiles);
                },
                error() {

                }
            })
        } else {
            me.setDrawData(result.cacheTiles);
        }

    }
    _toDraw(d1, d2) {
        let pixels = [];
        d1.forEach((item) => {
            pixels.push.apply(pixels, item.pixelData);
        });
        d2.forEach((item) => {
            pixels.push.apply(pixels, item.pixelData);
        });
        //debugger
        this.drawMap(pixels);
    }
    drawMap(potion) {
        throw ('绘画的抽象方法 需要子类去实现');
    }
    _push(item) {
        let reulst = {
            x: item.x,
            y: item.y,
            zoom: item.zoom,
            center: {
                lng: null,
                lat: null,
            },
            data: item.data,
            pixelData: []
        }
        this._cacheData.push(reulst);
        return reulst;
    }

    pushData(data) {
        if (isArray(data)) {
            this.pushArray(data);
        } else if (isObject(data)) {
            this.pushRow(data);
        }
    }
    pushArray(data) {
        data.forEach((item) => {
            if (!this.isContains(item)) {
                this._push(item);
            }
        });

    }
    pushRow(item) {
        if (!this.isContains(item)) {
            return this._push(item);

        }

    }
    isContains(item) {
        let index = this._cacheData.findIndex((it) => {
            return it.x == item.x && it.y == item.y;
        });
        return index > -1;
    }
}