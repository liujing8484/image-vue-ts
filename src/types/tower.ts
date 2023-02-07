export interface TowerData {
    id: number,
    tName: string,
    tType: string,
    tStyle: string,
    corner: string,
    altitude: number,
    remark: string
}

export class Tower {
    towerData: TowerData = {
        id: 0,
        tName: "string",
        tType: "string",
        tStyle: "string",
        corner: "string",
        altitude: 1000.0,
        remark: "string"
    }
}


