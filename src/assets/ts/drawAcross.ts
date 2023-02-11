import {AcrossPointData, Points_across} from "@/types/site";
import {draw_circle, draw_text} from "@/utils/draw";

export class DrawAcross {
    ctx: CanvasRenderingContext2D
    data: Points_across

    constructor(ctx: CanvasRenderingContext2D, data: Points_across) {
        this.ctx = ctx;
        this.data = data;
    }

    draw() {
        this.ctx.translate(50, -50);
        /*
            这里我们应该区分第一控制点和第二控制点：
            1 第1控制点应该更大，红色。
            2 第2控制点应该小些，黑色。
         */
        const [v1, v2] = this.data.list;
        this.draw_across(v1, 'red', 6);
        this.draw_across(v2, 'black', 4);
        // 绘制文字
        this.draw_text(v1);
        this.draw_text(v2);
        this.ctx.translate(-50, 50);
    }

    // 绘制控制点
    draw_across(v: AcrossPointData, color: string, radius: number) {
        draw_circle(this.ctx, {x: v.x, y: v.y, color: color, lineWidth: 1, radius: radius});
        draw_circle(this.ctx, {x: v.x, y: v.y, color: color, lineWidth: 1, radius: radius * 2});
    }

    // 绘制文字
    draw_text(v: AcrossPointData) {
        draw_text(this.ctx, {
            x: v.x + 15,
            y: v.y - 5,
            text: v.across.acrossName,
            textAlign: 'left',
            font: "bold 12px Consolas",
            color: '#033B3D'
        })
        draw_text(this.ctx, {
            x: v.x + 15,
            y: v.y + 5,
            text: `${v.across.acrossY}m`,
            textAlign: 'left',
            font: "bold 10px Consolas",
            color: '#2D5731'
        })
    }
}
