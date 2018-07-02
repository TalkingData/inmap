import config from './../config/PolygonEditor';
import GeoUtils from './../lib/GeoUtils';
import MultiOverlay from './base/MultiOverlay';
import {
    merge
} from './../common/util';

export default class PolygonEditorOverlay extends MultiOverlay {
    constructor(opts) {
        super();
        let option = merge(config, opts);
        this.toolTipConfig = option.tooltip;
        this.points = this._geoJsonToPoint(option.data || []);
        this.overlay = null;
        this.map = null;
        this.isDispose = false;
        this.option = option.style;
        this._vectisWidth = 10;
        this.drawPoint = this.points;
        this.pixels = null;
        this._isBinded = false;
        this.isClick = this.points.length > 0 ? false : true;
        this.overlay = new BMap.Polygon([], this.option);
        this.startAction = this.startAction.bind(this);
        this.mousemoveAction = this.mousemoveAction.bind(this);
        this.dblclickAction = this.dblclickAction.bind(this);
        this.clickAction = this.clickAction.bind(this);
        this.getAreaByPolygon = this.getAreaByPolygon.bind(this);
        this.lineupdate = this.lineupdate.bind(this);
        
        this._first = new Date(),
            this._second = null,
            this._interval = 250;
        this.changeHanderList = [];
        this.copy();

        this.lineupdateTimeout = null;


    }
    _init(map) {
        this.map = map;
        this.map.addOverlay(this.overlay);
        this.overlay.setPath(this.points);
        this.bingMoveEvent();

        if (this.map.inmapToolBar) {
            this.ToolTip = this.map.inmapToolBar.toolTip;
            this.ToolTip.setOption(this.toolTipConfig);
            this.getAreaByPolygon();
        }
    }
    bingMoveEvent() {
        this.map.addEventListener('click', this.clickAction);
        this.map.addEventListener('mousemove', this.mousemoveAction);
        this.overlay.addEventListener('lineupdate', this.lineupdate);
        this.map.addEventListener('resize',  this.getAreaByPolygon);
        this.map.addEventListener('moveend',this.getAreaByPolygon);
        this.map.addEventListener('moving',this.getAreaByPolygon);
        this.map.addEventListener('zoomend', this.getAreaByPolygon);

    }
    removeMoveEvent() {
        this.map.removeEventListener('mousedown', this.startAction);
        this.map.removeEventListener('click', this.clickAction);
        this.map.removeEventListener('resize',  this.getAreaByPolygon);
        this.map.removeEventListener('moveend',this.getAreaByPolygon);
        this.map.removeEventListener('moving',this.getAreaByPolygon);
        this.map.removeEventListener('zoomend', this.getAreaByPolygon);
        this.overlay.removeEventListener('lineupdate', this.lineupdate);

    }
    lineupdate(e) {
        if (!this.isClick) {
            if (this.lineupdateTimeout) {
                clearTimeout(this.lineupdateTimeout);
            }
            this.lineupdateTimeout = setTimeout(() => {
                for (let i = 0; i < this.changeHanderList.length; i++) {
                    this.changeHanderList[i](e);
                }
            }, 800);

        }
    }
    showAreaText() {
        this.toolTipConfig.show = true;
    }
    hideAreaText() {
        this.toolTipConfig.show = false;
    }
    getAreaByPolygon() {

        if (!this.isClick && this.toolTipConfig.show) {
            let geos = this.overlay.getPath();
            let areas = GeoUtils.getPolygonArea(geos);
            let center = this.getGeoCenter(geos);
            let pixel = this.map.pointToOverlayPixel(new BMap.Point(center.lng, center.lat));
            this.ToolTip && this.ToolTip.showCenterText(`面积：${parseInt(areas)}平方米`, pixel.x + this.map.offsetX, pixel.y + this.map.offsetY);
        } else {
            this.ToolTip && this.ToolTip.hide();
        }

    }

    getGeoCenter(geo) {
        let minX = geo[0].lng;
        let maxX = geo[0].lng;
        let minY = geo[0].lat;
        let maxY = geo[0].lat;
        for (let i = 1; i < geo.length; i++) {
            minX = Math.min(minX, geo[i].lng);
            maxX = Math.max(maxX, geo[i].lng);
            minY = Math.min(minY, geo[i].lat);
            maxY = Math.max(maxY, geo[i].lat);
        }
        return {
            lng: minX + (maxX - minX) / 2,
            lat: minY + (maxY - minY) / 2
        };
    }

