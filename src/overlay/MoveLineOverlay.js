import MultiOverlay from './base/MultiOverlay';
import PointOverlay from './PointOverlay';
import LineStringOverlay from './LineStringOverlay';
import LineStringAnimationOverlay from './LineStringAnimationOverlay';
import config from './../config/MoveLineConfig';
import {
    merge,
    isFunction,
} from './../common/util';

export default class MoveLineOverlay extends MultiOverlay {
    constructor(opts) {
        super();
        this._isDispose = false;
        this._data = opts.data || [];
        this._opts = merge(config, opts);
        this._PointOverlay = this._creataPointOverlay(this._opts);
        this._LineStringOverlay = this._createLineStringOverlay(this._opts);
        this._LineStringAnimationOverlay = this._createLineStringAnimationOverlay(this._opts);
    }
    _init(map) {
        map.addOverlay(this._LineStringOverlay);
        map.addOverlay(this._LineStringAnimationOverlay);
        map.addOverlay(this._PointOverlay);
    }
    setOptionStyle(opts) {
        if (!opts) return;
        this._opts = merge(this._opts, opts);
        opts.style.point.data && delete opts.style.point.data;
        opts.style.point.line && delete opts.style.point.line;
        opts.style.point.lineAnimation && delete opts.style.point.lineAnimation;
        this._PointOverlay.setOptionStyle(opts.style.point);
        this._LineStringOverlay.setOptionStyle(opts.style.line);
        this._LineStringAnimationOverlay.setOptionStyle(opts.style.lineAnimation);

        if (opts.data !== undefined) {
            this.setData(opts.data);
        }

    }
    setZIndex(zIndex) {
        this._zIndex = zIndex;

        this._PointOverlay && this._PointOverlay.setZIndex(this._zIndex);
        this._LineStringOverlay && this._LineStringOverlay.setZIndex(this._zIndex + 2);
        this._LineStringAnimationOverlay && this._LineStringAnimationOverlay.setZIndex(this._zIndex + 4);
    }
    setData(data) {
        if (data) {
            this._data = data;
        } else {
            this._data = [];
        }

        this._PointOverlay.setData(this._getPointData());
        this._LineStringOverlay.setData(this._getLineStringData());
        this._LineStringAnimationOverlay.setData(this._getLineStringData());

    }
    _findIndex(data, name) {
        return data.findIndex((item) => {
            return item.name == name;
        });
    }
    _getPointData() {
        let data = [];
        this._data.forEach(item => {
            if (this._findIndex(data, item.from.name) == -1) {
                data.push({
                    name: item.from.name,
                    count: item.count,
                    geometry: {
                        type: 'Point',
                        coordinates: item.from.coordinates
                    },
                    style: {}
                });
            }
            if (this._findIndex(data, item.to.name) == -1) {
                data.push({
                    name: item.to.name,
                    count: item.count,
                    geometry: {
                        type: 'Point',
                        coordinates: item.to.coordinates
                    },
                    style: {}
                });
            }

        });
        return data;

    }
    _getLineStringData() {
        return this._data.map(item => {
            return {
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        item.from.coordinates,
                        item.to.coordinates
                    ]
                },
                properties: item,
                count: item.count
            };
        });
    }
    _creataPointOverlay(opts) {

        return new PointOverlay({
            ...opts.style.point,
            data: this._getPointData(),
            zIndex: this._zIndex + 1
        });
    }
    _createLineStringOverlay(opts) {

        return new LineStringOverlay({
            ...opts.style.line,
            data: this._getLineStringData(),
            zIndex: this._zIndex + 2
        });
    }
    _createLineStringAnimationOverlay(opts) {

        return new LineStringAnimationOverlay({
            ...opts.style.lineAnimation,
            data: this._getLineStringData(),
            zIndex: this._zIndex + 3
        });
    }
    dispose() {
        this._PointOverlay.dispose();
        this._LineStringOverlay.dispose();
        this._LineStringAnimationOverlay.dispose();
        let me = this;
        for (let key in me) {
            if (!isFunction(me[key])) {
                me[key] = null;
            }
        }
        me._isDispose = true;
        me = null;
    }

}