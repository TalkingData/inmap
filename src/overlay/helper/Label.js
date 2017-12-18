export class Label {
    constructor(ctx, ops) {
        this.center = ops.pixel; //中心坐标
        this.virtualReact = {
            maxX: 0,
            maxY: 0,
            minX: 0,
            minY: 0,
            width: 0,
            height: 0
        };
        this.show = true; //是否显示
        this.ctx = ctx;
        this.text = ops.name;
        this.textReact = {
            width: 0,
            height: 0
        };
        this.radius = 2; //间距
        this.padding = 1;

        this.aIndex = 0;
        this._getRectangle();


    }
    getCurrentRect() {
        let result = null;
        switch (this.aIndex.toString()) {
            case "0":
                result = this._getRightAnchor();
                break;
            case "1":
                result = this._getBottomAnchor();
                break;
            case "2":
                result = this._getLeftAnchor();
                break;
            case "3":
                result = this._getTopAnchor();
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
    _getRectangle() {
        let textReact = this.ctx.measureText(this.text);
        let fontSize = 15;
        this.textReact = {
            width: textReact.width + this.padding * 2,
            height: fontSize + this.padding * 2
        };

    }
    _getLeftAnchor() {
        return {
            minX: this.center.x - this.radius - this.textReact.width - this.padding,
            maxX: this.center.x - this.radius + this.padding,
            minY: this.center.y - this.textReact.height / 2,
            maxY: this.center.y + this.textReact.height / 2,
        };
    }
    _getRightAnchor() {
        return {
            minX: this.center.x + this.radius,
            maxX: this.center.x + this.radius + this.textReact.width,
            minY: this.center.y - this.textReact.height / 2,
            //minY: this.center.y,
            maxY: this.center.y + this.textReact.height / 2
        };
    }
    _getTopAnchor() {
        return {
            minX: this.center.x - this.textReact.width / 2,
            maxX: this.center.x + this.textReact.width / 2,
            minY: this.center.y - this.radius - this.textReact.height,
            maxY: this.center.y - this.radius
        };

    }
    _getBottomAnchor() {
        return {
            minX: this.center.x - this.textReact.width / 2,
            maxX: this.center.x + this.textReact.width / 2,
            minY: this.center.y + this.radius,
            maxY: this.center.y + this.radius + this.textReact.height
        };
    }


}