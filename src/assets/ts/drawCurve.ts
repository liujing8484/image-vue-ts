import {CurvePointData, Points_curve} from "@/types/site";
import {draw_continue_line} from "@/utils/draw";

export class DrawCurve {
    ctx: CanvasRenderingContext2D
    data: Points_curve

    constructor(ctx: CanvasRenderingContext2D, data: Points_curve) {
        this.ctx = ctx;
        this.data = data
    }

    draw() {
        this.ctx.translate(50,-50);
        this.data.list.forEach(v => {
            this.draw_curve(v);
        });
        this.ctx.translate(-50,50);
    }

    // 绘制单档的曲线
    draw_curve(v: CurvePointData) {
        draw_continue_line(this.ctx, {xs: JSON.parse(v.xs), ys: JSON.parse(v.ys), lineWidth: 0.5, color: 'black'})
    }
}
