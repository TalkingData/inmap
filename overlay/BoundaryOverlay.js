import {
    Parameter
} from './base/Parameter.js';

export class BoundaryOverlay extends Parameter {
    constructor(ops) {
        super(ops);
        this.labelStyle = ops.label;
    }
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
        console.log("_dataRender")
        //   debugger
        this.clearCanvas();
        this.drawLine(this.workerData);
    }
    drawMap() {
        console.log("drawMap")
        let me = this;
        // debugger
        this.postMessage('BoundaryOverlay.calculatePixel', this.points, function (pixels) {
            if (me.eventType == 'onmoving') {
                return;
            }
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
        //debugger
        console.log('drawLine')
        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            let geo = item.pgeo;
            this.ctx.beginPath();
            this.ctx.moveTo(geo[0][0], geo[0][1]);

            for (let j = 1; j < geo.length; j++) {
                this.ctx.lineTo(geo[j][0], geo[j][1]);
            }
            this.ctx.closePath();
            //debugger
            let style = this.setDrawStyle(item);
            this.ctx.fillStyle = style.backgroundColor;
            this.ctx.fill();
            this.ctx.strokeStyle = style.borderColor;
            this.ctx.lineWidth = style.borderWidth;

            this.ctx.stroke();
            let label = this.label,
                zoom = this.map.getZoom();
            if (label && label.show && (!label.minZoom || label.minZoom && zoom >= label.minZoom)) {
                if (label.fillStyle) {
                    this.ctx.fillStyle = label.fillStyle;
                }
                let center = this.getGeoCenter(geo);
                let text = label.text,
                    fontsize = label.font.replace('px', ''),
                    d = data[i],
                    re, x, y;
                for (let k in d) {
                    if (!isString(d[k]) && !isNumber(d[k])) {
                        continue
                    }
                    re = new RegExp('{@' + k + '}', 'gi');
                    text = text.replace(re, d[k]);
                }
                x = center[0] - getBlen(text) * fontsize / 4;
                this.ctx.fillText(text, x, center[1]);
            }
        }
        this.ctx.closePath();

    }
}