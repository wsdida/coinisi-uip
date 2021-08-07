import { request } from 'umi';

/** 获取字典列表 GET /api/currentUser */
export async function queryDictItem(params: { dictCode: string;  name: string; status: string }, options?: { [p: string]: any }) {
  console.log("接口请求",params)
  return request<SYSTEM.DictItem>('/coinisi/coinisi-system/sys-dict-item/queryDictItem', {
    method: 'GET',
    params: {
      'dictCode': params.dictCode,
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
/** 获取字典列表 GET /api/currentUser */
export async function insertDictItem(params: SYSTEM.DictItem, options?: { [p: string]: any }) {
  console.log("接口请求",params)
  return request<SYSTEM.DictItem>('/coinisi/coinisi-system/sys-dict-item/save', {
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
/** 获取字典列表 GET /api/currentUser */
export async function updateDictItem(params: SYSTEM.DictItem, options?: { [p: string]: any }) {
  console.log("接口请求",params)
  return request<SYSTEM.DictItem>('/coinisi/coinisi-system/sys-dict-item/update', {
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
/** 获取字典列表 GET /api/currentUser */
export async function deleteDictItem(params: SYSTEM.DictItem, options?: { [p: string]: any }) {
  console.log("接口请求",params)
  return request<SYSTEM.DictItem>('/coinisi/coinisi-system/sys-dict-item/delete', {
    method: 'DELETE',
    requestType: 'form',
    data: {'id':params},
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
