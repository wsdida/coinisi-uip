// @ts-ignore
import { request } from 'umi';


/** 查询日志表 GET /api/currentUser */
export async function queryList(params:{'current':number;'size':number;'loginName':string;'system':string;'ids':string},options?: { [key: string]: any }) {
  console.log("接口参数",params);
  return request<SYSTEM.ResponseData>('/coinisi/coinisi-system/sys-log/list', {
    method: 'GET',
    params:params,
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}/** 删除日志信息 GET /api/currentUser */
export async function removes(params:{'ids':string},options?: { [key: string]: any }) {
  return request<SYSTEM.Log>('/coinisi/coinisi-system/sys-log/removes', {
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
