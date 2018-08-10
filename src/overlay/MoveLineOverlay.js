import MultiOverlay from './base/MultiOverlay';
import PointOverlay from './PointOverlay';
import LineStringOverlay from './LineStringOverlay';
import LineStringAnimationOverlay from './LineStringAnimationOverlay';
import config from './../config/MoveLineConfig';
import {
    merge,
    isFunction
} from './../common/util';

export default class MoveLineOverlay extends MultiOverlay {
    constructor(opts) {
        super();
        this.isDispose = false;
        this.data = opts.data || [];
        let option = merge(config, opts);
        this.PointOverlay = this.creataPointOverlay(option);
        this.LineStringOverlay = this.createLineStringOverlay(option);
        this.LineStringAnimationOverlay = this.createLineStringAnimationOverlay(option);
    }
    _init(map) {
        map.addOverlay(this.LineStringOverlay);
        map.addOverlay(this.LineStringAnimationOverlay);
        map.addOverlay(this.PointOverlay);
    }
    _findIndex(data, name) {
        return data.findIndex((item) => {
            return item.name == name;
        });
    }
    creataPointOverlay(opts) {
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

        opts.style.point['data'] = data;
        return new PointOverlay(opts.style.point);
    }
    createLineStringOverlay(opts) {
        let data = this.data.map(item => {
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
        opts.style.line['data'] = data;
        return new LineStringOverlay(opts.style.line);
    }
    createLineStringAnimationOverlay(opts) {
        let data = this.data.map(item => {
            return {
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        item.from.coordinates,
                        item.to.coordinates
                    ]
                },
                count: item.count
            };
        });
        opts.style.lineAnimation['data'] = data;
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