    clickAction(e) {
        this._second = new Date();

        if (this.isClick) {
            if (this._second - this._first <= this._interval) {
                this._first = new Date();
                this.dblclickAction(e);
            } else {
                this._first = new Date();
                this.startAction(e);
            }
        } else {

            if (this._second - this._first <= this._interval) {
                this._first = new Date();
                let x = e.pixel.x - this.map.offsetX;
                let y = e.pixel.y - this.map.offsetY;
                let index = this.findIndexVectis({
                    x,
                    y
                });
                if (index > -1) {
                    this.drawPoint = this.overlay.getPath();
                    this.drawPoint.splice(index, 1);
                    this.overlay.setPath(this.drawPoint);
                }

            } else {
                this._first = new Date();
            }
        }
        this.getAreaByPolygon();
    }
    findIndexVectis({
        x,
        y
    }) {
        this.pixels = this.overlay.getPath().map((item) => {
            return this.map.pointToOverlayPixel(item);
        });

        let r = this._vectisWidth / 2;

        for (let i = 0; i < this.pixels.length; i++) {
            let item = this.pixels[i];
            if (this._isMouseOver(x, y, item.x - r, item.y - r, this._vectisWidth, this._vectisWidth)) {
                return i;
            }
        }
        return -1;
    }

    _isMouseOver(mouseX, mouseY, x, y, w, h) {
        return !(mouseX < x || mouseX > x + w || mouseY < y || mouseY > y + h);
    }
    dispose() {
       
        this.ToolTip && this.ToolTip.hide();
        this.removeMoveEvent();
        this.map.removeOverlay(this.overlay);
        for (let key in this.overlay) {
            this.overlay[key] = null;
        }
        for (let key in this) {
            this[key] = null;
        }
        this.isDispose = true;
    }
    startAction(e) {

        let points = this.points;
        points.push(e.point);
        this.drawPoint = points.concat(points[points.length - 1]);
        this.overlay.setPath(this.drawPoint);

        if (!this._isBinded) {
            this._isBinded = true;
        }

    }
    translation(x, y) {
        this.pixels = this.overlay.getPath().map((item) => {
            return this.map.pointToOverlayPixel(item);
        });
        for (let i = 0; i < this.pixels.length; i++) {
            let item = this.pixels[i];
            item.x = item.x + x;
            item.y = item.y + y;
        }

        this.drawPoint = this.pixels.map((item) => {
            return this.map.overlayPixelToPoint(item);
        });

        this.overlay.setPath(this.drawPoint);

    }
    mousemoveAction(e) {
        if (!this._isBinded) {
            return;
        }
        this.overlay.setPositionAt(this.drawPoint.length - 1, e.point);

    }
    dblclickAction() {
        if (!this._isBinded) {
            return;
        }
        this.map.removeEventListener('mousemove', this.mousemoveAction);
        this._isBinded = false;
        this.isClick = false;
        this.drawPoint.pop();
        this.overlay.setPath(this.drawPoint);

    }
    addEventListener(eventStr, handler) {

        if (eventStr == 'change') {
            this.changeHanderList.push(handler);
        } else {
            this.overlay.addEventListener(eventStr, handler);
        }

    }
    removeEventListener(eventStr, handler) {
        if (eventStr == 'change') {
            for (let i = 0; i < this.changeHanderList.length; i++) {
                if (this.changeHanderList[i] == handler) {
                    this.changeHanderList.splice(i--, 1);
                }
            }

        } else {
            this.overlay.removeEventListener(eventStr, handler);
        }
    }

    copy() {
        ['setStrokeColor', 'getStrokeColor', 'setFillColor', 'getFillColor', 'setStrokeOpacity', 'getStrokeOpacity', 'setFillOpacity', 'getFillOpacity', 'setStrokeWeight', 'getStrokeWeight', 'setStrokeStyle', 'getStrokeStyle', 'getBounds', 'enableEditing', 'disableEditing', 'enableMassClear', 'disableMassClear', 'setPositionAt', 'getMap'].forEach((key) => {
            this[key] = this.overlay[key].bind(this.overlay);
        });

    }
    _geoJsonToPoint(data) {
        if (data.geometry) {
            return data.geometry.coordinates.map((item) => {
                return {
                    lng: item[0],
                    lat: item[1]
                };
            });
        } else {
            return [];
        }
    }
    setPath(data) {
        let point = this._geoJsonToPoint(data);
        this.drawPoint = point;

        this.overlay.setPath(point);

    }
    getPath() {
        let data = this.overlay.getPath();
        let coordinates = data.map((item) => {
            return [item.lng, item.lat];
        });
        return {
            geometry: {
                type: 'Polygon',
                coordinates: coordinates
            }
        };
    }
}