import {
    isFunction,
    isString,
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

        this.tooltipDom = null; //悬浮弹层
        this.legendDom = null; //图例
        this.tooltipTemplate = null;


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
    compileTooltipTemplate(formatter) {
        formatter = '`' + formatter.replace(/\{/g, '${overItem.') + '`';
        this.tooltipTemplate = new Function('overItem', 'return ' + formatter);
    }

    setWorkerData(val) {
        this.workerData = val;
    }
    /**
     * 设置悬浮信息
     */
    setTooltip(event) {
        let {
            show,
            customClass,
            offsets,
            formatter
        } = this.tooltip;
        if (this.tooltipDom == null) {
            this.tooltipDom = document.createElement('div');
            this.tooltipDom.classList.add('inmap-tooltip');
            this.tooltipDom.classList.add(customClass);
            this.map._inmapOption.toolDom.appendChild(this.tooltipDom);
        }
        if (!show) {
            this.tooltipDom.style.display = 'none';
            return;
        }
        if (this.overItem) {
            let overItem = this.overItem;
            if (isFunction(formatter)) {
                this.tooltipDom.innerHTML = formatter(overItem);
            } else if (isString(formatter)) {
                if (!this.tooltipTemplate) { //编译
                    this.compileTooltipTemplate(formatter);
                }
                this.tooltipDom.innerHTML = this.tooltipTemplate(overItem);
            }

            this.tooltipDom.style.left = event.offsetX + offsets.left + 'px';
            this.tooltipDom.style.top = event.offsetY + offsets.top + 'px';
            this.tooltipDom.style.display = 'block';
        } else {
            this.tooltipDom.style.display = 'none';
        }

    }

    Tclear() {
        if (this.tooltipDom) {
            this.tooltipDom.parentNode.removeChild(this.tooltipDom);
            this.tooltipDom = null;
        }
        if (this.legendDom && this.legendDom.parentNode) {
            this.legendDom.parentNode.removeChild(this.legendDom);
            this.legendDom = null;
        }
    }



    /**
     * 设置图例
     */
    setlegend(legend, splitList) {

        if (!this.map) return;
        if (legend == null || legend.show == false) {
            if (this.legendDom) {
                this.legendDom.style.display = 'none';
            }
            return;
        }
        let legendData = legend.data;
        let legendDom = this.map._inmapOption.toolDom.querySelector('.inmap-legend');
        if (!legendDom) {
            let div = document.createElement('div');
            div.classList.add('inmap-legend');
            this.map._inmapOption.toolDom.appendChild(div);
            this.legendDom = div;
        } else {
            this.legendDom = legendDom;
        }

        let str = '';
        if (legend.title) {
            str = `<div class="inmap-legend-title">${legend.title} </div>`;
        }
        let legendFunc = this.legend.formatter; //回调 设置复杂显示
        let me = this;
        str += '<table cellpadding="0" cellspacing="0">';
        splitList.forEach(function (val, index) {
            let text = null,
                backgroundColor = val.backgroundColor;
            let legendBg = new Color(backgroundColor),
                difference = 0.2;
            // debugger
            let opacity = val.opacity;
            if (opacity) { 
                opacity += difference;
            }
            if (legendBg.a) {
                opacity = legendBg.a + difference;
            } else {
                opacity = 1;
            }
            backgroundColor=legendBg.getRgbaStyle(opacity);

            if (legendFunc) {
                text = legendFunc(me.toFixed(val.start), me.toFixed(val.end), index);
            } else if (legendData) {
                text = legendData[index];
            } else {
                text = `${me.toFixed(val.start)} ~ ${ val.end==null ?'<span class="inmap-infinity"></span>':me.toFixed(val.end)}`;
            }
            if (backgroundColor) {
                str += `
                <tr>
                    <td style="background:${backgroundColor}; width:17px;"></td>
                    <td class="inmap-legend-text">
                       ${text}
                    </td>
                </tr>
                `;
            } else {
                //非颜色分类的暂时未找到很好的图例设计， 先隐藏
                legend.show = false;
            }
        });
        str += '</table>';
        let show = false;
        if (legend.show) {
            show = splitList.length > 0;
        } else {
            show = false;
        }
        this.legendDom.style.display = show ? 'block' : 'none';
        this.legendDom.innerHTML = str;
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
        if (this.tooltipDom) {
            this.tooltipDom.style.display = 'none';
        }

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