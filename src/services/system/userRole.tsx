// @ts-ignore
import { request } from 'umi';

/** 获取角色 GET /api/currentUser */
export async function updateUserRole(params: { deptId: string; mobile: string; username: string; status: string }, options?: { [p: string]: any }) {
  return request<SYSTEM.Role>('/coinisi/coinisi-system/sys-user-role/updateUserRole', {
    method: 'POST',
    requestType: 'form',
    data: {
      'userId': params.deptId,
      'roleIds': params.status,
    },
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
