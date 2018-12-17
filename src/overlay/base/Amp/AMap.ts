
import AbstractMap from '../AbstractMap';
const AMap = (window as any)['AMap'];
import Pixel from '../Pixel';
import Overlay from './Overlay';
export default abstract class GaoDeMap extends Overlay implements AbstractMap {
    public map: any;
    abstract draw(): void;
    constructor(index?: number) {
        super(index);
    }
    getZoom() {
        return this.map.getZoom();
    };
    setZoom(zoom: number) {
        return this.map.setZoom(zoom);
    };
    getCenter() {
        return this.map.getCenter();
    };
    getSize() {
        return this.map.getSize();
    };
    //获取俯仰角
    getPitch() {
        return this.map.getPitch();
    }
    //获取地图顺时针旋转角度
    getRotation() {
        return this.map.getRotation();
    }
    //获取当前地图状态信息，包括是否可鼠标拖拽移动地图、地图是否可缩放、地图是否可旋转（rotateEnable）、是否可双击放大地图、是否可以通过键盘控制地图旋转（keyboardEnable）
    getStatus() {
        return this.map.getStatus();
    };
    //获取当前地图比例尺。其值为当前地图中心点处比例尺值的倒数
    getScale() {
        return this.map.getScale();
    };
    //指定当前地图显示范围，参数bounds为指定的范围
    setBounds(bounds: Object) {
        return this.map.setBounds(bounds);
    };
    //设置地图顺时针旋转角度，旋转原点为地图容器中心点，取值范围 [0-360]（
    setRotation(rotation: number) {
        return this.map.setRotation(rotation);
    };
    zoomIn() {
        this.map.zoomIn();
    }
    zoomOut() {
        this.map.zoomOut();
    }
    //地图中心点平移至指定点位置
    panTo(lngLat: any) {
        return this.map.panTo(lngLat);
    }
    //以像素为单位，沿x方向和y方向移动地图，x向右为正，y向下为正
    panBy(x: number, y: number) {
        return this.map.panBy(x, y);
    };
    //设置俯仰角,3D视图有效
    setPitch(pitch: number) {
        return this.map.setPitch(pitch);
    };

    addEventListener(name: String, callback: Function) {
        this.map.on(name, callback);
    };
    removeEventListener(name: String, callback: Function) {
        this.map.off(name, callback)
    };

    //墨卡托坐标
    lngLatToPixel(lng: string, lat: string) {
        let lngLat = new AMap.LngLat(lng, lat);
        return this.map.lnglatToPixel(lngLat);
    };
    pixelToLngLat(pixel: Pixel) {
        return this.map.pixelToLngLat(pixel);
    };

    //图层像素坐标
    LngLatToOverlayPixel(lng: string, lat: string) {
        let lngLat = new AMap.LngLat(lng, lat);
        return this.map.lngLatToContainer(lngLat);
    }
    overlayPixelToLngLat(pixel: Pixel) {
        return this.map.containerToLngLat(pixel);
    }

    addOverlay(overlay: Object) {

    }
    removeOverlay(overlay: Object) {

    };
    //设置鼠标样式
    setDefaultCursor(name: String) {
        this.map.setDefaultCursor(name);
    };
    //返回方案总距离
    getDistance(start: Object, end: Object) {
        return this.map.getDistance(start, end);
    }
    //禁用地图拖拽
    disableDragging() {
        this.map.setStatus({
            dragEnable: false,
        });
    }
    enableDragging() {
        this.map.setStatus({
            dragEnable: true,
        });
    }

}



