import Factory from './Factory';

export default abstract class Canvas2dOverlay extends Factory {
    ctx: any;
    onResize: any;
    margin = {
        left: 0,
        top: 0
    };

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
    setDevicePixelRatio() {
        let devicePixelRatio = window.devicePixelRatio;
        this.ctx.canvas.width = this.ctx.canvas.width * devicePixelRatio;
        this.ctx.canvas.height = this.ctx.canvas.height * devicePixelRatio;
        this.ctx.canvas.style.width = this.ctx.canvas.width / devicePixelRatio + 'px';
        this.ctx.canvas.style.height = this.ctx.canvas.height / devicePixelRatio + 'px';
        this.ctx.scale(devicePixelRatio, devicePixelRatio);
    }
}