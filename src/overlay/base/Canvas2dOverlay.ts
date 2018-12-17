import Factory from './Factory';

export default abstract class Canvas2dOverlay extends Factory {
    public ctx: any;
    public onResize: any;

    created() {
        this.ctx = this.canvas.getContext('2d');
        this.onResize = this._onResize.bind(this);
    }
    _onResize() {
        this.setCanvasSize();
        this.draw();
    }
    clearCanvas() {
        if (!this.map) return;
        let size = this.map.getSize();
        this.ctx.clearRect(0, 0, size.width, size.height); //调整画布
    }
    setCanvasSize() {
        if (!this.map) return;
        let size = this.getSize();
        this.canvas.width = size.width;
        this.canvas.height = size.height;
        this.setDevicePixelRatio();
        let containerDomStyle = this.canvas.style;
        let point = this.getCenter()
        let pixel = this.LngLatToOverlayPixel(point.lng, point.lat);

        let left = Math.ceil(pixel.x - size.width / 2);
        let top = Math.ceil(pixel.y - size.height / 2);

        containerDomStyle.left = left + 'px';
        containerDomStyle.top = top + 'px';
    }

    setDevicePixelRatio() {
        let devicePixelRatio = window.devicePixelRatio;
        this.ctx.canvas.width = this.ctx.canvas.width * devicePixelRatio;
        this.ctx.canvas.height = this.ctx.canvas.height * devicePixelRatio;
        this.ctx.canvas.style.width = this.ctx.canvas.width / devicePixelRatio + 'px';
        this.ctx.canvas.style.height = this.ctx.canvas.height / devicePixelRatio + 'px';
        this.ctx.scale(devicePixelRatio, devicePixelRatio);
    }
}