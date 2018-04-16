import {
    Parameter
} from './base/Parameter.js';
import {
    isArray
} from './../common/util';
import HoneycombConfig from './../config/HoneycombConfig.js';
import State from './../config/OnState';
export class HoneycombOverlay extends Parameter {
    constructor(ops) {
        super(HoneycombConfig, ops);
        this.state = null;
        this.mpp = {};
    }
    parameterInit() {
        this.delteOption();
    }

    setOptionStyle(ops) {
        this._setStyle(this.baseConfig, ops);
        this.parameterInit();
        this.refresh();
    }
    setState(val) {
        this.state = val;
        this.eventConfig.onState(this.state);
    }
    delteOption() {
        this.styleConfig['selected'] = null;
    }
    refresh() {
        this.drawMap();
    }
    resize() {
        this.drawMap();
    }
    setPoints(points) {
        if (!isArray(points)) {
            throw new TypeError('inMap: data must be a Array');
        }
        this.points = points;
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

        this.postMessage('HoneycombOverlay.toRecGrids', params, (gridsObj) => {
            if (this.eventType == 'onmoving') {
                return;
            }
            this.setState(State.conputeAfter);

            this.clearCanvas();
            this.canvasResize();

            let grids = gridsObj.grids;
            // let max = gridsObj.max;
            // let min = gridsObj.min;

            let obj = {
                size: size,
                zoomUnit: zoomUnit,
                // max: max,
                // min: min,
                grids: grids,
                margin: this.margin
            };
            this.setWorkerData(obj);
            this.setState(State.drawBefore);

            this.createColorSplit(grids);
            this.drawRec(obj);
            this.setState(State.drawAfter);

        });
    }
    createColorSplit(grids) {
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
                backgroundColor: colors[i]

            });

        }

        this.styleConfig.splitList = split;
        this.setlegend(this.legendConfig, this.styleConfig.splitList);
    }
    getColor(count) {
        let color = null;
        if (count == 0) {
            color = 'rgba(255,255,255,0)';
        } else {
            let style = this.setDrawStyle({
                count: count
            });
            color = style.backgroundColor;
        }
        return color;
    }
    getTarget(x, y) {

        let data = this.workerData;
        let size = data.size;
        let zoomUnit = data.zoomUnit;

        let grids = data.grids || [];
        let gridStep = size / zoomUnit;

        let style = this.styleConfig.normal;
        let width = gridStep - style.borderWidth;
        for (let i = 0; i < grids.length; i++) {
            let item = grids[i];

            let x1 = parseFloat(item.pixels[0]);
            let y1 = parseFloat(item.pixels[1]);

            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x1 + width, y1);
            this.ctx.lineTo(x1 + width, y1 + width);
            this.ctx.lineTo(x1, y1 + width);

            this.ctx.closePath();
            if (this.ctx.isPointInPath(x, y)) {
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
    drawRec({
        size,
        zoomUnit,
        grids
    }) {
        this.workerData.grids = [];
        let gridsW = size / zoomUnit;
        let style = this.styleConfig.normal;
        for (let i in grids) {
            let x = grids[i].x;
            let y = grids[i].y;
            let count = grids[i].count;
            if (count > 0) {
                let color = this.getColor(count);
                this.drawLine(x, y, gridsW - style.padding, color, this.ctx);
            }


        }
    }
    drawLine(x, y, gridStep, color, ctx) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(x, y - gridStep / 2);
        ctx.lineTo(x + gridStep / 2, y - gridStep / 4);
        ctx.lineTo(x + gridStep / 2, y + gridStep / 4);
        ctx.lineTo(x, y + gridStep / 2);
        ctx.lineTo(x - gridStep / 2, y + gridStep / 4);
        ctx.lineTo(x - gridStep / 2, y - gridStep / 4);
        ctx.fill();
        ctx.closePath();
    }
}