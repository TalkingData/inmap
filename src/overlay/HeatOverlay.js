import {
    Parameter
} from './base/Parameter';
import baseConfig from './../config/heatConfig';
export class HeatOverlay extends Parameter {
    constructor(ops) {
        super(ops);
        this.delteOption();

        this.gradient = {
            0.25: "rgb(0,0,255)",
            0.55: "rgb(0,255,0)",
            0.85: "yellow",
            1.0: "rgb(255,0,0)"
        };
        this.minValue = 0; // 最小权重
        this.maxValue = 0; // 最大权重
        this._setOptionStyle(baseConfig, ops);
    }
    resize() {
        this.drawMap();
    }
    /**
     * 屏蔽参数
     */
    delteOption() {
        this.tooltip = {
            show: false
        };
        this.legend = {
            show: false
        }
        this.style["mouseOver"] = null;
        this.style["selected"] = null;
        this.style["splitList"] = null;
    }
    setPoints(points) {
        if (!points) {
            return;
        }
        this.points = points;
        this.drawMap();
    }
    getMax() {
        this.maxValue = 0;
        for (let i = 0, len = this.points.length; i < len; i++) {
            if (this.points[i].count > this.maxValue) {
                this.maxValue = this.points[i].count;
            }
        }
    }
    drawMap() {
        let me = this;
        this.postMessage('HeatOverlay.pointsToPixels', this.points, function (pixels) {

            if (me.eventType == 'onmoving') {
                return
            };
            me.clearCanvas();
            me.canvasResize();
            me.setWorkerData(pixels);
            me._dataRender();

        });
    }
    _dataRender() {
        // debugger
        if (this.maxValue == 0) {
            this.getMax();
        }

        let normal = this.style.normal;
        let ctx = this.ctx;
        for (let i = 0, len = this.workerData.length; i < len; i++) {
            let item = this.workerData[i];
            let opacity = (item.count - this.minValue) / (this.maxValue - this.minValue);
            this.drawPoint(item.pixel.x, item.pixel.y, normal.radius, opacity);
        }

        let palette = this.getColorPaint();
        let container = this.container;
        let img = ctx.getImageData(0, 0, container.width, container.height);
        let imgData = img.data;


        let max_opacity = normal.maxOpacity * 255;
        let min_opacity = normal.minOpacity * 255;
        //权重区间
        let max_scope = (normal.maxScope > 1 ? 1 : normal.maxScope) * 255;
        let min_scope = (normal.minScope < 0 ? 0 : normal.minScope) * 255;
        let len = imgData.length;
        for (let i = 3; i < len; i += 4) {
            let alpha = imgData[i];
            let offset = alpha * 4;
            if (!offset) {
                continue;
            }
            imgData[i - 3] = palette[offset];
            imgData[i - 2] = palette[offset + 1];
            imgData[i - 1] = palette[offset + 2];

            // 范围区间
            if (imgData[i] > max_scope) {
                imgData[i] = 0;
            }
            if (imgData[i] < min_scope) {
                imgData[i] = 0;
            }

            // 透明度
            if (imgData[i] > max_opacity) {
                imgData[i] = max_opacity;
            }
            if (imgData[i] < min_opacity) {
                imgData[i] = min_opacity;
            }
        }


        // img.data = imgData;

        ctx.putImageData(img, 0, 0, 0, 0, container.width, container.height);
    }
    drawPoint(x, y, radius, opacity) {
        let ctx = this.ctx;
        ctx.beginPath();
        let gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'rgba(0,0,0,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = opacity;
    }

    getColorPaint() {
        let gradientConfig = this.gradient;
        let paletteCanvas = document.createElement('canvas');
        let paletteCtx = paletteCanvas.getContext('2d');

        paletteCanvas.width = 256;
        paletteCanvas.height = 1;

        let gradient = paletteCtx.createLinearGradient(0, 0, 256, 1);
        for (let key in gradientConfig) {
            gradient.addColorStop(key, gradientConfig[key]);
        }

        paletteCtx.fillStyle = gradient;
        paletteCtx.fillRect(0, 0, 256, 1);
        return paletteCtx.getImageData(0, 0, 256, 1).data;;
    }

}