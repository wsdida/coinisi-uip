// @ts-ignore
import { request } from 'umi';

/** 获取角色 GET /api/currentUser */
export async function queryUser(params: { deptId?: string; username?: string; mobile?: string;status?: string;current?: string;size?: string }, options?: { [p: string]: any }) {
 if(params.current==''){
   params.current = '1';
 } if(params.size==''){
   params.size = '3';
 }
  return request<SYSTEM.ResponseData>('/coinisi/coinisi-system/sys-user/queryUser', {
    method: 'GET',
    params: {
      'deptId': params.deptId,
      'username': params.username,
      'mobile': params.mobile,
      'status': params.status,
      'current': params.current,
      'size': params.size,
    },
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
/** 获取角色 GET /api/currentUser */
export async function addUser(params: SYSTEM.User, options?: { [p: string]: any }) {

  return request<SYSTEM.User>('/coinisi/coinisi-system/sys-user', {
    method: 'POST',
    requestType: 'form',
    data: params,
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
/** 获取角色 GET /api/currentUser */
export async function updateUser(params: SYSTEM.User, options?: { [p: string]: any }) {

  return request<SYSTEM.User>('/coinisi/coinisi-system/sys-user', {
    method: 'PUT',
    requestType: 'form',
    data: params,
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
/** 获取角色 GET /api/currentUser */
export async function deleteUser(params: string, options?: { [p: string]: any }) {
  console.log(params)
  return request<SYSTEM.User>('/coinisi/coinisi-system/sys-user/delete', {
    method: 'GET',
    params: {
      'id': params,
    },
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
