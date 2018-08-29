import {
    isNumber,
    detectmob,
    isEmpty,
    merge,
    isArray,
    clearPushArray
} from './../../common/util';
import CanvasOverlay from './CanvasOverlay';
import Color from './../../common/Color';
let isMobile = detectmob();
/**
 * 接头定义 参数解析类
 */
export default class Parameter extends CanvasOverlay {
    constructor(baseConfig, ops) {
        super();
        this._data = []; //数据
        this._workerData = []; //转换后的数据
        this._option = {};
        this._baseConfig = baseConfig;
        this._selectItem = []; //选中
        this._overItem = null; //悬浮
        this._setStyle(baseConfig, ops);
    }
    _setStyle(config, ops) {
        if (!ops) return;

        let option = merge(config, ops);
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
            this.setData(ops.data);
        } else {
            this._onOptionChange();
            this._map && this.refresh();
        }
        delete this._option.data;
        this._selectItem = option.selected || [];
        this._tMapStyle(option.skin);
        this.toolTip && this.toolTip.setOption(this._tooltipConfig);

    }
    setData(points) {
        if (points) {
            if (!isArray(points)) {
                throw new TypeError('inMap: data must be a Array');
            }
            this._data = points;

        } else {
            this._data = [];

        }

        this._clearData();
        this._cancerSelectd();
        this._onDataChange();
        this._map && this._toDraw();
    }
    _onOptionChange() {
        /**抽象方法，样式发生变化会触发 */
    }
    _onDataChange() {
        /**抽象方法，数据发生变化会触发 */
    }
    setPoints(points) {
        this.setData(points);
    }
    getRenderData() {
        return this._workerData;
    }
    _getTransformData() {
        return this._workerData.length > 0 ? this._workerData : this._data;
    }
    /**
     * 清除wokerData
     * 清除悬浮引用
     */
    _clearData() {
        clearPushArray(this._workerData);
        this._overItem = null;
    }
    /**
     * 清除选中
     * @memberof Parameter
     */
    _cancerSelectd() {
        clearPushArray(this._selectItem, []);
    }

    _setWorkerData(val) {
        this._data = []; //优化
        this._overItem = null;
        clearPushArray(this._workerData, val);
    }

    _canvasInit() {
        this.toolTip.setOption(this._tooltipConfig);
        this._parameterInit();
    }

    _parameterInit() {
        /** 抽象方法，子类去实现*/
    }
    _toRgba(styleConfig) {
        ['normal', 'mouseOver', 'selected'].forEach((status) => {
            let statusStyle = styleConfig[status];
            if (statusStyle) {
                ['backgroundColor', 'borderColor', 'shadowColor'].forEach((item) => {
                    let val = statusStyle[item];
                    if (val && val.indexOf('rgba') == -1) {
                        styleConfig[status][item] = (new Color(val)).getRgbaValue();
                    }
                });


            }
        });
        styleConfig.colors && styleConfig.colors.forEach((val, index, arr) => {
            if (val.indexOf('rgba') == -1) {
                arr[index] = (new Color(val)).getRgbaValue();
            }
        });
    }
    /**
     * 根据用户配置，设置用户绘画样式
     * @param {*} item 数据行
     * @param {*} otherMode  是否返回选中数据集的样式
     */
    _setDrawStyle(item, otherMode) {
        let normal = this._styleConfig.normal, //正常样式
            mouseOverStyle = this._styleConfig.mouseOver, //悬浮样式
            selectedStyle = this._styleConfig.selected; //选中样式
        let result = merge({}, normal);
        let count = parseFloat(item.count);
        //区间样式
        let splitList = this._styleConfig.splitList;
        for (let i = 0; i < splitList.length; i++) {
            let condition = splitList[i];
            if (i == splitList.length - 1) {
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
        result = merge(result, item.style || {});

        if (mouseOverStyle && this._overItem == item) {
            result = merge(result, mouseOverStyle, {
                backgroundColor: mouseOverStyle.backgroundColor || this._brightness(result.backgroundColor, 0.1)
            });
        }
        if (otherMode && selectedStyle && this._selectItemContains(item)) {
            result = merge(result, selectedStyle);
        }
        //如果设置了shadowBlur的范围长度，并且也没有设置shadowColor，则shadowColor默认取backgroundColor值
        if (result.shadowBlur != null && result.shadowColor == null) {
            result['shadowColor'] = (new Color(result.backgroundColor)).getValue();
        }
        if (result.opacity) {
            let color = new Color(result.backgroundColor);
            result.backgroundColor = color.getRgbaValue(result.opacity);
        }
        if (result.borderOpacity) {
            let color = new Color(result.borderColor);
            result.borderColor = color.getRgbaValue(result.borderOpacity);
        }
        return result;
    }
    _mergeCondition(normal, condition) {
        if (condition.opacity == null && normal.opacity != null) {
            normal.opacity = null;
        }
        if (condition.borderOpacity == null && normal.borderOpacity != null) {
            normal.borderOpacity = null;
        }
        return merge(normal, condition);
    }
    /**
     * 亮度效果
     */
    _brightness(rgba, delta) {

        let color = new Color(rgba);
        color.r += delta;
        color.g += delta;
        color.b += delta;
        return color.getValue();
    }

    /**
     * 选中的数据集里面是否包含
     */
    _selectItemContains(item) {
        return this._findIndexSelectItem(item) > -1;
    }

    /*eslint-disable */

    /**
     * 查询选中列表的索引
     */
    _findIndexSelectItem(item) {
        /** 需要子类去实现 */
        return -1;
    }

    _getTarget(x, y) {
        /**需要子类去实现*/
        return {
            item: null,
            index: -1
        };
    }


    /*eslint-enable */

    _deleteSelectItem(item) {
        let index = this._findIndexSelectItem(item);
        index > -1 && this._selectItem.splice(index, 1);
    }


    /**
     * 设置悬浮信息
     */
    _setTooltip(event) {
        this.toolTip.render(event, this._overItem);
    }

    _Tclear() {
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

    /**
     * 设置图例
     */
    _setlegend(legendConfig, list) {
        if (!this._map) return;

        if (list && list.length > 0) {
            legendConfig['list'] = list;
        } else {
            legendConfig['list'] = legendConfig['list'] || [];
        }

        this.legend.setOption(legendConfig);
    }

    /**
     * 绘画
     */
    refresh() {
        /** 抽象方法需要子类去实现 */
    }
    _swopData(index, item) {
        if (isNumber(index) && index > -1) {
            this._workerData[index] = this._workerData[this._workerData.length - 1];
            this._workerData[this._workerData.length - 1] = item;
        }
    }
    _tMouseleave() {
        this.tooltip.hide();
    }
    _tMousemove(event) {
        if (this._eventType == 'onmoving') {
            return;
        }
        if (!this._tooltipConfig.show && isEmpty(this._styleConfig.mouseOver)) {
            return;
        }

        let result = this._getTarget(event.pixel.x, event.pixel.y);
        let temp = result.item;

        if (temp != this._overItem) { //防止过度重新绘画
            this._overItem = temp;
            if (temp) {
                this._swopData(result.index, result.item);
            }
            this._eventType = 'mousemove';
            if (!isEmpty(this._styleConfig.mouseOver)) {
                this.refresh();
            }
        }
        if (temp) {
            this._map.setDefaultCursor('pointer');
        } else {
            this._map.setDefaultCursor('default');
        }

        this._setTooltip(event);

    }
    _tMouseClick(event) {
        if (this._eventType == 'onmoving') return;
        let {
            multiSelect
        } = this._eventConfig;
        let result = this._getTarget(event.pixel.x, event.pixel.y);
        if (result.index == -1) {
            return;
        }
        let item = JSON.parse(JSON.stringify(result.item)); //优化
        if (multiSelect) {
            if (this._selectItemContains(item)) {
                this._deleteSelectItem(item); //二次点击取消选中
            } else {
                this._selectItem.push(result.item);
            }

        } else {
            clearPushArray(this._selectItem, result.item);
        }

        this._swopData(result.index, item);
        this._eventConfig.onMouseClick.call(this, this._selectItem, event);

        this.refresh();
        if (isMobile) {
            this._overItem = item;
            this._setTooltip(event);
        }


    }
}