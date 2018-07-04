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
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    computeBefore: 0,
    conputeAfter: 1,
    drawBefore: 2,
    drawAfter: 3
};

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _CanvasOverlay2 = __webpack_require__(4);

var _CanvasOverlay3 = _interopRequireDefault(_CanvasOverlay2);

var _Color = __webpack_require__(5);

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isMobile = (0, _util.detectmob)();

var Parameter = function (_CanvasOverlay) {
    _inherits(Parameter, _CanvasOverlay);

    function Parameter(baseConfig, ops) {
        _classCallCheck(this, Parameter);

        var _this = _possibleConstructorReturn(this, (Parameter.__proto__ || Object.getPrototypeOf(Parameter)).call(this));

        _this.points = [];
        _this.workerData = [];
        _this._option = {};
        _this.baseConfig = baseConfig;

        _this.selectItem = [];
        _this.overItem = null;

        _this._setStyle(baseConfig, ops);

        return _this;
    }

    _createClass(Parameter, [{
        key: '_setStyle',
        value: function _setStyle(config, ops) {
            ops = ops || {};
            var option = (0, _util.merge)(config, ops);
            this.toRgba(option.style);
            this._option = option;
            this.tooltipConfig = option.tooltip;
            this.legendConfig = option.legend;
            this.eventConfig = option.event;
            this.styleConfig = option.style;

            if (ops.data) {
                this.setData(ops.data);
            } else {
                this.onOptionChange();
                this.map && this.refresh();
            }

            this.tMapStyle(option.skin);
            this.toolTip && this.toolTip.setOption(this.tooltipConfig);
        }
    }, {
        key: 'setData',
        value: function setData(points) {
            if (!(0, _util.isArray)(points)) {
                throw new TypeError('inMap: data must be a Array');
            }
            this.points = points;
            this.clearData();
            this.cancerSelectd();
            this.onDataChange();
            this.map && this.resize();
        }
    }, {
        key: 'onOptionChange',
        value: function onOptionChange() {}
    }, {
        key: 'onDataChange',
        value: function onDataChange() {}
    }, {
        key: 'setPoints',
        value: function setPoints(points) {
            this.setData(points);
        }
    }, {
        key: 'getData',
        value: function getData() {
            return this.workerData;
        }
    }, {
        key: 'getTransformData',
        value: function getTransformData() {
            return this.workerData.length > 0 ? this.workerData : this.points;
        }
    }, {
        key: 'clearData',
        value: function clearData() {
            (0, _util.clearPushArray)(this.workerData);
            this.overItem = null;
        }
    }, {
        key: 'cancerSelectd',
        value: function cancerSelectd() {
            (0, _util.clearPushArray)(this.selectItem, []);
        }
    }, {
        key: 'setWorkerData',
        value: function setWorkerData(val) {
            this.points = [];
            this.overItem = null;
            (0, _util.clearPushArray)(this.workerData, val);
        }
    }, {
        key: 'canvasInit',
        value: function canvasInit() {
            this.toolTip.setOption(this.tooltipConfig);
            this.parameterInit();
        }
    }, {
        key: 'parameterInit',
        value: function parameterInit() {}
    }, {
        key: 'toRgba',
        value: function toRgba(styleConfig) {
            ['normal', 'mouseOver', 'selected'].forEach(function (status) {
                var statusStyle = styleConfig[status];
                if (statusStyle) {
                    ['backgroundColor', 'borderColor', 'shadowColor'].forEach(function (item) {
                        var val = statusStyle[item];
                        if (val && val.indexOf('rgba') == -1) {
                            styleConfig[status][item] = new _Color2.default(val).getRgbaStyle();
                        }
                    });
                }
            });
            styleConfig.colors && styleConfig.colors.forEach(function (val, index, arr) {
                if (val.indexOf('rgba') == -1) {
                    arr[index] = new _Color2.default(val).getRgbaStyle();
                }
            });
        }
    }, {
        key: 'setDrawStyle',
        value: function setDrawStyle(item) {
            var normal = this.styleConfig.normal,
                mouseOverStyle = this.styleConfig.mouseOver,
                selectedStyle = this.styleConfig.selected;
            var result = {};
            result = (0, _util.merge)(result, normal);

            var splitList = this.styleConfig.splitList;
            for (var i = 0; i < splitList.length; i++) {
                var condition = splitList[i];
                if (i == splitList.length - 1) {
                    if (condition.end == null) {
                        if (item.count >= condition.start) {
                            result = this.mergeCondition(result, condition);
                            break;
                        }
                    } else if (item.count >= condition.start && item.count <= condition.end) {
                        result = this.mergeCondition(result, condition);
                        break;
                    }
                } else {
                    if (item.count >= condition.start && item.count < condition.end) {
                        result = this.mergeCondition(result, condition);
                        break;
                    }
                }
            }
            result = (0, _util.merge)(result, item.style || {});

            if (mouseOverStyle && this.overItem == item) {
                result = (0, _util.merge)(result, mouseOverStyle, {
                    backgroundColor: mouseOverStyle.backgroundColor || this.brightness(result.backgroundColor, 0.1)
                });
            }
            if (selectedStyle && this.selectItemContains(item)) {
                result = (0, _util.merge)(result, selectedStyle);
            }

            if (result.shadowBlur != null && result.shadowColor == null) {
                result['shadowColor'] = new _Color2.default(result.backgroundColor).getStyle();
            }
            if (result.opacity) {
                var color = new _Color2.default(result.backgroundColor);
                result.backgroundColor = color.getRgbaStyle(result.opacity);
            }
            if (result.borderOpacity) {
                var _color = new _Color2.default(result.borderColor);
                result.borderColor = _color.getRgbaStyle(result.borderOpacity);
            }
            return result;
        }
    }, {
        key: 'mergeCondition',
        value: function mergeCondition(normal, condition) {
            if (condition.opacity == null && normal.opacity != null) {
                normal.opacity = null;
            }
            if (condition.borderOpacity == null && normal.borderOpacity != null) {
                normal.borderOpacity = null;
            }
            return (0, _util.merge)(normal, condition);
        }
    }, {
        key: 'brightness',
        value: function brightness(rgba, delta) {

            var color = new _Color2.default(rgba);
            color.r += delta;
            color.g += delta;
            color.b += delta;
            return color.getStyle();
        }
    }, {
        key: 'selectItemContains',
        value: function selectItemContains(item) {
            return this.findIndexSelectItem(item) > -1;
        }
    }, {
        key: 'findIndexSelectItem',
        value: function findIndexSelectItem(item) {
            return -1;
        }
    }, {
        key: 'getTarget',
        value: function getTarget(x, y) {
            return {
                item: null,
                index: -1
            };
        }
    }, {
        key: 'deleteSelectItem',
        value: function deleteSelectItem(item) {
            var index = this.findIndexSelectItem(item);
            index > -1 && this.selectItem.splice(index, 1);
        }
    }, {
        key: 'setTooltip',
        value: function setTooltip(event) {
            this.toolTip.render(event, this.overItem);
        }
    }, {
        key: 'Tclear',
        value: function Tclear() {
            this.points = null;
            this.workerData = null;
            this.baseConfig = null;
            this.selectItem = null;
            this.overItem = null;
            this._option = null;
            this.tooltipConfig = null;
            this.legendConfig = null;
            this.eventConfig = null;
            this.styleConfig = null;
        }
    }, {
        key: 'setlegend',
        value: function setlegend(legendConfig, list) {
            if (!this.map) return;
            legendConfig['list'] = list;
            this.legend.setOption(legendConfig);
        }
    }, {
        key: 'refresh',
        value: function refresh() {}
    }, {
        key: 'swopData',
        value: function swopData(index, item) {
            if ((0, _util.isNumber)(index) && index > -1) {
                this.workerData[index] = this.workerData[this.workerData.length - 1];
                this.workerData[this.workerData.length - 1] = item;
            }
        }
    }, {
        key: 'tMouseleave',
        value: function tMouseleave() {
            this.tooltip.hide();
        }
    }, {
        key: 'tMousemove',
        value: function tMousemove(event) {
            if (this.eventType == 'onmoving') {
                return;
            }
            if (!this.tooltipConfig.show && (0, _util.isEmpty)(this.styleConfig.mouseOver)) {
                return;
            }

            var result = this.getTarget(event.pixel.x, event.pixel.y);
            var temp = result.item;

            if (temp != this.overItem) {
                this.overItem = temp;
                if (temp) {
                    this.swopData(result.index, result.item);
                }
                this.eventType = 'mousemove';
                if (!(0, _util.isEmpty)(this.styleConfig.mouseOver)) {
                    this.refresh();
                }
            }
            if (temp) {
                this.map.setDefaultCursor('pointer');
            } else {
                this.map.setDefaultCursor('default');
            }

            this.setTooltip(event);
        }
    }, {
        key: 'tMouseClick',
        value: function tMouseClick(event) {
            if (this.eventType == 'onmoving') return;
            var multiSelect = this.eventConfig.multiSelect;

            var result = this.getTarget(event.pixel.x, event.pixel.y);
            if (result.index == -1) {
                return;
            }
            var item = JSON.parse(JSON.stringify(result.item));
            if (multiSelect) {
                if (this.selectItemContains(item)) {
                    this.deleteSelectItem(item);
                } else {
                    this.selectItem.push(result.item);
                }
            } else {
                (0, _util.clearPushArray)(this.selectItem, result.item);
            }

            this.swopData(result.index, item);
            this.eventConfig.onMouseClick(this.selectItem, event);

            this.refresh();
            if (isMobile) {
                this.overItem = item;
                this.setTooltip(event);
            }
        }
    }]);

    return Parameter;
}(_CanvasOverlay3.default);

exports.default = Parameter;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseClass2 = __webpack_require__(53);

var _BaseClass3 = _interopRequireDefault(_BaseClass2);

var _Legend = __webpack_require__(50);

var _Legend2 = _interopRequireDefault(_Legend);

var _util = __webpack_require__(0);

var _MapStyle = __webpack_require__(13);

var _Toolbar = __webpack_require__(14);

