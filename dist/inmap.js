(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("inMap", [], factory);
	else if(typeof exports === 'object')
		exports["inMap"] = factory();
	else
		root["inMap"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 180);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(23);
var hide = __webpack_require__(13);
var redefine = __webpack_require__(14);
var ctx = __webpack_require__(20);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.chunk = exports.extend = exports.isPromiseLike = exports.isEmpty = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.typeOf = typeOf;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isObject = isObject;
exports.isArray = isArray;
exports.setDevicePixelRatio = setDevicePixelRatio;
exports.encodeHTML = encodeHTML;
exports.isPolyContains = isPolyContains;
exports.isPolyContainsPt = isPolyContainsPt;
exports.detection = detection;
exports.merge = merge;
exports.clearPushArray = clearPushArray;
exports.checkType = checkType;
exports.checkGeoJSON = checkGeoJSON;
exports.rectangleLngLats = rectangleLngLats;
exports.geoJsonPointRectangle = geoJsonPointRectangle;
exports.geoJsonLineStringRectangle = geoJsonLineStringRectangle;
exports.geoJsonPolygonRectangle = geoJsonPolygonRectangle;

var _deepmerge = __webpack_require__(97);

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function typeOf(obj) {
    var toString = Object.prototype.toString;
    var map = {
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
function isNumber(num) {
    return typeOf(num) == 'number';
}
function isBoolean(obj) {
    return typeOf(obj) == 'boolean';
}
function isFunction(func) {
    return typeOf(func) == 'function';
}

function isString(string) {
    return typeOf(string) == 'string';
}

function isObject(object) {
    return typeOf(object) == 'object';
}
function isArray(source) {
    return typeOf(source) == 'array';
}
var isEmpty = exports.isEmpty = function isEmpty(val) {
    return val == null || !(Object.keys(val) || val).length;
};

var isPromiseLike = exports.isPromiseLike = function isPromiseLike(obj) {
    return obj !== null && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};

var extend = exports.extend = function extend(target, source) {

    if (target && source && isObject(source)) {
        for (var p in source) {
            target[p] = source[p];
        }

        var prototype_fields = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

        for (var j = 0, key; j < prototype_fields.length; j++) {
            key = prototype_fields[j];
            if (Object.prototype.constructor.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};
function setDevicePixelRatio(context) {
    var devicePixelRatio = window.devicePixelRatio;
    context.canvas.width = context.canvas.width * devicePixelRatio;
    context.canvas.height = context.canvas.height * devicePixelRatio;
    context.canvas.style.width = context.canvas.width / devicePixelRatio + 'px';
    context.canvas.style.height = context.canvas.height / devicePixelRatio + 'px';

    context.scale(devicePixelRatio, devicePixelRatio);
}
function encodeHTML(source) {
    return String(source).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function isPolyContains(lng, lat, pointLat, pointLng) {
    var ret = false;
    var latMin = 90.0;
    var latMax = -90.0;
    var lngMin = 180.0;
    var lngMax = -180.0;
    for (var i = 0; i < lat.length; i++) {
        if (lat[i] > latMax) latMax = lat[i];
        if (lat[i] < latMin) latMin = lat[i];
        if (lng[i] > lngMax) lngMax = lng[i];
        if (lng[i] < lngMin) lngMin = lng[i];
    }
    if (!(pointLat < latMin || pointLat > latMax || pointLng < lngMin || pointLng > lngMax)) {

        for (var _i = 0; _i < lat.length; _i++) {
            var j = (_i + 1) % lat.length;
            if (lat[_i] < pointLat != lat[j] < pointLat && pointLng < (lng[j] - lng[_i]) * (pointLat - lat[_i]) / (lat[j] - lat[_i]) + lng[_i]) {
                ret = !ret;
            }
        }
    }
    return ret;
}
function isPolyContainsPt(lng, lat, geos) {
    var lats = [];
    var lngs = [];
    for (var j = 0, len = geos.length; j < len; j++) {
        lats.push(parseFloat(geos[j][1]));
        lngs.push(parseFloat(geos[j][0]));
    }
    return isPolyContains(lats, lngs, lng, lat);
}

function detection() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        return true;
    } else {
        return false;
    }
}

var chunk = exports.chunk = function chunk(arr, size) {
    return Array.from({
        length: Math.ceil(arr.length / size)
    }, function (v, i) {
        return arr.slice(i * size, i * size + size);
    });
};

function merge() {
    var arr = Array.prototype.slice.call(arguments);
    return _deepmerge2.default.all(arr, {
        arrayMerge: function arrayMerge(destinationArray, sourceArray) {
            return sourceArray || [];
        }
    });
}
function clearPushArray(a, b) {
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
function checkType(row, isCheckName, isCheckCount) {
    var nameType = typeOf(row.name);
    var countType = typeOf(row.count);
    var geometryType = typeOf(row.geometry);
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

function checkGeoJSON(data, isCheckName, isCheckCount) {
    if (!data) return;
    if (!isArray(data)) {
        throw new TypeError('inMap: data must be is Array<GEOJSON>');
    }

    for (var i = 0, len = data.length; i < len; i++) {
        var ms = checkType(data[i], isCheckName, isCheckCount);
        if (ms) {
            throw new TypeError('inMap: data index Line ' + i + ', ' + ms + ' about geoJSON, visit http://inmap.talkingdata.com/#/docs/v2/Geojson');
        }
    }
}
function rectangleLngLats(geo) {
    if (geo.length == 0) {
        return [];
    }

    var minX = geo[0][0];
    var minY = geo[0][1];
    var maxX = geo[0][0];
    var maxY = geo[0][1];
    for (var i = 1; i < geo.length; i++) {
        minX = Math.min(minX, geo[i][0]);
        maxX = Math.max(maxX, geo[i][0]);
        minY = Math.min(minY, geo[i][1]);
        maxY = Math.max(maxY, geo[i][1]);
    }
    return [[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]];
}

function geoJsonPointRectangle() {
    var geoJsonPoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var points = geoJsonPoint.map(function (item) {
        return item.geometry.coordinates;
    });
    return rectangleLngLats(points);
}

function geoJsonLineStringRectangle() {
    var geoJsonPoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var points = [];
    geoJsonPoint.forEach(function (item) {
        points = points.concat(item.geometry.coordinates);
    });
    return rectangleLngLats(points);
}

function geoJsonPolygonRectangle() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var points = [];
    for (var j = 0; j < data.length; j++) {
        var geometry = data[j].geometry;
        var type = geometry.type;
        var coordinates = geometry.coordinates;
        if (type == 'MultiPolygon') {
            for (var k = 0; k < coordinates.length; k++) {
                points = points.concat(coordinates[k][0]);
            }
        } else {
            var _coordinates = geometry.coordinates;
            points = points.concat(_coordinates[0]);
        }
    }
    return rectangleLngLats(points);
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(65)('wks');
var uid = __webpack_require__(45);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(117);
var toPrimitive = __webpack_require__(27);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(26);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(24);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var createDesc = __webpack_require__(41);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(13);
var has = __webpack_require__(12);
var SRC = __webpack_require__(45)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(23).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(24);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(53);
var createDesc = __webpack_require__(41);
var toIObject = __webpack_require__(18);
var toPrimitive = __webpack_require__(27);
var has = __webpack_require__(12);
var IE8_DOM_DEFINE = __webpack_require__(117);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(12);
var toObject = __webpack_require__(10);
var IE_PROTO = __webpack_require__(86)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(52);
var defined = __webpack_require__(24);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(11);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(20);
var IObject = __webpack_require__(52);
var toObject = __webpack_require__(10);
var toLength = __webpack_require__(9);
var asc = __webpack_require__(71);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(23);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    computeBefore: 0,
    computeAfter: 1,
    drawBefore: 2,
    drawAfter: 3
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseClass2 = __webpack_require__(185);

var _BaseClass3 = _interopRequireDefault(_BaseClass2);

var _Legend = __webpack_require__(181);

var _Legend2 = _interopRequireDefault(_Legend);

var _Throttle = __webpack_require__(162);

var _Throttle2 = _interopRequireDefault(_Throttle);

var _EventManage = __webpack_require__(187);

var _EventManage2 = _interopRequireDefault(_EventManage);

var _Util = __webpack_require__(5);

var _MapStyleConfig = __webpack_require__(105);

var _Toolbar = __webpack_require__(106);

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Tooltip = __webpack_require__(182);

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var zIndex = 0;
var isMobile = (0, _Util.detection)();

var CanvasOverlay = function (_BaseClass) {
    _inherits(CanvasOverlay, _BaseClass);

    function CanvasOverlay(opts) {
        _classCallCheck(this, CanvasOverlay);

        var _this = _possibleConstructorReturn(this, (CanvasOverlay.__proto__ || Object.getPrototypeOf(CanvasOverlay)).call(this));

        _this._ctx = null;
        _this._eventType = 'moveend';
        _this._map = null;
        _this._container = null;
        _this._throttle = new _Throttle2.default();
        _this._tOnResize = _this._tOnResize.bind(_this);
        _this._tOnMoveEnd = _this._tOnMoveEnd.bind(_this);
        _this._tOnZoomStart = _this._tOnZoomStart.bind(_this);
        _this._tOnZoomEnd = _this._tOnZoomEnd.bind(_this);
        _this._tOnMoving = _this._tOnMoving.bind(_this);
        _this._tMousemove = _this._tMousemove.bind(_this);
        _this._tMouseout = _this._tMouseout.bind(_this);
        _this._tMouseClick = _this._tMouseClick.bind(_this);
        _this._resize = _this._toDraw.bind(_this);
        _this._throttle.on('throttle', _this._resize);
        _this._devicePixelRatio = window.devicePixelRatio;
        _this._repaintEnd = opts && opts.repaintEnd;
        _this._animationFlag = true;
        _this._isDispose = false;
        _this.emitEvent = false;

        _this._subscriptions = {
            onMouseClick: [],
            onMouseOver: [],
            onMouseLeave: [],
            onState: [],
            onInit: [],
            isInit: true,
            preEmitName: null
        };

        _this._margin = {
            left: 0,
            top: 0
        };
        _this._zIndex = !opts || opts.zIndex == null ? zIndex += 10 : opts.zIndex;

        return _this;
    }

    _createClass(CanvasOverlay, [{
        key: 'initialize',
        value: function initialize(map) {
            this._map = map;
            this._container = document.createElement('canvas');
            this._ctx = this._container.getContext('2d');
            this._margin.left = -this._map.offsetX;
            this._margin.top = -this._map.offsetY;
            this._container.style.cssText = 'position:absolute;left:' + this._margin.left + 'px;top:' + this._margin.top + 'px;z-index:' + this._zIndex + ';';
            map.getPanes().mapPane.appendChild(this._container);
            this._setCanvasSize();
            this._tBindEvent();
            if (!map._inmapToolBar) {
                map._inmapToolBar = new _Toolbar2.default(map.getContainer());
            }

            this.legend = new _Legend2.default(map._inmapToolBar.legendContainer);
            this.toolTip = new _Tooltip2.default(map._inmapToolBar.container);

            this._canvasInit();
            return this._container;
        }
    }, {
        key: '_tBindEvent',
        value: function _tBindEvent() {
            var map = this._map;

            map.addEventListener('resize', this._tOnResize);
            map.addEventListener('moveend', this._tOnMoveEnd);
            map.addEventListener('moving', this._tOnMoving);
            map.addEventListener('zoomstart', this._tOnZoomStart);
            map.addEventListener('zoomend', this._tOnZoomEnd);

            if (this.emitEvent) {
                _EventManage2.default.register(map, this);
            } else {

                map.addEventListener('mousemove', this._tMousemove);
                map.addEventListener('mouseout', this._tMouseout);
                if (isMobile) {
                    map.addEventListener('touchstart', this._tMouseClick);
                } else {
                    map.addEventListener('click', this._tMouseClick);
                }
            }
        }
    }, {
        key: '_bindEmit',
        value: function _bindEmit() {
            for (var name in this._eventConfig) {
                var fun = this._eventConfig[name];
                if ((0, _Util.isFunction)(fun)) {
                    this.on(name, fun);
                }
            }
        }
    }, {
        key: '_clearBindEmit',
        value: function _clearBindEmit() {
            var eventConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            for (var name in eventConfig) {
                var fun = eventConfig[name];
                if ((0, _Util.isFunction)(fun)) {
                    this.off(name, fun);
                }
            }
        }
    }, {
        key: '_tMapStyle',
        value: function _tMapStyle(skin) {
            var styleJson = null;
            if ((0, _Util.isString)(skin)) {
                styleJson = skin == 'Blueness' ? _MapStyleConfig.Blueness : _MapStyleConfig.WhiteLover;
            } else if ((0, _Util.isArray)(skin)) {
                styleJson = skin;
            }
            skin && this._map && this._map.setMapStyle({
                styleJson: styleJson
            });
        }
    }, {
        key: '_tMouseout',
        value: function _tMouseout() {
            this.toolTip && this.toolTip.hide();
        }
    }, {
        key: '_tOnResize',
        value: function _tOnResize(event) {
            this._setCanvasSize();
            this._eventType = event.type;
            this._tDraw(this, event);
        }
    }, {
        key: '_tOnMoveEnd',
        value: function _tOnMoveEnd(event) {
            this._animationFlag = true;
            this._eventType = event.type;
        }
    }, {
        key: '_tOnZoomStart',
        value: function _tOnZoomStart() {
            this._animationFlag = false;
            this._clearCanvas();
        }
    }, {
        key: '_tOnZoomEnd',
        value: function _tOnZoomEnd(e) {
            this._animationFlag = true;
            this._eventType = e.type;
        }
    }, {
        key: '_tOnMoving',
        value: function _tOnMoving(e) {
            this._animationFlag = false;
            this._eventType = e.type;
        }
    }, {
        key: '_tMousemove',
        value: function _tMousemove() {}
    }, {
        key: '_canvasInit',
        value: function _canvasInit() {}
    }, {
        key: 'draw',
        value: function draw() {
            var eventType = this._eventType;
            if (eventType == 'onmoving') {
                this._canvasResize();
            } else {
                this._throttle.throttleEvent();
            }
        }
    }, {
        key: '_tMouseClick',
        value: function _tMouseClick() {}
    }, {
        key: '_tDraw',
        value: function _tDraw(me, event) {
            this._eventType = event.type;
            me.draw(event);
            this._repaintEnd && this._repaintEnd(this);
        }
    }, {
        key: '_toDraw',
        value: function _toDraw() {}
    }, {
        key: 'on',
        value: function on(name, callback) {

            if (name.length > 2 && name.indexOf('on') === -1) {
                name = 'on' + name[0].toUpperCase() + name.substr(1);
            }

            var subscriber = this._subscriptions[name];
            if (!subscriber) return;
            var index = subscriber.findIndex(function (item) {
                return item === callback;
            });

            if (index > -1) {
                subscriber.splice(index, 1);
            }
            subscriber.push(callback);
        }
    }, {
        key: 'off',
        value: function off(name, callback) {
            if (name.length > 2 && name.indexOf('on') === -1) {
                name = 'on' + name[0].toUpperCase() + name.substr(1);
            }

            var subscriber = this._subscriptions[name];
            if (!subscriber) return;
            for (var index = 0; index < subscriber.length; index++) {
                var element = subscriber[index];
                if (element === callback) {
                    subscriber.splice(index, 1);
                    index--;
                }
            }
        }
    }, {
        key: '_emitInit',
        value: function _emitInit() {
            if (this._subscriptions.isInit) {
                this._subscriptions.isInit = false;
                this._emit('onInit', this);
            }
        }
    }, {
        key: '_setState',
        value: function _setState(val) {
            this._state = val;
            this._emit('onState', this._state, this);
        }
    }, {
        key: '_emit',
        value: function _emit(name) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            if (name.length > 2 && name.indexOf('on') === -1) {

                name = 'on' + name[0].toUpperCase() + name.substr(1);
            }
            if (name != 'onMouseClick' && name !== 'onState' && this._subscriptions.preEmitName == name) {
                return;
            }
            this._subscriptions.preEmitName = name;
            var subscriber = this._subscriptions[name];
            subscriber && subscriber.forEach(function (callBack) {
                callBack.apply(undefined, args);
            });
        }
    }, {
        key: '_canvasResize',
        value: function _canvasResize() {
            var map = this._map;
            var container = this._container;
            var point = map.getCenter();
            var size = map.getSize();
            var pixel = map.pointToOverlayPixel(point);
            var left = parseInt(pixel.x - size.width / 2, 10);
            var top = parseInt(pixel.y - size.height / 2, 10);
            var containerDomStyle = container.style;
            this._translationIf(this._margin.left, this._margin.top, left, top);

            this._margin.left = left;
            this._margin.top = top;
            containerDomStyle.left = left + 'px';
            containerDomStyle.top = top + 'px';

            containerDomStyle = null;
            container = null;
            map = null;
        }
    }, {
        key: '_translationIf',
        value: function _translationIf(oldLeft, oldTop, newLeft, newTop) {
            if (oldLeft != newLeft || oldTop != newTop) {
                this._translation(oldLeft - newLeft, oldTop - newTop);
            }
        }
    }, {
        key: '_translation',
        value: function _translation(distanceX, distanceY) {}
    }, {
        key: '_clearCanvas',
        value: function _clearCanvas() {
            if (!this._map) return;

            var size = this._map.getSize();
            this._getContext().clearRect(0, 0, size.width, size.height);
        }
    }, {
        key: '_setCanvasSize',
        value: function _setCanvasSize() {
            var size = this._map.getSize();
            this._container.width = size.width;
            this._container.height = size.height;
            (0, _Util.setDevicePixelRatio)(this._ctx);
        }
    }, {
        key: '_getContext',
        value: function _getContext() {
            return this._ctx;
        }
    }, {
        key: 'setZIndex',
        value: function setZIndex(zIndex) {
            this._zIndex = zIndex;

            if (this._container) {
                this._container.style.zIndex = this._zIndex;
            }
            _EventManage2.default.sort();
        }
    }, {
        key: 'getDataURL',
        value: function getDataURL() {
            return this._container.toDataURL();
        }
    }, {
        key: '_TClear',
        value: function _TClear() {}
    }, {
        key: '_TDispose',
        value: function _TDispose() {}
    }, {
        key: 'dispose',
        value: function dispose() {
            this._throttle.dispose();
            this._removeWorkerMessage();
            if (this._map) {
                this._map.removeEventListener('resize', this._tOnResize);
                this._map.removeEventListener('moveend', this._tOnMoveEnd);
                this._map.removeEventListener('zoomstart', this._tOnZoomStart);
                this._map.removeEventListener('zoomend', this._tOnZoomEnd);
                this._map.removeEventListener('moving', this._tOnMoving);
                this._map.removeEventListener('mousemove', this._tMousemove);

                this._map.removeEventListener('mouseout', this._tMouseout);
                if (isMobile) {
                    this._map.removeEventListener('touchstart', this._tMouseClick);
                } else {
                    this._map.removeEventListener('click', this._tMouseClick);
                }
            }
            if (this.legend) {
                this.legend.dispose(this._map._inmapToolBar.legendContainer);
                this.legend = null;
            }
            if (this.toolTip) {
                this.toolTip.dispose();
                this.toolTip = null;
            }

            this._TClear();
            this._TDispose();

            this._map.removeOverlay(this);
            var me = this;
            for (var key in me) {
                if (!(0, _Util.isFunction)(me[key])) {
                    me[key] = null;
                }
            }
            me._isDispose = true;
            me = null;
        }
    }]);

    return CanvasOverlay;
}(_BaseClass3.default);

exports.default = CanvasOverlay;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(138);
var $export = __webpack_require__(0);
var shared = __webpack_require__(65)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(141))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(7)) {
  var LIBRARY = __webpack_require__(37);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(67);
  var $buffer = __webpack_require__(92);
  var ctx = __webpack_require__(20);
  var anInstance = __webpack_require__(35);
  var propertyDesc = __webpack_require__(41);
  var hide = __webpack_require__(13);
  var redefineAll = __webpack_require__(42);
  var toInteger = __webpack_require__(26);
  var toLength = __webpack_require__(9);
  var toIndex = __webpack_require__(136);
  var toAbsoluteIndex = __webpack_require__(44);
  var toPrimitive = __webpack_require__(27);
  var has = __webpack_require__(12);
  var classof = __webpack_require__(51);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(10);
  var isArrayIter = __webpack_require__(78);
  var create = __webpack_require__(38);
  var getPrototypeOf = __webpack_require__(17);
  var gOPN = __webpack_require__(39).f;
  var getIterFn = __webpack_require__(95);
  var uid = __webpack_require__(45);
  var wks = __webpack_require__(6);
  var createArrayMethod = __webpack_require__(22);
  var createArrayIncludes = __webpack_require__(54);
  var speciesConstructor = __webpack_require__(66);
  var ArrayIterators = __webpack_require__(96);
  var Iterators = __webpack_require__(46);
  var $iterDetect = __webpack_require__(60);
  var setSpecies = __webpack_require__(43);
  var arrayFill = __webpack_require__(70);
  var arrayCopyWithin = __webpack_require__(109);
  var $DP = __webpack_require__(8);
  var $GOPD = __webpack_require__(16);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = __webpack_require__(5);

var _CanvasOverlay2 = __webpack_require__(29);

var _CanvasOverlay3 = _interopRequireDefault(_CanvasOverlay2);

var _Color = __webpack_require__(68);

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isMobile = (0, _Util.detection)();

var Parameter = function (_CanvasOverlay) {
    _inherits(Parameter, _CanvasOverlay);

    function Parameter(baseConfig, ops) {
        _classCallCheck(this, Parameter);

        var _this = _possibleConstructorReturn(this, (Parameter.__proto__ || Object.getPrototypeOf(Parameter)).call(this, ops));

        _this._data = [];
        _this._workerData = [];
        _this._option = {};
        _this._baseConfig = baseConfig;
        _this._selectItem = [];
        _this._overItem = null;
        _this._setStyle(baseConfig, ops);
        return _this;
    }

    _createClass(Parameter, [{
        key: '_setStyle',
        value: function _setStyle(config, ops, callback) {
            ops = ops || {};

            var option = (0, _Util.merge)(config, ops);
            if (option.style.splitList && option.style.splitList.length > 0) {
                option.style.colors = [];
            }

            this._toRgba(option.style);
            this._option = option;
            this._tooltipConfig = option.tooltip;
            this._legendConfig = option.legend;
            this._eventConfig = option.event;
            this._styleConfig = option.style;
            if (ops.data !== undefined) {
                this.setData(ops.data, callback);
            } else {
                this._onOptionChange();
                if (this._map) {
                    this.refresh();
                    if (callback) {
                        callback(this);
                    }
                }
            }
            delete this._option.data;
            this._selectItem = option.selected || [];
            this._tMapStyle(option.skin);
            this.toolTip && this.toolTip.setOption(this._tooltipConfig);
            this.emitEvent = this._eventConfig.emitEvent;
            this._clearBindEmit(config.event);
            this._bindEmit();
        }
    }, {
        key: '_checkGeoJSON',
        value: function _checkGeoJSON(data) {
            var isCheckCount = this._styleConfig.colors.length > 0 || this._styleConfig.splitList.length > 0;
            (0, _Util.checkGeoJSON)(data, this._option.checkDataType.name, isCheckCount);
        }
    }, {
        key: 'setData',
        value: function setData(points, callback) {
            if (points) {
                this._checkGeoJSON(points);
                this._data = points;
            } else {
                this._data = [];
            }

            this._clearData();
            this._cancerSelected();
            this._onDataChange();
            this._map && this._toDraw(callback);
        }
    }, {
        key: '_onOptionChange',
        value: function _onOptionChange() {}
    }, {
        key: '_onDataChange',
        value: function _onDataChange() {}
    }, {
        key: 'setPoints',
        value: function setPoints(points) {
            this.setData(points);
        }
    }, {
        key: 'getRenderData',
        value: function getRenderData() {
            return this._workerData;
        }
    }, {
        key: '_getTransformData',
        value: function _getTransformData() {
            return this._workerData.length > 0 ? this._workerData : this._data;
        }
    }, {
        key: '_clearData',
        value: function _clearData() {
            (0, _Util.clearPushArray)(this._workerData);
            this._overItem = null;
        }
    }, {
        key: '_cancerSelected',
        value: function _cancerSelected() {
            (0, _Util.clearPushArray)(this._selectItem, []);
        }
    }, {
        key: 'setSelectedList',
        value: function setSelectedList(list) {
            (0, _Util.clearPushArray)(this._selectItem, list);
            this._map && this.refresh();
        }
    }, {
        key: '_setWorkerData',
        value: function _setWorkerData(val) {
            this._data = [];
            this._overItem = null;
            (0, _Util.clearPushArray)(this._workerData, val);
        }
    }, {
        key: '_canvasInit',
        value: function _canvasInit() {
            this.toolTip.setOption(this._tooltipConfig);
            this._parameterInit();
        }
    }, {
        key: '_parameterInit',
        value: function _parameterInit() {}
    }, {
        key: '_toRgba',
        value: function _toRgba(styleConfig) {
            ['normal', 'mouseOver', 'selected'].forEach(function (status) {
                var statusStyle = styleConfig[status];
                if (statusStyle) {
                    ['backgroundColor', 'borderColor', 'shadowColor'].forEach(function (item) {
                        var val = statusStyle[item];
                        if (val && val.indexOf('rgba') == -1) {
                            styleConfig[status][item] = new _Color2.default(val).getRgbaValue();
                        }
                    });
                }
            });
            styleConfig.colors && styleConfig.colors.forEach(function (val, index, arr) {
                if (val.indexOf('rgba') == -1) {
                    arr[index] = new _Color2.default(val).getRgbaValue();
                }
            });
        }
    }, {
        key: '_setDrawStyle',
        value: function _setDrawStyle(item, otherMode, i) {
            var normal = this._styleConfig.normal,
                mouseOverStyle = this._styleConfig.mouseOver,
                selectedStyle = this._styleConfig.selected;
            var result = (0, _Util.merge)({}, normal);
            var count = parseFloat(item.count);

            var splitList = this._styleConfig.splitList,
                len = splitList.length;
            if (len > 0 && (0, _Util.typeOf)(count) !== 'number') {
                throw new TypeError('inMap: data index Line ' + i + ', The property count must be of type Number! about geoJSON, visit http://inmap.talkingdata.com/#/docs/v2/Geojson');
            }

            for (var _i = 0; _i < len; _i++) {
                var condition = splitList[_i];
                if (_i == splitList.length - 1) {
                    if (condition.end == null) {
                        if (count >= condition.start) {
                            result = this._mergeCondition(result, condition);
                            break;
                        }
                    } else if (count >= condition.start && count <= condition.end) {
                        result = this._mergeCondition(result, condition);
                        break;
                    }
                } else {
                    if (count >= condition.start && count < condition.end) {
                        result = this._mergeCondition(result, condition);
                        break;
                    }
                }
            }
            result = (0, _Util.merge)(result, item.style || {});

            if (mouseOverStyle && this._overItem == item) {
                if (mouseOverStyle.backgroundColor) {
                    result = (0, _Util.merge)(result, mouseOverStyle);
                } else {
                    result = (0, _Util.merge)(result, mouseOverStyle, {
                        backgroundColor: this._brightness(result.backgroundColor, 0.1)
                    });
                }
            }
            if (otherMode && selectedStyle && this._selectItemContains(item)) {
                result = (0, _Util.merge)(result, selectedStyle);
            }

            if (result.shadowBlur != null && result.shadowColor == null) {
                result['shadowColor'] = new _Color2.default(result.backgroundColor).getValue();
            }
            if (result.opacity != null) {
                var color = new _Color2.default(result.backgroundColor);
                result.backgroundColor = color.getRgbaValue(result.opacity || 0);
            }

            if (result.borderOpacity != null) {
                var _color = new _Color2.default(result.borderColor);
                result.borderColor = _color.getRgbaValue(result.borderOpacity || 0);
            }
            return result;
        }
    }, {
        key: '_mergeCondition',
        value: function _mergeCondition(normal, condition) {
            if (condition.opacity == null && normal.opacity != null) {
                normal.opacity = null;
            }
            if (condition.borderOpacity == null && normal.borderOpacity != null) {
                normal.borderOpacity = null;
            }
            return (0, _Util.merge)(normal, condition);
        }
    }, {
        key: '_brightness',
        value: function _brightness(rgba, delta) {

            var color = new _Color2.default(rgba);
            color.r += delta;
            color.g += delta;
            color.b += delta;
            return color.getValue();
        }
    }, {
        key: '_selectItemContains',
        value: function _selectItemContains(item) {
            return this._findIndexSelectItem(item) > -1;
        }
    }, {
        key: '_findIndexSelectItem',
        value: function _findIndexSelectItem(item) {
            return -1;
        }
    }, {
        key: '_getTarget',
        value: function _getTarget(x, y) {
            return {
                item: null,
                index: -1
            };
        }
    }, {
        key: '_deleteSelectItem',
        value: function _deleteSelectItem(item) {
            var index = this._findIndexSelectItem(item);
            index > -1 && this._selectItem.splice(index, 1);
        }
    }, {
        key: '_setTooltip',
        value: function _setTooltip(event) {
            this.toolTip.render(event, this._overItem);
        }
    }, {
        key: '_TClear',
        value: function _TClear() {
            this._data = null;
            this._workerData = null;
            this._baseConfig = null;
            this._selectItem = null;
            this._overItem = null;
            this._option = null;
            this._tooltipConfig = null;
            this._legendConfig = null;
            this._eventConfig = null;
            this._styleConfig = null;
        }
    }, {
        key: '_setLegend',
        value: function _setLegend(legendConfig, list) {
            if (!this._map) return;
            var option = {};
            if (legendConfig.list && legendConfig.list.length > 0) {
                option = _extends({}, legendConfig);
            } else {
                option = _extends({}, legendConfig, {
                    list: list
                });
            }
            this.legend.setOption(option);
        }
    }, {
        key: 'refresh',
        value: function refresh() {}
    }, {
        key: '_swopData',
        value: function _swopData(index, item) {
            if ((0, _Util.isNumber)(index) && index > -1) {
                this._workerData[index] = this._workerData[this._workerData.length - 1];
                this._workerData[this._workerData.length - 1] = item;
            }
        }
    }, {
        key: '_tMousemove',
        value: function _tMousemove(event) {
            if (this._eventType == 'onmoving') {
                return;
            }

            var result = this._getTarget(event.pixel.x, event.pixel.y);
            var temp = result.item;
            var preOverItem = this._overItem;
            if (temp != this._overItem) {
                this._overItem = temp;
                if (temp) {
                    this._swopData(result.index, result.item);
                }
                this._eventType = 'mousemove';
                if (!(0, _Util.isEmpty)(this._styleConfig.mouseOver)) {
                    this.refresh();
                }
            }
            if (temp) {
                this._map.setDefaultCursor('pointer');
                this._emit('onMouseOver', this._overItem, event, this);
            } else {
                this._map.setDefaultCursor('default');
                this._emit('onMouseLeave', preOverItem, event, this);
            }

            this._setTooltip(event);
            return result;
        }
    }, {
        key: '_tMouseClick',
        value: function _tMouseClick(event) {
            if (this._eventType == 'onmoving') return;
            var multiSelect = this._eventConfig.multiSelect;

            var result = this._getTarget(event.pixel.x, event.pixel.y);
            if (result.index == -1) {
                return;
            }
            var item = JSON.parse(JSON.stringify(result.item));
            if (multiSelect) {
                if (this._selectItemContains(item)) {
                    this._deleteSelectItem(item);
                } else {
                    this._selectItem.push(result.item);
                }
            } else {
                (0, _Util.clearPushArray)(this._selectItem, result.item);
            }

            this._swopData(result.index, item);

            this._emit('onMouseClick', this._selectItem, event, this);

            this.refresh();
            if (isMobile) {
                this._overItem = item;
                this._setTooltip(event);
            }
            return result;
        }
    }]);

    return Parameter;
}(_CanvasOverlay3.default);

exports.default = Parameter;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(6)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(13)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(45)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(12);
var setDesc = __webpack_require__(8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(20);
var call = __webpack_require__(120);
var isArrayIter = __webpack_require__(78);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(9);
var getIterFn = __webpack_require__(95);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(126);
var enumBugKeys = __webpack_require__(74);
var IE_PROTO = __webpack_require__(86)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(73)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(76).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(128);
var hiddenKeys = __webpack_require__(74).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(128);
var enumBugKeys = __webpack_require__(74);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(14);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var dP = __webpack_require__(8);
var DESCRIPTORS = __webpack_require__(7);
var SPECIES = __webpack_require__(6)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f;
var has = __webpack_require__(12);
var TAG = __webpack_require__(6)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(24);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(90);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 50 */,
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(19);
var TAG = __webpack_require__(6)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(19);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(18);
var toLength = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(44);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(14);
var redefineAll = __webpack_require__(42);
var meta = __webpack_require__(34);
var forOf = __webpack_require__(36);
var anInstance = __webpack_require__(35);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(60);
var setToStringTag = __webpack_require__(47);
var inheritIfRequired = __webpack_require__(77);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(13);
var redefine = __webpack_require__(14);
var fails = __webpack_require__(3);
var defined = __webpack_require__(24);
var wks = __webpack_require__(6);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(19);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(19);
var MATCH = __webpack_require__(6)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(6)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(37) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(2)[K];
});


/***/ }),
/* 62 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(11);
var ctx = __webpack_require__(20);
var forOf = __webpack_require__(36);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(11);
var SPECIES = __webpack_require__(6)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(13);
var uid = __webpack_require__(45);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var ColorKeywords = {
    'aliceblue': 0xF0F8FF,
    'antiquewhite': 0xFAEBD7,
    'aqua': 0x00FFFF,
    'aquamarine': 0x7FFFD4,
    'azure': 0xF0FFFF,
    'beige': 0xF5F5DC,
    'bisque': 0xFFE4C4,
    'black': 0x000000,
    'blanchedalmond': 0xFFEBCD,
    'blue': 0x0000FF,
    'blueviolet': 0x8A2BE2,
    'brown': 0xA52A2A,
    'burlywood': 0xDEB887,
    'cadetblue': 0x5F9EA0,
    'chartreuse': 0x7FFF00,
    'chocolate': 0xD2691E,
    'coral': 0xFF7F50,
    'cornflowerblue': 0x6495ED,
    'cornsilk': 0xFFF8DC,
    'crimson': 0xDC143C,
    'cyan': 0x00FFFF,
    'darkblue': 0x00008B,
    'darkcyan': 0x008B8B,
    'darkgoldenrod': 0xB8860B,
    'darkgray': 0xA9A9A9,
    'darkgreen': 0x006400,
    'darkgrey': 0xA9A9A9,
    'darkkhaki': 0xBDB76B,
    'darkmagenta': 0x8B008B,
    'darkolivegreen': 0x556B2F,
    'darkorange': 0xFF8C00,
    'darkorchid': 0x9932CC,
    'darkred': 0x8B0000,
    'darksalmon': 0xE9967A,
    'darkseagreen': 0x8FBC8F,
    'darkslateblue': 0x483D8B,
    'darkslategray': 0x2F4F4F,
    'darkslategrey': 0x2F4F4F,
    'darkturquoise': 0x00CED1,
    'darkviolet': 0x9400D3,
    'deeppink': 0xFF1493,
    'deepskyblue': 0x00BFFF,
    'dimgray': 0x696969,
    'dimgrey': 0x696969,
    'dodgerblue': 0x1E90FF,
    'firebrick': 0xB22222,
    'floralwhite': 0xFFFAF0,
    'forestgreen': 0x228B22,
    'fuchsia': 0xFF00FF,
    'gainsboro': 0xDCDCDC,
    'ghostwhite': 0xF8F8FF,
    'gold': 0xFFD700,
    'goldenrod': 0xDAA520,
    'gray': 0x808080,
    'green': 0x008000,
    'greenyellow': 0xADFF2F,
    'grey': 0x808080,
    'honeydew': 0xF0FFF0,
    'hotpink': 0xFF69B4,
    'indianred': 0xCD5C5C,
    'indigo': 0x4B0082,
    'ivory': 0xFFFFF0,
    'khaki': 0xF0E68C,
    'lavender': 0xE6E6FA,
    'lavenderblush': 0xFFF0F5,
    'lawngreen': 0x7CFC00,
    'lemonchiffon': 0xFFFACD,
    'lightblue': 0xADD8E6,
    'lightcoral': 0xF08080,
    'lightcyan': 0xE0FFFF,
    'lightgoldenrodyellow': 0xFAFAD2,
    'lightgray': 0xD3D3D3,
    'lightgreen': 0x90EE90,
    'lightgrey': 0xD3D3D3,
    'lightpink': 0xFFB6C1,
    'lightsalmon': 0xFFA07A,
    'lightseagreen': 0x20B2AA,
    'lightskyblue': 0x87CEFA,
    'lightslategray': 0x778899,
    'lightslategrey': 0x778899,
    'lightsteelblue': 0xB0C4DE,
    'lightyellow': 0xFFFFE0,
    'lime': 0x00FF00,
    'limegreen': 0x32CD32,
    'linen': 0xFAF0E6,
    'magenta': 0xFF00FF,
    'maroon': 0x800000,
    'mediumaquamarine': 0x66CDAA,
    'mediumblue': 0x0000CD,
    'mediumorchid': 0xBA55D3,
    'mediumpurple': 0x9370DB,
    'mediumseagreen': 0x3CB371,
    'mediumslateblue': 0x7B68EE,
    'mediumspringgreen': 0x00FA9A,
    'mediumturquoise': 0x48D1CC,
    'mediumvioletred': 0xC71585,
    'midnightblue': 0x191970,
    'mintcream': 0xF5FFFA,
    'mistyrose': 0xFFE4E1,
    'moccasin': 0xFFE4B5,
    'navajowhite': 0xFFDEAD,
    'navy': 0x000080,
    'oldlace': 0xFDF5E6,
    'olive': 0x808000,
    'olivedrab': 0x6B8E23,
    'orange': 0xFFA500,
    'orangered': 0xFF4500,
    'orchid': 0xDA70D6,
    'palegoldenrod': 0xEEE8AA,
    'palegreen': 0x98FB98,
    'paleturquoise': 0xAFEEEE,
    'palevioletred': 0xDB7093,
    'papayawhip': 0xFFEFD5,
    'peachpuff': 0xFFDAB9,
    'peru': 0xCD853F,
    'pink': 0xFFC0CB,
    'plum': 0xDDA0DD,
    'powderblue': 0xB0E0E6,
    'purple': 0x800080,
    'red': 0xFF0000,
    'rosybrown': 0xBC8F8F,
    'royalblue': 0x4169E1,
    'saddlebrown': 0x8B4513,
    'salmon': 0xFA8072,
    'sandybrown': 0xF4A460,
    'seagreen': 0x2E8B57,
    'seashell': 0xFFF5EE,
    'sienna': 0xA0522D,
    'silver': 0xC0C0C0,
    'skyblue': 0x87CEEB,
    'slateblue': 0x6A5ACD,
    'slategray': 0x708090,
    'slategrey': 0x708090,
    'snow': 0xFFFAFA,
    'springgreen': 0x00FF7F,
    'steelblue': 0x4682B4,
    'tan': 0xD2B48C,
    'teal': 0x008080,
    'thistle': 0xD8BFD8,
    'tomato': 0xFF6347,
    'turquoise': 0x40E0D0,
    'violet': 0xEE82EE,
    'wheat': 0xF5DEB3,
    'white': 0xFFFFFF,
    'whitesmoke': 0xF5F5F5,
    'yellow': 0xFFFF00,
    'yellowgreen': 0x9ACD32
};

function Colors(r, g, b) {

    if (g === undefined && b === undefined) {
        return this.set(r);
    }

    return this.setRGB(r, g, b);
}

Colors.prototype = {

    constructor: Colors,

    isColor: true,

    r: 1,
    g: 1,
    b: 1,

    set: function set(value) {

        if (value && value.isColor) {

            this.copy(value);
        } else if (typeof value === 'number') {

            this.setHex(value);
        } else if (typeof value === 'string') {

            this.setStyle(value);
        }

        return this;
    },

    setScalar: function setScalar(scalar) {

        this.r = scalar;
        this.g = scalar;
        this.b = scalar;
    },

    setHex: function setHex(hex) {

        hex = Math.floor(hex);

        this.r = (hex >> 16 & 255) / 255;
        this.g = (hex >> 8 & 255) / 255;
        this.b = (hex & 255) / 255;

        return this;
    },

    setRGB: function setRGB(r, g, b) {

        this.r = r;
        this.g = g;
        this.b = b;

        return this;
    },

    setHSL: function () {
        function hue2rgb(p, q, t) {

            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
            return p;
        }
    }(),

    setStyle: function setStyle(style) {

        function handleAlpha(string) {
            if (string === undefined) return;
        }

        var m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(style);

        if (m) {
            var color = void 0;
            var name = m[1];
            var components = m[2];

            switch (name) {

                case 'rgb':
                case 'rgba':

                    if (color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
                        this.r = Math.min(255, parseInt(color[1], 10)) / 255;
                        this.g = Math.min(255, parseInt(color[2], 10)) / 255;
                        this.b = Math.min(255, parseInt(color[3], 10)) / 255;
                        this.a = Math.min(1, parseFloat(color[5]));
                        handleAlpha(color[5]);

                        return this;
                    }

                    if (color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
                        this.r = Math.min(100, parseInt(color[1], 10)) / 100;
                        this.g = Math.min(100, parseInt(color[2], 10)) / 100;
                        this.b = Math.min(100, parseInt(color[3], 10)) / 100;

                        handleAlpha(color[5]);

                        return this;
                    }

                    break;

                case 'hsl':
                case 'hsla':

                    if (color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
                        var h = parseFloat(color[1]) / 360;
                        var s = parseInt(color[2], 10) / 100;
                        var l = parseInt(color[3], 10) / 100;

                        handleAlpha(color[5]);

                        return this.setHSL(h, s, l);
                    }

                    break;

            }
        } else if (m = /^\#([A-Fa-f0-9]+)$/.exec(style)) {

            var hex = m[1];
            var size = hex.length;

            if (size === 3) {
                this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
                this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
                this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;

                return this;
            } else if (size === 6) {
                this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255;
                this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255;
                this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255;

                return this;
            }
        }

        if (style && style.length > 0) {
            var _hex = ColorKeywords[style];

            if (_hex !== undefined) {
                this.setHex(_hex);
            } else {}
        }

        return this;
    },

    clone: function clone() {
        return new this.constructor(this.r, this.g, this.b);
    },

    copy: function copy(color) {

        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        return this;
    },

    copyGammaToLinear: function copyGammaToLinear(color, gammaFactor) {

        if (gammaFactor === undefined) gammaFactor = 2.0;

        this.r = Math.pow(color.r, gammaFactor);
        this.g = Math.pow(color.g, gammaFactor);
        this.b = Math.pow(color.b, gammaFactor);

        return this;
    },

    copyLinearToGamma: function copyLinearToGamma(color, gammaFactor) {

        if (gammaFactor === undefined) gammaFactor = 2.0;

        var safeInverse = gammaFactor > 0 ? 1.0 / gammaFactor : 1.0;

        this.r = Math.pow(color.r, safeInverse);
        this.g = Math.pow(color.g, safeInverse);
        this.b = Math.pow(color.b, safeInverse);

        return this;
    },

    convertGammaToLinear: function convertGammaToLinear() {

        var r = this.r,
            g = this.g,
            b = this.b;

        this.r = r * r;
        this.g = g * g;
        this.b = b * b;

        return this;
    },

    convertLinearToGamma: function convertLinearToGamma() {

        this.r = Math.sqrt(this.r);
        this.g = Math.sqrt(this.g);
        this.b = Math.sqrt(this.b);

        return this;
    },

    getHex: function getHex() {

        return this.r * 255 << 16 ^ this.g * 255 << 8 ^ this.b * 255 << 0;
    },

    getHexString: function getHexString() {

        return ('000000' + this.getHex().toString(16)).slice(-6);
    },

    getHSL: function getHSL(optionalTarget) {

        var hsl = optionalTarget || {
            h: 0,
            s: 0,
            l: 0
        };

        var r = this.r,
            g = this.g,
            b = this.b;

        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);

        var hue = void 0,
            saturation = void 0;
        var lightness = (min + max) / 2.0;

        if (min === max) {

            hue = 0;
            saturation = 0;
        } else {

            var delta = max - min;

            saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);

            switch (max) {

                case r:
                    hue = (g - b) / delta + (g < b ? 6 : 0);
                    break;
                case g:
                    hue = (b - r) / delta + 2;
                    break;
                case b:
                    hue = (r - g) / delta + 4;
                    break;

            }

            hue /= 6;
        }

        hsl.h = hue;
        hsl.s = saturation;
        hsl.l = lightness;

        return hsl;
    },

    getValue: function getValue() {
        return 'rgb(' + (this.r * 255 | 0) + ',' + (this.g * 255 | 0) + ',' + (this.b * 255 | 0) + ')';
    },
    getRgbaValue: function getRgbaValue(opacity) {
        opacity = opacity == null ? 1 : opacity;
        return 'rgba(' + (this.r * 255 | 0) + ',' + (this.g * 255 | 0) + ',' + (this.b * 255 | 0) + ',' + opacity + ')';
    },


    offsetHSL: function offsetHSL(h, s, l) {

        var hsl = this.getHSL();

        hsl.h += h;
        hsl.s += s;
        hsl.l += l;

        this.setHSL(hsl.h, hsl.s, hsl.l);

        return this;
    },

    add: function add(color) {

        this.r += color.r;
        this.g += color.g;
        this.b += color.b;

        return this;
    },

    addColors: function addColors(color1, color2) {

        this.r = color1.r + color2.r;
        this.g = color1.g + color2.g;
        this.b = color1.b + color2.b;

        return this;
    },

    addScalar: function addScalar(s) {

        this.r += s;
        this.g += s;
        this.b += s;

        return this;
    },

    sub: function sub(color) {

        this.r = Math.max(0, this.r - color.r);
        this.g = Math.max(0, this.g - color.g);
        this.b = Math.max(0, this.b - color.b);

        return this;
    },

    multiply: function multiply(color) {

        this.r *= color.r;
        this.g *= color.g;
        this.b *= color.b;

        return this;
    },

    multiplyScalar: function multiplyScalar(s) {

        this.r *= s;
        this.g *= s;
        this.b *= s;

        return this;
    },

    lerp: function lerp(color, alpha) {

        this.r += (color.r - this.r) * alpha;
        this.g += (color.g - this.g) * alpha;
        this.b += (color.b - this.b) * alpha;

        return this;
    },

    equals: function equals(c) {

        return c.r === this.r && c.g === this.g && c.b === this.b;
    },

    fromArray: function fromArray(array, offset) {

        if (offset === undefined) offset = 0;

        this.r = array[offset];
        this.g = array[offset + 1];
        this.b = array[offset + 2];

        return this;
    },

    toArray: function toArray(array, offset) {

        if (array === undefined) array = [];
        if (offset === undefined) offset = 0;

        array[offset] = this.r;
        array[offset + 1] = this.g;
        array[offset + 2] = this.b;

        return array;
    }

};
exports.default = Colors;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Label = function () {
    function Label(x, y, radius, height, byteWidth, name) {
        _classCallCheck(this, Label);

        this.center = {
            x: x,
            y: y
        };
        this.virtualReact = {
            maxX: 0,
            maxY: 0,
            minX: 0,
            minY: 0,
            width: 0,
            height: 0
        };
        this.show = true;
        this.text = name;
        this.textReact = {
            width: 0,
            height: 0
        };
        this.radius = radius + 2;
        this.padding = 0;
        this.aIndex = 0;
        if (!name) return;
        this._getRectangle(height * 1.1, byteWidth - 0.6);
    }

    _createClass(Label, [{
        key: 'getCurrentRect',
        value: function getCurrentRect() {
            var result = null;
            switch (this.aIndex.toString()) {
                case '0':
                    result = this._getRightAnchor();
                    break;
                case '1':
                    result = this._getBottomAnchor();
                    break;
                case '2':
                    result = this._getLeftAnchor();
                    break;
                case '3':
                    result = this._getTopAnchor();
                    break;
                default:
                    result = this._getCenterRectangle();
                    break;

            }
            return result;
        }
    }, {
        key: 'next',
        value: function next() {
            this.aIndex++;
            if (this.aIndex > 3) {
                this.show = false;
            }
            return this.getCurrentRect();
        }
    }, {
        key: '_getTrueLength',
        value: function _getTrueLength(str) {
            var len = str.length,
                trueLen = 0;
            for (var x = 0; x < len; x++) {
                if (str.charCodeAt(x) > 128) {
                    trueLen += 2;
                } else {
                    trueLen += 1;
                }
            }
            return trueLen;
        }
    }, {
        key: 'isAnchorMeet',
        value: function isAnchorMeet(target) {
            var react = this.getCurrentRect(),
                targetReact = target.getCurrentRect();
            if (react.minX < targetReact.maxX && targetReact.minX < react.maxX && react.minY < targetReact.maxY && targetReact.minY < react.maxY) {
                return true;
            }
            return false;
        }
    }, {
        key: '_getCenterRectangle',
        value: function _getCenterRectangle() {
            return {
                minX: this.center.x - this.radius,
                maxX: this.center.x + this.radius,
                minY: this.center.y - this.radius,
                maxY: this.center.y + this.radius
            };
        }
    }, {
        key: '_getRectangle',
        value: function _getRectangle(height, byteWidth) {
            var width = this._getTrueLength(this.text) * byteWidth;
            this.textReact = {
                width: width + this.padding * 2,
                height: height
            };
        }
    }, {
        key: '_getLeftAnchor',
        value: function _getLeftAnchor() {

            var x = this.center.x - this.radius - this.textReact.width,
                y = this.center.y - this.textReact.height / 2,
                diam = this.radius * 2,
                maxH = diam > this.textReact.height ? diam : this.textReact.height;
            return {
                x: x,
                y: y,
                minX: x,
                maxX: this.center.x + this.radius,
                minY: this.center.y - maxH / 2,
                maxY: this.center.y + maxH / 2
            };
        }
    }, {
        key: '_getRightAnchor',
        value: function _getRightAnchor() {
            var x = this.center.x + this.radius,
                y = this.center.y - this.textReact.height / 2,
                diam = this.radius * 2,
                maxH = diam > this.textReact.height ? diam : this.textReact.height;
            return {
                x: x,
                y: y,
                minX: this.center.x - this.radius,
                maxX: this.center.x + this.radius + this.textReact.width,
                minY: this.center.y - maxH / 2,
                maxY: this.center.y + maxH / 2
            };
        }
    }, {
        key: '_getTopAnchor',
        value: function _getTopAnchor() {
            var x = this.center.x - this.textReact.width / 2,
                y = this.center.y - this.radius - this.textReact.height,
                diam = this.radius * 2,
                maxW = diam > this.textReact.width ? diam : this.textReact.width;
            return {
                x: x,
                y: y,
                minX: this.center.x - maxW / 2,
                maxX: this.center.x + maxW / 2,
                minY: this.center.y - this.radius - this.textReact.height,
                maxY: this.center.y + this.radius
            };
        }
    }, {
        key: '_getBottomAnchor',
        value: function _getBottomAnchor() {
            var x = this.center.x - this.textReact.width / 2,
                y = this.center.y + this.radius,
                maxW = this.radius > this.textReact.width ? this.radius : this.textReact.width;
            return {
                x: x,
                y: y,
                minX: this.center.x - maxW / 2,
                maxX: this.center.x + maxW / 2,
                minY: this.center.y - this.radius,
                maxY: this.center.y + this.radius + this.textReact.height
            };
        }
    }]);

    return Label;
}();

exports.default = Label;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(10);
var toAbsoluteIndex = __webpack_require__(44);
var toLength = __webpack_require__(9);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(192);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(8);
var createDesc = __webpack_require__(41);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 74 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(6)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(85).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(46);
var ITERATOR = __webpack_require__(6)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(38);
var descriptor = __webpack_require__(41);
var setToStringTag = __webpack_require__(47);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(13)(IteratorPrototype, __webpack_require__(6)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(37);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(14);
var hide = __webpack_require__(13);
var has = __webpack_require__(12);
var Iterators = __webpack_require__(46);
var $iterCreate = __webpack_require__(79);
var setToStringTag = __webpack_require__(47);
var getPrototypeOf = __webpack_require__(17);
var ITERATOR = __webpack_require__(6)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 81 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 82 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(91).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(19)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(11);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(20)(Function.call, __webpack_require__(16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(65)('keys');
var uid = __webpack_require__(45);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var defined = __webpack_require__(24);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(59);
var defined = __webpack_require__(24);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(26);
var defined = __webpack_require__(24);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(20);
var invoke = __webpack_require__(118);
var html = __webpack_require__(76);
var cel = __webpack_require__(73);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(19)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(7);
var LIBRARY = __webpack_require__(37);
var $typed = __webpack_require__(67);
var hide = __webpack_require__(13);
var redefineAll = __webpack_require__(42);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(35);
var toInteger = __webpack_require__(26);
var toLength = __webpack_require__(9);
var toIndex = __webpack_require__(136);
var gOPN = __webpack_require__(39).f;
var dP = __webpack_require__(8).f;
var arrayFill = __webpack_require__(70);
var setToStringTag = __webpack_require__(47);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(23);
var LIBRARY = __webpack_require__(37);
var wksExt = __webpack_require__(137);
var defineProperty = __webpack_require__(8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(51);
var ITERATOR = __webpack_require__(6)('iterator');
var Iterators = __webpack_require__(46);
module.exports = __webpack_require__(23).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(33);
var step = __webpack_require__(121);
var Iterators = __webpack_require__(46);
var toIObject = __webpack_require__(18);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(80)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function(key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function(key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    if (!sourceAndTargetTypesMatch) {
        return cloneIfNecessary(source, optionsArgument)
    } else if (sourceIsArray) {
        var arrayMerge = options.arrayMerge || defaultArrayMerge;
        return arrayMerge(target, source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),
/* 98 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instances = {};

var WorkerMrg = function () {
    function WorkerMrg() {
        _classCallCheck(this, WorkerMrg);

        this.worker = null;
        this.workerContent = '!function(t,e){\"object\"==typeof exports&&\"object\"==typeof module?module.exports=e():\"function\"==typeof define&&define.amd?define(\"inMap\",[],e):\"object\"==typeof exports?exports.inMap=e():t.inMap=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,\"a\",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p=\"\",e(e.s=188)}({153:function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=n(50),o={toRecGrids:function(t){var e=t.request.data,n=e.points,r=e.zoomUnit,i=e.size,a=e.mapSize,u=e.nwMc,c=e.type,s=t.request.map;o._calculatePixel(s,n);var f=o.recGrids(n,s,u,i,r,a,c);return t.request.data=f,t},_calculatePixel:function(t,e){for(var n=0,o=e.length;n<o;n++){var i=e[n].geometry,a=i.coordinates;if(i.pixel=(0,r.pointToPixelWorker)({lng:a[0],lat:a[1]},t),null==e[n].count)throw new TypeError(\"inMap.GriddingOverlay: data is Invalid format \")}return e},recGrids:function(t,e,n,r,o,i,a){if(t.length<=0)return{grids:[]};for(var u={},c=r/o,s=parseInt(n.x/r,10)*r,f=(s-n.x)/o,l=i.width,h=parseInt(n.y/r,10)*r+r,p=(n.y-h)/o,d=i.height,y=[],v=0;f+v*c<l;){var g=f+v*c;y.push(g.toFixed(2)),v++}for(var m=[],x=0;p+x*c<d;){var b=p+x*c;m.push(b.toFixed(2)),x++}for(var _=0;_<y.length;_++)for(var M=0;M<m.length;M++){var P=y[_]+\"_\"+m[M];u[P]={x:parseFloat(y[_]),y:parseFloat(m[M]),list:[],count:0}}for(var w=0;w<t.length;w++){var O=t[w],j=O.geometry.pixel.x,L=O.geometry.pixel.y;if(j>=f&&j<=l&&L>=p&&L<=d)for(var S=0;S<y.length;S++){var T=Number(y[S]);if(j>=T&&j<T+c)for(var k=0;k<m.length;k++){var A=Number(m[k]);if(L>=A&&L<A+c){var R=u[y[S]+\"_\"+m[k]];R.list.push(O),R.count+=O.count}}}}var C=[];for(var E in u){var I=u[E];\"avg\"===a&&I.list.length>0&&(I.count=I.count/I.list.length),I.count>0&&C.push(I)}return u=null,y=null,m=null,t=null,{grids:C}}};e.default=o},154:function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=n(50),o={pointsToPixels:function(t){return t.request.data.forEach(function(e){var n=e.geometry.coordinates;e.geometry.pixel=(0,r.pointToPixelWorker)({lng:n[0],lat:n[1]},t.request.map),n=null}),t}};e.default=o},155:function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=n(50),o=n(5),i={toRecGrids:function(t){var e=t.request.data,n=e.points,r=e.zoomUnit,o=e.size,a=e.mapSize,u=e.nwMc,c=e.type,s=t.request.map;i._calculatePixel(s,n);var f=i.honeycombGrid(n,s,u,o,r,a,c);return t.request.data=f,t},_calculatePixel:function(t,e){for(var n=0,o=e.length;n<o;n++){var i=e[n].geometry,a=i.coordinates;if(i.pixel=(0,r.pointToPixelWorker)({lng:a[0],lat:a[1]},t),null==e[n].count)throw new TypeError(\"inMap.GriddingOverlay: data is Invalid format \")}return e},_findGrids:function(t,e,n){for(var r in t){var i=t[r];if((0,o.isPolyContains)(i.xs,i.ys,n,e))return i}return null},honeycombGrid:function(t,e,n,r,o,a,u){if(t.length<=0)return{grids:[]};var c={},s=parseInt(Math.round(r/o),10),f=s,l=parseInt(3*s/4,10),h=2*r*3/4,p=parseInt(n.y/h+1,10)*h,d=parseInt((n.y-p)/o,10);d=parseInt(d,10);var y=parseInt(n.x/r,10)*r,v=(y-n.x)/o;v=parseInt(v,10);for(var g=parseInt(a.width+f,10),m=parseInt(a.height+l,10),x=v,b=parseInt(d,10),_=!1;b<m;){for(;x<g;){var M=_?x-f/2:x;M=parseInt(M,10),c[M+\"|\"+b]=c[M+\"|\"+b]||{x:M,y:b,xs:[M,M+s/2,M+s/2,M,M-s/2,M-s/2],ys:[b-s/2,b-s/4,b+s/4,b+s/2,b+s/4,b-s/4],list:[],count:0},x+=f}_=!_,x=v,b+=l}for(var P=0;P<t.length;P++){var w=t[P],O=w.geometry.pixel.x,j=w.geometry.pixel.y;if(O>=v&&O<=g&&j>=d&&j<=m){var L=i._findGrids(c,O,j);L&&(L.list.push(w),L.count+=w.count)}}var S=[];for(var T in c){var k=c[T];\"avg\"==u&&k.count>0&&(k.count=k.count/k.list.length),k.list.length>0&&S.push(k)}return c=null,t=null,{grids:S}}};e.default=i},156:function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=n(69),o={merge:function(t){var e=t.request.data,n=e.pixels,o=e.height,i=e.borderWidth,a=e.byteWidth,u=n.map(function(t){var e=t.pixel.radius+i;return new r.Label(t.pixel.x,t.pixel.y,e,o,a,t.name)});u.sort(function(t,e){return e.x-t.x});var c=void 0;do{c=!1;for(var s=0;s<u.length;s++)for(var f=u[s],l=0;l<u.length;l++)if(s!=l&&f.show&&f.isAnchorMeet(u[l])){f.next(),c=!0;break}}while(c);var h=[];return u.forEach(function(t){if(t.show){var e=t.getCurrentRect();h.push({text:t.text,x:e.x,y:e.y})}}),{data:h,client:t}}};e.default=o},157:function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=n(50),o=n(159),i={transferCoordinate:function(t,e,n){return t.map(function(t){return[(t[0]-e.x)/n,(e.y-t[1])/n]})},calculatePixel:function(t){var e=t.request.data,n=e.points,r=e.zoomUnit,o=e.nwMc,a=e.isAnimation,u=e.lineOrCurve,c=e.deltaAngle;return a?\"line\"==u?i.setLineCurive(n,r,o,c):\"curve\"==u&&i.setCurive(n,r,o,c):\"curve\"==u?i.setCurive(n,r,o,c):i.transform(n,r,o),t.request.data=n,t},setCurive:function(t,e,n,i){for(var a=0;a<t.length;a++){var u=t[a];u.geometry.medianCoordinates||(u.geometry.medianCoordinates=u.geometry.coordinates.map(function(t){var e=r.geo.projection.lngLatToPoint({lng:t[0],lat:t[1]});return[e.x,e.y]}));for(var c=u.geometry.medianCoordinates,s=[],f=0,l=c.length;f<l-1;f++){var h=c[f],p=c[f+1],d=(h[0]-n.x)/e,y=(n.y-h[1])/e,v=(p[0]-n.x)/e,g=(n.y-p[1])/e,m=u.style&&null!=u.style.deltaAngle?u.style.deltaAngle:i;s=s.concat((0,o.getPointList)([parseInt(d),parseInt(y)],[parseInt(v),parseInt(g)],m)),d=null,y=null,v=null,g=null,h=null,p=null}u.geometry.pixels=s}},setLineCurive:function(t,e,n,i){for(var a=0;a<t.length;a++){var u=t[a];if(!u.geometry.animationCoordinates){var c=u.style&&null!=u.style.deltaAngle?u.style.deltaAngle:i;u.geometry.animationCoordinates=(0,o.lineCurve)(u.geometry.coordinates[0],u.geometry.coordinates[1],c)}u.geometry.animationMedianCoordinates||(u.geometry.animationMedianCoordinates=u.geometry.animationCoordinates.map(function(t){var e=r.geo.projection.lngLatToPoint({lng:t[0],lat:t[1]});return[e.x,e.y]})),u.geometry.pixels=u.geometry.animationMedianCoordinates.map(function(t){var r=(t[0]-n.x)/e,o=(n.y-t[1])/e;return[parseInt(r),parseInt(o)]})}},transform:function(t,e,n){for(var o=0;o<t.length;o++){var i=t[o];i.geometry.medianCoordinates||(i.geometry.medianCoordinates=i.geometry.coordinates.map(function(t){var e=r.geo.projection.lngLatToPoint({lng:t[0],lat:t[1]});return[e.x,e.y]})),i.geometry.pixels=i.geometry.medianCoordinates.map(function(t){var r=(t[0]-n.x)/e,o=(n.y-t[1])/e;return[parseInt(r),parseInt(o)]})}}};e.default=i},158:function(t,e,n){\"use strict\";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){for(var e=t[0][0],n=t[0][1],r=t[0][0],o=t[0][1],i=1;i<t.length;i++)e=Math.min(e,t[i][0]),r=Math.max(r,t[i][0]),n=Math.min(n,t[i][1]),o=Math.max(o,t[i][1]);return{x:e+(r-e)/2,y:n+(o-n)/2}}function i(t,e,n,r,i,u){for(var s=0;s<t.length;s++){for(var l=t[s],h=[],p=0;p<l.length;p++){var d=(0,a.pointToPixelWorker)(new c.default(l[p][0],l[p][1]),e);h.push([d.x,d.y])}n.push(h),i&&0==s&&(\"minMax\"==u?r.push(o(h)):\"cell\"==u&&r.push((0,f.default)([h])))}}Object.defineProperty(e,\"__esModule\",{value:!0});var a=n(50),u=n(160),c=r(u),s=n(161),f=r(s),l={calculatePixel:function(t){var e=t.request.data,n=e.data,r=e.enable,o=e.centerType,a=e.customZoom,u=t.request.map;null!=a&&(u.zoom=a);for(var c=0;c<n.length;c++){var s=n[c].geometry,f=s.type,l=s.coordinates,h=[],p=[];if(\"MultiPolygon\"==f)for(var d=0;d<l.length;d++){var y=[];i(l[d],u,y,p,r,o),h.push(y)}else i(l,u,h,p,r,o);n[c].geometry.pixels=h,n[c].geometry.labelPixels=p}return t.request.data=n,t}};e.default=l},159:function(t,e,n){\"use strict\";function r(t,e,n){var r=a(t,e)/4,o=void 0,i=void 0,u=void 0,c=[t[0],t[1]];if(n=null==n?-.2:n,t[0]!=e[0]&&t[1]!=e[1]){var s=(e[1]-t[1])/(e[0]-t[0]);o=Math.atan(s)}else o=t[0]==e[0]?(t[1]<=e[1]?1:-1)*Math.PI/2:0;return t[0]<=e[0]?(o-=n,i=Math.round(Math.cos(o)*r),u=Math.round(Math.sin(o)*r),c[0]+=i,c[1]+=u):(o+=n,i=Math.round(Math.cos(o)*r),u=Math.round(Math.sin(o)*r),c[0]-=i,c[1]-=u),c}function o(t,e){for(var n=t.length,r=[],o=0,u=1;u<n;u++)o+=a(t[u-1],t[u]);var c=o/2;c=c<n?n:c;for(var s=0;s<c;s++){var f=s/(c-1)*(e?n:n-1),l=Math.floor(f),h=f-l,p=void 0,d=t[l%n],y=void 0,v=void 0;e?(p=t[(l-1+n)%n],y=t[(l+1)%n],v=t[(l+2)%n]):(p=t[0===l?l:l-1],y=t[l>n-2?n-1:l+1],v=t[l>n-3?n-1:l+2]);var g=h*h,m=h*g;r.push([i(p[0],d[0],y[0],v[0],h,g,m),i(p[1],d[1],y[1],v[1],h,g,m)])}return r}function i(t,e,n,r,o,i,a){var u=.5*(n-t),c=.5*(r-e);return(2*(e-n)+u+c)*a+(-3*(e-n)-2*u-c)*i+u*o+e}function a(t,e){return Math.sqrt((t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1]))}function u(t,e,n){for(var r=(e[0]-t[0])/n,o=(e[1]-t[1])/n,i=[],a=0;a<n;a++){var u=t[0]+r*a,c=t[1]+o*a;i.push([u,c])}return i}function c(t,e,n){var i=[[t[0],t[1]],[e[0],e[1]]],a=i[1][0],u=i[1][1];return i[3]=[a,u],i[1]=r(i[0],i[3],n),i[2]=r(i[3],i[0],n),i=o(i,!1),i[i.length-1]=[a,u],i}Object.defineProperty(e,\"__esModule\",{value:!0}),e.lineCurve=u,e.getPointList=c},160:function(t,e,n){\"use strict\";function r(t,e){isNaN(t)&&(t=isNaN(t)?0:t),(0,o.isString)(t)&&(t=parseFloat(t)),isNaN(e)&&(e=isNaN(e)?0:e),(0,o.isString)(e)&&(e=parseFloat(e)),this.lng=t,this.lat=e}Object.defineProperty(e,\"__esModule\",{value:!0});var o=n(5);r.isInRange=function(t){return t&&t.lng<=180&&t.lng>=-180&&t.lat<=74&&t.lat>=-74},r.prototype.equals=function(t){return t&&this.lat==t.lat&&this.lng==t.lng},e.default=r},161:function(t,e,n){\"use strict\";function r(t,e,n,r){this.x=t,this.y=e,this.h=n,this.d=s(t,e),this.max=this.d+this.h*Math.SQRT2}function o(t,e){var n=t.x-e.x,r=t.y-e.y;return n*n+r*r}function i(t,e){return t.x-=e.x,t.y-=e.y,t}function a(t,e){return t.x*=e,t.y*=e,t}function u(t,e){return t.x+=e.x,t.y+=e.y,t}function c(t,e,n){var r=o(n,e);if(0===r)return o(e,t);var c=((t.x-e.x)*(n.x-e.x)+(t.y-e.y)*(n.y-e.y))/r;return c<0?o(e,t):c>1?o(n,t):o(u(a(i(n,e),c),e),t)}function s(t,e){for(var n=!1,r=1/0,o=0;o<e.length;o++)for(var i=e[o],a=0,u=i.length,s=u-1;a<u;s=a++){var f=i[a],l=i[s];f.y>t.y!=l.y>t.y&&t.x<(l.x-f.x)*(t.y-f.y)/(l.y-f.y)+f.x&&(n=!n),r=Math.min(r,c(t,f,l))}return(n?1:-1)*Math.sqrt(r)}function f(t){for(var e=0,n=0,o=0,i=t[0],a=0;a<i.length-1;++a){var u=i[a+1],c=i[a],s=.5*(u[0]*c[1]-c[0]*u[1]),f=(u[0]+c[0])/3,l=(u[1]+c[1])/3;e+=s,n+=s*f,o+=s*l}return new r(n/e,o/e)}function l(t){for(var e=void 0,n=void 0,o=void 0,i=void 0,a=0;a<t[0].length;a++){var u=t[0][a];(!a||u[0]<e)&&(e=u[0]),(!a||u[1]<n)&&(n=u[1]),(!a||u[0]>o)&&(o=u[0]),(!a||u[1]>i)&&(i=u[1])}if(e==o||n==i)return null;for(var c=o-e,s=i-n,l=Math.min(c,s),h=l/2,d=new p.default(null,function(t,e){return e.max-t.max}),y=e;y<o;y+=l)for(var v=n;v<i;v+=l)d.push(new r(y+h,v+h,h,t));for(var g=f(t);d.length;){var m=d.pop();m.d>g.d&&(g=m),m.max<=g.d||(h=m.h/2,d.push(new r(m.x-h,m.y-h,h,t)),d.push(new r(m.x+h,m.y-h,h,t)),d.push(new r(m.x-h,m.y+h,h,t)),d.push(new r(m.x+h,m.y+h,h,t)))}return{x:g.x,y:g.y}}Object.defineProperty(e,\"__esModule\",{value:!0}),e.default=l;var h=n(179),p=function(t){return t&&t.__esModule?t:{default:t}}(h)},179:function(t,e,n){\"use strict\";function r(t,e){if(!(this instanceof r))return new r(t,e);if(this.data=t||[],this.length=this.data.length,this.compare=e||o,this.length>0)for(var n=this.length>>1;n>=0;n--)this._down(n)}function o(t,e){return t<e?-1:t>e?1:0}Object.defineProperty(e,\"__esModule\",{value:!0}),e.default=r,r.prototype={push:function(t){this.data.push(t),this.length++,this._up(this.length-1)},pop:function(){if(0!==this.length){var t=this.data[0];return this.length--,this.length>0&&(this.data[0]=this.data[this.length],this._down(0)),this.data.pop(),t}},peek:function(){return this.data[0]},_up:function(t){for(var e=this.data,n=this.compare,r=e[t];t>0;){var o=t-1>>1,i=e[o];if(n(r,i)>=0)break;e[t]=i,t=o}e[t]=r},_down:function(t){for(var e=this.data,n=this.compare,r=this.length>>1,o=e[t];t<r;){var i=1+(t<<1),a=i+1,u=e[i];if(a<this.length&&n(e[a],u)<0&&(i=a,u=e[a]),n(u,o)>=0)break;e[t]=u,t=i}e[t]=o}}},188:function(t,e,n){\"use strict\";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,\"__esModule\",{value:!0}),e.TDpost=void 0;var o=n(154),i=r(o),a=n(153),u=r(a),c=n(158),s=r(c),f=n(157),l=r(f),h=n(155),p=r(h),d=n(156),y=r(d),v={HeatOverlay:i.default,GriddingOverlay:u.default,PolygonOverlay:s.default,LineStringOverlay:l.default,HoneycombOverlay:p.default,LabelEvading:y.default};onmessage=function(t){var e=t.data;m(e)};var g={},m=function(t){for(var e=t.request,n=e.classPath,r=e.hashCode,o=e.msgId,i=n.split(\".\"),a=0,u=v;i[a];){if(u=u[i[a]],++a>=i.length){g[n]=r+\"_\"+o;var c=u(t);x(c)}if(!u)throw new TypeError(\"inMap : \"+i[a-1]+\" worker \"+n+\" is not a function\")}},x=e.TDpost=function(t){var e=t.request,n=e.classPath,r=e.hashCode,o=e.msgId,i=v[n];i&&i!=r+\"_\"+o||(postMessage(t),t.request.data=[],t=null)}},395:function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,\"loaded\",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,\"id\",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},5:function(t,e,n){\"use strict\";function r(t){var e=Object.prototype.toString;return{\"[object Boolean]\":\"boolean\",\"[object Number]\":\"number\",\"[object String]\":\"string\",\"[object Function]\":\"function\",\"[object Array]\":\"array\",\"[object Date]\":\"date\",\"[object RegExp]\":\"regExp\",\"[object Undefined]\":\"undefined\",\"[object Null]\":\"null\",\"[object Object]\":\"object\"}[e.call(t)]}function o(t){return\"number\"==r(t)}function i(t){return\"boolean\"==r(t)}function a(t){return\"function\"==r(t)}function u(t){return\"string\"==r(t)}function c(t){return\"object\"==r(t)}function s(t){return\"array\"==r(t)}function f(t){var e=window.devicePixelRatio;t.canvas.width=t.canvas.width*e,t.canvas.height=t.canvas.height*e,t.canvas.style.width=t.canvas.width/e+\"px\",t.canvas.style.height=t.canvas.height/e+\"px\",t.scale(e,e)}function l(t){return String(t).replace(/&/g,\"&amp;\").replace(/</g,\"&lt;\").replace(/>/g,\"&gt;\").replace(/\"/g,\"&quot;\").replace(/\'/g,\"&#39;\")}function h(t,e,n,r){for(var o=!1,i=90,a=-90,u=180,c=-180,s=0;s<e.length;s++)e[s]>a&&(a=e[s]),e[s]<i&&(i=e[s]),t[s]>c&&(c=t[s]),t[s]<u&&(u=t[s]);if(!(n<i||n>a||r<u||r>c))for(var f=0;f<e.length;f++){var l=(f+1)%e.length;e[f]<n!=e[l]<n&&r<(t[l]-t[f])*(n-e[f])/(e[l]-e[f])+t[f]&&(o=!o)}return o}function p(t,e,n){for(var r=[],o=[],i=0,a=n.length;i<a;i++)r.push(parseFloat(n[i][1])),o.push(parseFloat(n[i][0]));return h(r,o,t,e)}function d(){return!!(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))}function y(){var t=Array.prototype.slice.call(arguments);return O.default.all(t,{arrayMerge:function(t,e){return e||[]}})}function v(t,e){Array.isArray(e)?(t.splice(0,t.length),e.forEach(function(e){t.push(e)})):null!=e?t.splice(0,t.length,e):t.splice(0,t.length)}function g(t,e,n){var o=r(t.name),i=r(t.count),a=r(t.geometry);if(e){if(\"null\"==o||\"undefined\"==o)return\"The property name cannot be null!\";if(\"string\"!==o)return\"The property name must be of type String!\"}if(n){if(\"null\"==i||\"undefined\"==i)return\"The property count cannot be null!\";if(\"string\"==i&&\"number\"!==r(parseFloat(t.count)))return\"The property count must be of type Number!\"}return\"null\"==a||\"undefined\"==a?\"The property geometry cannot be null!\":\"string\"!==r(t.geometry.type)?\"The property geometry.type must be of type String!\":s(t.geometry.coordinates)?void 0:\"The property geometry.coordinates must be of type Array!\"}function m(t,e,n){if(t){if(!s(t))throw new TypeError(\"inMap: data must be is Array<GEOJSON>\");for(var r=0,o=t.length;r<o;r++){var i=g(t[r],e,n);if(i)throw new TypeError(\"inMap: data index Line \"+r+\", \"+i+\" about geoJSON, visit http://inmap.talkingdata.com/#/docs/v2/Geojson\")}}}function x(t){if(0==t.length)return[];for(var e=t[0][0],n=t[0][1],r=t[0][0],o=t[0][1],i=1;i<t.length;i++)e=Math.min(e,t[i][0]),r=Math.max(r,t[i][0]),n=Math.min(n,t[i][1]),o=Math.max(o,t[i][1]);return[[e,n],[r,n],[r,o],[e,o]]}function b(){return x((arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).map(function(t){return t.geometry.coordinates}))}function _(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=[];return t.forEach(function(t){e=e.concat(t.geometry.coordinates)}),x(e)}function M(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=[],n=0;n<t.length;n++){var r=t[n].geometry,o=r.type,i=r.coordinates;if(\"MultiPolygon\"==o)for(var a=0;a<i.length;a++)e=e.concat(i[a][0]);else{var u=r.coordinates;e=e.concat(u[0])}}return x(e)}Object.defineProperty(e,\"__esModule\",{value:!0}),e.chunk=e.extend=e.isPromiseLike=e.isEmpty=void 0;var P=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t};e.typeOf=r,e.isNumber=o,e.isBoolean=i,e.isFunction=a,e.isString=u,e.isObject=c,e.isArray=s,e.setDevicePixelRatio=f,e.encodeHTML=l,e.isPolyContains=h,e.isPolyContainsPt=p,e.detection=d,e.merge=y,e.clearPushArray=v,e.checkType=g,e.checkGeoJSON=m,e.rectangleLngLats=x,e.geoJsonPointRectangle=b,e.geoJsonLineStringRectangle=_,e.geoJsonPolygonRectangle=M;var w=n(97),O=function(t){return t&&t.__esModule?t:{default:t}}(w);e.isEmpty=function(t){return null==t||!(Object.keys(t)||t).length},e.isPromiseLike=function(t){return null!==t&&(\"object\"===(void 0===t?\"undefined\":P(t))||\"function\"==typeof t)&&\"function\"==typeof t.then},e.extend=function(t,e){if(t&&e&&c(e)){for(var n in e)t[n]=e[n];for(var r,o=[\"constructor\",\"hasOwnProperty\",\"isPrototypeOf\",\"propertyIsEnumerable\",\"toLocaleString\",\"toString\",\"valueOf\"],i=0;i<o.length;i++)r=o[i],Object.prototype.constructor.call(e,r)&&(t[r]=e[r])}return t},e.chunk=function(t,e){return Array.from({length:Math.ceil(t.length/e)},function(n,r){return t.slice(r*e,r*e+e)})}},50:function(t,e,n){\"use strict\";(function(t){var n,r,o,i=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t};!function(a,u){\"object\"==i(e)&&\"object\"==i(t)?t.exports=u():(r=[],n=u,void 0!==(o=\"function\"==typeof n?n.apply(e,r):n)&&(t.exports=o))}(0,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,\"a\",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p=\"\",e(e.s=47)}([function(t,e){var n=t.exports={version:\"2.5.1\"};\"number\"==typeof __e&&(__e=n)},function(t,e){var n=t.exports=\"undefined\"!=typeof window&&window.Math==Math?window:\"undefined\"!=typeof self&&self.Math==Math?self:Function(\"return this\")();\"number\"==typeof __g&&(__g=n)},function(t,e,n){t.exports=!n(10)(function(){return 7!=Object.defineProperty({},\"a\",{get:function(){return 7}}).a})},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(9),o=n(34),i=n(27),a=Object.defineProperty;e.f=n(2)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return a(t,e,n)}catch(t){}if(\"get\"in n||\"set\"in n)throw TypeError(\"Accessors not supported!\");return\"value\"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(1),o=n(0),i=n(32),a=n(6),u=function t(e,n,u){var c,s,f,l=e&t.F,h=e&t.G,p=e&t.S,d=e&t.P,y=e&t.B,v=e&t.W,g=h?o:o[n]||(o[n]={}),m=g.prototype,x=h?r:p?r[n]:(r[n]||{}).prototype;h&&(u=n);for(c in u)(s=!l&&x&&void 0!==x[c])&&c in g||(f=s?x[c]:u[c],g[c]=h&&\"function\"!=typeof x[c]?u[c]:y&&s?i(f,r):v&&x[c]==f?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(f):d&&\"function\"==typeof f?i(Function.call,f):f,d&&((g.virtual||(g.virtual={}))[c]=f,e&t.R&&m&&!m[c]&&a(m,c,f)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},function(t,e,n){var r=n(4),o=n(12);t.exports=n(2)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(67),o=n(16);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(25)(\"wks\"),o=n(13),i=n(1).Symbol,a=\"function\"==typeof i;(t.exports=function(t){return r[t]||(r[t]=a&&i[t]||(a?i:o)(\"Symbol.\"+t))}).store=r},function(t,e,n){var r=n(11);t.exports=function(t){if(!r(t))throw TypeError(t+\" is not an object!\");return t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){t.exports=function(t){return\"object\"==(void 0===t?\"undefined\":i(t))?null!==t:\"function\"==typeof t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return\"Symbol(\".concat(void 0===t?\"\":t,\")_\",(++n+r).toString(36))}},function(t,e,n){e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError(\"Cannot call a class as a function\")}},function(t,e,n){e.__esModule=!0;var r=n(49),o=function(t){return t&&t.__esModule?t:{default:t}}(r);e.default=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,\"value\"in r&&(r.writable=!0),(0,o.default)(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}()},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError(\"Can\'t call method on  \"+t);return t}},function(t,e){t.exports=\"constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf\".split(\",\")},function(t,e){t.exports={}},function(t,e){t.exports=!0},function(t,e,n){var r=n(9),o=n(72),i=n(17),a=n(24)(\"IE_PROTO\"),u=function(){},c=function(){var t,e=n(33)(\"iframe\"),r=i.length;for(e.style.display=\"none\",n(66).appendChild(e),e.src=\"javascript:\",t=e.contentWindow.document,t.open(),t.write(\"<script>document.F=Object<\/script>\"),t.close(),c=t.F;r--;)delete c.prototype[i[r]];return c()};t.exports=Object.create||function(t,e){var n;return null!==t?(u.prototype=r(t),n=new u,u.prototype=null,n[a]=t):n=c(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(40),o=n(17);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(4).f,o=n(3),i=n(8)(\"toStringTag\");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(25)(\"keys\"),o=n(13);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(1),o=r[\"__core-js_shared__\"]||(r[\"__core-js_shared__\"]={});t.exports=function(t){return o[t]||(o[t]={})}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(11);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&\"function\"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if(\"function\"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&\"function\"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError(\"Can\'t convert object to primitive value\")}},function(t,e,n){var r=n(1),o=n(0),i=n(19),a=n(29),u=n(4).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});\"_\"==t.charAt(0)||t in e||u(e,t,{value:a.f(t)})}},function(t,e,n){e.f=n(8)},function(t,e,n){function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n(53),a=r(o),u=n(52),c=r(u),s=\"function\"==typeof c.default&&\"symbol\"==i(a.default)?function(t){return void 0===t?\"undefined\":i(t)}:function(t){return t&&\"function\"==typeof c.default&&t.constructor===c.default&&t!==c.default.prototype?\"symbol\":void 0===t?\"undefined\":i(t)};e.default=\"function\"==typeof c.default&&\"symbol\"===s(a.default)?function(t){return void 0===t?\"undefined\":s(t)}:function(t){return t&&\"function\"==typeof c.default&&t.constructor===c.default&&t!==c.default.prototype?\"symbol\":void 0===t?\"undefined\":s(t)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(62);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(11),o=n(1).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){t.exports=!n(2)&&!n(10)(function(){return 7!=Object.defineProperty(n(33)(\"div\"),\"a\",{get:function(){return 7}}).a})},function(t,e,n){var r=n(19),o=n(5),i=n(41),a=n(6),u=n(3),c=n(18),s=n(69),f=n(23),l=n(39),h=n(8)(\"iterator\"),p=!([].keys&&\"next\"in[].keys()),d=function(){return this};t.exports=function(t,e,n,y,v,g,m){s(n,e,y);var x,b,_,M=function(t){if(!p&&t in j)return j[t];switch(t){case\"keys\":case\"values\":return function(){return new n(this,t)}}return function(){return new n(this,t)}},P=e+\" Iterator\",w=\"values\"==v,O=!1,j=t.prototype,L=j[h]||j[\"@@iterator\"]||v&&j[v],S=L||M(v),T=v?w?M(\"entries\"):S:void 0,k=\"Array\"==e?j.entries||L:L;if(k&&(_=l(k.call(new t)))!==Object.prototype&&_.next&&(f(_,P,!0),r||u(_,h)||a(_,h,d)),w&&L&&\"values\"!==L.name&&(O=!0,S=function(){return L.call(this)}),r&&!m||!p&&!O&&j[h]||a(j,h,S),c[e]=S,c[P]=d,v)if(x={values:w?S:M(\"values\"),keys:g?S:M(\"keys\"),entries:T},m)for(b in x)b in j||i(j,b,x[b]);else o(o.P+o.F*(p||O),e,x);return x}},function(t,e,n){var r=n(22),o=n(12),i=n(7),a=n(27),u=n(3),c=n(34),s=Object.getOwnPropertyDescriptor;e.f=n(2)?s:function(t,e){if(t=i(t),e=a(e,!0),c)try{return s(t,e)}catch(t){}if(u(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){var r=n(40),o=n(17).concat(\"length\",\"prototype\");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(3),o=n(42),i=n(24)(\"IE_PROTO\"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:\"function\"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},function(t,e,n){var r=n(3),o=n(7),i=n(64)(!1),a=n(24)(\"IE_PROTO\");t.exports=function(t,e){var n,u=o(t),c=0,s=[];for(n in u)n!=a&&r(u,n)&&s.push(n);for(;e.length>c;)r(u,n=e[c++])&&(~i(s,n)||s.push(n));return s}},function(t,e,n){t.exports=n(6)},function(t,e,n){var r=n(16);t.exports=function(t){return Object(r(t))}},function(t,e,n){function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,\"__esModule\",{value:!0}),e.MercatorProjection=void 0;var o=n(50),i=r(o),a=n(14),u=r(a),c=n(15),s=r(c),f=n(55),l=r(f),h=n(54),p=r(h),d=n(46),y=n(45),v=n(44);e.MercatorProjection=function(t){function e(){(0,u.default)(this,e);var t=(0,l.default)(this,(e.__proto__||(0,i.default)(e)).call(this));return t.EARTHRADIUS=6370996.81,t.MCBAND=[12890594.86,8362377.87,5591021,3481989.83,1678043.12,0],t.LLBAND=[75,60,45,30,15,0],t.MC2LL=[[1.410526172116255e-8,898305509648872e-20,-1.9939833816331,200.9824383106796,-187.2403703815547,91.6087516669843,-23.38765649603339,2.57121317296198,-.03801003308653,17337981.2],[-7.435856389565537e-9,8983055097726239e-21,-.78625201886289,96.32687599759846,-1.85204757529826,-59.36935905485877,47.40033549296737,-16.50741931063887,2.28786674699375,10260144.86],[-3.030883460898826e-8,898305509983578e-20,.30071316287616,59.74293618442277,7.357984074871,-25.38371002664745,13.45380521110908,-3.29883767235584,.32710905363475,6856817.37],[-1.981981304930552e-8,8983055099779535e-21,.03278182852591,40.31678527705744,.65659298677277,-4.44255534477492,.85341911805263,.12923347998204,-.04625736007561,4482777.06],[3.09191371068437e-9,8983055096812155e-21,6995724062e-14,23.10934304144901,-.00023663490511,-.6321817810242,-.00663494467273,.03430082397953,-.00466043876332,2555164.4],[2.890871144776878e-9,8983055095805407e-21,-3.068298e-8,7.47137025468032,-353937994e-14,-.02145144861037,-1234426596e-14,.00010322952773,-323890364e-14,826088.5]],t.LL2MC=[[-.0015702102444,111320.7020616939,0x60e374c3105a3,-0x24bb4115e2e164,0x5cc55543bb0ae8,-0x7ce070193f3784,0x5e7ca61ddf8150,-0x261a578d8b24d0,0x665d60f3742ca,82.5],[.0008277824516172526,111320.7020463578,647795574.6671607,-4082003173.641316,10774905663.51142,-15171875531.51559,12053065338.62167,-5124939663.577472,913311935.9512032,67.5],[.00337398766765,111320.7020202162,4481351.045890365,-23393751.19931662,79682215.47186455,-115964993.2797253,97236711.15602145,-43661946.33752821,8477230.501135234,52.5],[.00220636496208,111320.7020209128,51751.86112841131,3796837.749470245,992013.7397791013,-1221952.21711287,1340652.697009075,-620943.6990984312,144416.9293806241,37.5],[-.0003441963504368392,111320.7020576856,278.2353980772752,2485758.690035394,6070.750963243378,54821.18345352118,9540.606633304236,-2710.55326746645,1405.483844121726,22.5],[-.0003218135878613132,111320.7020701615,.00369383431289,823725.6402795718,.46104986909093,2351.343141331292,1.58060784298199,8.77738589078284,.37238884252424,7.45]],t}return(0,p.default)(e,t),(0,s.default)(e,[{key:\"getDistanceByMC\",value:function(t,e){if(!t||!e)return 0;var n,r,o,i;return(t=this.convertMC2LL(t))?(n=this.toRadians(t.lng),r=this.toRadians(t.lat),(e=this.convertMC2LL(e))?(o=this.toRadians(e.lng),i=this.toRadians(e.lat),this.getDistance(n,o,r,i)):0):0}},{key:\"getDistanceByLL\",value:function(t,e){if(!t||!e)return 0;t.lng=this.getLoop(t.lng,-180,180),t.lat=this.getRange(t.lat,-74,74),e.lng=this.getLoop(e.lng,-180,180),e.lat=this.getRange(e.lat,-74,74);var n,r,o,i;return n=this.toRadians(t.lng),o=this.toRadians(t.lat),r=this.toRadians(e.lng),i=this.toRadians(e.lat),this.getDistance(n,r,o,i)}},{key:\"convertMC2LL\",value:function(t){var e,n;e=new y.Point(Math.abs(t.lng),Math.abs(t.lat));for(var r=0;r<this.MCBAND.length;r++)if(e.lat>=this.MCBAND[r]){n=this.MC2LL[r];break}var o=this.convertor(t,n);return new y.Point(o.lng.toFixed(6),o.lat.toFixed(6))}},{key:\"convertLL2MC\",value:function(t){var e,n;t.lng=this.getLoop(t.lng,-180,180),t.lat=this.getRange(t.lat,-74,74),e=new y.Point(t.lng,t.lat);for(var r=0;r<this.LLBAND.length;r++)if(e.lat>=this.LLBAND[r]){n=this.LL2MC[r];break}if(!n)for(var o=this.LLBAND.length-1;o>=0;o--)if(e.lat<=-this.LLBAND[o]){n=this.LL2MC[o];break}var i=this.convertor(t,n);return new y.Point(i.lng.toFixed(2),i.lat.toFixed(2))}},{key:\"convertor\",value:function(t,e){if(t&&e){var n=e[0]+e[1]*Math.abs(t.lng),r=Math.abs(t.lat)/e[9],o=e[2]+e[3]*r+e[4]*r*r+e[5]*r*r*r+e[6]*r*r*r*r+e[7]*r*r*r*r*r+e[8]*r*r*r*r*r*r;return n*=t.lng<0?-1:1,o*=t.lat<0?-1:1,new y.Point(n,o)}}},{key:\"getDistance\",value:function(t,e,n,r){return this.EARTHRADIUS*Math.acos(Math.sin(n)*Math.sin(r)+Math.cos(n)*Math.cos(r)*Math.cos(e-t))}},{key:\"toRadians\",value:function(t){return Math.PI*t/180}},{key:\"toDegrees\",value:function(t){return 180*t/Math.PI}},{key:\"getRange\",value:function(t,e,n){return null!=e&&(t=Math.max(t,e)),null!=n&&(t=Math.min(t,n)),t}},{key:\"getLoop\",value:function(t,e,n){for(;t>n;)t-=n-e;for(;t<e;)t+=n-e;return t}},{key:\"lngLatToMercator\",value:function(t){return this.convertLL2MC(t)}},{key:\"lngLatToPoint\",value:function(t){var e=this.convertLL2MC(t);return new v.Pixel(e.lng,e.lat)}},{key:\"mercatorToLngLat\",value:function(t){return this.convertMC2LL(t)}},{key:\"pointToLngLat\",value:function(t){var e=new y.Point(t.x,t.y);return this.convertMC2LL(e)}},{key:\"pointToPixel\",value:function(t,e,n,r,o){if(t){t=this.lngLatToMercator(t,o),n=this.lngLatToMercator(n);var i=this.getZoomUnits(e),a=Math.round((t.lng-n.lng)/i+r.width/2),u=Math.round((n.lat-t.lat)/i+r.height/2);return new v.Pixel(a,u)}}},{key:\"pixelToPoint\",value:function(t,e,n,r,o){if(t){var i=this.getZoomUnits(e),a=n.lng+i*(t.x-r.width/2),u=n.lat-i*(t.y-r.height/2),c=new y.Point(a,u);return this.mercatorToLngLat(c,o)}}},{key:\"getZoomUnits\",value:function(t){return Math.pow(2,18-t)}}]),e}(d.Projection)},function(t,e,n){function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,\"__esModule\",{value:!0}),e.Pixel=void 0;var o=n(14),i=r(o),a=n(15),u=r(a);e.Pixel=function(){function t(e,n){(0,i.default)(this,t),this.x=e||0,this.y=n||0}return(0,u.default)(t,[{key:\"Pixel\",value:function(t){return t&&t.x==this.x&&t.y==this.y}}]),t}()},function(t,e,n){function r(t){return\"string\"==typeof t}function o(t,e){isNaN(t)&&(t=isNaN(t)?0:t),r(t)&&(t=parseFloat(t)),isNaN(e)&&(e=isNaN(e)?0:e),r(e)&&(e=parseFloat(e)),this.lng=t,this.lat=e}Object.defineProperty(e,\"__esModule\",{value:!0}),e.isString=r,e.Point=o,o.isInRange=function(t){return t&&t.lng<=180&&t.lng>=-180&&t.lat<=74&&t.lat>=-74},o.prototype.equals=function(t){return t&&this.lat==t.lat&&this.lng==t.lng},e.default=o},function(t,e,n){function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,\"__esModule\",{value:!0}),e.Projection=void 0;var o=n(14),i=r(o),a=n(15),u=r(a);e.Projection=function(){function t(){(0,i.default)(this,t)}return(0,u.default)(t,[{key:\"lngLatToPoint\",value:function(){throw\"lngLatToPoint方法未实现\"}},{key:\"pointToLngLat\",value:function(){throw\"pointToLngLat方法未实现\"}}]),t}()},function(t,e,n){function r(t){return\"[object Array]\"==Object.prototype.toString.call(t)}function o(t,e){var n=e.getZoom(),r=e.getCenter(),o=e.getSize();return s.pointToPixel(t,n,r,o)}function i(t,e){var n=t;t=r(n)?n:n.request.data,e=e||n.request.map;for(var i=[],a=0,u=t.length;a<u;a++)i.push(o(t[a],e));return i}function a(t,e){var n=e.zoom,r=e.center,o=e.size;return s.pointToPixel(t,n,r,o)}function u(t,e){var n=t;t=r(n)?n:n.request.data,e=e||n.request.map;for(var o=[],i=0,u=t.length;i<u;i++)o.push(a(t[i],e));return o}Object.defineProperty(e,\"__esModule\",{value:!0}),e.geo=void 0,e.pointToPixel=o,e.pointsToPixels=i,e.pointToPixelWorker=a,e.pointsToPixelsWoker=u;var c=n(43),s=e.geo={pointToPixel:function(t,e,n,r){return this.projection.pointToPixel(t,e,n,r)},lngLatToMercator:function(t){return this.projection.convertLL2MC(t)},projection:new c.MercatorProjection}},function(t,e,n){t.exports={default:n(56),__esModule:!0}},function(t,e,n){t.exports={default:n(57),__esModule:!0}},function(t,e,n){t.exports={default:n(58),__esModule:!0}},function(t,e,n){t.exports={default:n(59),__esModule:!0}},function(t,e,n){t.exports={default:n(60),__esModule:!0}},function(t,e,n){t.exports={default:n(61),__esModule:!0}},function(t,e,n){function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n(51),i=r(o),a=n(48),u=r(a),c=n(30),s=r(c);e.default=function(t,e){if(\"function\"!=typeof e&&null!==e)throw new TypeError(\"Super expression must either be null or a function, not \"+(void 0===e?\"undefined\":(0,s.default)(e)));t.prototype=(0,u.default)(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(i.default?(0,i.default)(t,e):t.__proto__=e)}},function(t,e,n){e.__esModule=!0;var r=n(30),o=function(t){return t&&t.__esModule?t:{default:t}}(r);e.default=function(t,e){if(!t)throw new ReferenceError(\"this hasn\'t been initialised - super() hasn\'t been called\");return!e||\"object\"!==(void 0===e?\"undefined\":(0,o.default)(e))&&\"function\"!=typeof e?t:e}},function(t,e,n){n(80);var r=n(0).Object;t.exports=function(t,e){return r.create(t,e)}},function(t,e,n){n(81);var r=n(0).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){n(82),t.exports=n(0).Object.getPrototypeOf},function(t,e,n){n(83),t.exports=n(0).Object.setPrototypeOf},function(t,e,n){n(86),n(84),n(87),n(88),t.exports=n(0).Symbol},function(t,e,n){n(85),n(89),t.exports=n(29).f(\"iterator\")},function(t,e){t.exports=function(t){if(\"function\"!=typeof t)throw TypeError(t+\" is not a function!\");return t}},function(t,e){t.exports=function(){}},function(t,e,n){var r=n(7),o=n(78),i=n(77);t.exports=function(t){return function(e,n,a){var u,c=r(e),s=o(c.length),f=i(a,s);if(t&&n!=n){for(;s>f;)if((u=c[f++])!=u)return!0}else for(;s>f;f++)if((t||f in c)&&c[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(21),o=n(38),i=n(22);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var a,u=n(t),c=i.f,s=0;u.length>s;)c.call(t,a=u[s++])&&e.push(a);return e}},function(t,e,n){var r=n(1).document;t.exports=r&&r.documentElement},function(t,e,n){var r=n(31);t.exports=Object(\"z\").propertyIsEnumerable(0)?Object:function(t){return\"String\"==r(t)?t.split(\"\"):Object(t)}},function(t,e,n){var r=n(31);t.exports=Array.isArray||function(t){return\"Array\"==r(t)}},function(t,e,n){var r=n(20),o=n(12),i=n(23),a={};n(6)(a,n(8)(\"iterator\"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(a,{next:o(1,n)}),i(t,e+\" Iterator\")}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var r=n(13)(\"meta\"),o=n(11),a=n(3),u=n(4).f,c=0,s=Object.isExtensible||function(){return!0},f=!n(10)(function(){return s(Object.preventExtensions({}))}),l=function(t){u(t,r,{value:{i:\"O\"+ ++c,w:{}}})},h=function(t,e){if(!o(t))return\"symbol\"==(void 0===t?\"undefined\":i(t))?t:(\"string\"==typeof t?\"S\":\"P\")+t;if(!a(t,r)){if(!s(t))return\"F\";if(!e)return\"E\";l(t)}return t[r].i},p=function(t,e){if(!a(t,r)){if(!s(t))return!0;if(!e)return!1;l(t)}return t[r].w},d=function(t){return f&&y.NEED&&s(t)&&!a(t,r)&&l(t),t},y=t.exports={KEY:r,NEED:!1,fastKey:h,getWeak:p,onFreeze:d}},function(t,e,n){var r=n(4),o=n(9),i=n(21);t.exports=n(2)?Object.defineProperties:function(t,e){o(t);for(var n,a=i(e),u=a.length,c=0;u>c;)r.f(t,n=a[c++],e[n]);return t}},function(t,e,n){var r=n(7),o=n(37).f,a={}.toString,u=\"object\"==(\"undefined\"==typeof window?\"undefined\":i(window))&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return o(t)}catch(t){return u.slice()}};t.exports.f=function(t){return u&&\"[object Window]\"==a.call(t)?c(t):o(r(t))}},function(t,e,n){var r=n(5),o=n(0),i=n(10);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],a={};a[t]=e(n),r(r.S+r.F*i(function(){n(1)}),\"Object\",a)}},function(t,e,n){var r=n(11),o=n(9),i=function(t,e){if(o(t),!r(e)&&null!==e)throw TypeError(e+\": can\'t set as prototype!\")};t.exports={set:Object.setPrototypeOf||(\"__proto__\"in{}?function(t,e,r){try{r=n(32)(Function.call,n(36).f(Object.prototype,\"__proto__\").set,2),r(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return i(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):void 0),check:i}},function(t,e,n){var r=n(26),o=n(16);t.exports=function(t){return function(e,n){var i,a,u=String(o(e)),c=r(n),s=u.length;return c<0||c>=s?t?\"\":void 0:(i=u.charCodeAt(c),i<55296||i>56319||c+1===s||(a=u.charCodeAt(c+1))<56320||a>57343?t?u.charAt(c):i:t?u.slice(c,c+2):a-56320+(i-55296<<10)+65536)}}},function(t,e,n){var r=n(26),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(26),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(63),o=n(70),i=n(18),a=n(7);t.exports=n(35)(Array,\"Array\",function(t,e){this._t=a(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):\"keys\"==e?o(0,n):\"values\"==e?o(0,t[n]):o(0,[n,t[n]])},\"values\"),i.Arguments=i.Array,r(\"keys\"),r(\"values\"),r(\"entries\")},function(t,e,n){var r=n(5);r(r.S,\"Object\",{create:n(20)})},function(t,e,n){var r=n(5);r(r.S+r.F*!n(2),\"Object\",{defineProperty:n(4).f})},function(t,e,n){var r=n(42),o=n(39);n(74)(\"getPrototypeOf\",function(){return function(t){return o(r(t))}})},function(t,e,n){var r=n(5);r(r.S,\"Object\",{setPrototypeOf:n(75).set})},function(t,e){},function(t,e,n){var r=n(76)(!0);n(35)(String,\"String\",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(1),o=n(3),a=n(2),u=n(5),c=n(41),s=n(71).KEY,f=n(10),l=n(25),h=n(23),p=n(13),d=n(8),y=n(29),v=n(28),g=n(65),m=n(68),x=n(9),b=n(7),_=n(27),M=n(12),P=n(20),w=n(73),O=n(36),j=n(4),L=n(21),S=O.f,T=j.f,k=w.f,A=r.Symbol,R=r.JSON,C=R&&R.stringify,E=d(\"_hidden\"),I=d(\"toPrimitive\"),N={}.propertyIsEnumerable,F=l(\"symbol-registry\"),D=l(\"symbols\"),q=l(\"op-symbols\"),G=Object.prototype,B=\"function\"==typeof A,Y=r.QObject,X=!Y||!Y.prototype||!Y.prototype.findChild,W=a&&f(function(){return 7!=P(T({},\"a\",{get:function(){return T(this,\"a\",{value:7}).a}})).a})?function(t,e,n){var r=S(G,e);r&&delete G[e],T(t,e,n),r&&t!==G&&T(G,e,r)}:T,z=function(t){var e=D[t]=P(A.prototype);return e._k=t,e},J=B&&\"symbol\"==i(A.iterator)?function(t){return\"symbol\"==(void 0===t?\"undefined\":i(t))}:function(t){return t instanceof A},U=function t(e,n,r){return e===G&&t(q,n,r),x(e),n=_(n,!0),x(r),o(D,n)?(r.enumerable?(o(e,E)&&e[E][n]&&(e[E][n]=!1),r=P(r,{enumerable:M(0,!1)})):(o(e,E)||T(e,E,M(1,{})),e[E][n]=!0),W(e,n,r)):T(e,n,r)},H=function(t,e){x(t);for(var n,r=g(e=b(e)),o=0,i=r.length;i>o;)U(t,n=r[o++],e[n]);return t},V=function(t,e){return void 0===e?P(t):H(P(t),e)},Z=function(t){var e=N.call(this,t=_(t,!0));return!(this===G&&o(D,t)&&!o(q,t))&&(!(e||!o(this,t)||!o(D,t)||o(this,E)&&this[E][t])||e)},K=function(t,e){if(t=b(t),e=_(e,!0),t!==G||!o(D,e)||o(q,e)){var n=S(t,e);return!n||!o(D,e)||o(t,E)&&t[E][e]||(n.enumerable=!0),n}},Q=function(t){for(var e,n=k(b(t)),r=[],i=0;n.length>i;)o(D,e=n[i++])||e==E||e==s||r.push(e);return r},$=function(t){for(var e,n=t===G,r=k(n?q:b(t)),i=[],a=0;r.length>a;)!o(D,e=r[a++])||n&&!o(G,e)||i.push(D[e]);return i};B||(A=function(){if(this instanceof A)throw TypeError(\"Symbol is not a constructor!\");var t=p(arguments.length>0?arguments[0]:void 0),e=function e(n){this===G&&e.call(q,n),o(this,E)&&o(this[E],t)&&(this[E][t]=!1),W(this,t,M(1,n))};return a&&X&&W(G,t,{configurable:!0,set:e}),z(t)},c(A.prototype,\"toString\",function(){return this._k}),O.f=K,j.f=U,n(37).f=w.f=Q,n(22).f=Z,n(38).f=$,a&&!n(19)&&c(G,\"propertyIsEnumerable\",Z,!0),y.f=function(t){return z(d(t))}),u(u.G+u.W+u.F*!B,{Symbol:A});for(var tt=\"hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables\".split(\",\"),et=0;tt.length>et;)d(tt[et++]);for(var nt=L(d.store),rt=0;nt.length>rt;)v(nt[rt++]);u(u.S+u.F*!B,\"Symbol\",{for:function(t){return o(F,t+=\"\")?F[t]:F[t]=A(t)},keyFor:function(t){if(!J(t))throw TypeError(t+\" is not a symbol!\");for(var e in F)if(F[e]===t)return e},useSetter:function(){X=!0},useSimple:function(){X=!1}}),u(u.S+u.F*!B,\"Object\",{create:V,defineProperty:U,defineProperties:H,getOwnPropertyDescriptor:K,getOwnPropertyNames:Q,getOwnPropertySymbols:$}),R&&u(u.S+u.F*(!B||f(function(){var t=A();return\"[null]\"!=C([t])||\"{}\"!=C({a:t})||\"{}\"!=C(Object(t))})),\"JSON\",{stringify:function(t){if(void 0!==t&&!J(t)){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);return e=r[1],\"function\"==typeof e&&(n=e),!n&&m(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!J(e))return e}),r[1]=e,C.apply(R,r)}}}),A.prototype[I]||n(6)(A.prototype,I,A.prototype.valueOf),h(A,\"Symbol\"),h(Math,\"Math\",!0),h(r.JSON,\"JSON\",!0)},function(t,e,n){n(28)(\"asyncIterator\")},function(t,e,n){n(28)(\"observable\")},function(t,e,n){n(79);for(var r=n(1),o=n(6),i=n(18),a=n(8)(\"toStringTag\"),u=\"CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList\".split(\",\"),c=0;c<u.length;c++){var s=u[c],f=r[s],l=f&&f.prototype;l&&!l[a]&&o(l,a,s),i[s]=i.Array}}])})}).call(e,n(395)(t))},69:function(t,e,n){\"use strict\";function r(t,e){if(!(t instanceof e))throw new TypeError(\"Cannot call a class as a function\")}Object.defineProperty(e,\"__esModule\",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,\"value\"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=function(){function t(e,n,o,i,a,u){r(this,t),this.center={x:e,y:n},this.virtualReact={maxX:0,maxY:0,minX:0,minY:0,width:0,height:0},this.show=!0,this.text=u,this.textReact={width:0,height:0},this.radius=o+2,this.padding=0,this.aIndex=0,u&&this._getRectangle(1.1*i,a-.6)}return o(t,[{key:\"getCurrentRect\",value:function(){var t=null;switch(this.aIndex.toString()){case\"0\":t=this._getRightAnchor();break;case\"1\":t=this._getBottomAnchor();break;case\"2\":t=this._getLeftAnchor();break;case\"3\":t=this._getTopAnchor();break;default:t=this._getCenterRectangle()}return t}},{key:\"next\",value:function(){return this.aIndex++,this.aIndex>3&&(this.show=!1),this.getCurrentRect()}},{key:\"_getTrueLength\",value:function(t){for(var e=t.length,n=0,r=0;r<e;r++)t.charCodeAt(r)>128?n+=2:n+=1;return n}},{key:\"isAnchorMeet\",value:function(t){var e=this.getCurrentRect(),n=t.getCurrentRect();return e.minX<n.maxX&&n.minX<e.maxX&&e.minY<n.maxY&&n.minY<e.maxY}},{key:\"_getCenterRectangle\",value:function(){return{minX:this.center.x-this.radius,maxX:this.center.x+this.radius,minY:this.center.y-this.radius,maxY:this.center.y+this.radius}}},{key:\"_getRectangle\",value:function(t,e){var n=this._getTrueLength(this.text)*e;this.textReact={width:n+2*this.padding,height:t}}},{key:\"_getLeftAnchor\",value:function(){var t=this.center.x-this.radius-this.textReact.width,e=this.center.y-this.textReact.height/2,n=2*this.radius,r=n>this.textReact.height?n:this.textReact.height;return{x:t,y:e,minX:t,maxX:this.center.x+this.radius,minY:this.center.y-r/2,maxY:this.center.y+r/2}}},{key:\"_getRightAnchor\",value:function(){var t=this.center.x+this.radius,e=this.center.y-this.textReact.height/2,n=2*this.radius,r=n>this.textReact.height?n:this.textReact.height;return{x:t,y:e,minX:this.center.x-this.radius,maxX:this.center.x+this.radius+this.textReact.width,minY:this.center.y-r/2,maxY:this.center.y+r/2}}},{key:\"_getTopAnchor\",value:function(){var t=this.center.x-this.textReact.width/2,e=this.center.y-this.radius-this.textReact.height,n=2*this.radius,r=n>this.textReact.width?n:this.textReact.width;return{x:t,y:e,minX:this.center.x-r/2,maxX:this.center.x+r/2,minY:this.center.y-this.radius-this.textReact.height,maxY:this.center.y+this.radius}}},{key:\"_getBottomAnchor\",value:function(){var t=this.center.x-this.textReact.width/2,e=this.center.y+this.radius,n=this.radius>this.textReact.width?this.radius:this.textReact.width;return{x:t,y:e,minX:this.center.x-n/2,maxX:this.center.x+n/2,minY:this.center.y-this.radius,maxY:this.center.y+this.radius+this.textReact.height}}}]),t}();e.default=i},97:function(t,e,n){\"use strict\";function r(t){return!!t&&\"object\"==typeof t}function o(t){var e=Object.prototype.toString.call(t);return\"[object RegExp]\"===e||\"[object Date]\"===e||i(t)}function i(t){return t.$typeof===p}function a(t){return Array.isArray(t)?[]:{}}function u(t,e){return e&&!0===e.clone&&l(t)?f(a(t),t,e):t}function c(t,e,n){var r=t.slice();return e.forEach(function(e,o){void 0===r[o]?r[o]=u(e,n):l(e)?r[o]=f(t[o],e,n):-1===t.indexOf(e)&&r.push(u(e,n))}),r}function s(t,e,n){var r={};return l(t)&&Object.keys(t).forEach(function(e){r[e]=u(t[e],n)}),Object.keys(e).forEach(function(o){l(e[o])&&t[o]?r[o]=f(t[o],e[o],n):r[o]=u(e[o],n)}),r}function f(t,e,n){var r=Array.isArray(e),o=Array.isArray(t),i=n||{arrayMerge:c};if(r===o)return r?(i.arrayMerge||c)(t,e,n):s(t,e,n);return u(e,n)}var l=function(t){return r(t)&&!o(t)},h=\"function\"==typeof Symbol&&Symbol.for,p=h?Symbol.for(\"react.element\"):60103;f.all=function(t,e){if(!Array.isArray(t)||t.length<2)throw new Error(\"first argument should be an array with at least two elements\");return t.reduce(function(t,n){return f(t,n,e)})};var d=f;t.exports=d}})});';
    }

    _createClass(WorkerMrg, [{
        key: 'create',
        value: function create(workerPath) {
            var workerUrl = void 0;
            if (this.workerContent.length == 21) {
                workerUrl = workerPath.indexOf('http') > -1 ? URL.createObjectURL(new Blob(['importScripts(\'' + workerPath + '\');'])) : workerPath;
            } else {
                workerUrl = URL.createObjectURL(new Blob([this.workerContent], {
                    type: 'application/javascript'
                }));
            }

            this.worker = new Worker(workerUrl);
            this.worker.addEventListener('message', this.message);
            this.worker.onerror = function (e) {
                throw new TypeError('inMap : worker.onerror', e);
            };
        }
    }, {
        key: 'message',
        value: function message(e) {
            var data = e.data;
            var hashCode = data.request.hashCode;
            var msgId = data.request.msgId;
            var classPath = data.request.classPath;
            var key1 = classPath + '_' + hashCode,
                key2 = hashCode + '_' + msgId;

            if (instances[key1] && instances[key2]) {
                instances[key2](data.request.data, data.request.map.margin, data.request.map.zoom);
            }
            delete instances[key2];
        }
    }, {
        key: 'removeMessage',
        value: function removeMessage(hashCode) {
            for (var o in instances) {
                if (!o) continue;

                var key = o.split('_');
                if (key[0] == hashCode || key[1] == hashCode) {
                    instances[o] = null;
                }
            }
        }
    }, {
        key: 'postMessage',
        value: function postMessage(data, callback) {
            if (this.worker == null) {
                this.create('../dist/worker.js');
            }
            var hashCode = data.request.hashCode;
            var msgId = data.request.msgId;
            var classPath = data.request.classPath;
            var key = hashCode + '_' + msgId;
            instances[key] = callback;

            instances[classPath + '_' + hashCode] = key;
            this.worker.postMessage(data);
        }
    }]);

    return WorkerMrg;
}();

exports.default = new WorkerMrg();

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    devtools: true };

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasOverlay2 = __webpack_require__(29);

var _CanvasOverlay3 = _interopRequireDefault(_CanvasOverlay2);

var _Util = __webpack_require__(5);

var _LineStringAnimationConfig = __webpack_require__(169);

var _LineStringAnimationConfig2 = _interopRequireDefault(_LineStringAnimationConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MarkLine = function () {
    function MarkLine(opts) {
        _classCallCheck(this, MarkLine);

        this.path = opts.path;
        this.step = 0;
    }

    _createClass(MarkLine, [{
        key: 'drawMarker',
        value: function drawMarker(context, map) {
            this.from.draw(context, map);
            this.to.draw(context, map);
        }
    }, {
        key: 'drawLinePath',
        value: function drawLinePath(context, styleConfig) {
            var pointList = this.path;
            var len = pointList.length;
            context.save();
            context.beginPath();
            context.lineWidth = styleConfig.lineWidth;
            context.strokeStyle = styleConfig.colors[this.id];

            if (!styleConfig.lineType || styleConfig.lineType == 'solid') {
                context.moveTo(pointList[0][0], pointList[0][1]);
                for (var i = 0; i < len; i++) {
                    context.lineTo(pointList[i][0], pointList[i][1]);
                }
            } else if (styleConfig.lineType == 'dashed' || styleConfig.lineType == 'dotted') {
                for (var _i = 1; _i < len; _i += 2) {
                    context.moveTo(pointList[_i - 1][0], pointList[_i - 1][1]);
                    context.lineTo(pointList[_i][0], pointList[_i][1]);
                }
            }
            context.stroke();
            context.restore();
        }
    }, {
        key: 'drawMoveCircle',
        value: function drawMoveCircle(context, styleConfig) {
            var pointList = this.path;
            if (pointList.length <= 0) return;
            context.save();
            context.fillStyle = styleConfig.fillColor;
            context.shadowColor = styleConfig.shadowColor;
            context.shadowBlur = styleConfig.shadowBlur;
            context.beginPath();
            context.arc(pointList[this.step][0], pointList[this.step][1], styleConfig.size, 0, Math.PI * 2, true);
            context.fill();
            context.closePath();
            context.restore();
            this.step += 1;
            if (this.step >= pointList.length) {
                this.step = 0;
            }
        }
    }]);

    return MarkLine;
}();

var LineStringAnimationOverlay = function (_CanvasOverlay) {
    _inherits(LineStringAnimationOverlay, _CanvasOverlay);

    function LineStringAnimationOverlay(ops) {
        _classCallCheck(this, LineStringAnimationOverlay);

        var _this = _possibleConstructorReturn(this, (LineStringAnimationOverlay.__proto__ || Object.getPrototypeOf(LineStringAnimationOverlay)).call(this, ops));

        _this._data = [];
        _this._workerData = [];
        _this._markLineData = [];
        _this._setStyle(_LineStringAnimationConfig2.default, ops);
        return _this;
    }

    _createClass(LineStringAnimationOverlay, [{
        key: 'setOptionStyle',
        value: function setOptionStyle(ops, callback) {
            this._setStyle(this._option, ops);
            this._map && this._drawMap(callback);
        }
    }, {
        key: '_setStyle',
        value: function _setStyle(config, ops, callback) {
            ops = ops || {};
            var option = this._option = (0, _Util.merge)(config, ops);
            this._styleConfig = option.style;
            this._eventConfig = option.event;
            this._tMapStyle(option.skin);

            delete this._option.data;

            if (ops.data !== undefined) {
                this.setData(ops.data, callback);
            } else {
                this._map && this.refresh();
            }
        }
    }, {
        key: '_translation',
        value: function _translation(distanceX, distanceY) {
            for (var i = 0; i < this._markLineData.length; i++) {
                var pixels = this._markLineData[i].path;
                for (var j = 0; j < pixels.length; j++) {
                    var pixel = pixels[j];
                    pixel[0] = pixel[0] + distanceX;
                    pixel[1] = pixel[1] + distanceY;
                }
            }
            this.refresh();
        }
    }, {
        key: 'setData',
        value: function setData(points, callback) {
            if (points) {
                this._data = points;
                (0, _Util.checkGeoJSON)(points, this._option.checkDataType.name, this._option.checkDataType.count);
            } else {
                this._data = [];
            }
            (0, _Util.clearPushArray)(this._workerData);
            this._map && this._drawMap(callback);
        }
    }, {
        key: '_toDraw',
        value: function _toDraw() {
            if (!this.animationDraw) {
                this._initAnimation();
            }
            this._drawMap();
        }
    }, {
        key: '_getTransformData',
        value: function _getTransformData() {
            return this._workerData.length > 0 ? this._workerData : this._data;
        }
    }, {
        key: '_drawMap',
        value: function _drawMap(callback) {
            var _this2 = this;

            var zoomUnit = Math.pow(2, 18 - this._map.getZoom());
            var projection = this._map.getMapType().getProjection();
            var mcCenter = projection.lngLatToPoint(this._map.getCenter());
            var nwMc = new BMap.Pixel(mcCenter.x - this._map.getSize().width / 2 * zoomUnit, mcCenter.y + this._map.getSize().height / 2 * zoomUnit);

            var params = {
                points: this._getTransformData(),
                nwMc: nwMc,
                zoomUnit: zoomUnit,
                isAnimation: true,
                lineOrCurve: this._styleConfig.lineOrCurve,
                deltaAngle: this._styleConfig.deltaAngle
            };

            this._animationFlag = false;
            this._postMessage('LineStringOverlay.calculatePixel', params, function (pixels, margin) {
                if (_this2._eventType == 'onmoving') {
                    _this2._animationFlag = false;
                    return;
                }
                _this2._animationFlag = true;
                (0, _Util.clearPushArray)(_this2._workerData, pixels);
                _this2._createMarkLine(pixels);
                _this2._translation(margin.left - _this2._margin.left, margin.top - _this2._margin.top);
                params = null;
                margin = null;
                callback && callback(_this2);
                _this2._emitInit();
            });
        }
    }, {
        key: '_createMarkLine',
        value: function _createMarkLine(data) {
            (0, _Util.clearPushArray)(this._markLineData);
            for (var i = 0; i < data.length; i++) {
                var pixels = data[i].geometry.pixels;
                this._markLineData.push(new MarkLine({
                    path: pixels
                }));
            }
        }
    }, {
        key: '_initAnimation',
        value: function _initAnimation() {
            var now = void 0;
            var then = Date.now();
            var interval = 1000 / this._styleConfig.fps;
            var delta = void 0;
            var me = this;

            function drawFrame() {
                !me.isDispose && requestAnimationFrame(drawFrame);
                now = Date.now();
                delta = now - then;
                if (delta > interval) {
                    then = now - delta % interval;
                    me.refresh();
                }
            }
            this.animationDraw = drawFrame;
            this.animationDraw();
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var _markLineData = this._markLineData,
                _styleConfig = this._styleConfig;


            if (!this._ctx) {
                return;
            }

            if (!this._animationFlag) {
                this._clearCanvas();
                return;
            }
            this._ctx.fillStyle = 'rgba(0,0,0,0.93)';
            var prev = this._ctx.globalCompositeOperation;
            this._ctx.globalCompositeOperation = 'destination-in';
            var size = this._map.getSize();
            this._ctx.fillRect(0, 0, size.width, size.height);
            this._ctx.globalCompositeOperation = prev;

            for (var i = 0; i < _markLineData.length; i++) {
                var markLine = _markLineData[i];
                markLine.drawMoveCircle(this._ctx, _styleConfig, this._map);
            }
        }
    }, {
        key: 'getLngLatRectangle',
        value: function getLngLatRectangle() {
            return (0, _Util.geoJsonLineStringRectangle)(this._getTransformData());
        }
    }]);

    return LineStringAnimationOverlay;
}(_CanvasOverlay3.default);

exports.default = LineStringAnimationOverlay;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = __webpack_require__(5);

var _CanvasOverlay = __webpack_require__(29);

var _CanvasOverlay2 = _interopRequireDefault(_CanvasOverlay);

var _Parameter2 = __webpack_require__(32);

var _Parameter3 = _interopRequireDefault(_Parameter2);

var _LineStringConfig = __webpack_require__(170);

var _LineStringConfig2 = _interopRequireDefault(_LineStringConfig);

var _OnStateConfig = __webpack_require__(28);

var _OnStateConfig2 = _interopRequireDefault(_OnStateConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isMobile = (0, _Util.detection)();

var LineStringOverlay = function (_Parameter) {
    _inherits(LineStringOverlay, _Parameter);

    function LineStringOverlay(ops) {
        _classCallCheck(this, LineStringOverlay);

        var _this = _possibleConstructorReturn(this, (LineStringOverlay.__proto__ || Object.getPrototypeOf(LineStringOverlay)).call(this, _LineStringConfig2.default, ops));

        _this._state = null;
        _this._mouseLayer = new _CanvasOverlay2.default({
            zIndex: _this._zIndex + 1
        });
        _this._selectItemIndex = -1;
        _this._onDataChange();
        return _this;
    }

    _createClass(LineStringOverlay, [{
        key: 'setOptionStyle',
        value: function setOptionStyle(ops, callback) {
            this._setStyle(this._option, ops, callback);
        }
    }, {
        key: 'setZIndex',
        value: function setZIndex(zIndex) {
            this._zIndex = zIndex;
            if (this._container) this._container.style.zIndex = this._zIndex;

            this._mouseLayer.setZIndex(this._zIndex + 1);
        }
    }, {
        key: '_onDataChange',
        value: function _onDataChange() {
            var _this2 = this;

            this._selectItemIndex = -1;
            if (this._selectItem.length > 0) {
                this._selectItemIndex = this._data.findIndex(function (item) {
                    return _this2._selectItem[0] == item;
                });
            }
        }
    }, {
        key: '_parameterInit',
        value: function _parameterInit() {
            this._map.addOverlay(this._mouseLayer);
        }
    }, {
        key: '_drawMouseLayer',
        value: function _drawMouseLayer() {
            var overArr = this._overItem ? [this._overItem] : [];

            this._mouseLayer._clearCanvas();
            this._drawLine(this._mouseLayer._getContext(), this._selectItem.concat(overArr), true);
        }
    }, {
        key: '_clearAll',
        value: function _clearAll() {
            this._mouseLayer._clearCanvas();
            this._clearCanvas();
        }
    }, {
        key: '_translation',
        value: function _translation(distanceX, distanceY) {
            for (var i = 0; i < this._workerData.length; i++) {
                var pixels = this._workerData[i].geometry.pixels;
                for (var j = 0; j < pixels.length; j++) {
                    var pixel = pixels[j];
                    pixel[0] = pixel[0] + distanceX;
                    pixel[1] = pixel[1] + distanceY;
                }
            }
            this.refresh();
        }
    }, {
        key: '_getTarget',
        value: function _getTarget(mouseX, mouseY) {

            for (var i = 0, len = this._workerData.length; i < len; i++) {
                var item = this._workerData[i];
                var pixels = item.geometry.pixels;
                var style = this._setDrawStyle(item, false, i);
                for (var k = 0, _len = pixels.length; k < _len - 2; k++) {
                    var pixel1 = pixels[k];
                    var pixel2 = pixels[k + 1];
                    if (this._calcIsInsideThickLineSegment(pixel1, pixel2, mouseX, mouseY, style.borderWidth)) {
                        return {
                            index: i,
                            item: item
                        };
                    }
                }
            }
            return {
                index: -1,
                item: null
            };
        }
    }, {
        key: '_findIndexSelectItem',
        value: function _findIndexSelectItem(item) {
            var index = -1;
            if (item) {
                index = this._selectItem.findIndex(function (val) {
                    return item == val;
                });
            }
            return index;
        }
    }, {
        key: '_calcIsInsideThickLineSegment',
        value: function _calcIsInsideThickLineSegment(line1, line2, mouseX, mouseY, lineThickness) {
            var L2 = (line2[0] - line1[0]) * (line2[0] - line1[0]) + (line2[1] - line1[1]) * (line2[1] - line1[1]);
            if (L2 == 0) return false;
            var r = ((mouseX - line1[0]) * (line2[0] - line1[0]) + (mouseY - line1[1]) * (line2[1] - line1[1])) / L2;
            if (r < 0) {
                return Math.sqrt((line1[0] - mouseX) * (line1[0] - mouseX) + (line1[1] - mouseY) * (line1[1] - mouseY)) <= lineThickness;
            } else if (0 <= r && r <= 1) {
                var s = ((line1[1] - mouseY) * (line2[0] - line1[0]) - (line1[0] - mouseX) * (line2[1] - line1[1])) / L2;
                return Math.abs(s) * Math.sqrt(L2) <= lineThickness;
            } else {
                return Math.sqrt((line2[0] - mouseX) * (line2[0] - mouseX) + (line2[1] - mouseY) * (line2[1] - mouseY)) <= lineThickness;
            }
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this._setState(_OnStateConfig2.default.drawBefore);
            this._mouseLayer._canvasResize();
            this._clearCanvas();
            this._drawLine(this._ctx, this._workerData, false);
            this._anewSelectItem();
            this._drawMouseLayer();
            this._setState(_OnStateConfig2.default.drawAfter);
        }
    }, {
        key: '_anewSelectItem',
        value: function _anewSelectItem() {
            if (this._selectItemIndex > -1) {
                this._selectItem = [this._workerData[this._selectItemIndex]];
            } else {
                this._selectItem = [];
            }
        }
    }, {
        key: '_toDraw',
        value: function _toDraw(callback) {
            this._drawMap(callback);
        }
    }, {
        key: '_getTransformData',
        value: function _getTransformData() {
            return this._workerData.length > 0 ? this._workerData : this._data;
        }
    }, {
        key: '_drawMap',
        value: function _drawMap(callback) {
            var _this3 = this;

            this._clearAll();
            var zoomUnit = Math.pow(2, 18 - this._map.getZoom());
            var projection = this._map.getMapType().getProjection();
            var mcCenter = projection.lngLatToPoint(this._map.getCenter());
            var nwMc = new BMap.Pixel(mcCenter.x - this._map.getSize().width / 2 * zoomUnit, mcCenter.y + this._map.getSize().height / 2 * zoomUnit);
            var params = {
                points: this._getTransformData(),
                nwMc: nwMc,
                zoomUnit: zoomUnit,
                lineOrCurve: this._styleConfig.normal.lineOrCurive,
                deltaAngle: this._styleConfig.normal.deltaAngle
            };
            this._setState(_OnStateConfig2.default.computeBefore);
            this._postMessage('LineStringOverlay.calculatePixel', params, function (pixels, margin) {
                (0, _Util.clearPushArray)(_this3._workerData, pixels);
                if (_this3._eventType == 'onmoving') {
                    return;
                }
                _this3._setState(_OnStateConfig2.default.computeAfter);
                _this3._translation(margin.left - _this3._margin.left, margin.top - _this3._margin.top);

                params = null;
                margin = null;
                callback && callback(_this3);
                _this3._emitInit();
            });
        }
    }, {
        key: '_drawLine',
        value: function _drawLine(ctx, data, otherMode) {
            var normal = this._styleConfig.normal;
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            if (normal.globalCompositeOperation) {
                ctx.globalCompositeOperation = normal.globalCompositeOperation;
            }
            if (normal.shadowColor) {
                ctx.shadowColor = normal.shadowColor;
            }
            if (normal.shadowBlur) {
                ctx.shadowBlur = normal.shadowBlur;
            }

            for (var i = 0; i < data.length; i++) {
                var item = data[i];

                var style = this._setDrawStyle(item, otherMode, i);
                ctx.strokeStyle = style.borderColor;
                var pixels = item.geometry.pixels;
                if (pixels.length == 0) {
                    continue;
                }
                ctx.beginPath();
                if (style.borderStyle == 'dashed') {
                    if (style.dashed) {
                        ctx.setLineDash(style.dashed);
                    } else {
                        ctx.setLineDash([normal.borderWidth * 10, normal.borderWidth * 3]);
                    }
                }
                ctx.moveTo(pixels[0][0], pixels[0][1]);
                for (var j = 1; j < pixels.length; j++) {
                    ctx.lineTo(pixels[j][0], pixels[j][1]);
                }
                ctx.lineWidth = style.borderWidth;
                pixels = null;
                ctx.stroke();
            }
        }
    }, {
        key: '_TDispose',
        value: function _TDispose() {
            this._map.removeOverlay(this._mouseLayer);
            this._mouseLayer.dispose();
        }
    }, {
        key: '_tMousemove',
        value: function _tMousemove(event) {
            if (this._eventType == 'onmoving') {
                return;
            }
            var result = this._getTarget(event.pixel.x, event.pixel.y);
            var temp = result.item;
            var preOverItem = this._overItem;
            if (temp != this._overItem) {
                this._overItem = temp;
                this._eventType = 'mousemove';
                if (!(0, _Util.isEmpty)(this._styleConfig.mouseOver)) {
                    this._drawMouseLayer();
                }
            }
            if (temp) {
                this._map.setDefaultCursor('pointer');
                this._emit('onMouseOver', this._overItem, event, this);
            } else {
                this._map.setDefaultCursor('default');
                this._emit('onMouseLeave', preOverItem, event, this);
            }

            this._setTooltip(event);
        }
    }, {
        key: '_tMouseClick',
        value: function _tMouseClick(event) {
            if (this._eventType == 'onmoving') return;
            var result = this._getTarget(event.pixel.x, event.pixel.y);
            if (result.index == -1) {
                return;
            }

            var item = result.item;
            this._selectItem = [result.item];
            this._selectItemIndex = result.index;

            this._emit('onMouseClick', this._selectItem, event, this);
            if (isMobile) {
                this._overItem = item;
                this._setTooltip(event);
            }
            this._drawMouseLayer();
        }
    }, {
        key: 'getLngLatRectangle',
        value: function getLngLatRectangle() {
            return (0, _Util.geoJsonLineStringRectangle)(this._getTransformData());
        }
    }]);

    return LineStringOverlay;
}(_Parameter3.default);

exports.default = LineStringOverlay;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasOverlay = __webpack_require__(29);

var _CanvasOverlay2 = _interopRequireDefault(_CanvasOverlay);

var _Label = __webpack_require__(69);

var _Label2 = _interopRequireDefault(_Label);

var _Parameter2 = __webpack_require__(32);

var _Parameter3 = _interopRequireDefault(_Parameter2);

var _Util = __webpack_require__(5);

var _BatchesData = __webpack_require__(186);

var _BatchesData2 = _interopRequireDefault(_BatchesData);

var _PointConfig = __webpack_require__(175);

var _PointConfig2 = _interopRequireDefault(_PointConfig);

var _OnStateConfig = __webpack_require__(28);

var _OnStateConfig2 = _interopRequireDefault(_OnStateConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isMobile = (0, _Util.detection)();

var PointOverlay = function (_Parameter) {
    _inherits(PointOverlay, _Parameter);

    function PointOverlay(opts) {
        _classCallCheck(this, PointOverlay);

        var _this = _possibleConstructorReturn(this, (PointOverlay.__proto__ || Object.getPrototypeOf(PointOverlay)).call(this, _PointConfig2.default, opts));

        _this._loopDraw = _this._loopDraw.bind(_this);
        if (!(0, _Util.isEmpty)(_this._option.draw)) {
            _this._batchesData = new _BatchesData2.default(_this._option.draw);
            _this.emitEvent = _this._eventConfig.emitEvent = false;
        }
        _this._mouseLayer = new _CanvasOverlay2.default({
            zIndex: _this._zIndex + 1
        });
        _this._state = null;
        _this._mpp = {};
        return _this;
    }

    _createClass(PointOverlay, [{
        key: '_initLegend',
        value: function _initLegend() {
            if (this._styleConfig.splitList.length === 0 && this._styleConfig.colors.length > 0) {
                this._compileSplitList(this._getTransformData());
            } else {
                this._setLegend(this._legendConfig, this._styleConfig.splitList);
            }
        }
    }, {
        key: 'setZIndex',
        value: function setZIndex(zIndex) {
            this._zIndex = zIndex;
            if (this._container) this._container.style.zIndex = this._zIndex;

            this._mouseLayer.setZIndex(this._zIndex + 1);
        }
    }, {
        key: '_onOptionChange',
        value: function _onOptionChange() {
            this._map && this._initLegend();
        }
    }, {
        key: '_onDataChange',
        value: function _onDataChange() {
            this._map && this._initLegend();
        }
    }, {
        key: '_parameterInit',
        value: function _parameterInit() {
            this._map.addOverlay(this._mouseLayer);
            this._initLegend();
        }
    }, {
        key: 'setOptionStyle',
        value: function setOptionStyle(ops, callback) {
            this._setStyle(this._option, ops, callback);
            if (!(0, _Util.isEmpty)(this._option.draw)) {
                this._batchesData = new _BatchesData2.default(this._option.draw);
            } else {
                this._batchesData = null;
            }
        }
    }, {
        key: '_toDraw',
        value: function _toDraw(callback) {
            this._drawMap(callback);
        }
    }, {
        key: '_calculateMpp',
        value: function _calculateMpp(size) {
            var normal = this._styleConfig.normal,
                result = void 0;
            if (normal.unit == 'px') {
                result = size;
            } else if (normal.unit == 'm') {
                var zoom = this._map.getZoom();
                var mpp = void 0;
                if (this._mpp[zoom]) {
                    mpp = this._mpp[zoom];
                } else {
                    this._mpp[zoom] = this._getMpp();
                    mpp = this._mpp[zoom];
                }
                if (mpp == 0 || isNaN(mpp)) {
                    return;
                }
                result = size / mpp;
            } else {
                throw new TypeError('inMap: style.normal.unit must be is "m" or "px" .');
            }
            return result;
        }
    }, {
        key: '_getMpp',
        value: function _getMpp() {
            var mapCenter = this._map.getCenter();
            var assistValue = 10;
            var cpt = new BMap.Point(mapCenter.lng, mapCenter.lat + assistValue);
            var dpx = Math.abs(this._map.pointToPixel(mapCenter).y - this._map.pointToPixel(cpt).y);
            return this._map.getDistance(mapCenter, cpt) / dpx;
        }
    }, {
        key: '_translation',
        value: function _translation(distanceX, distanceY) {
            if (this._batchesData && !this._batchesData.usable) return;
            for (var i = 0; i < this._workerData.length; i++) {
                var pixel = this._workerData[i].geometry.pixel;
                pixel.x = pixel.x + distanceX;
                pixel.y = pixel.y + distanceY;
            }

            this.refresh();
        }
    }, {
        key: '_drawMouseLayer',
        value: function _drawMouseLayer() {
            var overArr = this._overItem ? [this._overItem] : [];
            this._mouseLayer._clearCanvas();
            if (this.getRenderData().length > 0) {
                this._loopDraw(this._mouseLayer._getContext(), this._selectItem.concat(overArr), true);
            }
        }
    }, {
        key: '_clearAll',
        value: function _clearAll() {
            this._mouseLayer._clearCanvas();
            this._clearCanvas();
        }
    }, {
        key: '_drawMap',
        value: function _drawMap(callback) {
            var _this2 = this;

            if (this._batchesData) {
                this._batchesData.clear();
                this._batchesData.setUsable(false);
            }

            this._clearAll();
            this._setState(_OnStateConfig2.default.computeBefore);
            this._postMessage('HeatOverlay.pointsToPixels', this._getTransformData(), function (pixels, margin, zoom) {

                _this2._setState(_OnStateConfig2.default.computeAfter);
                _this2._setWorkerData(pixels);
                _this2._updateOverClickItem();

                if (_this2._batchesData) {
                    _this2._batchesData.setUsable(true);
                }
                if (_this2._map.getZoom() == zoom) {
                    _this2._translation(margin.left - _this2._margin.left, margin.top - _this2._margin.top);
                } else {
                    _this2._translation(0, 0);
                }
                margin = null;
                pixels = null;
                callback && callback(_this2);
                _this2._emitInit();
            });
        }
    }, {
        key: '_updateOverClickItem',
        value: function _updateOverClickItem() {
            var _this3 = this;

            var overArr = this._overItem ? [this._overItem] : [];
            var allItems = this._selectItem.concat(overArr);

            var _loop = function _loop(i) {
                var item = allItems[i];
                var ret = _this3._workerData.find(function (val) {
                    var itemCoordinates = item.geometry.coordinates;
                    var valCoordinates = val.geometry.coordinates;
                    return val && itemCoordinates[0] == valCoordinates[0] && itemCoordinates[1] == valCoordinates[1] && val.count == item.count;
                });
                item.geometry.pixel = ret.geometry.pixel;
            };

            for (var i = 0; i < allItems.length; i++) {
                _loop(i);
            }
        }
    }, {
        key: '_compileSplitList',
        value: function _compileSplitList(data) {
            var colors = this._styleConfig.colors;
            if (colors.length <= 0) return;
            data = data.sort(function (a, b) {
                return parseFloat(a.count) - parseFloat(b.count);
            });
            var splitCount = data.length / colors.length;
            var colorIndex = 0;
            var split = [];
            var star = 0,
                end = 0;

            for (var i = 0; i < data.length; i++) {

                if (i > splitCount * (colorIndex + 1)) {
                    if (split.length == 0) {
                        star = data[0].count;
                    }

                    end = data[i].count;

                    split.push({
                        start: star,
                        end: end,
                        backgroundColor: colors[colorIndex]
                    });
                    colorIndex++;
                    star = data[i].count;
                }
            }

            data.length > 0 && split.push({
                start: star,
                end: null,
                backgroundColor: colors[colorIndex]
            });

            var result = [];
            for (var _i = 0; _i < split.length; _i++) {
                var _item = split[_i];
                if (_item.start != _item.end) {
                    _item.backgroundColor = colors[result.length];
                    result.push(_item);
                }
            }

            this._styleConfig.splitList = result;
            this._setLegend(this._legendConfig, this._styleConfig.splitList);
        }
    }, {
        key: '_getTarget',
        value: function _getTarget(mouseX, mouseY) {
            var pixels = this._workerData,
                ctx = this._ctx;
            var mapSize = this._map.getSize();
            for (var i = 0, len = pixels.length; i < len; i++) {
                var _item2 = pixels[i];
                var _item2$geometry$pixel = _item2.geometry.pixel,
                    x = _item2$geometry$pixel.x,
                    y = _item2$geometry$pixel.y;

                var style = this._setDrawStyle(_item2, false, i);
                var size = this._calculateMpp(style.size);
                size += style.borderWidth || 0;
                if (x > -size && y > -size && x < mapSize.width + size && y < mapSize.height + size) {
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, 2 * Math.PI, true);
                    if (ctx.isPointInPath(mouseX * this._devicePixelRatio, mouseY * this._devicePixelRatio)) {
                        return {
                            index: i,
                            item: _item2
                        };
                    }
                }
            }
            return {
                index: -1,
                item: null
            };
        }
    }, {
        key: '_findIndexSelectItem',
        value: function _findIndexSelectItem(item) {
            var index = -1;
            if (item) {
                index = this._selectItem.findIndex(function (val) {
                    var itemCoordinates = item.geometry.coordinates;
                    var valCoordinates = val.geometry.coordinates;
                    return val && itemCoordinates[0] == valCoordinates[0] && itemCoordinates[1] == valCoordinates[1] && val.count == item.count;
                });
            }
            return index;
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this._setState(_OnStateConfig2.default.drawBefore);
            this._clearCanvas();
            this._mouseLayer._canvasResize();
            if (this._batchesData) {
                this._batchesData.clear();
                this._batchesData.action(this._workerData, this._loopDraw, this._ctx);
            } else {
                this._loopDraw(this._ctx, this._workerData, false);
            }
            if (this._styleConfig.normal.label.show) {
                this._drawLabel(this._ctx, this._workerData);
            }
            this._drawMouseLayer();
            this._setState(_OnStateConfig2.default.drawAfter);
        }
    }, {
        key: '_swopData',
        value: function _swopData(index, item) {
            if (index > -1 && !this._styleConfig.normal.label.show) {
                this._workerData[index] = this._workerData[this._workerData.length - 1];
                this._workerData[this._workerData.length - 1] = item;
            }
        }
    }, {
        key: '_loopDraw',
        value: function _loopDraw(ctx, pixels, otherMode) {
            var mapSize = this._map.getSize();
            for (var i = 0, len = pixels.length; i < len; i++) {
                var _item3 = pixels[i];
                var pixel = _item3.geometry.pixel;
                var x = pixel.x,
                    y = pixel.y;

                var style = this._setDrawStyle(_item3, otherMode, i);
                var size = this._calculateMpp(style.size);
                if (this._styleConfig.normal.label.show) {
                    pixel['radius'] = size;
                }
                if (x > -size && y > -size && x < mapSize.width + size && y < mapSize.height + size) {
                    if (style.shadowColor) {
                        ctx.shadowColor = style.shadowColor || 'transparent';
                        ctx.shadowBlur = style.shadowBlur || 10;
                    } else {
                        ctx.shadowColor = 'transparent';
                        ctx.shadowBlur = 0;
                    }
                    if (style.globalCompositeOperation) {
                        ctx.globalCompositeOperation = style.globalCompositeOperation;
                    }
                    this._drawCircle(ctx, x, y, size, style.backgroundColor, style.borderWidth, style.borderColor);
                }
            }
        }
    }, {
        key: '_drawLabel',
        value: function _drawLabel(ctx, pixels) {
            var _this4 = this;

            var fontStyle = this._styleConfig.normal.label;
            var fontSize = parseInt(fontStyle.font);
            ctx.font = fontStyle.font;
            ctx.textBaseline = 'top';
            ctx.fillStyle = fontStyle.color;
            var byteWidth = ctx.measureText('a').width;

            var isName = true;
            var labels = pixels.map(function (val) {
                var _val$geometry$pixel = val.geometry.pixel,
                    radius = _val$geometry$pixel.radius,
                    x = _val$geometry$pixel.x,
                    y = _val$geometry$pixel.y;

                var r = radius + _this4._styleConfig.normal.borderWidth;
                isName = val.name ? true : false;
                return new _Label2.default(x, y, r, fontSize, byteWidth, val.name);
            });
            if (!isName) return;

            labels.sort(function (a, b) {
                return b.x - a.x;
            });
            var meet = void 0;

            do {
                meet = false;
                for (var i = 0; i < labels.length; i++) {
                    var temp = labels[i];
                    for (var j = 0; j < labels.length; j++) {
                        var temp2 = labels[j];
                        if (temp2 != temp && temp.show && temp.isAnchorMeet(temp2)) {
                            temp.next();
                            meet = true;
                            break;
                        }
                    }
                }
            } while (meet);

            labels.forEach(function (item) {
                if (item.show) {
                    var pixel = item.getCurrentRect();
                    ctx.beginPath();
                    ctx.fillText(item.text, pixel.x, pixel.y);
                    ctx.fill();
                }
            });
        }
    }, {
        key: '_drawCircle',
        value: function _drawCircle(ctx, x, y, radius, color, lineWidth, strokeStyle) {
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
            ctx.fill();
            if (lineWidth) {
                ctx.lineWidth = lineWidth;
                if (strokeStyle) {
                    ctx.strokeStyle = strokeStyle;
                }
                ctx.stroke();
            }
        }
    }, {
        key: '_TDispose',
        value: function _TDispose() {
            this._batchesData && this._batchesData.clear();
            this._map.removeOverlay(this._mouseLayer);
            this._mouseLayer.dispose();
        }
    }, {
        key: '_tMousemove',
        value: function _tMousemove(event) {

            if (this._eventType == 'onmoving') {
                return;
            }

            var result = this._getTarget(event.pixel.x, event.pixel.y);
            var temp = result.item;
            var preOverItem = this._overItem;
            if (temp != this._overItem) {
                this._overItem = temp;
                this._eventType = 'mousemove';
                if (!(0, _Util.isEmpty)(this._styleConfig.mouseOver)) {
                    this._drawMouseLayer();
                }
            }
            if (temp) {
                this._map.setDefaultCursor('pointer');
                this._emit('onMouseOver', this._overItem, event, this);
            } else {
                this._map.setDefaultCursor('default');
                this._emit('onMouseLeave', preOverItem, event, this);
            }

            this._setTooltip(event);
            return result;
        }
    }, {
        key: '_tMouseClick',
        value: function _tMouseClick(event) {
            if (this._eventType == 'onmoving') return;
            var multiSelect = this._eventConfig.multiSelect;

            var result = this._getTarget(event.pixel.x, event.pixel.y);
            if (result.index == -1) {
                return;
            }

            var item = result.item;
            if (multiSelect) {
                if (this._selectItemContains(item)) {
                    this._deleteSelectItem(item);
                } else {
                    this._selectItem.push(result.item);
                }
            } else {
                this._selectItem = [result.item];
            }

            this._emit('onMouseClick', this._selectItem, event, this);

            if (isMobile) {
                this._overItem = item;
                this._setTooltip(event);
            }
            this._drawMouseLayer();
            return result;
        }
    }, {
        key: 'getLngLatRectangle',
        value: function getLngLatRectangle() {
            return (0, _Util.geoJsonPointRectangle)(this._getTransformData());
        }
    }]);

    return PointOverlay;
}(_Parameter3.default);

exports.default = PointOverlay;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Parameter2 = __webpack_require__(32);

var _Parameter3 = _interopRequireDefault(_Parameter2);

var _Color = __webpack_require__(68);

var _Color2 = _interopRequireDefault(_Color);

var _Util = __webpack_require__(5);

var _PolygonConfig = __webpack_require__(177);

var _PolygonConfig2 = _interopRequireDefault(_PolygonConfig);

var _OnStateConfig = __webpack_require__(28);

var _OnStateConfig2 = _interopRequireDefault(_OnStateConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PolygonOverlay = function (_Parameter) {
    _inherits(PolygonOverlay, _Parameter);

    function PolygonOverlay(ops) {
        _classCallCheck(this, PolygonOverlay);

        var _this = _possibleConstructorReturn(this, (PolygonOverlay.__proto__ || Object.getPrototypeOf(PolygonOverlay)).call(this, _PolygonConfig2.default, ops));

        _this._TRightClick = _this._TRightClick.bind(_this);
        _this._subscriptions = {
            onMouseClick: [],
            onMouseOver: [],
            onMouseLeave: [],
            onRightClick: [],
            onState: [],
            onInit: [],
            isInit: true,
            preEmitName: null
        };

        _this._patchSplitList();
        _this._state = null;
        _this._customZoom = null;
        if (!_this._styleConfig.isHighlight) {
            _this._swopData = function () {};
        }
        _this._bindEmit();
        return _this;
    }

    _createClass(PolygonOverlay, [{
        key: '_parameterInit',
        value: function _parameterInit() {
            this._initLegend();
            this._map.addEventListener('rightclick', this._TRightClick);
        }
    }, {
        key: '_initLegend',
        value: function _initLegend() {
            var splitList = this._styleConfig.splitList;
            if (splitList.length === 0) {
                this._compileSplitList(this._styleConfig.colors, this._getTransformData());
            }
            this._patchSplitList();
            this._setLegend(this._legendConfig, this._styleConfig.splitList);
        }
    }, {
        key: 'setCustomZoom',
        value: function setCustomZoom(zoom) {
            this._customZoom = zoom;
            this._drawMap();
        }
    }, {
        key: '_clearSelectedList',
        value: function _clearSelectedList() {
            (0, _Util.clearPushArray)(this._selectItem);
        }
    }, {
        key: '_getSelectedList',
        value: function _getSelectedList() {
            return this._selectItem;
        }
    }, {
        key: '_translation',
        value: function _translation(distanceX, distanceY) {
            for (var i = 0; i < this._workerData.length; i++) {
                var geometry = this._workerData[i].geometry;
                var pixels = geometry.pixels;
                if (geometry.type == 'MultiPolygon') {
                    for (var j = 0; j < pixels.length; j++) {
                        var pixelItem = pixels[j];
                        for (var k = 0, len = pixelItem.length; k < len; k++) {
                            var _pixels = pixelItem[k];
                            for (var n = 0; n < _pixels.length; n++) {
                                var pixel = _pixels[n];
                                pixel[0] = pixel[0] + distanceX;
                                pixel[1] = pixel[1] + distanceY;
                            }
                        }
                    }
                } else {
                    for (var _j = 0; _j < pixels.length; _j++) {
                        var _pixelItem = pixels[_j];
                        for (var _k = 0, _len = _pixelItem.length; _k < _len; _k++) {
                            var _pixel = _pixelItem[_k];
                            _pixel[0] = _pixel[0] + distanceX;
                            _pixel[1] = _pixel[1] + distanceY;
                        }
                    }
                }

                var labelPixels = geometry.labelPixels;
                for (var _j2 = 0; _j2 < labelPixels.length; _j2++) {
                    var bestCell = labelPixels[_j2];
                    if (bestCell) {
                        bestCell.x = bestCell.x + distanceX;
                        bestCell.y = bestCell.y + distanceY;
                    }
                }
            }
            this.refresh();
        }
    }, {
        key: 'setOptionStyle',
        value: function setOptionStyle(ops, callback) {
            this._setStyle(this._option, ops, callback);
        }
    }, {
        key: '_onOptionChange',
        value: function _onOptionChange() {
            this._map && this._initLegend();
        }
    }, {
        key: '_onDataChange',
        value: function _onDataChange() {
            this._map && this._initLegend();
        }
    }, {
        key: '_compileSplitList',
        value: function _compileSplitList(colors, data) {
            if (colors.length <= 0) return;
            data = data.sort(function (a, b) {
                return parseFloat(a.count) - parseFloat(b.count);
            });
            var splitCount = data.length / colors.length;
            var colorIndex = 0;
            var split = [];
            var star = 0,
                end = 0;

            for (var i = 0; i < data.length; i++) {

                if (i > splitCount * (colorIndex + 1)) {
                    if (split.length == 0) {
                        star = data[0].count;
                    }

                    end = data[i].count;

                    split.push({
                        start: star,
                        end: end,
                        backgroundColor: colors[colorIndex]
                    });
                    colorIndex++;
                    star = data[i].count;
                }
            }

            data.length > 0 && split.push({
                start: star,
                end: null,
                backgroundColor: colors[colorIndex]
            });

            var result = [];
            for (var _i = 0; _i < split.length; _i++) {
                var item = split[_i];
                if (item.start != item.end) {
                    item.backgroundColor = colors[result.length];
                    result.push(item);
                }
            }
            this._styleConfig.splitList = result;
        }
    }, {
        key: '_patchSplitList',
        value: function _patchSplitList() {
            var normal = this._styleConfig.normal;
            if (normal.borderWidth != null && normal.borderColor == null) {
                normal.borderColor = new _Color2.default(normal.backgroundColor).getRgbaValue();
            }
            var splitList = this._styleConfig.splitList;
            for (var i = 0; i < splitList.length; i++) {
                var condition = splitList[i];
                if ((condition.borderWidth != null || normal.borderColor != null) && condition.borderColor == null) {
                    condition.borderColor = new _Color2.default(condition.backgroundColor).getRgbaValue();
                }
            }
        }
    }, {
        key: '_toDraw',
        value: function _toDraw(callback) {
            this._drawMap(callback);
        }
    }, {
        key: '_getGeoCenter',
        value: function _getGeoCenter(geo) {
            var minX = geo[0][0];
            var minY = geo[0][1];
            var maxX = geo[0][0];
            var maxY = geo[0][1];
            for (var i = 1; i < geo.length; i++) {
                minX = Math.min(minX, geo[i][0]);
                maxX = Math.max(maxX, geo[i][0]);
                minY = Math.min(minY, geo[i][1]);
                maxY = Math.max(maxY, geo[i][1]);
            }
            return [minX + (maxX - minX) / 2, minY + (maxY - minY) / 2];
        }
    }, {
        key: '_getMaxWidth',
        value: function _getMaxWidth(geo) {
            var minX = geo[0][0];
            var minY = geo[0][1];
            var maxX = geo[0][0];
            var maxY = geo[0][1];
            for (var i = 1; i < geo.length; i++) {
                minX = Math.min(minX, geo[i][0]);
                maxX = Math.max(maxX, geo[i][0]);
                minY = Math.min(minY, geo[i][1]);
                maxY = Math.max(maxY, geo[i][1]);
            }
            return maxX - minX;
        }
    }, {
        key: '_TRightClick',
        value: function _TRightClick(event) {
            if (this._eventType == 'onmoving') return;

            var result = this._getTarget(event.pixel.x, event.pixel.y);
            if (result.index == -1) {
                return;
            }

            this._emit('onRightClick', [result.item], event, this);
        }
    }, {
        key: '_findIndexSelectItem',
        value: function _findIndexSelectItem(item) {
            var index = -1;
            if (item) {
                index = this._selectItem.findIndex(function (val) {
                    return val && val.name == item.name;
                });
            }
            return index;
        }
    }, {
        key: 'refresh',
        value: function refresh() {

            this._setState(_OnStateConfig2.default.drawBefore);
            this._clearCanvas();
            this._drawPolygon(this.getRenderData());
            this._setState(_OnStateConfig2.default.drawAfter);
        }
    }, {
        key: '_drawMap',
        value: function _drawMap(callback) {
            var _this2 = this;

            this._setState(_OnStateConfig2.default.computeBefore);
            var parameter = {
                data: this._getTransformData(),
                enable: this._styleConfig.normal.label.enable,
                centerType: this._styleConfig.normal.label.centerType,
                customZoom: this._customZoom
            };
            this._postMessage('PolygonOverlay.calculatePixel', parameter, function (pixels, margin) {
                _this2._setWorkerData(pixels);
                if (_this2._eventType == 'onmoving') {
                    return;
                }
                _this2._setState(_OnStateConfig2.default.computeAfter);
                _this2._translation(margin.left - _this2._margin.left, margin.top - _this2._margin.top);
                pixels = null, margin = null;
                callback && callback(_this2);
                _this2._emitInit();
            });
        }
    }, {
        key: 'pushData',
        value: function pushData(data, callback) {
            var _this3 = this;

            if (!Array.isArray(data)) return;
            this._setState(_OnStateConfig2.default.computeBefore);
            var parameter = {
                data: data,
                enable: this._styleConfig.normal.label.enable,
                centerType: this._styleConfig.normal.label.centerType,
                customZoom: this._customZoom
            };

            this._postMessage('PolygonOverlay.calculatePixel', parameter, function (pixels, margin) {
                var _workerData;

                if (_this3._eventType == 'onmoving') {
                    return;
                }
                (_workerData = _this3._workerData).push.apply(_workerData, _toConsumableArray(pixels));
                _this3._setState(_OnStateConfig2.default.computeAfter);
                if (data.length > 0 && data.length === _this3._workerData.length && _this3._styleConfig.splitList == 0) {
                    _this3._initLegend();
                }
                _this3._translation(margin.left - _this3._margin.left, margin.top - _this3._margin.top);
                pixels = null, margin = null;
                callback && callback(_this3);
            });
        }
    }, {
        key: '_getTarget',
        value: function _getTarget(x, y) {
            var data = this.getRenderData();
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var geometry = item.geometry;
                var pixels = geometry.pixels;

                if (geometry.type == 'MultiPolygon') {
                    for (var k = 0; k < pixels.length; k++) {
                        if (this._containPolygon(x, y, pixels[k])) {
                            return {
                                index: i,
                                item: item
                            };
                        }
                    }
                } else {
                    if (this._containPolygon(x, y, pixels)) {
                        return {
                            index: i,
                            item: item
                        };
                    }
                }

                pixels = null, geometry = null, item = null;
            }

            return {
                index: -1,
                item: null
            };
        }
    }, {
        key: '_drawData',
        value: function _drawData(pixelItem) {
            if (pixelItem.length == 0) return;
            var pixel = pixelItem[0];
            this._ctx.moveTo(pixel[0], pixel[1]);
            for (var k = 1, len = pixelItem.length; k < len; k++) {
                var item = pixelItem[k];
                if (pixel[0] != item[0] || pixel[1] != item[1]) {
                    this._ctx.lineTo(pixelItem[k][0], pixelItem[k][1]);
                    pixel = item;
                }
            }
        }
    }, {
        key: '_containPolygon',
        value: function _containPolygon(x, y, pixels) {
            var outerRace = false;
            for (var j = 0; j < pixels.length; j++) {
                this._ctx.beginPath();
                var pixelItem = pixels[j];
                if (j == 0) {
                    this._drawData(pixelItem);
                    this._ctx.closePath();
                    if (this._ctx.isPointInPath(x * this._devicePixelRatio, y * this._devicePixelRatio)) {
                        outerRace = true;
                    } else {
                        return false;
                    }
                } else {

                    this._drawData(pixelItem);
                    this._ctx.closePath();

                    if (this._ctx.isPointInPath(x * this._devicePixelRatio, y * this._devicePixelRatio)) {
                        return false;
                    }
                }
            }
            return outerRace;
        }
    }, {
        key: '_drawPath',
        value: function _drawPath(pixels, style) {

            for (var j = 0; j < pixels.length; j++) {
                this._ctx.save();
                this._ctx.beginPath();
                if (style.borderStyle == 'dashed') {
                    if (style.dashed) {
                        this._ctx.setLineDash(style.dashed);
                    } else {
                        this._ctx.setLineDash([style.borderWidth * 10, style.borderWidth * 3]);
                    }
                }

                var pixelItem = pixels[j];
                if (j == 0) {
                    this._drawData(pixelItem);
                    this._ctx.closePath();
                    this._ctx.fill();
                } else {
                    this._drawData(pixelItem);
                    this._ctx.clip();
                    this._clearCanvas();
                }
                this._ctx.strokeStyle = style.borderColor;
                this._ctx.lineWidth = style.borderWidth;
                this._ctx.stroke();
                this._ctx.restore();
                pixelItem = null;
            }
        }
    }, {
        key: '_drawPolygon',
        value: function _drawPolygon(data) {
            this._ctx.lineCap = 'round';
            this._ctx.lineJoin = 'round';
            this._ctx.miterLimit = 4;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var geometry = item.geometry;
                var pixels = geometry.pixels;
                var style = this._setDrawStyle(item, true, i);
                this._ctx.beginPath();
                this._ctx.shadowColor = style.shadowColor || 'transparent';
                this._ctx.shadowBlur = style.shadowBlur || 0;
                this._ctx.shadowOffsetX = 0;
                this._ctx.shadowOffsetY = 0;
                this._ctx.fillStyle = style.backgroundColor;
                if (geometry.type == 'MultiPolygon') {
                    for (var k = 0; k < pixels.length; k++) {
                        this._drawPath(pixels[k], style);
                    }
                } else {
                    this._drawPath(pixels, style);
                }
                style = null, pixels = null, geometry = null, item = null;
                this._ctx.closePath();
            }

            if (this._styleConfig.normal.label.show) {
                for (var _i2 = 0; _i2 < data.length; _i2++) {
                    var _item = data[_i2];
                    var _geometry = _item.geometry;
                    var _pixels2 = _geometry.pixels;
                    var _style = this._setDrawStyle(_item, true, _i2);
                    var labelPixels = _geometry.labelPixels;
                    this._ctx.shadowBlur = 0;
                    this._ctx.lineWidth = _style.label.lineWidth;
                    this._ctx.font = _style.label.font;
                    this._ctx.fillStyle = _style.label.color;
                    for (var j = 0; j < labelPixels.length; j++) {
                        var bestCell = labelPixels[j];

                        this._ctx.beginPath();

                        if (_geometry.type == 'MultiPolygon') {
                            var maxPixels = [];
                            for (var _k2 = 0; _k2 < _pixels2.length; _k2++) {
                                var _item2 = _pixels2[_k2][0];
                                if (_item2.length > maxPixels.length) {
                                    maxPixels = _item2;
                                    bestCell = labelPixels[_k2];
                                }
                            }
                            this._drawLabel(bestCell, _item, maxPixels, _style);
                        } else {
                            this._drawLabel(bestCell, _item, _pixels2[j], _style);
                        }
                    }
                }
            }
        }
    }, {
        key: '_compileTooltipTemplate',
        value: function _compileTooltipTemplate(formatter) {
            var RexStr = /\{|\}/g;
            formatter = formatter.replace(RexStr, function (MatchStr) {
                switch (MatchStr) {
                    case '{':
                        return 'overItem.';
                    case '}':
                        return '';
                    default:
                        break;
                }
            });
            return new Function('overItem', 'return ' + formatter);
        }
    }, {
        key: '_drawLabel',
        value: function _drawLabel(bestCell, item, pixels, style) {
            var text = item.name;

            if (style.label.formatter) {
                text = this._compileTooltipTemplate(style.label.formatter)(item);
            }

            var width = this._ctx.measureText(text).width;
            if (bestCell && text != null) {

                if (style.label.overflow == 'hidden') {

                    if (this._getMaxWidth(pixels) > width) {
                        this._ctx.fillText(text, bestCell.x - width / 2, bestCell.y);
                    }
                } else {
                    this._ctx.fillText(text, bestCell.x - width / 2, bestCell.y);
                }
            }
        }
    }, {
        key: '_TDispose',
        value: function _TDispose() {
            this._map.removeEventListener('rightclick', this._TRightClick);
        }
    }, {
        key: 'getLngLatRectangle',
        value: function getLngLatRectangle() {
            return (0, _Util.geoJsonPolygonRectangle)(this._getTransformData());
        }
    }]);

    return PolygonOverlay;
}(_Parameter3.default);

exports.default = PolygonOverlay;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var WhiteLover = exports.WhiteLover = [{
    'featureType': 'water',
    'elementType': 'all',
    'stylers': {
        'color': '#dbe0e7'
    }
}, {
    'featureType': 'land',
    'elementType': 'all',
    'stylers': {
        'color': '#f1f3f5'
    }
}, {
    'featureType': 'green',
    'elementType': 'all',
    'stylers': {
        'color': '#e9ecf2'
    }
}, {
    'featureType': 'manmade',
    'elementType': 'all',
    'stylers': {
        'color': '#dde1e8'
    }
}, {
    'featureType': 'building',
    'elementType': 'all',
    'stylers': {
        'color': '#dde1e8'
    }
}, {
    'featureType': 'boundary',
    'elementType': 'geometry',
    'stylers': {
        'color': '#d7dadf'
    }
}, {
    'featureType': 'railway',
    'elementType': 'geometry',
    'stylers': {
        'hue': '#3d85c6',
        'lightness': 63,
        'saturation': 21,
        'visibility': 'on'
    }
}, {
    'featureType': 'local',
    'elementType': 'all',
    'stylers': {
        'color': '#e7ebf2',
        'visibility': 'off'
    }
}, {
    'featureType': 'local',
    'elementType': 'geometry.stroke',
    'stylers': {
        'color': '#b5bfc7',
        'visibility': 'off'
    }
}, {
    'featureType': 'subway',
    'elementType': 'all',
    'stylers': {
        'color': '#73b1df'
    }
}, {
    'featureType': 'poi',
    'elementType': 'all',
    'stylers': {
        'color': '#b5bfc7',
        'visibility': 'off'
    }
}, {
    'featureType': 'subway',
    'elementType': 'all',
    'stylers': {
        'color': '#d9e3ea',
        'visibility': 'off'
    }
}, {
    'featureType': 'highway',
    'elementType': 'labels',
    'stylers': {
        'color': '#c6d4df',
        'visibility': 'off'
    }
}, {
    'featureType': 'highway',
    'elementType': 'geometry.stroke',
    'stylers': {
        'color': '#c1c9d5'
    }
}, {
    'featureType': 'highway',
    'elementType': 'geometry.fill',
    'stylers': {
        'color': '#d3d8e1',
        'visibility': 'on'
    }
}, {
    'featureType': 'arterial',
    'elementType': 'labels',
    'stylers': {
        'visibility': 'on'
    }
}, {
    'featureType': 'administrative',
    'elementType': 'labels',
    'stylers': {
        'visibility': 'off'
    }
}, {
    'featureType': 'background',
    'elementType': 'labels',
    'stylers': {
        'visibility': 'off'
    }
}, {
    'featureType': 'arterial',
    'elementType': 'geometry.fill',
    'stylers': {
        'color': '#e9ecf2'
    }
}, {
    'featureType': 'arterial',
    'elementType': 'geometry.stroke',
    'stylers': {
        'color': '#d9dce3'
    }
}, {
    'featureType': 'arterial',
    'elementType': 'labels.text.fill',
    'stylers': {
        'visibility': 'off'
    }
}];
var Blueness = exports.Blueness = [{
    'featureType': 'water',
    'elementType': 'all',
    'stylers': {
        'color': '#566382'
    }
}, {
    'featureType': 'land',
    'elementType': 'all',
    'stylers': {
        'color': '#172137'
    }
}, {
    'featureType': 'green',
    'elementType': 'all',
    'stylers': {
        'color': '#282f57'
    }
}, {
    'featureType': 'manmade',
    'elementType': 'all',
    'stylers': {
        'color': '#3f4b8c'
    }
}, {
    'featureType': 'building',
    'elementType': 'all',
    'stylers': {
        'color': '#3f4b8c'
    }
}, {
    'featureType': 'boundary',
    'elementType': 'geometry',
    'stylers': {
        'color': '#4f6b9e'
    }
}, {
    'featureType': 'railway',
    'elementType': 'geometry',
    'stylers': {
        'color': '#4f6b9e'
    }
}, {
    'featureType': 'highway',
    'elementType': 'geometry.stroke',
    'stylers': {
        'color': '#202749',
        'visibility': 'off'
    }
}, {
    'featureType': 'arterial',
    'elementType': 'geometry.fill',
    'stylers': {
        'color': '#4f6b9e',
        'visibility': 'off'
    }
}, {
    'featureType': 'local',
    'elementType': 'geometry.fill',
    'stylers': {
        'color': '#303a6d'
    }
}, {
    'featureType': 'local',
    'elementType': 'geometry.stroke',
    'stylers': {
        'color': '#2d3667',
        'visibility': 'off'
    }
}, {
    'featureType': 'subway',
    'elementType': 'all',
    'stylers': {
        'color': '#445195',
        'visibility': 'off'
    }
}, {
    'featureType': 'all',
    'elementType': 'labels.text.stroke',
    'stylers': {
        'color': '#141831'
    }
}, {
    'featureType': 'all',
    'elementType': 'labels.text.fill',
    'stylers': {
        'color': '#5564b2'
    }
}, {
    'featureType': 'poi',
    'elementType': 'all',
    'stylers': {
        'color': '#141831',
        'visibility': 'off'
    }
}, {
    'featureType': 'subway',
    'elementType': 'all',
    'stylers': {
        'visibility': 'off'
    }
}, {
    'featureType': 'arterial',
    'elementType': 'geometry.stroke',
    'stylers': {
        'color': '#181e3e'
    }
}, {
    'featureType': 'highway',
    'elementType': 'geometry',
    'stylers': {
        'color': '#324160',
        'weight': '0.9'
    }
}, {
    'featureType': 'highway',
    'elementType': 'labels',
    'stylers': {
        'color': '#172137',
        'visibility': 'off'
    }
}, {
    'featureType': 'label',
    'elementType': 'labels',
    'stylers': {
        'visibility': 'off'
    }
}, {
    'featureType': 'administrative',
    'elementType': 'geometry',
    'stylers': {}
}];

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toolbar = function () {
    function Toolbar(mapDom) {
        _classCallCheck(this, Toolbar);

        var container = this._create(mapDom);
        var legendContainer = this._createLegendContainer(container);
        return {
            container: container,
            legendContainer: legendContainer
        };
    }

    _createClass(Toolbar, [{
        key: '_create',
        value: function _create(mapDom) {
            var div = document.createElement('div');
            div.classList.add('inmap-container');
            mapDom.appendChild(div);
            return div;
        }
    }, {
        key: '_createLegendContainer',
        value: function _createLegendContainer(parentDom) {
            var div = document.createElement('div');
            div.classList.add('inmap-legend-container');
            parentDom.appendChild(div);
            return div;
        }
    }]);

    return Toolbar;
}();

exports.default = Toolbar;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultiOverlay = function () {
    function MultiOverlay() {
        _classCallCheck(this, MultiOverlay);
    }

    _createClass(MultiOverlay, [{
        key: "_init",
        value: function _init() {}
    }, {
        key: "dispose",
        value: function dispose() {}
    }]);

    return MultiOverlay;
}();

exports.default = MultiOverlay;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(19);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(10);
var toAbsoluteIndex = __webpack_require__(44);
var toLength = __webpack_require__(9);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(36);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(11);
var toObject = __webpack_require__(10);
var IObject = __webpack_require__(52);
var toLength = __webpack_require__(9);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(11);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(118);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(8).f;
var create = __webpack_require__(38);
var redefineAll = __webpack_require__(42);
var ctx = __webpack_require__(20);
var anInstance = __webpack_require__(35);
var forOf = __webpack_require__(36);
var $iterDefine = __webpack_require__(80);
var step = __webpack_require__(121);
var setSpecies = __webpack_require__(43);
var DESCRIPTORS = __webpack_require__(7);
var fastKey = __webpack_require__(34).fastKey;
var validate = __webpack_require__(49);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(51);
var from = __webpack_require__(110);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(42);
var getWeak = __webpack_require__(34).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(35);
var forOf = __webpack_require__(36);
var createArrayMethod = __webpack_require__(22);
var $has = __webpack_require__(12);
var validate = __webpack_require__(49);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(58);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(9);
var ctx = __webpack_require__(20);
var IS_CONCAT_SPREADABLE = __webpack_require__(6)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(73)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 118 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(82);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 123 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 124 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(40);
var gOPS = __webpack_require__(62);
var pIE = __webpack_require__(53);
var toObject = __webpack_require__(10);
var IObject = __webpack_require__(52);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(40);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(18);
var gOPN = __webpack_require__(39).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(12);
var toIObject = __webpack_require__(18);
var arrayIndexOf = __webpack_require__(54)(false);
var IE_PROTO = __webpack_require__(86)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(40);
var toIObject = __webpack_require__(18);
var isEnum = __webpack_require__(53).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(39);
var gOPS = __webpack_require__(62);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(48).trim;

module.exports = 1 / $parseFloat(__webpack_require__(90) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(48).trim;
var ws = __webpack_require__(90);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(84);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(9);
var repeat = __webpack_require__(89);
var defined = __webpack_require__(24);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(26);
var toLength = __webpack_require__(9);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(6);


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(113);
var validate = __webpack_require__(49);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(55)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(7) && /./g.flags != 'g') __webpack_require__(8).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(57)
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(113);
var validate = __webpack_require__(49);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(55)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(22)(0);
var redefine = __webpack_require__(14);
var meta = __webpack_require__(34);
var assign = __webpack_require__(125);
var weak = __webpack_require__(115);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var validate = __webpack_require__(49);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(55)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
if (!global || !global._babelPolyfill) {
  __webpack_require__(189);
}
exports.default = {};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)))

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = __webpack_require__(5);

var _MapStyleConfig = __webpack_require__(105);

var _mapZoom = __webpack_require__(183);

var _mapZoom2 = _interopRequireDefault(_mapZoom);

var _Toolbar = __webpack_require__(106);

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _MapConfig = __webpack_require__(171);

var _MapConfig2 = _interopRequireDefault(_MapConfig);

var _Config = __webpack_require__(100);

var _Config2 = _interopRequireDefault(_Config);

var _MultiOverlay = __webpack_require__(107);

var _MultiOverlay2 = _interopRequireDefault(_MultiOverlay);

__webpack_require__(394);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
    function Map(ops) {
        _classCallCheck(this, Map);

        this._map = null;
        this._option = (0, _Util.merge)(_MapConfig2.default, ops);
        this._create();
        this._layers = [];
    }

    _createClass(Map, [{
        key: '_tMapStyle',
        value: function _tMapStyle(map, skin) {
            var styleJson = null;
            if ((0, _Util.isString)(skin)) {
                styleJson = skin == 'Blueness' ? _MapStyleConfig.Blueness : _MapStyleConfig.WhiteLover;
            } else if ((0, _Util.isArray)(skin)) {
                styleJson = skin;
            }

            skin && map && map.setMapStyle({
                styleJson: styleJson
            });
        }
    }, {
        key: '_create',
        value: function _create() {
            var _this = this;

            var id = this._option.id;

            var mapDom = (0, _Util.isString)(id) ? document.getElementById(id) : id;
            var bmap = new BMap.Map(mapDom, {
                enableMapClick: false
            });
            bmap.enableScrollWheelZoom();
            bmap.disableDoubleClickZoom();
            bmap.enableKeyboard();

            this._tMapStyle(bmap, this._option.skin);

            bmap._inmapToolBar = new _Toolbar2.default(mapDom);
            var center = this._option.center;

            bmap.centerAndZoom(new BMap.Point(center[0], center[1]), this._option.zoom.value);
            bmap.setMinZoom(this._option.zoom.min);
            bmap.setMaxZoom(this._option.zoom.max);
            if (this._option.zoom.show) {
                var mapZoom = new _mapZoom2.default(bmap, mapDom, this._option.zoom);
                bmap.addEventListener('zoomend', function () {
                    mapZoom.setButtonState();
                });
            }
            this._map = bmap;

            bmap.addEventListener('moveend', function () {
                if (_Config2.default.devtools) {
                    _this.printMapInfo();
                }
            });
            bmap.addEventListener('zoomend', function () {
                if (_Config2.default.devtools) {
                    _this.printMapInfo();
                }
            });
        }
    }, {
        key: 'printMapInfo',
        value: function printMapInfo() {
            var center = this._map.getCenter();
            console.log('Map: center:' + JSON.stringify(center) + ' zoom:' + this._map.getZoom());
        }
    }, {
        key: 'getMap',
        value: function getMap() {
            return this._map;
        }
    }, {
        key: 'add',
        value: function add(overlay) {
            if (overlay._isDispose) {
                throw new TypeError('inMap: overlay has been destroyed.');
            } else if (overlay instanceof _MultiOverlay2.default) {
                overlay._init(this._map);
            } else {
                this._map.addOverlay(overlay);
            }
            this._layers.push(overlay);
        }
    }, {
        key: 'remove',
        value: function remove(overlay) {
            if (overlay && !overlay._isDispose) {
                overlay.dispose();
            }
            var findIndex = this._layers.findIndex(function (item) {
                return item == overlay;
            });
            if (findIndex > -1) {
                delete this._layers[findIndex];
            }
            overlay = null;
        }
    }, {
        key: 'getLayers',
        value: function getLayers() {
            return this._layers;
        }
    }, {
        key: 'clearAllLayer',
        value: function clearAllLayer() {
            var _this2 = this;

            this._layers.forEach(function (overlay) {
                _this2.remove(overlay);
            });
        }
    }, {
        key: 'setAutoFitView',
        value: function setAutoFitView(ViewportOptions) {
            this.setFitView(this.getLayers(), ViewportOptions);
        }
    }, {
        key: 'setFitView',
        value: function setFitView() {
            var overlayList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var ViewportOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var points = [];
            for (var index = 0; index < overlayList.length; index++) {
                var overlay = overlayList[index];
                points = points.concat(overlay.getLngLatRectangle());
            }
            var bPoint = points.map(function (point) {
                return new BMap.Point(point[0], point[1]);
            });

            this.getMap().setViewport(bPoint, ViewportOptions);
        }
    }]);

    return Map;
}();

exports.default = Map;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Parameter2 = __webpack_require__(32);

var _Parameter3 = _interopRequireDefault(_Parameter2);

var _GriddingConfig = __webpack_require__(163);

var _GriddingConfig2 = _interopRequireDefault(_GriddingConfig);

var _OnStateConfig = __webpack_require__(28);

var _OnStateConfig2 = _interopRequireDefault(_OnStateConfig);

var _Util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GriddingOverlay = function (_Parameter) {
    _inherits(GriddingOverlay, _Parameter);

    function GriddingOverlay(ops) {
        _classCallCheck(this, GriddingOverlay);

        var _this = _possibleConstructorReturn(this, (GriddingOverlay.__proto__ || Object.getPrototypeOf(GriddingOverlay)).call(this, _GriddingConfig2.default, ops));

        _this._state = null;
        _this._drawSize = 0;
        _this._mpp = {};
        return _this;
    }

    _createClass(GriddingOverlay, [{
        key: '_parameterInit',
        value: function _parameterInit() {}
    }, {
        key: 'setOptionStyle',
        value: function setOptionStyle(ops, callback) {
            this._setStyle(this._option, ops, callback);
        }
    }, {
        key: 'draw',
        value: function draw() {
            this._toDraw();
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this._setState(_OnStateConfig2.default.drawBefore);
            this._drawRec();
            this._setState(_OnStateConfig2.default.drawAfter);
        }
    }, {
        key: '_toDraw',
        value: function _toDraw(callback) {
            this._drawMap(callback);
        }
    }, {
        key: '_onOptionChange',
        value: function _onOptionChange() {
            this._map && this._createColorSplit();
        }
    }, {
        key: '_onDataChange',
        value: function _onDataChange() {
            this._map && this._createColorSplit();
        }
    }, {
        key: '_calculateMpp',
        value: function _calculateMpp() {
            var zoom = this._map.getZoom();
            if (this._mpp[zoom]) {
                return this._mpp[zoom];
            } else {
                this._mpp[zoom] = this._getMpp();
                return this._mpp[zoom];
            }
        }
    }, {
        key: '_getMpp',
        value: function _getMpp() {
            var mapCenter = this._map.getCenter();
            var assistValue = 10;
            var cpt = new BMap.Point(mapCenter.lng, mapCenter.lat + assistValue);
            var dpx = Math.abs(this._map.pointToPixel(mapCenter).y - this._map.pointToPixel(cpt).y);
            return this._map.getDistance(mapCenter, cpt) / dpx;
        }
    }, {
        key: '_drawMap',
        value: function _drawMap(callback) {
            var _this2 = this;

            this._clearData();
            var _styleConfig = this._styleConfig,
                normal = _styleConfig.normal,
                type = _styleConfig.type;

            var zoom = this._map.getZoom();
            var mapCenter = this._map.getCenter();
            var mapSize = this._map.getSize();

            var zoomUnit = Math.pow(2, 18 - zoom);
            var mercatorProjection = this._map.getMapType().getProjection();
            var mcCenter = mercatorProjection.lngLatToPoint(mapCenter);

            var nwMcX = mcCenter.x - mapSize.width / 2 * zoomUnit;
            var nwMc = new BMap.Pixel(nwMcX, mcCenter.y + mapSize.height / 2 * zoomUnit);
            var size = 0;
            if (normal.unit == 'px') {
                size = normal.size * zoomUnit;
            } else if (normal.unit == 'm') {
                var mpp = this._calculateMpp();
                if (mpp == 0 || isNaN(mpp)) {
                    return;
                }
                size = normal.size / mpp * zoomUnit;
            } else {
                throw new TypeError('inMap: style.normal.unit must be is "meters" or "px" .');
            }

            var params = {
                points: this._data,
                size: size,
                type: type,
                nwMc: nwMc,
                zoomUnit: zoomUnit,
                mapSize: mapSize,
                mapCenter: mapCenter,
                zoom: zoom

            };
            this._setState(_OnStateConfig2.default.computeBefore);
            this._postMessage('GriddingOverlay.toRecGrids', params, function (gridsObj) {
                _this2._workerData = gridsObj.grids;
                if (_this2._eventType == 'onmoving') {
                    return;
                }
                _this2._canvasResize();

                _this2._setState(_OnStateConfig2.default.computeAfter);

                _this2._drawSize = size / zoomUnit;
                _this2._setState(_OnStateConfig2.default.drawBefore);

                if (_this2._eventType != 'onmoveend' || _this2._styleConfig.splitList == null || _this2._styleConfig.splitList.length < _this2._styleConfig.colors.length) {
                    _this2._createColorSplit();
                }
                _this2.refresh();
                gridsObj = null;
                callback && callback(_this2);

                _this2._emitInit();
            });
        }
    }, {
        key: '_isMouseOver',
        value: function _isMouseOver(mouseX, mouseY, x, y, w, h) {
            return !(mouseX < x || mouseX > x + w || mouseY < y || mouseY > y + h);
        }
    }, {
        key: '_findIndexSelectItem',
        value: function _findIndexSelectItem(item) {
            var index = -1;
            if (item) {
                index = this._selectItem.findIndex(function (val) {
                    return val && val.x == item.x && val.y == item.y;
                });
            }
            return index;
        }
    }, {
        key: '_getTarget',
        value: function _getTarget(x, y) {

            var gridStep = this._drawSize;
            var mapSize = this._map.getSize();
            for (var i = 0; i < this._workerData.length; i++) {
                var item = this._workerData[i];
                var x1 = item.x;
                var y1 = item.y;
                if (x > -gridStep && y > -gridStep && x < mapSize.width + gridStep && y < mapSize.height + gridStep) {
                    if (this._isMouseOver(x, y, x1, y1, gridStep, gridStep)) {
                        return {
                            index: i,
                            item: item
                        };
                    }
                }
            }
            return {
                index: -1,
                item: null
            };
        }
    }, {
        key: '_compileSplitList',
        value: function _compileSplitList(data) {

            var colors = this._styleConfig.colors;
            if (colors.length < 0 || data.length <= 0) return;
            data = data.sort(function (a, b) {
                return parseFloat(a.count) - parseFloat(b.count);
            });
            var mod = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

            var colorMod = mod.slice(0, colors.length).reverse();
            var sunMod = colorMod.reduce(function (sum, val) {
                return sum + val;
            }, 0);
            var split = [];
            var star = 0,
                end = 0,
                sign = 0,
                length = data.length;

            for (var i = 0; i < colorMod.length; i++) {
                if (split.length == 0) {
                    star = data[0].count;
                } else {
                    star = split[i - 1].end;
                }
                if (i == colorMod.length - 1) {
                    end = null;
                } else {
                    sign = parseInt(colorMod[i] / sunMod * length) + sign;
                    end = data[sign].count;
                }
                split.push({
                    start: star,
                    end: end,
                    backgroundColor: null
                });
            }
            var result = [];
            for (var _i = 0; _i < split.length; _i++) {
                var item = split[_i];
                if (item.start != item.end) {
                    item.backgroundColor = colors[result.length];
                    result.push(item);
                }
            }
            split = [];
            this._styleConfig.splitList = result;
        }
    }, {
        key: '_createColorSplit',
        value: function _createColorSplit() {

            this._styleConfig.colors.length > 0 && this._compileSplitList(this._workerData);
            this._setLegend(this._legendConfig, this._styleConfig.splitList);
        }
    }, {
        key: '_setTooltip',
        value: function _setTooltip(event) {
            var item = this._overItem && this._overItem.list.length > 0 ? this._overItem : null;
            this.toolTip.render(event, item);
        }
    }, {
        key: '_getStyle',
        value: function _getStyle(item, i) {
            if (item.count == 0) {
                return {
                    backgroundColor: 'rgba(255,255,255,0)'
                };
            } else {
                return this._setDrawStyle(item, true, i);
            }
        }
    }, {
        key: '_drawRec',
        value: function _drawRec() {
            this._clearCanvas();
            var gridStep = this._drawSize;
            var style = this._styleConfig.normal;
            var mapSize = this._map.getSize();
            this._ctx.shadowOffsetX = 0;
            this._ctx.shadowOffsetY = 0;
            for (var i = 0; i < this._workerData.length; i++) {
                var item = this._workerData[i];
                var x = item.x;
                var y = item.y;
                if (x > -gridStep && y > -gridStep && x < mapSize.width + gridStep && y < mapSize.height + gridStep) {
                    var drawStyle = this._getStyle(item, i);
                    if (drawStyle.shadowColor) {
                        this._ctx.shadowColor = drawStyle.shadowColor || 'transparent';
                        this._ctx.shadowBlur = drawStyle.shadowBlur || 10;
                    } else {
                        this._ctx.shadowColor = 'transparent';
                        this._ctx.shadowBlur = 0;
                    }
                    this._ctx.fillStyle = drawStyle.backgroundColor;
                    this._ctx.fillRect(x, y, gridStep - style.padding, gridStep - style.padding);

                    if (style.label.show) {
                        var text = item.count.toFixed(0);
                        this._ctx.font = style.label.font;
                        this._ctx.fillStyle = style.label.color;
                        var width = this._ctx.measureText(text).width;
                        var labelX = x + gridStep / 2 - width / 2;
                        var labelY = y + gridStep / 2;
                        this._ctx.fillText(text, labelX, labelY);
                    }
                }
            }
        }
    }, {
        key: 'getLngLatRectangle',
        value: function getLngLatRectangle() {
            return (0, _Util.geoJsonPointRectangle)(this._data);
        }
    }]);

    return GriddingOverlay;
}(_Parameter3.default);

exports.default = GriddingOverlay;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasOverlay2 = __webpack_require__(29);

var _CanvasOverlay3 = _interopRequireDefault(_CanvasOverlay2);

var _Util = __webpack_require__(5);

var _HeatConfig = __webpack_require__(164);

var _HeatConfig2 = _interopRequireDefault(_HeatConfig);

var _OnStateConfig = __webpack_require__(28);

var _OnStateConfig2 = _interopRequireDefault(_OnStateConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeatOverlay = function (_CanvasOverlay) {
    _inherits(HeatOverlay, _CanvasOverlay);

    function HeatOverlay(ops) {
        _classCallCheck(this, HeatOverlay);

        var _this = _possibleConstructorReturn(this, (HeatOverlay.__proto__ || Object.getPrototypeOf(HeatOverlay)).call(this, ops));

        _this._data = [];
        _this._workerData = [];
        _this._subscriptions = {
            onMouseMove: [],
            onState: [],
            onInit: [],
            isInit: true,
            preEmitName: null
        };
        _this._setStyle(_HeatConfig2.default, ops);
        _this._state = null;

        return _this;
    }

    _createClass(HeatOverlay, [{
        key: 'setOptionStyle',
        value: function setOptionStyle(ops, callback) {
            this._setStyle(this._option, ops, callback);
        }
    }, {
        key: '_toDraw',
        value: function _toDraw(callback) {
            this._drawMap(callback);
        }
    }, {
        key: 'getRenderData',
        value: function getRenderData() {
            return this._workerData;
        }
    }, {
        key: '_getTransformData',
        value: function _getTransformData() {
            return this._workerData.length > 0 ? this._workerData : this._data;
        }
    }, {
        key: '_setStyle',
        value: function _setStyle(config, ops) {
            ops = ops || {};
            var option = (0, _Util.merge)(config, ops);
            this._option = option;
            this._tooltipConfig = option.tooltip;
            this._styleConfig = option.style;
            this._eventConfig = option.event;
            this._gradient = option.style.gradient;
            this._palette = this._getColorPaint();
            var _styleConfig = this._styleConfig,
                radius = _styleConfig.radius,
                blur = _styleConfig.blur;

            this._templates = this._getPointTemplate(radius, blur);
            if (ops.data !== undefined) {
                this.setData(ops.data);
            } else {
                this._map && this.refresh();
            }

            this.emitEvent = this._eventConfig.emitEvent;
            this._tMapStyle(option.skin);
            this._clearBindEmit(config.event);
            this._bindEmit();
        }
    }, {
        key: '_canvasInit',
        value: function _canvasInit() {
            this.toolTip && this.toolTip.setOption(this._tooltipConfig);
        }
    }, {
        key: '_checkGeoJSON',
        value: function _checkGeoJSON(data) {
            (0, _Util.checkGeoJSON)(data, this._option.checkDataType.name, this._option.checkDataType.count);
        }
    }, {
        key: 'setData',
        value: function setData(points, callback) {
            if (points) {
                this._data = points;
                this._checkGeoJSON(points);
            } else {
                this._data = [];
            }
            (0, _Util.clearPushArray)(this._workerData, []);
            this._map && this._drawMap(callback);
        }
    }, {
        key: '_getMax',
        value: function _getMax() {
            if (this._workerData.length == 0) {
                return 0;
            }
            var maxValue = 0;
            for (var i = 0, len = this._workerData.length; i < len; i++) {
                if (this._workerData[i].count > maxValue) {
                    maxValue = this._workerData[i].count;
                }
            }

            return maxValue;
        }
    }, {
        key: '_getMin',
        value: function _getMin() {
            if (this._workerData.length == 0) {
                return 0;
            }

            var minValue = 0;
            for (var i = 0, len = this._workerData.length; i < len; i++) {
                if (this._workerData[i].count < minValue) {
                    minValue = this._workerData[i].count;
                }
            }

            return minValue;
        }
    }, {
        key: '_translation',
        value: function _translation(distanceX, distanceY) {
            for (var i = 0; i < this._workerData.length; i++) {
                var pixel = this._workerData[i].geometry.pixel;
                pixel.x = pixel.x + distanceX;
                pixel.y = pixel.y + distanceY;
            }
            this._setState(_OnStateConfig2.default.drawBefore);
            this.refresh();
            this._setState(_OnStateConfig2.default.drawAfter);
        }
    }, {
        key: '_setWorkerData',
        value: function _setWorkerData(val) {
            this._data = [];
            (0, _Util.clearPushArray)(this._workerData, val);
        }
    }, {
        key: '_drawMap',
        value: function _drawMap(callback) {
            var _this2 = this;

            this._setState(_OnStateConfig2.default.computeBefore);

            this._postMessage('HeatOverlay.pointsToPixels', this._getTransformData(), function (pixels, margin) {
                _this2._setWorkerData(pixels);
                if (_this2._eventType == 'onmoving') {
                    return;
                }

                _this2._setState(_OnStateConfig2.default.computeAfter);

                _this2._translation(margin.left - _this2._margin.left, margin.top - _this2._margin.top);

                margin = null;
                pixels = null;
                callback && callback(_this2);
                _this2._emitInit();
            });
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this._clearCanvas();

            var normal = this._styleConfig;
            var mapSize = this._map.getSize();
            var maxValue = normal.maxValue;
            if (normal.maxValue == null) {
                maxValue = this._getMax();
            }
            var minValue = normal.minValue;
            if (normal.minValue == null) {
                minValue = this._getMin();
            }

            if (mapSize.width <= 0) {
                return;
            }
            this.maxValue = maxValue, this.minValue = minValue;
            var tpl = this._templates;
            var ctx = this._ctx;
            for (var i = 0, _len = this._workerData.length; i < _len; i++) {
                var item = this._workerData[i];
                var pixel = item.geometry.pixel;
                if (pixel.x > -normal.radius && pixel.y > -normal.radius && pixel.x < mapSize.width + normal.radius && pixel.y < mapSize.height + normal.radius) {
                    var _opacity = (item.count - minValue) / (maxValue - minValue);
                    _opacity = _opacity < .01 ? .01 : _opacity;
                    ctx.globalAlpha = _opacity;
                    var rectX = pixel.x - normal.radius;
                    var rectY = pixel.y - normal.radius;
                    ctx.drawImage(tpl, rectX, rectY);
                }
            }

            var palette = this._palette;
            var img = ctx.getImageData(0, 0, mapSize.width * this._devicePixelRatio, mapSize.height * this._devicePixelRatio);
            var imgData = img.data;

            var max_opacity = normal.maxOpacity * 255;
            var min_opacity = normal.minOpacity * 255;

            var len = imgData.length,
                opacity = 0;
            for (var _i = 3; _i < len; _i += 4) {
                var alpha = imgData[_i];
                var offset = alpha * 4;
                if (!offset) {
                    continue;
                }
                var finalAlpha = void 0;
                if (opacity > 0) {
                    finalAlpha = opacity;
                } else {
                    if (alpha < max_opacity) {
                        if (alpha < min_opacity) {
                            finalAlpha = min_opacity;
                        } else {
                            finalAlpha = alpha;
                        }
                    } else {
                        finalAlpha = max_opacity;
                    }
                }

                imgData[_i - 3] = palette[offset];
                imgData[_i - 2] = palette[offset + 1];
                imgData[_i - 1] = palette[offset + 2];
                imgData[_i] = finalAlpha;
            }

            ctx.putImageData(img, 0, 0, 0, 0, mapSize.width * this._devicePixelRatio, mapSize.height * this._devicePixelRatio);
        }
    }, {
        key: '_getPointTemplate',
        value: function _getPointTemplate(radius, blurFactor, opacity) {
            var tplCanvas = document.createElement('canvas');
            var tplCtx = tplCanvas.getContext('2d');
            var x = radius;
            var y = radius;
            tplCanvas.width = tplCanvas.height = radius * 2;

            if (opacity) tplCtx.globalAlpha = opacity;

            if (blurFactor == 1) {
                tplCtx.beginPath();
                tplCtx.arc(x, y, radius, 0, 2 * Math.PI, false);
                tplCtx.fillStyle = 'rgba(0,0,0,1)';
                tplCtx.fill();
            } else {
                var gradient = tplCtx.createRadialGradient(x, y, radius * blurFactor, x, y, radius);
                gradient.addColorStop(0, 'rgba(0,0,0,1)');
                gradient.addColorStop(1, 'rgba(0,0,0,0)');

                tplCtx.fillStyle = gradient;
                tplCtx.fillRect(0, 0, 2 * radius, 2 * radius);
            }

            return tplCanvas;
        }
    }, {
        key: '_drawPoint',
        value: function _drawPoint(x, y, radius, opacity) {
            var ctx = this._ctx;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            var gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, 'rgba(0,0,0,1)');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gradient;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
    }, {
        key: '_getColorPaint',
        value: function _getColorPaint() {
            var gradientConfig = this._gradient;
            var paletteCanvas = document.createElement('canvas');
            var paletteCtx = paletteCanvas.getContext('2d');

            paletteCanvas.width = 256;
            paletteCanvas.height = 1;

            var gradient = paletteCtx.createLinearGradient(0, 0, 256, 1);
            for (var key in gradientConfig) {
                gradient.addColorStop(key, gradientConfig[key]);
            }

            paletteCtx.fillStyle = gradient;
            paletteCtx.fillRect(0, 0, 256, 1);
            return paletteCtx.getImageData(0, 0, 256, 1).data;
        }
    }, {
        key: 'getValueAt',
        value: function getValueAt(x, y) {
            var value = void 0;
            var img = this._ctx.getImageData(x * this._devicePixelRatio, y * this._devicePixelRatio, 1, 1);
            var data = img.data[3];
            value = Math.abs(this.maxValue - this.minValue) * (data / 255) >> 0;

            return value;
        }
    }, {
        key: '_tMousemove',
        value: function _tMousemove() {
            if (this._eventType == 'onmoving') return;
            this._emit('onMouseMove', event, this);
            this._subscriptions.preEmitName = null;
        }
    }, {
        key: 'getLngLatRectangle',
        value: function getLngLatRectangle() {
            return (0, _Util.geoJsonPointRectangle)(this._data);
        }
    }]);

    return HeatOverlay;
}(_CanvasOverlay3.default);

exports.default = HeatOverlay;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Parameter2 = __webpack_require__(32);

var _Parameter3 = _interopRequireDefault(_Parameter2);

var _HoneycombConfig = __webpack_require__(165);

var _HoneycombConfig2 = _interopRequireDefault(_HoneycombConfig);

var _OnStateConfig = __webpack_require__(28);

var _OnStateConfig2 = _interopRequireDefault(_OnStateConfig);

var _Util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HoneycombOverlay = function (_Parameter) {
    _inherits(HoneycombOverlay, _Parameter);

    function HoneycombOverlay(ops) {
        _classCallCheck(this, HoneycombOverlay);

        var _this = _possibleConstructorReturn(this, (HoneycombOverlay.__proto__ || Object.getPrototypeOf(HoneycombOverlay)).call(this, _HoneycombConfig2.default, ops));

        _this._state = null;
        _this._mpp = {};
        _this._drawSize = 0;
        return _this;
    }

    _createClass(HoneycombOverlay, [{
        key: 'setOptionStyle',
        value: function setOptionStyle(ops, callback) {
            this._setStyle(this._option, ops, callback);
        }
    }, {
        key: 'draw',
        value: function draw() {
            this._toDraw();
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this._setState(_OnStateConfig2.default.drawBefore);
            this._drawRec();
            this._setState(_OnStateConfig2.default.drawAfter);
        }
    }, {
        key: '_toDraw',
        value: function _toDraw(callback) {
            this._drawMap(callback);
        }
    }, {
        key: '_onOptionChange',
        value: function _onOptionChange() {
            this._map && this._createColorSplit();
        }
    }, {
        key: '_onDataChange',
        value: function _onDataChange() {
            this._map && this._createColorSplit();
        }
    }, {
        key: '_calculateMpp',
        value: function _calculateMpp() {
            var zoom = this._map.getZoom();
            if (this._mpp[zoom]) {
                return this._mpp[zoom];
            } else {
                this._mpp[zoom] = this._getMpp();
                return this._mpp[zoom];
            }
        }
    }, {
        key: '_getMpp',
        value: function _getMpp() {
            var mapCenter = this._map.getCenter();
            var assistValue = 10;
            var cpt = new BMap.Point(mapCenter.lng, mapCenter.lat + assistValue);
            var dpx = Math.abs(this._map.pointToPixel(mapCenter).y - this._map.pointToPixel(cpt).y);
            return this._map.getDistance(mapCenter, cpt) / dpx;
        }
    }, {
        key: '_drawMap',
        value: function _drawMap(callback) {
            var _this2 = this;

            this._clearData();
            var _styleConfig = this._styleConfig,
                normal = _styleConfig.normal,
                type = _styleConfig.type;

            var zoom = this._map.getZoom();
            var mapCenter = this._map.getCenter();
            var mapSize = this._map.getSize();

            var zoomUnit = Math.pow(2, 18 - zoom);
            var mercatorProjection = this._map.getMapType().getProjection();
            var mcCenter = mercatorProjection.lngLatToPoint(mapCenter);

            var nwMcX = mcCenter.x - mapSize.width / 2 * zoomUnit;
            var nwMc = new BMap.Pixel(nwMcX, mcCenter.y + mapSize.height / 2 * zoomUnit);
            var size = 0;

            if (normal.unit == 'px') {
                size = normal.size * zoomUnit;
            } else if (normal.unit == 'm') {
                var mpp = this._calculateMpp();
                if (mpp == 0 || isNaN(mpp)) {
                    return;
                }
                size = normal.size / mpp * zoomUnit;
            } else {
                throw new TypeError('inMap: style.normal.unit must be is "meters" or "px" .');
            }

            var params = {
                points: this._data,
                size: size,
                type: type,
                nwMc: nwMc,
                zoomUnit: zoomUnit,
                mapSize: mapSize,
                mapCenter: mapCenter,
                zoom: zoom
            };
            this._setState(_OnStateConfig2.default.computeBefore);

            this._postMessage('HoneycombOverlay.toRecGrids', params, function (gridsObj) {
                _this2._workerData = gridsObj.grids;
                if (_this2._eventType == 'onmoving') {
                    return;
                }
                _this2._canvasResize();
                _this2._setState(_OnStateConfig2.default.computeAfter);

                _this2._drawSize = size / zoomUnit;

                if (_this2._eventType != 'onmoveend' || _this2._styleConfig.splitList == null || _this2._styleConfig.splitList.length < _this2._styleConfig.colors.length) {
                    _this2._createColorSplit();
                }
                _this2.refresh();
                gridsObj = null;
                callback && callback(_this2);
                _this2._emitInit();
            });
        }
    }, {
        key: '_createColorSplit',
        value: function _createColorSplit() {
            this._styleConfig.colors.length > 0 && this._compileSplitList(this._workerData);
            this._setLegend(this._legendConfig, this._styleConfig.splitList);
        }
    }, {
        key: '_compileSplitList',
        value: function _compileSplitList(data) {

            var colors = this._styleConfig.colors;
            if (colors.length < 0 || data.length <= 0) return;
            data = data.sort(function (a, b) {
                return parseFloat(a.count) - parseFloat(b.count);
            });
            var mod = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

            var colorMod = mod.slice(0, colors.length).reverse();
            var sunMod = colorMod.reduce(function (sum, val) {
                return sum + val;
            }, 0);
            var split = [];
            var star = 0,
                end = 0,
                sign = 0,
                length = data.length;

            for (var i = 0; i < colorMod.length; i++) {
                if (split.length == 0) {
                    star = data[0].count;
                } else {
                    star = split[i - 1].end;
                }
                if (i == colorMod.length - 1) {
                    end = null;
                } else {
                    sign = parseInt(colorMod[i] / sunMod * length) + sign;
                    end = data[sign].count;
                }

                split.push({
                    start: star,
                    end: end,
                    backgroundColor: colors[i]
                });
            }
            var result = [];
            for (var _i = 0; _i < split.length; _i++) {
                var item = split[_i];
                if (item.start != item.end) {
                    item.backgroundColor = colors[result.length];
                    result.push(item);
                }
            }
            split = [];

            this._styleConfig.splitList = result;
        }
    }, {
        key: '_findIndexSelectItem',
        value: function _findIndexSelectItem(item) {
            var index = -1;
            if (item) {
                index = this._selectItem.findIndex(function (val) {
                    return val && val.x == item.x && val.y == item.y;
                });
            }
            return index;
        }
    }, {
        key: '_getStyle',
        value: function _getStyle(item, i) {
            return this._setDrawStyle(item, true, i);
        }
    }, {
        key: '_getTarget',
        value: function _getTarget(mouseX, mouseY) {
            var gridStep = this._drawSize;
            var mapSize = this._map.getSize();

            for (var i = 0; i < this._workerData.length; i++) {
                var item = this._workerData[i];
                var x = item.x;
                var y = item.y;
                if (item.list.length > 0 && x > -gridStep && y > -gridStep && x < mapSize.width + gridStep && y < mapSize.height + gridStep) {
                    this._ctx.beginPath();
                    this._ctx.moveTo(x, y - gridStep / 2);
                    this._ctx.lineTo(x + gridStep / 2, y - gridStep / 4);
                    this._ctx.lineTo(x + gridStep / 2, y + gridStep / 4);
                    this._ctx.lineTo(x, y + gridStep / 2);
                    this._ctx.lineTo(x - gridStep / 2, y + gridStep / 4);
                    this._ctx.lineTo(x - gridStep / 2, y - gridStep / 4);
                    this._ctx.closePath();

                    if (this._ctx.isPointInPath(mouseX * this._devicePixelRatio, mouseY * this._devicePixelRatio)) {
                        return {
                            index: i,
                            item: item
                        };
                    }
                }
            }
            return {
                index: -1,
                item: null
            };
        }
    }, {
        key: '_drawRec',
        value: function _drawRec() {
            this._clearCanvas();
            var mapSize = this._map.getSize();
            var gridsW = this._drawSize;

            var style = this._styleConfig.normal;
            this._ctx.shadowOffsetX = 0;
            this._ctx.shadowOffsetY = 0;
            for (var i = 0; i < this._workerData.length; i++) {
                var item = this._workerData[i];
                var x = item.x;
                var y = item.y;
                if (item.list.length > 0 && x > -gridsW && y > -gridsW && x < mapSize.width + gridsW && y < mapSize.height + gridsW) {
                    var drawStyle = this._getStyle(item, i);
                    this._drawLine(x, y, gridsW - style.padding, drawStyle, this._ctx);
                    if (style.label.show) {
                        var text = item.count.toFixed(0);
                        this._ctx.font = style.label.font;
                        this._ctx.fillStyle = style.label.color;
                        var width = this._ctx.measureText(text).width;
                        var labelX = x - width / 2;
                        var labelY = y;
                        this._ctx.fillText(text, labelX, labelY);
                    }
                }
            }
        }
    }, {
        key: '_drawLine',
        value: function _drawLine(x, y, gridStep, drawStyle, ctx) {

            ctx.beginPath();
            if (drawStyle.shadowColor) {
                this._ctx.shadowColor = drawStyle.shadowColor || 'transparent';
                this._ctx.shadowBlur = drawStyle.shadowBlur || 10;
            } else {
                this._ctx.shadowColor = 'transparent';
                this._ctx.shadowBlur = 0;
            }
            ctx.fillStyle = drawStyle.backgroundColor;
            ctx.moveTo(x, y - gridStep / 2);
            ctx.lineTo(x + gridStep / 2, y - gridStep / 4);
            ctx.lineTo(x + gridStep / 2, y + gridStep / 4);
            ctx.lineTo(x, y + gridStep / 2);
            ctx.lineTo(x - gridStep / 2, y + gridStep / 4);
            ctx.lineTo(x - gridStep / 2, y - gridStep / 4);
            ctx.fill();
            ctx.closePath();
        }
    }, {
        key: 'getLngLatRectangle',
        value: function getLngLatRectangle() {
            return (0, _Util.geoJsonPointRectangle)(this._data);
        }
    }]);

    return HoneycombOverlay;
}(_Parameter3.default);

exports.default = HoneycombOverlay;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Parameter2 = __webpack_require__(32);

var _Parameter3 = _interopRequireDefault(_Parameter2);

var _ImgConfig = __webpack_require__(166);

var _ImgConfig2 = _interopRequireDefault(_ImgConfig);

var _Util = __webpack_require__(5);

var _OnStateConfig = __webpack_require__(28);

var _OnStateConfig2 = _interopRequireDefault(_OnStateConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImgOverlay = function (_Parameter) {
    _inherits(ImgOverlay, _Parameter);

    function ImgOverlay(opts) {
        _classCallCheck(this, ImgOverlay);

        var _this = _possibleConstructorReturn(this, (ImgOverlay.__proto__ || Object.getPrototypeOf(ImgOverlay)).call(this, _ImgConfig2.default, opts));

        _this._cacheImg = {};
        _this._state = null;
        return _this;
    }

    _createClass(ImgOverlay, [{
        key: '_toDraw',
        value: function _toDraw(callback) {
            this._drawMap(callback);
        }
    }, {
        key: 'setOptionStyle',
        value: function setOptionStyle(ops, callback) {
            this._setStyle(this._option, ops, callback);
        }
    }, {
        key: '_translation',
        value: function _translation(distanceX, distanceY) {
            for (var i = 0; i < this._workerData.length; i++) {
                var pixel = this._workerData[i].geometry.pixel;
                pixel.x = pixel.x + distanceX;
                pixel.y = pixel.y + distanceY;
                pixel = null;
            }

            this.refresh();
        }
    }, {
        key: 'pushData',
        value: function pushData(data, callback) {
            var _this2 = this;

            if (!Array.isArray(data)) return;
            this._setState(_OnStateConfig2.default.computeBefore);
            this._postMessage('HeatOverlay.pointsToPixels', data, function (pixels, margin) {
                var _workerData;

                if (_this2._eventType == 'onmoving') {
                    return;
                }
                (_workerData = _this2._workerData).push.apply(_workerData, _toConsumableArray(pixels));
                _this2._setState(_OnStateConfig2.default.computeAfter);
                _this2._translation(margin.left - _this2._margin.left, margin.top - _this2._margin.top);
                callback && callback(_this2);
            });
        }
    }, {
        key: 'filter',
        value: function filter(func) {
            var arrData = this._workerData.filter(func);
            (0, _Util.clearPushArray)(this._workerData, arrData);
            this.refresh();
        }
    }, {
        key: '_drawMap',
        value: function _drawMap(callback) {
            var _this3 = this;

            this._setState(_OnStateConfig2.default.computeBefore);
            this._postMessage('HeatOverlay.pointsToPixels', this._getTransformData(), function (pixels, margin) {
                _this3._setWorkerData(pixels);
                if (_this3._eventType == 'onmoving') {
                    return;
                }
                _this3._setState(_OnStateConfig2.default.computeAfter);

                _this3._translation(margin.left - _this3._margin.left, margin.top - _this3._margin.top);
                margin = null;
                pixels = null;
                callback && callback(_this3);
                _this3._emitInit();
            });
        }
    }, {
        key: '_isMouseOver',
        value: function _isMouseOver(x, y, imgX, imgY, imgW, imgH) {
            return !(x < imgX || x > imgX + imgW || y < imgY || y > imgY + imgH);
        }
    }, {
        key: '_getTarget',
        value: function _getTarget(x, y) {
            var pixels = this._workerData;

            for (var i = 0, len = pixels.length; i < len; i++) {
                var item = pixels[i];
                var pixel = item.geometry.pixel;
                var style = this._setDrawStyle(item, i);
                var img = void 0;
                if ((0, _Util.isString)(img)) {
                    img = this._cacheImg[style.icon];
                } else {
                    img = style.icon;
                }

                if (!img) break;
                if (style.width && style.height) {
                    var xy = this._getDrawXY(pixel, style.offsets.left, style.offsets.top, style.width, style.height, 1);

                    if (this._isMouseOver(x, y, xy.x, xy.y, style.width, style.height)) {
                        return {
                            index: i,
                            item: item
                        };
                    }
                } else {

                    var _xy = this._getDrawXY(pixel, style.offsets.left, style.offsets.top, style.width, style.height);
                    if (this._isMouseOver(x, y, _xy.x, _xy.y, img.width, img.height)) {

                        return {
                            index: i,
                            item: item
                        };
                    }
                }
            }
            return {
                index: -1,
                item: null
            };
        }
    }, {
        key: '_findIndexSelectItem',
        value: function _findIndexSelectItem(item) {
            var index = -1;
            if (item) {
                index = this._selectItem.findIndex(function (val) {
                    var itemCoordinates = item.geometry.coordinates;
                    var valCoordinates = val.geometry.coordinates;
                    return val && itemCoordinates[0] == valCoordinates[0] && itemCoordinates[1] == valCoordinates[1] && val.count == item.count;
                });
            }
            return index;
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this._setState(_OnStateConfig2.default.drawBefore);
            this._clearCanvas();
            this._loopDraw(this._ctx, this._workerData);
            this._setState(_OnStateConfig2.default.drawAfter);
        }
    }, {
        key: '_loadImg',
        value: function _loadImg(img, fun) {
            var me = this;
            if ((0, _Util.isString)(img)) {
                var image = me._cacheImg[img];
                if (!image) {
                    var _image = new Image();
                    _image.src = img;
                    _image.onload = function () {
                        me._cacheImg[img] = _image;
                        fun(_image);
                    };
                } else {
                    fun(image);
                }
            } else {
                fun(img);
            }
        }
    }, {
        key: '_isPercent',
        value: function _isPercent(val) {
            if (val.toString().indexOf('%') > -1) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: '_getDrawXY',
        value: function _getDrawXY(pixel, offsetL, offsetT, width, height) {
            var x = 0,
                y = 0;
            var scaleW = width;
            var scaleH = height;
            var offsetLeft = parseFloat(offsetL);
            var offsetTop = parseFloat(offsetT);

            if (this._isPercent(offsetL)) {
                x = pixel.x + scaleW * offsetLeft / 100;
            } else {
                x = pixel.x + offsetLeft;
            }
            if (this._isPercent(offsetT)) {
                y = pixel.y + scaleH * offsetTop / 100;
            } else {
                y = pixel.y + offsetTop;
            }
            return {
                x: x,
                y: y
            };
        }
    }, {
        key: '_loopDraw',
        value: function _loopDraw(ctx, pixels) {
            var _this4 = this;

            var mapSize = this._map.getSize();

            var _loop = function _loop(i, len) {
                var item = pixels[i];
                var pixel = item.geometry.pixel;
                var style = _this4._setDrawStyle(item, true, i);
                if (pixel.x > -style.width && pixel.y > -style.height && pixel.x < mapSize.width + style.width && pixel.y < mapSize.height + style.height) {
                    _this4._loadImg(style.icon, function (img) {
                        if (style.width && style.height) {
                            var xy = _this4._getDrawXY(pixel, style.offsets.left, style.offsets.top, style.width, style.height);
                            _this4._drawImage(_this4._ctx, img, xy.x, xy.y, style.width, style.height);
                        } else {
                            var _xy2 = _this4._getDrawXY(pixel, style.offsets.left, style.offsets.top, img.width, img.height, 1);
                            _this4._drawImage(_this4._ctx, img, _xy2.x, _xy2.y, img.width, img.height);
                        }
                        if (style.label.show) {
                            _this4._ctx.font = style.label.font;
                            _this4._ctx.fillStyle = style.label.color;
                            var width = _this4._ctx.measureText(item.name).width;
                            var x = pixel.x - width / 2 + style.label.offsets.left;
                            var y = pixel.y + style.label.offsets.top;
                            _this4._ctx.fillText(item.name, x, y);
                        }
                    });
                }
            };

            for (var i = 0, len = pixels.length; i < len; i++) {
                _loop(i, len);
            }
        }
    }, {
        key: '_drawImage',
        value: function _drawImage(ctx, img, x, y, width, height) {
            ctx.drawImage(img, x, y, width, height);
        }
    }, {
        key: 'getLngLatRectangle',
        value: function getLngLatRectangle() {
            return (0, _Util.geoJsonPointRectangle)(this._getTransformData());
        }
    }]);

    return ImgOverlay;
}(_Parameter3.default);

exports.default = ImgOverlay;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Parameter2 = __webpack_require__(32);

var _Parameter3 = _interopRequireDefault(_Parameter2);

var _LabelConfig = __webpack_require__(167);

var _LabelConfig2 = _interopRequireDefault(_LabelConfig);

var _OnStateConfig = __webpack_require__(28);

var _OnStateConfig2 = _interopRequireDefault(_OnStateConfig);

var _Util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LabelOverlay = function (_Parameter) {
    _inherits(LabelOverlay, _Parameter);

    function LabelOverlay(opts) {
        _classCallCheck(this, LabelOverlay);

        var _this = _possibleConstructorReturn(this, (LabelOverlay.__proto__ || Object.getPrototypeOf(LabelOverlay)).call(this, _LabelConfig2.default, opts));

        _this._state = null;
        return _this;
    }

    _createClass(LabelOverlay, [{
        key: '_onOptionChange',
        value: function _onOptionChange() {}
    }, {
        key: '_onDataChange',
        value: function _onDataChange() {}
    }, {
        key: 'setOptionStyle',
        value: function setOptionStyle(ops, callback) {
            this._setStyle(this._option, ops, callback);
        }
    }, {
        key: '_toDraw',
        value: function _toDraw(callback) {
            this._drawMap(callback);
        }
    }, {
        key: '_translation',
        value: function _translation(distanceX, distanceY) {
            for (var i = 0; i < this._workerData.length; i++) {
                var pixel = this._workerData[i].geometry.pixel;
                pixel.x = pixel.x + distanceX;
                pixel.y = pixel.y + distanceY;
            }
            this.refresh();
        }
    }, {
        key: '_drawMap',
        value: function _drawMap(callback) {
            var _this2 = this;

            this._clearCanvas();
            this._setState(_OnStateConfig2.default.computeBefore);
            this._postMessage('HeatOverlay.pointsToPixels', this._getTransformData(), function (pixels, margin, zoom) {
                _this2._setWorkerData(pixels);
                if (_this2._eventType == 'onmoving') {
                    return;
                }
                _this2._setState(_OnStateConfig2.default.computeAfter);

                _this2._updateOverClickItem();

                if (_this2._map.getZoom() == zoom) {
                    _this2._translation(margin.left - _this2._margin.left, margin.top - _this2._margin.top);
                } else {
                    _this2._translation(0, 0);
                }
                margin = null;
                pixels = null;
                callback && callback(_this2);
                _this2._emitInit();
            });
        }
    }, {
        key: 'pushData',
        value: function pushData(data, callback) {
            var _this3 = this;

            if (!Array.isArray(data)) return;
            this._setState(_OnStateConfig2.default.computeBefore);
            this._postMessage('HeatOverlay.pointsToPixels', data, function (pixels, margin) {
                var _workerData;

                if (_this3._eventType == 'onmoving') {
                    return;
                }
                (_workerData = _this3._workerData).push.apply(_workerData, _toConsumableArray(pixels));
                _this3._setState(_OnStateConfig2.default.computeAfter);
                _this3._translation(margin.left - _this3._margin.left, margin.top - _this3._margin.top);
                callback && callback(_this3);
            });
        }
    }, {
        key: '_updateOverClickItem',
        value: function _updateOverClickItem() {
            var _this4 = this;

            var overArr = this._overItem ? [this._overItem] : [];
            var allItems = this._selectItem.concat(overArr);

            var _loop = function _loop(i) {
                var item = allItems[i];
                var ret = _this4._workerData.find(function (val) {
                    var itemCoordinates = item.geometry.coordinates;
                    var valCoordinates = val.geometry.coordinates;
                    return val && itemCoordinates[0] == valCoordinates[0] && itemCoordinates[1] == valCoordinates[1] && val.count == item.count;
                });
                item.geometry.pixel = ret.geometry.pixel;
            };

            for (var i = 0; i < allItems.length; i++) {
                _loop(i);
            }
        }
    }, {
        key: '_getTarget',
        value: function _getTarget(mouseX, mouseY) {
            var data = this._workerData;
            for (var i = 0, len = data.length; i < len; i++) {
                var _item = data[i];
                var pixel = _item.geometry.pixel;
                var style = this._setDrawStyle(_item, i);
                var left = 0;
                if ((0, _Util.isString)(style.offsets.left)) {
                    var leftStr = style.offsets.left;
                    if (leftStr.substr(leftStr.length - 1, 1) == '%') {
                        left = parseInt(parseInt(leftStr) * pixel.width / 100, 10);
                    }
                }
                var x1 = pixel.x - pixel.width / 2 + left;
                var y1 = pixel.y + style.offsets.top;
                if (this._isMouseOver(mouseX, mouseY, x1, y1, pixel.width, pixel.height)) {
                    return {
                        index: i,
                        item: _item
                    };
                }
            }
            return {
                index: -1,
                item: null
            };
        }
    }, {
        key: '_isMouseOver',
        value: function _isMouseOver(mouseX, mouseY, x, y, w, h) {
            return !(mouseX < x || mouseX > x + w || mouseY < y || mouseY > y + h);
        }
    }, {
        key: '_findIndexSelectItem',
        value: function _findIndexSelectItem(item) {
            var index = -1;
            if (item) {
                index = this._selectItem.findIndex(function (val) {
                    var itemCoordinates = item.geometry.coordinates;
                    var valCoordinates = val.geometry.coordinates;
                    return val && itemCoordinates[0] == valCoordinates[0] && itemCoordinates[1] == valCoordinates[1] && val.count == item.count;
                });
            }
            return index;
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this._setState(_OnStateConfig2.default.drawBefore);
            this._clearCanvas();
            this._drawLabel(this._ctx, this._workerData);
            this._setState(_OnStateConfig2.default.drawAfter);
        }
    }, {
        key: '_swopData',
        value: function _swopData(index, item) {
            if (index > -1) {
                this._workerData[index] = this._workerData[this._workerData.length - 1];
                this._workerData[this._workerData.length - 1] = item;
            }
        }
    }, {
        key: '_drawLabel',
        value: function _drawLabel(ctx, pixels) {
            ctx.textBaseline = 'top';
            for (var i = 0; i < pixels.length; i++) {
                var _item2 = pixels[i];
                var pixel = _item2.geometry.pixel;
                ctx.beginPath();
                var style = this._setDrawStyle(_item2, true, i);
                ctx.font = style.font;
                ctx.fillStyle = style.color;

                if (style.shadowColor) {
                    ctx.shadowColor = style.shadowColor || 'transparent';
                    ctx.shadowBlur = style.shadowBlur || 10;
                } else {
                    ctx.shadowColor = 'transparent';
                    ctx.shadowBlur = 0;
                }

                var byteWidth = ctx.measureText(_item2.name).width;
                if (!pixel.width) {
                    pixel['width'] = byteWidth;
                    pixel['height'] = parseInt(style.font);
                }
                var left = 0;

                if ((0, _Util.isString)(style.offsets.left)) {
                    var leftStr = style.offsets.left;
                    if (leftStr.substr(leftStr.length - 1, 1) == '%') {
                        var width = ctx.measureText(_item2.name).width;
                        left = parseInt(parseInt(leftStr) * width / 100, 10);
                    }
                } else {
                    left = style.offsets.left || 0;
                }
                var x = pixel.x - pixel.width / 2 + left;
                var y = pixel.y + style.offsets.top;
                ctx.beginPath();
                ctx.fillText(_item2.name, x, y);
                ctx.fill();
            }
        }
    }, {
        key: 'getLngLatRectangle',
        value: function getLngLatRectangle() {
            return (0, _Util.geoJsonPointRectangle)(this._getTransformData());
        }
    }]);

    return LabelOverlay;
}(_Parameter3.default);

exports.default = LabelOverlay;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasOverlay2 = __webpack_require__(29);

var _CanvasOverlay3 = _interopRequireDefault(_CanvasOverlay2);

var _MaskConfig = __webpack_require__(172);

var _MaskConfig2 = _interopRequireDefault(_MaskConfig);

var _OnStateConfig = __webpack_require__(28);

var _OnStateConfig2 = _interopRequireDefault(_OnStateConfig);

var _Util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MaskOverlay = function (_CanvasOverlay) {
    _inherits(MaskOverlay, _CanvasOverlay);

    function MaskOverlay(ops) {
        _classCallCheck(this, MaskOverlay);

        var _this = _possibleConstructorReturn(this, (MaskOverlay.__proto__ || Object.getPrototypeOf(MaskOverlay)).call(this));

        _this._data = [];
        _this._workerData = [];
        _this._option = {};
        _this._setStyle(_MaskConfig2.default, ops);
        return _this;
    }

    _createClass(MaskOverlay, [{
        key: '_setStyle',
        value: function _setStyle(config, ops, callback) {
            ops = ops || {};
            var option = (0, _Util.merge)(config, ops);
            this._option = option;
            this._eventConfig = option.event;
            this._styleConfig = option.style;
            if (ops.data !== undefined) {
                this.setData(ops.data, callback);
            } else {
                this._map && this.refresh();
                callback && callback(this);
            }
            delete this._option.data;
            this._tMapStyle(option.skin);
        }
    }, {
        key: 'setOptionStyle',
        value: function setOptionStyle(ops, callback) {
            this._setStyle(this._option, ops, callback);
        }
    }, {
        key: 'setData',
        value: function setData(points, callback) {
            if (points) {
                (0, _Util.checkGeoJSON)(points, false, false);
                this._data = points;
            } else {
                this._data = [];
            }

            this._clearData();
            this._map && this._drawMap(callback);
        }
    }, {
        key: 'getRenderData',
        value: function getRenderData() {
            return this._workerData;
        }
    }, {
        key: '_clearData',
        value: function _clearData() {
            (0, _Util.clearPushArray)(this._workerData);
        }
    }, {
        key: '_toDraw',
        value: function _toDraw(callback) {
            this._drawMap(callback);
        }
    }, {
        key: '_drawMap',
        value: function _drawMap(callback) {
            var _this2 = this;

            this._setState(_OnStateConfig2.default.computeBefore);
            var parameter = {
                data: this._getTransformData(),
                enable: false
            };

            this._postMessage('PolygonOverlay.calculatePixel', parameter, function (pixels, margin) {
                _this2._setWorkerData(pixels);
                if (_this2._eventType == 'onmoving') {
                    return;
                }
                _this2._setState(_OnStateConfig2.default.computeAfter);
                _this2._translation(margin.left - _this2._margin.left, margin.top - _this2._margin.top);
                pixels = null, margin = null;
                callback && callback(_this2);
                _this2._emitInit();
            });
        }
    }, {
        key: '_setWorkerData',
        value: function _setWorkerData(val) {
            this._data = [];
            (0, _Util.clearPushArray)(this._workerData, val);
        }
    }, {
        key: '_getTransformData',
        value: function _getTransformData() {
            return this._workerData.length > 0 ? this._workerData : this._data;
        }
    }, {
        key: '_translation',
        value: function _translation(distanceX, distanceY) {
            for (var i = 0; i < this._workerData.length; i++) {
                var geometry = this._workerData[i].geometry;
                var pixels = geometry.pixels;
                if (geometry.type == 'MultiPolygon') {
                    for (var j = 0; j < pixels.length; j++) {
                        var pixelItem = pixels[j];
                        for (var k = 0, len = pixelItem.length; k < len; k++) {
                            var _pixels = pixelItem[k];
                            for (var n = 0; n < _pixels.length; n++) {
                                var pixel = _pixels[n];
                                pixel[0] = pixel[0] + distanceX;
                                pixel[1] = pixel[1] + distanceY;
                            }
                        }
                    }
                } else {
                    for (var _j = 0; _j < pixels.length; _j++) {
                        var _pixelItem = pixels[_j];
                        for (var _k = 0, _len = _pixelItem.length; _k < _len; _k++) {
                            var _pixel = _pixelItem[_k];
                            _pixel[0] = _pixel[0] + distanceX;
                            _pixel[1] = _pixel[1] + distanceY;
                        }
                    }
                }
            }
            this.refresh();
        }
    }, {
        key: 'refresh',
        value: function refresh() {

            this._setState(_OnStateConfig2.default.drawBefore);
            this._clearCanvas();
            this._drawPolygon(this.getRenderData());
            this._setState(_OnStateConfig2.default.drawAfter);
        }
    }, {
        key: '_drawLine',
        value: function _drawLine(pixels, style) {
            for (var j = 0; j < pixels.length; j++) {
                if (j == 0) {
                    this._ctx.save();
                    this._ctx.beginPath();
                    var pixelItem = pixels[j];
                    this._drawData(pixelItem);
                    this._ctx.clip();
                    this._clearCanvas();
                    if (style.borderColor) {
                        this._ctx.strokeStyle = style.borderColor;
                    }
                    if (style.borderWidth) {
                        this._ctx.lineWidth = style.borderWidth;
                    }
                    this._ctx.stroke();
                    this._ctx.restore();
                    pixelItem = null;
                }
            }
        }
    }, {
        key: '_drawPolygon',
        value: function _drawPolygon(data) {
            var style = this._styleConfig;
            this._ctx.lineCap = 'round';
            this._ctx.lineJoin = 'round';
            this._ctx.miterLimit = 4;
            this._ctx.shadowColor = style.shadowColor || 'transparent';
            this._ctx.shadowBlur = style.shadowBlur || 10;
            this._ctx.shadowOffsetX = 0;
            this._ctx.shadowOffsetY = 0;
            this._ctx.fillStyle = style.backgroundColor;
            var size = this._map.getSize();
            this._ctx.fillRect(0, 0, size.width, size.height);
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var geometry = item.geometry;
                var pixels = geometry.pixels;
                this._ctx.beginPath();
                if (geometry.type == 'MultiPolygon') {
                    for (var k = 0; k < pixels.length; k++) {
                        this._drawLine(pixels[k], style);
                    }
                } else {
                    this._drawLine(pixels, style);
                }
            }
            this._ctx.closePath();
        }
    }, {
        key: '_drawData',
        value: function _drawData(pixelItem) {
            if (pixelItem.length == 0) return;
            var pixel = pixelItem[0];
            this._ctx.moveTo(pixel[0], pixel[1]);
            for (var k = 1, len = pixelItem.length; k < len; k++) {
                var item = pixelItem[k];
                if (pixel[0] != item[0] && pixel[1] != item[1]) {
                    this._ctx.lineTo(pixelItem[k][0], pixelItem[k][1]);
                    pixel = item;
                }
            }
        }
    }, {
        key: 'getLngLatRectangle',
        value: function getLngLatRectangle() {
            return (0, _Util.geoJsonPolygonRectangle)(this._getTransformData());
        }
    }]);

    return MaskOverlay;
}(_CanvasOverlay3.default);

exports.default = MaskOverlay;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MultiOverlay2 = __webpack_require__(107);

var _MultiOverlay3 = _interopRequireDefault(_MultiOverlay2);

var _PointOverlay = __webpack_require__(103);

var _PointOverlay2 = _interopRequireDefault(_PointOverlay);

var _LineStringOverlay = __webpack_require__(102);

var _LineStringOverlay2 = _interopRequireDefault(_LineStringOverlay);

var _LineStringAnimationOverlay = __webpack_require__(101);

var _LineStringAnimationOverlay2 = _interopRequireDefault(_LineStringAnimationOverlay);

var _MoveLineConfig = __webpack_require__(173);

var _MoveLineConfig2 = _interopRequireDefault(_MoveLineConfig);

var _Util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MoveLineOverlay = function (_MultiOverlay) {
    _inherits(MoveLineOverlay, _MultiOverlay);

    function MoveLineOverlay(opts) {
        _classCallCheck(this, MoveLineOverlay);

        var _this = _possibleConstructorReturn(this, (MoveLineOverlay.__proto__ || Object.getPrototypeOf(MoveLineOverlay)).call(this));

        _this._isDispose = false;
        _this._data = opts.data || [];
        _this._opts = (0, _Util.merge)(_MoveLineConfig2.default, opts);
        _this._PointOverlay = _this._creatPointOverlay(_this._opts);
        _this._LineStringOverlay = _this._creatLineStringOverlay(_this._opts);
        _this._LineStringAnimationOverlay = _this._creatLineStringAnimationOverlay(_this._opts);
        return _this;
    }

    _createClass(MoveLineOverlay, [{
        key: '_init',
        value: function _init(map) {
            map.addOverlay(this._LineStringOverlay);
            map.addOverlay(this._LineStringAnimationOverlay);
            map.addOverlay(this._PointOverlay);
        }
    }, {
        key: 'setOptionStyle',
        value: function setOptionStyle(opts) {
            if (!opts) return;
            this._opts = (0, _Util.merge)(this._opts, opts);
            opts.style.point.data && delete opts.style.point.data;
            opts.style.point.line && delete opts.style.point.line;
            opts.style.point.lineAnimation && delete opts.style.point.lineAnimation;
            this._PointOverlay.setOptionStyle(opts.style.point);
            this._LineStringOverlay.setOptionStyle(opts.style.line);
            this._LineStringAnimationOverlay.setOptionStyle(opts.style.lineAnimation);

            if (opts.data !== undefined) {
                this.setData(opts.data);
            }
        }
    }, {
        key: 'setZIndex',
        value: function setZIndex(zIndex) {
            this._zIndex = zIndex;

            this._PointOverlay && this._PointOverlay.setZIndex(this._zIndex);
            this._LineStringOverlay && this._LineStringOverlay.setZIndex(this._zIndex + 2);
            this._LineStringAnimationOverlay && this._LineStringAnimationOverlay.setZIndex(this._zIndex + 4);
        }
    }, {
        key: 'setData',
        value: function setData(data) {
            if (data) {
                this._data = data;
            } else {
                this._data = [];
            }

            this._PointOverlay.setData(this._getPointData());
            this._LineStringOverlay.setData(this._getLineStringData());
            this._LineStringAnimationOverlay.setData(this._getLineStringData());
        }
    }, {
        key: '_findIndex',
        value: function _findIndex(data, name) {
            return data.findIndex(function (item) {
                return item.name == name;
            });
        }
    }, {
        key: '_getPointData',
        value: function _getPointData() {
            var _this2 = this;

            var data = [];
            this._data.forEach(function (item) {
                if (_this2._findIndex(data, item.from.name) == -1) {
                    data.push({
                        name: item.from.name,
                        count: item.count,
                        geometry: {
                            type: 'Point',
                            coordinates: item.from.coordinates
                        },
                        style: {}
                    });
                }
                if (_this2._findIndex(data, item.to.name) == -1) {
                    data.push({
                        name: item.to.name,
                        count: item.count,
                        geometry: {
                            type: 'Point',
                            coordinates: item.to.coordinates
                        },
                        style: {}
                    });
                }
            });
            return data;
        }
    }, {
        key: '_getLineStringData',
        value: function _getLineStringData() {
            return this._data.map(function (item) {
                return {
                    geometry: {
                        type: 'LineString',
                        coordinates: [item.from.coordinates, item.to.coordinates]
                    },
                    properties: item,
                    count: item.count
                };
            });
        }
    }, {
        key: '_creatPointOverlay',
        value: function _creatPointOverlay(opts) {

            return new _PointOverlay2.default(_extends({}, opts.style.point, {
                data: this._getPointData(),
                zIndex: this._zIndex + 1
            }));
        }
    }, {
        key: '_creatLineStringOverlay',
        value: function _creatLineStringOverlay(opts) {

            return new _LineStringOverlay2.default(_extends({}, opts.style.line, {
                data: this._getLineStringData(),
                zIndex: this._zIndex + 2
            }));
        }
    }, {
        key: '_creatLineStringAnimationOverlay',
        value: function _creatLineStringAnimationOverlay(opts) {

            return new _LineStringAnimationOverlay2.default(_extends({}, opts.style.lineAnimation, {
                data: this._getLineStringData(),
                zIndex: this._zIndex + 3
            }));
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this._PointOverlay.dispose();
            this._LineStringOverlay.dispose();
            this._LineStringAnimationOverlay.dispose();
            var me = this;
            for (var key in me) {
                if (!(0, _Util.isFunction)(me[key])) {
                    me[key] = null;
                }
            }
            me._isDispose = true;
            me = null;
        }
    }, {
        key: 'getLngLatRectangle',
        value: function getLngLatRectangle() {
            return this._PointOverlay.getLngLatRectangle();
        }
    }]);

    return MoveLineOverlay;
}(_MultiOverlay3.default);

exports.default = MoveLineOverlay;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasOverlay2 = __webpack_require__(29);

var _CanvasOverlay3 = _interopRequireDefault(_CanvasOverlay2);

var _Util = __webpack_require__(5);

var _PointAnimation = __webpack_require__(174);

var _PointAnimation2 = _interopRequireDefault(_PointAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Marker = function () {
    function Marker(opts, data, map) {
        _classCallCheck(this, Marker);

        this.city = opts.name;
        this.location = new BMap.Point(data.geometry.coordinates[0], data.geometry.coordinates[1]);
        this.pixel = map.pointToPixel(this.location);
        this.color = opts.color;
        this.speed = opts.speed;
        this.radius = 0;
        this.size = opts.size;
    }

    _createClass(Marker, [{
        key: 'draw',
        value: function draw(context) {
            var pixel = this.pixel;
            context.save();
            context.beginPath();
            context.strokeStyle = this.color;
            context.moveTo(pixel.x + pixel.radius, pixel.y);
            context.arc(pixel.x, pixel.y, this.radius, 0, Math.PI * 2);
            context.stroke();
            context.closePath();
            context.restore();
            this.radius += this.speed;
            if (this.radius > this.size) {
                this.radius = 0;
            }
        }
    }]);

    return Marker;
}();

var PointAnimationOverlay = function (_CanvasOverlay) {
    _inherits(PointAnimationOverlay, _CanvasOverlay);

    function PointAnimationOverlay(ops) {
        _classCallCheck(this, PointAnimationOverlay);

        var _this = _possibleConstructorReturn(this, (PointAnimationOverlay.__proto__ || Object.getPrototypeOf(PointAnimationOverlay)).call(this));

        _this._data = [];
        _this._styleConfig = null;
        _this._markers = [];
        _this._render = _this._render.bind(_this);
        _this.setOptionStyle(ops);
        return _this;
    }

    _createClass(PointAnimationOverlay, [{
        key: '_canvasInit',
        value: function _canvasInit() {
            this._addMarker();
            var now = void 0,
                me = this;
            var then = Date.now();
            var interval = 1000 / 25;
            var delta = void 0;
            var _render = this._render;
            (function drawFrame() {
                !me.isDispose && requestAnimationFrame(drawFrame);
                now = Date.now();
                delta = now - then;
                if (delta > interval) {
                    then = now - delta % interval;
                    _render();
                }
            })();
        }
    }, {
        key: 'setOptionStyle',
        value: function setOptionStyle(ops, callback) {
            if (!ops) return;
            var option = (0, _Util.merge)(_PointAnimation2.default, ops);
            this._styleConfig = option.style;
            this._tMapStyle(option.skin);
            if (ops.data === null) {
                option.data = [];
            } else if (ops.data === undefined) {
                option.data = this._data;
            }
            this.setData(option.data, callback);
        }
    }, {
        key: 'setData',
        value: function setData(points, callback) {
            if (points) {
                if (!(0, _Util.isArray)(points)) {
                    throw new TypeError('inMap: data must be a Array');
                }
                this._data = points;
            } else {
                this._data = [];
            }
            this._map && this._addMarker();
            callback && callback();
            this._emitInit();
        }
    }, {
        key: '_translation',
        value: function _translation(distanceX, distanceY) {

            for (var i = 0; i < this._markers.length; i++) {
                var pixel = this._markers[i].pixel;
                pixel.x = pixel.x + distanceX;
                pixel.y = pixel.y + distanceY;
            }
        }
    }, {
        key: '_addMarker',
        value: function _addMarker() {
            this._markers = [];
            for (var i = 0; i < this._data.length; i++) {
                var style = (0, _Util.merge)(this._styleConfig, this._data[i].style || {});
                this._markers.push(new Marker(style, this._data[i], this._map));
            }
        }
    }, {
        key: '_toDraw',
        value: function _toDraw() {
            this._addMarker();
            this._canvasResize();
        }
    }, {
        key: '_render',
        value: function _render() {
            var ctx = this._ctx;
            if (!ctx) {
                return;
            }
            if (!this._animationFlag) {
                this._clearCanvas();
                return;
            }

            var size = this._map.getSize();
            ctx.fillStyle = 'rgba(0,0,0,.95)';
            var prev = ctx.globalCompositeOperation;
            ctx.globalCompositeOperation = 'destination-in';

            ctx.fillRect(0, 0, size.width, size.height);
            ctx.globalCompositeOperation = prev;

            for (var i = 0; i < this._markers.length; i++) {
                var marker = this._markers[i];
                marker.draw(ctx);
            }
        }
    }, {
        key: 'getLngLatRectangle',
        value: function getLngLatRectangle() {
            return (0, _Util.geoJsonPointRectangle)(this._data);
        }
    }]);

    return PointAnimationOverlay;
}(_CanvasOverlay3.default);

exports.default = PointAnimationOverlay;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasOverlay2 = __webpack_require__(29);

var _CanvasOverlay3 = _interopRequireDefault(_CanvasOverlay2);

var _PolygonOverlay = __webpack_require__(104);

var _PolygonOverlay2 = _interopRequireDefault(_PolygonOverlay);

var _PointDragOverlay = __webpack_require__(184);

var _PointDragOverlay2 = _interopRequireDefault(_PointDragOverlay);

var _PolygonEditorConfig = __webpack_require__(178);

var _PolygonEditorConfig2 = _interopRequireDefault(_PolygonEditorConfig);

var _Util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PolygonEditorOverlay = function (_CanvasOverlay) {
    _inherits(PolygonEditorOverlay, _CanvasOverlay);

    function PolygonEditorOverlay(opts) {
        _classCallCheck(this, PolygonEditorOverlay);

        var _this = _possibleConstructorReturn(this, (PolygonEditorOverlay.__proto__ || Object.getPrototypeOf(PolygonEditorOverlay)).call(this, opts));

        _this._opts = (0, _Util.merge)(_PolygonEditorConfig2.default, opts);
        _this._eventConfig = _this._opts.event;
        _this._dragEndVirtual = _this._dragEndVirtual.bind(_this);
        _this._dragEndPoint = _this._dragEndPoint.bind(_this);
        _this._draggingPoint = _this._draggingPoint.bind(_this);
        _this._draggingVirtual = _this._draggingVirtual.bind(_this);
        _this._dblclickPoint = _this._dblclickPoint.bind(_this);
        _this._dblclickFun = _this._dblclickFun.bind(_this);
        _this._clickFun = _this._clickFun.bind(_this);
        _this._mousemoveFun = _this._mousemoveFun.bind(_this);
        _this._rightClick = _this._rightClick.bind(_this);
        _this._polygonOverlay = null;
        _this._pointOverlay = null;
        _this._virtualPointOverlay = null;
        _this._workerData = [];
        _this._pointDataGroup = [];
        _this._draggingPointTemp = null;
        _this._draggingVirtualTemp = null;
        _this._createTempCache = null;
        _this._createIndex = -1;
        _this.isCreate = false;
        _this._subscriptions = {
            onInit: [],
            isInit: true,
            onMouseClick: [],
            onMouseOver: [],
            onMouseLeave: [],
            onCreated: [],
            onChange: [],
            onDelete: []
        };
        _this._bindEmit();
        return _this;
    }

    _createClass(PolygonEditorOverlay, [{
        key: 'setZIndex',
        value: function setZIndex(zIndex) {
            this._zIndex = zIndex;
            if (this._container) this._container.style.zIndex = this._zIndex;

            this._polygonOverlay && this._polygonOverlay.setZIndex(this._zIndex + 1);
            this._pointOverlay && this._pointOverlay.setZIndex(this._zIndex + 2);
            this._virtualPointOverlay && this._virtualPointOverlay.setZIndex(this._zIndex + 4);
        }
    }, {
        key: '_bindEmit',
        value: function _bindEmit() {
            for (var name in this._eventConfig) {
                var fun = this._eventConfig[name];
                if ((0, _Util.isFunction)(fun)) {
                    this.on(name, fun);
                }
            }
        }
    }, {
        key: '_canvasInit',
        value: function _canvasInit() {
            var _this2 = this;

            this._polygonOverlay = new _PolygonOverlay2.default({
                checkDataType: {
                    name: false,
                    count: false
                },
                style: this._opts.style.polygon,
                data: this._opts.data ? [this._toMultiPolygon(this._opts.data)] : [],
                event: {
                    emitEvent: false,
                    onState: function onState(state) {
                        if (state == 3) {
                            _this2._workerData = _this2._polygonOverlay.getRenderData();
                            if (_this2._workerData.length == 0) {
                                _this2._workerData.push({
                                    geometry: {
                                        type: 'MultiPolygon',
                                        coordinates: [],
                                        pixels: [],
                                        labelPixels: []

                                    }
                                });
                            }
                            if (_this2._opts.style.isEdit && _this2.isCreate == false) {
                                _this2._setPointData();
                                _this2._setVirtualPointData();
                            } else {
                                _this2._clearPointOverlay();
                            }
                            _this2._emitInit();
                        }
                    },
                    onMouseClick: function onMouseClick() {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key];
                        }

                        if (!_this2.isCreate) {
                            _this2._emit.apply(_this2, ['onMouseClick'].concat(args));
                        }
                    },
                    onMouseOver: function onMouseOver() {
                        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            args[_key2] = arguments[_key2];
                        }

                        _this2._emit.apply(_this2, ['onMouseOver'].concat(args));
                    },
                    onMouseLeave: function onMouseLeave() {
                        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                            args[_key3] = arguments[_key3];
                        }

                        _this2._emit.apply(_this2, ['onMouseLeave'].concat(args));
                    }
                },
                zIndex: this._zIndex + 1
            });

            this._map.addOverlay(this._polygonOverlay);

            this._pointOverlay = new _PointDragOverlay2.default({
                style: _extends({}, this._opts.style.point, {
                    isDrag: true
                }),
                event: {
                    emitEvent: false,
                    onDragEnd: this._dragEndPoint,
                    onDragging: this._draggingPoint,
                    onDblclick: this._dblclickPoint
                },
                zIndex: this._zIndex + 2
            });
            this._map.addOverlay(this._pointOverlay);

            this._virtualPointOverlay = new _PointDragOverlay2.default({
                style: _extends({}, this._opts.style.virtualPoint, {
                    isDrag: true
                }),
                event: {
                    emitEvent: false,
                    onDragEnd: this._dragEndVirtual,
                    onDragging: this._draggingVirtual
                },
                zIndex: this._zIndex + 4
            });
            this._map.addOverlay(this._virtualPointOverlay);
            this._map.addEventListener('rightclick', this._rightClick);
        }
    }, {
        key: 'setOptionStyle',
        value: function setOptionStyle(opts, callback) {

            if (!opts) return;
            if (opts.data === undefined) {
                delete opts.data;
            }
            this._opts = (0, _Util.merge)(this._opts, opts);
            this._eventConfig = this._opts.event;
            this._polygonOverlay && this._polygonOverlay.setOptionStyle({
                style: this._opts.style.polygon
            });

            this._pointOverlay && this._pointOverlay.setOptionStyle({
                style: _extends({}, this._opts.style.point, {
                    isDrag: true
                })
            });
            this._virtualPointOverlay && this._virtualPointOverlay.setOptionStyle({
                style: _extends({}, this._opts.style.virtualPoint, {
                    isDrag: true
                })
            });
            if (opts.data !== undefined) {
                this.setPath(opts.data, callback);
            }
        }
    }, {
        key: '_workerDataClear',
        value: function _workerDataClear() {
            this._workerData = [{
                geometry: {
                    type: 'MultiPolygon',
                    coordinates: [],
                    pixels: [],
                    labelPixels: []

                }
            }];
        }
    }, {
        key: 'create',
        value: function create() {

            this.isCreate = true;
            this._workerDataClear();
            this._createTempCache = null;
            this._createIndex = -1;
            if (this._map) {
                this._polygonOverlay._setWorkerData(this._workerData);
                this._polygonOverlay.refresh();
                this._map.removeEventListener('click', this._clickFun);
                this._map.removeEventListener('dblclick', this._dblclickFun);
                this._map.removeEventListener('mousemove', this._mousemoveFun);
                this._map.addEventListener('click', this._clickFun);
                this._map.addEventListener('dblclick', this._dblclickFun);
                this._map.addEventListener('mousemove', this._mousemoveFun);
            }
        }
    }, {
        key: 'setPath',
        value: function setPath(data, callback) {
            this.isCreate = false;
            this._opts.data = data;
            this._workerDataClear();
            this._pointDataGroup = [];
            this._draggingPointTemp = null;
            this._draggingVirtualTemp = null;
            this._createTempCache = null;
            this._createIndex = -1;
            this._polygonOverlay && this._polygonOverlay.setData(this._opts.data ? [this._toMultiPolygon(data)] : [], callback);
        }
    }, {
        key: 'enableEditing',
        value: function enableEditing() {
            this.isCreate = false;
            this._opts.style.isEdit = true;
            this._map && this._map.removeEventListener('click', this._clickFun);
            this._map && this._map.removeEventListener('dblclick', this._dblclickFun);
            this._map && this._map.removeEventListener('mousemove', this._mousemoveFun);
            this._setPointData();
            this._setVirtualPointData();
        }
    }, {
        key: 'disableEditing',
        value: function disableEditing() {
            this.isCreate = false;
            this._opts.style.isEdit = false;
            this._clearPointOverlay();
        }
    }, {
        key: 'translationPixel',
        value: function translationPixel(x, y) {
            if (this._workerData.length > 0) {
                for (var i = 0; i < this._workerData.length; i++) {
                    var geometry = this._workerData[i].geometry;
                    var pixels = geometry.pixels;
                    var coordinates = geometry.coordinates;
                    if (geometry.type == 'MultiPolygon') {
                        for (var j = 0; j < pixels.length; j++) {
                            var pixelItem = pixels[j];
                            for (var k = 0, len = pixelItem.length; k < len; k++) {
                                var _pixels = pixelItem[k];
                                for (var n = 0; n < _pixels.length; n++) {
                                    var pixel = _pixels[n];
                                    var point = coordinates[j][k][n];
                                    pixel[0] = pixel[0] + x;
                                    pixel[1] = pixel[1] + y;

                                    var latlng = this._map.overlayPixelToPoint({
                                        x: pixel[0],
                                        y: pixel[1]
                                    });
                                    point[0] = latlng.lng;
                                    point[1] = latlng.lat;
                                }
                            }
                        }
                    }
                }
                this._polygonOverlay && this._polygonOverlay.refresh();
                this._emit('onChange', 'translationPixel', null, this);
            }
        }
    }, {
        key: '_removeMoveEvent',
        value: function _removeMoveEvent() {
            if (!this._map) return;
            this._map.removeEventListener('click', this._clickFun);
            this._map.removeEventListener('dblclick', this._dblclickFun);
            this._map.removeEventListener('mousemove', this._mousemoveFun);
            this._map.removeEventListener('rightclick', this._rightClick);
        }
    }, {
        key: '_TDispose',
        value: function _TDispose() {
            this._removeMoveEvent();
            this._map.removeOverlay(this._polygonOverlay);
            this._map.removeOverlay(this._pointOverlay);
            this._map.removeOverlay(this._virtualPointOverlay);
            this._polygonOverlay.dispose();
            this._pointOverlay.dispose();
            this._virtualPointOverlay.dispose();
        }
    }, {
        key: 'getPath',
        value: function getPath() {
            if (this._workerData.length > 0) {
                var coordinates = JSON.parse(JSON.stringify(this._workerData[0].geometry.coordinates));
                if (coordinates.length > 0) {
                    return {
                        geometry: {
                            type: 'MultiPolygon',
                            coordinates: coordinates
                        }
                    };
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
    }, {
        key: '_toMultiPolygon',
        value: function _toMultiPolygon(data) {
            try {
                if (data && data.geometry.type == 'Polygon') {
                    data.geometry.type = 'MultiPolygon';
                    data.geometry.coordinates = [data.geometry.coordinates];
                }
            } catch (error) {
                throw new TypeError('inMap :data must be is \'MultiPolygon\' or \'Polygon\'');
            }
            return data;
        }
    }, {
        key: '_clickFun',
        value: function _clickFun(event) {
            if (!this.isCreate) return;

            if (!this._createTempCache) {
                this._createIndex++;
                this._createTempCache = {
                    coordinates: [[event.point.lng, event.point.lat]],
                    pixels: [[event.offsetX, event.offsetY]]
                };
            }
            var geoJSON = this._workerData[0];

            var currentCoordinate = geoJSON.geometry.coordinates[this._createIndex];
            var currentPixels = geoJSON.geometry.pixels[this._createIndex];

            if (!currentCoordinate) {
                geoJSON.geometry.coordinates.push([[]]);
                geoJSON.geometry.pixels.push([[]]);

                currentCoordinate = geoJSON.geometry.coordinates[this._createIndex];
                currentPixels = geoJSON.geometry.pixels[this._createIndex];
            }

            if (currentPixels[0].length > 0) {
                var pixels = currentPixels[0],
                    len = pixels.length,
                    pixel = pixels[len - 1];
                if (pixel[0] == event.offsetX && pixel[1] == event.offsetY) {
                    this._createTempCache.coordinates.push([event.point.lng, event.point.lat]);
                    this._createTempCache.pixels.push([event.offsetX, event.offsetY]);
                    return;
                }
            }

            currentCoordinate[0].push([event.point.lng, event.point.lat]);
            currentPixels[0].push([event.offsetX, event.offsetY]);

            this._polygonOverlay.refresh();
        }
    }, {
        key: '_dblclickFun',
        value: function _dblclickFun() {
            if (!this.isCreate) {
                return;
            }

            var geoJSON = this._polygonOverlay._workerData[0];

            var currentCoordinate = geoJSON.geometry.coordinates[this._createIndex];
            if (currentCoordinate[0].length <= 2) {
                geoJSON.geometry.coordinates.splice(this._createIndex, 1);
                geoJSON.geometry.pixels.splice(this._createIndex, 1);

                this._polygonOverlay.refresh();

                this._createIndex--;
            } else {

                var index = this._isPolyContainsIndex(currentCoordinate[0], geoJSON, this._createIndex);
                if (index > -1) {
                    geoJSON.geometry.coordinates[index].push(currentCoordinate[0]);
                    geoJSON.geometry.pixels[index].push(geoJSON.geometry.pixels[this._createIndex][0]);

                    geoJSON.geometry.coordinates.splice(this._createIndex, 1);
                    geoJSON.geometry.pixels.splice(this._createIndex, 1);
                    this._createIndex--;

                    this._polygonOverlay.refresh();
                }
                this._emit('onCreated', event, this);
            }

            this._createTempCache = null;
        }
    }, {
        key: '_isPolyContainsIndex',
        value: function _isPolyContainsIndex(lngLats, polygon, notIndex) {
            var coordinates = polygon.geometry.coordinates;
            for (var j = 0, len = coordinates.length; j < len; j++) {
                if (j != notIndex) {
                    var item = coordinates[j][0];

                    var lngs = [],
                        lats = [];
                    for (var k = 0; k < item.length; k++) {
                        lngs.push(parseFloat(item[k][0]));
                        lats.push(parseFloat(item[k][1]));
                    }
                    var result = false;
                    for (var i = 0; i < lngLats.length; i++) {
                        var lng = lngLats[i][0],
                            lat = lngLats[i][1];
                        result = (0, _Util.isPolyContains)(lats, lngs, lng, lat);
                        if (result) {
                            continue;
                        } else {
                            break;
                        }
                    }
                    if (result) return j;
                }
            }
            return -1;
        }
    }, {
        key: '_rightClick',
        value: function _rightClick(event) {
            if (this.isCreate || !this._opts.style.isDel || !this._opts.style.isEdit) return;
            var coordinates = this._workerData[0].geometry.coordinates;
            for (var j = 0, len = coordinates.length; j < len; j++) {

                var item = coordinates[j][0];

                var lngs = [],
                    lats = [];
                for (var k = 0; k < item.length; k++) {
                    lngs.push(parseFloat(item[k][0]));
                    lats.push(parseFloat(item[k][1]));
                }

                if ((0, _Util.isPolyContains)(lats, lngs, event.point.lng, event.point.lat)) {
                    coordinates.splice(j, 1);
                    this._workerData[0].geometry.pixels.splice(j, 1);
                    this._polygonOverlay.refresh();

                    this._emit('onDelete', event, this);
                    break;
                }
            }
        }
    }, {
        key: '_mousemoveFun',
        value: function _mousemoveFun(event) {

            if (!this.isCreate || !this._createTempCache) return;
            var data = this._polygonOverlay._workerData[0];
            var currentCoordinate = data.geometry.coordinates[this._createIndex];
            var currentPixels = data.geometry.pixels[this._createIndex];

            currentCoordinate[0] = this._createTempCache.coordinates.concat([[event.point.lng, event.point.lat]]);
            currentPixels[0] = this._createTempCache.pixels.concat([[event.offsetX, event.offsetY]]);

            this._polygonOverlay._selectItem = [];
            this._polygonOverlay.refresh();
        }
    }, {
        key: '_clearPointOverlay',
        value: function _clearPointOverlay() {
            if (!this._pointOverlay) return;
            this._pointOverlay._setWorkerData([]);
            this._pointOverlay.refresh();
            this._virtualPointOverlay._setWorkerData([]);
            this._virtualPointOverlay.refresh();
        }
    }, {
        key: '_setVirtualPointData',
        value: function _setVirtualPointData() {

            var virtualData = [];
            for (var i = 0; i < this._pointDataGroup.length; i++) {
                var data = this._pointDataGroup[i];
                if (data.length > 0) {
                    data = data.concat([data[0]]);
                }

                for (var j = 0, len = data.length; j < len; j++) {

                    if (j + 1 > data.length - 1) {
                        break;
                    }

                    var geometry = data[j].geometry,
                        nextGeometry = data[j + 1].geometry;
                    var item = {
                        geometry: {
                            type: 'Point',
                            coordinates: [(geometry.coordinates[0] + nextGeometry.coordinates[0]) / 2, (geometry.coordinates[1] + nextGeometry.coordinates[1]) / 2],
                            pixel: {
                                x: (geometry.pixel.x + nextGeometry.pixel.x) / 2,
                                y: (geometry.pixel.y + nextGeometry.pixel.y) / 2
                            }
                        },
                        pre: {
                            index: i,
                            i: j
                        },
                        next: {
                            index: i,
                            i: j < len - 2 ? j + 1 : 0
                        }
                    };
                    virtualData.push(item);
                }
            }
            if (!this._virtualPointOverlay) return;
            this._virtualPointOverlay._setWorkerData(virtualData);
            this._virtualPointOverlay.refresh();
        }
    }, {
        key: '_setPointData',
        value: function _setPointData() {
            this._pointDataGroup = [];
            for (var i = 0; i < this._workerData.length; i++) {
                var item = this._workerData[i];
                var type = item.geometry.type;
                if (type == 'MultiPolygon') {
                    for (var k = 0; k < item.geometry.coordinates.length; k++) {
                        this._AndCoordinates(item.geometry.coordinates[k], item.geometry.pixels[k], this._pointDataGroup, i, k);
                    }
                }
            }
            var pointData = [];
            for (var _i = 0; _i < this._pointDataGroup.length; _i++) {
                pointData = pointData.concat(this._pointDataGroup[_i]);
            }
            if (!this._pointOverlay) return;

            this._pointOverlay._setWorkerData(pointData);
            this._pointOverlay.refresh();
        }
    }, {
        key: '_AndCoordinates',
        value: function _AndCoordinates(coordinates, pixels, target, ArrIndex, coordinatesIndex) {

            for (var i = 0; i < coordinates.length; i++) {
                var points = coordinates[i];
                var arr = [];
                for (var j = 0; j < points.length; j++) {
                    var point = points[j];
                    var pixel = pixels[i][j];
                    arr.push({
                        geometry: {
                            type: 'Point',
                            coordinates: [point[0], point[1]],
                            pixel: {
                                x: pixel[0],
                                y: pixel[1]
                            }
                        },
                        _index: {
                            ArrIndex: ArrIndex,
                            coordinatesIndex: coordinatesIndex,
                            surround: i,
                            i: j
                        }
                    });
                }
                target.push(arr);
            }
        }
    }, {
        key: '_dragEndVirtual',
        value: function _dragEndVirtual(item, index, event) {
            var key = this._pointOverlay._workerData[index]._index;
            this._draggingPointTemp = null;
            this._draggingVirtualTemp = null;
            this._updatePolygon(item, key, 'insert', event);
            this._clearCanvas();
        }
    }, {
        key: '_dragEndPoint',
        value: function _dragEndPoint(item, index, event) {
            var key = this._pointOverlay._workerData[index]._index;
            this._draggingPointTemp = null;
            this._draggingVirtualTemp = null;
            this._clearCanvas();
            this._updatePolygon(item, key, 'update', event);
        }
    }, {
        key: '_dblclickPoint',
        value: function _dblclickPoint(item, index, event) {
            var key = this._pointOverlay._workerData[index]._index;
            this._clearCanvas();
            this._updatePolygon(item, key, 'delete', event);
        }
    }, {
        key: '_updatePolygon',
        value: function _updatePolygon(item, key, action, event) {

            var findGeometry = this._workerData[key.ArrIndex].geometry;

            if (findGeometry.type == 'MultiPolygon') {
                var latLngs = findGeometry.coordinates[key.coordinatesIndex][key.surround];
                var pixels = findGeometry.pixels[key.coordinatesIndex][key.surround];
                switch (action) {
                    case 'insert':
                        latLngs.splice(key.i + 1, 0, item.geometry.coordinates);
                        pixels.splice(key.i + 1, 0, [item.geometry.pixel.x, item.geometry.pixel.y]);
                        break;
                    case 'update':
                        latLngs.splice(key.i, 1, item.geometry.coordinates);
                        pixels.splice(key.i, 1, [item.geometry.pixel.x, item.geometry.pixel.y]);
                        break;
                    case 'delete':
                        latLngs.splice(key.i, 1);
                        pixels.splice(key.i, 1);
                        break;
                }

                this._polygonOverlay.refresh();
                this._setPointData();
                this._setVirtualPointData();

                this._emit('onChange', action, event, this);
            }
        }
    }, {
        key: '_findPointDataGroup',
        value: function _findPointDataGroup(data, item) {
            for (var i = 0; i < data.length; i++) {
                var points = data[i];
                for (var index = 0; index < points.length; index++) {
                    if (item == points[index]) {
                        return {
                            i: i,
                            index: index,
                            points: points
                        };
                    }
                }
            }

            return {
                index: -1,
                points: null
            };
        }
    }, {
        key: '_draggingPoint',
        value: function _draggingPoint(item) {

            if (!this._draggingPointTemp) {
                this._draggingPointTemp = this._findPointDataGroup(this._pointDataGroup, item);
            }

            var index = this._draggingPointTemp.index,
                virtualLine = [],
                data = this._draggingPointTemp.points || [],
                len = data.length;
            if (data.length > 0) {
                if (index == 0) {
                    virtualLine.push(data[len - 1]);
                } else {
                    virtualLine.push(data[index - 1]);
                }

                virtualLine.push(data[index]);

                if (index == len - 1) {
                    virtualLine.push(data[0]);
                } else {
                    virtualLine.push(data[index + 1]);
                }
            }

            this._drawLine(virtualLine);
            this._setVirtualPointData();
        }
    }, {
        key: '_draggingVirtual',
        value: function _draggingVirtual(item) {
            var preItem = this._pointDataGroup[item.pre.index][item.pre.i];
            var nextItem = this._pointDataGroup[item.next.index][item.next.i];
            var virtualLine = [preItem, item, nextItem];
            this._drawLine(virtualLine);
        }
    }, {
        key: '_drawLine',
        value: function _drawLine(data) {
            this._clearCanvas();
            this._ctx.beginPath();
            this._ctx.save();
            this._ctx.lineWidth = 4;
            this._ctx.strokeStyle = 'red';
            this._ctx.setLineDash([10, 5]);
            for (var i = 0; i < data.length; i++) {

                var geometry = data[i].geometry;
                if (i == 0) {
                    this._ctx.moveTo(geometry.pixel.x, geometry.pixel.y);
                } else {
                    this._ctx.lineTo(geometry.pixel.x, geometry.pixel.y);
                }
            }
            this._ctx.stroke();
            this._ctx.restore();
        }
    }, {
        key: 'getLngLatRectangle',
        value: function getLngLatRectangle() {
            return this._polygonOverlay.getLngLatRectangle();
        }
    }]);

    return PolygonEditorOverlay;
}(_CanvasOverlay3.default);

exports.default = PolygonEditorOverlay;

/***/ }),
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Throttle = function () {
    function Throttle(options) {
        _classCallCheck(this, Throttle);

        this.options = {
            duration: 200
        };
        this.listeners = {};
        this._timer = null;

        this.startTime = 0;
        this.endTime = 0;
        this._trigger = this.trigger.bind(this);

        options && Object.assign(this.options, options);
    }

    _createClass(Throttle, [{
        key: "initTime",
        value: function initTime() {
            this.startTime = this.startTime === 0 ? Date.now() : this.endTime;
            this.endTime = Date.now();
            if (this.endTime - this.startTime < this.options.duration) {
                this._timer && clearTimeout(this._timer);
                this._timer = setTimeout(this._trigger, this.options.duration);
            } else {
                this._trigger();
            }
        }
    }, {
        key: "on",
        value: function on(name, callback) {
            if (!this.listeners[name]) {
                this.listeners[name] = callback;
            }
        }
    }, {
        key: "trigger",
        value: function trigger() {
            var listeners = this.listeners;
            for (var i in listeners) {
                if (listeners[i]) {
                    listeners[i]();
                }
            }
        }
    }, {
        key: "dispose",
        value: function dispose() {
            clearTimeout(this._timer);
            var listeners = this.listeners;
            for (var i in listeners) {
                if (listeners[i]) {
                    delete listeners[i];
                }
            }
        }
    }, {
        key: "throttleEvent",
        value: function throttleEvent() {
            this.initTime();
        }
    }]);

    return Throttle;
}();

exports.default = Throttle;

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    tooltip: {
        show: true,
        customClass: 'inmap-tooltip-black',
        formatter: '{count}',
        offsets: {
            top: 5,
            left: 12
        }
    },
    legend: {
        show: true,
        title: '图例'
    },
    style: {
        type: 'sum',
        colors: ['rgba(31,98,1,1)', 'rgba(95,154,4,1)', 'rgba(139,227,7,1)', 'rgba(218,134,9,1)', 'rgba(220,54,6,1)', 'rgba(218,2,8,1)', 'rgba(148,1,2,1)', 'rgba(92,1,0,1)'],
        normal: {
            backgroundColor: 'rgba(200, 200, 200, 0.5)',
            padding: 1,
            size: 50,
            unit: 'px',
            label: {
                show: false,
                font: '12px sans-serif',
                shadowBlur: 0,
                lineWidth: 1,
                color: 'rgba(255,255,255,1)'

            }
        },
        mouseOver: {},
        selected: {},
        splitList: []
    },
    data: [],
    checkDataType: {
        name: false,
        count: true
    },
    event: {
        emitEvent: true,
        multiSelect: false

    }
};

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    tooltip: {
        show: false,
        customClass: 'inmap-tooltip-black',
        offsets: {
            top: 5,
            left: 12
        }
    },
    legend: {
        show: false
    },
    style: {
        gradient: { 0.25: 'rgb(0,0,255)', 0.55: 'rgb(0,255,0)', 0.85: 'yellow', 1.0: 'rgb(255,0,0)' },
        radius: 15,
        blur: 0.15,
        minOpacity: 0.03,
        maxOpacity: 1,
        minValue: null,
        maxValue: null,
        minScope: 0,
        maxScope: 1 },
    data: [],
    checkDataType: {
        name: false,
        count: true
    },
    event: {
        emitEvent: true
    }
};

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    tooltip: {
        show: true,
        customClass: 'inmap-tooltip-black',
        formatter: '{count}',
        offsets: {
            top: 5,
            left: 12
        }
    },
    legend: {
        show: true,
        title: '图例'
    },
    style: {
        colors: ['rgba(31,98,1,1)', 'rgba(95,154,4,1)', 'rgba(139,227,7,1)', 'rgba(218,134,9,1)', 'rgba(220,54,6,1)', 'rgba(218,2,8,1)', 'rgba(148,1,2,1)', 'rgba(92,1,0,1)'],
        normal: {
            backgroundColor: 'rgba(200, 200, 200, 0.5)',
            padding: 1,
            size: 50,
            unit: 'px',
            label: {
                show: false,
                font: '12px sans-serif',
                shadowBlur: 0,
                lineWidth: 1,
                color: 'rgba(255,255,255,1)'
            }
        },
        mouseOver: {},
        selected: {},
        splitList: []

    },
    data: [],
    checkDataType: {
        name: false,
        count: true
    },
    event: {
        emitEvent: true,
        multiSelect: false

    }
};

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    tooltip: {
        show: true,
        customClass: 'inmap-tooltip-black',
        offsets: {
            top: 5,
            left: 12
        },
        formatter: '{count}'
    },
    legend: {
        show: false
    },
    style: {
        normal: {
            icon: null,
            width: 0,
            height: 0,
            label: {
                show: false,
                font: '12px bold ',
                color: '#fff',
                offsets: {
                    top: 0,
                    left: 0
                }
            },
            offsets: {
                top: 0,
                left: 0
            }
        },
        mouseOver: {},
        selected: {},
        colors: [],
        splitList: []
    },
    data: [],
    checkDataType: {
        name: false,
        count: false
    },
    event: {
        emitEvent: true,
        multiSelect: false }
};

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    tooltip: {
        show: false,
        formatter: '{count}',
        customClass: 'inmap-tooltip-black',
        offsets: {
            top: 5,
            left: 12
        }
    },
    legend: {
        show: false
    },
    style: {
        normal: {
            font: '18px Arial',
            color: 'yellow',
            shadowColor: 'yellow',
            shadowBlur: 10,
            offsets: {
                top: 0,
                left: 0
            }
        },
        splitList: [],
        colors: []
    },
    data: [],
    checkDataType: {
        name: true,
        count: false
    },
    selected: [],
    event: {
        emitEvent: true,
        multiSelect: false }
};

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    show: false,
    title: null,
    formatter: null,
    list: []
};

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    style: {
        size: 0.5,

        fillColor: 'rgba(255, 250, 250, 0.9)',

        shadowBlur: 0,
        fps: 20,
        lineOrCurve: 'curve',
        deltaAngle: -0.2 },
    data: [],
    checkDataType: {
        name: false,
        count: false
    }
};

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    tooltip: {
        show: false,
        formatter: '{count}',
        customClass: 'inmap-tooltip-black',
        offsets: {
            top: 5,
            left: 12
        }
    },
    style: {
        normal: {
            borderStyle: 'solid',
            borderColor: 'rgba(50, 50, 255, 0.8)',
            borderWidth: 0.05,
            lineOrCurive: null,
            deltaAngle: -0.2
        },
        colors: [],
        splitList: []
    },
    data: [],
    checkDataType: {
        name: false,
        count: false
    },
    selected: [],
    event: {
        emitEvent: true

    }
};

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    center: [],
    id: null,
    skin: null,
    zoom: {
        value: 5,
        show: true,
        max: 19,
        min: 5
    }
};

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    style: {
        backgroundColor: 'rgba(31,44,72,1)',
        shadowBlur: 0,
        borderWidth: 0
    },
    data: [],
    event: {
        emitEvent: true,
        onState: function onState() {}
    }
};

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    style: {
        point: {
            tooltip: {
                show: true,
                formatter: '{name}'
            },
            style: {
                normal: {
                    backgroundColor: 'rgba(200, 200, 50, 1)',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,1)',
                    size: 6,
                    label: {
                        show: true,
                        color: 'rgba(255,255,255,1)'

                    }
                },
                mouseOver: {
                    backgroundColor: 'rgba(200, 200, 200, 1)',
                    borderColor: 'rgba(255,255,255,1)',
                    borderWidth: 4
                },
                selected: {
                    backgroundColor: 'rgba(184,0,0,1)',
                    borderColor: 'rgba(255,255,255,1)'
                }
            },
            event: {}
        },
        line: {
            style: {
                normal: {
                    borderColor: 'rgba(200, 200, 50, 1)',
                    borderWidth: 1,

                    lineOrCurive: 'curve'
                }
            }
        },
        lineAnimation: {
            style: {
                size: 2,

                fillColor: '#fff',

                shadowColor: '#fff',

                shadowBlur: 10,
                lineOrCurve: 'curve'
            }

        }
    },
    data: []
};

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    style: {
        fps: 25,
        size: 50,
        color: '#FAFA32',
        speed: 0.15 },
    data: [],
    checkDataType: {
        name: false,
        count: false
    }
};

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    tooltip: {
        show: false,
        formatter: '{count}',
        customClass: 'inmap-tooltip-black',
        offsets: {
            top: 5,
            left: 12
        }

    },
    legend: {
        show: false,
        toFixed: 2 },
    draw: {},
    style: {
        normal: {
            size: 5,
            borderWidth: 0.1,
            backgroundColor: 'rgba(200, 200, 50, 1)',
            mergeCount: 1.5,
            unit: 'px',
            label: {
                show: false,
                color: 'rgba(0,0,0,1)',
                font: '13px Arial'
            }
        },
        colors: [],
        splitList: []

    },
    data: [],
    checkDataType: {
        name: false,
        count: false
    },
    selected: [],
    event: {
        emitEvent: true,
        multiSelect: false }
};

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    tooltip: {
        show: false
    },
    legend: {
        show: false
    },
    style: {
        normal: {
            size: 3,
            borderWidth: 0.1,
            backgroundColor: 'rgba(200, 200, 200, 0.5)'

        },
        splitList: []
    },
    data: [],
    checkDataType: {
        name: false,
        count: false
    },
    event: {
        emitEvent: false,
        onDragStart: function onDragStart() {},
        onDragging: function onDragging() {},
        onDragEnd: function onDragEnd() {},
        onDblclick: function onDblclick() {}
    }
};

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    tooltip: {
        show: false,
        formatter: '{count}',
        customClass: 'inmap-tooltip-black',
        offsets: {
            top: 5,
            left: 12
        }

    },
    legend: {
        show: false,
        toFixed: 2 },

    style: {
        isHighlight: false,
        normal: {
            backgroundColor: 'rgba(0,133,235,0.6)',
            borderWidth: 1.5,
            borderStyle: 'solid',
            label: {
                enable: true,
                overflow: 'hidden',
                centerType: 'cell',
                show: true,
                font: '13px bold ',
                color: '#fff'
            }
        },
        mouseOver: {
            shadowColor: 'rgba(0, 0, 0, 1)',
            shadowBlur: 10,
            borderWidth: 1.5,
            label: {
                color: 'rgba(0, 0, 0, 1)'
            }
        },
        colors: [],
        splitList: []

    },
    data: [],
    checkDataType: {
        name: true,
        count: true
    },
    event: {
        emitEvent: true,
        multiSelect: false }
};

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    style: {
        isEdit: true,
        isDel: true,
        point: {
            normal: {
                backgroundColor: 'rgba(93,158,247,0.7)',
                size: 6 },
            mouseOver: {
                backgroundColor: 'rgba(93,158,247,1)',
                borderColor: 'rgba(93,158,247,1)',
                borderWidth: 1
            },
            selected: {
                borderWidth: 1,
                backgroundColor: 'rgba(184,0,0,1)'
            }

        },
        virtualPoint: {
            normal: {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 1,
                borderColor: 'rgba(0,131,238, 1)',
                size: 6
            },
            mouseOver: {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 2
            }

        },
        polygon: {
            normal: {
                borderWidth: 1.5,
                backgroundColor: 'rgba(0,184,255,0.3)',
                label: {
                    enable: false
                }
            },
            mouseOver: {
                shadowBlur: 0,
                shadowColor: null,
                backgroundColor: 'rgba(0,184,255,0.3)'
            }
        }
    },
    data: null,
    event: {}
};

/***/ }),
/* 179 */,
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = exports.MaskOverlay = exports.WorkerMrg = exports.LineStringAnimationOverlay = exports.PointAnimationOverlay = exports.MoveLineOverlay = exports.ImgOverlay = exports.HoneycombOverlay = exports.LineStringOverlay = exports.HeatOverlay = exports.PolygonEditorOverlay = exports.PolygonOverlay = exports.GriddingOverlay = exports.PointOverlay = exports.LabelOverlay = exports.Map = exports.utils = exports.version = undefined;

__webpack_require__(142);

var _LabelOverlay = __webpack_require__(148);

var _LabelOverlay2 = _interopRequireDefault(_LabelOverlay);

var _PointOverlay = __webpack_require__(103);

var _PointOverlay2 = _interopRequireDefault(_PointOverlay);

var _GriddingOverlay = __webpack_require__(144);

var _GriddingOverlay2 = _interopRequireDefault(_GriddingOverlay);

var _PolygonOverlay = __webpack_require__(104);

var _PolygonOverlay2 = _interopRequireDefault(_PolygonOverlay);

var _HeatOverlay = __webpack_require__(145);

var _HeatOverlay2 = _interopRequireDefault(_HeatOverlay);

var _LineStringOverlay = __webpack_require__(102);

var _LineStringOverlay2 = _interopRequireDefault(_LineStringOverlay);

var _HoneycombOverlay = __webpack_require__(146);

var _HoneycombOverlay2 = _interopRequireDefault(_HoneycombOverlay);

var _ImgOverlay = __webpack_require__(147);

var _ImgOverlay2 = _interopRequireDefault(_ImgOverlay);

var _MoveLineOverlay = __webpack_require__(150);

var _MoveLineOverlay2 = _interopRequireDefault(_MoveLineOverlay);

var _PointAnimationOverlay = __webpack_require__(151);

var _PointAnimationOverlay2 = _interopRequireDefault(_PointAnimationOverlay);

var _LineStringAnimationOverlay = __webpack_require__(101);

var _LineStringAnimationOverlay2 = _interopRequireDefault(_LineStringAnimationOverlay);

var _index = __webpack_require__(152);

var _index2 = _interopRequireDefault(_index);

var _MaskOverlay = __webpack_require__(149);

var _MaskOverlay2 = _interopRequireDefault(_MaskOverlay);

var _index3 = __webpack_require__(143);

var _index4 = _interopRequireDefault(_index3);

var _Util = __webpack_require__(5);

var utils = _interopRequireWildcard(_Util);

var _WorkerMrg = __webpack_require__(99);

var _WorkerMrg2 = _interopRequireDefault(_WorkerMrg);

var _Config = __webpack_require__(100);

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = "2.3.3";
console.log('inMap v' + version);
var inMap = {
    version: version,
    utils: utils,
    Map: _index4.default,
    LabelOverlay: _LabelOverlay2.default,
    PointOverlay: _PointOverlay2.default,
    GriddingOverlay: _GriddingOverlay2.default,
    PolygonOverlay: _PolygonOverlay2.default,
    PolygonEditorOverlay: _index2.default,
    HeatOverlay: _HeatOverlay2.default,
    LineStringOverlay: _LineStringOverlay2.default,
    HoneycombOverlay: _HoneycombOverlay2.default,
    ImgOverlay: _ImgOverlay2.default,
    MoveLineOverlay: _MoveLineOverlay2.default,
    PointAnimationOverlay: _PointAnimationOverlay2.default,
    LineStringAnimationOverlay: _LineStringAnimationOverlay2.default,
    WorkerMrg: _WorkerMrg2.default,
    MaskOverlay: _MaskOverlay2.default,
    config: _Config2.default
};
exports.version = version;
exports.utils = utils;
exports.Map = _index4.default;
exports.LabelOverlay = _LabelOverlay2.default;
exports.PointOverlay = _PointOverlay2.default;
exports.GriddingOverlay = _GriddingOverlay2.default;
exports.PolygonOverlay = _PolygonOverlay2.default;
exports.PolygonEditorOverlay = _index2.default;
exports.HeatOverlay = _HeatOverlay2.default;
exports.LineStringOverlay = _LineStringOverlay2.default;
exports.HoneycombOverlay = _HoneycombOverlay2.default;
exports.ImgOverlay = _ImgOverlay2.default;
exports.MoveLineOverlay = _MoveLineOverlay2.default;
exports.PointAnimationOverlay = _PointAnimationOverlay2.default;
exports.LineStringAnimationOverlay = _LineStringAnimationOverlay2.default;
exports.WorkerMrg = _WorkerMrg2.default;
exports.MaskOverlay = _MaskOverlay2.default;
exports.config = _Config2.default;
exports.default = inMap;

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Color = __webpack_require__(68);

var _Color2 = _interopRequireDefault(_Color);

var _LegendConfig = __webpack_require__(168);

var _LegendConfig2 = _interopRequireDefault(_LegendConfig);

var _Util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Legend = function () {
    function Legend(toolDom, opts) {
        _classCallCheck(this, Legend);

        this._opts = opts || _LegendConfig2.default;
        this._dom = this._crateDom(toolDom);
        this.hide();
    }

    _createClass(Legend, [{
        key: '_crateDom',
        value: function _crateDom(toolDom) {
            var div = document.createElement('div');
            div.classList.add('inmap-legend');
            toolDom.appendChild(div);
            return div;
        }
    }, {
        key: 'show',
        value: function show() {
            this._dom.style.display = 'inline-block';
        }
    }, {
        key: 'hide',
        value: function hide() {
            this._dom.style.display = 'none';
        }
    }, {
        key: '_toFixed',
        value: function _toFixed(num) {
            return isNaN(num) ? num : parseFloat(num).toFixed(this._opts.toFixed);
        }
    }, {
        key: 'setTitle',
        value: function setTitle(title) {
            this._opts.title = title;
            this._render();
        }
    }, {
        key: 'setOption',
        value: function setOption(opts) {
            this._opts = (0, _Util.merge)(_LegendConfig2.default, this._opts, opts);
            this._opts.list = this._opts.list || [];
            this._render();
        }
    }, {
        key: 'setItems',
        value: function setItems(list) {
            this._opts.list = list;
            this._render();
        }
    }, {
        key: '_verify',
        value: function _verify() {
            var _opts = this._opts,
                show = _opts.show,
                title = _opts.title,
                list = _opts.list;

            if (!(0, _Util.isBoolean)(show)) {
                throw new TypeError('inMap: legend options show must be a Boolean');
            }
            if (!(0, _Util.isEmpty)(title) && !(0, _Util.isString)(title)) {
                throw new TypeError('inMap: legend options title must be a String');
            }
            if (!(0, _Util.isArray)(list)) {
                throw new TypeError('inMap: legend options list must be a Array');
            }
        }
    }, {
        key: '_render',
        value: function _render() {
            var _this = this;

            this._verify();
            var _opts2 = this._opts,
                show = _opts2.show,
                title = _opts2.title,
                list = _opts2.list;

            if (show) {
                this.show();
            } else {
                this.hide();
                return;
            }

            var str = '';
            if (title) {
                str = '<div class="inmap-legend-title">' + title + ' </div>';
            }

            str += '<table cellpadding="0" cellspacing="0">';
            list.forEach(function (val, index) {
                var text = null,
                    backgroundColor = val.backgroundColor;
                var isShow = backgroundColor != null;
                var legendBg = new _Color2.default(backgroundColor),
                    difference = 0.2;

                var opacity = val.opacity;
                if (opacity) {
                    opacity += difference;
                }
                if (legendBg.a) {
                    opacity = legendBg.a + difference;
                } else {
                    opacity = 1;
                }
                backgroundColor = legendBg.getRgbaValue(opacity);
                if (val.text) {
                    text = val.text;
                } else if (_this._opts.formatter) {
                    if (val.start == val.end) {
                        text = '' + _this._opts.formatter(val.start, index, val);
                    } else {
                        text = (val.start == null ? '-<span class="inmap-infinity"></span>' : _this._opts.formatter(val.start, index, val)) + ' ~ ' + (val.end == null ? '+<span class="inmap-infinity"></span>' : _this._opts.formatter(val.end, index, val));
                    }
                } else {
                    if (val.start == val.end) {
                        text = '' + _this._toFixed(val.start);
                    } else {
                        text = (val.start == null ? '-<span class="inmap-infinity"></span>' : _this._toFixed(val.start)) + ' ~ ' + (val.end == null ? '+<span class="inmap-infinity"></span>' : _this._toFixed(val.end));
                    }
                }
                var td = isShow ? ' <td style="background:' + backgroundColor + '; width:17px;height:17px;"></td>' : '';
                str += '\n                <tr>\n                   ' + td + '\n                    <td class="inmap-legend-text">\n                       ' + text + '\n                    </td>\n                </tr>\n                ';
            });
            str += '</table>';
            if (list.length <= 0) {
                this.hide();
            }
            this._dom.innerHTML = str;
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this._dom.parentNode.removeChild(this._dom);
            this._opts = null;
            this._dom = null;
        }
    }]);

    return Legend;
}();

exports.default = Legend;

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tooltip = function () {
    function Tooltip(toolDom) {
        _classCallCheck(this, Tooltip);

        this._dom = this._create(toolDom);
        this._tooltipTemplate = null;
        this._opts = {};
        this.isShow = null;
        this.hide();
    }

    _createClass(Tooltip, [{
        key: '_create',
        value: function _create(toolDom) {
            var dom = document.createElement('div');
            dom.classList.add('inmap-tooltip');
            toolDom.appendChild(dom);
            return dom;
        }
    }, {
        key: '_compileTooltipTemplate',
        value: function _compileTooltipTemplate(formatter) {
            var RexStr = /\{|\}/g;
            formatter = formatter.replace(RexStr, function (MatchStr) {
                switch (MatchStr) {
                    case '{':
                        return 'overItem.';
                    case '}':
                        return '';
                    default:
                        break;
                }
            });
            this._tooltipTemplate = new Function('overItem', 'return ' + formatter);
        }
    }, {
        key: 'show',
        value: function show(x, y, text) {
            var _opts$offsets = this._opts.offsets,
                left = _opts$offsets.left,
                top = _opts$offsets.top;

            this._dom.innerHTML = text;
            this._dom.style.left = x + left + 'px';
            this._dom.style.top = y + top + 'px';
            this._show();
        }
    }, {
        key: 'showText',
        value: function showText(text, x, y) {
            this._dom.innerHTML = text;
            this._dom.style.left = x + 'px';
            this._dom.style.top = y + 'px';
            this._show();
        }
    }, {
        key: '_show',
        value: function _show() {
            if (this.isShow != true) {
                this.isShow = true;
                this._dom.style.display = 'block';
            }
        }
    }, {
        key: 'hide',
        value: function hide() {
            if (this.isShow != false) {
                this.isShow = false;
                this._dom.style.display = 'none';
            }
        }
    }, {
        key: 'setOption',
        value: function setOption(opts) {
            var result = (0, _Util.merge)(this._opts, opts);
            var formatter = result.formatter,
                customClass = result.customClass;


            if ((0, _Util.isString)(formatter)) {
                this._compileTooltipTemplate(result.formatter);
            }

            if (this._opts.customClass) {
                this._dom.classList.remove(this._opts.customClass);
            }

            this._dom.classList.add(customClass);
            this._opts = result;
        }
    }, {
        key: 'render',
        value: function render(event, overItem) {
            if (!this._opts.show) return;
            if (overItem) {
                var formatter = this._opts.formatter;
                var text = null;
                if ((0, _Util.isFunction)(formatter)) {
                    text = formatter(overItem);
                } else if ((0, _Util.isString)(formatter)) {
                    text = this._tooltipTemplate(overItem);
                }
                this.show(event.offsetX, event.offsetY, text);
            } else {
                this.hide();
            }
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this._dom.parentNode.removeChild(this._dom);
            this._tooltipTemplate = null;
            this._opts = null;
            this._dom = null;
        }
    }]);

    return Tooltip;
}();

exports.default = Tooltip;

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapZoom = function () {
    function MapZoom(map, mapDom, opts) {
        _classCallCheck(this, MapZoom);

        this._map = map;
        this._mapDom = mapDom;
        this._zoom = opts;

        this._confine = {
            min: 3,
            max: 19
        };
        this._createDom();
    }

    _createClass(MapZoom, [{
        key: '_createDom',
        value: function _createDom() {
            var div = document.createElement('div');
            div.classList.add('inmap-scale-group');
            div.innerHTML = '<a>+</a > <a>-</a >';
            this._mapDom.appendChild(div);
            this._event(div);
            this.setButtonState();
        }
    }, {
        key: 'setButtonState',
        value: function setButtonState() {
            var doms = this._mapDom.querySelectorAll('.inmap-scale-group a');
            var zoom = this._map.getZoom();

            if (zoom >= this._zoom.max || zoom >= this._confine.max) {
                doms[0].setAttribute('disabled', 'true');
            } else {
                doms[0].removeAttribute('disabled');
            }
            if (zoom <= this._zoom.min || zoom <= this._confine.min) {
                doms[1].setAttribute('disabled', 'true');
            } else {
                doms[1].removeAttribute('disabled');
            }
        }
    }, {
        key: '_event',
        value: function _event(div) {
            var _this = this;

            var doms = div.querySelectorAll('a');
            doms[0].addEventListener('click', function () {
                var zoom = _this._map.getZoom();
                if (zoom < _this._zoom.max && zoom < _this._confine.max) {
                    _this._map.zoomIn();
                }
            });
            doms[1].addEventListener('click', function () {
                var zoom = _this._map.getZoom();
                if (zoom > _this._zoom.min && zoom > _this._confine.min) {
                    _this._map.zoomOut();
                }
            });
        }
    }]);

    return MapZoom;
}();

exports.default = MapZoom;

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasOverlay = __webpack_require__(29);

var _CanvasOverlay2 = _interopRequireDefault(_CanvasOverlay);

var _Parameter2 = __webpack_require__(32);

var _Parameter3 = _interopRequireDefault(_Parameter2);

var _Util = __webpack_require__(5);

var _PointDragConfig = __webpack_require__(176);

var _PointDragConfig2 = _interopRequireDefault(_PointDragConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PointOverlay = function (_Parameter) {
    _inherits(PointOverlay, _Parameter);

    function PointOverlay(opts) {
        _classCallCheck(this, PointOverlay);

        var _this = _possibleConstructorReturn(this, (PointOverlay.__proto__ || Object.getPrototypeOf(PointOverlay)).call(this, _PointDragConfig2.default, opts));

        _this._loopDraw = _this._loopDraw.bind(_this);
        _this._mouseupFun = _this._mouseupFun.bind(_this);
        _this._mousedownFun = _this._mousedownFun.bind(_this);
        _this._dblclickFun = _this._dblclickFun.bind(_this);
        _this._selectItemIndex = -1;
        _this._mouseLayer = new _CanvasOverlay2.default({
            zIndex: _this._zIndex + 1
        });
        _this._isDragging = false;
        _this._dragStartPixel = {
            x: 0,
            y: 0
        };

        return _this;
    }

    _createClass(PointOverlay, [{
        key: '_onOptionChange',
        value: function _onOptionChange() {}
    }, {
        key: 'setZIndex',
        value: function setZIndex(zIndex) {
            this._zIndex = zIndex;
            if (this._container) this._container.style.zIndex = this._zIndex;

            this._mouseLayer.setZIndex(this._zIndex + 1);
        }
    }, {
        key: '_onDataChange',
        value: function _onDataChange() {}
    }, {
        key: '_parameterInit',
        value: function _parameterInit() {
            this._map.addOverlay(this._mouseLayer);
            this._map.addEventListener('mouseup', this._mouseupFun);
            this._map.addEventListener('mousedown', this._mousedownFun);
            this._map.addEventListener('dblclick', this._dblclickFun);
        }
    }, {
        key: 'setOptionStyle',
        value: function setOptionStyle(ops) {
            this._setStyle(this._option, ops);
        }
    }, {
        key: '_toDraw',
        value: function _toDraw() {}
    }, {
        key: '_drawMouseLayer',
        value: function _drawMouseLayer() {
            var overArr = this._overItem ? [this._overItem] : [];
            this._mouseLayer._clearCanvas();
            this._loopDraw(this._mouseLayer._getContext(), this._selectItem.concat(overArr), true);
        }
    }, {
        key: '_clearAll',
        value: function _clearAll() {
            this._overItem = null;
            this._mouseLayer._clearCanvas();
            this._clearCanvas();
        }
    }, {
        key: '_updateOverClickItem',
        value: function _updateOverClickItem() {
            var _this2 = this;

            var overArr = this._overItem ? [this._overItem] : [];
            var allItems = this._selectItem.concat(overArr);

            var _loop = function _loop(i) {
                var item = allItems[i];
                var ret = _this2._workerData.find(function (val) {
                    var itemCoordinates = item.geometry.coordinates;
                    var valCoordinates = val.geometry.coordinates;
                    return val && itemCoordinates[0] == valCoordinates[0] && itemCoordinates[1] == valCoordinates[1] && val.count == item.count;
                });
                item.geometry.pixel = ret.geometry.pixel;
            };

            for (var i = 0; i < allItems.length; i++) {
                _loop(i);
            }
        }
    }, {
        key: '_getTarget',
        value: function _getTarget(mouseX, mouseY) {
            var pixels = this._workerData,
                ctx = this._ctx;
            var mapSize = this._map.getSize();
            for (var i = 0, len = pixels.length; i < len; i++) {
                var _item = pixels[i];
                var _item$geometry$pixel = _item.geometry.pixel,
                    x = _item$geometry$pixel.x,
                    y = _item$geometry$pixel.y;

                var style = this._setDrawStyle(_item, false, i);
                var size = style.size;
                size += style.borderWidth || 0;
                if (x > -size && y > -size && x < mapSize.width + size && y < mapSize.height + size) {
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, 2 * Math.PI, true);
                    if (ctx.isPointInPath(mouseX * this._devicePixelRatio, mouseY * this._devicePixelRatio)) {
                        return {
                            index: i,
                            item: _item
                        };
                    }
                }
            }
            return {
                index: -1,
                item: null
            };
        }
    }, {
        key: '_findIndexSelectItem',
        value: function _findIndexSelectItem(item) {
            var index = -1;
            if (item) {
                index = this._selectItem.findIndex(function (val) {
                    var itemCoordinates = item.geometry.coordinates;
                    var valCoordinates = val.geometry.coordinates;
                    return val && itemCoordinates[0] == valCoordinates[0] && itemCoordinates[1] == valCoordinates[1] && val.count == item.count;
                });
            }
            return index;
        }
    }, {
        key: 'refresh',
        value: function refresh() {

            this._clearCanvas();
            this._mouseLayer._canvasResize();
            this._loopDraw(this._ctx, this._workerData, false);
            this._drawMouseLayer();
        }
    }, {
        key: '_swopData',
        value: function _swopData(index, item) {
            if (index > -1) {
                this._workerData[index] = this._workerData[this._workerData.length - 1];
                this._workerData[this._workerData.length - 1] = item;
            }
        }
    }, {
        key: '_loopDraw',
        value: function _loopDraw(ctx, pixels, otherMode) {
            var mapSize = this._map.getSize();
            var pre = null;
            for (var i = 0, len = pixels.length; i < len; i++) {
                var _item2 = pixels[i];
                var pixel = _item2.geometry.pixel;
                var x = pixel.x,
                    y = pixel.y;

                if (pre == null || pre.x != x || pre.y != y) {
                    var style = this._setDrawStyle(_item2, otherMode, i);
                    var size = style.size;

                    if (x > -size && y > -size && x < mapSize.width + size && y < mapSize.height + size) {
                        if (style.shadowColor) {
                            ctx.shadowColor = style.shadowColor || 'transparent';
                            ctx.shadowBlur = style.shadowBlur || 10;
                        } else {
                            ctx.shadowColor = 'transparent';
                            ctx.shadowBlur = 0;
                        }
                        if (style.globalCompositeOperation) {
                            ctx.globalCompositeOperation = style.globalCompositeOperation;
                        }
                        this._drawCircle(ctx, x, y, size, style.backgroundColor, style.borderWidth, style.borderColor);
                    }
                    pre = pixel;
                }
            }
        }
    }, {
        key: '_drawCircle',
        value: function _drawCircle(ctx, x, y, radius, color, lineWidth, strokeStyle) {
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
            ctx.fill();
            if (lineWidth) {
                ctx.lineWidth = lineWidth;
                if (strokeStyle) {
                    ctx.strokeStyle = strokeStyle;
                }
                ctx.stroke();
            }
        }
    }, {
        key: '_removeMoveEvent',
        value: function _removeMoveEvent() {
            this._map.removeEventListener('mouseup', this._mouseupFun);
            this._map.removeEventListener('mousedown', this._mousedownFun);
            this._map.removeEventListener('dblclick', this._dblclickFun);
        }
    }, {
        key: '_TDispose',
        value: function _TDispose() {
            this._removeMoveEvent();
            this._map.removeOverlay(this._mouseLayer);
            this._mouseLayer.dispose();
        }
    }, {
        key: '_tMousemove',
        value: function _tMousemove(event) {
            if (this._isDragging) {
                var point = this._selectItem[0];
                if (!point) return;

                var dragEndPixel = {
                    x: event.offsetX,
                    y: event.offsetY
                };
                point.geometry.pixel.x = dragEndPixel.x;
                point.geometry.pixel.y = dragEndPixel.y;
                point.geometry.coordinates = [event.point.lng, event.point.lat];
                this.refresh();
                this._eventConfig.onDragging.call(this, point, this._selectItemIndex, event);
            } else {
                if (this._eventType == 'onmoving') {
                    return;
                }
                var result = this._getTarget(event.pixel.x, event.pixel.y);
                var temp = result.item;

                if (temp != this._overItem) {

                    this._overItem = temp;
                    this._eventType = 'mousemove';
                    if (!(0, _Util.isEmpty)(this._styleConfig.mouseOver)) {
                        this._drawMouseLayer();
                    }
                }
                if (temp) {
                    this._map.setDefaultCursor('pointer');
                } else {
                    this._map.setDefaultCursor('default');
                }
            }
        }
    }, {
        key: '_mousedownFun',
        value: function _mousedownFun(event) {
            if (this._eventType == 'onmoving') return;
            var result = this._getTarget(event.pixel.x, event.pixel.y);
            this._selectItemIndex = result.index;
            if (result.index == -1) {
                return;
            }
            this._isDragging = this._styleConfig.isDrag;

            if (this._isDragging) {
                this._dragStartPixel = {
                    x: event.offsetX,
                    y: event.offsetY
                };
                this._map.disableDragging();
                this._eventConfig.onDragStart.call(this, result.item, this._selectItemIndex, event);
            }

            this._selectItem = [result.item];

            this._drawMouseLayer();
        }
    }, {
        key: '_mouseupFun',
        value: function _mouseupFun(event) {

            if (this._isDragging) {
                var dragEndPixel = {
                    x: event.offsetX,
                    y: event.offsetY
                };
                if (this._dragStartPixel.x == dragEndPixel.x && this._dragStartPixel.y == dragEndPixel.y) {
                    this._map.enableDragging();
                } else {
                    var point = this._selectItem[0];
                    if (point) {
                        point.geometry.coordinates = [event.point.lng, event.point.lat];
                        this._map.enableDragging();
                        this._eventConfig.onDragEnd.call(this, point, this._selectItemIndex, event);
                    }
                }
            }
            this._selectItem = [];
            this._isDragging = false;
            this._map.enableDragging();
        }
    }, {
        key: 'setData',
        value: function setData() {}
    }, {
        key: '_dblclickFun',
        value: function _dblclickFun(event) {
            if (this._selectItemIndex > -1) {
                this._eventConfig.onDblclick.call(this, this._selectItem[0], this._selectItemIndex, event);
            }
        }
    }, {
        key: '_tMouseClick',
        value: function _tMouseClick() {}
    }]);

    return PointOverlay;
}(_Parameter3.default);

exports.default = PointOverlay;

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _WorkerMrg = __webpack_require__(99);

var _WorkerMrg2 = _interopRequireDefault(_WorkerMrg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseClassCounter = 0;
var inmap_instances = {};
var _count = 0;
Function.prototype.inherits = function (parentClass, className) {
    var i = void 0,
        p = void 0,
        op = this.prototype,
        C = function C() {};
    C.prototype = parentClass.prototype;
    p = this.prototype = new C();
    if (typeof className == 'string') {
        p.className = className;
    }
    for (i in op) {
        p[i] = op[i];
    }
    this.prototype.constructor = op.constructor;
    op = C = null;
    return p;
};

var BaseClass = function BaseClass(hc) {
    inmap_instances[this.hashCode = hc || BaseClass.guid()] = this;
};

BaseClass.guid = function () {
    return 'td' + (baseClassCounter++).toString(36);
};

BaseClass.prototype.dispose = function () {
    if (this.hashCode) {
        inmap_instances[this.hashCode] = null;
    }

    for (var i in this) {
        if (typeof this[i] != 'function') {
            this[i] = null;
        }
    }
};

BaseClass.prototype._getHashCode = function () {
    if (!this.hashCode) {
        inmap_instances[this.hashCode = BaseClass.guid()] = this;
    }
    return this.hashCode;
};

BaseClass.prototype._decontrol = function () {
    inmap_instances[this.hashCode] = null;
};

var baidu = window.BMap || {
    Overlay: {}
};
BaseClass.inherits(baidu.Overlay, 'BaseClass');

BaseClass.prototype._postMessage = function (workerClassPath, data, callback) {
    var map = this._map;
    var center = map.getCenter();
    var size = map.getSize();
    var msgId = this._setMsgId();
    var request = {
        'type': 'web',
        'data': data,
        'hashCode': this.hashCode,
        'className': this.className,
        'classPath': workerClassPath,
        'msgId': msgId,
        'map': {
            'center': {
                lng: center.lng,
                lat: center.lat
            },
            'size': {
                width: size.width,
                height: size.height
            },
            'zoom': map.getZoom(),
            'margin': this._margin
        }
    };
    _WorkerMrg2.default.postMessage({
        request: request
    }, callback);
};
BaseClass.prototype._getMsgId = function () {
    return 'msgId' + _count.toString(36);
};
BaseClass.prototype._setMsgId = function () {
    _count++;
    return 'msgId' + _count.toString(36);
};
BaseClass.prototype._removeWorkerMessage = function () {
    _WorkerMrg2.default.removeMessage(this.hashCode);
};

exports.default = BaseClass;

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BatchesData = function () {
    function BatchesData(option) {
        _classCallCheck(this, BatchesData);

        this.setOption(option);
        this.intervalId = null;
        this.splitArray = [];
        this.index = 0;
        this.usable = true;
    }

    _createClass(BatchesData, [{
        key: 'setOption',
        value: function setOption(_ref) {
            var _ref$interval = _ref.interval,
                interval = _ref$interval === undefined ? 400 : _ref$interval,
                _ref$splitCount = _ref.splitCount,
                splitCount = _ref$splitCount === undefined ? 1500 : _ref$splitCount;

            this.clear();
            this.interval = interval;
            this.splitCount = splitCount;
        }
    }, {
        key: 'setUsable',
        value: function setUsable(val) {
            this.usable = val;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.splitArray = [];
            this.index = 0;
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
        }
    }, {
        key: 'action',
        value: function action(data, callback, ctx) {
            var _this = this;

            if (this.usable) {
                this.clear();
            } else {
                return;
            }
            var splitCount = this.splitCount,
                interval = this.interval;


            this.splitArray = (0, _Util.chunk)(data, splitCount);

            var loop = function loop() {
                if (!_this.usable) {
                    _this.clear();
                    return;
                }
                var item = _this.splitArray[_this.index];
                item && callback(ctx, item);

                _this.index++;

                if (_this.index >= _this.splitArray.length) {
                    _this.clear();
                } else {
                    _this.intervalId = setTimeout(loop, interval);
                }
            };
            loop();
        }
    }]);

    return BatchesData;
}();

exports.default = BatchesData;

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isMobile = (0, _Util.detection)();

var EventManage = function () {
    function EventManage() {
        _classCallCheck(this, EventManage);

        this.map = null;
        this.layers = [];
    }

    _createClass(EventManage, [{
        key: 'register',
        value: function register(map, layer) {
            if (this.map != map) {
                this.map = map;
                this.bindEvent();
            }
            if (!this.isContains(layer)) {
                this.layers.push(layer);
                this.sort();
            }
        }
    }, {
        key: 'sort',
        value: function sort() {
            this.layers.sort(function (a, b) {
                return b._zIndex - a._zIndex;
            });
        }
    }, {
        key: 'bindEvent',
        value: function bindEvent() {
            var _this = this;

            this.map.getContainer().addEventListener('mouseout', function (e) {
                _this.trigger('_tMouseout', e);
            });
            this.map.addEventListener('mousemove', function (e) {
                _this.trigger('_tMousemove', e);
            });
            if (isMobile) {
                this.map.addEventListener('touchstart', function (e) {
                    _this.trigger('_tMouseClick', e);
                });
            } else {
                this.map.addEventListener('click', function (e) {
                    _this.trigger('_tMouseClick', e);
                });
            }
        }
    }, {
        key: 'trigger',
        value: function trigger(eventName, e) {
            var lock = false;
            for (var index = 0; index < this.layers.length; index++) {
                var layer = this.layers[index];
                if (layer && layer._map) {
                    if (eventName == '_tMousemove' || eventName == '_tMouseClick') {
                        if (!lock) {
                            var result = layer[eventName](e);
                            if (result && result.item) {
                                lock = true;
                            }
                        } else {
                            layer['_tMouseout'](e);
                        }
                    } else {
                        layer[eventName](e);
                    }
                } else {

                    this.layers.splice(index, 1);
                    index--;
                }
            }
        }
    }, {
        key: 'isContains',
        value: function isContains(layer) {
            var index = this.layers.findIndex(function (item) {
                return item == layer;
            });
            return index > -1 ? true : false;
        }
    }]);

    return EventManage;
}();

exports.default = new EventManage();

/***/ }),
/* 188 */,
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(390);

__webpack_require__(190);

__webpack_require__(191);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)))

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)))

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(198);
module.exports = __webpack_require__(23).RegExp.escape;


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(58);
var SPECIES = __webpack_require__(6)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(27);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(40);
var gOPS = __webpack_require__(62);
var pIE = __webpack_require__(53);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 196 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 197 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(196)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(109) });

__webpack_require__(33)('copyWithin');


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(22)(4);

$export($export.P + $export.F * !__webpack_require__(21)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(70) });

__webpack_require__(33)('fill');


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(22)(2);

$export($export.P + $export.F * !__webpack_require__(21)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(22)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(33)(KEY);


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(22)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(33)(KEY);


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(22)(0);
var STRICT = __webpack_require__(21)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(20);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(10);
var call = __webpack_require__(120);
var isArrayIter = __webpack_require__(78);
var toLength = __webpack_require__(9);
var createProperty = __webpack_require__(72);
var getIterFn = __webpack_require__(95);

$export($export.S + $export.F * !__webpack_require__(60)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(54)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(21)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(58) });


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(18);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(52) != Object || !__webpack_require__(21)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(18);
var toInteger = __webpack_require__(26);
var toLength = __webpack_require__(9);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(21)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(22)(1);

$export($export.P + $export.F * !__webpack_require__(21)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(72);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(111);

$export($export.P + $export.F * !__webpack_require__(21)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(111);

$export($export.P + $export.F * !__webpack_require__(21)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(76);
var cof = __webpack_require__(19);
var toAbsoluteIndex = __webpack_require__(44);
var toLength = __webpack_require__(9);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(22)(3);

$export($export.P + $export.F * !__webpack_require__(21)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(11);
var toObject = __webpack_require__(10);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(21)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43)('Array');


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(193);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(10);
var toPrimitive = __webpack_require__(27);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(6)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(13)(proto, TO_PRIMITIVE, __webpack_require__(194));


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(14)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(112) });


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(17);
var HAS_INSTANCE = __webpack_require__(6)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(8).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(7) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(123);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(82);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(81);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(122) });


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(123) });


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(82) });


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(81);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(81);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var has = __webpack_require__(12);
var cof = __webpack_require__(19);
var inheritIfRequired = __webpack_require__(77);
var toPrimitive = __webpack_require__(27);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(39).f;
var gOPD = __webpack_require__(16).f;
var dP = __webpack_require__(8).f;
var $trim = __webpack_require__(48).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(38)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(7) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(14)(global, NUMBER, $Number);
}


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(119) });


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(119);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(131);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(132);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(26);
var aNumberValue = __webpack_require__(108);
var repeat = __webpack_require__(89);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(108);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(125) });


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(38) });


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperties: __webpack_require__(126) });


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(8).f });


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(34).onFreeze;

__webpack_require__(25)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(18);
var $getOwnPropertyDescriptor = __webpack_require__(16).f;

__webpack_require__(25)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(25)('getOwnPropertyNames', function () {
  return __webpack_require__(127).f;
});


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(10);
var $getPrototypeOf = __webpack_require__(17);

__webpack_require__(25)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(197) });


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(10);
var $keys = __webpack_require__(40);

__webpack_require__(25)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(34).onFreeze;

__webpack_require__(25)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(34).onFreeze;

__webpack_require__(25)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(85).set });


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(51);
var test = {};
test[__webpack_require__(6)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(14)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(131);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(132);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(37);
var global = __webpack_require__(2);
var ctx = __webpack_require__(20);
var classof = __webpack_require__(51);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(11);
var anInstance = __webpack_require__(35);
var forOf = __webpack_require__(36);
var speciesConstructor = __webpack_require__(66);
var task = __webpack_require__(91).set;
var microtask = __webpack_require__(83)();
var newPromiseCapabilityModule = __webpack_require__(84);
var perform = __webpack_require__(133);
var promiseResolve = __webpack_require__(134);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(6)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(42)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(47)($Promise, PROMISE);
__webpack_require__(43)(PROMISE);
Wrapper = __webpack_require__(23)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(60)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(11);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(38);
var aFunction = __webpack_require__(11);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(112);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(8);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(27);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(16).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(79)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(16);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(17);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(12);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(130) });


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(85);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(8);
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(12);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(41);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(77);
var dP = __webpack_require__(8).f;
var gOPN = __webpack_require__(39).f;
var isRegExp = __webpack_require__(59);
var $flags = __webpack_require__(57);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(7) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(6)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(14)(global, 'RegExp', $RegExp);
}

__webpack_require__(43)('RegExp');


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(56)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(56)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(56)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(56)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(59);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(139);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(57);
var DESCRIPTORS = __webpack_require__(7);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(14)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(15)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(15)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(15)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(15)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(87)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(9);
var context = __webpack_require__(88);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(75)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(15)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(15)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(15)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(44);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(88);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(75)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(15)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(87)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(80)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(15)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(18);
var toLength = __webpack_require__(9);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(89)
});


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(15)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(9);
var context = __webpack_require__(88);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(75)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(15)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(15)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(15)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(48)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(12);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(14);
var META = __webpack_require__(34).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(65);
var setToStringTag = __webpack_require__(47);
var uid = __webpack_require__(45);
var wks = __webpack_require__(6);
var wksExt = __webpack_require__(137);
var wksDefine = __webpack_require__(94);
var enumKeys = __webpack_require__(195);
var isArray = __webpack_require__(58);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var toIObject = __webpack_require__(18);
var toPrimitive = __webpack_require__(27);
var createDesc = __webpack_require__(41);
var _create = __webpack_require__(38);
var gOPNExt = __webpack_require__(127);
var $GOPD = __webpack_require__(16);
var $DP = __webpack_require__(8);
var $keys = __webpack_require__(40);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(39).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(53).f = $propertyIsEnumerable;
  __webpack_require__(62).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(37)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(67);
var buffer = __webpack_require__(92);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(44);
var toLength = __webpack_require__(9);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(66);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(43)(ARRAY_BUFFER);


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(67).ABV, {
  DataView: __webpack_require__(92).DataView
});


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(115);
var validate = __webpack_require__(49);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(55)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(116);
var toObject = __webpack_require__(10);
var toLength = __webpack_require__(9);
var aFunction = __webpack_require__(11);
var arraySpeciesCreate = __webpack_require__(71);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(33)('flatMap');


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(116);
var toObject = __webpack_require__(10);
var toLength = __webpack_require__(9);
var toInteger = __webpack_require__(26);
var arraySpeciesCreate = __webpack_require__(71);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(33)('flatten');


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(54)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(33)('includes');


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(83)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(19)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(19);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(63)('Map');


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(64)('Map');


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(114)('Map') });


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(124);
var fround = __webpack_require__(122);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(124) });


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(10);
var aFunction = __webpack_require__(11);
var $defineProperty = __webpack_require__(8);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(7) && $export($export.P + __webpack_require__(61), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(10);
var aFunction = __webpack_require__(11);
var $defineProperty = __webpack_require__(8);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(7) && $export($export.P + __webpack_require__(61), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(129)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(130);
var toIObject = __webpack_require__(18);
var gOPD = __webpack_require__(16);
var createProperty = __webpack_require__(72);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(10);
var toPrimitive = __webpack_require__(27);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(61), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(10);
var toPrimitive = __webpack_require__(27);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(61), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(129)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(23);
var microtask = __webpack_require__(83)();
var OBSERVABLE = __webpack_require__(6)('observable');
var aFunction = __webpack_require__(11);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(35);
var redefineAll = __webpack_require__(42);
var hide = __webpack_require__(13);
var forOf = __webpack_require__(36);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(43)('Observable');


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(23);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(66);
var promiseResolve = __webpack_require__(134);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(84);
var perform = __webpack_require__(133);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(140);
var from = __webpack_require__(110);
var metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(11);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(63)('Set');


/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(64)('Set');


/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(114)('Set') });


/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(87)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(24);
var toLength = __webpack_require__(9);
var isRegExp = __webpack_require__(59);
var getFlags = __webpack_require__(57);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(79)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(135);
var userAgent = __webpack_require__(93);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(135);
var userAgent = __webpack_require__(93);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(48)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(48)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(94)('asyncIterator');


/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(94)('observable');


/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });


/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(63)('WeakMap');


/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(64)('WeakMap');


/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(63)('WeakSet');


/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(64)('WeakSet');


/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(96);
var getKeys = __webpack_require__(40);
var redefine = __webpack_require__(14);
var global = __webpack_require__(2);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(46);
var wks = __webpack_require__(6);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(91);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(93);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(318);
__webpack_require__(257);
__webpack_require__(259);
__webpack_require__(258);
__webpack_require__(261);
__webpack_require__(263);
__webpack_require__(268);
__webpack_require__(262);
__webpack_require__(260);
__webpack_require__(270);
__webpack_require__(269);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(264);
__webpack_require__(256);
__webpack_require__(267);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(224);
__webpack_require__(226);
__webpack_require__(225);
__webpack_require__(274);
__webpack_require__(273);
__webpack_require__(244);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(305);
__webpack_require__(310);
__webpack_require__(317);
__webpack_require__(308);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(306);
__webpack_require__(311);
__webpack_require__(313);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(307);
__webpack_require__(309);
__webpack_require__(312);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(219);
__webpack_require__(221);
__webpack_require__(220);
__webpack_require__(223);
__webpack_require__(222);
__webpack_require__(208);
__webpack_require__(206);
__webpack_require__(212);
__webpack_require__(209);
__webpack_require__(215);
__webpack_require__(217);
__webpack_require__(205);
__webpack_require__(211);
__webpack_require__(202);
__webpack_require__(216);
__webpack_require__(200);
__webpack_require__(214);
__webpack_require__(213);
__webpack_require__(207);
__webpack_require__(210);
__webpack_require__(199);
__webpack_require__(201);
__webpack_require__(204);
__webpack_require__(203);
__webpack_require__(218);
__webpack_require__(96);
__webpack_require__(290);
__webpack_require__(295);
__webpack_require__(139);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(275);
__webpack_require__(138);
__webpack_require__(140);
__webpack_require__(141);
__webpack_require__(330);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(325);
__webpack_require__(328);
__webpack_require__(329);
__webpack_require__(323);
__webpack_require__(326);
__webpack_require__(324);
__webpack_require__(327);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(283);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(289);
__webpack_require__(288);
__webpack_require__(333);
__webpack_require__(331);
__webpack_require__(332);
__webpack_require__(374);
__webpack_require__(377);
__webpack_require__(376);
__webpack_require__(378);
__webpack_require__(379);
__webpack_require__(375);
__webpack_require__(380);
__webpack_require__(381);
__webpack_require__(355);
__webpack_require__(358);
__webpack_require__(354);
__webpack_require__(352);
__webpack_require__(353);
__webpack_require__(356);
__webpack_require__(357);
__webpack_require__(339);
__webpack_require__(373);
__webpack_require__(338);
__webpack_require__(372);
__webpack_require__(384);
__webpack_require__(386);
__webpack_require__(337);
__webpack_require__(371);
__webpack_require__(383);
__webpack_require__(385);
__webpack_require__(336);
__webpack_require__(382);
__webpack_require__(335);
__webpack_require__(340);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(344);
__webpack_require__(346);
__webpack_require__(345);
__webpack_require__(347);
__webpack_require__(348);
__webpack_require__(349);
__webpack_require__(351);
__webpack_require__(350);
__webpack_require__(360);
__webpack_require__(361);
__webpack_require__(362);
__webpack_require__(363);
__webpack_require__(365);
__webpack_require__(364);
__webpack_require__(367);
__webpack_require__(366);
__webpack_require__(368);
__webpack_require__(369);
__webpack_require__(370);
__webpack_require__(334);
__webpack_require__(359);
__webpack_require__(389);
__webpack_require__(388);
__webpack_require__(387);
module.exports = __webpack_require__(23);


/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(392)();
// imports


// module
exports.push([module.i, ".inmap-container {\n  opacity: 1;\n  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;\n}\n.inmap-container,\n.inmap-container *:after,\n.inmap-container *:before {\n  display: -webkit-box;\n}\n.inmap-scale-group {\n  position: absolute;\n  right: 10px;\n  bottom: 35px;\n  z-index: 999999;\n  opacity: 1;\n}\n.inmap-scale-group > a {\n  display: block;\n  width: 24px;\n  height: 24px;\n  font-size: 17px;\n  line-height: 22px;\n  text-align: center;\n  background: #fff;\n  margin-top: 5px;\n  color: #666;\n  cursor: pointer;\n  text-decoration: none;\n}\n.inmap-scale-group > a[disabled] {\n  color: rgba(187, 190, 196, 0.6);\n  background-color: #f7f7f7;\n  border-color: #dddee1;\n}\n.inmap-tooltip {\n  position: absolute;\n  opacity: 1;\n  display: none;\n  pointer-events: none;\n  border-style: solid;\n  white-space: nowrap;\n  z-index: 9999999;\n  transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1), top 0.4s cubic-bezier(0.23, 1, 0.32, 1);\n  border-radius: 4px;\n  font-style: normal;\n  font-variant: normal;\n  font-weight: normal;\n  font-stretch: normal;\n  font-size: 14px;\n  font-family: sans-serif;\n  line-height: 21px;\n  padding: 5px;\n  left: 323px;\n  top: 451px;\n}\n.inmap-tooltip-black {\n  border-width: 0px;\n  border-color: #333333;\n  background-color: rgba(50, 50, 50, 0.7);\n  color: #ffffff;\n}\n.inmap-legend-container {\n  position: absolute;\n  left: 35px;\n  bottom: 35px;\n  z-index: 9999;\n}\n.inmap-legend {\n  list-style: none;\n  opacity: 1;\n  height: auto;\n  font-size: 12px;\n  color: #000000;\n  text-align: center;\n  border: 10px solid rgba(255, 255, 255, 0.7);\n  box-shadow: rgba(8, 16, 34, 0.3) 2px 0px 7px;\n  border-radius: 5px;\n  margin-right: 3px;\n}\n.inmap-legend .inmap-legend-text {\n  background-color: rgba(255, 255, 255, 0.7);\n  padding-left: 5px;\n  text-align: left;\n  font-size: 12px;\n}\n.inmap-legend .inmap-legend-title {\n  background-color: rgba(255, 255, 255, 0.7);\n  padding-bottom: 3px;\n}\n.inmap-legend .inmap-legend-chunk {\n  display: inline-block;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  width: 14px;\n}\n.inmap-legend .inmap-infinity {\n  top: 4px;\n  left: 7px;\n  position: relative;\n  margin-right: 12px;\n}\n.inmap-legend .inmap-infinity:before,\n.inmap-legend .inmap-infinity:after {\n  content: \"\";\n  box-sizing: border-box;\n  width: 6px;\n  height: 6px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  border: 1px solid #495060;\n  -moz-border-radius: 50px 50px 0;\n  border-radius: 50px 50px 0 50px;\n  -webkit-transform: rotate(128deg);\n  -moz-transform: rotate(128deg);\n  -ms-transform: rotate(128deg);\n  -o-transform: rotate(128deg);\n  transform: rotate(128deg);\n}\n.inmap-legend .inmap-infinity:after {\n  left: auto;\n  right: 0;\n  -moz-border-radius: 50px 50px 50px 0;\n  border-radius: 50px 50px 50px 0;\n  -webkit-transform: rotate(-128deg);\n  -moz-transform: rotate(-128deg);\n  -ms-transform: rotate(-128deg);\n  -o-transform: rotate(-128deg);\n  transform: rotate(-128deg);\n}\n.inmap-legend > table {\n  width: 100%;\n  min-width: 72px;\n}\n.inmap-legend table,\n.inmap-legend table tbody,\n.inmap-legend table tr,\n.inmap-legend table tr td {\n  padding: 0;\n  border: 0;\n  margin: 0;\n}\n", ""]);

// exports


/***/ }),
/* 392 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 393 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(391);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(393)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/less-loader/index.js!./index.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/less-loader/index.js!./index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })
/******/ ]);
});