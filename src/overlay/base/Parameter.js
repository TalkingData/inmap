
import {
    detectmob,
    merge
} from './../../common/util';
import {
    WhiteLover,
    Blueness
} from './../../config/MapStyle';
import {
    CanvasOverlay
} from './CanvasOverlay';
import {
    Color
} from './../../common/Color';
import {
    isFunction,
    isString,
} from './../../common/util';


/**
 * 接头定义 参数解析类
 */
export class Parameter extends CanvasOverlay {
    constructor(baseConfig,ops) {
        super();
        this.points = []; //数据
        this._setOptionStyle(baseConfig, ops);

        this.selectItem = []; //选中
        this.overItem = null; //悬浮
        this.workerData = []; //缓存woker 转换后的数据

        this.tooltipDom = null; //悬浮弹层
        this.legendDom = null; //图例
        this.tooltipTemplate = null;

        this.selectedExp = {
            show: false,
            exp: null,
        };
    }

    _setOptionStyle(config, ops) {
        ops = ops || {};
        let option = merge(config, ops);

        this.tooltip = option.tooltip;
        this.legend = option.legend;
        this.event = option.event;
        this.style = option.style;
        this.points = option.data || this.points;
        //设置皮肤
        if (option.skin && this.map) {
            let setStyle = option.skin == 'Blueness' ? Blueness : WhiteLover;

            this.map.setMapStyle({
                styleJson: setStyle
            });
        }
        this.compileSplitList(this.points);
    }
    setOptionStyle(ops) {
        this._setOptionStyle(ops);
        this.TInit();
        this._dataRender();

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
            if (condition.end == null) {
                if (item.count >= condition.start) {
                    result = merge(normal, condition);
                    break;
                }
            } else if (item.count >= condition.start && item.count < condition.end) {
                result = merge(normal, condition);
                break;
            }
            if (!result.borderColor) {
                result['borderColor'] = this.getColorOpacity(result.backgroundColor);
            }
        }
        result = merge(result, item.style || {});
        let shadowColor = {};

        if (mouseOverStyle && this.overItem == item) {

            if (mouseOverStyle.shadowBlur != null && mouseOverStyle.shadowColor == null) {
                shadowColor['shadowColor'] = this.brightness(result.backgroundColor, 50);
            }

            result = merge(result, mouseOverStyle, {

                backgroundColor: mouseOverStyle.backgroundColor || this.brightness(result.backgroundColor, 0.1)
            }, shadowColor);
        }
        if (selectedStyle && this.selectItemContains(item)) {

            if (selectedStyle.shadowBlur != null && selectedStyle.shadowColor == null) {
                shadowColor['shadowColor'] = this.brightness(selectedStyle.backgroundColor, 0.1);
            }

            result = merge(result, selectedStyle, shadowColor);
        }

        return result;

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
    compileTemplate(formatter) {
        formatter = '`' + formatter.replace(/\{/g, '${overItem.') + '`';
        this.tooltipTemplate = new Function('overItem', 'return ' + formatter);
    }
    TInit() {

        if (this.style.colors.length > 0) {
            this.compileSplitList(this.points);
        } else {
            this.setlegend(this.legend, this.style.splitList);
        }


    }
    getColorOpacity(color) {
        let arr = color.split(',');
        arr.length = 3;
        return arr.join(',') + ',1)';
    }

    setWorkerData(val) {
        this.workerData = val;
        if (this.filterFun) {
            this.selectItem = this.workerData.filter(this.filterFun);
        }

    }
    parserExp(exp) {
        this.cancerExp();
        if (exp) {
            this.selectedExp.show = true;
            this.selectedExp.exp = exp;
            this.filterFun = new Function('item', 'with(item){ return ' + exp + ' }');

        }
    }
    cancerExp() {
        this.selectedExp.show = false;
        this.selectedExp.exp = null;
        this.filterFun = null;
    }
    setCenter() {

    }
    setCenterAndZoom() {
        /**
         抽象方法子类去实现
         */
    }
    /**
     * 设置选中
     * @param {*} exp  表达式
     */
    setSelectd(exp) {

        if (this.points.length > 0) {
            let filterFun = new Function('item', 'with(item){ return ' + exp + ' }');
            let temp = this.points.filter(filterFun);

            if (temp.length > 0) {
                this.setCenterAndZoom(temp[0].geo, exp); //default first
            }
        }
    }
    /**
     * 取消选中
     */
    cancerSelectd() {
        this.cancerExp();
        this.selectItem = [];
        this._dataRender();
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
                    this.compileTemplate(formatter);
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
    compileSplitList(data) {
        let colors = this.style.colors;
        if (colors.length <= 0) return;

        if (!Array.isArray(this.points)) {
            /*eslint-disable */
            console.error(' array is not defined <shouild be setPoints(Array)>');
            /*eslint-enable */
            return;
        }

        data = data.sort((a, b) => {
            return parseFloat(a.count) - parseFloat(b.count);
        });
        let splitCount = data.length / colors.length;
        let colorIndex = 0;
        let split = [];
        let star = 0,
            end = 0;

        for (let i = 0; i < data.length; i++) {

            if (i > splitCount * (colorIndex + 1)) {
                if (split.length == 0) {
                    star = data[0].count;
                }

                end = data[i].count;

                split.push({
                    start: star,
                    end: end,
                    backgroundColor: colors[colorIndex],
                    borderColor: this.style.normal.borderColor || this.getColorOpacity(colors[colorIndex])
                });
                colorIndex++;
                star = data[i].count;
            }
        }
        //去除最后判断区间，防止区间遗漏
        if (split.length > 0) {
            split.push({
                start: star,
                end: null,
                backgroundColor: colors[colorIndex],
                borderColor: this.style.normal.borderColor || this.getColorOpacity(colors[colorIndex])
            });

        }

        this.style.splitList = split;
        this.setlegend(this.legend, this.style.splitList);
    }
    Tclear() {
        if (this.tooltipDom) {
            this.tooltipDom.parentNode.removeChild(this.tooltipDom);
            this.tooltipDom = null;
        }
        if (this.legendDom) {
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
        if (this.legendDom == null) {
            let div = document.createElement('div');
            div.classList.add('inmap-legend');
            this.map._inmapOption.toolDom.appendChild(div);
            this.legendDom = div;
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
    _dataRender() {
        //抽象方法需要子类去实现
    }

    swopeData(index, item) {
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
        if (this.eventType == 'onmoving') return;
        let result = this.getTarget(event.pixel.x, event.pixel.y);
        let temp = result.item;
        if (temp != this.overItem) { //防止过度重新绘画
            this.overItem = temp;
            if (temp) {
                this.swopeData(result.index, result.item);
            }
            this.eventType = 'mousemove';
            this._dataRender();

        }
        if (temp) {
            this.map.setDefaultCursor('pointer');
        } else {
            this.map.setDefaultCursor('default');
        }

        this.setTooltip(event);

    }
    triggerClick(event) {
        this.event.onMouseClick(this.selectItem, event);
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

        this.swopeData(result.index, item);
        this.triggerClick(event);
        this.cancerExp();
        this._dataRender();
        if (detectmob()) {
            this.overItem = item;
            this.setTooltip(event);
        }


    }
}