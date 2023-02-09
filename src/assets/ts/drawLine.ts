import {SizeData} from "@/types/site";
import {draw_line, draw_text} from "@/utils/draw";

export class DrawLine {
    ctx: CanvasRenderingContext2D
    data: SizeData
    step: number

    constructor(ctx: CanvasRenderingContext2D, data: SizeData) {
        this.ctx = ctx
        this.data = data
        this.step = 50
    }

    draw() {
        this.ctx.translate(50, -50);
        this.draw_horizontal_line();
        this.draw_vertical_line();
        this.draw_horizontal_text();
        this.draw_vertical_text();
        this.ctx.translate(-50, 50);
    }

    // 绘制横线
    draw_horizontal_line() {
        let n = 0;
        while (this.step * n < this.data.height) {
            const y = this.data.height - n * this.step;
            draw_line(this.ctx, {x1: 0, y1: y, x2: this.data.width, y2: y, color: 'grey'})
            n++;
        }
    }

    // 绘制竖线
    draw_vertical_line() {
        let n = 0;
        while (this.step * n < this.data.width) {
            const x = n * this.step;
            draw_line(this.ctx, {x1: x, y1: 0, x2: x, y2: this.data.height, color: 'grey'})
            n++;
        }
    }

    // 绘制横线文字
    draw_horizontal_text() {
        let n = 0;
        while (this.step * n < this.data.width) {
            const x = n * this.step;
            draw_text(this.ctx, {
                x: x,
                y: this.data.height + 20,
                text: String(x),
                textAlign: 'center',
                font: "bold 12px Consolas",
                color: 'grey'
            })
            n++;
        }
    }

    // 绘制横线文字
    draw_vertical_text() {
        let n = 0;
        while (this.step * n < this.data.height) {
            const y = this.data.height - n * this.step;
            const str = this.data.minY + n * this.step;
            draw_text(this.ctx, {
                x: -10,
                y: y,
                text: String(str / 5),
                textAlign: 'right',
                font: "bold 12px Consolas",
                color: 'grey'
            })
            n++;
        }
    }
}
