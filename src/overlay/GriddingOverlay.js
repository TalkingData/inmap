import Parameter from './base/Parameter.js';
import GriddingConfig from './../config/GriddingConfig.js';
import State from './../config/OnStateConfig';

export default class GriddingOverlay extends Parameter {
    constructor(ops) {
        super(GriddingConfig, ops);
        this._state = null;
        this._drawSize = 0;
        this._mpp = {};
    }

    _parameterInit() {

    }
    setOptionStyle(ops, callback) {
        this._setStyle(this._option, ops, callback);
    }

    
    draw() {
        this._toDraw();
    }
    refresh() {
        this._setState(State.drawBefore);
        this._drawRec();
        this._setState(State.drawAfter);
    }
    _toDraw(callback) {
        this._drawMap(callback);
    }
    _onOptionChange() {
        this._map && this._createColorSplit();
    }
    _onDataChange() {
        this._map && this._createColorSplit();
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
    _drawMap(callback) {
        this._clearData();
        let {
            normal,
            type
        } = this._styleConfig;
        let zoom = this._map.getZoom();
        let mapCenter = this._map.getCenter();
        let mapSize = this._map.getSize();

        let zoomUnit = Math.pow(2, 18 - zoom);
        let mercatorProjection = this._map.getMapType().getProjection();
        let mcCenter = mercatorProjection.lngLatToPoint(mapCenter);

        let nwMcX = mcCenter.x - mapSize.width / 2 * zoomUnit;
        let nwMc = new BMap.Pixel(nwMcX, mcCenter.y + mapSize.height / 2 * zoomUnit);
        let size = 0;
        if (normal.unit == 'px') {
            size = normal.size * zoomUnit;
        } else if (normal.unit == 'm') {
            let mpp = this._calculateMpp();
            if (mpp == 0 || isNaN(mpp)) {
                return;
            }
            size = (normal.size / mpp) * zoomUnit;
        } else {
            throw new TypeError('inMap: style.normal.unit must be is "meters" or "px" .');
        }

        let params = {
            points: this._data,
            size: size,
            type: type,
            nwMc: nwMc,
            zoomUnit: zoomUnit,
            mapSize: mapSize,
            mapCenter: mapCenter,
            zoom: zoom

        };
        this._setState(State.computeBefore);
        this._postMessage('GriddingOverlay.toRecGrids', params, (gridsObj) => {
            if (this._eventType == 'onmoving') {
                return;
            }
            this._canvasResize();
            this._workerData = gridsObj.grids;
            this._setState(State.computeAfter);

            this._drawSize = size / zoomUnit;
            this._setState(State.drawBefore);

            if (this._eventType != 'onmoveend' || this._styleConfig.splitList == null || this._styleConfig.splitList.length < this._styleConfig.colors.length) {
                this._createColorSplit();
            }
            this.refresh();
            gridsObj = null;
            callback && callback(this);

            this._emitInit();
        });
    }


    _isMouseOver(mouseX, mouseY, x, y, w, h) {
        return !(mouseX < x || mouseX > x + w || mouseY < y || mouseY > y + h);
    }
    _findIndexSelectItem(item) {
        let index = -1;
        if (item) {
            index = this._selectItem.findIndex(function (val) {
                return val && val.x == item.x && val.y == item.y;
            });
        }
        return index;
    }
    _getTarget(x, y) {

        let gridStep = this._drawSize;
        let mapSize = this._map.getSize();
        for (let i = 0; i < this._workerData.length; i++) {
            let item = this._workerData[i];
            let x1 = item.x;
            let y1 = item.y;
            if (x > -gridStep && y > -gridStep && x < mapSize.width + gridStep && y < mapSize.height + gridStep) {
                if (this._isMouseOver(x, y, x1, y1, gridStep, gridStep)) {
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
        this._setLegend(this._legendConfig, this._styleConfig.splitList);

    }
    _setTooltip(event) {
        let item = this._overItem && this._overItem.list.length > 0 ? this._overItem : null;
        this.toolTip.render(event, item);
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
        let gridStep = this._drawSize;
        let style = this._styleConfig.normal;
        let mapSize = this._map.getSize();
        this._ctx.shadowOffsetX = 0;
        this._ctx.shadowOffsetY = 0;
        for (let i = 0; i < this._workerData.length; i++) {
            let item = this._workerData[i];
            let x = item.x;
            let y = item.y;
            if (x > -gridStep && y > -gridStep && x < mapSize.width + gridStep && y < mapSize.height + gridStep) {
                let drawStyle = this._getStyle(item, i);
                if (drawStyle.shadowColor) {
                    this._ctx.shadowColor = drawStyle.shadowColor || 'transparent';
                    this._ctx.shadowBlur = drawStyle.shadowBlur || 10;
                } else {
                    this._ctx.shadowColor = 'transparent';
                    this._ctx.shadowBlur = 0;
                }
                this._ctx.fillStyle = drawStyle.backgroundColor;
                this._ctx.fillRect(x, y, gridStep - style.padding, gridStep - style.padding);
            }

        }
    }
}