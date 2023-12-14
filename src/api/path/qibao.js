import { Get } from '../server.js'

// 获取角色列表
export function getRoleList(params) {
  return Get('/AdvancedSearch/RoleItemList', params)
}

// 获取角色详情
export function getRoleDetail(id, params) {
  return Get(`/Buy/GetItemInfoXMLByItemId/${id}`, params)
}

// 获取区组区域
export function getAreaList(params) {
  return Get('/Navigation/GetAreaList', params)
}

// 获取区组列表
export function getGameList(params) {
  return Get('/AdvancedSearch/GameServerList', params)
}

export const roleApi = {
  getRoleList, getAreaList, getGameList,
  getRoleDetail
}
