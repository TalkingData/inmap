import {
    Parameter
} from './base/Parameter.js';
import {
    isArray
} from './../common/util';
import HoneycombConfig from './../config/HoneycombConfig.js';
export class HoneycombOverlay extends Parameter {
    constructor(ops) {
        super(HoneycombConfig, ops);
    }
    TInit() {
        this.delteOption();
        this.compileSplitList(this.points);
    }

    setOptionStyle(ops) {
        this._setStyle(this.baseConfig, ops);
        this.TInit();
        this.refresh();
    }
    delteOption() {
        this.style['selected'] = null;
    }
    refresh() {
        this.drawMap();
    }
    resize() {
        this.drawMap();
    }
    setPoints(points) {
        if (!isArray(points)) {
            throw new TypeError('data must be a Array');
        }
        this.points = points;
        this.drawMap();
    }
    drawMap() {
        let me = this;
        let style = this.style.normal;
        let zoom = me.map.getZoom();
        let zoomUnit = Math.pow(2, 18 - zoom);
        let mercatorProjection = me.map.getMapType().getProjection();
        let mcCenter = mercatorProjection.lngLatToPoint(me.map.getCenter());
        let size = style.size * zoomUnit;
        let nwMcX = mcCenter.x - me.map.getSize().width / 2 * zoomUnit;
        let nwMc = new BMap.Pixel(nwMcX, mcCenter.y + me.map.getSize().height / 2 * zoomUnit);

        let params = {
            points: me.points,
            size: size,
            nwMc: nwMc,
            zoomUnit: zoomUnit,
            mapSize: me.map.getSize(),
            mapCenter: me.map.getCenter(),
            zoom: zoom
        };
        this.postMessage('HoneycombOverlay.toRecGrids', params, function (gridsObj) {
            if (me.eventType == 'onmoving') {
                return;
            }
            me.clearCanvas();
            me.canvasResize();

            let grids = gridsObj.grids;
            let max = gridsObj.max;
            let min = gridsObj.min;

            let obj = {
                size: size,
                zoomUnit: zoomUnit,
                max: max,
                min: min,
                grids: grids,
                margin: me.margin
            };
            me.setWorkerData(obj);
            me.createColorSplit(grids);
            me.drawRec(obj);
        });
    }
    createColorSplit(grids) {
        let data = [];
        for (let key in grids) {
            let count = grids[key].len;

            if (count > 0) {
                data.push({
                    name: key,
                    count: count
                });
            }

        }

        if (this.style.colors.length > 0) {
            this.compileSplitList(data);
        }

    }
    compileSplitList(data) {

        let colors = this.style.colors;
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

        this.style.splitList = split;
        this.setlegend(this.legend, this.style.splitList);
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

        let style = this.style.normal;
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
        let style = this.style.normal;
        for (let i in grids) {
            let x = grids[i].x;
            let y = grids[i].y;
            let count = grids[i].len;
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