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
/******/ 	return __webpack_require__(__webpack_require__.s = 51);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
exports.detectmob = detectmob;
exports.merge = merge;
exports.clearPushArray = clearPushArray;

var _deepmerge = __webpack_require__(8);

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

function detectmob() {
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
            if (sourceArray.length > 0) {
                return sourceArray;
            } else {
                return destinationArray;
            }
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

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (t, n) {
  'object' == ( false ? 'undefined' : _typeof(exports)) && 'object' == ( false ? 'undefined' : _typeof(module)) ? module.exports = n() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (n),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 'object' == (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) ? exports.pointToPixel = n() : t.pointToPixel = n();
}(undefined, function () {
  return function (t) {
    function n(r) {
      if (e[r]) return e[r].exports;var o = e[r] = { i: r, l: !1, exports: {} };return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }var e = {};return n.m = t, n.c = e, n.i = function (t) {
      return t;
    }, n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, { configurable: !1, enumerable: !0, get: r });
    }, n.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };return n.d(e, 'a', e), e;
    }, n.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }, n.p = '', n(n.s = 47);
  }([function (t, n) {
    var e = t.exports = { version: '2.5.1' };'number' == typeof __e && (__e = e);
  }, function (t, n) {
    var e = t.exports = 'undefined' != typeof window && window.Math == Math ? window : 'undefined' != typeof self && self.Math == Math ? self : Function('return this')();'number' == typeof __g && (__g = e);
  }, function (t, n, e) {
    t.exports = !e(10)(function () {
      return 7 != Object.defineProperty({}, 'a', { get: function get() {
          return 7;
        } }).a;
    });
  }, function (t, n) {
    var e = {}.hasOwnProperty;t.exports = function (t, n) {
      return e.call(t, n);
    };
  }, function (t, n, e) {
    var r = e(9),
        o = e(34),
        i = e(27),
        u = Object.defineProperty;n.f = e(2) ? Object.defineProperty : function (t, n, e) {
      if (r(t), n = i(n, !0), r(e), o) try {
        return u(t, n, e);
      } catch (t) {}if ('get' in e || 'set' in e) throw TypeError('Accessors not supported!');return 'value' in e && (t[n] = e.value), t;
    };
  }, function (t, n, e) {
    var r = e(1),
        o = e(0),
        i = e(32),
        u = e(6),
        c = function c(t, n, e) {
      var f,
          a,
          s,
          l = t & c.F,
          p = t & c.G,
          v = t & c.S,
          y = t & c.P,
          h = t & c.B,
          d = t & c.W,
          g = p ? o : o[n] || (o[n] = {}),
          b = g.prototype,
          x = p ? r : v ? r[n] : (r[n] || {}).prototype;p && (e = n);for (f in e) {
        (a = !l && x && void 0 !== x[f]) && f in g || (s = a ? x[f] : e[f], g[f] = p && 'function' != typeof x[f] ? e[f] : h && a ? i(s, r) : d && x[f] == s ? function (t) {
          var n = function n(_n, e, r) {
            if (this instanceof t) {
              switch (arguments.length) {case 0:
                  return new t();case 1:
                  return new t(_n);case 2:
                  return new t(_n, e);}return new t(_n, e, r);
            }return t.apply(this, arguments);
          };return n.prototype = t.prototype, n;
        }(s) : y && 'function' == typeof s ? i(Function.call, s) : s, y && ((g.virtual || (g.virtual = {}))[f] = s, t & c.R && b && !b[f] && u(b, f, s)));
      }
    };c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, t.exports = c;
  }, function (t, n, e) {
    var r = e(4),
        o = e(12);t.exports = e(2) ? function (t, n, e) {
      return r.f(t, n, o(1, e));
    } : function (t, n, e) {
      return t[n] = e, t;
    };
  }, function (t, n, e) {
    var r = e(67),
        o = e(16);t.exports = function (t) {
      return r(o(t));
    };
  }, function (t, n, e) {
    var r = e(25)('wks'),
        o = e(13),
        i = e(1).Symbol,
        u = 'function' == typeof i;(t.exports = function (t) {
      return r[t] || (r[t] = u && i[t] || (u ? i : o)('Symbol.' + t));
    }).store = r;
  }, function (t, n, e) {
    var r = e(11);t.exports = function (t) {
      if (!r(t)) throw TypeError(t + ' is not an object!');return t;
    };
  }, function (t, n) {
    t.exports = function (t) {
      try {
        return !!t();
      } catch (t) {
        return !0;
      }
    };
  }, function (t, n) {
    t.exports = function (t) {
      return 'object' == (typeof t === 'undefined' ? 'undefined' : _typeof(t)) ? null !== t : 'function' == typeof t;
    };
  }, function (t, n) {
    t.exports = function (t, n) {
      return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: n };
    };
  }, function (t, n) {
    var e = 0,
        r = Math.random();t.exports = function (t) {
      return 'Symbol('.concat(void 0 === t ? '' : t, ')_', (++e + r).toString(36));
    };
  }, function (t, n, e) {
    'use strict';
    n.__esModule = !0, n.default = function (t, n) {
      if (!(t instanceof n)) throw new TypeError('Cannot call a class as a function');
    };
  }, function (t, n, e) {
    'use strict';
    n.__esModule = !0;var r = e(49),
        o = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(r);n.default = function () {
      function t(t, n) {
        for (var e = 0; e < n.length; e++) {
          var r = n[e];r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), (0, o.default)(t, r.key, r);
        }
      }return function (n, e, r) {
        return e && t(n.prototype, e), r && t(n, r), n;
      };
    }();
  }, function (t, n) {
    t.exports = function (t) {
      if (void 0 == t) throw TypeError('Can\'t call method on  ' + t);return t;
    };
  }, function (t, n) {
    t.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
  }, function (t, n) {
    t.exports = {};
  }, function (t, n) {
    t.exports = !0;
  }, function (t, n, e) {
    var r = e(9),
        o = e(72),
        i = e(17),
        u = e(24)('IE_PROTO'),
        c = function c() {},
        _f = function f() {
      var t,
          n = e(33)('iframe'),
          r = i.length;for (n.style.display = 'none', e(66).appendChild(n), n.src = 'javascript:', t = n.contentWindow.document, t.open(), t.write('<script>document.F=Object<\/script>'), t.close(), _f = t.F; r--;) {
        delete _f.prototype[i[r]];
      }return _f();
    };t.exports = Object.create || function (t, n) {
      var e;return null !== t ? (c.prototype = r(t), e = new c(), c.prototype = null, e[u] = t) : e = _f(), void 0 === n ? e : o(e, n);
    };
  }, function (t, n, e) {
    var r = e(40),
        o = e(17);t.exports = Object.keys || function (t) {
      return r(t, o);
    };
  }, function (t, n) {
    n.f = {}.propertyIsEnumerable;
  }, function (t, n, e) {
    var r = e(4).f,
        o = e(3),
        i = e(8)('toStringTag');t.exports = function (t, n, e) {
      t && !o(t = e ? t : t.prototype, i) && r(t, i, { configurable: !0, value: n });
    };
  }, function (t, n, e) {
    var r = e(25)('keys'),
        o = e(13);t.exports = function (t) {
      return r[t] || (r[t] = o(t));
    };
  }, function (t, n, e) {
    var r = e(1),
        o = r['__core-js_shared__'] || (r['__core-js_shared__'] = {});t.exports = function (t) {
      return o[t] || (o[t] = {});
    };
  }, function (t, n) {
    var e = Math.ceil,
        r = Math.floor;t.exports = function (t) {
      return isNaN(t = +t) ? 0 : (t > 0 ? r : e)(t);
    };
  }, function (t, n, e) {
    var r = e(11);t.exports = function (t, n) {
      if (!r(t)) return t;var e, o;if (n && 'function' == typeof (e = t.toString) && !r(o = e.call(t))) return o;if ('function' == typeof (e = t.valueOf) && !r(o = e.call(t))) return o;if (!n && 'function' == typeof (e = t.toString) && !r(o = e.call(t))) return o;throw TypeError('Can\'t convert object to primitive value');
    };
  }, function (t, n, e) {
    var r = e(1),
        o = e(0),
        i = e(19),
        u = e(29),
        c = e(4).f;t.exports = function (t) {
      var n = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});'_' == t.charAt(0) || t in n || c(n, t, { value: u.f(t) });
    };
  }, function (t, n, e) {
    n.f = e(8);
  }, function (t, n, e) {
    'use strict';
    function r(t) {
      return t && t.__esModule ? t : { default: t };
    }n.__esModule = !0;var o = e(53),
        i = r(o),
        u = e(52),
        c = r(u),
        f = 'function' == typeof c.default && 'symbol' == _typeof(i.default) ? function (t) {
      return typeof t === 'undefined' ? 'undefined' : _typeof(t);
    } : function (t) {
      return t && 'function' == typeof c.default && t.constructor === c.default && t !== c.default.prototype ? 'symbol' : typeof t === 'undefined' ? 'undefined' : _typeof(t);
    };n.default = 'function' == typeof c.default && 'symbol' === f(i.default) ? function (t) {
      return void 0 === t ? 'undefined' : f(t);
    } : function (t) {
      return t && 'function' == typeof c.default && t.constructor === c.default && t !== c.default.prototype ? 'symbol' : void 0 === t ? 'undefined' : f(t);
    };
  }, function (t, n) {
    var e = {}.toString;t.exports = function (t) {
      return e.call(t).slice(8, -1);
    };
  }, function (t, n, e) {
    var r = e(62);t.exports = function (t, n, e) {
      if (r(t), void 0 === n) return t;switch (e) {case 1:
          return function (e) {
            return t.call(n, e);
          };case 2:
          return function (e, r) {
            return t.call(n, e, r);
          };case 3:
          return function (e, r, o) {
            return t.call(n, e, r, o);
          };}return function () {
        return t.apply(n, arguments);
      };
    };
  }, function (t, n, e) {
    var r = e(11),
        o = e(1).document,
        i = r(o) && r(o.createElement);t.exports = function (t) {
      return i ? o.createElement(t) : {};
    };
  }, function (t, n, e) {
    t.exports = !e(2) && !e(10)(function () {
      return 7 != Object.defineProperty(e(33)('div'), 'a', { get: function get() {
          return 7;
        } }).a;
    });
  }, function (t, n, e) {
    'use strict';
    var r = e(19),
        o = e(5),
        i = e(41),
        u = e(6),
        c = e(3),
        f = e(18),
        a = e(69),
        s = e(23),
        l = e(39),
        p = e(8)('iterator'),
        v = !([].keys && 'next' in [].keys()),
        y = function y() {
      return this;
    };t.exports = function (t, n, e, h, d, g, b) {
      a(e, n, h);var x,
          _,
          m,
          L = function L(t) {
        if (!v && t in S) return S[t];switch (t) {case 'keys':case 'values':
            return function () {
              return new e(this, t);
            };}return function () {
          return new e(this, t);
        };
      },
          M = n + ' Iterator',
          P = 'values' == d,
          O = !1,
          S = t.prototype,
          w = S[p] || S['@@iterator'] || d && S[d],
          j = w || L(d),
          T = d ? P ? L('entries') : j : void 0,
          k = 'Array' == n ? S.entries || w : w;if (k && (m = l(k.call(new t()))) !== Object.prototype && m.next && (s(m, M, !0), r || c(m, p) || u(m, p, y)), P && w && 'values' !== w.name && (O = !0, j = function j() {
        return w.call(this);
      }), r && !b || !v && !O && S[p] || u(S, p, j), f[n] = j, f[M] = y, d) if (x = { values: P ? j : L('values'), keys: g ? j : L('keys'), entries: T }, b) for (_ in x) {
        _ in S || i(S, _, x[_]);
      } else o(o.P + o.F * (v || O), n, x);return x;
    };
  }, function (t, n, e) {
    var r = e(22),
        o = e(12),
        i = e(7),
        u = e(27),
        c = e(3),
        f = e(34),
        a = Object.getOwnPropertyDescriptor;n.f = e(2) ? a : function (t, n) {
      if (t = i(t), n = u(n, !0), f) try {
        return a(t, n);
      } catch (t) {}if (c(t, n)) return o(!r.f.call(t, n), t[n]);
    };
  }, function (t, n, e) {
    var r = e(40),
        o = e(17).concat('length', 'prototype');n.f = Object.getOwnPropertyNames || function (t) {
      return r(t, o);
    };
  }, function (t, n) {
    n.f = Object.getOwnPropertySymbols;
  }, function (t, n, e) {
    var r = e(3),
        o = e(42),
        i = e(24)('IE_PROTO'),
        u = Object.prototype;t.exports = Object.getPrototypeOf || function (t) {
      return t = o(t), r(t, i) ? t[i] : 'function' == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? u : null;
    };
  }, function (t, n, e) {
    var r = e(3),
        o = e(7),
        i = e(64)(!1),
        u = e(24)('IE_PROTO');t.exports = function (t, n) {
      var e,
          c = o(t),
          f = 0,
          a = [];for (e in c) {
        e != u && r(c, e) && a.push(e);
      }for (; n.length > f;) {
        r(c, e = n[f++]) && (~i(a, e) || a.push(e));
      }return a;
    };
  }, function (t, n, e) {
    t.exports = e(6);
  }, function (t, n, e) {
    var r = e(16);t.exports = function (t) {
      return Object(r(t));
    };
  }, function (t, n, e) {
    'use strict';
    function r(t) {
      return t && t.__esModule ? t : { default: t };
    }Object.defineProperty(n, '__esModule', { value: !0 }), n.MercatorProjection = void 0;var o = e(50),
        i = r(o),
        u = e(14),
        c = r(u),
        f = e(15),
        a = r(f),
        s = e(55),
        l = r(s),
        p = e(54),
        v = r(p),
        y = e(46),
        h = e(45),
        d = e(44);n.MercatorProjection = function (t) {
      function n() {
        (0, c.default)(this, n);var t = (0, l.default)(this, (n.__proto__ || (0, i.default)(n)).call(this));return t.EARTHRADIUS = 6370996.81, t.MCBAND = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0], t.LLBAND = [75, 60, 45, 30, 15, 0], t.MC2LL = [[1.410526172116255e-8, 898305509648872e-20, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -.03801003308653, 17337981.2], [-7.435856389565537e-9, 8983055097726239e-21, -.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86], [-3.030883460898826e-8, 898305509983578e-20, .30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, .32710905363475, 6856817.37], [-1.981981304930552e-8, 8983055099779535e-21, .03278182852591, 40.31678527705744, .65659298677277, -4.44255534477492, .85341911805263, .12923347998204, -.04625736007561, 4482777.06], [3.09191371068437e-9, 8983055096812155e-21, 6995724062e-14, 23.10934304144901, -.00023663490511, -.6321817810242, -.00663494467273, .03430082397953, -.00466043876332, 2555164.4], [2.890871144776878e-9, 8983055095805407e-21, -3.068298e-8, 7.47137025468032, -353937994e-14, -.02145144861037, -1234426596e-14, .00010322952773, -323890364e-14, 826088.5]], t.LL2MC = [[-.0015702102444, 111320.7020616939, 0x60e374c3105a3, -0x24bb4115e2e164, 0x5cc55543bb0ae8, -0x7ce070193f3784, 0x5e7ca61ddf8150, -0x261a578d8b24d0, 0x665d60f3742ca, 82.5], [.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5], [.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5], [.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5], [-.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5], [-.0003218135878613132, 111320.7020701615, .00369383431289, 823725.6402795718, .46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, .37238884252424, 7.45]], t;
      }return (0, v.default)(n, t), (0, a.default)(n, [{ key: 'getDistanceByMC', value: function value(t, n) {
          if (!t || !n) return 0;var e, r, o, i;return (t = this.convertMC2LL(t)) ? (e = this.toRadians(t.lng), r = this.toRadians(t.lat), (n = this.convertMC2LL(n)) ? (o = this.toRadians(n.lng), i = this.toRadians(n.lat), this.getDistance(e, o, r, i)) : 0) : 0;
        } }, { key: 'getDistanceByLL', value: function value(t, n) {
          if (!t || !n) return 0;t.lng = this.getLoop(t.lng, -180, 180), t.lat = this.getRange(t.lat, -74, 74), n.lng = this.getLoop(n.lng, -180, 180), n.lat = this.getRange(n.lat, -74, 74);var e, r, o, i;return e = this.toRadians(t.lng), o = this.toRadians(t.lat), r = this.toRadians(n.lng), i = this.toRadians(n.lat), this.getDistance(e, r, o, i);
        } }, { key: 'convertMC2LL', value: function value(t) {
          var n, e;n = new h.Point(Math.abs(t.lng), Math.abs(t.lat));for (var r = 0; r < this.MCBAND.length; r++) {
            if (n.lat >= this.MCBAND[r]) {
              e = this.MC2LL[r];break;
            }
          }var o = this.convertor(t, e);return new h.Point(o.lng.toFixed(6), o.lat.toFixed(6));
        } }, { key: 'convertLL2MC', value: function value(t) {
          var n, e;t.lng = this.getLoop(t.lng, -180, 180), t.lat = this.getRange(t.lat, -74, 74), n = new h.Point(t.lng, t.lat);for (var r = 0; r < this.LLBAND.length; r++) {
            if (n.lat >= this.LLBAND[r]) {
              e = this.LL2MC[r];break;
            }
          }if (!e) for (var o = this.LLBAND.length - 1; o >= 0; o--) {
            if (n.lat <= -this.LLBAND[o]) {
              e = this.LL2MC[o];break;
            }
          }var i = this.convertor(t, e);return new h.Point(i.lng.toFixed(2), i.lat.toFixed(2));
        } }, { key: 'convertor', value: function value(t, n) {
          if (t && n) {
            var e = n[0] + n[1] * Math.abs(t.lng),
                r = Math.abs(t.lat) / n[9],
                o = n[2] + n[3] * r + n[4] * r * r + n[5] * r * r * r + n[6] * r * r * r * r + n[7] * r * r * r * r * r + n[8] * r * r * r * r * r * r;return e *= t.lng < 0 ? -1 : 1, o *= t.lat < 0 ? -1 : 1, new h.Point(e, o);
          }
        } }, { key: 'getDistance', value: function value(t, n, e, r) {
          return this.EARTHRADIUS * Math.acos(Math.sin(e) * Math.sin(r) + Math.cos(e) * Math.cos(r) * Math.cos(n - t));
        } }, { key: 'toRadians', value: function value(t) {
          return Math.PI * t / 180;
        } }, { key: 'toDegrees', value: function value(t) {
          return 180 * t / Math.PI;
        } }, { key: 'getRange', value: function value(t, n, e) {
          return null != n && (t = Math.max(t, n)), null != e && (t = Math.min(t, e)), t;
        } }, { key: 'getLoop', value: function value(t, n, e) {
          for (; t > e;) {
            t -= e - n;
          }for (; t < n;) {
            t += e - n;
          }return t;
        } }, { key: 'lngLatToMercator', value: function value(t) {
          return this.convertLL2MC(t);
        } }, { key: 'lngLatToPoint', value: function value(t) {
          var n = this.convertLL2MC(t);return new d.Pixel(n.lng, n.lat);
        } }, { key: 'mercatorToLngLat', value: function value(t) {
          return this.convertMC2LL(t);
        } }, { key: 'pointToLngLat', value: function value(t) {
          var n = new h.Point(t.x, t.y);return this.convertMC2LL(n);
        } }, { key: 'pointToPixel', value: function value(t, n, e, r, o) {
          if (t) {
            t = this.lngLatToMercator(t, o), e = this.lngLatToMercator(e);var i = this.getZoomUnits(n),
                u = Math.round((t.lng - e.lng) / i + r.width / 2),
                c = Math.round((e.lat - t.lat) / i + r.height / 2);return new d.Pixel(u, c);
          }
        } }, { key: 'pixelToPoint', value: function value(t, n, e, r, o) {
          if (t) {
            var i = this.getZoomUnits(n),
                u = e.lng + i * (t.x - r.width / 2),
                c = e.lat - i * (t.y - r.height / 2),
                f = new h.Point(u, c);return this.mercatorToLngLat(f, o);
          }
        } }, { key: 'getZoomUnits', value: function value(t) {
          return Math.pow(2, 18 - t);
        } }]), n;
    }(y.Projection);
  }, function (t, n, e) {
    'use strict';
    function r(t) {
      return t && t.__esModule ? t : { default: t };
    }Object.defineProperty(n, '__esModule', { value: !0 }), n.Pixel = void 0;var o = e(14),
        i = r(o),
        u = e(15),
        c = r(u);n.Pixel = function () {
      function t(n, e) {
        (0, i.default)(this, t), this.x = n || 0, this.y = e || 0;
      }return (0, c.default)(t, [{ key: 'Pixel', value: function value(t) {
          return t && t.x == this.x && t.y == this.y;
        } }]), t;
    }();
  }, function (t, n, e) {
    'use strict';
    function r(t) {
      return 'string' == typeof t;
    }function o(t, n) {
      isNaN(t) && (t = isNaN(t) ? 0 : t), r(t) && (t = parseFloat(t)), isNaN(n) && (n = isNaN(n) ? 0 : n), r(n) && (n = parseFloat(n)), this.lng = t, this.lat = n;
    }Object.defineProperty(n, '__esModule', { value: !0 }), n.isString = r, n.Point = o, o.isInRange = function (t) {
      return t && t.lng <= 180 && t.lng >= -180 && t.lat <= 74 && t.lat >= -74;
    }, o.prototype.equals = function (t) {
      return t && this.lat == t.lat && this.lng == t.lng;
    }, n.default = o;
  }, function (t, n, e) {
    'use strict';
    function r(t) {
      return t && t.__esModule ? t : { default: t };
    }Object.defineProperty(n, '__esModule', { value: !0 }), n.Projection = void 0;var o = e(14),
        i = r(o),
        u = e(15),
        c = r(u);n.Projection = function () {
      function t() {
        (0, i.default)(this, t);
      }return (0, c.default)(t, [{ key: 'lngLatToPoint', value: function value() {
          throw 'lngLatToPoint方法未实现';
        } }, { key: 'pointToLngLat', value: function value() {
          throw 'pointToLngLat方法未实现';
        } }]), t;
    }();
  }, function (t, n, e) {
    'use strict';
    function r(t) {
      return '[object Array]' == Object.prototype.toString.call(t);
    }function o(t, n) {
      var e = n.getZoom(),
          r = n.getCenter(),
          o = n.getSize();return a.pointToPixel(t, e, r, o);
    }function i(t, n) {
      var e = t;t = r(e) ? e : e.request.data, n = n || e.request.map;for (var i = [], u = 0, c = t.length; u < c; u++) {
        i.push(o(t[u], n));
      }return i;
    }function u(t, n) {
      var e = n.zoom,
          r = n.center,
          o = n.size;return a.pointToPixel(t, e, r, o);
    }function c(t, n) {
      var e = t;t = r(e) ? e : e.request.data, n = n || e.request.map;for (var o = [], i = 0, c = t.length; i < c; i++) {
        o.push(u(t[i], n));
      }return o;
    }Object.defineProperty(n, '__esModule', { value: !0 }), n.geo = void 0, n.pointToPixel = o, n.pointsToPixels = i, n.pointToPixelWorker = u, n.pointsToPixelsWoker = c;var f = e(43),
        a = n.geo = { pointToPixel: function pointToPixel(t, n, e, r) {
        return this.projection.pointToPixel(t, n, e, r);
      }, lngLatToMercator: function lngLatToMercator(t) {
        return this.projection.convertLL2MC(t);
      }, projection: new f.MercatorProjection() };
  }, function (t, n, e) {
    t.exports = { default: e(56), __esModule: !0 };
  }, function (t, n, e) {
    t.exports = { default: e(57), __esModule: !0 };
  }, function (t, n, e) {
    t.exports = { default: e(58), __esModule: !0 };
  }, function (t, n, e) {
    t.exports = { default: e(59), __esModule: !0 };
  }, function (t, n, e) {
    t.exports = { default: e(60), __esModule: !0 };
  }, function (t, n, e) {
    t.exports = { default: e(61), __esModule: !0 };
  }, function (t, n, e) {
    'use strict';
    function r(t) {
      return t && t.__esModule ? t : { default: t };
    }n.__esModule = !0;var o = e(51),
        i = r(o),
        u = e(48),
        c = r(u),
        f = e(30),
        a = r(f);n.default = function (t, n) {
      if ('function' != typeof n && null !== n) throw new TypeError('Super expression must either be null or a function, not ' + (void 0 === n ? 'undefined' : (0, a.default)(n)));t.prototype = (0, c.default)(n && n.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), n && (i.default ? (0, i.default)(t, n) : t.__proto__ = n);
    };
  }, function (t, n, e) {
    'use strict';
    n.__esModule = !0;var r = e(30),
        o = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(r);n.default = function (t, n) {
      if (!t) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return !n || 'object' !== (void 0 === n ? 'undefined' : (0, o.default)(n)) && 'function' != typeof n ? t : n;
    };
  }, function (t, n, e) {
    e(80);var r = e(0).Object;t.exports = function (t, n) {
      return r.create(t, n);
    };
  }, function (t, n, e) {
    e(81);var r = e(0).Object;t.exports = function (t, n, e) {
      return r.defineProperty(t, n, e);
    };
  }, function (t, n, e) {
    e(82), t.exports = e(0).Object.getPrototypeOf;
  }, function (t, n, e) {
    e(83), t.exports = e(0).Object.setPrototypeOf;
  }, function (t, n, e) {
    e(86), e(84), e(87), e(88), t.exports = e(0).Symbol;
  }, function (t, n, e) {
    e(85), e(89), t.exports = e(29).f('iterator');
  }, function (t, n) {
    t.exports = function (t) {
      if ('function' != typeof t) throw TypeError(t + ' is not a function!');return t;
    };
  }, function (t, n) {
    t.exports = function () {};
  }, function (t, n, e) {
    var r = e(7),
        o = e(78),
        i = e(77);t.exports = function (t) {
      return function (n, e, u) {
        var c,
            f = r(n),
            a = o(f.length),
            s = i(u, a);if (t && e != e) {
          for (; a > s;) {
            if ((c = f[s++]) != c) return !0;
          }
        } else for (; a > s; s++) {
          if ((t || s in f) && f[s] === e) return t || s || 0;
        }return !t && -1;
      };
    };
  }, function (t, n, e) {
    var r = e(21),
        o = e(38),
        i = e(22);t.exports = function (t) {
      var n = r(t),
          e = o.f;if (e) for (var u, c = e(t), f = i.f, a = 0; c.length > a;) {
        f.call(t, u = c[a++]) && n.push(u);
      }return n;
    };
  }, function (t, n, e) {
    var r = e(1).document;t.exports = r && r.documentElement;
  }, function (t, n, e) {
    var r = e(31);t.exports = Object('z').propertyIsEnumerable(0) ? Object : function (t) {
      return 'String' == r(t) ? t.split('') : Object(t);
    };
  }, function (t, n, e) {
    var r = e(31);t.exports = Array.isArray || function (t) {
      return 'Array' == r(t);
    };
  }, function (t, n, e) {
    'use strict';
    var r = e(20),
        o = e(12),
        i = e(23),
        u = {};e(6)(u, e(8)('iterator'), function () {
      return this;
    }), t.exports = function (t, n, e) {
      t.prototype = r(u, { next: o(1, e) }), i(t, n + ' Iterator');
    };
  }, function (t, n) {
    t.exports = function (t, n) {
      return { value: n, done: !!t };
    };
  }, function (t, n, e) {
    var r = e(13)('meta'),
        o = e(11),
        i = e(3),
        u = e(4).f,
        c = 0,
        f = Object.isExtensible || function () {
      return !0;
    },
        a = !e(10)(function () {
      return f(Object.preventExtensions({}));
    }),
        s = function s(t) {
      u(t, r, { value: { i: 'O' + ++c, w: {} } });
    },
        l = function l(t, n) {
      if (!o(t)) return 'symbol' == (typeof t === 'undefined' ? 'undefined' : _typeof(t)) ? t : ('string' == typeof t ? 'S' : 'P') + t;if (!i(t, r)) {
        if (!f(t)) return 'F';if (!n) return 'E';s(t);
      }return t[r].i;
    },
        p = function p(t, n) {
      if (!i(t, r)) {
        if (!f(t)) return !0;if (!n) return !1;s(t);
      }return t[r].w;
    },
        v = function v(t) {
      return a && y.NEED && f(t) && !i(t, r) && s(t), t;
    },
        y = t.exports = { KEY: r, NEED: !1, fastKey: l, getWeak: p, onFreeze: v };
  }, function (t, n, e) {
    var r = e(4),
        o = e(9),
        i = e(21);t.exports = e(2) ? Object.defineProperties : function (t, n) {
      o(t);for (var e, u = i(n), c = u.length, f = 0; c > f;) {
        r.f(t, e = u[f++], n[e]);
      }return t;
    };
  }, function (t, n, e) {
    var r = e(7),
        o = e(37).f,
        i = {}.toString,
        u = 'object' == (typeof window === 'undefined' ? 'undefined' : _typeof(window)) && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
        c = function c(t) {
      try {
        return o(t);
      } catch (t) {
        return u.slice();
      }
    };t.exports.f = function (t) {
      return u && '[object Window]' == i.call(t) ? c(t) : o(r(t));
    };
  }, function (t, n, e) {
    var r = e(5),
        o = e(0),
        i = e(10);t.exports = function (t, n) {
      var e = (o.Object || {})[t] || Object[t],
          u = {};u[t] = n(e), r(r.S + r.F * i(function () {
        e(1);
      }), 'Object', u);
    };
  }, function (t, n, e) {
    var r = e(11),
        o = e(9),
        i = function i(t, n) {
      if (o(t), !r(n) && null !== n) throw TypeError(n + ': can\'t set as prototype!');
    };t.exports = { set: Object.setPrototypeOf || ('__proto__' in {} ? function (t, n, r) {
        try {
          r = e(32)(Function.call, e(36).f(Object.prototype, '__proto__').set, 2), r(t, []), n = !(t instanceof Array);
        } catch (t) {
          n = !0;
        }return function (t, e) {
          return i(t, e), n ? t.__proto__ = e : r(t, e), t;
        };
      }({}, !1) : void 0), check: i };
  }, function (t, n, e) {
    var r = e(26),
        o = e(16);t.exports = function (t) {
      return function (n, e) {
        var i,
            u,
            c = String(o(n)),
            f = r(e),
            a = c.length;return f < 0 || f >= a ? t ? '' : void 0 : (i = c.charCodeAt(f), i < 55296 || i > 56319 || f + 1 === a || (u = c.charCodeAt(f + 1)) < 56320 || u > 57343 ? t ? c.charAt(f) : i : t ? c.slice(f, f + 2) : u - 56320 + (i - 55296 << 10) + 65536);
      };
    };
  }, function (t, n, e) {
    var r = e(26),
        o = Math.max,
        i = Math.min;t.exports = function (t, n) {
      return t = r(t), t < 0 ? o(t + n, 0) : i(t, n);
    };
  }, function (t, n, e) {
    var r = e(26),
        o = Math.min;t.exports = function (t) {
      return t > 0 ? o(r(t), 9007199254740991) : 0;
    };
  }, function (t, n, e) {
    'use strict';
    var r = e(63),
        o = e(70),
        i = e(18),
        u = e(7);t.exports = e(35)(Array, 'Array', function (t, n) {
      this._t = u(t), this._i = 0, this._k = n;
    }, function () {
      var t = this._t,
          n = this._k,
          e = this._i++;return !t || e >= t.length ? (this._t = void 0, o(1)) : 'keys' == n ? o(0, e) : 'values' == n ? o(0, t[e]) : o(0, [e, t[e]]);
    }, 'values'), i.Arguments = i.Array, r('keys'), r('values'), r('entries');
  }, function (t, n, e) {
    var r = e(5);r(r.S, 'Object', { create: e(20) });
  }, function (t, n, e) {
    var r = e(5);r(r.S + r.F * !e(2), 'Object', { defineProperty: e(4).f });
  }, function (t, n, e) {
    var r = e(42),
        o = e(39);e(74)('getPrototypeOf', function () {
      return function (t) {
        return o(r(t));
      };
    });
  }, function (t, n, e) {
    var r = e(5);r(r.S, 'Object', { setPrototypeOf: e(75).set });
  }, function (t, n) {}, function (t, n, e) {
    'use strict';
    var r = e(76)(!0);e(35)(String, 'String', function (t) {
      this._t = String(t), this._i = 0;
    }, function () {
      var t,
          n = this._t,
          e = this._i;return e >= n.length ? { value: void 0, done: !0 } : (t = r(n, e), this._i += t.length, { value: t, done: !1 });
    });
  }, function (t, n, e) {
    'use strict';
    var r = e(1),
        o = e(3),
        i = e(2),
        u = e(5),
        c = e(41),
        f = e(71).KEY,
        a = e(10),
        s = e(25),
        l = e(23),
        p = e(13),
        v = e(8),
        y = e(29),
        h = e(28),
        d = e(65),
        g = e(68),
        b = e(9),
        x = e(7),
        _ = e(27),
        m = e(12),
        L = e(20),
        M = e(73),
        P = e(36),
        O = e(4),
        S = e(21),
        w = P.f,
        j = O.f,
        T = M.f,
        _k = r.Symbol,
        E = r.JSON,
        C = E && E.stringify,
        N = v('_hidden'),
        A = v('toPrimitive'),
        R = {}.propertyIsEnumerable,
        D = s('symbol-registry'),
        F = s('symbols'),
        I = s('op-symbols'),
        B = Object.prototype,
        G = 'function' == typeof _k,
        W = r.QObject,
        V = !W || !W.prototype || !W.prototype.findChild,
        q = i && a(function () {
      return 7 != L(j({}, 'a', { get: function get() {
          return j(this, 'a', { value: 7 }).a;
        } })).a;
    }) ? function (t, n, e) {
      var r = w(B, n);r && delete B[n], j(t, n, e), r && t !== B && j(B, n, r);
    } : j,
        H = function H(t) {
      var n = F[t] = L(_k.prototype);return n._k = t, n;
    },
        U = G && 'symbol' == _typeof(_k.iterator) ? function (t) {
      return 'symbol' == (typeof t === 'undefined' ? 'undefined' : _typeof(t));
    } : function (t) {
      return t instanceof _k;
    },
        z = function z(t, n, e) {
      return t === B && z(I, n, e), b(t), n = _(n, !0), b(e), o(F, n) ? (e.enumerable ? (o(t, N) && t[N][n] && (t[N][n] = !1), e = L(e, { enumerable: m(0, !1) })) : (o(t, N) || j(t, N, m(1, {})), t[N][n] = !0), q(t, n, e)) : j(t, n, e);
    },
        J = function J(t, n) {
      b(t);for (var e, r = d(n = x(n)), o = 0, i = r.length; i > o;) {
        z(t, e = r[o++], n[e]);
      }return t;
    },
        Z = function Z(t, n) {
      return void 0 === n ? L(t) : J(L(t), n);
    },
        K = function K(t) {
      var n = R.call(this, t = _(t, !0));return !(this === B && o(F, t) && !o(I, t)) && (!(n || !o(this, t) || !o(F, t) || o(this, N) && this[N][t]) || n);
    },
        Y = function Y(t, n) {
      if (t = x(t), n = _(n, !0), t !== B || !o(F, n) || o(I, n)) {
        var e = w(t, n);return !e || !o(F, n) || o(t, N) && t[N][n] || (e.enumerable = !0), e;
      }
    },
        Q = function Q(t) {
      for (var n, e = T(x(t)), r = [], i = 0; e.length > i;) {
        o(F, n = e[i++]) || n == N || n == f || r.push(n);
      }return r;
    },
        X = function X(t) {
      for (var n, e = t === B, r = T(e ? I : x(t)), i = [], u = 0; r.length > u;) {
        !o(F, n = r[u++]) || e && !o(B, n) || i.push(F[n]);
      }return i;
    };G || (_k = function k() {
      if (this instanceof _k) throw TypeError('Symbol is not a constructor!');var t = p(arguments.length > 0 ? arguments[0] : void 0),
          n = function n(e) {
        this === B && n.call(I, e), o(this, N) && o(this[N], t) && (this[N][t] = !1), q(this, t, m(1, e));
      };return i && V && q(B, t, { configurable: !0, set: n }), H(t);
    }, c(_k.prototype, 'toString', function () {
      return this._k;
    }), P.f = Y, O.f = z, e(37).f = M.f = Q, e(22).f = K, e(38).f = X, i && !e(19) && c(B, 'propertyIsEnumerable', K, !0), y.f = function (t) {
      return H(v(t));
    }), u(u.G + u.W + u.F * !G, { Symbol: _k });for (var $ = 'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), tt = 0; $.length > tt;) {
      v($[tt++]);
    }for (var nt = S(v.store), et = 0; nt.length > et;) {
      h(nt[et++]);
    }u(u.S + u.F * !G, 'Symbol', { for: function _for(t) {
        return o(D, t += '') ? D[t] : D[t] = _k(t);
      }, keyFor: function keyFor(t) {
        if (!U(t)) throw TypeError(t + ' is not a symbol!');for (var n in D) {
          if (D[n] === t) return n;
        }
      }, useSetter: function useSetter() {
        V = !0;
      }, useSimple: function useSimple() {
        V = !1;
      } }), u(u.S + u.F * !G, 'Object', { create: Z, defineProperty: z, defineProperties: J, getOwnPropertyDescriptor: Y, getOwnPropertyNames: Q, getOwnPropertySymbols: X }), E && u(u.S + u.F * (!G || a(function () {
      var t = _k();return '[null]' != C([t]) || '{}' != C({ a: t }) || '{}' != C(Object(t));
    })), 'JSON', { stringify: function stringify(t) {
        if (void 0 !== t && !U(t)) {
          for (var n, e, r = [t], o = 1; arguments.length > o;) {
            r.push(arguments[o++]);
          }return n = r[1], 'function' == typeof n && (e = n), !e && g(n) || (n = function n(t, _n2) {
            if (e && (_n2 = e.call(this, t, _n2)), !U(_n2)) return _n2;
          }), r[1] = n, C.apply(E, r);
        }
      } }), _k.prototype[A] || e(6)(_k.prototype, A, _k.prototype.valueOf), l(_k, 'Symbol'), l(Math, 'Math', !0), l(r.JSON, 'JSON', !0);
  }, function (t, n, e) {
    e(28)('asyncIterator');
  }, function (t, n, e) {
    e(28)('observable');
  }, function (t, n, e) {
    e(79);for (var r = e(1), o = e(6), i = e(18), u = e(8)('toStringTag'), c = 'CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList'.split(','), f = 0; f < c.length; f++) {
      var a = c[f],
          s = r[a],
          l = s && s.prototype;l && !l[u] && o(l, u, a), i[a] = i.Array;
    }
  }]);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(56)(module)))

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Label = exports.Label = function () {
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
                    result = this._getCenterRectange();
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
                truelen = 0;
            for (var x = 0; x < len; x++) {
                if (str.charCodeAt(x) > 128) {
                    truelen += 2;
                } else {
                    truelen += 1;
                }
            }
            return truelen;
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
        key: '_getCenterRectange',
        value: function _getCenterRectange() {
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

/***/ }),
/* 8 */
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
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GriddingOverlay = undefined;

