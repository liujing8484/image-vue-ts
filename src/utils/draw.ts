import {ArcData, LineData, TextData} from "@/types/draw";

// 绘制直线
export const draw_line = (ctx: CanvasRenderingContext2D, param: LineData) => {
    ctx.beginPath();
    ctx.moveTo(param.x1, param.y1);
    ctx.lineTo(param.x2, param.y2);
    ctx.strokeStyle = param.color;
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
    ctx.arc(param.x, param.y, param.radius, 0, Math.PI * 2)
    ctx.stroke();
    ctx.closePath();
}
