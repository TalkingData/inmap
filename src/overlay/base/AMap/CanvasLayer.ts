import GaodeMap from './AMap';
import AbstractLayer from './../AbstractLayer';
import GeoJSON from './../GeoJSON';
 
export default abstract class GaodeCanvasLayer extends GaodeMap implements AbstractLayer {
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
    setCanvasSize(){}
    dispose() {
        this.addEventListener('resize', this.onResize);
    };

}