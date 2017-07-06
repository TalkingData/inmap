import {
    isString
} from './../common/util';
import {
    WhiteLover,
    Blueness
} from "./style";
import {
    MapZoom
} from './mapZoom';
import './map.less';
import deepmerge from 'deepmerge';
export class Map {
    constructor(ops) {
        this.map = null;
        this.option = deepmerge.all([{
            id: null,
            skin: 'Blueness',
            mpZoom: {
                show: true,
                max: 18,
                min: 5
            }
        }, ops])
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
        let setStyle = this.option.skin == 'Blueness' ? Blueness : WhiteLover;
        bmap.setMapStyle({
            styleJson: setStyle
        });

        //设置 地图工具容器
        let toolDom = this.crtateContainer(mapDom);
        let _tdmapOption = {};
        Object.assign(_tdmapOption, this.option, {
            mapDom: mapDom,
            toolDom: toolDom
        });

        bmap._tdmapOption = _tdmapOption;

        if (this.option.mpZoom.show) {
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

}