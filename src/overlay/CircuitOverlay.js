/**
 * draw cireuit
 */

import {
    CanvasOverlay
} from './base/CanvasOverlay';
 
 
export class CircuitOverlay extends CanvasOverlay {
    constructor(ops) {
        super();
        this.points = ops.data;
        this.style = ops.style;
    }

    resize() {
        this.drawMap();
    }

    setPoints(points) {
        if (!points) {
            return;
        }
        this.points = points;
        this.coordinates(this.points);
        this.drawMap();
    }

    drawMap() {
        let me = this;
        let zoomUnit = Math.pow(2, 18 - this.map.getZoom());
        let projection = this.map.getMapType().getProjection();
        var mcCenter = projection.lngLatToPoint(this.map.getCenter());
        let nwMc = new BMap.Pixel(mcCenter.x - this.map.getSize().width / 2 * zoomUnit, mcCenter.y + this.map.getSize().height / 2 * zoomUnit); //左上角墨卡托坐标
        let params = {
            points: me.points,
            nwMc: nwMc,
            zoomUnit: zoomUnit
        };
        this.postMessage('CircuitOverlay.calculatePixel', params, function (pixels) {
            if (me.eventType == 'onmoving') {
                return;
            }
            me.clearCanvas();
            me.canvasResize();
            me.drawLine(pixels);
        });
       
    }
    coordinates(data) {
        var projection = this.map.getMapType().getProjection();
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            item['_coordinates'] = item.geo.map(function (item) {
                // debugger
                var pixel = projection.lngLatToPoint({
                    lng: item[0],
                    lat: item[1]
                });
                return [pixel.x, pixel.y];
            });

        }


    }
    transferCoordinate(_coordinates, nwMc, zoomUnit) {
        
        return _coordinates.map(function (item) {
            // debugger
            var x = (item[0] - nwMc.x) / zoomUnit;
            var y = (nwMc.y - item[1]) / zoomUnit;
            return [x, y];
        });
    }
    lngLatToPoints(data, nwMc, zoomUnit) {
        if (data.length > 0) {
            return this.transferCoordinate(data, nwMc, zoomUnit);
        } else {
            return [];
        }

        // let map = this.map;
        // return data.map(function (item) {
        //     // debugger
        //     var x = (item[0] - nwMc.x) / zoomUnit;
        //     var y = (nwMc.y - item[1]) / zoomUnit;
        //     return [x, y];
        // });
    }

    drawLine(data) {
        //debugger
        // console.log('drawLine')s
        let normal = this.style.normal;
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.lineCap = 'butt';
        this.ctx.lineJoin = 'miter';
        this.ctx.globalCompositeOperation = 'lighter';
        this.ctx.miterLimit = 10;
        this.ctx.strokeStyle = normal.borderColor;
        this.ctx.lineWidth = normal.borderWidth;
        this.ctx.beginPath();

        for (let i = 0; i < data.length - 1500; i++) {
            let item = data[i];
            // debugger
            let pixels = item.pixels;

            // debugger
            this.ctx.moveTo(pixels[0][0], pixels[0][1]);
            for (let j = 1; j < pixels.length; j++) {
                this.ctx.lineTo(pixels[j][0], pixels[j][1]);
            }
            this.ctx.stroke();

        }


    }
}