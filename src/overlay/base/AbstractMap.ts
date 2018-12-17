import Pixel from './Pixel';

export default abstract class BaseMap {
    constructor() { }
    abstract getZoom(): void;
    abstract setZoom(zoom: number): void;
    abstract getCenter(): void;
    abstract getSize(): void;
    //获取俯仰角
    abstract getPitch(): void;
    //获取地图顺时针旋转角度
    abstract getRotation(): void;
    //获取当前地图状态信息，包括是否可鼠标拖拽移动地图、地图是否可缩放、地图是否可旋转（rotateEnable）、是否可双击放大地图、是否可以通过键盘控制地图旋转（keyboardEnable）
    abstract getStatus(): void;
    //获取当前地图比例尺。其值为当前地图中心点处比例尺值的倒数
    abstract getScale(): void;
    //指定当前地图显示范围，参数bounds为指定的范围
    abstract setBounds(bounds: Object): void;
    //设置地图顺时针旋转角度，旋转原点为地图容器中心点，取值范围 [0-360]（
    abstract setRotation(rotation: number): void;
    abstract zoomIn(): void;
    abstract zoomOut(): void;
    //地图中心点平移至指定点位置
    abstract panTo(lngLat: object): void;
    //以像素为单位，沿x方向和y方向移动地图，x向右为正，y向下为正
    abstract panBy(x: number, y: number): void;
    //设置俯仰角,3D视图有效
    abstract setPitch(pitch: number): void;

    abstract addEventListener(name: String, callback: Function): void;
    abstract removeEventListener(name: String, callback: Function): void;

    //墨卡托坐标
    abstract pixelToLngLat(pixel: Pixel): void;
    abstract lngLatToPixel(lng: string, lat: string): void;
    //图层像素坐标
    abstract LngLatToOverlayPixel(lng: string, lat: string): void;
    abstract overlayPixelToLngLat(pixel: Pixel): void;

    abstract addOverlay(overlay: Object): void;
    abstract removeOverlay(overlay: Object): void;
    //设置鼠标样式
    abstract setDefaultCursor(name: String): void;
    //返回方案总距离
    abstract getDistance(start: Object, end: Object): void;
    //禁用地图拖拽
    abstract disableDragging(): void;
    abstract enableDragging(): void;

}