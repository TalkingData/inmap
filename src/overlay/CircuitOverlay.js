/**
 * draw cireuit
 */

import {
    merge,
    isArray
} from './../common/util';
import {
    CanvasOverlay
} from './base/CanvasOverlay';
import CircuitConfig from './../config/CircuitConfig';
import State from './../config/OnState';

export class CircuitOverlay extends CanvasOverlay {
    constructor(ops) {
        super(ops);
        this.points = [];
        this.style = {};
        this._setStyle(CircuitConfig, ops);
        this._isCoordinates = false;
        this.state = null;
    }
    _setStyle(config, ops) {
        let option = merge(config, ops);
        this.points = ops.data ? option.data : this.points;
        this.style = option.style;
        this.event = option.event;
        this.tMapStyle(option.skin);
    }
    setState(val) {
        this.state = val;
        this.event.onState(this.state);
    }
    resize() {
        this.drawMap();
    }
    setOptionStyle(ops) {
        this._setStyle(CircuitConfig, ops);
        this.coordinates(this.points);
        this.drawMap();
    }
    setPoints(points) {
        if (!isArray(points)) {
            throw new TypeError('data must be a Array');
        }
        this.points = points;

        this.coordinates(this.points);
        this.drawMap();
    }

    drawMap() {
        let zoomUnit = Math.pow(2, 18 - this.map.getZoom());
        let projection = this.map.getMapType().getProjection();
        let mcCenter = projection.lngLatToPoint(this.map.getCenter());
        let nwMc = new BMap.Pixel(mcCenter.x - this.map.getSize().width / 2 * zoomUnit, mcCenter.y + this.map.getSize().height / 2 * zoomUnit); //左上角墨卡托坐标
        let params = {
            points: this.points,
            nwMc: nwMc,
            zoomUnit: zoomUnit
        };
        if (!this._isCoordinates) {
            this.coordinates(this.points);
        }
        this.setState(State.computeBefore);
        this.postMessage('CircuitOverlay.calculatePixel', params, (pixels) => {
            if (this.eventType == 'onmoving') {
                return;
            }
            this.setState(State.conputeAfter);

            this.clearCanvas();
            this.canvasResize();
            this.setState(State.drawBefore);

            this.drawLine(pixels);
            this.setState(State.drawAfter);

        });
    }
    coordinates(data) {
        this._isCoordinates = true;
        let projection = this.map.getMapType().getProjection();
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            item['_coordinates'] = item.geo.map(function (item) {

                let pixel = projection.lngLatToPoint({
                    lng: item[0],
                    lat: item[1]
                });
                return [pixel.x, pixel.y];
            });

        }


    }
    transferCoordinate(_coordinates, nwMc, zoomUnit) {

        return _coordinates.map(function (item) {

            let x = (item[0] - nwMc.x) / zoomUnit;
            let y = (nwMc.y - item[1]) / zoomUnit;
            return [x, y];
        });
    }
    lngLatToPoints(data, nwMc, zoomUnit) {
        if (data.length > 0) {
            return this.transferCoordinate(data, nwMc, zoomUnit);
        } else {
            return [];
        }
    }

    drawLine(data) {

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

        for (let i = 0; i < data.length; i++) {
            let item = data[i];

            let pixels = item.pixels;
            this.ctx.moveTo(pixels[0][0], pixels[0][1]);
            for (let j = 1; j < pixels.length; j++) {
                this.ctx.lineTo(pixels[j][0], pixels[j][1]);
            }
            this.ctx.stroke();

        }


    }
}