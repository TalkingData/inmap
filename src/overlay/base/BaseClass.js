import workerMrg from './../../common/workerMrg';

let baseClassCounter = 0;
let inmap_instances = {};
let _count = 0; //消息ID key
/**
 * 父类继承
 * @param {Object} parentClass
 * @param {Object} className
 */
Function.prototype.inherits = function (parentClass, className) {
    let i, p, op = this.prototype,
        C = function () {};
    C.prototype = parentClass.prototype;
    p = this.prototype = new C();
    if (typeof (className) == 'string') {
        p.className = className;
    }
    for (i in op) {
        p[i] = op[i];
    }
    this.prototype.constructor = op.constructor;
    op = C = null;
    return p;
};




/**
 * TD框架的基类
 * @namespace
 * @name BaseClass
 */
let BaseClass = function (hc) {
    inmap_instances[(this.hashCode = (hc || BaseClass.guid()))] = this;
};

/** @ignore */
BaseClass.guid = function () {
    return 'td' + (baseClassCounter++).toString(36);
};




/**
 * 释放对象所持有的资源。
 * 主要是自定义事件。
 * 好像没有将_listeners中绑定的事件剔除掉..
 */
BaseClass.prototype.dispose = function () {
    if (this.hashCode) {
        inmap_instances[this.hashCode] = null;
    }

    for (let i in this) {
        if (typeof this[i] != 'function') {
            this[i] = null;
        }
    }
};

/**
 * 返回对象的hashCode，如果没有的话，添加一个新的hashCode并将其返回
 * @return {String} 对象的hashCode
 */
BaseClass.prototype.getHashCode = function () {
    if (!this.hashCode) {
        inmap_instances[(this.hashCode = BaseClass.guid())] = this;
    }
    return this.hashCode;
};

/**
 * 从inmap_instances数组中将对象的引用删除掉。
 * 删除之后就无法使用I()函数获取对象了。
 */
BaseClass.prototype.decontrol = function () {
    inmap_instances[this.hashCode] = null;
};

let baidu = window.BMap || {
    Overlay: {}
};
BaseClass.inherits(baidu.Overlay, 'BaseClass');

/**
 * push消息，
 * @param {string} workerClassPath worker请求的path
 * @param {json} data提交的json数据
 * @param {Function} callback
 */
BaseClass.prototype.postMessage = function (workerClassPath, data, callback) {
    let map = this.map;
    let center = map.getCenter();
    let size = map.getSize();
    let msgId = this.setMsgId();
    let request = {
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
    workerMrg.postMessage({
        request: request
    }, callback);
};
BaseClass.prototype.getMsgId = function () {
    return 'msgId' + _count.toString(36);
};
BaseClass.prototype.setMsgId = function () {
    _count++;
    return 'msgId' + (_count).toString(36);
};
BaseClass.prototype.removeWorkerMessage = function () {
    workerMrg.removeMessage(this.hashCode);
};

export default BaseClass;