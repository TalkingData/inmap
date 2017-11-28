import {
    HeatOverlay,
    HeatTileOverlay,
} from './transform/HeatOverlay';
import {
    GriddingOverlay
} from './transform/GriddingOverlay';
import {
    BoundaryOverlay
} from './transform/BoundaryOverlay';
import {
    CircuitOverlay
} from './transform/CircuitOverlay';
import {
    HoneycombOverlay
} from './transform/HoneycombOverlay';
import {
    polymeOverlay
} from './transform/polymeOverlay';
let callbackList = {
    'HeatOverlay': HeatOverlay,
    'HeatTileOverlay': HeatTileOverlay,
    'GriddingOverlay': GriddingOverlay,
    'BoundaryOverlay': BoundaryOverlay,
    'CircuitOverlay': CircuitOverlay,
    'HoneycombOverlay': HoneycombOverlay,
    'polymeOverlay': polymeOverlay
};

/**
 * 接收worker消息
 * @param {Event} e
 */
/*eslint-disable */
onmessage = function onmessage(e) {
    let data = e.data;
    callback(data);
}
/*eslint-enable */
/**
 * 唯一生效队列控制全家对象
 */
let handler = {};
/**
 * worker方法执行解析
 */
let callback = function (data) {
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
            //唯一生效队列控制
            handler[classPath] = hashCode + '_' + msgId;
            //查找到执行方法，并执行方法
            var obj = callback(data);
            TDpost(obj.data, obj.client);
            return;
        }

        if (!callback) {
            /*eslint-disable */
            console.error(p[index - 1] + 'worker ' + classPath + ' is not a function');
            /*eslint-enable */
            return;
        }
    }
};


/**
 * push到web消息
 * @param {Object} data
 */
export var TDpost = function (data, client) {
    var opts = client;
    var request = client.request;
    var classPath = request.classPath;
    var hashCode = request.hashCode;
    var msgId = request.msgId;
    var handler = callbackList[classPath];
    //唯一生效队列判断
    if (handler && (handler != hashCode + '_' + msgId)) {
        return;
    }
    opts.response = {
        type: 'worker',
        data: data
    };
    postMessage(opts);
};
export var boundaryOverlay = BoundaryOverlay;