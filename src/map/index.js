import {
    isString,
    merge,
    isArray
} from './../common/util';
import {
    WhiteLover,
    Blueness
} from './../config/MapStyle';
import {
    MapZoom
} from './mapZoom';
import Toolbar from './Toolbar';
import MultiOverlay from '../overlay/base/MultiOverlay';
import inmapConfig from './../config/InmapConfig';
import './map.less';

export class Map {
    constructor(ops) {
        this.map = null;

        this.option = merge(inmapConfig, ops);

        this.create();
    }
    tMapStyle(map, skin) {
        let styleJson = null;
        if (isString(skin)) {
            styleJson = skin == 'Blueness' ? Blueness : WhiteLover;
        } else if (isArray(skin)) {
            styleJson = skin;
        }
        skin && map && map.setMapStyle({
            styleJson: styleJson
        });
    }
    create() {
        let id = this.option.id;

        let mapDom = isString(id) ? document.getElementById(id) : id;
        let bmap = new BMap.Map(mapDom, {
            enableMapClick: false
        });
        bmap.enableScrollWheelZoom(); // 启用滚轮放大缩小
        bmap.disableDoubleClickZoom();
        bmap.enableKeyboard();

        //设置皮肤
        this.tMapStyle(bmap, this.option.skin);

        bmap.inmapToolBar = new Toolbar(mapDom);
        let center = this.option.center;

        bmap.centerAndZoom(new BMap.Point(center[0], center[1]), this.option.zoom.value);
        bmap.setMinZoom(this.option.zoom.min);
        bmap.setMaxZoom(this.option.zoom.max);
        if (this.option.zoom.show) {
            //添加地图级别工具条
            let mapZoom = new MapZoom(bmap, mapDom, this.option.zoom);
            bmap.addEventListener('zoomend', () => {
                mapZoom.setButtonState();
            });
        }

        this.map = bmap;
    }
    getMap() {
        return this.map;
    }
    add(overlay) {
        if (overlay.isDispose) {
            throw new TypeError('inMap: overlay has been destroyed.');
        } else if (overlay instanceof MultiOverlay) {
          overlay._init(this.map);
        } else {
            this.map.addOverlay(overlay);
        }

    }
    remove(overlay) {
        overlay.dispose && overlay.dispose();
        overlay = null;

    }

}