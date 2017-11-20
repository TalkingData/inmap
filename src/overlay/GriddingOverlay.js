import {
    Parameter
} from './base/Parameter.js';
import baseConfig from './../config/griddingConfig.js';

export class GriddingOverlay extends Parameter {
    constructor(ops) {
        super(ops);
        this.delteOption();
        this.compileColor = {};
        // debugger
        this._setOptionStyle(baseConfig, ops);
    }
    delteOption() {
        this.style['selected'] = null;
    }
    resize() {
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
        //   debugger
        this.postMessage('GriddingOverlay.toRecGrids', params, function (gridsObj) {
            if (me.eventType == 'onmoving') {
                return;
            }
            let grids = gridsObj.grids;
            let max = gridsObj.max;
            let min = gridsObj.min;
            //清除
            me.clearCanvas();
            me.canvasResize();

            me.setWorkerData({
                size: size,
                zoomUnit: zoomUnit,
                max: max,
                min: min,
                grids: []
            });
            me.createColorSplit(grids);
            me.drawRec(size, zoomUnit, max, min, grids);

        });
    }
    TInit() {
        //覆盖方法
    }
    setPoints(points) {
        if (!points) {
            return;
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

        if (this.style.colors.length > 0) {
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
            // color = this.compileColor[count];
        }
        return color;
    }
    drawRec(size, zoomUnit, max, min, grids) {
        this.workerData.grids = [];
        let gridStep = size / zoomUnit;
       
        let style = this.style.normal;
        for (let i in grids) {
            let sp = i.split('_');
            let x = sp[0];
            let y = sp[1];
            let count = grids[i];
            let color = this.getColor(count);
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, gridStep - style.borderWidth, gridStep - style.borderWidth);
            if (count > 0) {
                this.workerData.grids.push({
                    pixels: [x, y],
                    count: count
                });
            }
        }
    }
}