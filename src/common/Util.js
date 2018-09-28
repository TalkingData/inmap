import deepmerge from 'deepmerge';

export function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    return map[toString.call(obj)];
}
export function isNumber(num) {
    return typeOf(num) == 'number';
}
export function isBoolean(obj) {
    return typeOf(obj) == 'boolean';
}
/**
 * 是否是函数
 * @param {Mix}
 * @returns {Boolean}
 */
export function isFunction(func) {
    return typeOf(func) == 'function';
}

/**
 * 是否是字符串
 * @param {Mix}
 * @returns {Boolean}
 */
export function isString(string) {
    return typeOf(string) == 'string';
}

/**
 * 是否为对象类型
 * @param {Mix}
 * @returns {Boolean}
 */
export function isObject(object) {
    return typeOf(object) == 'object';
}
/**
 * 判断目标参数是否Array对象
 * @param {Mix} 
 * @returns {boolean} 类型判断结果
 */
export function isArray(source) {
    return typeOf(source) == 'array';
}
export const isEmpty = val => val == null || !(Object.keys(val) || val).length;

export const isPromiseLike = obj =>
    obj !== null &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function';

export const extend = function (target, source) {

    if (target && source && isObject(source)) {
        for (let p in source) {
            target[p] = source[p];
        }

        let prototype_fields = [
            'constructor',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'toLocaleString',
            'toString',
            'valueOf'
        ];

        for (let j = 0, key; j < prototype_fields.length; j++) {
            key = prototype_fields[j];
            if (Object.prototype.constructor.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};
export function setDevicePixelRatio(context) {
    let devicePixelRatio = window.devicePixelRatio;
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
    let ret = false;
    let latMin = 90.0;
    let latMax = -90.0;
    let lngMin = 180.0;
    let lngMax = -180.0;
    for (let i = 0; i < lat.length; i++) {
        if (lat[i] > latMax) latMax = lat[i];
        if (lat[i] < latMin) latMin = lat[i];
        if (lng[i] > lngMax) lngMax = lng[i];
        if (lng[i] < lngMin) lngMin = lng[i];
    }
    if (!(pointLat < latMin || pointLat > latMax || pointLng < lngMin || pointLng > lngMax)) {

        for (let i = 0; i < lat.length; i++) {
            let j = (i + 1) % lat.length;
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
    let lats = [];
    let lngs = [];
    for (let j = 0, len = geos.length; j < len; j++) {
        lats.push(parseFloat(geos[j][1]));
        lngs.push(parseFloat(geos[j][0]));
    }
    return isPolyContains(lats, lngs, lng, lat);
}



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



export const chunk = (arr, size) =>
    Array.from({
            length: Math.ceil(arr.length / size)
        }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );


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
export function clearPushArray(a, b) {
    if (Array.isArray(b)) {
        a.splice(0, a.length);
        b.forEach(function (val) {
            a.push(val);
        });
    } else if (b != null) {
        a.splice(0, a.length, b);
    } else {
        a.splice(0, a.length);
    }
}
export function checkType(row, isCheckName, isCheckCount) {
    let nameType = typeOf(row.name);
    let countType = typeOf(row.count);
    let geometryType = typeOf(row.geometry);
    if (isCheckName) {
        if (nameType == 'null' || nameType == 'undefined') {
            return 'The property name cannot be null!';
        }
        if (nameType !== 'string') {
            return 'The property name must be of type String!';
        }
    }
    if (isCheckCount) {
        if (countType == 'null' || countType == 'undefined') {
            return 'The property count cannot be null!';
        }
        if (countType == 'string' && typeOf(parseFloat(row.count)) !== 'number') {
            return 'The property count must be of type Number!';
        }

        
    }

    if (geometryType == 'null' || geometryType == 'undefined') {
        return 'The property geometry cannot be null!';
    }
    if (typeOf(row.geometry.type) !== 'string') {
        return 'The property geometry.type must be of type String!';
    }
    if (!isArray(row.geometry.coordinates)) {
        return 'The property geometry.coordinates must be of type Array!';
    }

}

export function checkGeoJSON(data, isCheckName, isCheckCount) {
    if (!data) return;
    if (!isArray(data)) {
        throw new TypeError('inMap: data must be is Array<GEOJSON>');
    }

    for (let i = 0, len = data.length; i < len; i++) {
        let ms = checkType(data[i], isCheckName, isCheckCount);
        if (ms) {
            throw new TypeError(`inMap: data index Line ${i}, ${ms} about geoJSON, visit http://inmap.talkingdata.com/#/docs/v2/Geojson`);
        }

    }

}