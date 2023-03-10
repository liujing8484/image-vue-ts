export interface TowerData {
    id: number,
    tName: string,
    tType: string,
    tStyle: string,
    corner: string,
    altitude: number,
    remark: string
}

export interface BetData {
    btName: string,
    btSpan: number,
    remark: string,
    id: number
}

export interface AcrossData {
    acrossName: string,
    acrossX: number,
    acrossY: number,
    controlHeight: number,
    remark: string,
    id: number,
    bet: BetData
}

export interface TowerPointData {
    x: number,
    y: number,
    id: number,
    tower: TowerData,
    si: number
}

export interface CurvePointData {
    w: number,
    xs: string,
    ys: string,
    str: string,
    id: number,
    bet: BetData
}

export interface AcrossPointData {
    x: number,
    y: number,
    id: number,
    across: AcrossData,
}

export interface SizeData {
    width: number,
    height: number,
    minY: number
}

export interface PointsData {
    size: SizeData,
    list: TowerPointData[]
}

export class Points {
    size: SizeData = {
        width: 0,
        height: 0,
        minY: 0
    }
    list: TowerPointData[] = []
}

export class Points_tower {
    list: TowerPointData[] = []
}

export class Points_curve {
    list: CurvePointData[] = []
}

export class Points_across {
    list: AcrossPointData[] = []
}
