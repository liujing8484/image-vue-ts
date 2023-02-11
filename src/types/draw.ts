export interface LineData {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    lineWidth: number,
    color: string,
}

export interface TextData {
    x: number,
    y: number,
    text: string,
    textAlign: CanvasTextAlign,
    font: string,
    color: string
}

export interface ArcData {
    x: number,
    y: number,
    color: string,
    lineWidth: number,
    radius: number,
}

export interface ContinueLineData {
    xs: number[],
    ys: number[],
    lineWidth: number,
    color: string
}
