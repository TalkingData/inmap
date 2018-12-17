import * as deepmerge from 'deepmerge'

export function merge(destinationArray: any, sourceArray: any) {
    let arr = Array.prototype.slice.call(arguments);
    return deepmerge.all(arr, {
        arrayMerge: function (destinationArray: any, sourceArray: any) {
            if (sourceArray.length > 0) {
                return sourceArray;
            } else {
                return destinationArray;
            }
        }
    });
}
export function createCanvas(zIndex: number, width: number, height: number) {
    let canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;" + "left:0;" + "top:0;" + "z-index:" + zIndex + ";user-select:none;";
    canvas.width = width;
    canvas.height = height;
    return canvas;
}