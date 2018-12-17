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