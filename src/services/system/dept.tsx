import { request } from 'umi';
/** 获取部门树形化 GET /api/currentUser */
export async function selectTreeDept(options?: { [key: string]: any }) {
  return request<SYSTEM.SelectTree>('/coinisi/coinisi-system/sys-dept/getTree', {
    method: 'GET',
    ...(options || {}),
  }).then(function (res?: any) {
    return res.data;
  });
}

/**
 * 查询部门信息
 * @param options?
 */
export async function queryDept(params: { name: undefined; status: undefined }, options?: { [p: string]: any }) {
  return request<SYSTEM.Dept>('/coinisi/coinisi-system/sys-dept/tree', {
    method: 'GET',
    params:{
        'name': params.name,
        'status': params.status,
    },
    ...(options || {}),
  }).then(function (res?: any) {
    return res.data;
  });
}

/**
 * 添加部门信息
 * {
      'name': params.name,
      'sort': params.sort,
      'status': params.status,
      'mobile': params.mobile,
      'email': params.email,
      'leader': params.leader,
      'parentId': params.parentId,
    }
 * @param options?
 */
export async function addDept(params: SYSTEM.Dept, options?: { [p: string]: any }) {
  console.log(params)
  return request<SYSTEM.Dept>('/coinisi/coinisi-system/sys-dept/add', {
    method: 'POST',
    requestType: 'form',
    data:params,
    ...(options || {}),
  }).then(function (res?: any) {
    return res.data;
  });
}

/**
 * 更新部门信息
 * @param options?
 */
export async function updateDept(params:SYSTEM.Dept, options?: { [p: string]: any }) {
  return request<SYSTEM.Dept>('/coinisi/coinisi-system/sys-dept/update', {
    method: 'POST',
    requestType: 'form',
    data:params,
    ...(options || {}),
  }).then(function (res?: any) {
    return res.data;
  });
}export async function deleteDept(params:SYSTEM.Dept, options?: { [p: string]: any }) {
  return request<SYSTEM.Dept>('/coinisi/coinisi-system/sys-dept/delete', {
    method: 'DELETE',
    requestType: 'form',
    data:params,
    ...(options || {}),
  }).then(function (res?: any) {
    return res.data;
  });
}
