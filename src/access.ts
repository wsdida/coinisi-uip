/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access 权限配置
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  // @ts-ignore
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.access === 'root',
  };
}