var _pointToPixel = __webpack_require__(3);

var GriddingOverlay = exports.GriddingOverlay = {
    toRecGrids: function toRecGrids(webObj) {
        var _webObj$request$data = webObj.request.data,
            points = _webObj$request$data.points,
            zoomUnit = _webObj$request$data.zoomUnit,
            size = _webObj$request$data.size,
            mapSize = _webObj$request$data.mapSize,
            nwMc = _webObj$request$data.nwMc,
            type = _webObj$request$data.type;

        var map = webObj.request.map;

        GriddingOverlay._calculatePixel(map, points);
        var result = GriddingOverlay.recGrids(points, map, nwMc, size, zoomUnit, mapSize, type);
        webObj.request.data = result;
        return webObj;
    },
    _calculatePixel: function _calculatePixel(map, data) {
        for (var j = 0, len = data.length; j < len; j++) {
            var geometry = data[j].geometry;
            var coordinates = geometry.coordinates;
            geometry['pixel'] = (0, _pointToPixel.pointToPixelWorker)({
                lng: coordinates[0],
                lat: coordinates[1]
            }, map);

            if (data[j].count == null) {
                throw new TypeError('inMap.GriddingOverlay: data is Invalid format ');
            }
        }
        return data;
    },
    recGrids: function recGrids(data, map, nwMc, size, zoomUnit, mapSize, type) {
        if (data.length <= 0) {
            return {
                grids: []
            };
        }

        var grids = {};

        var gridStep = size / zoomUnit;
        var startXMc = parseInt(nwMc.x / size, 10) * size;
        var startX = (startXMc - nwMc.x) / zoomUnit;
        var endX = mapSize.width;
        var startYMc = parseInt(nwMc.y / size, 10) * size + size;
        var startY = (nwMc.y - startYMc) / zoomUnit;
        var endY = mapSize.height;

        var stockXA = [];
        var stickXAIndex = 0;
        while (startX + stickXAIndex * gridStep < endX) {
            var value = startX + stickXAIndex * gridStep;
            stockXA.push(value.toFixed(2));
            stickXAIndex++;
        }

        var stockYA = [];
        var stickYAIndex = 0;
        while (startY + stickYAIndex * gridStep < endY) {
            var _value = startY + stickYAIndex * gridStep;
            stockYA.push(_value.toFixed(2));
            stickYAIndex++;
        }

        for (var i = 0; i < stockXA.length; i++) {
            for (var j = 0; j < stockYA.length; j++) {
                var name = stockXA[i] + '_' + stockYA[j];
                grids[name] = {
                    x: parseFloat(stockXA[i]),
                    y: parseFloat(stockYA[j]),
                    list: [],
                    count: 0
                };
            }
        }
        for (var _i = 0; _i < data.length; _i++) {
            var item = data[_i];
            var x = item.geometry.pixel.x;
            var y = item.geometry.pixel.y;
            if (x >= startX && x <= endX && y >= startY && y <= endY) {
                for (var _j = 0; _j < stockXA.length; _j++) {
                    var dataX = Number(stockXA[_j]);
                    if (x >= dataX && x < dataX + gridStep) {
                        for (var k = 0; k < stockYA.length; k++) {
                            var dataY = Number(stockYA[k]);
                            if (y >= dataY && y < dataY + gridStep) {
                                var grid = grids[stockXA[_j] + '_' + stockYA[k]];
                                grid.list.push(item);
                                grid.count += item.count;
                            }
                        }
                    }
                }
            }
        }

        var result = [];
        for (var key in grids) {
            var _item = grids[key];
            if (type === 'avg' && _item.list.length > 0) {
                _item.count = _item.count / _item.list.length;
            }
            if (_item.count > 0) {
                result.push(_item);
            }
        }
        grids = null, stockXA = null, stockYA = null, data = null;

        return {
            grids: result
        };
    }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeatOverlay = undefined;

var _pointToPixel = __webpack_require__(3);

var HeatOverlay = exports.HeatOverlay = {
    pointsToPixels: function pointsToPixels(webObj) {
        webObj.request.data.forEach(function (val) {
            var point = val.geometry.coordinates;
            val.geometry['pixel'] = (0, _pointToPixel.pointToPixelWorker)({
                lng: point[0],
                lat: point[1]
            }, webObj.request.map);
            point = null;
        });
        return webObj;
    }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HoneycombOverlay = undefined;

var _pointToPixel = __webpack_require__(3);

var HoneycombOverlay = exports.HoneycombOverlay = {
    toRecGrids: function toRecGrids(webObj) {
        var _webObj$request$data = webObj.request.data,
            points = _webObj$request$data.points,
            zoomUnit = _webObj$request$data.zoomUnit,
            size = _webObj$request$data.size,
            mapSize = _webObj$request$data.mapSize,
            nwMc = _webObj$request$data.nwMc,
            type = _webObj$request$data.type;

        var map = webObj.request.map;
        HoneycombOverlay._calculatePixel(map, points);
        var gridsObj = HoneycombOverlay.honeycombGrid(points, map, nwMc, size, zoomUnit, mapSize, type);
        webObj.request.data = gridsObj;
        return webObj;
    },
    _calculatePixel: function _calculatePixel(map, data) {
        for (var j = 0, len = data.length; j < len; j++) {
            var geometry = data[j].geometry;
            var coordinates = geometry.coordinates;
            geometry['pixel'] = (0, _pointToPixel.pointToPixelWorker)({
                lng: coordinates[0],
                lat: coordinates[1]
            }, map);

            if (data[j].count == null) {
                throw new TypeError('inMap.GriddingOverlay: data is Invalid format ');
            }
        }
        return data;
    },

    honeycombGrid: function honeycombGrid(data, map, nwMc, size, zoomUnit, mapSize, type) {
        if (data.length <= 0) {
            return {
                grids: []
            };
        }

        var grids = {};
        var gridStep = Math.round(size / zoomUnit);
        var depthX = gridStep;
        var depthY = gridStep * 3 / 4;
        var sizeY = 2 * size * 3 / 4;
        var startYMc = parseInt(nwMc.y / sizeY + 1, 10) * sizeY;
        var startY = (nwMc.y - startYMc) / zoomUnit;
        startY = parseInt(startY, 10);
        var startXMc = parseInt(nwMc.x / size, 10) * size;
        var startX = (startXMc - nwMc.x) / zoomUnit;
        startX = parseInt(startX, 10);

        var endX = parseInt(mapSize.width + depthX, 10);
        var endY = parseInt(mapSize.height + depthY, 10);

        var pointX = startX;
        var pointY = startY;

        var odd = false;

        while (pointY < endY) {
            while (pointX < endX) {
                var x = odd ? pointX - depthX / 2 : pointX;
                x = parseInt(x, 10);
                grids[x + '|' + pointY] = grids[x + '|' + pointY] || {
                    x: x,
                    y: pointY,
                    list: [],
                    count: 0

                };

                pointX += depthX;
            }
            odd = !odd;
            pointX = startX;
            pointY += depthY;
        }

        for (var i in data) {
            var item = data[i];
            var pX = item.geometry.pixel.x;
            var pY = item.geometry.pixel.y;
            if (pX >= startX && pX <= endX && pY >= startY && pY <= endY) {
                var fixYIndex = Math.round((pY - startY) / depthY);
                var fixY = fixYIndex * depthY + startY;
                var fixXIndex = Math.round((pX - startX) / depthX);
                var fixX = fixXIndex * depthX + startX;

                if (fixYIndex % 2) {
                    fixX = fixX - depthX / 2;
                }
                if (fixX < startX || fixX > endX || fixY < startY || fixY > endY) {
                    continue;
                }
                if (grids[fixX + '|' + fixY]) {
                    grids[fixX + '|' + fixY].list.push(item);
                    grids[fixX + '|' + fixY].count += item.count;
                }
            }
        }

        var result = [];
        for (var key in grids) {
            var _item = grids[key];
            if (type == 'avg' && _item.count > 0) {
                _item.count = _item.count / _item.list.length;
            }
            if (_item.count > 0) {
                result.push(_item);
            }
        }
        grids = null, data = null;
        return {
            grids: result
        };
    }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LablEvading = undefined;

var _Label = __webpack_require__(7);

var LablEvading = exports.LablEvading = {
    merge: function merge(webObj) {
        var _webObj$request$data = webObj.request.data,
            pixels = _webObj$request$data.pixels,
            height = _webObj$request$data.height,
            borderWidth = _webObj$request$data.borderWidth,
            byteWidth = _webObj$request$data.byteWidth;


        var labels = pixels.map(function (val) {
            var radius = val.pixel.radius + borderWidth;
            return new _Label.Label(val.pixel.x, val.pixel.y, radius, height, byteWidth, val.name);
        });

        labels.sort(function (a, b) {
            return b.x - a.x;
        });
        var meet = void 0;
        do {
            meet = false;
            for (var i = 0; i < labels.length; i++) {
                var _temp = labels[i];
                for (var j = 0; j < labels.length; j++) {
                    if (i != j && _temp.show && _temp.isAnchorMeet(labels[j])) {
                        _temp.next();
                        meet = true;
                        break;
                    }
                }
            }
        } while (meet);
        var temp = [];
        labels.forEach(function (element) {
            if (element.show) {
                var pixel = element.getCurrentRect();
                temp.push({
                    text: element.text,
                    x: pixel.x,
                    y: pixel.y
                });
            }
        });

        return {
            data: temp,
            client: webObj
        };
    }
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LineStringOverlay = undefined;

var _pointToPixel = __webpack_require__(3);

var _Curive = __webpack_require__(30);

var LineStringOverlay = exports.LineStringOverlay = {
    transferCoordinate: function transferCoordinate(_coordinates, nwMc, zoomUnit) {
        return _coordinates.map(function (item) {
            var x = (item[0] - nwMc.x) / zoomUnit;
            var y = (nwMc.y - item[1]) / zoomUnit;
            return [x, y];
        });
    },

    calculatePixel: function calculatePixel(webObj) {
        var _webObj$request$data = webObj.request.data,
            points = _webObj$request$data.points,
            zoomUnit = _webObj$request$data.zoomUnit,
            nwMc = _webObj$request$data.nwMc,
            isAnimation = _webObj$request$data.isAnimation,
            lineOrCurve = _webObj$request$data.lineOrCurve,
            deltaAngle = _webObj$request$data.deltaAngle;

        if (isAnimation) {
            if (lineOrCurve == 'line') {
                LineStringOverlay.setLineCurive(points, zoomUnit, nwMc, deltaAngle);
            } else if (lineOrCurve == 'curve') {
                LineStringOverlay.setCurive(points, zoomUnit, nwMc, deltaAngle);
            }
        } else {
            if (lineOrCurve == 'curve') {
                LineStringOverlay.setCurive(points, zoomUnit, nwMc, deltaAngle);
            } else {
                LineStringOverlay.transfrom(points, zoomUnit, nwMc);
            }
        }
        webObj.request.data = points;
        console.log(points);
        return webObj;
    },
    setCurive: function setCurive(points, zoomUnit, nwMc, deltaAngle) {
        for (var j = 0; j < points.length; j++) {
            var item = points[j];
            if (!item.geometry.medianCoordinates) {
                item.geometry['medianCoordinates'] = item.geometry.coordinates.map(function (item) {
                    var pixel = _pointToPixel.geo.projection.lngLatToPoint({
                        lng: item[0],
                        lat: item[1]
                    });
                    return [pixel.x, pixel.y];
                });
            }
            var medianCoordinates = item.geometry.medianCoordinates;
            var paths = [];
            for (var k = 0, len = medianCoordinates.length; k < len - 1; k++) {
                var lngLat1 = medianCoordinates[k];
                var lngLat2 = medianCoordinates[k + 1];
                var x1 = (lngLat1[0] - nwMc.x) / zoomUnit;
                var y1 = (nwMc.y - lngLat1[1]) / zoomUnit;

                var x2 = (lngLat2[0] - nwMc.x) / zoomUnit;
                var y2 = (nwMc.y - lngLat2[1]) / zoomUnit;

                paths = paths.concat((0, _Curive.getPointList)([x1, y1], [x2, y2], deltaAngle));
                x1 = null, y1 = null, x2 = null, y2 = null, lngLat1 = null, lngLat2 = null;
            }

            item.geometry['pixels'] = paths;
        }
    },
    setLineCurive: function setLineCurive(points, zoomUnit, nwMc, n) {
        for (var j = 0; j < points.length; j++) {
            var item = points[j];
            if (!item.geometry.animationCoordinates) {
                item.geometry['animationCoordinates'] = (0, _Curive.lineCurive)(item.geometry.coordinates[0], item.geometry.coordinates[1], n);
            }
            if (!item.geometry.animationMedianCoordinates) {
                item.geometry['animationMedianCoordinates'] = item.geometry.animationCoordinates.map(function (item) {
                    var pixel = _pointToPixel.geo.projection.lngLatToPoint({
                        lng: item[0],
                        lat: item[1]
                    });
                    return [pixel.x, pixel.y];
                });
            }
            item.geometry['pixels'] = item.geometry['animationMedianCoordinates'].map(function (item) {
                var x = (item[0] - nwMc.x) / zoomUnit;
                var y = (nwMc.y - item[1]) / zoomUnit;
                return [x, y];
            });
        }
    },
    transfrom: function transfrom(points, zoomUnit, nwMc) {
        for (var j = 0; j < points.length; j++) {
            var item = points[j];
            if (!item.geometry.medianCoordinates) {
                item.geometry['medianCoordinates'] = item.geometry.coordinates.map(function (item) {
                    var pixel = _pointToPixel.geo.projection.lngLatToPoint({
                        lng: item[0],
                        lat: item[1]
                    });
                    return [pixel.x, pixel.y];
                });
            }
            item.geometry['pixels'] = item.geometry['medianCoordinates'].map(function (item) {
                var x = (item[0] - nwMc.x) / zoomUnit;
                var y = (nwMc.y - item[1]) / zoomUnit;
                return [x, y];
            });
        }
    }
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PolygonOverlay = undefined;

var _pointToPixel = __webpack_require__(3);

var _Point = __webpack_require__(31);

var _polylabel = __webpack_require__(32);

var _polylabel2 = _interopRequireDefault(_polylabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PolygonOverlay = exports.PolygonOverlay = {
    calculatePixel: function calculatePixel(webObj) {
        var data = webObj.request.data.data;

        var map = webObj.request.map;
        for (var j = 0; j < data.length; j++) {
            var coordinates = data[j].geometry.coordinates;
            var pixels = [],
                labelPixels = [];
            for (var i = 0; i < coordinates.length; i++) {
                var geo = coordinates[i];
                var tmp = [];
                for (var k = 0; k < geo.length; k++) {
                    var pixel = (0, _pointToPixel.pointToPixelWorker)(new _Point.Point(geo[k][0], geo[k][1]), map);
                    tmp.push([pixel.x, pixel.y]);
                }
                pixels.push(tmp);
                labelPixels.push((0, _polylabel2.default)([tmp]));
            }
            data[j].geometry['pixels'] = pixels;

            data[j].geometry['labelPixels'] = labelPixels;
        }
        webObj.request.data = data;
        return webObj;
    }
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PolymeOverlay = undefined;

var _pointToPixel = __webpack_require__(3);

var PolymeOverlay = exports.PolymeOverlay = {
    mergeCount: 0,

    isMeet: function isMeet(a, b) {
        var dx = a.x - b.x,
            dy = a.y - b.y;

        if (dx * dx + dy * dy > (a.radius + b.radius) * (a.radius + b.radius)) {
            return false;
        } else {
            return true;
        }
    },

    getDots: function getDots(d1, d2, r) {
        var a = d1.pixel,
            b = d2.pixel;
        var merges1 = d1.merges,
            merges2 = d2.merges;
        var merges = (merges1 || [d1]).concat(merges2 || [d2]);
        var tempDot = {
            merges: merges,
            pixel: {
                radius: r + PolymeOverlay.mergeCount * merges.length,
                x: Math.ceil((a.x + b.x) / 2),
                y: Math.ceil((a.y + b.y) / 2)
            }
        };

        return tempDot;
    },
    merge: function merge(dots, defautR) {
        var merges = void 0,
            meet = void 0;

        do {
            merges = [], meet = false;
            for (var i = 0; i < dots.length; i++) {
                var temp = dots[i];
                for (var j = 0; j < dots.length; j++) {
                    if (i != j && PolymeOverlay.isMeet(temp.pixel, dots[j].pixel)) {
                        temp = PolymeOverlay.getDots(temp, dots[j], defautR);
                        dots.splice(i, 1);
                        dots.splice(j - 1, 1);
                        meet = true;
                    }
                }
                merges.push(temp);
            }
            if (dots.length > 0) {
                merges.push(dots[0]);
            }
            dots = merges;
        } while (meet);
        return merges;
    },
    mergePoint: function mergePoint(webObj) {
        PolymeOverlay.mergeCount = webObj.request.data.mergeCount;
        var data = webObj.request.data.points;
        var radius = webObj.request.data.size;
        data.forEach(function (val) {
            var pixel = (0, _pointToPixel.pointToPixelWorker)(val, webObj.request.map);
            val['pixel'] = {
                x: pixel.x,
                y: pixel.y,
                radius: radius
            };
        });
        var temp = PolymeOverlay.merge(data, radius);
        return {
            data: temp,
            client: webObj
        };
    }
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lineCurive = lineCurive;
exports.getPointList = getPointList;
function getOffsetPoint(start, end, deltaAngle) {
    var distance = getDistance(start, end) / 4;
    var angle = void 0,
        dX = void 0,
        dY = void 0;
    var mp = [start[0], start[1]];
    deltaAngle = deltaAngle == null ? -0.2 : deltaAngle;
    if (start[0] != end[0] && start[1] != end[1]) {
        var k = (end[1] - start[1]) / (end[0] - start[0]);
        angle = Math.atan(k);
    } else if (start[0] == end[0]) {
        angle = (start[1] <= end[1] ? 1 : -1) * Math.PI / 2;
    } else {
        angle = 0;
    }
    if (start[0] <= end[0]) {
        angle -= deltaAngle;
        dX = Math.round(Math.cos(angle) * distance);
        dY = Math.round(Math.sin(angle) * distance);
        mp[0] += dX;
        mp[1] += dY;
    } else {
        angle += deltaAngle;
        dX = Math.round(Math.cos(angle) * distance);
        dY = Math.round(Math.sin(angle) * distance);
        mp[0] -= dX;
        mp[1] -= dY;
    }
    return mp;
}

function smoothSpline(points, isLoop) {
    var len = points.length;
    var ret = [];
    var distance = 0;
    for (var i = 1; i < len; i++) {
        distance += getDistance(points[i - 1], points[i]);
    }
    var segs = distance / 2;
    segs = segs < len ? len : segs;
    for (var _i = 0; _i < segs; _i++) {
        var pos = _i / (segs - 1) * (isLoop ? len : len - 1);
        var idx = Math.floor(pos);
        var w = pos - idx;
        var p0 = void 0;
        var p1 = points[idx % len];
        var p2 = void 0;
        var p3 = void 0;
        if (!isLoop) {
            p0 = points[idx === 0 ? idx : idx - 1];
            p2 = points[idx > len - 2 ? len - 1 : idx + 1];
            p3 = points[idx > len - 3 ? len - 1 : idx + 2];
        } else {
            p0 = points[(idx - 1 + len) % len];
            p2 = points[(idx + 1) % len];
            p3 = points[(idx + 2) % len];
        }
        var w2 = w * w;
        var w3 = w * w2;

        ret.push([interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3), interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)]);
    }
    return ret;
}

function interpolate(p0, p1, p2, p3, t, t2, t3) {
    var v0 = (p2 - p0) * 0.5;
    var v1 = (p3 - p1) * 0.5;
    return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
}

function getDistance(p1, p2) {
    return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]));
}
function lineCurive(fromPoint, endPoint, n) {
    var delLng = (endPoint[0] - fromPoint[0]) / n;
    var delLat = (endPoint[1] - fromPoint[1]) / n;
    var path = [];
    for (var i = 0; i < n; i++) {
        var pointNLng = fromPoint[0] + delLng * i;
        var pointNLat = fromPoint[1] + delLat * i;
        path.push([pointNLng, pointNLat]);
    }
    return path;
}
function getPointList(start, end, deltaAngle) {
    var points = [[start[0], start[1]], [end[0], end[1]]];
    var ex = points[1][0];
    var ey = points[1][1];
    points[3] = [ex, ey];
    points[1] = getOffsetPoint(points[0], points[3], deltaAngle);
    points[2] = getOffsetPoint(points[3], points[0], deltaAngle);
    points = smoothSpline(points, false);
    points[points.length - 1] = [ex, ey];
    return points;
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Point = Point;

var _util = __webpack_require__(0);

function Point(lng, lat) {
    if (isNaN(lng)) {

        lng = isNaN(lng) ? 0 : lng;
    }
    if ((0, _util.isString)(lng)) {
        lng = parseFloat(lng);
    }
    if (isNaN(lat)) {

        lat = isNaN(lat) ? 0 : lat;
    }
    if ((0, _util.isString)(lat)) {
        lat = parseFloat(lat);
    }
    this.lng = lng;
    this.lat = lat;
}
Point.isInRange = function (pt) {
    return pt && pt.lng <= 180 && pt.lng >= -180 && pt.lat <= 74 && pt.lat >= -74;
};
Point.prototype.equals = function (other) {
    return other && this.lat == other.lat && this.lng == other.lng;
};
exports.default = Point;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = polylabel;

var _tinyqueue = __webpack_require__(45);

var _tinyqueue2 = _interopRequireDefault(_tinyqueue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Cell(x, y, h, polygon) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.d = pointToPolygonDist(x, y, polygon);
    this.max = this.d + this.h * Math.SQRT2;
}

function distSqr(p, a) {
    var dx = p.x - a.x,
        dy = p.y - a.y;
    return dx * dx + dy * dy;
}

function sub(a, p) {
    a.x -= p.x;
    a.y -= p.y;
    return a;
}

function mult(a, k) {
    a.x *= k;
    a.y *= k;
    return a;
}

function and(a, p) {
    a.x += p.x;
    a.y += p.y;
    return a;
}

function distToSegmentSquared(p, v, w) {
    var l2 = distSqr(w, v);
    if (l2 === 0) return distSqr(v, p);
    var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    if (t < 0) return distSqr(v, p);
    if (t > 1) return distSqr(w, p);
    return distSqr(and(mult(sub(w, v), t), v), p);
}

function pointToPolygonDist(p, polygon) {
    var inside = false;
    var minDistSq = Infinity;

    for (var k = 0; k < polygon.length; k++) {
        var ring = polygon[k];

        for (var i = 0, len = ring.length, j = len - 1; i < len; j = i++) {
            var a = ring[i];
            var b = ring[j];

            if (a.y > p.y !== b.y > p.y && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) inside = !inside;

            minDistSq = Math.min(minDistSq, distToSegmentSquared(p, a, b));
        }
    }

    return (inside ? 1 : -1) * Math.sqrt(minDistSq);
}

function getCentroid(polygon) {
    var totalArea = 0;
    var totalX = 0;
    var totalY = 0;
    var points = polygon[0];
    for (var i = 0; i < points.length - 1; ++i) {

        var a = points[i + 1];
        var b = points[i];
        var area = 0.5 * (a[0] * b[1] - b[0] * a[1]);
        var x = (a[0] + b[0]) / 3;
        var y = (a[1] + b[1]) / 3;
        totalArea += area;
        totalX += area * x;
        totalY += area * y;
    }
    return new Cell(totalX / totalArea, totalY / totalArea);
}

function polylabel(polygon) {
    var minX = void 0,
        minY = void 0,
        maxX = void 0,
        maxY = void 0;
    for (var i = 0; i < polygon[0].length; i++) {
        var p = polygon[0][i];
        if (!i || p[0] < minX) minX = p[0];
        if (!i || p[1] < minY) minY = p[1];
        if (!i || p[0] > maxX) maxX = p[0];
        if (!i || p[1] > maxY) maxY = p[1];
    }
    if (minX == maxX || minY == maxY) {
        return null;
    }

    var width = maxX - minX;
    var height = maxY - minY;
    var cellSize = Math.min(width, height);
    var h = cellSize / 2;

    var cellQueue = new _tinyqueue2.default(null, function (a, b) {
        return b.max - a.max;
    });

    for (var x = minX; x < maxX; x += cellSize) {
        for (var y = minY; y < maxY; y += cellSize) {
            cellQueue.push(new Cell(x + h, y + h, h, polygon));
        }
    }

    var bestCell = getCentroid(polygon);
    while (cellQueue.length) {
        var cell = cellQueue.pop();
        if (cell.d > bestCell.d) bestCell = cell;

        if (cell.max <= bestCell.d) continue;

        h = cell.h / 2;
        cellQueue.push(new Cell(cell.x - h, cell.y - h, h, polygon));
        cellQueue.push(new Cell(cell.x + h, cell.y - h, h, polygon));
        cellQueue.push(new Cell(cell.x - h, cell.y + h, h, polygon));
        cellQueue.push(new Cell(cell.x + h, cell.y + h, h, polygon));
    }
    return {
        x: bestCell.x,
        y: bestCell.y
    };
}

/***/ }),
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = TinyQueue;
function TinyQueue(data, compare) {
    if (!(this instanceof TinyQueue)) return new TinyQueue(data, compare);

    this.data = data || [];
    this.length = this.data.length;
    this.compare = compare || defaultCompare;

    if (this.length > 0) {
        for (var i = this.length >> 1; i >= 0; i--) {
            this._down(i);
        }
    }
}

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

TinyQueue.prototype = {

    push: function push(item) {
        this.data.push(item);
        this.length++;
        this._up(this.length - 1);
    },

    pop: function pop() {
        if (this.length === 0) return undefined;

        var top = this.data[0];
        this.length--;

        if (this.length > 0) {
            this.data[0] = this.data[this.length];
            this._down(0);
        }
        this.data.pop();

        return top;
    },

    peek: function peek() {
        return this.data[0];
    },

    _up: function _up(pos) {
        var data = this.data;
        var compare = this.compare;
        var item = data[pos];

        while (pos > 0) {
            var parent = pos - 1 >> 1;
            var current = data[parent];
            if (compare(item, current) >= 0) break;
            data[pos] = current;
            pos = parent;
        }

        data[pos] = item;
    },

    _down: function _down(pos) {
        var data = this.data;
        var compare = this.compare;
        var halfLength = this.length >> 1;
        var item = data[pos];

        while (pos < halfLength) {
            var left = (pos << 1) + 1;
            var right = left + 1;
            var best = data[left];

            if (right < this.length && compare(data[right], best) < 0) {
                left = right;
                best = data[right];
            }
            if (compare(best, item) >= 0) break;

            data[pos] = best;
            pos = left;
        }

        data[pos] = item;
    }
};

/***/ }),
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TDpost = undefined;

