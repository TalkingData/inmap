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
        this._drawSize = 0;
    }

    setOptionStyle(ops) {
        this._setStyle( this.baseConfig, ops);
    }
    setState(val) {
        this.state = val;
        this.eventConfig.onState(this.state);
    }
    translation(distanceX, distanceY) {

        for (let i = 0; i < this.workerData.length; i++) {
            let item = this.workerData[i];
            item.x = item.x + distanceX;
            item.y = item.y + distanceY;
        }
        this.refresh();
    }
    refresh() {
        this.setState(State.drawBefore);
        this.drawRec();
        this.setState(State.drawAfter);
    }
    resize() {
        this.drawMap();
    }
    onOptionChange() {
        this.map && this.createColorSplit();
    }
    onDataChange() {
        this.map && this.createColorSplit();
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
        this.clearData();
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

            this.workerData = gridsObj.grids;
            this._drawSize = size / zoomUnit;

            this.createColorSplit();
            this.refresh();
            gridsObj = null;

        });
    }
    createColorSplit() {
        if (this.styleConfig.colors.length > 0) {
            this.compileSplitList(this.workerData);
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
    findIndexSelectItem(item) {
        let index = -1;
        if (item) {
            index = this.selectItem.findIndex(function (val) {
                return val && val.x == item.x && val.y == item.y;
            });
        }
        return index;
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
    getTarget(mouseX, mouseY) {
        let gridStep = this._drawSize;
        let mapSize = this.map.getSize();

        for (let i = 0; i < this.workerData.length; i++) {
            let item = this.workerData[i];
            let x = item.x;
            let y = item.y;
            if (item.count > 0 && x > -gridStep && y > -gridStep && x < mapSize.width + gridStep && y < mapSize.height + gridStep) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, y - gridStep / 2);
                this.ctx.lineTo(x + gridStep / 2, y - gridStep / 4);
                this.ctx.lineTo(x + gridStep / 2, y + gridStep / 4);
                this.ctx.lineTo(x, y + gridStep / 2);
                this.ctx.lineTo(x - gridStep / 2, y + gridStep / 4);
                this.ctx.lineTo(x - gridStep / 2, y - gridStep / 4);
                this.ctx.closePath();

                if (this.ctx.isPointInPath(mouseX * this.devicePixelRatio, mouseY * this.devicePixelRatio)) {
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
    drawRec() {
        this.clearCanvas();
        let mapSize = this.map.getSize();
        let gridsW = this._drawSize;

        let style = this.styleConfig.normal;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        for (let i = 0; i < this.workerData.length; i++) {
            let item = this.workerData[i];
            let x = item.x;
            let y = item.y;
            let count = item.count;
            if (count > 0 && x > -gridsW && y > -gridsW && x < mapSize.width + gridsW && y < mapSize.height + gridsW) {
                let drawStyle = this.getStyle(item);
                this.drawLine(x, y, gridsW - style.padding, drawStyle, this.ctx);
            }
        }
    }
    drawLine(x, y, gridStep, drawStyle, ctx) {

        ctx.beginPath();
        if (drawStyle.shadowColor) {
            this.ctx.shadowColor = drawStyle.shadowColor || 'transparent';
            this.ctx.shadowBlur = drawStyle.shadowBlur || 10;
        } else {
            this.ctx.shadowColor = 'transparent';
            this.ctx.shadowBlur = 0;
        }
        ctx.fillStyle = drawStyle.backgroundColor;
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