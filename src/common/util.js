import deepmerge from 'deepmerge';
/**
 * 是否是函数
 * @param {Mix}
 * @returns {Boolean}
 */
export function isFunction(func) {
    return typeof func == 'function';
}
/**
 * 是否是数字
 * @param {Mix}
 * @returns {Boolean}
 */
export function isNumber(number) {
    return typeof number == 'number';
}
/**
 * 是否是字符串
 * @param {Mix}
 * @returns {Boolean}
 */
export function isString(string) {
    return typeof string == 'string';
}
/**
 * 是否定义
 * @param {Mix}
 * @returns {Boolean}
 */
export function isDefined(object) {
    return typeof object != 'undefined';
}
/**
 * 是否为对象类型
 * @param {Mix}
 * @returns {Boolean}
 */
export function isObject(object) {
    return typeof object == 'object';
}
/**
 * 判断目标参数是否Array对象
 * @param {Mix} 
 * @returns {boolean} 类型判断结果
 */
export function isArray(source) {
    return '[object Array]' == Object.prototype.toString.call(source);
}
/**
 * 判断字符串长度英文占1个字符，中文汉字占2个字符
 * @param {Object} str
 */
export function getBlen(str) {
    return str.replace(/[^\x00-\xff]/g, '01').length;
}

export var extend = function (target, source) {

    if (target && source && typeof (source) == 'object') {
        for (var p in source) {
            target[p] = source[p];
        }

        var prototype_fields = [
            'constructor',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'toLocaleString',
            'toString',
            'valueOf'
        ];

        for (var j = 0, key; j < prototype_fields.length; j++) {
            key = prototype_fields[j];
            if (Object.prototype.constructor.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};
export function setDevicePixelRatio(context) {
    var devicePixelRatio = window.devicePixelRatio;
    context.canvas.width = context.canvas.width * devicePixelRatio;
    context.canvas.height = context.canvas.height * devicePixelRatio;
    context.canvas.style.width = context.canvas.width / devicePixelRatio + 'px';
    context.canvas.style.height = context.canvas.height / devicePixelRatio + 'px';

    context.scale(devicePixelRatio, devicePixelRatio);
}
export function encodeHTML(source) {
    return String(source)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function isPolyContains(lng, lat, pointLat, pointLng) {
    var ret = false;
    var latMin = 90.0;
    var latMax = -90.0;
    var lngMin = 180.0;
    var lngMax = -180.0;
    for (let i = 0; i < lat.length; i++) {
        if (lat[i] > latMax) latMax = lat[i];
        if (lat[i] < latMin) latMin = lat[i];
        if (lng[i] > lngMax) lngMax = lng[i];
        if (lng[i] < lngMin) lngMin = lng[i];
    }
    if (!(pointLat < latMin || pointLat > latMax || pointLng < lngMin || pointLng > lngMax)) {

        for (let i = 0; i < lat.length; i++) {
            var j = (i + 1) % lat.length;
            if ((lat[i] < pointLat) != (lat[j] < pointLat) && (pointLng < (lng[j] - lng[i]) * (pointLat - lat[i]) / (lat[j] - lat[i]) + lng[i])) {
                ret = !ret;
            }
        }
    }
    return ret;
}
/**
 * 判断pont点是否在围栏内
 * @param {*} lng 经度 
 * @param {*} lat 纬度
 * @param {*} geos  围栏数据
 */
export function isPolyContainsPt(lng, lat, geos) {
    var lats = [];
    var lngs = [];
    for (var j = 0, len = geos.length; j < len; j++) {
        lats.push(parseFloat(geos[j][1]));
        lngs.push(parseFloat(geos[j][0]));
    }
    return isPolyContains(lats, lngs, lng, lat);
}

/**
 * 判断是否是移动端
 */
export function detectmob() {
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
    ) {
        return true;
    } else {
        return false;
    }
}
export function merge() {
    let arr = Array.prototype.slice.call(arguments);
    return deepmerge.all(arr, {
        arrayMerge: function (destinationArray, sourceArray) {
            if (sourceArray.length > 0) {
                return sourceArray;
            } else {
                return destinationArray;
            }
        }
    });
}
