import AbstractMap from './../AbstractMap';
import Overlay from './Overlay';
const BMap = (window as any)['BMap'];
import Pixel from './../Pixel';

export default abstract class BaiduMap extends Overlay implements AbstractMap {
    public map: any;
    getZoom() {
        this.map.getZoom();
    };
    getCenter() {
        return this.map.getCenter();
    };
    getSize() {
        return this.map.getSize();
    };
    getPitch() { };
    getRotation() { };
    getStatus() { };
    getScale() { };
    setRotation(rotation: number) { };
    panTo(lngLat: object) { };
    panBy(x: number, y: number) { };
    setPitch(pitch: number) { };
    setBounds(bounds: Object) { };
    setZoom(zoom: number) {
        this.map.setZoom(zoom);
    };
    zoomIn() {
        this.map.zoomIn();
    };
    zoomOut() {
        this.map.zoomOut();
    };

    abstract draw(): void;
    abstract initialize(map: any):void;

    addEventListener(name: String, callback: Function) {
        this.map.addEventListener(name, callback);
    };
    removeEventListener(name: String, callback: Function) {
        this.map.removeEventListener(name, callback);
    };

    //墨卡托坐标
    lngLatToPixel(lng: string, lat: string) {
        let lngLat = new BMap.Point(lng, lat);
        let projection = this.map.getMapType().getProjection();
        return projection.lngLatToPoint(lngLat);
    }
    pixelToLngLat(pixel: Pixel) {
        let projection = this.map.getMapType().getProjection();
        return projection.pointToLngLat(pixel);
    }

    //图层像素坐标
    LngLatToOverlayPixel(lng: string, lat: string) {
        let lngLat = new BMap.Point(lng, lat);
        return this.map.pointToPixel(lngLat);
    };
    overlayPixelToLngLat(pixel: Pixel) {
        return this.map.pixelToPoint(pixel);
    };

    addOverlay(overlay: BaiduMap) {
        this.map.addoverlay(overlay);
    };
    removeOverlay(overlay: BaiduMap) {
        this.map.removeoverlay(overlay);
    };

    setDefaultCursor(name: String) {
        this.map.setDefaultCursor(name);
    };
    getDistance(start: Object, end: Object) {
        return this.map.getDistance(start, end);
    };
    disableDragging() {
        this.map.disableDragging();
    }
    enableDragging() {
        this.map.enableDragging();
    }

}