var _Toolbar2 = _interopRequireDefault(_Toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var zIndex = 1;

var CanvasOverlay = function (_BaseClass) {
    _inherits(CanvasOverlay, _BaseClass);

    function CanvasOverlay(opts) {
        _classCallCheck(this, CanvasOverlay);

        var _this = _possibleConstructorReturn(this, (CanvasOverlay.__proto__ || Object.getPrototypeOf(CanvasOverlay)).call(this));

        _this.ctx = null;
        _this.eventType = 'moveend';
        _this.map = null;
        _this.container = null;
        _this.tOnResize = _this.tOnResize.bind(_this);
        _this.tOnMoveend = _this.tOnMoveend.bind(_this);
        _this.tOnZoomstart = _this.tOnZoomstart.bind(_this);
        _this.tOnZoomend = _this.tOnZoomend.bind(_this);
        _this.tOnMoving = _this.tOnMoving.bind(_this);
        _this.tMousemove = _this.tMousemove.bind(_this);
        _this.tMouseClick = _this.tMouseClick.bind(_this);
        _this.devicePixelRatio = window.devicePixelRatio;
        _this.repaintEnd = opts && opts.repaintEnd;
        _this.animationFlag = true;
        _this.isDispose = false;
        _this.margin = {
            left: 0,
            top: 0
        };
        return _this;
    }

    _createClass(CanvasOverlay, [{
        key: 'initialize',
        value: function initialize(map) {
            var me = this;
            this.map = map;
            this.container = document.createElement('canvas');
            this.ctx = this.container.getContext('2d');
            this.margin.left = -this.map.offsetX;
            this.margin.top = -this.map.offsetY;
            this.container.style.cssText = 'position:absolute;left:' + this.margin.left + 'px;top:' + this.margin.top + 'px;z-index:' + zIndex++ + ';';
            map.getPanes().mapPane.appendChild(this.container);
            this.setCanvasSize();
            map.addEventListener('resize', me.tOnResize);
            map.addEventListener('moveend', me.tOnMoveend);
            map.addEventListener('moving', me.tOnMoving);
            map.addEventListener('zoomstart', me.tOnZoomstart);
            map.addEventListener('zoomend', me.tOnZoomend);
            map.addEventListener('mousemove', me.tMousemove);
            map.addEventListener('click', me.tMouseClick);
            if (!map.inmapToolBar) {
                map.inmapToolBar = new _Toolbar2.default(map.Va);
            }
            var legendContainer = map.inmapToolBar.legendContainer;
            this.legend = new _Legend2.default(legendContainer);
            this.toolTip = map.inmapToolBar.toolTip;
            legendContainer = null;
            this.canvasInit();
            return this.container;
        }
    }, {
        key: 'tMapStyle',
        value: function tMapStyle(skin) {
            var styleJson = null;
            if ((0, _util.isString)(skin)) {
                styleJson = skin == 'Blueness' ? _MapStyle.Blueness : _MapStyle.WhiteLover;
            } else if ((0, _util.isArray)(skin)) {
                styleJson = skin;
            }
            skin && this.map && this.map.setMapStyle({
                styleJson: styleJson
            });
        }
    }, {
        key: 'tOnResize',
        value: function tOnResize(event) {
            this.setCanvasSize();
            this.eventType = event.type;
            this.tDraw(this, event);
        }
    }, {
        key: 'tOnMoveend',
        value: function tOnMoveend(event) {
            this.animationFlag = true;
            this.eventType = event.type;
        }
    }, {
        key: 'tOnZoomstart',
        value: function tOnZoomstart() {
            this.animationFlag = false;
            this.clearCanvas();
        }
    }, {
        key: 'tOnZoomend',
        value: function tOnZoomend(e) {
            this.animationFlag = true;
            this.eventType = e.type;
        }
    }, {
        key: 'tOnMoving',
        value: function tOnMoving(e) {
            this.animationFlag = false;
            this.eventType = e.type;
        }
    }, {
        key: 'tMousemove',
        value: function tMousemove() {}
    }, {
        key: 'canvasInit',
        value: function canvasInit() {}
    }, {
        key: 'draw',
        value: function draw() {

            var eventType = this.eventType;

            if (eventType == 'onmoving') {
                this.canvasResize();
            } else {
                this.resize();
            }
        }
    }, {
        key: 'tMouseClick',
        value: function tMouseClick() {}
    }, {
        key: 'tDraw',
        value: function tDraw(me, event) {
            this.eventType = event.type;
            me.draw();
            this.repaintEnd && this.repaintEnd(this);
            me.keysss = true;
        }
    }, {
        key: 'resize',
        value: function resize() {}
    }, {
        key: 'canvasResize',
        value: function canvasResize() {
            var map = this.map;
            var container = this.container;
            var point = map.getCenter();
            var size = map.getSize();
            var pixel = map.pointToOverlayPixel(point);
            var left = pixel.x - size.width / 2;
            var top = pixel.y - size.height / 2;
            var containerDomStyle = container.style;

            this.translationIf(this.margin.left, this.margin.top, left, top);

            this.margin.left = left;
            this.margin.top = top;
            containerDomStyle.left = left + 'px';
            containerDomStyle.top = top + 'px';

            containerDomStyle = null;
            container = null;
            map = null;
        }
    }, {
        key: 'translationIf',
        value: function translationIf(oldLeft, oldTop, newLeft, newTop) {
            if (oldLeft != newLeft || oldTop != newTop) {
                this.translation(oldLeft - newLeft, oldTop - newTop);
            }
        }
    }, {
        key: 'translation',
        value: function translation(distanceX, distanceY) {}
    }, {
        key: 'clearCanvas',
        value: function clearCanvas() {
            var size = this.map.getSize();
            this.getContext().clearRect(0, 0, size.width, size.height);
        }
    }, {
        key: 'setCanvasSize',
        value: function setCanvasSize() {
            var size = this.map.getSize();
            this.container.width = size.width;
            this.container.height = size.height;
            (0, _util.setDevicePixelRatio)(this.ctx);
        }
    }, {
        key: 'getContext',
        value: function getContext() {
            return this.ctx;
        }
    }, {
        key: 'setZIndex',
        value: function setZIndex(_zIndex) {
            this.container.style.zIndex = _zIndex;
        }
    }, {
        key: 'Tclear',
        value: function Tclear() {}
    }, {
        key: 'Tdispose',
        value: function Tdispose() {}
    }, {
        key: 'dispose',
        value: function dispose() {

            this.removeWorkerMessage();
            this.map.removeEventListener('resize', this.tOnResize);
            this.map.removeEventListener('moveend', this.tOnMoveend);
            this.map.removeEventListener('zoomstart', this.tOnZoomstart);
            this.map.removeEventListener('zoomend', this.tOnZoomend);
            this.map.removeEventListener('moving', this.tOnMoving);
            this.map.removeEventListener('mousemove', this.tMousemove);
            this.map.removeEventListener('click', this.tMouseClick);

            if (this.legend) {
                this.legend.dispose(this.map.inmapToolBar.legendContainer);
                this.legend = null;
            }
            if (this.toolTip) {
                this.toolTip.hide();
                this.toolTip = null;
            }

            this.Tclear();
            this.Tdispose();

            this.map.removeOverlay(this);
            var me = this;
            for (var key in me) {
                if (!(0, _util.isFunction)(me[key])) {
                    me[key] = null;
                }
            }
            me.isDispose = true;
            me = null;
        }
    }]);

    return CanvasOverlay;
}(_BaseClass3.default);

exports.default = CanvasOverlay;

/***/ }),
/* 5 */
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

    getStyle: function getStyle() {
        return 'rgb(' + (this.r * 255 | 0) + ',' + (this.g * 255 | 0) + ',' + (this.b * 255 | 0) + ')';
    },
    getRgbaStyle: function getRgbaStyle(opacity) {
        return 'rgba(' + (this.r * 255 | 0) + ',' + (this.g * 255 | 0) + ',' + (this.b * 255 | 0) + ',' + (opacity || 1) + ')';
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
/* 6 */
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
/* 7 */
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

exports.default = Label;

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
/* 9 */
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
        this.workerContent = '[workerContentString]';
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
            this.worker.onerror = function () {
                throw new TypeError('inMap : worker.onerror');
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
            if (instances[key1] && instances[key1] == key2) {
                instances[key2](data.request.data, data.request.map.margin, data.request.map.zoom);
            }
            data = null, hashCode = null, msgId = null, classPath = null, instances[key2] = null;
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasOverlay2 = __webpack_require__(4);

var _CanvasOverlay3 = _interopRequireDefault(_CanvasOverlay2);

var _util = __webpack_require__(0);

var _LineStringAnimationConfig = __webpack_require__(40);

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

        _this.points = [];
        _this.workerData = [];
        _this.markLineData = [];
        _this._setStyle(_LineStringAnimationConfig2.default, ops);
        return _this;
    }

    _createClass(LineStringAnimationOverlay, [{
        key: 'setOptionStyle',
        value: function setOptionStyle(ops) {

            this._setStyle(_LineStringAnimationConfig2.default, ops);
            this.map && this.drawMap();
        }
    }, {
        key: '_setStyle',
        value: function _setStyle(config, ops) {
            var option = (0, _util.merge)(config, ops);
            this.styleConfig = option.style;
            this.eventConfig = option.event;
            this.tMapStyle(option.skin);

            if (ops.data) {
                this.setData(ops.data);
            } else {
                this.map && this.refresh();
            }
        }
    }, {
        key: 'translation',
        value: function translation(distanceX, distanceY) {
            for (var i = 0; i < this.markLineData.length; i++) {
                var pixels = this.markLineData[i].path;
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
        value: function setData(points) {
            if (!(0, _util.isArray)(points)) {
                throw new TypeError('inMap: data must be a Array');
            }
            this.points = points;
            this.map && this.drawMap();
        }
    }, {
        key: 'resize',
        value: function resize() {
            if (!this.animationDraw) {

                this.initAnimation();
            }
            this.drawMap();
        }
    }, {
        key: 'getTransformData',
        value: function getTransformData() {
            return this.workerData.length > 0 ? this.workerData : this.points;
        }
    }, {
        key: 'drawMap',
        value: function drawMap() {
            var _this2 = this;

            var zoomUnit = Math.pow(2, 18 - this.map.getZoom());
            var projection = this.map.getMapType().getProjection();
            var mcCenter = projection.lngLatToPoint(this.map.getCenter());
            var nwMc = new BMap.Pixel(mcCenter.x - this.map.getSize().width / 2 * zoomUnit, mcCenter.y + this.map.getSize().height / 2 * zoomUnit);

            var params = {
                points: this.getTransformData(),
                nwMc: nwMc,
                zoomUnit: zoomUnit,
                isAnimation: true,
                lineOrCurve: this.styleConfig.lineOrCurve,
                deltaAngle: this.styleConfig.deltaAngle
            };

            this.postMessage('LineStringOverlay.calculatePixel', params, function (pixels, margin) {
                if (_this2.eventType == 'onmoving') {
                    return;
                }
                (0, _util.clearPushArray)(_this2.workerData, pixels);

                _this2.createMarkLine(pixels);
                _this2.translation(margin.left - _this2.margin.left, margin.top - _this2.margin.top);
                params = null;
                margin = null;
            });
        }
    }, {
        key: 'createMarkLine',
        value: function createMarkLine(data) {
            (0, _util.clearPushArray)(this.markLineData);
            for (var i = 0; i < data.length; i++) {
                var pixels = data[i].geometry.pixels;
                this.markLineData.push(new MarkLine({
                    path: pixels
                }));
            }
        }
    }, {
        key: 'initAnimation',
        value: function initAnimation() {
            var now = void 0;
            var then = Date.now();
            var interval = 1000 / this.styleConfig.fps;
            var delta = void 0;
            var me = this;

            function drawFrame() {
                requestAnimationFrame(drawFrame);
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
            var markLineData = this.markLineData,
                styleConfig = this.styleConfig;


            if (!this.ctx) {
                return;
            }

            if (!this.animationFlag) {
                this.clearCanvas();
                return;
            }
            this.ctx.fillStyle = 'rgba(0,0,0,0.93)';
            var prev = this.ctx.globalCompositeOperation;
            this.ctx.globalCompositeOperation = 'destination-in';
            var size = this.map.getSize();
            this.ctx.fillRect(0, 0, size.width, size.height);
            this.ctx.globalCompositeOperation = prev;

            for (var i = 0; i < markLineData.length; i++) {
                var markLine = markLineData[i];
                markLine.drawMoveCircle(this.ctx, styleConfig, this.map);
            }
        }
    }]);

    return LineStringAnimationOverlay;
}(_CanvasOverlay3.default);

exports.default = LineStringAnimationOverlay;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _Parameter2 = __webpack_require__(3);

var _Parameter3 = _interopRequireDefault(_Parameter2);

var _LineStringConfig = __webpack_require__(41);

var _LineStringConfig2 = _interopRequireDefault(_LineStringConfig);

var _OnState = __webpack_require__(1);

var _OnState2 = _interopRequireDefault(_OnState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineStringOverlay = function (_Parameter) {
    _inherits(LineStringOverlay, _Parameter);

    function LineStringOverlay(ops) {
        _classCallCheck(this, LineStringOverlay);

        var _this = _possibleConstructorReturn(this, (LineStringOverlay.__proto__ || Object.getPrototypeOf(LineStringOverlay)).call(this, _LineStringConfig2.default, ops));

        _this.points = [];
        _this.styleConfig = {};
        _this._setStyle(_LineStringConfig2.default, ops);
        _this.state = null;
        _this.workerData = [];
        return _this;
    }

    _createClass(LineStringOverlay, [{
        key: 'setOptionStyle',
        value: function setOptionStyle(ops) {
            this._setStyle(_LineStringConfig2.default, ops);
        }
    }, {
        key: 'setState',
        value: function setState(val) {
            this.state = val;
            this.eventConfig.onState(this.state);
        }
    }, {
        key: 'translation',
        value: function translation(distanceX, distanceY) {
            for (var i = 0; i < this.workerData.length; i++) {
                var pixels = this.workerData[i].geometry.pixels;
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
        value: function setData(points) {
            if (!(0, _util.isArray)(points)) {
                throw new TypeError('inMap: data must be a Array');
            }
            this.points = points;
            this.map && this.drawMap();
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.setState(_OnState2.default.drawBefore);
            this.drawLine(this.workerData);
            this.setState(_OnState2.default.drawAfter);
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.drawMap();
        }
    }, {
        key: 'getTransformData',
        value: function getTransformData() {
            return this.workerData.length > 0 ? this.workerData : this.points;
        }
    }, {
        key: 'drawMap',
        value: function drawMap() {
            var _this2 = this;

            var zoomUnit = Math.pow(2, 18 - this.map.getZoom());
            var projection = this.map.getMapType().getProjection();
            var mcCenter = projection.lngLatToPoint(this.map.getCenter());
            var nwMc = new BMap.Pixel(mcCenter.x - this.map.getSize().width / 2 * zoomUnit, mcCenter.y + this.map.getSize().height / 2 * zoomUnit);
            var params = {
                points: this.getTransformData(),
                nwMc: nwMc,
                zoomUnit: zoomUnit,
                lineOrCurve: this.styleConfig.normal.lineCurive,
                deltaAngle: this.styleConfig.normal.deltaAngle
            };
            this.setState(_OnState2.default.computeBefore);
            this.postMessage('LineStringOverlay.calculatePixel', params, function (pixels, margin) {
                if (_this2.eventType == 'onmoving') {
                    return;
                }
                _this2.setState(_OnState2.default.conputeAfter);
                (0, _util.clearPushArray)(_this2.workerData, pixels);
                _this2.translation(margin.left - _this2.margin.left, margin.top - _this2.margin.top);
                params = null;
                margin = null;
            });
        }
    }, {
        key: 'drawLine',
        value: function drawLine() {
            this.clearCanvas();
            var normal = this.styleConfig.normal;
            var ctx = this.ctx;
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

            for (var i = 0; i < this.workerData.length; i++) {
                var item = this.workerData[i];
                var style = this.setDrawStyle(item);
                this.ctx.strokeStyle = style.borderColor;
                var pixels = item.geometry.pixels;
                ctx.beginPath();
                ctx.moveTo(pixels[0][0], pixels[0][1]);
                for (var j = 1; j < pixels.length; j++) {
                    ctx.lineTo(pixels[j][0], pixels[j][1]);
                }
                ctx.lineWidth = style.borderWidth;
                pixels = null;
                ctx.stroke();
            }
        }
    }]);

    return LineStringOverlay;
}(_Parameter3.default);

exports.default = LineStringOverlay;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasOverlay = __webpack_require__(4);

var _CanvasOverlay2 = _interopRequireDefault(_CanvasOverlay);

var _Label = __webpack_require__(7);

var _Label2 = _interopRequireDefault(_Label);

var _Parameter2 = __webpack_require__(3);

var _Parameter3 = _interopRequireDefault(_Parameter2);

var _util = __webpack_require__(0);

var _BatchesData = __webpack_require__(54);

var _BatchesData2 = _interopRequireDefault(_BatchesData);

var _PointConfig = __webpack_require__(44);

var _PointConfig2 = _interopRequireDefault(_PointConfig);

var _OnState = __webpack_require__(1);

var _OnState2 = _interopRequireDefault(_OnState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isMobile = (0, _util.detectmob)();

var PointOverlay = function (_Parameter) {
    _inherits(PointOverlay, _Parameter);

    function PointOverlay(opts) {
        _classCallCheck(this, PointOverlay);

        var _this = _possibleConstructorReturn(this, (PointOverlay.__proto__ || Object.getPrototypeOf(PointOverlay)).call(this, _PointConfig2.default, opts));

        _this._loopDraw = _this._loopDraw.bind(_this);
        if (!(0, _util.isEmpty)(_this._option.draw)) {
            _this.batchesData = new _BatchesData2.default(_this._option.draw);
        }
        _this.mouseLayer = new _CanvasOverlay2.default();
        _this.state = null;
        return _this;
    }

    _createClass(PointOverlay, [{
        key: 'initLegend',
        value: function initLegend() {
            if (this.styleConfig.colors.length > 0) {
                this.compileSplitList(this.getTransformData());
            } else {
                this.setlegend(this.legendConfig, this.styleConfig.splitList);
            }
        }
    }, {
        key: 'onOptionChange',
        value: function onOptionChange() {
            this.map && this.initLegend();
        }
    }, {
        key: 'onDataChange',
        value: function onDataChange() {
            this.map && this.initLegend();
        }
    }, {
        key: 'parameterInit',
        value: function parameterInit() {
            this.map.addOverlay(this.mouseLayer);
            this.initLegend();
        }
    }, {
        key: 'setOptionStyle',
        value: function setOptionStyle(ops) {
            this._setStyle(this.baseConfig, ops);
            if (!(0, _util.isEmpty)(this._option.draw)) {
                this.batchesData = new _BatchesData2.default(this._option.draw);
            } else {
                this.batchesData = null;
            }
        }
    }, {
        key: 'setState',
        value: function setState(val) {
            this.state = val;
            this.eventConfig.onState(this.state);
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.drawMap();
        }
    }, {
        key: 'translation',
        value: function translation(distanceX, distanceY) {
            if (this.batchesData && !this.batchesData.usable) return;
            for (var i = 0; i < this.workerData.length; i++) {
                var pixel = this.workerData[i].geometry.pixel;
                pixel.x = pixel.x + distanceX;
                pixel.y = pixel.y + distanceY;
            }

            this.refresh();
        }
    }, {
        key: 'drawMouseLayer',
        value: function drawMouseLayer() {
            var overArr = this.overItem ? [this.overItem] : [];
            this.mouseLayer.clearCanvas();
            this._loopDraw(this.mouseLayer.ctx, this.selectItem.concat(overArr));
        }
    }, {
        key: 'clearAll',
        value: function clearAll() {
            this.mouseLayer.clearCanvas();
            this.clearCanvas();
        }
    }, {
        key: 'drawMap',
        value: function drawMap() {
            var _this2 = this;

            if (this.batchesData) {
                this.batchesData.clear();
                this.batchesData.setUsable(false);
            }

            this.clearAll();
            this.setState(_OnState2.default.computeBefore);
            this.postMessage('HeatOverlay.pointsToPixels', this.getTransformData(), function (pixels, margin, zoom) {

                _this2.setState(_OnState2.default.conputeAfter);
                _this2.setWorkerData(pixels);
                _this2.updateOverClickItem();

                if (_this2.batchesData) {
                    _this2.batchesData.setUsable(true);
                }
                if (_this2.map.getZoom() == zoom) {
                    _this2.translation(margin.left - _this2.margin.left, margin.top - _this2.margin.top);
                } else {
                    _this2.translation(0, 0);
                }
                margin = null;
                pixels = null;
            });
        }
    }, {
        key: 'updateOverClickItem',
        value: function updateOverClickItem() {
            var _this3 = this;

            var overArr = this.overItem ? [this.overItem] : [];
            var allItems = this.selectItem.concat(overArr);

            var _loop = function _loop(i) {
                var item = allItems[i];
                var ret = _this3.workerData.find(function (val) {
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
        key: 'compileSplitList',
        value: function compileSplitList(data) {
            var colors = this.styleConfig.colors;
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

            if (split.length > 0) {
                split.push({
                    start: star,
                    end: null,
                    backgroundColor: colors[colorIndex]
                });
            }

            this.styleConfig.splitList = split;
            this.setlegend(this.legendConfig, this.styleConfig.splitList);
        }
    }, {
        key: 'getTarget',
        value: function getTarget(mouseX, mouseY) {
            var pixels = this.workerData,
                ctx = this.ctx;
            var mapSize = this.map.getSize();
            for (var i = 0, len = pixels.length; i < len; i++) {
                var _item = pixels[i];
                var style = this.setDrawStyle(_item);
                var _item$geometry$pixel = _item.geometry.pixel,
                    x = _item$geometry$pixel.x,
                    y = _item$geometry$pixel.y;

                var r = style.size + this.styleConfig.normal.borderWidth;
                if (x > -r && y > -r && x < mapSize.width + r && y < mapSize.height + r) {
                    ctx.beginPath();
                    ctx.arc(x, y, r, 0, 2 * Math.PI, true);
                    if (ctx.isPointInPath(mouseX * this.devicePixelRatio, mouseY * this.devicePixelRatio)) {
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
        key: 'findIndexSelectItem',
        value: function findIndexSelectItem(item) {
            var index = -1;
            if (item) {
                index = this.selectItem.findIndex(function (val) {
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
            this.setState(_OnState2.default.drawBefore);
            this.clearCanvas();
            this.mouseLayer.canvasResize();
            if (this.batchesData) {
                this.batchesData.clear();
                this.batchesData.action(this.workerData, this._loopDraw, this.ctx);
            } else {
                this._loopDraw(this.ctx, this.workerData);
            }
            if (this.styleConfig.normal.label.show) {
                this._drawLabel(this.ctx, this.workerData);
            }
            this.drawMouseLayer();
            this.setState(_OnState2.default.drawAfter);
        }
    }, {
        key: 'swopData',
        value: function swopData(index, item) {
            if (index > -1 && !this.styleConfig.normal.label.show) {
                this.workerData[index] = this.workerData[this.workerData.length - 1];
                this.workerData[this.workerData.length - 1] = item;
            }
        }
    }, {
        key: '_loopDraw',
        value: function _loopDraw(ctx, pixels) {
            var mapSize = this.map.getSize();
            for (var i = 0, len = pixels.length; i < len; i++) {

                var _item2 = pixels[i];
                var pixel = _item2.geometry.pixel;

                var x = pixel.x,
                    y = pixel.y;

                var style = this.setDrawStyle(_item2);
                var size = style.size;
                if (this.styleConfig.normal.label.show) {
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

            var fontStyle = this.styleConfig.normal.label;
            var fontSize = parseInt(fontStyle.font);
            ctx.font = fontStyle.font;
            ctx.textBaseline = 'top';
            ctx.fillStyle = fontStyle.color;
            var byteWidth = ctx.measureText('a').width;

            var labels = pixels.map(function (val) {
                var _val$geometry$pixel = val.geometry.pixel,
                    radius = _val$geometry$pixel.radius,
                    x = _val$geometry$pixel.x,
                    y = _val$geometry$pixel.y;

                var r = radius + _this4.styleConfig.normal.borderWidth;
                return new _Label2.default(x, y, r, fontSize, byteWidth, val.name);
            });

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
        key: 'Tdispose',
        value: function Tdispose() {
            this.batchesData && this.batchesData.clear();
            this.map.removeOverlay(this.mouseLayer);
            this.mouseLayer.dispose();
        }
    }, {
        key: 'tMousemove',
        value: function tMousemove(event) {

            if (this.eventType == 'onmoving') {
                return;
            }
            if (!this.tooltipConfig.show && (0, _util.isEmpty)(this.styleConfig.mouseOver)) {
                return;
            }
            var result = this.getTarget(event.pixel.x, event.pixel.y);
            var temp = result.item;

            if (temp != this.overItem) {
                this.overItem = temp;
                this.eventType = 'mousemove';
                if (!(0, _util.isEmpty)(this.styleConfig.mouseOver)) {
                    this.drawMouseLayer();
                }
            }
            if (temp) {
                this.map.setDefaultCursor('pointer');
            } else {
                this.map.setDefaultCursor('default');
            }

            this.setTooltip(event);
        }
    }, {
        key: 'tMouseClick',
        value: function tMouseClick(event) {
            if (this.eventType == 'onmoving') return;
            var multiSelect = this.eventConfig.multiSelect;

            var result = this.getTarget(event.pixel.x, event.pixel.y);
            if (result.index == -1) {
                return;
            }

            var item = result.item;
            if (multiSelect) {
                if (this.selectItemContains(item)) {
                    this.deleteSelectItem(item);
                } else {
                    this.selectItem.push(result.item);
                }
            } else {
                this.selectItem = [result.item];
            }

            this.eventConfig.onMouseClick(this.selectItem, event);

            if (isMobile) {
                this.overItem = [item];
                this.setTooltip(event);
            }
            this.drawMouseLayer();
        }
    }]);

    return PointOverlay;
}(_Parameter3.default);

exports.default = PointOverlay;

/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ToolTip = __webpack_require__(51);

var _ToolTip2 = _interopRequireDefault(_ToolTip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toolbar = function () {
    function Toolbar(mapDom) {
        _classCallCheck(this, Toolbar);

        var toolDom = this.create(mapDom);
        var toolTip = new _ToolTip2.default(toolDom);
        var legendContainer = this.createLegendContainer(toolDom);
        return {
            legendContainer: legendContainer,
            toolTip: toolTip
        };
    }

    _createClass(Toolbar, [{
        key: 'create',
        value: function create(mapDom) {
            var div = document.createElement('div');
            div.classList.add('inmap-container');
            mapDom.appendChild(div);
            return div;
        }
    }, {
        key: 'createLegendContainer',
        value: function createLegendContainer(parentDom) {
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _MapStyle = __webpack_require__(13);

var _mapZoom = __webpack_require__(52);

var _mapZoom2 = _interopRequireDefault(_mapZoom);

var _Toolbar = __webpack_require__(14);

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _InmapConfig = __webpack_require__(38);

var _InmapConfig2 = _interopRequireDefault(_InmapConfig);

var _MultiOverlay = __webpack_require__(6);

var _MultiOverlay2 = _interopRequireDefault(_MultiOverlay);

__webpack_require__(59);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
    function Map(ops) {
        _classCallCheck(this, Map);

        this.map = null;
        this.option = (0, _util.merge)(_InmapConfig2.default, ops);
        this.create();
    }

    _createClass(Map, [{
        key: 'tMapStyle',
        value: function tMapStyle(map, skin) {
            var styleJson = null;
            if ((0, _util.isString)(skin)) {
                styleJson = skin == 'Blueness' ? _MapStyle.Blueness : _MapStyle.WhiteLover;
            } else if ((0, _util.isArray)(skin)) {
                styleJson = skin;
            }
            skin && map && map.setMapStyle({
                styleJson: styleJson
            });
        }
    }, {
        key: 'create',
        value: function create() {
            var id = this.option.id;

            var mapDom = (0, _util.isString)(id) ? document.getElementById(id) : id;
            var bmap = new BMap.Map(mapDom, {
                enableMapClick: false
            });
            bmap.enableScrollWheelZoom();
            bmap.disableDoubleClickZoom();
            bmap.enableKeyboard();

            this.tMapStyle(bmap, this.option.skin);

            bmap.inmapToolBar = new _Toolbar2.default(mapDom);
            var center = this.option.center;

            bmap.centerAndZoom(new BMap.Point(center[0], center[1]), this.option.zoom.value);
            bmap.setMinZoom(this.option.zoom.min);
            bmap.setMaxZoom(this.option.zoom.max);
            if (this.option.zoom.show) {
                var mapZoom = new _mapZoom2.default(bmap, mapDom, this.option.zoom);
                bmap.addEventListener('zoomend', function () {
                    mapZoom.setButtonState();
                });
            }

            this.map = bmap;
        }
    }, {
        key: 'getMap',
        value: function getMap() {
            return this.map;
        }
    }, {
        key: 'add',
        value: function add(overlay) {
            if (overlay.isDispose) {
                throw new TypeError('inMap: overlay has been destroyed.');
            } else if (overlay instanceof _MultiOverlay2.default) {
                overlay._init(this.map);
            } else {
                this.map.addOverlay(overlay);
            }
        }
    }, {
        key: 'remove',
        value: function remove(overlay) {
            if (overlay.map) {
                overlay.dispose();
            }
            overlay = null;
        }
    }]);

    return Map;
}();

exports.default = Map;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Parameter2 = __webpack_require__(3);

var _Parameter3 = _interopRequireDefault(_Parameter2);

var _GriddingConfig = __webpack_require__(34);

var _GriddingConfig2 = _interopRequireDefault(_GriddingConfig);

var _OnState = __webpack_require__(1);

var _OnState2 = _interopRequireDefault(_OnState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GriddingOverlay = function (_Parameter) {
    _inherits(GriddingOverlay, _Parameter);

    function GriddingOverlay(ops) {
        _classCallCheck(this, GriddingOverlay);

        var _this = _possibleConstructorReturn(this, (GriddingOverlay.__proto__ || Object.getPrototypeOf(GriddingOverlay)).call(this, _GriddingConfig2.default, ops));

        _this.state = null;
        _this._drawSize = 0;
        _this.mpp = {};
        return _this;
    }

    _createClass(GriddingOverlay, [{
        key: 'parameterInit',
        value: function parameterInit() {}
    }, {
        key: 'setOptionStyle',
        value: function setOptionStyle(ops) {
            this._setStyle(this.baseConfig, ops);
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.resize();
        }
    }, {
        key: 'setState',
        value: function setState(val) {
            this.state = val;
            this.eventConfig.onState(this.state);
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.setState(_OnState2.default.drawBefore);
            this.drawRec();
            this.setState(_OnState2.default.drawAfter);
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.drawMap();
        }
    }, {
        key: 'onOptionChange',
        value: function onOptionChange() {
            this.map && this.createColorSplit();
        }
    }, {
        key: 'onDataChange',
        value: function onDataChange() {
            this.map && this.createColorSplit();
        }
    }, {
        key: '_calculateMpp',
        value: function _calculateMpp() {
            var zoom = this.map.getZoom();
            if (this.mpp[zoom]) {
                return this.mpp[zoom];
            } else {
                this.mpp[zoom] = this.getMpp();
                return this.mpp[zoom];
            }
        }
    }, {
        key: 'getMpp',
        value: function getMpp() {
            var mapCenter = this.map.getCenter();
            var assistValue = 10;
            var cpt = new BMap.Point(mapCenter.lng, mapCenter.lat + assistValue);
            var dpx = Math.abs(this.map.pointToPixel(mapCenter).y - this.map.pointToPixel(cpt).y);
            return this.map.getDistance(mapCenter, cpt) / dpx;
        }
    }, {
        key: 'drawMap',
        value: function drawMap() {
            var _this2 = this;

            this.clearData();
            var _styleConfig = this.styleConfig,
                normal = _styleConfig.normal,
                type = _styleConfig.type;

            var zoom = this.map.getZoom();
            var mapCenter = this.map.getCenter();
            var mapSize = this.map.getSize();

            var zoomUnit = Math.pow(2, 18 - zoom);
            var mercatorProjection = this.map.getMapType().getProjection();
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
                points: this.points,
                size: size,
                type: type,
                nwMc: nwMc,
                zoomUnit: zoomUnit,
                mapSize: mapSize,
                mapCenter: mapCenter,
                zoom: zoom

            };
            this.setState(_OnState2.default.computeBefore);
            this.postMessage('GriddingOverlay.toRecGrids', params, function (gridsObj) {
                if (_this2.eventType == 'onmoving') {
                    return;
                }
                _this2.canvasResize();
                _this2.workerData = gridsObj.grids;
                _this2.setState(_OnState2.default.conputeAfter);

                _this2._drawSize = size / zoomUnit;
                _this2.setState(_OnState2.default.drawBefore);

                if (_this2.eventType != 'onmoveend' || _this2.styleConfig.splitList == null || _this2.styleConfig.splitList.length < _this2.styleConfig.colors.length) {
                    _this2.createColorSplit();
                }
                _this2.refresh();
                gridsObj = null;
            });
        }
    }, {
        key: '_isMouseOver',
        value: function _isMouseOver(mouseX, mouseY, x, y, w, h) {
            return !(mouseX < x || mouseX > x + w || mouseY < y || mouseY > y + h);
        }
    }, {
        key: 'findIndexSelectItem',
        value: function findIndexSelectItem(item) {
            var index = -1;
            if (item) {
                index = this.selectItem.findIndex(function (val) {
                    return val && val.x == item.x && val.y == item.y;
                });
            }
            return index;
        }
    }, {
        key: 'getTarget',
        value: function getTarget(x, y) {

            var gridStep = this._drawSize;
            var mapSize = this.map.getSize();
            for (var i = 0; i < this.workerData.length; i++) {
                var item = this.workerData[i];
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
        key: 'compileSplitList',
        value: function compileSplitList(data) {

            var colors = this.styleConfig.colors;
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
            this.styleConfig.splitList = result;
        }
    }, {
        key: 'createColorSplit',
        value: function createColorSplit() {

            this.styleConfig.colors.length > 0 && this.compileSplitList(this.workerData);

            this.setlegend(this.legendConfig, this.styleConfig.splitList);
        }
    }, {
        key: 'setTooltip',
        value: function setTooltip(event) {
            var item = this.overItem && this.overItem.list.length > 0 ? this.overItem : null;
            this.toolTip.render(event, item);
        }
    }, {
        key: 'getStyle',
        value: function getStyle(item) {
            if (item.count == 0) {
                return {
                    backgroundColor: 'rgba(255,255,255,0)'
                };
            } else {
                return this.setDrawStyle(item);
            }
        }
    }, {
        key: 'drawRec',
        value: function drawRec() {
            this.clearCanvas();
            var gridStep = this._drawSize;
            var style = this.styleConfig.normal;
            var mapSize = this.map.getSize();
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            for (var i = 0; i < this.workerData.length; i++) {
                var item = this.workerData[i];
                var x = item.x;
                var y = item.y;
                if (x > -gridStep && y > -gridStep && x < mapSize.width + gridStep && y < mapSize.height + gridStep) {
                    var drawStyle = this.getStyle(item);
                    if (drawStyle.shadowColor) {
                        this.ctx.shadowColor = drawStyle.shadowColor || 'transparent';
                        this.ctx.shadowBlur = drawStyle.shadowBlur || 10;
                    } else {
                        this.ctx.shadowColor = 'transparent';
                        this.ctx.shadowBlur = 0;
                    }
                    this.ctx.fillStyle = drawStyle.backgroundColor;
                    this.ctx.fillRect(x, y, gridStep - style.padding, gridStep - style.padding);
                }
            }
        }
    }]);

    return GriddingOverlay;
}(_Parameter3.default);

exports.default = GriddingOverlay;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasOverlay2 = __webpack_require__(4);

var _CanvasOverlay3 = _interopRequireDefault(_CanvasOverlay2);

var _util = __webpack_require__(0);

var _HeatConfig = __webpack_require__(35);

var _HeatConfig2 = _interopRequireDefault(_HeatConfig);

var _OnState = __webpack_require__(1);

var _OnState2 = _interopRequireDefault(_OnState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeatOverlay = function (_CanvasOverlay) {
    _inherits(HeatOverlay, _CanvasOverlay);

    function HeatOverlay(ops) {
        _classCallCheck(this, HeatOverlay);

        var _this = _possibleConstructorReturn(this, (HeatOverlay.__proto__ || Object.getPrototypeOf(HeatOverlay)).call(this, ops));

        _this.points = [];
        _this.workerData = [];
        _this._setStyle(_HeatConfig2.default, ops);
        _this.delteOption();
        _this.state = null;
        return _this;
    }

    _createClass(HeatOverlay, [{
        key: 'resize',
        value: function resize() {
            this.drawMap();
        }
    }, {
        key: 'getTransformData',
        value: function getTransformData() {
            return this.workerData.length > 0 ? this.workerData : this.points;
        }
    }, {
        key: '_setStyle',
        value: function _setStyle(config, ops) {
            ops = ops || {};
            var option = (0, _util.merge)(config, ops);
            this.styleConfig = option.style;
            this.eventConfig = option.event;
            this.gradient = option.style.gradient;
            this.points = ops.data ? option.data : this.points;
            this.tMapStyle(option.skin);
        }
    }, {
        key: 'setOptionStyle',
        value: function setOptionStyle(ops) {
            this._setStyle(_HeatConfig2.default, ops);
            this.delteOption();
            (0, _util.clearPushArray)(this.workerData, []);
            this.drawMap();
        }
    }, {
        key: 'setState',
        value: function setState(val) {
            this.state = val;
            this.eventConfig.onState(this.state);
        }
    }, {
        key: 'delteOption',
        value: function delteOption() {
            this.tooltipConfig = {
                show: false
            };
            this.legendConfig = {
                show: false
            };
        }
    }, {
        key: 'setData',
        value: function setData(points) {
            this.setPoints(points);
        }
    }, {
        key: 'setPoints',
        value: function setPoints(points) {
            if (!(0, _util.isArray)(points)) {
                throw new TypeError('inMap :data must be a Array');
            }
            this.points = points;
            this.drawMap();
        }
    }, {
        key: 'getMax',
        value: function getMax() {
            var normal = this.styleConfig.normal;
            normal.maxValue = 0;
            for (var i = 0, len = this.points.length; i < len; i++) {
                if (this.points[i].count > normal.maxValue) {
                    normal.maxValue = this.points[i].count;
                }
            }
        }
    }, {
        key: 'translation',
        value: function translation(distanceX, distanceY) {
            for (var i = 0; i < this.workerData.length; i++) {
                var pixel = this.workerData[i].geometry.pixel;
                pixel.x = pixel.x + distanceX;
                pixel.y = pixel.y + distanceY;
            }
            this.setState(_OnState2.default.drawBefore);
            this.refresh();
            this.setState(_OnState2.default.drawAfter);
        }
    }, {
        key: 'setWorkerData',
        value: function setWorkerData(val) {
            this.points = [];
            (0, _util.clearPushArray)(this.workerData, val);
        }
    }, {
        key: 'drawMap',
        value: function drawMap() {
            var _this2 = this;

            this.setState(_OnState2.default.computeBefore);

            this.postMessage('HeatOverlay.pointsToPixels', this.getTransformData(), function (pixels, margin) {

                if (_this2.eventType == 'onmoving') {
                    return;
                }
                _this2.setWorkerData(pixels);
                _this2.setState(_OnState2.default.conputeAfter);

                _this2.translation(margin.left - _this2.margin.left, margin.top - _this2.margin.top);

                margin = null;
                pixels = null;
            });
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.clearCanvas();
            var normal = this.styleConfig.normal;
            var container = this.container;
            if (normal.maxValue == 0) {
                this.getMax();
            }
            if (container.width <= 0) {
                return;
            }

            var ctx = this.ctx;
            for (var i = 0, _len = this.workerData.length; i < _len; i++) {
                var item = this.workerData[i];
                var opacity = (item.count - normal.minValue) / (normal.maxValue - normal.minValue);
                opacity = opacity > 1 ? 1 : opacity;
                var pixel = item.geometry.pixel;
                this.drawPoint(pixel.x, pixel.y, normal.radius, opacity);
                item = null, opacity = null, pixel = null;
            }

            var palette = this.getColorPaint();

            var img = ctx.getImageData(0, 0, container.width, container.height);
            var imgData = img.data;

            var max_opacity = normal.maxOpacity * 255;
            var min_opacity = normal.minOpacity * 255;

            var max_scope = (normal.maxScope > 1 ? 1 : normal.maxScope) * 255;
            var min_scope = (normal.minScope < 0 ? 0 : normal.minScope) * 255;
            var len = imgData.length;
            for (var _i = 3; _i < len; _i += 4) {
                var alpha = imgData[_i];
                var offset = alpha * 4;
                if (!offset) {
                    continue;
                }
                imgData[_i - 3] = palette[offset];
                imgData[_i - 2] = palette[offset + 1];
                imgData[_i - 1] = palette[offset + 2];

                if (imgData[_i] > max_scope) {
                    imgData[_i] = 0;
                }
                if (imgData[_i] < min_scope) {
                    imgData[_i] = 0;
                }

                if (imgData[_i] > max_opacity) {
                    imgData[_i] = max_opacity;
                }
                if (imgData[_i] < min_opacity) {
                    imgData[_i] = min_opacity;
                }
            }

            ctx.putImageData(img, 0, 0, 0, 0, container.width, container.height);
        }
    }, {
        key: 'drawPoint',
        value: function drawPoint(x, y, radius, opacity) {
            var ctx = this.ctx;
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
        key: 'getColorPaint',
        value: function getColorPaint() {
            var gradientConfig = this.gradient;
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
    }]);

    return HeatOverlay;
}(_CanvasOverlay3.default);

exports.default = HeatOverlay;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Parameter2 = __webpack_require__(3);

var _Parameter3 = _interopRequireDefault(_Parameter2);

var _HoneycombConfig = __webpack_require__(36);

var _HoneycombConfig2 = _interopRequireDefault(_HoneycombConfig);

var _OnState = __webpack_require__(1);

var _OnState2 = _interopRequireDefault(_OnState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HoneycombOverlay = function (_Parameter) {
    _inherits(HoneycombOverlay, _Parameter);

    function HoneycombOverlay(ops) {
        _classCallCheck(this, HoneycombOverlay);

        var _this = _possibleConstructorReturn(this, (HoneycombOverlay.__proto__ || Object.getPrototypeOf(HoneycombOverlay)).call(this, _HoneycombConfig2.default, ops));

        _this.state = null;
        _this.mpp = {};
        _this._drawSize = 0;
        return _this;
    }

    _createClass(HoneycombOverlay, [{
        key: 'setOptionStyle',
        value: function setOptionStyle(ops) {
            this._setStyle(this.baseConfig, ops);
        }
    }, {
        key: 'setState',
        value: function setState(val) {
            this.state = val;
            this.eventConfig.onState(this.state);
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.resize();
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.setState(_OnState2.default.drawBefore);
            this.drawRec();
            this.setState(_OnState2.default.drawAfter);
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.drawMap();
        }
    }, {
        key: 'onOptionChange',
        value: function onOptionChange() {
            this.map && this.createColorSplit();
        }
    }, {
        key: 'onDataChange',
        value: function onDataChange() {
            this.map && this.createColorSplit();
        }
    }, {
        key: '_calculateMpp',
        value: function _calculateMpp() {
            var zoom = this.map.getZoom();
            if (this.mpp[zoom]) {
                return this.mpp[zoom];
            } else {
                this.mpp[zoom] = this.getMpp();
                return this.mpp[zoom];
            }
        }
    }, {
        key: 'getMpp',
        value: function getMpp() {
            var mapCenter = this.map.getCenter();
            var assistValue = 10;
            var cpt = new BMap.Point(mapCenter.lng, mapCenter.lat + assistValue);
            var dpx = Math.abs(this.map.pointToPixel(mapCenter).y - this.map.pointToPixel(cpt).y);
            return this.map.getDistance(mapCenter, cpt) / dpx;
        }
    }, {
        key: 'drawMap',
        value: function drawMap() {
            var _this2 = this;

            this.clearData();
            var _styleConfig = this.styleConfig,
                normal = _styleConfig.normal,
                type = _styleConfig.type;

            var zoom = this.map.getZoom();
            var mapCenter = this.map.getCenter();
            var mapSize = this.map.getSize();

            var zoomUnit = Math.pow(2, 18 - zoom);
            var mercatorProjection = this.map.getMapType().getProjection();
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
                points: this.points,
                size: size,
                type: type,
                nwMc: nwMc,
                zoomUnit: zoomUnit,
                mapSize: mapSize,
                mapCenter: mapCenter,
                zoom: zoom
            };
            this.setState(_OnState2.default.computeBefore);

            this.postMessage('HoneycombOverlay.toRecGrids', params, function (gridsObj) {
                if (_this2.eventType == 'onmoving') {
                    return;
                }
                _this2.canvasResize();
                _this2.setState(_OnState2.default.conputeAfter);

                _this2.workerData = gridsObj.grids;
                _this2._drawSize = size / zoomUnit;

                if (_this2.eventType != 'onmoveend' || _this2.styleConfig.splitList == null || _this2.styleConfig.splitList.length < _this2.styleConfig.colors.length) {
                    _this2.createColorSplit();
                }
                _this2.refresh();
                gridsObj = null;
            });
        }
    }, {
        key: 'createColorSplit',
        value: function createColorSplit() {
            this.styleConfig.colors.length > 0 && this.compileSplitList(this.workerData);
            this.setlegend(this.legendConfig, this.styleConfig.splitList);
        }
    }, {
        key: 'compileSplitList',
        value: function compileSplitList(data) {

            var colors = this.styleConfig.colors;
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

            this.styleConfig.splitList = result;
        }
    }, {
        key: 'findIndexSelectItem',
        value: function findIndexSelectItem(item) {
            var index = -1;
            if (item) {
                index = this.selectItem.findIndex(function (val) {
                    return val && val.x == item.x && val.y == item.y;
                });
            }
            return index;
        }
    }, {
        key: 'getStyle',
        value: function getStyle(item) {
            if (item.count == 0) {
                return {
                    backgroundColor: 'rgba(255,255,255,0)'
                };
            } else {
                return this.setDrawStyle(item);
            }
        }
    }, {
        key: 'getTarget',
        value: function getTarget(mouseX, mouseY) {
            var gridStep = this._drawSize;
            var mapSize = this.map.getSize();

            for (var i = 0; i < this.workerData.length; i++) {
                var item = this.workerData[i];
                var x = item.x;
                var y = item.y;
                if (item.count > 0 && x > -gridStep && y > -gridStep && x < mapSize.width + gridStep && y < mapSize.height + gridStep) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y - gridStep / 2);
                    this.ctx.lineTo(x + gridStep / 2, y - gridStep / 4);
                    this.ctx.lineTo(x + gridStep / 2, y + gridStep / 4);
                    this.ctx.lineTo(x, y + gridStep / 2);
                    this.ctx.lineTo(x - gridStep / 2, y + gridStep / 4);
                    this.ctx.lineTo(x - gridStep / 2, y - gridStep / 4);
                    this.ctx.closePath();

                    if (this.ctx.isPointInPath(mouseX * this.devicePixelRatio, mouseY * this.devicePixelRatio)) {
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
        key: 'drawRec',
        value: function drawRec() {
            this.clearCanvas();
            var mapSize = this.map.getSize();
            var gridsW = this._drawSize;

            var style = this.styleConfig.normal;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            for (var i = 0; i < this.workerData.length; i++) {
                var item = this.workerData[i];
                var x = item.x;
                var y = item.y;
                var count = item.count;
                if (count > 0 && x > -gridsW && y > -gridsW && x < mapSize.width + gridsW && y < mapSize.height + gridsW) {
                    var drawStyle = this.getStyle(item);
                    this.drawLine(x, y, gridsW - style.padding, drawStyle, this.ctx);
                }
            }
        }
    }, {
        key: 'drawLine',
        value: function drawLine(x, y, gridStep, drawStyle, ctx) {

            ctx.beginPath();
            if (drawStyle.shadowColor) {
                this.ctx.shadowColor = drawStyle.shadowColor || 'transparent';
                this.ctx.shadowBlur = drawStyle.shadowBlur || 10;
            } else {
                this.ctx.shadowColor = 'transparent';
                this.ctx.shadowBlur = 0;
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
    }]);

    return HoneycombOverlay;
}(_Parameter3.default);

exports.default = HoneycombOverlay;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Parameter2 = __webpack_require__(3);

var _Parameter3 = _interopRequireDefault(_Parameter2);

var _ImgConfig = __webpack_require__(37);

var _ImgConfig2 = _interopRequireDefault(_ImgConfig);

var _util = __webpack_require__(0);

var _OnState = __webpack_require__(1);

var _OnState2 = _interopRequireDefault(_OnState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImgOverlay = function (_Parameter) {
    _inherits(ImgOverlay, _Parameter);

    function ImgOverlay(opts) {
        _classCallCheck(this, ImgOverlay);

        var _this = _possibleConstructorReturn(this, (ImgOverlay.__proto__ || Object.getPrototypeOf(ImgOverlay)).call(this, _ImgConfig2.default, opts));

        _this.cacheImg = {};
        _this.state = null;
        return _this;
    }

    _createClass(ImgOverlay, [{
        key: 'resize',
        value: function resize() {
            this.drawMap();
        }
    }, {
        key: 'setOptionStyle',
        value: function setOptionStyle(ops) {
            this._setStyle(this.baseConfig, ops);
        }
    }, {
        key: 'setState',
        value: function setState(val) {
            this.state = val;
            this.eventConfig.onState(this.state);
        }
    }, {
        key: 'translation',
        value: function translation(distanceX, distanceY) {
            for (var i = 0; i < this.workerData.length; i++) {
                var pixel = this.workerData[i].geometry.pixel;
                pixel.x = pixel.x + distanceX;
                pixel.y = pixel.y + distanceY;
                pixel = null;
            }

            this.refresh();
        }
    }, {
        key: 'drawMap',
        value: function drawMap() {
            var _this2 = this;

            this.setState(_OnState2.default.computeBefore);
            this.postMessage('HeatOverlay.pointsToPixels', this.getTransformData(), function (pixels, margin) {
                if (_this2.eventType == 'onmoving') {
                    return;
                }
                _this2.setState(_OnState2.default.conputeAfter);

                _this2.setWorkerData(pixels);
                _this2.translation(margin.left - _this2.margin.left, margin.top - _this2.margin.top);
                margin = null;
                pixels = null;
            });
        }
    }, {
        key: '_isMouseOver',
        value: function _isMouseOver(x, y, imgX, imgY, imgW, imgH) {
            return !(x < imgX || x > imgX + imgW || y < imgY || y > imgY + imgH);
        }
    }, {
        key: 'getTarget',
        value: function getTarget(x, y) {
            var pixels = this.workerData;

            for (var i = 0, len = pixels.length; i < len; i++) {
                var item = pixels[i];
                var pixel = item.geometry.pixel;
                var style = this.setDrawStyle(item);
                var img = void 0;
                if ((0, _util.isString)(img)) {
                    img = this.cacheImg[style.icon];
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
        key: 'findIndexSelectItem',
        value: function findIndexSelectItem(item) {
            var index = -1;
            if (item) {
                index = this.selectItem.findIndex(function (val) {
                    return val && val.lat == item.lat && val.lng == item.lng;
                });
            }

            return index;
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.setState(_OnState2.default.drawBefore);
            this.clearCanvas();
            this._loopDraw(this.ctx, this.workerData);
            this.setState(_OnState2.default.drawAfter);
        }
    }, {
        key: 'loadImg',
        value: function loadImg(img, fun) {
            var me = this;
            if ((0, _util.isString)(img)) {
                var image = me.cacheImg[img];
                if (!image) {
                    var _image = new Image();
                    _image.src = img;
                    _image.onload = function () {
                        me.cacheImg[img] = _image;
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
        key: 'isPercent',
        value: function isPercent(val) {
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

            if (this.isPercent(offsetL)) {
                x = pixel.x + scaleW * offsetLeft / 100;
            } else {
                x = pixel.x + offsetLeft;
            }
            if (this.isPercent(offsetT)) {
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
        key: 'setDrawStyle',
        value: function setDrawStyle(item) {
            var normal = this.styleConfig.normal;
            var result = {};
            Object.assign(result, normal);


            var splitList = this.styleConfig.splitList;
            for (var i = 0; i < splitList.length; i++) {
                var condition = splitList[i];
                if (condition.end == null) {
                    if (item.count >= condition.start) {
                        Object.assign(result, normal, condition);
                        break;
                    }
                } else if (item.count >= condition.start && item.count < condition.end) {
                    Object.assign(result, normal, condition);
                    break;
                }
            }

            return result;
        }
    }, {
        key: '_loopDraw',
        value: function _loopDraw(ctx, pixels) {
            var _this3 = this;

            var _loop = function _loop(i, len) {
                var item = pixels[i];
                var pixel = item.geometry.pixel;
                var style = _this3.setDrawStyle(item);
                _this3.loadImg(style.icon, function (img) {
                    if (style.width && style.height) {
                        var xy = _this3._getDrawXY(pixel, style.offsets.left, style.offsets.top, style.width, style.height);
                        _this3._drawImage(_this3.ctx, img, xy.x, xy.y, style.width, style.height);
                    } else {
                        var _xy2 = _this3._getDrawXY(pixel, style.offsets.left, style.offsets.top, img.width, img.height, 1);
                        _this3._drawImage(_this3.ctx, img, _xy2.x, _xy2.y, img.width, img.height);
                    }
                });
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
    }]);

    return ImgOverlay;
}(_Parameter3.default);

exports.default = ImgOverlay;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MultiOverlay2 = __webpack_require__(6);

var _MultiOverlay3 = _interopRequireDefault(_MultiOverlay2);

var _PointOverlay = __webpack_require__(12);

var _PointOverlay2 = _interopRequireDefault(_PointOverlay);

var _LineStringOverlay = __webpack_require__(11);

var _LineStringOverlay2 = _interopRequireDefault(_LineStringOverlay);

var _LineStringAnimationOverlay = __webpack_require__(10);

var _LineStringAnimationOverlay2 = _interopRequireDefault(_LineStringAnimationOverlay);

var _MoveLineConfig = __webpack_require__(42);

var _MoveLineConfig2 = _interopRequireDefault(_MoveLineConfig);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MoveLineOverlay = function (_MultiOverlay) {
    _inherits(MoveLineOverlay, _MultiOverlay);

    function MoveLineOverlay(opts) {
        _classCallCheck(this, MoveLineOverlay);

        var _this = _possibleConstructorReturn(this, (MoveLineOverlay.__proto__ || Object.getPrototypeOf(MoveLineOverlay)).call(this));

        _this.isDispose = false;
        _this.data = opts.data || [];
        var option = (0, _util.merge)(_MoveLineConfig2.default, opts);
        _this.PointOverlay = _this.creataPointOverlay(option);
        _this.LineStringOverlay = _this.createLineStringOverlay(option);
        _this.LineStringAnimationOverlay = _this.createLineStringAnimationOverlay(option);
        return _this;
    }

    _createClass(MoveLineOverlay, [{
        key: '_init',
        value: function _init(map) {
            map.addOverlay(this.LineStringOverlay);
            map.addOverlay(this.LineStringAnimationOverlay);
            map.addOverlay(this.PointOverlay);
        }
    }, {
        key: '_findIndex',
        value: function _findIndex(data, name) {
            return data.findIndex(function (item) {
                return item.name == name;
            });
        }
    }, {
        key: 'creataPointOverlay',
        value: function creataPointOverlay(opts) {
            var _this2 = this;

            var data = [];
            this.data.forEach(function (item) {
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

            opts.style.point['data'] = data;
            return new _PointOverlay2.default(opts.style.point);
        }
    }, {
        key: 'createLineStringOverlay',
        value: function createLineStringOverlay(opts) {
            var data = this.data.map(function (item) {
                return {
                    geometry: {
                        type: 'LineString',
                        coordinates: [item.from.coordinates, item.to.coordinates]
                    },
                    properties: item,
                    count: item.count
                };
            });
            opts.style.line['data'] = data;
            return new _LineStringOverlay2.default(opts.style.line);
        }
    }, {
        key: 'createLineStringAnimationOverlay',
        value: function createLineStringAnimationOverlay(opts) {
            var data = this.data.map(function (item) {
                return {
                    geometry: {
                        type: 'LineString',
                        coordinates: [item.from.coordinates, item.to.coordinates]
                    },
                    count: item.count
                };
            });
            opts.style.lineAnimation['data'] = data;
            return new _LineStringAnimationOverlay2.default(opts.style.lineAnimation);
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this.PointOverlay.dispose();
            this.LineStringOverlay.dispose();
            var me = this;
            for (var key in me) {
                if (!(0, _util.isFunction)(me[key])) {
                    me[key] = null;
                }
            }
            me.isDispose = true;
            me = null;
        }
    }]);

    return MoveLineOverlay;
}(_MultiOverlay3.default);

exports.default = MoveLineOverlay;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasOverlay2 = __webpack_require__(4);

var _CanvasOverlay3 = _interopRequireDefault(_CanvasOverlay2);

var _util = __webpack_require__(0);

var _PointAnimation = __webpack_require__(43);

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

        _this.data = [];
        _this.styleConfig = null;
        _this.markers = [];
        _this.render = _this.render.bind(_this);
        _this.setOptionStyle(ops);
        return _this;
    }

    _createClass(PointAnimationOverlay, [{
        key: 'canvasInit',
        value: function canvasInit() {
            this.addMarker();
            var now = void 0;
            var then = Date.now();
            var interval = 1000 / 25;
            var delta = void 0;
            var render = this.render;
            (function drawFrame() {
                requestAnimationFrame(drawFrame);
                now = Date.now();
                delta = now - then;
                if (delta > interval) {
                    then = now - delta % interval;
                    render();
                }
            })();
        }
    }, {
        key: 'setOptionStyle',
        value: function setOptionStyle(ops) {
            var option = (0, _util.merge)(_PointAnimation2.default, ops);
            this.styleConfig = option.style.normal;
            this.data = ops.data ? option.data : this.data;
            this.tMapStyle(option.skin);
            this.map && this.addMarker();
        }
    }, {
        key: 'translation',
        value: function translation(distanceX, distanceY) {

            for (var i = 0; i < this.markers.length; i++) {
                var pixel = this.markers[i].pixel;
                pixel.x = pixel.x + distanceX;
                pixel.y = pixel.y + distanceY;
            }
        }
    }, {
        key: 'addMarker',
        value: function addMarker() {
            this.markers = [];
            for (var i = 0; i < this.data.length; i++) {
                var style = (0, _util.merge)(this.styleConfig, this.data[i].style);
                this.markers.push(new Marker(style, this.data[i], this.map));
            }
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.addMarker();
            this.canvasResize();
        }
    }, {
        key: 'render',
        value: function render() {
            var ctx = this.ctx;
            if (!ctx) {
                return;
            }
            if (!this.animationFlag) {
                this.clearCanvas();
                return;
            }

            var size = this.map.getSize();
            ctx.fillStyle = 'rgba(0,0,0,.95)';
            var prev = ctx.globalCompositeOperation;
            ctx.globalCompositeOperation = 'destination-in';

            ctx.fillRect(0, 0, size.width, size.height);
            ctx.globalCompositeOperation = prev;

            for (var i = 0; i < this.markers.length; i++) {
                var marker = this.markers[i];
                marker.draw(ctx);
            }
        }
    }]);

    return PointAnimationOverlay;
}(_CanvasOverlay3.default);

exports.default = PointAnimationOverlay;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PolygonEditor = __webpack_require__(46);

var _PolygonEditor2 = _interopRequireDefault(_PolygonEditor);

var _GeoUtils = __webpack_require__(47);

var _GeoUtils2 = _interopRequireDefault(_GeoUtils);

var _MultiOverlay2 = __webpack_require__(6);

var _MultiOverlay3 = _interopRequireDefault(_MultiOverlay2);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PolygonEditorOverlay = function (_MultiOverlay) {
    _inherits(PolygonEditorOverlay, _MultiOverlay);

    function PolygonEditorOverlay(opts) {
        _classCallCheck(this, PolygonEditorOverlay);

        var _this = _possibleConstructorReturn(this, (PolygonEditorOverlay.__proto__ || Object.getPrototypeOf(PolygonEditorOverlay)).call(this));

        var option = (0, _util.merge)(_PolygonEditor2.default, opts);
        _this.toolTipConfig = option.tooltip;
        _this.points = _this._geoJsonToPoint(option.data || []);
        _this.overlay = null;
        _this.map = null;
        _this.isDispose = false;
        _this.option = option.style;
        _this._vectisWidth = 10;
        _this.drawPoint = _this.points;
        _this.pixels = null;
        _this._isBinded = false;
        _this.isClick = _this.points.length > 0 ? false : true;
        _this.overlay = new BMap.Polygon([], _this.option);
        _this.startAction = _this.startAction.bind(_this);
        _this.mousemoveAction = _this.mousemoveAction.bind(_this);
        _this.dblclickAction = _this.dblclickAction.bind(_this);
        _this.clickAction = _this.clickAction.bind(_this);
        _this.getAreaByPolygon = _this.getAreaByPolygon.bind(_this);
        _this.lineupdate = _this.lineupdate.bind(_this);

        _this._first = new Date(), _this._second = null, _this._interval = 250;
        _this.changeHanderList = [];
        _this.copy();

        _this.lineupdateTimeout = null;

        return _this;
    }

    _createClass(PolygonEditorOverlay, [{
        key: '_init',
        value: function _init(map) {
            this.map = map;
            this.map.addOverlay(this.overlay);
            this.overlay.setPath(this.points);
            this.bingMoveEvent();

            if (this.map.inmapToolBar) {
                this.ToolTip = this.map.inmapToolBar.toolTip;
                this.ToolTip.setOption(this.toolTipConfig);
                this.getAreaByPolygon();
            }
        }
    }, {
        key: 'bingMoveEvent',
        value: function bingMoveEvent() {
            this.map.addEventListener('click', this.clickAction);
            this.map.addEventListener('mousemove', this.mousemoveAction);
            this.overlay.addEventListener('lineupdate', this.lineupdate);
            this.map.addEventListener('resize', this.getAreaByPolygon);
            this.map.addEventListener('moveend', this.getAreaByPolygon);
            this.map.addEventListener('moving', this.getAreaByPolygon);
            this.map.addEventListener('zoomend', this.getAreaByPolygon);
        }
    }, {
        key: 'removeMoveEvent',
        value: function removeMoveEvent() {
            this.map.removeEventListener('mousedown', this.startAction);
            this.map.removeEventListener('click', this.clickAction);
            this.map.removeEventListener('resize', this.getAreaByPolygon);
            this.map.removeEventListener('moveend', this.getAreaByPolygon);
            this.map.removeEventListener('moving', this.getAreaByPolygon);
            this.map.removeEventListener('zoomend', this.getAreaByPolygon);
            this.overlay.removeEventListener('lineupdate', this.lineupdate);
        }
    }, {
        key: 'lineupdate',
        value: function lineupdate(e) {
            var _this2 = this;

            if (!this.isClick) {
                if (this.lineupdateTimeout) {
                    clearTimeout(this.lineupdateTimeout);
                }
                this.lineupdateTimeout = setTimeout(function () {
                    for (var i = 0; i < _this2.changeHanderList.length; i++) {
                        _this2.changeHanderList[i](e);
                    }
                }, 800);
            }
        }
    }, {
        key: 'showAreaText',
        value: function showAreaText() {
            this.toolTipConfig.show = true;
        }
    }, {
        key: 'hideAreaText',
        value: function hideAreaText() {
            this.toolTipConfig.show = false;
        }
    }, {
        key: 'getAreaByPolygon',
        value: function getAreaByPolygon() {

            if (!this.isClick && this.toolTipConfig.show) {
                var geos = this.overlay.getPath();
                var areas = _GeoUtils2.default.getPolygonArea(geos);
                var center = this.getGeoCenter(geos);
                var pixel = this.map.pointToOverlayPixel(new BMap.Point(center.lng, center.lat));
                this.ToolTip && this.ToolTip.showCenterText('\u9762\u79EF\uFF1A' + parseInt(areas) + '\u5E73\u65B9\u7C73', pixel.x + this.map.offsetX, pixel.y + this.map.offsetY);
            } else {
                this.ToolTip && this.ToolTip.hide();
            }
        }
    }, {
        key: 'getGeoCenter',
        value: function getGeoCenter(geo) {
            var minX = geo[0].lng;
            var maxX = geo[0].lng;
            var minY = geo[0].lat;
            var maxY = geo[0].lat;
            for (var i = 1; i < geo.length; i++) {
                minX = Math.min(minX, geo[i].lng);
                maxX = Math.max(maxX, geo[i].lng);
                minY = Math.min(minY, geo[i].lat);
                maxY = Math.max(maxY, geo[i].lat);
            }
            return {
                lng: minX + (maxX - minX) / 2,
                lat: minY + (maxY - minY) / 2
            };
        }
    }, {
        key: 'clickAction',
        value: function clickAction(e) {
            this._second = new Date();

            if (this.isClick) {
                if (this._second - this._first <= this._interval) {
                    this._first = new Date();
                    this.dblclickAction(e);
                } else {
                    this._first = new Date();
                    this.startAction(e);
                }
            } else {

                if (this._second - this._first <= this._interval) {
                    this._first = new Date();
                    var x = e.pixel.x - this.map.offsetX;
                    var y = e.pixel.y - this.map.offsetY;
                    var index = this.findIndexVectis({
                        x: x,
                        y: y
                    });
                    if (index > -1) {
                        this.drawPoint = this.overlay.getPath();
                        this.drawPoint.splice(index, 1);
                        this.overlay.setPath(this.drawPoint);
                    }
                } else {
                    this._first = new Date();
                }
            }
            this.getAreaByPolygon();
        }
    }, {
        key: 'findIndexVectis',
        value: function findIndexVectis(_ref) {
            var _this3 = this;

            var x = _ref.x,
                y = _ref.y;

            this.pixels = this.overlay.getPath().map(function (item) {
                return _this3.map.pointToOverlayPixel(item);
            });

            var r = this._vectisWidth / 2;

            for (var i = 0; i < this.pixels.length; i++) {
                var item = this.pixels[i];
                if (this._isMouseOver(x, y, item.x - r, item.y - r, this._vectisWidth, this._vectisWidth)) {
                    return i;
                }
            }
            return -1;
        }
    }, {
        key: '_isMouseOver',
        value: function _isMouseOver(mouseX, mouseY, x, y, w, h) {
            return !(mouseX < x || mouseX > x + w || mouseY < y || mouseY > y + h);
        }
    }, {
        key: 'dispose',
        value: function dispose() {

            this.ToolTip && this.ToolTip.hide();
            this.removeMoveEvent();
            this.map.removeOverlay(this.overlay);
            for (var key in this.overlay) {
                this.overlay[key] = null;
            }
            for (var _key in this) {
                this[_key] = null;
            }
            this.isDispose = true;
        }
    }, {
        key: 'startAction',
        value: function startAction(e) {

            var points = this.points;
            points.push(e.point);
            this.drawPoint = points.concat(points[points.length - 1]);
            this.overlay.setPath(this.drawPoint);

            if (!this._isBinded) {
                this._isBinded = true;
            }
        }
    }, {
        key: 'translation',
        value: function translation(x, y) {
            var _this4 = this;

            this.pixels = this.overlay.getPath().map(function (item) {
                return _this4.map.pointToOverlayPixel(item);
            });
            for (var i = 0; i < this.pixels.length; i++) {
                var item = this.pixels[i];
                item.x = item.x + x;
                item.y = item.y + y;
            }

            this.drawPoint = this.pixels.map(function (item) {
                return _this4.map.overlayPixelToPoint(item);
            });

            this.overlay.setPath(this.drawPoint);
        }
    }, {
        key: 'mousemoveAction',
        value: function mousemoveAction(e) {
            if (!this._isBinded) {
                return;
            }
            this.overlay.setPositionAt(this.drawPoint.length - 1, e.point);
        }
    }, {
        key: 'dblclickAction',
        value: function dblclickAction() {
            if (!this._isBinded) {
                return;
            }
            this.map.removeEventListener('mousemove', this.mousemoveAction);
            this._isBinded = false;
            this.isClick = false;
            this.drawPoint.pop();
            this.overlay.setPath(this.drawPoint);
        }
    }, {
        key: 'addEventListener',
        value: function addEventListener(eventStr, handler) {

            if (eventStr == 'change') {
                this.changeHanderList.push(handler);
            } else {
                this.overlay.addEventListener(eventStr, handler);
            }
        }
    }, {
        key: 'removeEventListener',
        value: function removeEventListener(eventStr, handler) {
            if (eventStr == 'change') {
                for (var i = 0; i < this.changeHanderList.length; i++) {
                    if (this.changeHanderList[i] == handler) {
                        this.changeHanderList.splice(i--, 1);
                    }
                }
            } else {
                this.overlay.removeEventListener(eventStr, handler);
            }
        }
    }, {
        key: 'copy',
        value: function copy() {
            var _this5 = this;

            ['setStrokeColor', 'getStrokeColor', 'setFillColor', 'getFillColor', 'setStrokeOpacity', 'getStrokeOpacity', 'setFillOpacity', 'getFillOpacity', 'setStrokeWeight', 'getStrokeWeight', 'setStrokeStyle', 'getStrokeStyle', 'getBounds', 'enableEditing', 'disableEditing', 'enableMassClear', 'disableMassClear', 'setPositionAt', 'getMap'].forEach(function (key) {
                _this5[key] = _this5.overlay[key].bind(_this5.overlay);
            });
        }
    }, {
        key: '_geoJsonToPoint',
        value: function _geoJsonToPoint(data) {
            if (data.geometry) {
                return data.geometry.coordinates.map(function (item) {
                    return {
                        lng: item[0],
                        lat: item[1]
                    };
                });
            } else {
                return [];
            }
        }
    }, {
        key: 'setPath',
        value: function setPath(data) {
            var point = this._geoJsonToPoint(data);
            this.drawPoint = point;

            this.overlay.setPath(point);
        }
    }, {
        key: 'getPath',
        value: function getPath() {
            var data = this.overlay.getPath();
            var coordinates = data.map(function (item) {
                return [item.lng, item.lat];
            });
            return {
                geometry: {
                    type: 'Polygon',
                    coordinates: coordinates
                }
            };
        }
    }]);

    return PolygonEditorOverlay;
}(_MultiOverlay3.default);

exports.default = PolygonEditorOverlay;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Parameter2 = __webpack_require__(3);

var _Parameter3 = _interopRequireDefault(_Parameter2);

var _Color = __webpack_require__(5);

var _Color2 = _interopRequireDefault(_Color);

var _util = __webpack_require__(0);

var _PolygonConfig = __webpack_require__(45);

var _PolygonConfig2 = _interopRequireDefault(_PolygonConfig);

var _OnState = __webpack_require__(1);

var _OnState2 = _interopRequireDefault(_OnState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PolygonOverlay = function (_Parameter) {
    _inherits(PolygonOverlay, _Parameter);

    function PolygonOverlay(ops) {
        _classCallCheck(this, PolygonOverlay);

        var _this = _possibleConstructorReturn(this, (PolygonOverlay.__proto__ || Object.getPrototypeOf(PolygonOverlay)).call(this, _PolygonConfig2.default, ops));

        _this.patchSplitList();
        _this.state = null;
        return _this;
    }

    _createClass(PolygonOverlay, [{
        key: 'parameterInit',
        value: function parameterInit() {
            this.initLegend();
        }
    }, {
        key: 'initLegend',
        value: function initLegend() {
            this.compileSplitList(this.styleConfig.colors, this.getTransformData());
            this.patchSplitList();
            this.setlegend(this.legendConfig, this.styleConfig.splitList);
        }
    }, {
        key: 'setSelectedList',
        value: function setSelectedList(list) {
            (0, _util.clearPushArray)(this.selectItem, list);
        }
    }, {
        key: 'clearSelectedList',
        value: function clearSelectedList() {
            (0, _util.clearPushArray)(this.selectItem);
        }
    }, {
        key: 'getSelectedList',
        value: function getSelectedList() {
            return this.selectItem;
        }
    }, {
        key: 'translation',
        value: function translation(distanceX, distanceY) {
            for (var i = 0; i < this.workerData.length; i++) {
                var geometry = this.workerData[i].geometry;
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
        value: function setOptionStyle(ops) {
            this._setStyle(this.baseConfig, ops);
        }
    }, {
        key: 'setState',
        value: function setState(val) {
            this.state = val;
            this.eventConfig.onState(this.state);
        }
    }, {
        key: 'onOptionChange',
        value: function onOptionChange() {
            this.map && this.initLegend();
        }
    }, {
        key: 'onDataChange',
        value: function onDataChange() {
            this.map && this.initLegend();
        }
    }, {
        key: 'compileSplitList',
        value: function compileSplitList(colors, data) {

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

            if (split.length > 0) {
                split.push({
                    start: star,
                    end: null,
                    backgroundColor: colors[colorIndex]
                });
            }

            this.styleConfig.splitList = split;
        }
    }, {
        key: 'patchSplitList',
        value: function patchSplitList() {
            var normal = this.styleConfig.normal;
            if (normal.borderWidth != null && normal.borderColor == null) {
                normal.borderColor = new _Color2.default(normal.backgroundColor).getRgbaStyle();
            }
            var splitList = this.styleConfig.splitList;
            for (var i = 0; i < splitList.length; i++) {
                var condition = splitList[i];
                if ((condition.borderWidth != null || normal.borderColor != null) && condition.borderColor == null) {
                    condition.borderColor = new _Color2.default(condition.backgroundColor).getRgbaStyle();
                }
            }
        }
    }, {
        key: 'resize',
        value: function resize() {

            this.drawMap();
        }
    }, {
        key: 'getGeoCenter',
        value: function getGeoCenter(geo) {
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
        key: 'getMaxWidth',
        value: function getMaxWidth(geo) {
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
        key: 'findIndexSelectItem',
        value: function findIndexSelectItem(item) {
            var index = -1;
            if (item) {
                index = this.selectItem.findIndex(function (val) {
                    return val && val.name == item.name;
                });
            }
            return index;
        }
    }, {
        key: 'refresh',
        value: function refresh() {

            this.setState(_OnState2.default.drawBefore);
            this.clearCanvas();
            this.drawLine(this.getData());
            this.setState(_OnState2.default.drawAfter);
        }
    }, {
        key: 'drawMap',
        value: function drawMap() {
            var _this2 = this;

            this.setState(_OnState2.default.computeBefore);
            var parameter = {
                data: this.getTransformData()
            };

            this.postMessage('PolygonOverlay.calculatePixel', parameter, function (pixels, margin) {
                if (_this2.eventType == 'onmoving') {
                    return;
                }
                _this2.setState(_OnState2.default.conputeAfter);
                _this2.setWorkerData(pixels);
                _this2.translation(margin.left - _this2.margin.left, margin.top - _this2.margin.top);
                pixels = null, margin = null;
            });
        }
    }, {
        key: 'getTarget',
        value: function getTarget(x, y) {
            var data = this.getData();
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var geometry = item.geometry;
                var pixels = geometry.pixels;

                if (geometry.type == 'MultiPolygon') {
                    for (var k = 0; k < pixels.length; k++) {
                        if (this.containPolygon(x, y, pixels[k])) {
                            return {
                                index: i,
                                item: item
                            };
                        }
                    }
                } else {
                    if (this.containPolygon(x, y, pixels)) {
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
        key: 'drawData',
        value: function drawData(pixelItem) {
            this.ctx.moveTo(pixelItem[0][0], pixelItem[0][1]);
            for (var k = 1, len = pixelItem.length; k < len; k++) {
                this.ctx.lineTo(pixelItem[k][0], pixelItem[k][1]);
            }
        }
    }, {
        key: 'containPolygon',
        value: function containPolygon(x, y, pixels) {
            var outerRace = false;
            for (var j = 0; j < pixels.length; j++) {
                this.ctx.beginPath();
                var pixelItem = pixels[j];
                if (j == 0) {
                    this.drawData(pixelItem);
                    this.ctx.closePath();
                    if (this.ctx.isPointInPath(x * this.devicePixelRatio, y * this.devicePixelRatio)) {
                        outerRace = true;
                    } else {
                        return false;
                    }
                } else {

                    this.drawData(pixelItem);
                    this.ctx.closePath();

                    if (this.ctx.isPointInPath(x * this.devicePixelRatio, y * this.devicePixelRatio)) {
                        return false;
                    }
                }
            }
            return outerRace;
        }
    }, {
        key: 'drawPolygon',
        value: function drawPolygon(pixels, style) {
            for (var j = 0; j < pixels.length; j++) {
                this.ctx.save();
                this.ctx.beginPath();
                var pixelItem = pixels[j];
                if (j == 0) {
                    this.drawData(pixelItem);
                    this.ctx.closePath();
                    this.ctx.fill();
                } else {
                    this.drawData(pixelItem);
                    this.ctx.clip();
                    this.clearCanvas();
                }
                this.ctx.strokeStyle = style.borderColor;
                this.ctx.lineWidth = style.borderWidth;
                this.ctx.stroke();
                this.ctx.restore();
                pixelItem = null;
            }
        }
    }, {
        key: 'drawLine',
        value: function drawLine(data) {
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.miterLimit = 4;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var geometry = item.geometry;
                var pixels = geometry.pixels;
                var style = this.setDrawStyle(item);
                this.ctx.beginPath();
                this.ctx.shadowColor = style.shadowColor || 'transparent';
                this.ctx.shadowBlur = style.shadowBlur || 10;
                this.ctx.shadowOffsetX = 0;
                this.ctx.shadowOffsetY = 0;
                this.ctx.fillStyle = style.backgroundColor;
                if (geometry.type == 'MultiPolygon') {
                    for (var k = 0; k < pixels.length; k++) {
                        this.drawPolygon(pixels[k], style);
                    }
                } else {
                    this.drawPolygon(pixels, style);
                }

                if (this.styleConfig.normal.label.show) {
                    var labelPixels = geometry.labelPixels;
                    this.ctx.shadowBlur = 0;
                    this.ctx.lineWidth = style.label.lineWidth;
                    this.ctx.font = style.label.font;
                    this.ctx.fillStyle = style.label.color;
                    for (var j = 0; j < labelPixels.length; j++) {
                        var bestCell = labelPixels[j];
                        this.ctx.beginPath();
                        var width = this.ctx.measureText(item.name).width;
                        if (geometry.type == 'MultiPolygon') {
                            var maxPixels = [];
                            for (var _k2 = 0; _k2 < pixels.length; _k2++) {
                                var _item = pixels[_k2][0];
                                if (_item.length > maxPixels.length) {
                                    maxPixels = _item;
                                    bestCell = labelPixels[_k2];
                                }
                                _item = null;
                            }
                            if (bestCell && item.name && this.getMaxWidth(maxPixels) > width) {
                                this.ctx.fillText(item.name, bestCell.x - width / 2, bestCell.y);
                            }
                            maxPixels = null;
                        } else {
                            if (bestCell && item.name && this.getMaxWidth(pixels[j]) > width) {
                                this.ctx.fillText(item.name, bestCell.x - width / 2, bestCell.y);
                            }
                        }

                        bestCell = null, width = null;
                    }
                    labelPixels = null;
                }
                style = null, pixels = null, geometry = null, item = null;
            }
            this.ctx.closePath();
        }
    }]);

    return PolygonOverlay;
}(_Parameter3.default);

exports.default = PolygonOverlay;

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
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
                color: 'rgba(75,80,86,1)'
            }
        },
        mouseOver: {},
        selected: {}

    },
    data: [],
    event: {
        multiSelect: false,
        onMouseClick: function onMouseClick() {},
        onState: function onState() {}
    }
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    tooltip: {
        show: false,
        offsets: {
            top: 5,
            left: 12
        }
    },
    legend: {
        show: false
    },
    style: {
        gradient: {
            0.25: 'rgb(0,0,255)',
            0.55: 'rgb(0,255,0)',
            0.85: 'rgb(255,255,0)',
            1.0: 'rgb(255,0,0)'
        },
        normal: {
            radius: 15,
            minOpacity: 0,
            maxOpacity: 1,
            minValue: 0,
            maxValue: 0,
            minScope: 0,
            maxScope: 1 }
    },
    data: [],
    event: {
        multiSelect: false,
        onState: function onState() {}
    }
};

/***/ }),
/* 36 */
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
                color: 'rgba(75,80,86,1)'
            }
        },
        mouseOver: {},
        selected: {}

    },
    data: [],
    event: {
        multiSelect: false,
        onMouseClick: function onMouseClick() {},
        onState: function onState() {}
    }
};

/***/ }),
/* 37 */
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
    event: {
        multiSelect: false, onMouseClick: function onMouseClick() {},
        onState: function onState() {}
    }
};

/***/ }),
/* 38 */
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
        max: 18,
        min: 5
    }
};

/***/ }),
/* 39 */
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
/* 40 */
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
    data: []
};

/***/ }),
/* 41 */
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
    style: {
        normal: {
            borderColor: 'rgba(50, 50, 255, 0.8)',
            borderWidth: 0.05,
            lineCurive: null,
            deltaAngle: -0.2
        },
        splitList: []
    },
    data: [],
    event: {
        onState: function onState() {}
    }
};

/***/ }),
/* 42 */
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
            event: {
                onMouseClick: function onMouseClick() {}
            }
        },
        line: {
            style: {
                normal: {
                    borderColor: 'rgba(200, 200, 50, 1)',
                    borderWidth: 1,

                    lineCurive: 'curve'
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    style: {
        normal: {
            fps: 25,
            color: '#FAFA32',
            radius: 20,
            speed: 0.15 }
    },
    data: []
};

/***/ }),
/* 44 */
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
        show: false,
        toFixed: 2 },
    draw: {},
    style: {
        normal: {
            borderWidth: 0.1,
            backgroundColor: 'rgba(200, 200, 200, 0.5)',
            mergeCount: 1.5,
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
    event: {
        multiSelect: false, onMouseClick: function onMouseClick() {},
        onState: function onState() {}
    }
};

/***/ }),
/* 45 */
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
        show: false,
        toFixed: 2 },

    style: {
        normal: {
            borderWidth: 0.1,
            backgroundColor: 'rgba(200, 200, 200, 0.5)',
            mergeCount: 1.5,
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
    event: {
        multiSelect: false, onMouseClick: function onMouseClick() {},
        onState: function onState() {}
    }
};

/***/ }),
/* 46 */
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
            top: 0,
            left: 0
        },
        formatter: ''
    },
    style: {
        strokeColor: 'rgba(24,144,255,1)',
        fillColor: 'rgba(24,144,255,0.4)',
        strokeWeight: 2,
        strokeOpacity: 1,
        enableEditing: true
    },
    data: []
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var GeoUtils;
(function () {
    var a = 6370996.81;
    var b = GeoUtils = function GeoUtils() {};
    b.isPointInRect = function (f, g) {
        if (!(f instanceof BMap.Point) || !(g instanceof BMap.Bounds)) {
            return false;
        }
        var e = g.getSouthWest();
        var h = g.getNorthEast();
        return f.lng >= e.lng && f.lng <= h.lng && f.lat >= e.lat && f.lat <= h.lat;
    };
    b.isPointInCircle = function (e, h) {
        if (!(e instanceof BMap.Point) || !(h instanceof BMap.Circle)) {
            return false;
        }
        var i = h.getCenter();
        var g = h.getRadius();
        var f = b.getDistance(e, i);
        if (f <= g) {
            return true;
        } else {
            return false;
        }
    };
    b.isPointOnPolyline = function (f, h) {
        if (!(f instanceof BMap.Point) || !(h instanceof BMap.Polyline)) {
            return false;
        }
        var e = h.getBounds();
        if (!this.isPointInRect(f, e)) {
            return false;
        }
        var m = h.getPath();
        for (var k = 0; k < m.length - 1; k++) {
            var l = m[k];
            var j = m[k + 1];
            if (f.lng >= Math.min(l.lng, j.lng) && f.lng <= Math.max(l.lng, j.lng) && f.lat >= Math.min(l.lat, j.lat) && f.lat <= Math.max(l.lat, j.lat)) {
                var g = (l.lng - f.lng) * (j.lat - f.lat) - (j.lng - f.lng) * (l.lat - f.lat);
                if (g < 2e-10 && g > -2e-10) {
                    return true;
                }
            }
        }
        return false;
    };
    b.isPointInPolygon = function (o, l) {
        if (!(o instanceof BMap.Point) || !(l instanceof BMap.Polygon)) {
            return false;
        }
        var k = l.getBounds();
        if (!this.isPointInRect(o, k)) {
            return false;
        }
        var t = l.getPath();
        var h = t.length;
        var n = true;
        var j = 0;
        var g = 2e-10;
        var s, q;
        var e = o;
        s = t[0];
        for (var f = 1; f <= h; ++f) {
            if (e.equals(s)) {
                return n;
            }
            q = t[f % h];
            if (e.lat < Math.min(s.lat, q.lat) || e.lat > Math.max(s.lat, q.lat)) {
                s = q;
                continue;
            }
            if (e.lat > Math.min(s.lat, q.lat) && e.lat < Math.max(s.lat, q.lat)) {
                if (e.lng <= Math.max(s.lng, q.lng)) {
                    if (s.lat == q.lat && e.lng >= Math.min(s.lng, q.lng)) {
                        return n;
                    }
                    if (s.lng == q.lng) {
                        if (s.lng == e.lng) {
                            return n;
                        } else {
                            ++j;
                        }
                    } else {
                        var r = (e.lat - s.lat) * (q.lng - s.lng) / (q.lat - s.lat) + s.lng;
                        if (Math.abs(e.lng - r) < g) {
                            return n;
                        }
                        if (e.lng < r) {
                            ++j;
                        }
                    }
                }
            } else {
                if (e.lat == q.lat && e.lng <= q.lng) {
                    var m = t[(f + 1) % h];
                    if (e.lat >= Math.min(s.lat, m.lat) && e.lat <= Math.max(s.lat, m.lat)) {
                        ++j;
                    } else {
                        j += 2;
                    }
                }
            }
            s = q;
        }
        if (j % 2 == 0) {
            return false;
        } else {
            return true;
        }
    };
    b.degreeToRad = function (e) {
        return Math.PI * e / 180;
    };
    b.radToDegree = function (e) {
        return 180 * e / Math.PI;
    };

    function d(g, f, e) {
        if (f != null) {
            g = Math.max(g, f);
        }
        if (e != null) {
            g = Math.min(g, e);
        }
        return g;
    }

    function c(g, f, e) {
        while (g > e) {
            g -= e - f;
        }
        while (g < f) {
            g += e - f;
        }
        return g;
    }
    b.getDistance = function (j, h) {
        if (!(j instanceof BMap.Point) || !(h instanceof BMap.Point)) {
            return 0;
        }
        j.lng = c(j.lng, -180, 180);
        j.lat = d(j.lat, -74, 74);
        h.lng = c(h.lng, -180, 180);
        h.lat = d(h.lat, -74, 74);
        var f, e, i, g;
        f = b.degreeToRad(j.lng);
        i = b.degreeToRad(j.lat);
        e = b.degreeToRad(h.lng);
        g = b.degreeToRad(h.lat);
        return a * Math.acos(Math.sin(i) * Math.sin(g) + Math.cos(i) * Math.cos(g) * Math.cos(e - f));
    };
    b.getPolylineDistance = function (f) {
        if (f instanceof BMap.Polyline || f instanceof Array) {
            var l;
            if (f instanceof BMap.Polyline) {
                l = f.getPath();
            } else {
                l = f;
            }
            if (l.length < 2) {
                return 0;
            }
            var j = 0;
            for (var h = 0; h < l.length - 1; h++) {
                var k = l[h];
                var g = l[h + 1];
                var e = b.getDistance(k, g);
                j += e;
            }
            return j;
        } else {
            return 0;
        }
    };
    b.getPolygonArea = function (t) {
        if (!(t instanceof BMap.Polygon) && !(t instanceof Array)) {
            return 0;
        }
        var R;
        if (t instanceof BMap.Polygon) {
            R = t.getPath();
        } else {
            R = t;
        }
        if (R.length < 3) {
            return 0;
        }
        var w = 0;
        var D = 0;
        var C = 0;
        var L = 0;
        var J = 0;
        var F = 0;
        var E = 0;
        var S = 0;
        var H = 0;
        var p = 0;
        var T = 0;
        var I = 0;
        var q = 0;
        var e = 0;
        var M = 0;
        var v = 0;
        var K = 0;
        var N = 0;
        var s = 0;
        var O = 0;
        var l = 0;
        var g = 0;
        var z = 0;
        var Q = 0;
        var G = 0;
        var j = 0;
        var A = 0;
        var o = 0;
        var m = 0;
        var y = 0;
        var x = 0;
        var h = 0;
        var k = 0;
        var f = 0;
        var n = a;
        var B = R.length;
        for (var P = 0; P < B; P++) {
            if (P == 0) {
                D = R[B - 1].lng * Math.PI / 180;
                C = R[B - 1].lat * Math.PI / 180;
                L = R[0].lng * Math.PI / 180;
                J = R[0].lat * Math.PI / 180;
                F = R[1].lng * Math.PI / 180;
                E = R[1].lat * Math.PI / 180;
            } else {
                if (P == B - 1) {
                    D = R[B - 2].lng * Math.PI / 180;
                    C = R[B - 2].lat * Math.PI / 180;
                    L = R[B - 1].lng * Math.PI / 180;
                    J = R[B - 1].lat * Math.PI / 180;
                    F = R[0].lng * Math.PI / 180;
                    E = R[0].lat * Math.PI / 180;
                } else {
                    D = R[P - 1].lng * Math.PI / 180;
                    C = R[P - 1].lat * Math.PI / 180;
                    L = R[P].lng * Math.PI / 180;
                    J = R[P].lat * Math.PI / 180;
                    F = R[P + 1].lng * Math.PI / 180;
                    E = R[P + 1].lat * Math.PI / 180;
                }
            }
            S = Math.cos(J) * Math.cos(L);
            H = Math.cos(J) * Math.sin(L);
            p = Math.sin(J);
            T = Math.cos(C) * Math.cos(D);
            I = Math.cos(C) * Math.sin(D);
            q = Math.sin(C);
            e = Math.cos(E) * Math.cos(F);
            M = Math.cos(E) * Math.sin(F);
            v = Math.sin(E);
            K = (S * S + H * H + p * p) / (S * T + H * I + p * q);
            N = (S * S + H * H + p * p) / (S * e + H * M + p * v);
            s = K * T - S;
            O = K * I - H;
            l = K * q - p;
            g = N * e - S;
            z = N * M - H;
            Q = N * v - p;
            m = (g * s + z * O + Q * l) / (Math.sqrt(g * g + z * z + Q * Q) * Math.sqrt(s * s + O * O + l * l));
            m = Math.acos(m);
            G = z * l - Q * O;
            j = 0 - (g * l - Q * s);
            A = g * O - z * s;
            if (S != 0) {
                o = G / S;
            } else {
                if (H != 0) {
                    o = j / H;
                } else {
                    o = A / p;
                }
            }
            if (o > 0) {
                y += m;
                k++;
            } else {
                x += m;
                h++;
            }
        }
        var u, r;
        u = y + (2 * Math.PI * h - x);
        r = 2 * Math.PI * k - y + x;
        if (y > x) {
            if (u - (B - 2) * Math.PI < 1) {
                f = u;
            } else {
                f = r;
            }
        } else {
            if (r - (B - 2) * Math.PI < 1) {
                f = r;
            } else {
                f = u;
            }
        }
        w = (f - (B - 2) * Math.PI) * n * n;
        return w;
    };
})();
exports.default = GeoUtils;

/***/ }),
/* 48 */,
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.workerMrg = exports.LineStringAnimationOverlay = exports.PointAnimationOverlay = exports.MoveLineOverlay = exports.ImgOverlay = exports.HoneycombOverlay = exports.LineStringOverlay = exports.HeatOverlay = exports.PolygonEditorOverlay = exports.PolygonOverlay = exports.GriddingOverlay = exports.PointOverlay = exports.Map = exports.utils = exports.version = undefined;

var _PointOverlay = __webpack_require__(12);

var _PointOverlay2 = _interopRequireDefault(_PointOverlay);

var _GriddingOverlay = __webpack_require__(16);

var _GriddingOverlay2 = _interopRequireDefault(_GriddingOverlay);

var _PolygonOverlay = __webpack_require__(23);

var _PolygonOverlay2 = _interopRequireDefault(_PolygonOverlay);

var _HeatOverlay = __webpack_require__(17);

var _HeatOverlay2 = _interopRequireDefault(_HeatOverlay);

var _LineStringOverlay = __webpack_require__(11);

var _LineStringOverlay2 = _interopRequireDefault(_LineStringOverlay);

var _HoneycombOverlay = __webpack_require__(18);

var _HoneycombOverlay2 = _interopRequireDefault(_HoneycombOverlay);

var _ImgOverlay = __webpack_require__(19);

var _ImgOverlay2 = _interopRequireDefault(_ImgOverlay);

var _MoveLineOverlay = __webpack_require__(20);

var _MoveLineOverlay2 = _interopRequireDefault(_MoveLineOverlay);

var _PointAnimationOverlay = __webpack_require__(21);

var _PointAnimationOverlay2 = _interopRequireDefault(_PointAnimationOverlay);

var _LineStringAnimationOverlay = __webpack_require__(10);

var _LineStringAnimationOverlay2 = _interopRequireDefault(_LineStringAnimationOverlay);

var _PolygonEditorOverlay = __webpack_require__(22);

var _PolygonEditorOverlay2 = _interopRequireDefault(_PolygonEditorOverlay);

var _index = __webpack_require__(15);

var _index2 = _interopRequireDefault(_index);

var _util = __webpack_require__(0);

var utils = _interopRequireWildcard(_util);

var _workerMrg = __webpack_require__(9);

var _workerMrg2 = _interopRequireDefault(_workerMrg);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = "2.0.0";
console.log('inMap v' + version);

var inMap = {
    version: version,
    utils: utils,
    Map: _index2.default,
    PointOverlay: _PointOverlay2.default,
    GriddingOverlay: _GriddingOverlay2.default,
    PolygonOverlay: _PolygonOverlay2.default,
    PolygonEditorOverlay: _PolygonEditorOverlay2.default,
    HeatOverlay: _HeatOverlay2.default,
    LineStringOverlay: _LineStringOverlay2.default,
    HoneycombOverlay: _HoneycombOverlay2.default,
    ImgOverlay: _ImgOverlay2.default,
    MoveLineOverlay: _MoveLineOverlay2.default,
    PointAnimationOverlay: _PointAnimationOverlay2.default,
    LineStringAnimationOverlay: _LineStringAnimationOverlay2.default,
    workerMrg: _workerMrg2.default
};
exports.version = version;
exports.utils = utils;
exports.Map = _index2.default;
exports.PointOverlay = _PointOverlay2.default;
exports.GriddingOverlay = _GriddingOverlay2.default;
exports.PolygonOverlay = _PolygonOverlay2.default;
exports.PolygonEditorOverlay = _PolygonEditorOverlay2.default;
exports.HeatOverlay = _HeatOverlay2.default;
exports.LineStringOverlay = _LineStringOverlay2.default;
exports.HoneycombOverlay = _HoneycombOverlay2.default;
exports.ImgOverlay = _ImgOverlay2.default;
exports.MoveLineOverlay = _MoveLineOverlay2.default;
exports.PointAnimationOverlay = _PointAnimationOverlay2.default;
exports.LineStringAnimationOverlay = _LineStringAnimationOverlay2.default;
exports.workerMrg = _workerMrg2.default;
exports.default = inMap;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Color = __webpack_require__(5);

var _Color2 = _interopRequireDefault(_Color);

var _Legend = __webpack_require__(39);

var _Legend2 = _interopRequireDefault(_Legend);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Legend = function () {
    function Legend(toolDom, opts) {
        _classCallCheck(this, Legend);

        this.opts = opts || _Legend2.default;
        this.dom = this.crateDom(toolDom);
        this.hide();
    }

    _createClass(Legend, [{
        key: 'crateDom',
        value: function crateDom(toolDom) {
            var div = document.createElement('div');
            div.classList.add('inmap-legend');
            toolDom.appendChild(div);
            return div;
        }
    }, {
        key: 'show',
        value: function show() {
            this.dom.style.display = 'inline-block';
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.dom.style.display = 'none';
        }
    }, {
        key: 'toFixed',
        value: function toFixed(num) {
            return isNaN(num) ? num : parseFloat(num).toFixed(this.opts.toFixed);
        }
    }, {
        key: 'setTitle',
        value: function setTitle(title) {
            this.opts.title = title;
            this.render();
        }
    }, {
        key: 'setOption',
        value: function setOption(opts) {
            this.opts = (0, _util.merge)(_Legend2.default, this.opts, opts);
            this.opts.list = this.opts.list || [];
            this.render();
        }
    }, {
        key: 'setItems',
        value: function setItems(list) {
            this.opts.list = list;
            this.render();
        }
    }, {
        key: '_verify',
        value: function _verify() {
            var _opts = this.opts,
                show = _opts.show,
                title = _opts.title,
                list = _opts.list;

            if (!(0, _util.isBoolean)(show)) {
                throw new TypeError('inMap: legend options show must be a Boolean');
            }
            if (!(0, _util.isEmpty)(title) && !(0, _util.isString)(title)) {
                throw new TypeError('inMap: legend options title must be a String');
            }
            if (!(0, _util.isArray)(list)) {
                throw new TypeError('inMap: legend options list must be a Array');
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            this._verify();
            var _opts2 = this.opts,
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
                backgroundColor = legendBg.getRgbaStyle(opacity);
                if (val.text) {
                    text = val.text;
                } else if (_this.opts.formatter) {
                    text = _this.opts.formatter(_this.toFixed(val.start), _this.toFixed(val.end), index, val);
                } else {
                    text = _this.toFixed(val.start) + ' ~ ' + (val.end == null ? '<span class="inmap-infinity"></span>' : _this.toFixed(val.end));
                }
                var td = isShow ? ' <td style="background:' + backgroundColor + '; width:17px;"></td>' : '';
                str += '\n                <tr>\n                   ' + td + '\n                    <td class="inmap-legend-text">\n                       ' + text + '\n                    </td>\n                </tr>\n                ';
            });
            str += '</table>';
            if (list.length <= 0) {
                this.hide();
            }
            this.dom.innerHTML = str;
        }
    }, {
        key: 'dispose',
        value: function dispose(parentDom) {
            parentDom.removeChild(this.dom);
            this.opts = null;
            this.dom = null;
        }
    }]);

    return Legend;
}();

exports.default = Legend;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToolTip = function () {
    function ToolTip(toolDom) {
        _classCallCheck(this, ToolTip);

        this.dom = this.create(toolDom);
        this.tooltipTemplate = null;
        this.opts = {};
        this.hide();
    }

    _createClass(ToolTip, [{
        key: 'create',
        value: function create(toolDom) {
            var dom = document.createElement('div');
            dom.classList.add('inmap-tooltip');
            toolDom.appendChild(dom);
            return dom;
        }
    }, {
        key: 'compileTooltipTemplate',
        value: function compileTooltipTemplate(formatter) {
            formatter = '`' + formatter.replace(/\{/g, '${overItem.') + '`';
            this.tooltipTemplate = new Function('overItem', 'return ' + formatter);
        }
    }, {
        key: 'show',
        value: function show(x, y) {
            var _opts$offsets = this.opts.offsets,
                left = _opts$offsets.left,
                top = _opts$offsets.top;

            this.dom.style.left = x + left + 'px';
            this.dom.style.top = y + top + 'px';
            this.dom.style.display = 'block';
        }
    }, {
        key: 'showCenterText',
        value: function showCenterText(text, x, y) {
            this.dom.innerHTML = text;
            this.dom.style.display = 'block';
            this.dom.style.visibility = 'hidden';
            var width = this.dom.offsetWidth;
            this.dom.style.left = x - width / 2 + 'px';
            this.dom.style.top = y + 'px';
            this.dom.style.visibility = 'visible';
        }
    }, {
        key: 'showText',
        value: function showText(text, x, y) {
            this.dom.innerHTML = text;
            this.dom.style.left = x + 'px';
            this.dom.style.top = y + 'px';
            this.dom.style.display = 'block';
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.dom.style.display = 'none';
        }
    }, {
        key: 'setOption',
        value: function setOption(opts) {
            var result = (0, _util.merge)(this.opts, opts);
            var formatter = result.formatter,
                customClass = result.customClass;


            if ((0, _util.isString)(formatter)) {
                this.compileTooltipTemplate(result.formatter);
            }

            if (this.opts.customClass) {
                this.dom.classList.remove(this.opts.customClass);
            }

            this.dom.classList.add(customClass);
            this.opts = result;
        }
    }, {
        key: 'render',
        value: function render(event, overItem) {
            if (!this.opts.show) return;
            if (overItem) {
                var formatter = this.opts.formatter;
                if ((0, _util.isFunction)(formatter)) {
                    this.dom.innerHTML = formatter(overItem);
                } else if ((0, _util.isString)(formatter)) {
                    this.dom.innerHTML = this.tooltipTemplate(overItem);
                }
                this.show(event.offsetX, event.offsetY);
            } else {
                this.hide();
            }
        }
    }]);

    return ToolTip;
}();

exports.default = ToolTip;

/***/ }),
/* 52 */
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

        this.map = map;
        this.mapDom = mapDom;
        this.zoom = opts;
        this.createDom();
    }

    _createClass(MapZoom, [{
        key: 'createDom',
        value: function createDom() {
            var div = document.createElement('div');
            div.classList.add('inmap-scale-group');
            div.innerHTML = '<a>+</a > <a>-</a >';
            this.mapDom.appendChild(div);
            this.event(div);
        }
    }, {
        key: 'setButtonState',
        value: function setButtonState() {
            var doms = this.mapDom.querySelectorAll('.inmap-scale-group a');
            var zoom = this.map.getZoom();
            if (zoom >= this.zoom.max) {
                doms[0].setAttribute('disabled', 'true');
            } else {
                doms[0].removeAttribute('disabled');
            }
            if (zoom <= this.zoom.min) {
                doms[1].setAttribute('disabled', 'true');
            } else {
                doms[1].removeAttribute('disabled');
            }
        }
    }, {
        key: 'event',
        value: function event(div) {
            var _this = this;

            var doms = div.querySelectorAll('a');
            doms[0].addEventListener('click', function () {
                var zoom = _this.map.getZoom();
                if (zoom < _this.zoom.max) {
                    _this.map.zoomIn();
                }
            });
            doms[1].addEventListener('click', function () {
                var zoom = _this.map.getZoom();
                if (zoom > _this.zoom.min) {
                    _this.map.zoomOut();
                }
            });
        }
    }]);

    return MapZoom;
}();

exports.default = MapZoom;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _workerMrg = __webpack_require__(9);

var _workerMrg2 = _interopRequireDefault(_workerMrg);

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

BaseClass.prototype.getHashCode = function () {
    if (!this.hashCode) {
        inmap_instances[this.hashCode = BaseClass.guid()] = this;
    }
    return this.hashCode;
};

BaseClass.prototype.decontrol = function () {
    inmap_instances[this.hashCode] = null;
};

var baidu = window.BMap || {
    Overlay: {}
};
BaseClass.inherits(baidu.Overlay, 'BaseClass');

BaseClass.prototype.postMessage = function (workerClassPath, data, callback) {
    var map = this.map;
    var center = map.getCenter();
    var size = map.getSize();
    var msgId = this.setMsgId();
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
            'margin': this.margin
        }
    };
    _workerMrg2.default.postMessage({
        request: request
    }, callback);
};
BaseClass.prototype.getMsgId = function () {
    return 'msgId' + _count.toString(36);
};
BaseClass.prototype.setMsgId = function () {
    _count++;
    return 'msgId' + _count.toString(36);
};
BaseClass.prototype.removeWorkerMessage = function () {
    _workerMrg2.default.removeMessage(this.hashCode);
};

exports.default = BaseClass;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

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


            this.splitArray = (0, _util.chunk)(data, splitCount);

            var loop = function loop() {
                if (!_this.usable) {
                    _this.clear();
                    return;
                }
                var item = _this.splitArray[_this.index];
                item && callback(ctx, item);

                _this.index++;

                if (_this.index >= _this.splitArray.length - 1) {
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
/* 55 */,
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(57)();
// imports


// module
exports.push([module.i, ".inmap-container {\n  opacity: 1;\n  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;\n}\n.inmap-container,\n.inmap-container *:after,\n.inmap-container *:before {\n  display: -webkit-box;\n}\n.inmap-scale-group {\n  position: absolute;\n  right: 10px;\n  bottom: 35px;\n  z-index: 999999;\n  opacity: 1;\n}\n.inmap-scale-group > a {\n  display: block;\n  width: 24px;\n  height: 24px;\n  font-size: 17px;\n  line-height: 22px;\n  text-align: center;\n  background: #fff;\n  margin-top: 5px;\n  color: #666;\n  cursor: pointer;\n  text-decoration: none;\n}\n.inmap-scale-group > a[disabled] {\n  color: rgba(187, 190, 196, 0.6);\n  background-color: #f7f7f7;\n  border-color: #dddee1;\n}\n.inmap-tooltip {\n  position: absolute;\n  opacity: 1;\n  display: none;\n  pointer-events: none;\n  border-style: solid;\n  white-space: nowrap;\n  z-index: 9999999;\n  transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1), top 0.4s cubic-bezier(0.23, 1, 0.32, 1);\n  border-radius: 4px;\n  font-style: normal;\n  font-variant: normal;\n  font-weight: normal;\n  font-stretch: normal;\n  font-size: 14px;\n  font-family: sans-serif;\n  line-height: 21px;\n  padding: 5px;\n  left: 323px;\n  top: 451px;\n}\n.inmap-tooltip-black {\n  border-width: 0px;\n  border-color: #333333;\n  background-color: rgba(50, 50, 50, 0.7);\n  color: #ffffff;\n}\n.inmap-legend-container {\n  position: absolute;\n  left: 35px;\n  bottom: 35px;\n  z-index: 9999;\n}\n.inmap-legend {\n  list-style: none;\n  opacity: 1;\n  height: auto;\n  font-size: 12px;\n  text-align: center;\n  border: 10px solid rgba(255, 255, 255, 0.7);\n  box-shadow: rgba(8, 16, 34, 0.3) 2px 0px 7px;\n  border-radius: 5px;\n  margin-right: 3px;\n}\n.inmap-legend .inmap-legend-title {\n  background-color: rgba(255, 255, 255, 0.7);\n  padding-bottom: 3px;\n}\n.inmap-legend > table {\n  width: 100%;\n}\n.inmap-legend table,\n.inmap-legend table tbody,\n.inmap-legend table tr,\n.inmap-legend table tr td {\n  padding: 0;\n  border: 0;\n  margin: 0;\n}\n.inmap-legend .inmap-chunk {\n  display: inline-block;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  width: 14px;\n}\n.inmap-legend .inmap-legend-text {\n  background-color: rgba(255, 255, 255, 0.7);\n  padding-left: 5px;\n  text-align: left;\n  font-size: 12px;\n}\n.inmap-legend .inmap-infinity {\n  top: 4px;\n  left: 7px;\n  position: relative;\n}\n.inmap-legend .inmap-infinity:before,\n.inmap-legend .inmap-infinity:after {\n  content: \"\";\n  box-sizing: border-box;\n  width: 6px;\n  height: 6px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  border: 1px solid #495060;\n  -moz-border-radius: 50px 50px 0;\n  border-radius: 50px 50px 0 50px;\n  -webkit-transform: rotate(128deg);\n  -moz-transform: rotate(128deg);\n  -ms-transform: rotate(128deg);\n  -o-transform: rotate(128deg);\n  transform: rotate(128deg);\n}\n.inmap-legend .inmap-infinity:after {\n  left: auto;\n  right: 0;\n  -moz-border-radius: 50px 50px 50px 0;\n  border-radius: 50px 50px 50px 0;\n  -webkit-transform: rotate(-128deg);\n  -moz-transform: rotate(-128deg);\n  -ms-transform: rotate(-128deg);\n  -o-transform: rotate(-128deg);\n  transform: rotate(-128deg);\n}\n", ""]);

// exports


/***/ }),
/* 57 */
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
/* 58 */
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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(56);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(58)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./map.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./map.less");
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