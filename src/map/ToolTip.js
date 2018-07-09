import {
    isString,
    isFunction,
    merge
} from './../common/util';
export default class ToolTip {
    constructor(toolDom) {
        this.dom = this.create(toolDom);
        this.tooltipTemplate = null;
        this.opts = {};
        this.hide();
    }
    create(toolDom) {
        let dom = document.createElement('div');
        dom.classList.add('inmap-tooltip');
        toolDom.appendChild(dom);
        return dom;
    }
    compileTooltipTemplate(formatter) {
        let RexStr = /\{|\}/g;
        formatter = formatter.replace(RexStr, function (MatchStr) {
            switch (MatchStr) {
                case '{':
                    return 'overItem.';
                case '}':
                    return '';
                default:
                    break;
            }

        });
        this.tooltipTemplate = new Function('overItem', 'return ' + formatter);
    }
    show(x, y) {
        let {
            left,
            top
        } = this.opts.offsets;
        this.dom.style.left = x + left + 'px';
        this.dom.style.top = y + top + 'px';
        this.dom.style.display = 'block';
    }
    showCenterText(text, x, y) {
        this.dom.innerHTML = text;
        this.dom.style.display = 'block';
        this.dom.style.visibility = 'hidden';
        let width = this.dom.offsetWidth;
        this.dom.style.left = x - (width / 2) + 'px';
        this.dom.style.top = y + 'px';
        this.dom.style.visibility = 'visible';
    }
    showText(text, x, y) {
        this.dom.innerHTML = text;
        this.dom.style.left = x + 'px';
        this.dom.style.top = y + 'px';
        this.dom.style.display = 'block';
    }
    hide() {
        this.dom.style.display = 'none';
    }
    setOption(opts) {
        let result = merge(this.opts, opts);
        let {
            formatter,
            customClass
        } = result;

        if (isString(formatter)) { //编译字符串
            this.compileTooltipTemplate(result.formatter);
        }

        if (this.opts.customClass) {
            this.dom.classList.remove(this.opts.customClass);
        }

        this.dom.classList.add(customClass);
        this.opts = result;
    }
    render(event, overItem) {
        if (!this.opts.show) return;
        if (overItem) {
            let formatter = this.opts.formatter;
            if (isFunction(formatter)) {
                this.dom.innerHTML = formatter(overItem);
            } else if (isString(formatter)) {
                this.dom.innerHTML = this.tooltipTemplate(overItem);
            }
            this.show(event.offsetX, event.offsetY);
        } else {
            this.hide();
        }

    }
}