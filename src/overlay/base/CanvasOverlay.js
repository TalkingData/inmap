import BaseClass from './BaseClass';
import Legend from '../../map/Legend';
import Throttle from '../../common/Throttle';
import EventManage from './EventManage';
import {
    setDevicePixelRatio,
    isString,
    isArray,
    detection,
    isFunction
} from '../../common/Util';
import {
    WhiteLover,
    Blueness
} from '../../config/MapStyleConfig';
import Toolbar from '../../map/Toolbar';
import ToolTip from '../../map/ToolTip';
let zIndex = 0;
const isMobile = detection();

export default class CanvasOverlay extends BaseClass {
    constructor(opts) {
        super();
        this._ctx = null; //canvas对象
        this._eventType = 'moveend';
        this._map = null;
        this._container = null;
        this._throttle = new Throttle();
        this._tOnResize = this._tOnResize.bind(this);
        this._tOnMoveEnd = this._tOnMoveEnd.bind(this);
        this._tOnZoomStart = this._tOnZoomStart.bind(this);
        this._tOnZoomEnd = this._tOnZoomEnd.bind(this);
        this._tOnMoving = this._tOnMoving.bind(this);
        this._tMousemove = this._tMousemove.bind(this);
        this._tMouseout = this._tMouseout.bind(this);
        this._tMouseClick = this._tMouseClick.bind(this);
        this._resize = this._toDraw.bind(this);
        this._throttle.on('throttle', this._resize);
        this._devicePixelRatio = window.devicePixelRatio;
        this._repaintEnd = opts && opts.repaintEnd; //重绘回调
        this._animationFlag = true;
        this._isDispose = false; //是否已销毁
        this.emitEvent = false;

        this._subscriptions = {
            onMouseClick: [],
            onMouseOver: [],
            onMouseLeave: [],
            onState: [],
            onInit: [],
            isInit: true,
            preEmitName: null
        };


        this._margin = {
            left: 0,
            top: 0
        };
        this._zIndex = !opts || opts.zIndex == null ? zIndex += 10 : opts.zIndex;

    }
    initialize(map) {
        this._map = map;
        this._container = document.createElement('canvas');
        this._ctx = this._container.getContext('2d');
        this._margin.left = -this._map.offsetX;
        this._margin.top = -this._map.offsetY;
        this._container.style.cssText = `position:absolute;left:${this._margin.left}px;top:${this._margin.top}px;z-index:${this._zIndex};`;
        map.getPanes().mapPane.appendChild(this._container);
        this._setCanvasSize();
        this._tBindEvent();
        if (!map._inmapToolBar) {
            map._inmapToolBar = new Toolbar(map.getContainer());
        }

        this.legend = new Legend(map._inmapToolBar.legendContainer);
        this.toolTip = new ToolTip(map._inmapToolBar.container);

        this._canvasInit();
        return this._container;

    }
    _tBindEvent() {
        const map = this._map;

        map.addEventListener('resize', this._tOnResize);
        map.addEventListener('moveend', this._tOnMoveEnd);
        map.addEventListener('moving', this._tOnMoving);
        map.addEventListener('zoomstart', this._tOnZoomStart);
        map.addEventListener('zoomend', this._tOnZoomEnd);

        if (this.emitEvent) {
            EventManage.register(map, this);
        } else {
            map.addEventListener('mousemove', this._tMousemove);
            if (isMobile) {
                map.addEventListener('touchstart', this._tMouseClick);
            } else {
                map.addEventListener('click', this._tMouseClick);
            }
        }


    }

