// @ts-ignore
import { request } from 'umi';

/** 获取角色 GET /api/currentUser */
export async function queryDict(params: { code: string;  name: string; status: string }, options?: { [p: string]: any }) {
  console.log("接口请求",params)
  return request<SYSTEM.Dict>('/coinisi/coinisi-system/sys-dict', {
    method: 'GET',
    params: {
      'code': params.code,
      'status': params.status,
      'name': params.name,
    },
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
/** 获取角色 GET /api/currentUser */
export async function addDict(params: SYSTEM.Dict, options?: { [p: string]: any }) {
  console.log("接口请求",params)
  return request<SYSTEM.Dict>('/coinisi/coinisi-system/sys-dict', {
    method: 'POST',
    requestType: 'form',
    data:params,
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
/** 获取角色 GET /api/currentUser */
export async function deleteDict(params: SYSTEM.Dict, options?: { [p: string]: any }) {
  console.log("接口请求 delete",params)
  return request<SYSTEM.Dict>('/coinisi/coinisi-system/sys-dict', {
    method: 'DELETE',
    requestType: 'form',
   data:params,
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
/** 获取角色 GET /api/currentUser */
export async function updateDict(params: SYSTEM.Dict, options?: { [p: string]: any }) {
  console.log("接口请求",params)
  return request<SYSTEM.Dict>('/coinisi/coinisi-system/sys-dict', {
    method: 'PUT',
    requestType: 'form',
    data:params,
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
