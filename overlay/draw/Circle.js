export class Circle {
    constructor(ctx) {
        //debugger
        this.context = ctx;
        this.radius = 10;
    }
    setContext(ctx) {
        this.context = ctx;
    };
    draw(pixels, drawOptions, margin) {
        for (var i = 0, len = pixels.length; i < len; i++) {
            var pixel = pixels[i];
            var size = typeof drawOptions.size === 'function' ? drawOptions.size(pixel.count) : drawOptions.size;
            var lineWidth = typeof drawOptions.lineWidth === "function" ? drawOptions.lineWidth(pixel.count) : drawOptions.lineWidth;
            var fillStyle = typeof drawOptions.fillStyle === "function" ? drawOptions.fillStyle(pixel.count) : drawOptions.fillStyle;
            var strokeStyle = typeof drawOptions.strokeStyle === "function" ? drawOptions.strokeStyle(pixel.count) : drawOptions.strokeStyle;
            this.drawCircle(pixel.x + margin, pixel.y + margin, size, fillStyle, lineWidth, strokeStyle);
        }
    };
    drawCircle(x, y, radius, color, lineWidth, strokeStyle) {
        var ctx = this.context;
        radius = radius || 10;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        ctx.fill();
        if (lineWidth) {
            ctx.lineWidth = lineWidth;
            if (strokeStyle) {
                ctx.strokeStyle = strokeStyle;
            }
            ctx.stroke();
        }
    }
}