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
        this.delteOption();
    }
    parameterInit() {
       
    }
    setOptionStyle(ops) {
        this._setStyle(this.baseConfig, ops);
        this.drawMap();
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
    drawMap() {

        let {
            normal,
            type
        } = this.styleConfig;
        let zoom = this.map.getZoom();
        let zoomUnit = Math.pow(2, 18 - zoom);
        let mercatorProjection = this.map.getMapType().getProjection();
        let mcCenter = mercatorProjection.lngLatToPoint(this.map.getCenter());
        let size = normal.size * zoomUnit;
        let nwMcX = mcCenter.x - this.map.getSize().width / 2 * zoomUnit;
        let nwMc = new BMap.Pixel(nwMcX, mcCenter.y + this.map.getSize().height / 2 * zoomUnit);
        let params = {
            points: this.points,
            size: size,
            type: type,
            nwMc: nwMc,
            zoomUnit: zoomUnit,
            mapSize: this.map.getSize(),
            mapCenter: this.map.getCenter(),
            zoom: zoom
        };
        this.setState(State.computeBefore);

        this.postMessage('GriddingOverlay.toRecGrids', params, (gridsObj) => {
            if (this.eventType == 'onmoving') {
                return;
            }
            let grids = gridsObj.grids;
            this.setState(State.conputeAfter);

            //清除
            this.clearCanvas();
            this.canvasResize();

            this.setWorkerData({
                size: size,
                zoomUnit: zoomUnit,
                grids: []
            });
            this.setState(State.drawBefore);
            
            this.createColorSplit(grids);
            this.drawRec(size, zoomUnit, grids);
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
    createColorSplit(grids) {
        let data = [];
        for (let key in grids) {
            let count = grids[key];

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
    drawRec(size, zoomUnit, grids) {
        this.workerData.grids = [];
        let gridStep = size / zoomUnit;

        let style = this.styleConfig.normal;
        for (let i in grids) {
            let sp = i.split('_');
            let x = sp[0];
            let y = sp[1];
            let count = grids[i];
            let color = this.getColor(count);
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, gridStep - style.padding, gridStep - style.padding);
            if (count > 0) {
                this.workerData.grids.push({
                    pixels: [x, y],
                    count: count
                });
            }
        }
    }
}