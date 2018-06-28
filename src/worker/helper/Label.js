export default class Label {
    constructor(x, y, radius, height, byteWidth, name) {
        this.center = {
            x,
            y
        }; //中心坐标
        this.virtualReact = {
            maxX: 0,
            maxY: 0,
            minX: 0,
            minY: 0,
            width: 0,
            height: 0
        };
        this.show = true; //是否显示 
        this.text = name;
        this.textReact = {
            width: 0,
            height: 0
        };
        this.radius = radius + 2; //间距
        this.padding = 0;
        this.aIndex = 0;
        this._getRectangle(height * 1.1, byteWidth - 0.6);
    }
    getCurrentRect() {
        let result = null;
        switch (this.aIndex.toString()) {
            case '0':
                result = this._getRightAnchor();
                break;
            case '1':
                result = this._getBottomAnchor();
                break;
            case '2':
                result = this._getLeftAnchor();
                break;
            case '3':
                result = this._getTopAnchor();
                break;
            default:
                result = this._getCenterRectange();
                break;

        }
        return result;

    }
    next() {
        this.aIndex++;
        if (this.aIndex > 3) {
            this.show = false;
        }
        return this.getCurrentRect();

    }
    _getTrueLength(str) { //获取字符串的真实长度（字节长度）
        let len = str.length,
            truelen = 0;
        for (let x = 0; x < len; x++) {
            if (str.charCodeAt(x) > 128) {
                truelen += 2;
            } else {
                truelen += 1;
            }
        }
        return truelen;
    }
    /**
     * 判断分位是否相交
     * @param {*} target 
     */
    isAnchorMeet(target) {
        let react = this.getCurrentRect(),
            targetReact = target.getCurrentRect();
        if ((react.minX < targetReact.maxX) && (targetReact.minX < react.maxX) &&
            (react.minY < targetReact.maxY) && (targetReact.minY < react.maxY)) {
            return true;
        }
        return false;
    }
    _getCenterRectange() {
        return {
            minX: this.center.x - this.radius,
            maxX: this.center.x + this.radius,
            minY: this.center.y - this.radius,
            maxY: this.center.y + this.radius
        };
    }
    _getRectangle(height, byteWidth) {
        let width = this._getTrueLength(this.text) * byteWidth;
        this.textReact = {
            width: width + this.padding * 2,
            height: height
        };

    }
    _getLeftAnchor() {

        let x = this.center.x - this.radius - this.textReact.width,
            y = this.center.y - this.textReact.height / 2,
            diam = this.radius * 2,
            maxH = diam > this.textReact.height ? diam : this.textReact.height;
        return {
            x,
            y,
            minX: x,
            maxX: this.center.x + this.radius,
            minY: this.center.y - maxH / 2,
            maxY: this.center.y + maxH / 2
        };
    }
    _getRightAnchor() {
        let x = this.center.x + this.radius,
            y = this.center.y - this.textReact.height / 2,
            diam = this.radius * 2,
            maxH = diam > this.textReact.height ? diam : this.textReact.height;
        return {
            x,
            y,
            minX: this.center.x - this.radius,
            maxX: this.center.x + this.radius + this.textReact.width,
            minY: this.center.y - maxH / 2,
            maxY: this.center.y + maxH / 2
        };
    }
    _getTopAnchor() {
        let x = this.center.x - this.textReact.width / 2,
            y = this.center.y - this.radius - this.textReact.height,
            diam = this.radius * 2,
            maxW = diam > this.textReact.width ? diam : this.textReact.width;
        return {
            x,
            y,
            minX: this.center.x - maxW / 2,
            maxX: this.center.x + maxW / 2,
            minY: this.center.y - this.radius - this.textReact.height,
            maxY: this.center.y + this.radius
        };

    }
    _getBottomAnchor() {
        let x = this.center.x - this.textReact.width / 2,
            y = this.center.y + this.radius,
            maxW = this.radius > this.textReact.width ? this.radius : this.textReact.width;
        return {
            x,
            y,
            minX: this.center.x - maxW / 2,
            maxX: this.center.x + maxW / 2,
            minY: this.center.y - this.radius,
            maxY: this.center.y + this.radius + this.textReact.height
        };
    }


}