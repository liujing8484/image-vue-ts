import {TowerData} from "@/types/tower";

export class HomeData {
    select_tower: TowerData = {
        id: 0,
        tName: "string",
        tType: "string",
        tStyle: "string",
        corner: "string",
        altitude: 1000.0,
        remark: "string"
    }
    lst_tower: TowerData[] = []
}
