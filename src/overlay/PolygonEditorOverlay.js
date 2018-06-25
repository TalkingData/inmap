export default class PolygonEditorOverlay {
    constructor(opts) {
        this.points = this._geoJsonToPoint(opts.data || []);
        this.overlay = null;
        this.map = null;
        this.isDispose = false;
        this.option = {
            strokeColor: 'rgba(24,144,255,1)',
            fillColor: 'rgba(24,144,255,0.4)',
            strokeWeight: 2,
            strokeOpacity: 1,
            enableEditing: true
        };
        this._vectisWidth = 10;
        this.drawPoint = [];
        this.pixels = null;
        this._isBinded = false;
        this.isClick = this.points.length > 0 ? false : true;
        this.overlay = new BMap.Polygon([], this.option);
        this.startAction = this.startAction.bind(this);
        this.mousemoveAction = this.mousemoveAction.bind(this);
        this.dblclickAction = this.dblclickAction.bind(this);
        this.clickAction = this.clickAction.bind(this);
        this._first = new Date(),
            this._second = null,
            this._interval = 250;

    }
    _init(map) {
        this.map = map;
        this.map.addOverlay(this.overlay);
        this.overlay.setPath(this.points);
        this.bingMoveEvent();
        this.copy();
     
    }
    bingMoveEvent() {
        this.map.addEventListener('click', this.clickAction);
        this.map.addEventListener('mousemove', this.mousemoveAction);
    }
    removeMoveEvent() {
        this.map.removeEventListener('mousedown', this.startAction);
        this.map.removeEventListener('click', this.clickAction);
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
                let index = this.findIndexVectis(e.pixel);
                if (index > -1) {
                    this.drawPoint.splice(index, 1);
                    this.overlay.setPath(this.drawPoint);
                }

            } else {
                this._first = new Date();
            }
        }
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
    dblclickAction(e) {
       
        if (!this._isBinded) {
            return;
        }
        this.map.removeEventListener('mousemove', this.mousemoveAction);
        this._isBinded = false;
        this.isClick = false;
        this.drawPoint.pop();
        this.overlay.setPath(this.drawPoint);
    }
    copy() {
        ['setStrokeColor', 'getStrokeColor', 'setFillColor', 'getFillColor', 'setStrokeOpacity', 'getStrokeOpacity', 'setFillOpacity', 'getFillOpacity', 'setStrokeWeight', 'getStrokeWeight', 'setStrokeStyle', 'getStrokeStyle', 'getBounds', 'enableEditing', 'disableEditing', 'enableMassClear', 'disableMassClear', 'setPositionAt', 'getMap', 'addEventListener', 'removeEventListener'].forEach((key) => {
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