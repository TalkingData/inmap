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
        this.points = []; //数据
        this.workerData = []; //转换后的数据
        this._option = {};
        this.baseConfig = baseConfig;

        this.selectItem = []; //选中
        this.overItem = null; //悬浮

        this._setStyle(baseConfig, ops);

    }
    _setStyle(config, ops) {
        ops = ops || {};
        let option = merge(config, ops);
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
        this.selectItem = option.selected || [];
        // this.points = ops.data ? option.data : this.points;
        this.tMapStyle(option.skin);
        this.toolTip && this.toolTip.setOption(this.tooltipConfig);

    }
    setData(points) {
        if (!isArray(points)) {
            throw new TypeError('inMap: data must be a Array');
        }
        this.points = points;
        this.clearData();
        this.cancerSelectd();
        this.onDataChange();
        this.map && this.resize();
    }
    onOptionChange() {
        /**抽象方法，样式发生变化会触发 */
    }
    onDataChange() {
        /**抽象方法，数据发生变化会触发 */
    }
    setPoints(points) {
        this.setData(points);
    }
    getData() {
        return this.workerData;
    }
    getTransformData() {
        return this.workerData.length > 0 ? this.workerData : this.points;
    }
    /**
     * 清除wokerData
     * 清除悬浮引用
     */
    clearData() {
        clearPushArray(this.workerData);
        this.overItem = null;
    }
    /**
     * 清除选中
     * @memberof Parameter
     */
    cancerSelectd() {
        clearPushArray(this.selectItem, []);
    }

    setWorkerData(val) {
        this.points = []; //优化
        this.overItem = null;
        clearPushArray(this.workerData, val);
    }

    canvasInit() {
        this.toolTip.setOption(this.tooltipConfig);
        this.parameterInit();
    }

    parameterInit() {
        /**
         *  抽象方法，子类去实现
         */
    }
    toRgba(styleConfig) {
        ['normal', 'mouseOver', 'selected'].forEach((status) => {
            let statusStyle = styleConfig[status];
            if (statusStyle) {
                ['backgroundColor', 'borderColor', 'shadowColor'].forEach((item) => {
                    let val = statusStyle[item];
                    if (val && val.indexOf('rgba') == -1) {
                        styleConfig[status][item] = (new Color(val)).getRgbaStyle();
                    }
                });


            }
        });
        styleConfig.colors && styleConfig.colors.forEach((val, index, arr) => {
            if (val.indexOf('rgba') == -1) {
                arr[index] = (new Color(val)).getRgbaStyle();
            }
        });
    }
    /**
     * 根据用户配置，设置用户绘画样式
     * @param {*} item 
     */
    setDrawStyle(item, index) {
        let normal = this.styleConfig.normal, //正常样式
            mouseOverStyle = this.styleConfig.mouseOver, //悬浮样式
            selectedStyle = this.styleConfig.selected; //选中样式
        let result = {};
        result = merge(result, normal);
        //区间样式
        let splitList = this.styleConfig.splitList;
        for (let i = 0; i < splitList.length; i++) {
            let condition = splitList[i];
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
        result = merge(result, item.style || {});

        if (mouseOverStyle && this.overItem == item) {
            result = merge(result, mouseOverStyle, {
                backgroundColor: mouseOverStyle.backgroundColor || this.brightness(result.backgroundColor, 0.1)
            });
        }
        if (selectedStyle && this.selectItemContains(item, index)) {
            result = merge(result, selectedStyle);
        }
        //如果设置了shadowBlur的范围长度，并且也没有设置shadowColor，则shadowColor默认取backgroundColor值
        if (result.shadowBlur != null && result.shadowColor == null) {
            result['shadowColor'] = (new Color(result.backgroundColor)).getStyle();
        }
        if (result.opacity) {
            let color = new Color(result.backgroundColor);
            result.backgroundColor = color.getRgbaStyle(result.opacity);
        }
        if (result.borderOpacity) {
            let color = new Color(result.borderColor);
            result.borderColor = color.getRgbaStyle(result.borderOpacity);
        }
        return result;
    }
    mergeCondition(normal, condition) {
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
    brightness(rgba, delta) {

        let color = new Color(rgba);
        color.r += delta;
        color.g += delta;
        color.b += delta;
        return color.getStyle();
    }

    /**
     * 选中的数据集里面是否包含
     * @param {*} item 
     */
    selectItemContains(item, index) {
        return this.findIndexSelectItem(item, index) > -1;
    }
    /*eslint-disable */
    /**
     * 查询选中列表的索引
     * @param {*} item 
     */
    findIndexSelectItem(item, index) {
        //这个需要子类去实现  
        //原因 点 线  面 的数据结构不同  判断依据也不相同
        return -1;
    }
    /**
     * 判断触发源
     */
    getTarget(x, y) {
        //需要子类去实现 
        return {
            item: null,
            index: -1
        };
    }
    /*eslint-enable */
    deleteSelectItem(item) {
        let index = this.findIndexSelectItem(item);
        index > -1 && this.selectItem.splice(index, 1);
    }


    /**
     * 设置悬浮信息
     */
    setTooltip(event) {
        this.toolTip.render(event, this.overItem);
    }

    Tclear() {
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

    /**
     * 设置图例
     */
    setlegend(legendConfig, list) {
        if (!this.map) return;

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
        //抽象方法需要子类去实现
    }
    swopData(index, item) {
        if (isNumber(index) && index > -1) {
            this.workerData[index] = this.workerData[this.workerData.length - 1];
            this.workerData[this.workerData.length - 1] = item;
        }
    }
    tMouseleave() {
        this.tooltip.hide();
    }
    tMousemove(event) {
        if (this.eventType == 'onmoving') {
            return;
        }
        if (!this.tooltipConfig.show && isEmpty(this.styleConfig.mouseOver)) {
            return;
        }

        let result = this.getTarget(event.pixel.x, event.pixel.y);
        let temp = result.item;

        if (temp != this.overItem) { //防止过度重新绘画
            this.overItem = temp;
            if (temp) {
                this.swopData(result.index, result.item);
            }
            this.eventType = 'mousemove';
            if (!isEmpty(this.styleConfig.mouseOver)) {
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
    tMouseClick(event) {
        if (this.eventType == 'onmoving') return;
        let {
            multiSelect
        } = this.eventConfig;
        let result = this.getTarget(event.pixel.x, event.pixel.y);
        if (result.index == -1) {
            return;
        }
        let item = JSON.parse(JSON.stringify(result.item)); //优化
        if (multiSelect) {
            if (this.selectItemContains(item)) {
                this.deleteSelectItem(item); //二次点击取消选中
            } else {
                this.selectItem.push(result.item);
            }

        } else {
            clearPushArray(this.selectItem, result.item);
        }

        this.swopData(result.index, item);
        this.eventConfig.onMouseClick.call(this,this.selectItem, event);

        this.refresh();
        if (isMobile) {
            this.overItem = item;
            this.setTooltip(event);
        }


    }
}