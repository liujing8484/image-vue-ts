import {TowerData} from "@/types/tower";

export interface PowerTowerData {
    si: number,
    sis: string,
    id: number,
    tower: TowerData
}

export class PowerTowerInit {
    power_tower: PowerTowerData = {
        si: 0,
        sis: '',
        id: 0,
        tower: {
            id: 0,
            tName: "string",
            tType: "string",
            tStyle: "string",
            corner: "string",
            altitude: 1000.0,
            remark: "string"
        }
    }
}

export class Powers_across {
    list: PowerTowerData[] = []
}
