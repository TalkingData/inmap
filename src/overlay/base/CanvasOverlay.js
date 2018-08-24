import BaseClass from './BaseClass';
import Legend from '../../map/Legend';
import Throttle from '../../common/Throttle';
import {
    setDevicePixelRatio,
    isString,
    isArray,
    isFunction
} from '../../common/util';
import {
    WhiteLover,
    Blueness
} from '../../config/MapStyleConfig';
import Toolbar from '../../map/Toolbar';
let zIndex = 1;

export default class CanvasOverlay extends BaseClass {
    constructor(opts) {
        super();
        this._ctx = null; //canvas对象
        this._eventType = 'moveend';
        this._map = null;
        this._container = null;
        this._throttle = new Throttle();
        this._tOnResize = this._tOnResize.bind(this);
        this._tOnMoveend = this._tOnMoveend.bind(this);
        this._tOnZoomstart = this._tOnZoomstart.bind(this);
        this._tOnZoomend = this._tOnZoomend.bind(this);
        this._tOnMoving = this._tOnMoving.bind(this);
        this._tMousemove = this._tMousemove.bind(this);
        this._tMouseClick = this._tMouseClick.bind(this);
        this._resize = this._toDraw.bind(this);
        this._throttle.on('throttle', this._resize);
        this._devicePixelRatio = window.devicePixelRatio;
        this._repaintEnd = opts && opts.repaintEnd; //重绘回调
        this._animationFlag = true;
        this._isDispose = false; //是否已销毁
        this._margin = {
            left: 0,
            top: 0
        };

    }
    initialize(map) {
        this._map = map;
        this._container = document.createElement('canvas');
        this._ctx = this._container.getContext('2d');
        this._margin.left = -this._map.offsetX;
        this._margin.top = -this._map.offsetY;
        this._container.style.cssText = `position:absolute;left:${this._margin.left}px;top:${this._margin.top}px;z-index:${zIndex++};`;
        map.getPanes().mapPane.appendChild(this._container);
        this._setCanvasSize();
        map.addEventListener('resize', this._tOnResize);
        map.addEventListener('moveend', this._tOnMoveend);
        map.addEventListener('moving', this._tOnMoving);
        map.addEventListener('zoomstart', this._tOnZoomstart);
        map.addEventListener('zoomend', this._tOnZoomend);
        map.addEventListener('mousemove', this._tMousemove);
        map.addEventListener('click', this._tMouseClick);
        if (!map._inmapToolBar) {
            map._inmapToolBar = new Toolbar(map.getContainer());
        }
        let legendContainer = map._inmapToolBar.legendContainer;
        this.legend = new Legend(legendContainer);
        this.toolTip = map._inmapToolBar.toolTip;
        legendContainer = null;
        this._canvasInit();
        return this._container;

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

    _tOnResize(event) {
        this._setCanvasSize();
        this._eventType = event.type;
        this._tDraw(this, event);
    }
    _tOnMoveend(event) {
        this._animationFlag = true;
        this._eventType = event.type;
    }
    _tOnZoomstart() {
        this._animationFlag = false;
        this._clearCanvas();
    }
    _tOnZoomend(e) {
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
        me.keysss = true;
    }
    _toDraw() {
        /** 抽象方法 子类去实现*/
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
    setZIndex(_zIndex) {
        this._container.style.zIndex = _zIndex;
    }

    _Tclear() {

    }
    _Tdispose() {

    }
    /**
     * 对象销毁
     */
    dispose() {
        this._throttle.dispose();
        this._removeWorkerMessage();
        this._map.removeEventListener('resize', this._tOnResize);
        this._map.removeEventListener('moveend', this._tOnMoveend);
        this._map.removeEventListener('zoomstart', this._tOnZoomstart);
        this._map.removeEventListener('zoomend', this._tOnZoomend);
        this._map.removeEventListener('moving', this._tOnMoving);
        this._map.removeEventListener('mousemove', this._tMousemove);
        this._map.removeEventListener('click', this._tMouseClick);

        if (this.legend) {
            this.legend.dispose(this._map._inmapToolBar.legendContainer);
            this.legend = null;
        }
        if (this.toolTip) {
            this.toolTip.hide();
            this.toolTip = null;
        }

        this._Tclear();
        this._Tdispose();

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