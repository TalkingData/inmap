import BaseClass from './BaseClass';
import {
    setDevicePixelRatio,
    isString,
    isArray
} from './../../common/util';
import {
    WhiteLover,
    Blueness
} from './../../config/MapStyle';
import Toolbar from './../../map/Toolbar';
let zIndex = 1;

export class CanvasOverlay extends BaseClass {
    constructor(opts) {
        super();
        this.ctx = null; //canvas对象
        this.eventType = 'moveend';
        this.map = null;
        this.container = null;
        this.tOnResize = this.tOnResize.bind(this);
        this.tOnMoveend = this.tOnMoveend.bind(this);
        this.tOnZoomstart = this.tOnZoomstart.bind(this);
        this.tOnZoomend = this.tOnZoomend.bind(this);
        this.tOnMoving = this.tOnMoving.bind(this);
        this.tMousemove = this.tMousemove.bind(this);
        this.tMouseClick = this.tMouseClick.bind(this);
        this.devicePixelRatio = window.devicePixelRatio;
        this.repaintEnd = opts && opts.repaintEnd; //重绘回调
        this.animationFlag = true;

    }
    initialize(map) {
        let me = this;
        this.map = map;
        this.container = document.createElement('canvas');
        this.ctx = this.container.getContext('2d');
        this.container.style.cssText = 'position:absolute;left:0;top:0;z-index:' + (zIndex++) + ';';
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
            map.inmapToolBar = new Toolbar(map.Va);
        }
        this.legend = map.inmapToolBar.legend;
        this.toolTip = map.inmapToolBar.toolTip;

        this.canvasInit();
        return this.container;

    }

    tMapStyle(skin) {
        let styleJson = null;
        if (isString(skin)) {
            styleJson = skin == 'Blueness' ? Blueness : WhiteLover;
        } else if (isArray(skin)) {
            styleJson = skin;
        }
        skin && this.map && this.map.setMapStyle({
            styleJson: styleJson
        });
    }
    tOnResize(event) {
        this.setCanvasSize();
        this.eventType = event.type;
        this.tDraw(this, event);
    }
    tOnMoveend(event) {
        this.animationFlag = true;
        this.eventType = event.type;
    }
    tOnZoomstart() {
        this.animationFlag = false;
        this.clearCanvas();
    }
    tOnZoomend(e) {
        this.animationFlag = true;
        this.eventType = e.type;
    }
    tOnMoving(e) {
        this.animationFlag = false;
        this.eventType = e.type;
    }
    tMousemove() {

        //抽象方法 子类去实现
    }
    canvasInit() {
        //抽象方法 子类去实现
    }
    draw() {

        let eventType = this.eventType;
        // if (eventType == 'onzoomend' || eventType == 'onmoveend' || eventType == 'onresize') {
        //     this.resize();
        // }
        if (eventType == 'onmoving') {
            this.canvasResize();
        } else {
            this.resize();
        }

    }
    tMouseClick() {
        //抽象方法 子类去实现
    }
    tDraw(me, event) {
        this.eventType = event.type;
        me.draw();
        this.repaintEnd && this.repaintEnd(this); //重绘回调
        me.keysss = true;
    }
    resize() {
        //  抽象方法 子类去实现
    }
    canvasResize() {
        let map = this.map;
        let container = this.container;
        let point = map.getCenter();
        let size = map.getSize();
        let pixel = map.pointToOverlayPixel(point);
        let left = pixel.x - size.width / 2;
        let top = pixel.y - size.height / 2;
        let containerDomStyle = container.style;

        this.translationIf(parseFloat(containerDomStyle.left), parseFloat(containerDomStyle.top), left, top);
        containerDomStyle.left = left + 'px';
        containerDomStyle.top = top + 'px';

        containerDomStyle = null;
        container = null;
        map = null;

    }
    translationIf(oldLeft, oldTop, newLeft, newTop) {
        if (oldLeft != newLeft || oldTop != newTop) {
            this.translation(oldLeft - newLeft, oldTop - newTop);
        }
    }
    /*eslint-disable */
    translation(distanceX, distanceY) {
        /**       
         * 抽象方法，子类去实现
         */
    }
    /*eslint-enable */
    clearCanvas() {
        let size = this.map.getSize();
        this.getContext().clearRect(0, 0, size.width, size.height); //调整画布
    }
    setCanvasSize() {
        let size = this.map.getSize();
        this.container.width = size.width;
        this.container.height = size.height;
        setDevicePixelRatio(this.ctx);
    }
    getContext() {
        return this.ctx;
    }
    /**
     * 设置overlay z-index
     */
    setZIndex(_zIndex) {
        this.container.style.zIndex = _zIndex;
    }
    /**
     * 清除缓存
     */
    Tclear() {

    }
    Tdispose() {

    }
    /**
     * 对象销毁
     */
    dispose() {
        this.removeWorkerMessage();
        this.map.removeEventListener('resize', this.tOnResize);
        this.map.removeEventListener('moveend', this.tOnMoveend);
        this.map.removeEventListener('zoomstart', this.tOnZoomstart);
        this.map.removeEventListener('zoomend', this.tOnZoomend);
        this.map.removeEventListener('moving', this.tOnMoving);
        this.map.removeEventListener('mousemove', this.tMousemove);
        this.map.removeEventListener('click', this.tMouseClick);

        if (this.legend) {
            this.legend.hide();
            this.legend = null;
        }
        if (this.toolTip) {
            this.toolTip.hide();
            this.toolTip = null;
        }
         
    
       
        this.Tclear();
        this.Tdispose();
        this.map.removeOverlay(this);
        this.container = null;
        this.ctx = null;
        this.repaintEnd = null;
        this.map=null;
    }
}