var _HeatOverlay = __webpack_require__(24);

var _GriddingOverlay = __webpack_require__(23);

var _PolygonOverlay = __webpack_require__(28);

var _LineStringOverlay = __webpack_require__(27);

var _HoneycombOverlay = __webpack_require__(25);

var _PolymeOverlay = __webpack_require__(29);

var _LablEvading = __webpack_require__(26);

var callbackList = {
    'HeatOverlay': _HeatOverlay.HeatOverlay,
    'HeatTileOverlay': _HeatOverlay.HeatTileOverlay,
    'GriddingOverlay': _GriddingOverlay.GriddingOverlay,
    'PolygonOverlay': _PolygonOverlay.PolygonOverlay,
    'LineStringOverlay': _LineStringOverlay.LineStringOverlay,
    'HoneycombOverlay': _HoneycombOverlay.HoneycombOverlay,
    'PolymeOverlay': _PolymeOverlay.PolymeOverlay,
    'LablEvading': _LablEvading.LablEvading
};

onmessage = function onmessage(e) {
    var data = e.data;
    callbackFun(data);
};

var handler = {};

var callbackFun = function callbackFun(data) {
    var request = data.request;
    var classPath = request.classPath;
    var hashCode = request.hashCode;
    var msgId = request.msgId;
    var p = classPath.split('.'),
        index = 0,
        callback = callbackList;
    while (p[index]) {
        callback = callback[p[index]];
        index++;
        if (index >= p.length) {
            handler[classPath] = hashCode + '_' + msgId;

            var result = callback(data);
            TDpost(result);
        }

        if (!callback) {
            throw new TypeError('inMap : ' + p[index - 1] + ' worker ' + classPath + ' is not a function');
        }
    }
};

var TDpost = exports.TDpost = function TDpost(client) {

    var request = client.request;
    var classPath = request.classPath;
    var hashCode = request.hashCode;
    var msgId = request.msgId;
    var handler = callbackList[classPath];

    if (handler && handler != hashCode + '_' + msgId) {
        return;
    }

    postMessage(client);
    client.request.data = [];
    client = null;
};

/***/ }),
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
});