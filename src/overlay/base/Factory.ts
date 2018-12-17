import BaiduCanvasLayer from './BMap/CanvasLayer';
import GaodeCanvasLayer from './AMap/CanvasLayer';

let canvaslayer: any;
let _window = window as any;
if (_window['BMap']) {
    canvaslayer = BaiduCanvasLayer;
} else if (_window['AMap']) {
    canvaslayer = GaodeCanvasLayer;
}

export default canvaslayer