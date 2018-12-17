import GeoJSON from './GeoJSON';
export default abstract class Layer {
    abstract draw(): void;
    abstract setData(data: Array<GeoJSON>): void;
    abstract dispose(): void;
}
