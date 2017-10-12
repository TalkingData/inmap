import {
    Parameter
} from './base/Parameter.js';
import polylabel from './../common/polylabel'

export class BoundaryOverlay extends Parameter {
    constructor(ops) {
        super(ops);

        // this.setStyle(ops);
    }
    // setStyle(ops) {
    //     this.labelStyle = ops.label;
    //     this.style = ops.style || {};
    //     this.drawMap();
    // }

    resize() {
        this.drawMap();
    }
    getGeoCenter(geo) {
        let minX = geo[0][0];
        let minY = geo[0][1];
        let maxX = geo[0][0];
        let maxY = geo[0][1];
        for (let i = 1; i < geo.length; i++) {
            minX = Math.min(minX, geo[i][0]);
            maxX = Math.max(maxX, geo[i][0]);
            minY = Math.min(minY, geo[i][1]);
            maxY = Math.max(maxY, geo[i][1]);
        }
        return [minX + (maxX - minX) / 2, minY + (maxY - minY) / 2];
    }
    setMapCenter(geo, exp) {
        let me = this;
        this.parserExp(exp)
        // debugger
        // this.map.panTo(this.getGeoCenter);
        if (me.workerData.length > 0) {
            me.selectItem = me.workerData.filter(me.filterFun);
            me._dataRender();
        }
    }
    setMapCenterAndZoom(geo, exp) {
        let arr = [];
        geo.forEach(val => {
            arr.push(new BMap.Point(val[0], val[1]))

        });
        // debugger
        let view = this.map.getViewport(arr);
        let me = this;

        function zoomEnd() {
            // debugger
            me.map.removeEventListener("zoomend", zoomEnd);
            me.map.panTo(view.center);
        }

        function moveend() {
            // debugger
            me.map.removeEventListener("moveend", moveend);
            me.parserExp(exp)
            if (me.workerData.length > 0) {
                me.selectItem = me.workerData.filter(me.filterFun);
                me._dataRender();
            }
        }
        // debugger

        let scale = view.zoom - 1;
        this.map.addEventListener("zoomend", zoomEnd);
        this.map.addEventListener("moveend", moveend);
        if (this.map.getZoom() == scale) {
            zoomEnd();
        } else {
            this.map.setZoom(scale);
        }
    }
    setCenterAndZoom(geo, exp, isScale) {
        if (isScale) {
            this.setMapCenterAndZoom(geo, exp);
        } else {
            this.setMapCenter(geo, exp);
        }

    }
    getMaxWidth(geo) {
        let minX = geo[0][0];
        let minY = geo[0][1];
        let maxX = geo[0][0];
        let maxY = geo[0][1];
        for (let i = 1; i < geo.length; i++) {
            minX = Math.min(minX, geo[i][0]);
            maxX = Math.max(maxX, geo[i][0]);
            minY = Math.min(minY, geo[i][1]);
            maxY = Math.max(maxY, geo[i][1]);
        }
        return maxX - minX;
    }
    findIndexSelectItem(item) {
        let index = -1;
        if (item) {
            // debugger
            index = this.selectItem.findIndex(function (val) {
                return val && val.name == item.name;
            });
        }

        return index;
    }
    _dataRender() {
        // console.log("_dataRender")
        //  debugger
        this.clearCanvas();
        this.drawLine(this.workerData);
    }
    drawMap() {
        // console.log("drawMap")
        let me = this;
        // debugger
        this.postMessage('BoundaryOverlay.calculatePixel', this.points, function (pixels) {
            if (me.eventType == 'onmoving') {
                return;
            }
            // debugger
            me.clearCanvas();
            me.canvasResize();
            me.overItem = null;
            // me.workerData = pixels;
            me.setWorkerData(pixels);
            //  debugger
            //me.setSelectd();
            //debugger
            me.drawLine(pixels);
        });
    }
    setPoints(points) {
        if (!points) {
            return;
        }
        this.cancerSelectd();
        this.points = points;
        // debugger
        if (this.style.colors.length > 0) {
            this.compileSplitList(this.points);
        }
        this.drawMap();
    }
    getTarget(x, y) {

        let data = this.workerData;
        //   console.log('getTarget')
        this.ctx.beginPath();
        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            let geo = item.pgeo;
            this.ctx.beginPath();
            this.ctx.moveTo(geo[0][0], geo[0][1]);
            for (let j = 1; j < geo.length; j++) {
                this.ctx.lineTo(geo[j][0], geo[j][1]);
            }
            this.ctx.closePath();
            if (this.ctx.isPointInPath(x * this.devicePixelRatio, y * this.devicePixelRatio)) {
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
    drawLine(data) {
        // debugger
        //console.log('drawLine')
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = 'round';
        this.ctx.miterLimit = 4;
        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            let geo = item.pgeo;
            // points[j]['bestCell'] = polylabel([tmp]);
            // debugger

            this.ctx.beginPath();
            this.ctx.moveTo(geo[0][0], geo[0][1]);
            for (let j = 1; j < geo.length; j++) {
                this.ctx.lineTo(geo[j][0], geo[j][1]);
            }
            this.ctx.closePath();
            let style = this.setDrawStyle(item);
            this.ctx.shadowColor = style.shadowColor || 'transparent';
            this.ctx.shadowBlur = style.shadowBlur || 10;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            //debugger 'rgba(150,150,150,1)' 
            this.ctx.fillStyle = style.backgroundColor;
            this.ctx.fill();
            this.ctx.strokeStyle = style.borderColor;
            this.ctx.lineWidth = style.borderWidth;
            this.ctx.stroke();
        }
        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            let geo = item.pgeo;
            let bestCell = item.bestCell;
            // let bestCell = polylabel([geo]);

            let label = this.labelStyle;
            if (bestCell  && label.show) {
                //    debugger
                let style = this.setDrawStyle(item).label;
                this.ctx.shadowBlur =0;
                this.ctx.lineWidth = style.lineWidth;
                this.ctx.font = style.font;
                this.ctx.fillStyle = style.color;
                if (label.selected && this.selectItemContains(item)) {
                    this.ctx.fillStyle = label.selected.color;
                }
                let width = this.ctx.measureText(item.name).width;
                if (this.getMaxWidth(geo) > width) {
                    this.ctx.fillText(item.name, bestCell.x - width / 2, bestCell.y);
                }
            }
        }
        this.ctx.closePath();
    }
}