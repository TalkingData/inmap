import MultiOverlay from './base/MultiOverlay';
import PointOverlay from './PointOverlay';
import LineStringOverlay from './LineStringOverlay';
import LineStringAnimationOverlay from './LineStringAnimationOverlay';
import config from './../config/MoveLineConfig';
import {
    merge,
    isArray,
    isFunction
} from './../common/util';

export default class MoveLineOverlay extends MultiOverlay {
    constructor(opts) {
        super();
        this.isDispose = false;
        this.data = opts.data || [];
        this._opts = merge(config, opts);
        this.PointOverlay = this.creataPointOverlay(this._opts);
        this.LineStringOverlay = this.createLineStringOverlay(this._opts);
        this.LineStringAnimationOverlay = this.createLineStringAnimationOverlay(this._opts);
    }
    _init(map) {
        map.addOverlay(this.LineStringOverlay);
        map.addOverlay(this.LineStringAnimationOverlay);
        map.addOverlay(this.PointOverlay);
    }
    setOptionStyle(opts) {
        if (!opts) return;
        this._opts = merge(this._opts, opts);
        opts.style.point.data && delete opts.style.point.data;
        opts.style.point.line && delete opts.style.point.line;
        opts.style.point.lineAnimation && delete opts.style.point.lineAnimation;
        this.PointOverlay.setOptionStyle(opts.style.point);
        this.LineStringOverlay.setOptionStyle(opts.style.line);
        this.LineStringAnimationOverlay.setOptionStyle(opts.style.lineAnimation);

        if (opts.data !== undefined) {
            this.setData(opts.data);
        }

    }
    setData(data) {
        if (data) {
            if (!isArray(data)) {
                throw new TypeError('inMap: data must be a Array');
            }
            this.data = data;

        } else {
            this.data = [];
        }

        this.PointOverlay.setData(this._getPointData());
        this.LineStringOverlay.setData(this._getLineStringData());
        this.LineStringAnimationOverlay.setData(this._getLineStringData());

    }
    _findIndex(data, name) {
        return data.findIndex((item) => {
            return item.name == name;
        });
    }
    _getPointData() {
        let data = [];
        this.data.forEach(item => {
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
        return this.data.map(item => {
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
    creataPointOverlay(opts) {
        opts.style.point['data'] = this._getPointData();
        return new PointOverlay(opts.style.point);
    }
    createLineStringOverlay(opts) {

        opts.style.line['data'] = this._getLineStringData();
        return new LineStringOverlay(opts.style.line);
    }
    createLineStringAnimationOverlay(opts) {
        opts.style.lineAnimation['data'] = this._getLineStringData();
        return new LineStringAnimationOverlay(opts.style.lineAnimation);
    }
    dispose() {
        this.PointOverlay.dispose();
        this.LineStringOverlay.dispose();
        this.LineStringAnimationOverlay.dispose();
        let me = this;
        for (let key in me) {
            if (!isFunction(me[key])) {
                me[key] = null;
            }
        }
        me.isDispose = true;
        me = null;
    }

}