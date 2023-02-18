import {CurvePointData, Points_curve} from "@/types/site";
import {draw_continue_line} from "@/utils/draw";

export class DrawCurve {
    ctx: CanvasRenderingContext2D
    data: Points_curve
    index: number

    constructor(ctx: CanvasRenderingContext2D, data: Points_curve, index: number) {
        this.ctx = ctx;
        this.data = data;
        this.index = index;
    }

    draw() {
        this.ctx.translate(50, -50);
        this.data.list.forEach(v => {
            this.draw_curve(v);
        });
        this.ctx.translate(-50, 50);
    }

    // 绘制单档的曲线
    draw_curve(v: CurvePointData) {
        let lineWidth: number
        let color: string
        // console.log(v.bet.id)
        if (v.bet.id < this.index) {
            lineWidth = 2;
            color = 'blue'
        } else {
            lineWidth = 0.5;
            color = 'black'
        }
        draw_continue_line(this.ctx, {
            xs: JSON.parse(v.xs),
            ys: JSON.parse(v.ys),
            lineWidth: lineWidth,
            color: color,
            isFill: false
        })
    }
}
