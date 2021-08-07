import { request } from 'umi';
/** 上传图片 POST /api/currentUser */
export async function UploadFile(options?: { [key: string]: any }) {
  return request<SYSTEM.SelectTree>('/coinisi/coinisi-system/common/file', {
    method: 'POST',
    ...(options || {}),
  }).then(function (res?: any) {
    return res.data;
  });
}
