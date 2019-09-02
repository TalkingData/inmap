import {
    isString,
    isFunction,
    merge
} from '../common/Util';
export default class Tooltip {
    constructor(toolDom) {
        this._dom = this._create(toolDom);
        this._tooltipTemplate = null;
        this._opts = {};
        this.isShow = null;
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
    show(x, y, text) {
        let {
            left,
            top
        } = this._opts.offsets;
        this._dom.innerHTML = text;
        this._dom.style.left = x + left + 'px';
        this._dom.style.top = y + top + 'px';
        this._show();
    }

    showText(text, x, y) {
        this._dom.innerHTML = text;
        this._dom.style.left = x + 'px';
        this._dom.style.top = y + 'px';
        this._show();
    }
    _show() {
        if (this.isShow != true) {
            this.isShow = true;
            this._dom.style.display = 'block';
        }
    }
    hide() {
        if (this.isShow != false) {
            this.isShow = false;
            this._dom.style.display = 'none';
        }

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
            let text = null;
            if (isFunction(formatter)) {
                text = formatter(overItem);
            } else if (isString(formatter)) {
                text = this._tooltipTemplate(overItem);
            }
            this.show(event.offsetX, event.offsetY, text);
        } else {
            this.hide();
        }

    }
    dispose() {
        this._dom.parentNode.removeChild(this._dom);
        this._tooltipTemplate = null;
        this._opts = null;
        this._dom = null;
    }
}