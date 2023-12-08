import { Get } from '../server.js'

export function getRoleList(params) {
  return Get('/AdvancedSearch/RoleItemList', params)
}

export const roleApi = {
  getRoleList
}
