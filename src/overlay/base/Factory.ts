import BaiduMap from './BMap/BaiduMap';
import GaodeMap from './Amp/AMap';
import GeoJSON from './GeoJSON';
function createCanvas(zIndex: number, width: number, height: number) {
    let canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;" + "left:0;" + "top:0;" + "z-index:" + zIndex + ";user-select:none;";
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

abstract class Layer {
    abstract draw(): void;
    abstract setData(data: Array<GeoJSON>): void;
    abstract dispose(): void;
}

let zIndex: number = 0;
//根据map 创建对于的图层
abstract class BaiduCanvasLayer extends BaiduMap {
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
};

abstract class GaodeCanvasLayer extends GaodeMap implements Layer {
    constructor(index?: number) {
        super(index);

    };
    initiyalizeOverly(map: any) {
        this.map = map;
        let size = map.getSize();
        this.canvas.width = size.width;
        this.canvas.height = size.height;
        this.dispose();
        this.addEventListener('resize', this.onResize);
        this.created();
    }
    abstract created(): void;
    abstract setData(data: Array<GeoJSON>): void;
    abstract draw(): void;
    abstract onResize(event: any): void;
    dispose() {
        this.addEventListener('resize', this.onResize);
    };

}
let canvaslayer: any;
let _window = window as any;
if (_window['BMap']) {
    canvaslayer = BaiduCanvasLayer;
} else if (_window['AMap']) {
    canvaslayer = GaodeCanvasLayer;
}

export default canvaslayer