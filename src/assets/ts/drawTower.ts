import {PointsData, TowerPointData} from "@/types/site";

interface LineData {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
}

interface TextData {
    x: number,
    y: number,
    text: string,
    font: string,
    color: string
}

interface ArcData {
    x: number,
    y: number,
    radius: number,
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

    // 绘制直线
    draw_line(param: LineData) {
        this.ctx.beginPath();
        this.ctx.moveTo(param.x1, param.y1);
        this.ctx.lineTo(param.x2, param.y2);
        this.ctx.strokeStyle = param.color;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    // 绘制文本
    draw_text(param: TextData) {
        this.ctx.beginPath();
        this.ctx.font = param.font;
        this.ctx.fillStyle = param.color;
        this.ctx.fillText(param.text, param.x, param.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    // 绘制圆型
    draw_circle(param: ArcData) {
        this.ctx.beginPath();
        this.ctx.arc(param.x, param.y, param.radius, 0, Math.PI * 2)
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

    // 绘制文字
    draw_tower_text(v: TowerPointData) {
        // 绘制塔号
        this.draw_text({
            x: v.x + 20,
            y: v.y - 20,
            text: v.tower.tName,
            font: "bold 12px Consolas",
            color: '#033B3D'
        })
        // 绘制塔型
        this.draw_text({
            x: v.x + 20,
            y: v.y - 10,
            text: v.tower.tType,
            font: "normal 12px Consolas",
            color: '#0D4A3A'
        })
        // 绘制高程
        this.draw_text({
            x: v.x + 20,
            y: v.y,
            text: `${Math.round(v.tower.altitude)}m`,
            font: "normal 12px Consolas",
            color: '#2D5731'
        })
    }

    draw_field(v: TowerPointData) {
        // 绘制第一个圆形
        this.draw_circle({
            x: v.x,
            y: v.y,
            radius: 20
        })

    }
}
