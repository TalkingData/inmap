class Overlay {
    constructor() {

    }
}
if ((window as any)['BMap']) {
    Overlay.prototype = new (window as any)['BMap'].Overlay();
}

export default Overlay;