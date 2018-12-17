let zIndex: number = 0;
abstract class Overlay {
    canvas: any;
    zIndex: number = 0;
    render: any;
    constructor(index?: number) {
        let canvas = document.createElement('canvas');
        this.canvas = canvas;
        this.zIndex = index == null ? zIndex += 10 : index;
        if ((window as any)['AMap']) {
            canvas.style.zIndex = this.zIndex.toString();
            eval(`window.AMap.CustomLayer.call(this,canvas,{})`)
        }
        this.render = this.draw;
    }

    abstract draw(): void;
}
if ((window as any)['AMap']) {
    Overlay.prototype = new (window as any)['AMap'].CustomLayer();
}


export default Overlay;