    _tMapStyle(skin) {
        let styleJson = null;
        if (isString(skin)) {
            styleJson = skin == 'Blueness' ? Blueness : WhiteLover;
        } else if (isArray(skin)) {
            styleJson = skin;
        }
        skin && this._map && this._map.setMapStyle({
            styleJson: styleJson
        });
    }
    _tMouseout() {
        this.toolTip && this.toolTip.hide();
    }
    _tOnResize(event) {
        this._setCanvasSize();
        this._eventType = event.type;
        this._tDraw(this, event);
    }
    _tOnMoveEnd(event) {
        this._animationFlag = true;
        this._eventType = event.type;
    }
    _tOnZoomStart() {
        this._animationFlag = false;
        this._clearCanvas();
    }
    _tOnZoomEnd(e) {
        this._animationFlag = true;
        this._eventType = e.type;
    }
    _tOnMoving(e) {
        this._animationFlag = false;
        this._eventType = e.type;
    }
    _tMousemove() {
        /** 抽象方法 子类去实现 */

    }
    _canvasInit() {
        /** 抽象方法 子类去实现*/
    }
    draw() {
        let eventType = this._eventType;
        if (eventType == 'onmoving') {
            this._canvasResize();
        } else {
            this._throttle.throttleEvent();
        }

    }
    _tMouseClick() {
        /** 抽象方法 子类去实现*/
    }
    _tDraw(me, event) {
        this._eventType = event.type;
        me.draw(event);
        this._repaintEnd && this._repaintEnd(this); //重绘回调
    }
    _toDraw() {
        /** 抽象方法 子类去实现*/
    }
    /**
     * 添加事件
     * @param {} name 
     * @param {*} callback 
     */
    on(name, callback) {

        if (name.length > 2 && name.indexOf('on') === -1) {
            name = 'on' + name[0].toUpperCase() + name.substr(1);
        }

        const subscriber = this._subscriptions[name];
        if (!subscriber) return;
        const index = subscriber.findIndex((item) => {
            return item === callback;
        });

        if (index > -1) {
            subscriber.splice(index, 1);
        }
        subscriber.push(callback);

    }
    /**
    * 移除事件
    * @param {} name 
    * @param {*} callback 
    */
    off(name, callback) {
        if (name.length > 2 && name.indexOf('on') === -1) {
            name = 'on' + name[0].toUpperCase() + name.substr(1);
        }

        const subscriber = this._subscriptions[name];
        if (!subscriber) return;
        for (let index = 0; index < subscriber.length; index++) {
            const element = subscriber[index];
            if (element === callback) {
                subscriber.splice(index, 1);
                index--;
            }
        }
    }
    _emitInit(){
        if (this._subscriptions.isInit) {
            this._subscriptions.isInit = false;
            this._emit('onInit', this);
        }
    }
    _setState(val) {
        this._state = val;
        this._emit('onState', this._state, this);
    }
    _emit(name, ...args) {

        if (name.length > 2 && name.indexOf('on') === -1) {

            name = 'on' + name[0].toUpperCase() + name.substr(1);
        }
        if (name != 'onMouseClick' && name !== 'onState' && this._subscriptions.preEmitName == name) {
            return;
        }
        this._subscriptions.preEmitName = name;
        const subscriber = this._subscriptions[name];
        subscriber && subscriber.forEach(callBack => {
            callBack(...args);
        });

    }

    _canvasResize() {
        let map = this._map;
        let container = this._container;
        let point = map.getCenter();
        let size = map.getSize();
        let pixel = map.pointToOverlayPixel(point);
        let left = parseInt(pixel.x - size.width / 2, 10);
        let top = parseInt(pixel.y - size.height / 2, 10);
        let containerDomStyle = container.style;
        this._translationIf(this._margin.left, this._margin.top, left, top);

        this._margin.left = left;
        this._margin.top = top;
        containerDomStyle.left = left + 'px';
        containerDomStyle.top = top + 'px';

        containerDomStyle = null;
        container = null;
        map = null;

    }
    _translationIf(oldLeft, oldTop, newLeft, newTop) {
        if (oldLeft != newLeft || oldTop != newTop) {
            this._translation(oldLeft - newLeft, oldTop - newTop);
        }
    }


    /*eslint-disable */

    _translation(distanceX, distanceY) {
        /**       
         * 抽象方法，子类去实现
         */
    }

    /*eslint-enable */

    _clearCanvas() {
        if (!this._map) return;

        let size = this._map.getSize();
        this._getContext().clearRect(0, 0, size.width, size.height); //调整画布
    }

    _setCanvasSize() {
        let size = this._map.getSize();
        this._container.width = size.width;
        this._container.height = size.height;
        setDevicePixelRatio(this._ctx);
    }
    _getContext() {
        return this._ctx;
    }
    /**
     * 设置overlay z-index
     */
    setZIndex(zIndex) {
        this._zIndex = zIndex;
        if (this._container) {
            this._container.style.zIndex = this._zIndex;
        }
    }

    _TClear() {

    }
    _TDispose() {

    }
    /**
     * 对象销毁
     */
    dispose() {
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
        let me = this;
        for (let key in me) {
            if (!isFunction(me[key])) {
                me[key] = null;
            }
        }
        me._isDispose = true;
        me = null;
    }
}