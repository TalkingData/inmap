import {
    detectmob,
    isEmpty,
    merge
} from './../../common/util';
import {
    CanvasOverlay
} from './CanvasOverlay';
import {
    Color
} from './../../common/Color';
let isMobile = detectmob();
/**
 * 接头定义 参数解析类
 */
export class Parameter extends CanvasOverlay {
    constructor(baseConfig, ops) {
        super();
        this.points = []; //数据
        this.baseConfig = baseConfig;
        this._setStyle(baseConfig, ops);

        this.selectItem = []; //选中
        this.overItem = null; //悬浮
        this.workerData = []; //缓存woker 转换后的数据

    }

    _setStyle(config, ops) {
        ops = ops || {};
        let option = merge(config, ops);
        this.toRgba(option.style);
        this._option = option;
        this.tooltip = option.tooltip;
        this.legend = option.legend;
        this.event = option.event;
        this.style = option.style;
        this.points = ops.data ? option.data : this.points;
        this.tMapStyle(option.skin);
        this.ToolBar && this.ToolBar.toolTip.setOption(option.tooltip);

    }
    canvasInit() {
        this.ToolBar.toolTip.setOption(this.tooltip);
        this.parameterInit();
    }

    parameterInit() {
        /**
         *  抽象方法，子类去实现
         */
    }
    /**
     * 抽象方法
     * 
     * @param {any} ops 
     * @memberof Parameter
     */
    setOptionStyle() {}
    toRgba(style) {

        ['normal', 'mouseOver', 'selected'].forEach((status) => {
            let statusStyle = style[status];
            if (statusStyle) {
                ['backgroundColor', 'borderColor', 'shadowColor'].forEach((item) => {
                    let val = statusStyle[item];
                    if (val && val.indexOf('rgba') == -1) {
                        style[status][item] = (new Color(val)).getRgbaStyle();
                    }
                });


            }
        });

        style.colors && style.colors.forEach((val, index, arr) => {
            if (val.indexOf('rgba') == -1) {
                arr[index] = (new Color(val)).getRgbaStyle();
            }
        });
    }
    /**
     * 根据用户配置，设置用户绘画样式
     * @param {*} item 
     */
    setDrawStyle(item) {
        let normal = this.style.normal, //正常样式
            mouseOverStyle = this.style.mouseOver, //悬浮样式
            selectedStyle = this.style.selected; //选中样式
        let result = {};
        result = merge(result, normal);
        //区间样式
        let splitList = this.style.splitList;
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
        if (selectedStyle && this.selectItemContains(item)) {
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
    selectItemContains(item) {
        return this.findIndexSelectItem(item) > -1;
    }
    /*eslint-disable */
    /**
     * 查询选中列表的索引
     * @param {*} item 
     */
    findIndexSelectItem(item) {
        //这个需要子类去实现  
        //原因 点 线  面 的数据结构不同  判断依据也不相同
        return -1;
    }
    /*eslint-enable */
    deleteSelectItem(item) {
        let index = this.findIndexSelectItem(item);
        index > -1 && this.selectItem.splice(index, 1);
    }

    setWorkerData(val) {
        this.workerData = val;
    }
    /**
     * 设置悬浮信息
     */
    setTooltip(event) {
        this.ToolBar.toolTip.render(event, this.overItem);
    }

    Tclear() {

    }



    /**
     * 设置图例
     */
    setlegend(legend, list) {
        if (!this.map) return;
        legend['list'] = list;
        this.ToolBar.legend.setOption(legend);
    }
    toFixed(num) {
        return isNaN(num) ? num : parseFloat(num).toFixed(this.legend.toFixed);
    }
    /*eslint-disable */
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
    /**
     * 绘画
     */
    refresh() {
        //抽象方法需要子类去实现
    }
    swopData(index, item) {
        if (index > -1) {
            this.workerData[index] = this.workerData[this.workerData.length - 1];
            this.workerData[this.workerData.length - 1] = item;
        }
    }
    tMouseleave() {
        this.ToolBar.tooltip.hide();
    }
    tMousemove(event) {
        if (this.eventType == 'onmoving') {
            return;
        }
        if (!this.tooltip.show && isEmpty(this.style.mouseOver)) {
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
            if (!isEmpty(this.style.mouseOver)) {
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
        } = this.event;
        let result = this.getTarget(event.pixel.x, event.pixel.y);
        if (result.index == -1) {
            return;
        }

        let item = result.item;
        if (multiSelect) {
            if (this.selectItemContains(item)) {
                this.deleteSelectItem(item); //二次点击取消选中
            } else {
                this.selectItem.push(result.item);
            }

        } else {
            this.selectItem = [result.item];
        }

        this.swopData(result.index, item);
        this.event.onMouseClick(this.selectItem, event);

        this.refresh();
        if (isMobile) {
            this.overItem = item;
            this.setTooltip(event);
        }


    }
}