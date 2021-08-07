// @ts-ignore
import { request } from 'umi';

/** 获取角色 GET /api/currentUser */
export async function queryList(params: { identification?: string; name?: string; status?: string }, options?: { [p: string]: any }) {

  return request<SYSTEM.Role>('/coinisi/coinisi-system/sys-role', {
    method: 'GET',
    params: {
      'identification': params.identification,
      'name': params.name,
      'status': params.status,
    },
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
/** 获取角色 GET /api/currentUser */
export async function selectRole(params?: { deptId: string; mobile: string; username: string; status: string }, options?: { [p: string]: any }) {

  // @ts-ignore
  return request<SYSTEM.SelectTree>('/coinisi/coinisi-system/sys-role/selectRole', {
    method: 'GET',
    params: {
      // @ts-ignore
      'userId': params.deptId,
    },
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
/** 更新角色 GET /api/currentUser */
export async function updateRole(params: {id?:String, identification?: string; name?: string; status?: string }, options?: { [p: string]: any }) {
  return request<SYSTEM.Role>('/coinisi/coinisi-system/sys-role', {
    method: 'POST',
    params: {
      'id' : params.id,
      'identification': params.identification,
      'name': params.name,
      'status': params.status,
    },
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
/** 更新角色 GET /api/currentUser */
export async function updateRoleMenu(params: { gmtModified: undefined; deleted: undefined; identification: undefined; name: undefined; id: undefined; sort: undefined; gmtCreate: undefined; menuIds: undefined; status: undefined }, options?: { [p: string]: any }) {
  // @ts-ignore
  return request<SYSTEM.Role>('/coinisi/coinisi-system/sys-role/update', {
    method: 'POST',
    requestType: 'form',
    data: {
      'id' : params.id,
      'identification': params.identification,
      'name': params.name,
      'status': params.status,
      'menuIds': params.menuIds,
      'sort': params.sort,
    },
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
/** 更新角色 GET /api/currentUser */
export async function insertRole(params: { identification: string; name: string; id: string; sort: string; menuIds: string; status: string }, options?: { [p: string]: any }) {
  return request<SYSTEM.Role>('/coinisi/coinisi-system/sys-role/save', {
    method: 'POST',
    requestType: 'form',
    data: {
      'id' : params.id,
      'identification': params.identification,
      'name': params.name,
      'status': params.status,
      'sort': params.sort,
      'menuIds': params.menuIds,
    },
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
/** 删除角色 GET /api/currentUser */
export async function deleteRole(params: SYSTEM.Role, options?: { [p: string]: any }) {
  return request<SYSTEM.Role>('/coinisi/coinisi-system/sys-role/delete', {
    method: 'DELETE',
    requestType: 'form',
    data: params,
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
/** 查询角色包含的菜单 GET /api/currentUser */
export async function queryRoleMenu(params: { identification: string; name: string; id: string; sort: string; menuIds: string; status: string }, options?: { [p: string]: any }) {
  // @ts-ignore
  return request('/coinisi/coinisi-system/sys-role-menu/queryRoleMenu', {
    method: 'GET',
    params: {
      'roleId' : params.id,
    },
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: []; }) {

    let menuData:Array<string> = new Array<string>()
    res.data.forEach(function(value:{roleId?: string,menuId?:string}, key, iterable) {
      if (value.menuId != null) {
        menuData.push(value.menuId);
      }
    });

    // @ts-ignore
    return menuData;
  });
}
