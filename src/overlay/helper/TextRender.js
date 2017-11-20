/**
 * 在地图中绘制文本
 *
 * author zhenjia.hao
 * date 20170725
 */

export class TextRender{
    constructor(opts) {
        const CONFIG = {
            show: false,
            formatter: null, //支持字符串模板，和回调函数
            textStyle: {
                color: '#fff',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: 'sans-serif',
                fontSize: 12
            }
        };

        let option = Object.assign({}, CONFIG, opts);

        this.opt = null;
        this.style = null;
        this._isShow = false;

        this.setOption(option);
    }
    setOption(option){
        this.opt = option;
        this.style = option.textStyle;
        this._isShow = option.show;
    }
    isShow(){
        return this._isShow;
    }
    _getFontStyle(){
        let style = this.style;

        return [
            style.fontStyle,
            style.fontWeight,
            style.fontSize + 'px',
            style.fontFamily
        ].join(' ');
    }
    getTextHeight(){
        return this.getFontSize();
    }
    getFontSize(){
        return this.style.fontSize;
    }
    getTextWidth(ctx, text){
        return ctx.measureText(text).width;
    }
    draw(ctx, text, position, textColor){
        let color = this.style.color,
            fontStyle = this._getFontStyle();

        ctx.font = fontStyle;
        ctx.fillStyle = textColor || color;
        ctx.fillText(text, position.x, position.y);
    }
	
}