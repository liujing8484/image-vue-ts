import {ArcData, ContinueLineData, LineData, RectangleData, TextData} from "@/types/draw";

// 绘制直线
export const draw_line = (ctx: CanvasRenderingContext2D, param: LineData) => {
    ctx.beginPath();
    ctx.moveTo(param.x1, param.y1);
    ctx.lineTo(param.x2, param.y2);
    ctx.strokeStyle = param.color;
    ctx.lineWidth = param.lineWidth;
    ctx.stroke();
    ctx.closePath();
}
// 绘制文本
export const draw_text = (ctx: CanvasRenderingContext2D, param: TextData) => {
    ctx.beginPath();
    ctx.font = param.font;
    ctx.fillStyle = param.color;
    ctx.textAlign = param.textAlign;
    ctx.fillText(param.text, param.x, param.y);
    ctx.stroke();
    ctx.closePath();
}
// 绘制圆型
export const draw_circle = (ctx: CanvasRenderingContext2D, param: ArcData) => {
    ctx.beginPath();
    ctx.arc(param.x, param.y, param.radius, 0, Math.PI * 2);
    ctx.strokeStyle = param.color;
    ctx.lineWidth = param.lineWidth;
    ctx.stroke();
    ctx.closePath();
}
// 绘制连续的直线
export const draw_continue_line = (ctx: CanvasRenderingContext2D, param: ContinueLineData) => {
    ctx.beginPath();
    for (let i = 0; i < param.xs.length; i++) {
        ctx.lineTo(param.xs[i], param.ys[i]);
    }
    ctx.strokeStyle = param.color;
    ctx.lineWidth = param.lineWidth;
    ctx.stroke();
    ctx.closePath();
}
// 绘制矩形
export const draw_rectangle = (ctx: CanvasRenderingContext2D, param: RectangleData) => {
    ctx.beginPath();
    ctx.moveTo(param.x, param.y);
    ctx.lineTo(param.x + param.width, param.y);
    ctx.lineTo(param.x + param.width, param.y + param.height);
    ctx.lineTo(param.x, param.y + param.height);
    ctx.lineTo(param.x, param.y);
    ctx.lineWidth = param.lineWidth;
    ctx.strokeStyle = param.color
    ctx.stroke();
    ctx.closePath();
}
