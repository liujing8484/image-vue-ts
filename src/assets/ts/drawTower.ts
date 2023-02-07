import {PointsData, TowerPointData} from "@/types/site";

interface paramData {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
}

export class DrawTower {
    ctx: CanvasRenderingContext2D
    data: PointsData
    angle: number

    constructor(ctx: CanvasRenderingContext2D, data: PointsData) {
        this.ctx = ctx;
        this.data = data;
        this.angle = Math.PI / 6
    }

    draw() {
        this.data.list.forEach(v => {
            if (v.tower.tStyle == '直线') {
                this.draw_straight_tower(v)
            } else if (v.tower.tStyle == '耐张') {
                this.draw_Strain_tower(v);
            }
        })
    }

    // 绘制直线塔
    draw_straight_tower(v: TowerPointData) {
        this.draw_line({
            x1: v.x - 20,
            y1: v.y,
            x2: v.x + 20,
            y2: v.y,
            color: 'black'
        });
        this.draw_line({
            x1: v.x,
            y1: v.y - 20,
            x2: v.x,
            y2: v.y + 50,
            color: 'black'
        });
    }

    draw_line(param: paramData) {
        this.ctx.beginPath();
        this.ctx.moveTo(param.x1, param.y1);
        this.ctx.lineTo(param.x2, param.y2);
        this.ctx.strokeStyle = param.color;
        this.ctx.stroke();
        this.ctx.closePath();
    }
    // 绘制耐张塔
    draw_Strain_tower(v: TowerPointData) {
        this.draw_line({
            x1: v.x,
            y1: v.y,
            x2: v.x - 20 * Math.cos(this.angle),
            y2: v.y + 20 * Math.sin(this.angle),
            color: 'black'
        });
        this.draw_line({
            x1: v.x,
            y1: v.y,
            x2: v.x + 20 * Math.cos(this.angle),
            y2: v.y + 20 * Math.sin(this.angle),
            color: 'black'
        });
        this.draw_line({
            x1: v.x,
            y1: v.y - 20,
            x2: v.x,
            y2: v.y + 50,
            color: 'black'
        });
    }
}
