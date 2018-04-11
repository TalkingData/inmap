import {
    Color
} from './../common/Color';
import {
    isArray,
    isString,
    isEmpty,
    isBoolean,
    merge
} from './../common/util';
export default class Legend {
    constructor(toolDom, opts) {
        this.opts = opts || {};
        this.dom = this.crateDom(toolDom);
        this.hide();
    }
    crateDom(toolDom) {
        let div = document.createElement('div');
        div.classList.add('inmap-legend');
        toolDom.appendChild(div);
        return div;
    }
    show() {
        this.dom.style.display = 'block';
    }
    hide() {
        this.dom.style.display = 'none';
    }
    toFixed(num) {
        return isNaN(num) ? num : parseFloat(num).toFixed(this.opts.toFixed);
    }
    setTitle(title) {
        this.opts.title = title;
        this.render();
    }
    setOption(opts) {
        this.opts = merge(this.opts, opts);
        this.render();
    }
    setItems(list) {
        this.opts.list = list;
        this.render();
    }
    _verify() {
        let {
            show,
            title,
            list,
        } = this.opts;
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
    render() {
        this._verify();
        let {
            show,
            title,
            list
        } = this.opts;
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
            backgroundColor = legendBg.getRgbaStyle(opacity);
            if (val.text) {
                text = val.text;
            } else if (this.opts.formatter) {
                text = this.opts.formatter(this.toFixed(val.start), this.toFixed(val.end), index);
            } else {
                text = `${this.toFixed(val.start)} ~ ${ val.end==null ?'<span class="inmap-infinity"></span>':this.toFixed(val.end)}`;
            }

            str += `
                <tr>
                    <td style="background:${backgroundColor}; width:17px;"></td>
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
        this.dom.innerHTML = str;

    }
}