import {
    isString,
    merge,
} from '../common/Util';
import MapZoom from './mapZoom';
import Config from '../config/Config';
import MultiOverlay from '../overlay/base/MultiOverlay';
import './map.less';

export default class Map {
    constructor(ops) {
        this._map = null;
        this._option = merge({}, ops);
        this._create();
    }
    _create() {
        let id = this._option.id;
        let mapDom = isString(id) ? document.getElementById(id) : id;
        let bmap = new window.AMap.Map(mapDom, {
            center: this._option.center,
            zooms: [this._option.zoom.min, this._option.zoom.max],
            doubleClickZoom: false,
            scrollWheel: true,
        });

        if (this._option.zoom.show) {
            //添加地图级别工具条
            let mapZoom = new MapZoom(bmap, mapDom, this._option.zoom);
            bmap.on('zoomend', () => {
                mapZoom.setButtonState();
            });
        }
        this._map = bmap;


        bmap.on('moveend', () => {
            if (Config.devtools) { //开发模式
                this.printMapInfo();
            }
        });
        bmap.on('zoomend', () => {
            if (Config.devtools) { //开发模式
                this.printMapInfo();
            }
        });

    }
    printMapInfo() {
        let center = this._map.getCenter();
        console.log(`Map: center:${JSON.stringify(center)} zoom:${this._map.getZoom()}`);
    }
    getMap() {
        return this._map;
    }
    add(overlay) {
        if (overlay._isDispose) {
            throw new TypeError('inMap: overlay has been destroyed.');
        } else if (overlay instanceof MultiOverlay) {
            overlay._init(this._map);
        } else {
            overlay.initiyalizeOverly(this._map);
            this._map.add(overlay);
        }

    }
    remove(overlay) {
        if (overlay && !overlay._isDispose) {
            overlay.dispose();
            this._map.remove(overlay);
        }
        overlay = null;
    }

}