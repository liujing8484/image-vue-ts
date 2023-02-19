import request from "@/http/index";

interface PassIndexData {
    index: number
}

// 获取铁塔的集合
export const get_towers = () => request({url: '/reader/get_towers', method: 'get'})
// 获取铁塔点的集合
export const get_point_towers = () => request({url: '/point/get_point_towers', method: 'get'})
// 获取尺寸
export const get_size = () => request({url: '/point/get_size', method: 'get'})
// 获取曲线点的集合
export const get_point_curve = (params: PassIndexData) => request({
    url: '/point/get_point_curve',
    method: 'get',
    params
})
// 获取第1和第2控制点的坐标
export const get_point_across_max = () => request({url: '/point/get_point_across_max', method: 'get'})
