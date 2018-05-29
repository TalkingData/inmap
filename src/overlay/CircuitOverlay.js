/**
 * draw cireuit
 */

import {
    merge,
    isArray,
    clearPushArray
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
        this.styleConfig = {};
        this._setStyle(CircuitConfig, ops);
        this._isCoordinates = false;
        this.state = null;
        this.workerData = [];
    }
    _setStyle(config, ops) {
        let option = merge(config, ops);
        this.points = ops.data ? option.data : this.points;
        this.styleConfig = option.style;
        this.eventConfig = option.event;
        this.tMapStyle(option.skin);
    }
    setState(val) {
        this.state = val;
        this.eventConfig.onState(this.state);
    }
    translation(distanceX, distanceY) {
        for (let i = 0; i < this.workerData.length; i++) {
            let pixels = this.workerData[i].pixels;
            for (let j = 0; j < pixels.length; j++) {
                let pixel = pixels[j];
                pixel[0] = pixel[0] + distanceX;
                pixel[1] = pixel[1] + distanceY;
            }
        }
        this.setState(State.drawBefore);
        this.drawLine(this.workerData);
        this.setState(State.drawAfter);
    }

    resize() {
        this.drawMap();
    }
    setOptionStyle(ops) {
        this._setStyle(CircuitConfig, ops);
        this.coordinates(this.points);
        this.drawMap();
    }
    setData(points) {
        this.setPoints(points);
    }
    setPoints(points) {
        if (!isArray(points)) {
            throw new TypeError('inMap: data must be a Array');
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
        this.postMessage('CircuitOverlay.calculatePixel', params, (pixels, margin) => {
            if (this.eventType == 'onmoving') {
                return;
            }
            this.setState(State.conputeAfter);
            this.clearCanvas();
            clearPushArray(this.workerData, pixels);
            this.translation(margin.left - this.margin.left, margin.top - this.margin.top);
            params = null;
            margin = null;
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
        this.clearCanvas();
        let normal = this.styleConfig.normal;
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