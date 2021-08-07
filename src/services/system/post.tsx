// @ts-ignore
import { request } from 'umi';

/** 获取角色 GET /api/currentUser */
export async function queryPost(params:SYSTEM.Post, options?: { [p: string]: any }) {

  return request<SYSTEM.Post>('/coinisi/coinisi-system/sys-post/queryPost', {
    method: 'GET',
    params: params,
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
/** 获取角色 GET /api/currentUser */
export async function updatePost(params:SYSTEM.Post, options?: { [p: string]: any }) {
  if(params.status == null){
    // @ts-ignore
    params.status =true;
  }
  return request<SYSTEM.Post>('/coinisi/coinisi-system/sys-post/update', {
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
export async function savePost(params:SYSTEM.Post, options?: { [p: string]: any }) {
   if(params.status == null){
     // @ts-ignore
     params.status =true;
   }
  return request<SYSTEM.Post>('/coinisi/coinisi-system/sys-post/save', {
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
export async function deletePost(params:SYSTEM.Post, options?: { [p: string]: any }) {
console.log("jiekou",params)
  return request<SYSTEM.Post>('/coinisi/coinisi-system/sys-post/delete', {
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
