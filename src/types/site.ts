export interface TowerData {
    id: number,
    tName: string,
    tType: string,
    tStyle: string,
    corner: string,
    altitude: number,
    remark: string
}

export interface TowerPointData {
    x: number,
    y: number,
    id: number,
    tower: TowerData
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
