import Parameter from './base/Parameter.js';
import GeoHashConfig from './../config/GeoHashConfig.js';
import State from './../config/OnStateConfig';

export default class GriddingOverlay extends Parameter {
    constructor(ops) {
        super(GeoHashConfig, ops);
        this._state = null;
        this._rectangle = {
            width: 0,
            height: 0
        };

        this._mpp = {};
    }

    _parameterInit() {

    }
    setOptionStyle(ops) {
        this._setStyle(this._option, ops);
    }

    _setState(val) {
        this._state = val;
        this._eventConfig.onState.call(this, this._state);
    }
    draw() {
        this._toDraw();
    }
    refresh() {
        this._setState(State.drawBefore);
        this._drawRec();
        this._setState(State.drawAfter);
    }
    _toDraw() {
        this._drawMap();
    }
    _onOptionChange() {
        this._map && this._createColorSplit();
    }
    _onDataChange() {
        this._map && this._createColorSplit();
    }
    _getGeoHashM(len) {
        let w = 0,
            h = 0;
        switch (len) {
            case 1:
                w = 5000000;
                h = 5000000;
                break;
            case 2:
                w = 1250000;
                h = 625000;
                break;
            case 3:
                w = 156000;
                h = 156000;
                break;
            case 4:
                w = 39100;
                h = 19500;
                break;
            case 5:
                w = 4890;
                h = 4890;
                break;

            case 6:
                w = 1220;
                h = 610;

                break;
            case 7:
                w = 152;
                h = 152;
                break;
            case 8:
                w = 38.2;
                h = 19.1;
                break;
            case 9:
                w = 4.77;
                h = 4.77;
                break;
            case 10:
                w = 1.19;
                h = 0.596;
                break;
            default:
                break;
        }
        return {
            w,
            h
        };
    }
    _calculateMpp() {
        let zoom = this._map.getZoom();
        if (this._mpp[zoom]) {
            return this._mpp[zoom];
        } else {
            this._mpp[zoom] = this._getMpp();
            return this._mpp[zoom];
        }
    }
    /**
     * 获得每个像素对应多少米	
     */
    _getMpp() {
        let mapCenter = this._map.getCenter();
        let assistValue = 10;
        let cpt = new BMap.Point(mapCenter.lng, mapCenter.lat + assistValue);
        let dpx = Math.abs(this._map.pointToPixel(mapCenter).y - this._map.pointToPixel(cpt).y);
        return this._map.getDistance(mapCenter, cpt) / dpx;
    }
    _drawMap() {
        this._clearData();
        let params = {
            points: this._getTransformData()
        };
        this._setState(State.computeBefore);
        this._postMessage('GeoHashOverlay.encode', params, (grids) => {
            if (this._eventType == 'onmoving') {
                return;
            }
            this._canvasResize();
            this._workerData = grids;

            let mpp = this._calculateMpp();
            if (mpp == 0 || isNaN(mpp)) {
                return;
            }
            console.log(grids);
            if (grids.length > 0) {
                // The cell sizes of geohashes of different lengths are as follows; 
                let meter = this._getGeoHashM(grids[0].geohash.length);
                // Size of the rectangle
                // this._rectangle = parseInt(meter / mpp, 10);
                this._rectangle.width = parseInt(meter.w / mpp, 10);
                this._rectangle.height = parseInt(meter.h / mpp, 10);
                console.log(this._rectangle);
            } else {
                this._rectangle.width = 0;
                this._rectangle.height = 0;
            }
            this._setState(State.conputeAfter);

            this._setState(State.drawBefore);

            if (this._eventType != 'onmoveend' || this._styleConfig.splitList == null || this._styleConfig.splitList.length < this._styleConfig.colors.length) {
                this._createColorSplit();
            }
            this.refresh();

        });
    }


    _isMouseOver(mouseX, mouseY, x, y, w, h) {
        return !(mouseX < x || mouseX > x + w || mouseY < y || mouseY > y + h);
    }
    _findIndexSelectItem(item) {
        let index = -1;
        if (item) {
            index = this._selectItem.findIndex(function (val) {
                return val && val.geohash == item.geohash;
            });
        }
        return index;
    }
    _getTarget(x, y) {
        let mapSize = this._map.getSize();
        for (let i = 0; i < this._workerData.length; i++) {
            let item = this._workerData[i];
            let x1 = item.pixel.x;
            let y1 = item.pixel.y;
            if (x > -this._rectangle.width && y > -this._rectangle.height && x < mapSize.width + this._rectangle.width && y < mapSize.height + this._rectangle.height) {
                if (this._isMouseOver(x, y, x1, y1, this._rectangle.width, this._rectangle.height)) {
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

    _compileSplitList(data) {

        let colors = this._styleConfig.colors;
        if (colors.length < 0 || data.length <= 0) return;
        data = data.sort((a, b) => {
            return parseFloat(a.count) - parseFloat(b.count);
        });
        let mod = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

        let colorMod = mod.slice(0, colors.length).reverse();
        let sunMod = colorMod.reduce((sum, val) => {
            return sum + val;
        }, 0);
        let split = [];
        let star = 0,
            end = 0,
            sign = 0,
            length = data.length;

        for (let i = 0; i < colorMod.length; i++) {
            if (split.length == 0) {
                star = data[0].count;
            } else {
                star = split[i - 1].end;
            }
            if (i == colorMod.length - 1) {
                end = null;
            } else {
                sign = parseInt((colorMod[i] / sunMod) * length) + sign;
                end = data[sign].count;
            }
            split.push({
                start: star,
                end: end,
                backgroundColor: null,
            });
        }
        let result = [];
        for (let i = 0; i < split.length; i++) {
            let item = split[i];
            if (item.start != item.end) {
                item.backgroundColor = colors[result.length];
                result.push(item);
            }
        }
        split = [];
        this._styleConfig.splitList = result;

    }
    _createColorSplit() {
        this._styleConfig.colors.length > 0 && this._compileSplitList(this._workerData);
        this._setlegend(this._legendConfig, this._styleConfig.splitList);

    }
    _setTooltip(event) {
        this.toolTip.render(event, this._overItem);
    }
    _getStyle(item, i) {
        if (item.count == 0) {
            return {
                backgroundColor: 'rgba(255,255,255,0)'
            };
        } else {
            return this._setDrawStyle(item, true, i);
        }

    }
    _drawRec() {
        this._clearCanvas();
        if (this._rectangle.width == 0 || this._rectangle.height == 0) return;
        let style = this._styleConfig.normal;
        let mapSize = this._map.getSize();
        this._ctx.shadowOffsetX = 0;
        this._ctx.shadowOffsetY = 0;
        for (let i = 0; i < this._workerData.length; i++) {
            let item = this._workerData[i];
            let x = item.pixel.x;
            let y = item.pixel.y;
            if (x > -this._rectangle.width && y > -this._rectangle.height && x < mapSize.width + this._rectangle.width && y < mapSize.height + this._rectangle.height) {
                let drawStyle = this._getStyle(item, i);
                if (drawStyle.shadowColor) {
                    this._ctx.shadowColor = drawStyle.shadowColor || 'transparent';
                    this._ctx.shadowBlur = drawStyle.shadowBlur || 10;
                } else {
                    this._ctx.shadowColor = 'transparent';
                    this._ctx.shadowBlur = 0;
                }
                this._ctx.fillStyle = drawStyle.backgroundColor;
                this._ctx.fillRect(x, y, this._rectangle.width - style.padding, this._rectangle.height - style.padding);
            }

        }
    }
}