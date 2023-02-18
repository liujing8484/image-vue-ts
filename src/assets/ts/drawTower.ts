import {PointsData, TowerPointData} from "@/types/site";
import {draw_circle, draw_line, draw_rectangle, draw_text} from "@/utils/draw"


export class DrawTower {
    ctx: CanvasRenderingContext2D
    data: PointsData
    angle: number
    radius: number

    constructor(ctx: CanvasRenderingContext2D, data: PointsData) {
        this.ctx = ctx;
        this.data = data;
        this.angle = Math.PI / 6
        this.radius = 20
    }

    draw() {
        this.ctx.translate(50, -50)
        this.data.list.forEach(v => {
            // 绘制文字
            this.draw_tower_text(v);
            // 绘制塔图
            if (v.tower.tStyle == '直线') {
                this.draw_straight_tower(v)
            } else if (v.tower.tStyle == '耐张') {
                this.draw_Strain_tower(v);
            } else if (v.tower.tStyle == '牵引场' || v.tower.tStyle == '张力场') {
                this.draw_field(v);
            }
        })
        this.ctx.translate(-50, 50)
    }

    // 绘制直线塔
    draw_straight_tower(v: TowerPointData) {
        draw_line(this.ctx, {
            x1: v.x - 20,
            y1: v.y,
            x2: v.x + 20,
            y2: v.y,
            lineWidth: 2,
            color: 'black'
        });
        draw_line(this.ctx, {
            x1: v.x,
            y1: v.y - 20,
            x2: v.x,
            y2: v.y + 50,
            lineWidth: 2,
            color: 'black'
        });
    }

    // 绘制耐张塔
    draw_Strain_tower(v: TowerPointData) {
        draw_line(this.ctx, {
            x1: v.x,
            y1: v.y,
            x2: v.x - 20 * Math.cos(this.angle),
            y2: v.y + 20 * Math.sin(this.angle),
            lineWidth: 2,
            color: 'black'
        });
        draw_line(this.ctx, {
            x1: v.x,
            y1: v.y,
            x2: v.x + 20 * Math.cos(this.angle),
            y2: v.y + 20 * Math.sin(this.angle),
            lineWidth: 2,
            color: 'black'
        });
        draw_line(this.ctx, {
            x1: v.x,
            y1: v.y - 20,
            x2: v.x,
            y2: v.y + 50,
            lineWidth: 2,
            color: 'black'
        });
    }

    // 绘制张力场或牵引场
    draw_field(v: TowerPointData) {
        // 绘制第一个圆形
        draw_circle(this.ctx, {
            x: v.x,
            y: v.y + this.radius,
            color: 'black',
            lineWidth: 2,
            radius: this.radius
        });
        // 绘制长方形
        draw_rectangle(this.ctx, {
                x: v.x - this.radius - 7,
                y: v.y + this.radius * 2,
                width: this.radius * 2 + 14,
                height: 25,
                lineWidth: 2,
                color: 'black',
                isFill: false
            }
        )
    }

    // 绘制文字
    draw_tower_text(v: TowerPointData) {
        // 绘制塔号
        draw_text(this.ctx, {
            x: v.x + 20,
            y: v.y - 20,
            text: v.tower.tName,
            textAlign: "left",
            font: "bold 12px Consolas",
            color: '#033B3D'
        })
        // 绘制塔型
        draw_text(this.ctx, {
            x: v.x + 20,
            y: v.y - 10,
            text: v.tower.tType,
            textAlign: 'left',
            font: "normal 12px Consolas",
            color: '#0D4A3A'
        })
        // 绘制高程
        draw_text(this.ctx, {
            x: v.x + 20,
            y: v.y,
            text: `${Math.round(v.tower.altitude)}m`,
            textAlign: "left",
            font: "normal 10px Consolas",
            color: '#2D5731'
        })
    }

}
