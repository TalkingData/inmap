import config from './config';
import Canvas2dOverlay from './../base/Canvas2dOverlay';
import GeoJSON from '../base/GeoJSON';
import Pixel from '../base/Pixel';
import {
    merge
} from '../base/Util';
export default class PointOverlay extends Canvas2dOverlay {
    private data: Array<any> = [];
    private option: any;
    constructor(opts?: any) {
        super();
        this.setStyle(config, opts);
    }
    draw() {
        this.setCanvasSize();
        this.DataToOverlayPixel();
        this.refresh();
    };
    setStyle(config: any, opts: any) {
        opts = opts || {};
        let option = merge(config, opts) as any;
        if (option.style.splitList && option.style.splitList.length > 0) {
            option.style.colors = [];
        }
        this.option = option;

        if (opts.data !== undefined) {
            this.setData(opts.data);
        } else {
            this.map && this.refresh();
        }
        delete this.option.data;
        // this._selectItem = option.selected || [];
        // this._tMapStyle(option.skin);
        // this.toolTip && this.toolTip.setOption(this._tooltipConfig);

    }
    refresh() {
        this.map && this.drawData();
    }
    setData(data: Array<GeoJSON>) {
        this.data = JSON.parse(JSON.stringify(data));
        this.DataToOverlayPixel();
        this.refresh();
    };
    drawData() {
        this.clearCanvas();
        let {
            style
        } = this.option;
        for (let index = 0; index < this.data.length; index++) {
            const element = this.data[index];
            this.drawCircle(
                element.pixel,
                style.normal.size,
                style.normal.backgroundColor,
                style.normal.lineWidth
            );

        }
    };
    DataToOverlayPixel() {
        if (!this.map) return;
        for (let index = 0; index < this.data.length; index++) {
            const element = this.data[index];
            let coordinates = element.geometry.coordinates;
            element['pixel'] = this.LngLatToOverlayPixel(coordinates[0], coordinates[1]);
        }
    };
    drawCircle(pixel: Pixel, radius: number, color: string, lineWidth?: number, strokeStyle?: string) {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(pixel.x, pixel.y, radius, 0, 2 * Math.PI, true);
        ctx.fill();
        if (lineWidth) {
            ctx.lineWidth = lineWidth;
            if (strokeStyle) {
                ctx.strokeStyle = strokeStyle;
            }
            ctx.stroke();
        }
    };
}; 