import {
    Parameter
} from './base/Parameter.js';
import {
    isArray
} from './../common/util';
import GriddingConfig from './../config/GriddingConfig.js';
import State from './../config/OnState';
export class GriddingOverlay extends Parameter {
    constructor(ops) {
        super(GriddingConfig, ops);
        this.state = null;
        this._drawSize = 0;
        this.mpp = {};

    }
    parameterInit() {

    }
    setOptionStyle(ops) {
        this._setStyle(this.baseConfig, ops);
        this.createColorSplit();
        this.drawMap();
    }
    setState(val) {
        this.state = val;
        this.eventConfig.onState(this.state);
    }

    refresh() {
        this.drawRec();
    }
    resize() {
        if (this.eventType == 'onzoomend') {
            this.workerData = {};
        }
        this.drawMap();
    }
    _calculateMpp() {
        let zoom = this.map.getZoom();
        if (this.mpp[zoom]) {
            return this.mpp[zoom];
        } else {
            this.mpp[zoom] = this.getMpp();
            return this.mpp[zoom];
        }
    }
    /**
     * 获得每个像素对应多少米	
     */
    getMpp() {
        let mapCenter = this.map.getCenter();
        let assistValue = 10;
        let cpt = new BMap.Point(mapCenter.lng, mapCenter.lat + assistValue);
        let dpx = Math.abs(this.map.pointToPixel(mapCenter).y - this.map.pointToPixel(cpt).y);
        return this.map.getDistance(mapCenter, cpt) / dpx;
    }
    drawMap() {

        let {
            normal,
            type
        } = this.styleConfig;
        let zoom = this.map.getZoom();
        let mapCenter = this.map.getCenter();
        let mapSize = this.map.getSize();

        let zoomUnit = Math.pow(2, 18 - zoom);
        let mercatorProjection = this.map.getMapType().getProjection();
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
            points: this.points,
            size: size,
            type: type,
            nwMc: nwMc,
            zoomUnit: zoomUnit,
            mapSize: mapSize,
            mapCenter: mapCenter,
            zoom: zoom
        };
        this.setState(State.computeBefore);
        this.postMessage('GriddingOverlay.toRecGrids', params, (gridsObj) => {
            if (this.eventType == 'onmoving') {
                return;
            }
            let grids = gridsObj.grids;
            this.setState(State.conputeAfter);

            this.canvasResize();
            this.workerData = grids;
            this._drawSize = size / zoomUnit;
            this.setState(State.drawBefore);

            this.createColorSplit();
            this.drawRec();
            this.setState(State.drawAfter);


        });
    }

    setPoints(points) {

        if (!isArray(points)) {
            throw new TypeError('inMap: data must be a Array');
        }
        this.points = points;

        this.drawMap();
    }
    _isMouseOver(mouseX, mouseY, x, y, w, h) {
        return !(mouseX < x || mouseX > x + w || mouseY < y || mouseY > y + h);
    }
    findIndexSelectItem(item) {
        let index = -1;
        if (item) {
            index = this.selectItem.findIndex(function (val) {
                return val && val.x == item.x && val.y == item.y;
            });
        }
        return index;
    }
    getTarget(x, y) {

        let grids = this.workerData;
        let gridStep = this._drawSize;
        let mapSize = this.map.getSize();
        for (let i in grids) {

            let item = grids[i];
            let x1 = parseFloat(item.x);
            let y1 = parseFloat(item.y);
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

    compileSplitList(data) {

        let colors = this.styleConfig.colors;
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
                backgroundColor: colors[i],

            });

        }

        this.styleConfig.splitList = split;
        this.setlegend(this.legendConfig, this.styleConfig.splitList);
    }
    createColorSplit() {
        let grids = this.workerData;
        let data = [];
        for (let key in grids) {
            let count = grids[key].count;
            if (count > 0) {
                data.push({
                    name: key,
                    count: count
                });
            }
        }

        if (this.styleConfig.colors.length > 0) {
            this.compileSplitList(data);
        }

    }
    setlegendParams() {

    }
    setTooltip(event) {
        let item = this.overItem && this.overItem.list.length > 0 ? this.overItem : null;
        this.toolTip.render(event, item);
    }
    getStyle(item) {
        if (item.count == 0) {
            return {
                backgroundColor: 'rgba(255,255,255,0)'
            };
        } else {
            return this.setDrawStyle(item);
        }

    }
    drawRec() {
        this.clearCanvas();
        let gridStep = this._drawSize;
        let grids = this.workerData;
        let style = this.styleConfig.normal;
        let mapSize = this.map.getSize();
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        for (let i in grids) {
            let item = grids[i];
            let x = item.x;
            let y = item.y;
            if (x > -gridStep && y > -gridStep && x < mapSize.width + gridStep && y < mapSize.height + gridStep) {
                let drawStyle = this.getStyle(item);
                if (drawStyle.shadowColor) {
                    this.ctx.shadowColor = drawStyle.shadowColor || 'transparent';
                    this.ctx.shadowBlur = drawStyle.shadowBlur || 10;
                } else {
                    this.ctx.shadowColor = 'transparent';
                    this.ctx.shadowBlur = 0;
                }
                this.ctx.fillStyle = drawStyle.backgroundColor;
                this.ctx.fillRect(x, y, gridStep - style.padding, gridStep - style.padding);

            }

        }
    }
}