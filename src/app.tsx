import type { Settings as LayoutSettings, MenuDataItem } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { notification } from 'antd';
import {getToken} from '../src/utils/TokenUtil'

// @ts-ignore
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
// @ts-ignore
import { history, Link } from 'umi';
import RightContent from './components/RightContent';
import Footer from '@/components/Footer';
import {
  currentUser as queryCurrentUser,
  currentUserMenus as queryCurrentMenu
} from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};




export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  currentMenu?: MenuDataItem[];
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  fetchMenu?: () => Promise<MenuDataItem[] | undefined>;
}> {
   const fetchUserInfo = async () => {
    try {

      const user = await queryCurrentUser();

      // @ts-ignore
      const currentUser = user.data;
      return currentUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  const fetchMenu = async () => {
    try {
      const currentMenu = await queryCurrentMenu();
      return currentMenu;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
     const currentUser = await fetchUserInfo();
         const currentMenu = await fetchMenu();
    return {
      fetchUserInfo,
      fetchMenu,
      currentUser,
      currentMenu,
      settings: {},
    };
  }
  return {
   // fetchUserInfo,
    fetchMenu,
    settings: {},
  };
}


export const request: RequestConfig = {
  errorHandler: (error: any) => {
    const { response ,data} = error;
    if(data&&data.error === 'invalid_grant') {
      notification.error({
        description: data.error,
        message: data.error_description,
      });
  }else if(!response){
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
    }
    throw error;
  },
};
// 添加token
// @ts-ignore
request.headers={
  'Authorization': `Bearer ${getToken()}`,
}
// @ts-ignore
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  // @ts-ignore
  return {

    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.username,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // console.dict(initialState?.currentUser)
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>openAPI 文档</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    menuDataRender: () => {

      return initialState?.currentMenu || [];
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
