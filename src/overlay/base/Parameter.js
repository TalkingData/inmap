import deepmerge from 'deepmerge';
import baseConfig from './../../config/parameterConfig';
import {
    WhiteLover,
    Blueness
} from "./../../config/mapStyle";
import {
    CanvasOverlay
} from './CanvasOverlay';
import {
    Color
} from './../../common/Color';
import {
    isFunction,
    isString,
    encodeHTML
} from './../../common/util';


/**
 * 接头定义 参数解析类
 */
export class Parameter extends CanvasOverlay {
    constructor(ops) {
        super();
        this._setOptionStyle(baseConfig, ops);
        this.points = ops.data;
        this.multiSelect = ops.multiSelect;
        this.selectItem = []; //选中
        this.overItem = null; //悬浮
        this.workerData = []; //缓存woker 转换后的数据

        this.tooltipDom = null; //悬浮弹层
        this.legendDom = null; //图例
        this.tooltipTemplate = null;

        this.selectedExp = {
            show: false,
            exp: null,
        }
    }

    _setOptionStyle(config, ops) {
        // debugger
        let opstion = deepmerge.all([config,
            {
                event: this.event || {}
            },
            ops||{}
        ]);
        // debugger
        this.tooltip = opstion.tooltip;
        this.legend = opstion.legend;
        this.labelStyle = opstion.label;
        this.event = opstion.event;
        this.style = opstion.style;

        //设置皮肤
        if (opstion.skin && this.map) {
            let setStyle = opstion.skin == 'Blueness' ? Blueness : WhiteLover;
            // debugger
            this.map.setMapStyle({
                styleJson: setStyle
            });
        }
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
        Object.assign(result, normal);
        //区间样式
        let splitList = this.style.splitList;
        for (let i = 0; i < splitList.length; i++) {
            let condition = splitList[i];
            if (condition.end == null) {
                if (item.count >= condition.start) {
                    Object.assign(result, normal, condition);
                    break;
                }
            } else if (item.count >= condition.start && item.count < condition.end) {
                Object.assign(result, normal, condition);
                break;
            }
        }
        let size = result.size;
        let shadowColor = {};

        if (mouseOverStyle && this.overItem == item) {
            //  debugger
            if (mouseOverStyle.shadowBlur != null && mouseOverStyle.shadowColor == null) {
                //  debugger
                shadowColor["shadowColor"] = this.brightness(result.backgroundColor, 50);
            }
            // debugger
            Object.assign(result, normal, mouseOverStyle, {
                size: size * mouseOverStyle.scale,
                backgroundColor: mouseOverStyle.backgroundColor || this.brightness(result.backgroundColor, 0.1)
            }, shadowColor);
        }
        if (selectedStyle && this.selectItemContains(item)) {
            if (selectedStyle.shadowBlur != null && selectedStyle.shadowColor == null) {
                shadowColor["shadowColor"] = this.brightness(selectedStyle.backgroundColor, 0.1);
            }
            Object.assign(result, normal, selectedStyle, {
                size: size * mouseOverStyle.scale
            }, shadowColor);
        }
        //  debugger
        if (this.labelStyle.show) {
            result = deepmerge.all([{
                label: this.labelStyle
            }, result]);
        }
        return result;

    }
    /**
     * 亮度效果
     */
    brightness(rgba, delta) {
        // debugger
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
    /**
     * 查询选中列表的索引
     * @param {*} item 
     */
    findIndexSelectItem(item) {
        //这个需要子类去实现  
        //原因 点 线  面 的数据结构不同  判断依据也不相同
        return -1;
    }
    deleteSelectItem(item) {
        let index = this.findIndexSelectItem(item);
        index > -1 && this.selectItem.splice(index, 1);
    }
    compileTemplate(formatter) {
        formatter = "`" + formatter.replace(/\{/g, '${overItem.') + "`";
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
    compileSplitList(data) {
        let colors = this.style.colors;
        if (colors.length < 0) return;
        //  debugger
        data = data.sort((a, b) => {
            return parseFloat(a.count) - parseFloat(b.count);
        });
        let splitCount = data.length / colors.length;
        let colorIndex = 0;
        let split = [];
        let star = 0,
            end = 0;
        //debugger
        for (let i = 0; i < data.length; i++) {

            if (i > splitCount * (colorIndex + 1)) {
                if (split.length == 0) {
                    star = data[0].count;
                }
                // debugger
                end = data[i].count;
                // debugger
                split.push({
                    start: star,
                    end: end,
                    backgroundColor: colors[colorIndex],
                    borderColor: this.style.normal.borderColor || this.getColorOpacity(colors[colorIndex])
                })
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
            })

        }

        this.style.splitList = split;
        this.setlegend(this.legend, this.style.splitList);
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
    setSelectd(exp, scale) {
        // debugger
        if (this.points.length > 0) {
            let filterFun = new Function('item', 'with(item){ return ' + exp + ' }');
            let temp = this.points.filter(filterFun);
            //  debugger
            if (temp.length > 0) {
                this.setCenterAndZoom(temp[0].geo, exp, scale); //default first
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
        // debugger
        if (this.tooltipDom == null) {
            this.tooltipDom = document.createElement('div');
            this.tooltipDom.classList.add('tooltip');
            this.map._inmapOption.toolDom.appendChild(this.tooltipDom);
        }
        if (!this.tooltip.show) {
            this.tooltipDom.style.display = 'none';
            return;
        };
        if (this.overItem) {
            let formatter = this.tooltip.formatter;
            let overItem = this.overItem;
            if (isFunction(formatter)) {
                this.tooltipDom.innerHTML = formatter(overItem);
            } else if (isString(formatter)) {
                if (!this.tooltipTemplate) { //编译
                    this.compileTemplate(formatter);
                }
                // debugger
                this.tooltipDom.innerHTML = this.tooltipTemplate(overItem)
            }
            this.tooltipDom.style.left = event.clientX + 'px';
            this.tooltipDom.style.top = event.clientY + 'px';
            this.tooltipDom.style.display = 'block'
        } else {
            this.tooltipDom.style.display = 'none';
        }

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
        //  debugger
        if (legend == null || legend.show == false) {
            if (this.legendDom) {
                this.legendDom.style.display = 'none';
            }
            return;
        }

        let legendData = legend.data;
        if (this.legendDom == null) {
            let ul = document.createElement('ul');
            ul.classList.add('legend')
            this.map._inmapOption.toolDom.appendChild(ul);
            this.legendDom = ul;
        }

        let str = "";
        if (legend.title) {
            str = `<li class='title'>${legend.title}</li>`;
        }
        let legendFunc = this.legend.formatter; //回调 设置复杂显示
        let me = this;
        splitList.forEach(function (val, index, arr) {
            let text = null;
            if (legendData) {
                text = isFunction(legendFunc) ? legendFunc(me.toFixed(val.start), me.toFixed(val.end)) : legendData[index];
            } else {
                text = `${me.toFixed(val.start)} ~ ${ val.end==null ?"<span class='infinity'>∞</span>":me.toFixed(val.end)}`
            }
            str += `
            <li class='item'>
                <span class='bg' style="background: ${val.backgroundColor};"></span>
                <span>${text}</span>
            </li>`;
        });
        this.legendDom.style.display = splitList.length == 0 ? 'none' : 'block';
        this.legendDom.innerHTML = str;

    }
    toFixed(num) {
        return parseFloat(num).toFixed(this.legend.toFixed);
    }
    /**
     * 判断触发源
     */
    getTarget(x, y) {
        //需要子类去实现 
        return {
            item: null,
            index: -1
        }
    }
    /**
     * 绘画
     */
    _dataRender() {
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
        //debugger
        let result = this.getTarget(event.pixel.x, event.pixel.y);
        let temp = result.item;
        if (temp != this.overItem) { //防止过度重新绘画
            this.overItem = temp;
            if (temp) {
                this.swopData(result.index, result.item);
            }
            this._dataRender();
        }
        if (temp) {
            this.map.setDefaultCursor("pointer");
        } else {
            this.map.setDefaultCursor("default");
        }
        this.setTooltip(event);

    }
    triggerClick() {
        //  debugger
        this.event.onMouseClick && this.event.onMouseClick(this.selectItem, {
            x: event.clientX,
            y: event.clientY
        });
    }
    tMouseClick(event) {

        let result = this.getTarget(event.pixel.x, event.pixel.y);
        if (result.index == -1) {
            return;
        }
        // debugger
        let item = result.item;
        if (this.multiSelect) {
            if (this.selectItemContains(item)) {
                this.deleteSelectItem(item); //二次点击取消选中
            } else {
                this.selectItem.push(result.item);
            }

        } else {
            this.selectItem = [result.item];
        }
        
        this.swopData(result.index, item);
        this.triggerClick();
        this.cancerExp();
        this._dataRender();

    }
}