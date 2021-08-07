// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    access?: string;
    username?: string;
    avatar?: string;
    id?: string;
    email?: string;
    signature?: string;
    nickname?: string;
    password?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    gender?: boolean;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    mobile?: string;
    deptId?: string;
    deleted?: boolean;
    status?: boolean;
    gmtCreate?: object;
    gmtModified?: object;
  };
  type Menu = {
    id?:number;


    name?:string;


    parentId?:number;


    path?:string;

    component?:string;


    redirect?:string;


    icon?:string;


    sort?:number;


    visible?:number;


    gmtCreate?:string;


    gmtModified?:string;
  };
  type CurrentMenu = {
    id?:number;
    key?:number;

    name?:string;


    parentId?:number;


    path?:string;

    component?:string;


    redirect?:string;


    icon?:string;


    sort?:number;


    visible?:number;


    gmtCreate?:string;


    gmtModified?:string;

    children?: CurrentMenu[];
  };

  type LoginResult = {
    access_token?: string;
    expires_in?: string;
    id?: string;
    jti?:string;
    refresh_token?:string;
    scope?:string;
    token_type?:string;
    isLogin?: true,
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    grant_type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
