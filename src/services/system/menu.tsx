// @ts-ignore
import { request } from 'umi';
/** 获取菜单树形化 GET /api/currentUser */
export async function selectTreeMenu(options?: { [key: string]: any }) {
  return request<SYSTEM.SelectTree>('/coinisi/coinisi-system/sys-menu/getSelectTreeMenu', {
    method: 'GET',
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
/*  添加菜单*/
export async function addMenu(body: API.Menu,options?: { [key: string]: any }) {
  console.log(options)
   if(body.parentId==null){
     body.parentId =0;
   }

  return request<SYSTEM.SelectTree>('/coinisi/coinisi-system/sys-menu', {
    method: 'POST',
    requestType: 'form',
    data: {
      'id': body.id,
      'name': body.name,
      'parentId': body.parentId,
      'icon': body.icon,
      'sort': body.sort,
      'component': body.component,
      'path': body.path,
      'redirect':body.redirect,
      'visible': body.visible,

    },
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {

    // @ts-ignore
    return res.data;
  });
}
/*  编辑菜单*/
export async function editMenu(body: API.Menu,options?: { [key: string]: any }) {
  console.log(options)
  return request<SYSTEM.SelectTree>('/coinisi/coinisi-system/sys-menu/update', {
    method: 'POST',
    requestType: 'form',
    data: {
      'id': body.id,
      'name': body.name,
      'parentId': body.parentId,
      'icon': body.icon,
      'sort': body.sort,
      'component': body.component,
      'path': body.path,
      'redirect':body.redirect,
      'visible': body.visible,

    },
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {

    // @ts-ignore
    return res.data;
  });
}

/** 删除菜单 DELETE /api/currentUser */
export async function deleteMenu(params:string,options?: { [key: string]: any }) {
  return request<SYSTEM.SelectTree>('/coinisi/coinisi-system/sys-menu', {
    method: 'DELETE',
    params: {"id": params} ,
    ...(options || {}),
    // @ts-ignore
  }).then(function (res: { data: any; }) {
    // @ts-ignore
    return res.data;
  });
}
