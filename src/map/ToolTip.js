import {
    isString,
    isFunction,
    merge
} from './../common/util';
export default class ToolTip {
    constructor(toolDom) {
        this._dom = this._create(toolDom);
        this._tooltipTemplate = null;
        this._opts = {};
        this.hide();
    }
    _create(toolDom) {
        let dom = document.createElement('div');
        dom.classList.add('inmap-tooltip');
        toolDom.appendChild(dom);
        return dom;
    }
    _compileTooltipTemplate(formatter) {
        //语法解析 先暂时不支持ie11
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
        this._tooltipTemplate = new Function('overItem', 'return ' + formatter);
    }
    show(x, y) {
        let {
            left,
            top
        } = this._opts.offsets;
        this._dom.style.left = x + left + 'px';
        this._dom.style.top = y + top + 'px';
        this._dom.style.display = 'block';
    }
    showCenterText(text, x, y) {
        this._dom.innerHTML = text;
        this._dom.style.display = 'block';
        this._dom.style.visibility = 'hidden';
        let width = this._dom.offsetWidth;
        this._dom.style.left = x - (width / 2) + 'px';
        this._dom.style.top = y + 'px';
        this._dom.style.visibility = 'visible';
    }
    showText(text, x, y) {
        this._dom.innerHTML = text;
        this._dom.style.left = x + 'px';
        this._dom.style.top = y + 'px';
        this._dom.style.display = 'block';
    }
    hide() {
        this._dom.style.display = 'none';
    }
    setOption(opts) {
        let result = merge(this._opts, opts);
        let {
            formatter,
            customClass
        } = result;

        if (isString(formatter)) { //编译字符串
            this._compileTooltipTemplate(result.formatter);
        }

        if (this._opts.customClass) {
            this._dom.classList.remove(this._opts.customClass);
        }

        this._dom.classList.add(customClass);
        this._opts = result;
    }
    render(event, overItem) {
        if (!this._opts.show) return;
        if (overItem) {
            let formatter = this._opts.formatter;
            if (isFunction(formatter)) {
                this._dom.innerHTML = formatter(overItem);
            } else if (isString(formatter)) {
                this._dom.innerHTML = this._tooltipTemplate(overItem);
            }
            this.show(event.offsetX, event.offsetY);
        } else {
            this.hide();
        }

    }
}