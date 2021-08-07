
// @ts-ignore
import { request } from 'umi';
import {MenuDataItem} from "@ant-design/pro-layout";

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/coinisi/coinisi-system/sys-user/getUser', {
    method: 'GET',
    ...(options || {}),
  });
}
// 获取菜单接口
export async function currentUserMenus(options?: { [key: string]: any }) {
  return request<MenuDataItem[]>('/coinisi/coinisi-system/sys-menu', {
    method: 'GET',
    ...(options || {}),
  });
}
// 获取菜单接口
export async function currentUserMenu(params: { visible: string; name: string }, options?: { [p: string]: any }) {
  console.log(params.visible)
  return request<API.CurrentMenu[]>('/coinisi/coinisi-system/sys-menu?visible='+params.visible+'&name='+params.name, {
    method: 'GET',
    requestType: 'form',
    data: {
      "name": params.name,
      "visible": params.visible,
    },
    ...(options || {}),
  }).then(function(response: any){

     return response;
  });
}
/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
 // console.dict(body.grant_type)\
  var a;
  try {
     a= request<API.LoginResult>('/coinisi/coinisi-auth/oauth/token', {
      method: 'POST',
      headers: {
        'Authorization': ' Basic Y2xpZW50OnNlY3JldA==',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
       requestType: 'form',
       data:{'grant_type': body.grant_type,
       'username': body.username,
         'password': body.password},
      ...(options || {}),
    });
  }catch (e) {

  }


  return a;
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
