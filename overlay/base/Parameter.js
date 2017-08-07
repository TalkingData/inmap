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
        this.tooltip = ops.tooltip;
        this.legend = ops.legend;
        this.event = ops.event || {};
        this.style = ops.style || {};
        this.points = ops.data;
        this.multiSelect = ops.multiSelect;
        this.selectItem = []; //选中
        this.overItem = null; //悬浮
        this.workerData = []; //缓存woker 转换后的数据

        this.tooltipDom = null; //悬浮弹层
        this.tooltipTemplate = null;

        this.selectedExp = {
            show: false,
            exp: null,

        }
    }
    /**
     * 根据用户配置，设置用户绘画样式
     * @param {*} item 
     */
    setDrawStyle(item) {
        let normal = this.style.normal, //正常样式
            mouseOverStyle = this.style.mouseOver, //悬浮样式
            selectedStyle = this.style.selected; //选中样式
        let shadowColor = {};
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

        if (mouseOverStyle && this.overItem == item) {
            if (mouseOverStyle.shadowBlur != null && mouseOverStyle.shadowColor == null) {
                // debugger
                shadowColor["shadowColor"] = this.brightness(result.backgroundColor, 0.1);
            }
            //  debugger
            Object.assign(result, normal, mouseOverStyle, {
                size: size * mouseOverStyle.scale,
                backgroundColor: this.brightness(result.backgroundColor, 0.1)
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
        }


    }
    compileSplitList(data) {
        let colors = this.style.colors;
        if (colors.length < 0) return;
        //  debugger
        data = data.sort((a, b) => {
            return parseInt(a.count) - parseInt(b.count);
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

                end = data[i].count;
                split.push({
                    start: star,
                    end: end,
                    backgroundColor: colors[colorIndex],
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
            })

        }

        this.style.splitList = split;
        this.setlegend(this.legend, this.style.splitList || []);
    }
    setWorkerData(val) {
        this.workerData = val;
        if (this.filterFun) {
            this.selectItem = this.workerData.filter(this.filterFun);
        }

    }
    parserExp(exp) {
        // debugger
        if (exp) {
            this.selectedExp.show = true;
            this.selectedExp.exp = exp;
            this.filterFun = new Function('item', 'with(item){ return ' + exp + ' }');
        } else {
            this.cancerExp();
        }

    }
    setCenterAndZoom(geo, exp) {
        let arr = [];
        geo.forEach(val => {
            arr.push(new BMap.Point(val[0], val[1]))

        });
        let view = this.map.getViewport(arr);
        let me = this;

        function zoomEnd() {
            // debugger
            me.map.removeEventListener("zoomend", zoomEnd);
            me.map.panTo(view.center);
        }

        function moveend() {
            // debugger
            me.map.removeEventListener("moveend", moveend);
            me.parserExp(exp)
            if (me.workerData.length > 0) {
                me.selectItem = me.workerData.filter(me.filterFun);
                me._dataRender();
            }
        }
        let scale = view.zoom - 1;
        this.map.addEventListener("zoomend", zoomEnd);
        this.map.addEventListener("moveend", moveend);
        if (this.map.getZoom() == scale) {
            zoomEnd();
        } else {
            this.map.setZoom(scale);
        }

    }
    cancerExp() {
        this.selectedExp.show = false;
        this.selectedExp.exp = null;
        this.filterFun = null;
    }
    /**
     * 设置选中
     * @param {*} exp  表达式
     */
    setSelectd(exp) {
        // debugger
        //  this.multiSelect = true; //默认开启多选模式

        this.parserExp(exp)
        // this.selectedExp.show = true;
        // this.selectedExp.xp = exp;
        // let filterFun = new Function('item', 'with(item){ return ' + exp + ' }');

        if (this.points.length > 0) {
            let filterFun = new Function('item', 'with(item){ return ' + exp + ' }');
            let temp = this.points.filter(filterFun);
            // debugger
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
        if (!this.tooltip.show) return;

        if (this.tooltipDom == null) {
            this.tooltipDom = document.createElement('div');
            this.tooltipDom.classList.add('tooltip');
            // this.tooltipDom.style.cssText = "position: fixed; display: none; pointer-events :none; border-style: solid;white-space: nowrap;z-index: 9999999;transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1), top 0.4s cubic-bezier(0.23, 1, 0.32, 1);background-color: rgba(50, 50, 50, 0.7);border-width: 0px;border-color: rgb(51, 51, 51);border-radius: 4px;color: rgb(255, 255, 255);font-style: normal;font-variant: normal;font-weight: normal;font-stretch: normal;font-size: 14px;font-family: sans-serif;line-height: 21px;padding: 5px;left: 323px;top: 451px;"
            this.map._inMapOption.toolDom.appendChild(this.tooltipDom);
        }
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
        this.container.parentNode.removeChild(this.tooltipDom);
        this.tooltipDom = null;
    }
    /**
     * 设置图例
     */
    setlegend(legend, splitList) {
        if (legend == null || legend.show == false) return;

        let legendData = legend.data;
        let ul = this.map._inMapOption.toolDom.querySelector('ul.legend');
        if (ul == null) {
            ul = document.createElement('ul');
            ul.classList.add('legend')
            this.map._inMapOption.toolDom.appendChild(ul);
        }

        let str = "";
        if (legend.title) {
            str = `<li class='title'>${legend.title}</li>`;
        }
        let legendFunc = this.legend.formatter; //回调 设置复杂显示
        splitList.forEach(function (val, index, arr) {
            let text = null;
            if (legendData) {
                text = isFunction(legendFunc) ? legendFunc(val.start, val.end) : legendData[index];
            } else {
                text = `${val.start} ~ ${ val.end==null ?"<span class='infinity'>∞</span>":val.end}`;
            }
            str += `
            <li class='item'>
                <span class='bg' style="background: ${val.backgroundColor};"></span>
                <span>${text}</span>
            </li>`;
        });
        ul.style.display = splitList.length == 0 ? 'none' : 'block';
        ul.innerHTML = str;

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
        this.setTooltip(event);

    }
    triggerClick() {
        this.event.onMouseClick && this.event.onMouseClick(this.selectItem, {
            x: event.clientX,
            y: event.clientY
        });
    }
    tMouseClick(event) {
        //debugger
        let result = this.getTarget(event.pixel.x, event.pixel.y);
        if (result.index == -1) {
            return;
        }
        let item = result.item;
        if (this.selectItemContains(item)) {
            this.multiSelect && this.deleteSelectItem(item); //二次点击取消选中
            this.triggerClick();

        } else {
            if (this.multiSelect) {
                this.selectItem.push(result.item);
            } else {
                this.selectItem = [result.item];
            }

        }

        //debugger
        if (this.selectItem.length > 0) {
            this.swopData(result.index, item);
            this.triggerClick();
        }
        this.cancerExp();
        this._dataRender();

    }
}