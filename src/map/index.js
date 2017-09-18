import {
    isString
} from './../common/util';
import {
    WhiteLover,
    Blueness
} from "./../config/mapStyle";
import {
    MapZoom
} from './mapZoom';
import inmapConfig from './../config/inmapConfig';
import './map.less';
import deepmerge from 'deepmerge';
export class Map {
    constructor(ops) {
        this.map = null;
        // debugger
        this.option = deepmerge.all([inmapConfig, ops])
        this.create();
    }

    create() {
        let id = this.option.id;
        //debugger
        let mapDom = isString(id) ? document.getElementById(id) : id;
        var bmap = new BMap.Map(mapDom, {
            enableMapClick: false
        });
        bmap.disableScrollWheelZoom(); // 启用滚轮放大缩小
        bmap.disableDoubleClickZoom();
        bmap.enableKeyboard();

        //设置皮肤
        if (this.option.skin) {
            let setStyle = this.option.skin == 'Blueness' ? Blueness : WhiteLover;
            bmap.setMapStyle({
                styleJson: setStyle
            });
        }

        //设置 地图工具容器
        let toolDom = this.crtateContainer(mapDom);
        let _inmapOption = {};
        Object.assign(_inmapOption, this.option, {
            mapDom: mapDom,
            toolDom: toolDom
        });

        bmap._inmapOption = _inmapOption;
        let center = this.option.center;
        // debugger
        bmap.centerAndZoom(new BMap.Point(center[0], center[1]), this.option.zoom.value);
        // debugger
        if (this.option.zoom.show) {
            // debugger
            //添加地图级别工具条
            new MapZoom(bmap);
        }

        this.map = bmap;
    }
    crtateContainer(mapDom) {
        let parent = mapDom;
        let div = document.createElement("div");
        div.classList.add('td-map-container');
        parent.appendChild(div);
        return div;

    }
    add(overlay) {
        this.map.addOverlay(overlay)
    }
    remove(overlay) {
        overlay.dispose();
    }

}