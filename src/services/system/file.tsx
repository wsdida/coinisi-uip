import { request } from '@@/plugin-request/request';

/** 查询日志表 GET /api/currentUser */
export async function queryFileList(
  params: SYSTEM.File | undefined,
  options?: { [p: string]: any },
) {
  console.log('接口参数', params);
  return request<SYSTEM.ResponseData>('/coinisi/coinisi-system/sys-file/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any }) {
    // @ts-ignore
    return res.data;
  });
}
/** 查询日志表 GET /api/currentUser */
export async function deleteFile(params: SYSTEM.File | undefined, options?: { [p: string]: any }) {
  console.log('接口参数', params);
  return request<SYSTEM.ResponseData>('/coinisi/coinisi-system/sys-file/delete', {
    method: 'DELETE',
    requestType: 'form',
    data: params,
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any }) {
    // @ts-ignore
    return res.data;
  });
}
