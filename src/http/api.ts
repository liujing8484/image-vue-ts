import request from "@/http/index";


export const get_point_towers = () => request({url: '/point/get_point_towers', method: 'get'})

export const get_size = () => request({url: '/point/get_size', method: 'get'})
// 获取曲线点的集合
export const get_point_curve = () => request({url: '/point/get_point_curve', method: 'get'})
