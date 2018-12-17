import BaiduMap from './BaiduMap';
import AbstractLayer from './../AbstractLayer';
import GeoJSON from './../GeoJSON';
import { createCanvas } from './../Util';

let zIndex: number = 0;
export default abstract class BaiduCanvasLayer extends BaiduMap implements AbstractLayer {
    public canvas: any;
    public zIndex: number = 0;
    constructor(index: number) {
        super();
        this.zIndex = index == null ? zIndex += 10 : index;
    };
    abstract setData(data: Array<GeoJSON>): void;
    abstract draw(): void;
    abstract created(): void;
    abstract onResize(event: any): void;
    initialize(map: any) {
        this.map = map;
        let size = this.getSize();
        this.canvas = createCanvas(this.zIndex, size.width, size.height);
        this.created();
        this.dispose();
        map.addEventListener('resize', this.onResize);
        map.getPanes()['mapPane'].appendChild(this.canvas);
        return this.canvas;
    };
    dispose() {
        this.map.addEventListener('resize', this.onResize);
    };
    setCanvasSize() {
        if (!this.map) return;
        let size = this.getSize();
        this.canvas.width = size.width;
        this.canvas.height = size.height;
        let containerDomStyle = this.canvas.style;
        let point = this.getCenter()
        let pixel = this.LngLatToOverlayPixel(point.lng, point.lat);
        let leftW = Math.floor(pixel.x - size.width / 2);
        let topH = Math.floor(pixel.y - size.height / 2);
        containerDomStyle.left = leftW + 'px';
        containerDomStyle.top = topH + 'px';
    }
};
