import Color from '../common/Color';
import config from '../config/LegendConfig';
import {
    isArray,
    isString,
    isEmpty,
    isBoolean,
    merge
} from '../common/Util';
export default class Legend {
    constructor(toolDom, opts) {
        this._opts = opts || config;
        this._dom = this._crateDom(toolDom);
        this.hide();
    }
    _crateDom(toolDom) {
        let div = document.createElement('div');
        div.classList.add('inmap-legend');
        toolDom.appendChild(div);
        return div;
    }
    show() {
        this._dom.style.display = 'inline-block';
    }
    hide() {
        this._dom.style.display = 'none';
    }
    _toFixed(num) {
        return isNaN(num) ? num : parseFloat(num).toFixed(this._opts.toFixed);
    }
    setTitle(title) {
        this._opts.title = title;
        this._render();
    }
    setOption(opts) {
        this._opts = merge(config, this._opts, opts);
        this._opts.list = this._opts.list || [];
        this._render();
    }
    setItems(list) {
        this._opts.list = list;
        this._render();
    }
    _verify() {
        let {
            show,
            title,
            list,
        } = this._opts;
        if (!isBoolean(show)) {
            throw new TypeError('inMap: legend options show must be a Boolean');
        }
        if (!isEmpty(title) && !isString(title)) {
            throw new TypeError('inMap: legend options title must be a String');
        }
        if (!isArray(list)) {
            throw new TypeError('inMap: legend options list must be a Array');
        }


    }
    _render() {
        this._verify();
        let {
            show,
            title,
            list
        } = this._opts;
        if (show) {
            this.show();
        } else {
            this.hide();
            return;
        }

        let str = '';
        if (title) {
            str = `<div class="inmap-legend-title">${title} </div>`;
        }

        str += '<table cellpadding="0" cellspacing="0">';
        list.forEach((val, index) => {
            let text = null,
                backgroundColor = val.backgroundColor;
            let isShow = backgroundColor != null;
            let legendBg = new Color(backgroundColor),
                difference = 0.2;

            let opacity = val.opacity;
            if (opacity) {
                opacity += difference;
            }
            if (legendBg.a) {
                opacity = legendBg.a + difference;
            } else {
                opacity = 1;
            }
            backgroundColor = legendBg.getRgbaValue(opacity);
            if (val.text) {
                text = val.text;
            } else if (this._opts.formatter) {
                if (val.start == val.end) {
                    text = `${this._opts.formatter(val.start, index, val)}`;
                } else {
                    text = `${val.start==null?'-<span class="inmap-infinity"></span>': this._opts.formatter(val.start, index, val)} ~ ${ val.end==null ?'+<span class="inmap-infinity"></span>':this._opts.formatter(val.end, index, val)}`;
                }

            } else {
                //相等
                if (val.start == val.end) {
                    text = `${this._toFixed(val.start)}`;
                } else {
                    text = `${val.start==null?'-<span class="inmap-infinity"></span>': this._toFixed(val.start)} ~ ${ val.end==null ?'+<span class="inmap-infinity"></span>':this._toFixed(val.end)}`;
                }
            }
            let td = isShow ? ` <td style="background:${backgroundColor}; width:17px;"></td>` : '';
            str += `
                <tr>
                   ${td}
                    <td class="inmap-legend-text">
                       ${text}
                    </td>
                </tr>
                `;
        });
        str += '</table>';
        if (list.length <= 0) {
            this.hide();
        }
        this._dom.innerHTML = str;

    }
    dispose() {
        this._dom.parentNode.removeChild(this._dom);
        this._opts = null;
        this._dom = null;

    }
}