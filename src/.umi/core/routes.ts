// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'D:/wenstormworkspace/coinisi-ui/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@ant-design/pro-layout/es/PageLoading';

export function getRoutes() {
  const routes = [
  {
    "path": "/umi/plugin/openapi",
    "component": dynamic({ loader: () => import(/* webpackChunkName: '.umi__plugin-openapi__openapi' */'D:/wenstormworkspace/coinisi-ui/src/.umi/plugin-openapi/openapi.tsx'), loading: LoadingComponent})
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: '.umi__plugin-layout__Layout' */'D:/wenstormworkspace/coinisi-ui/src/.umi/plugin-layout/Layout.tsx'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/~demos/:uuid",
        "layout": false,
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'D:/wenstormworkspace/coinisi-ui/node_modules/@umijs/preset-dumi/lib/theme/layout'), loading: LoadingComponent})],
        "component": (props) => React.createElement(
        dynamic({
          loader: async () => {
            const { default: getDemoRenderArgs } = await import(/* webpackChunkName: 'dumi_demos' */ 'D:/wenstormworkspace/coinisi-ui/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
            const { default: Previewer } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi-theme-default/es/builtins/Previewer.js');
            const { default: demos } = await import(/* webpackChunkName: 'dumi_demos' */ '@@/dumi/demos');
            const { usePrefersColor } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi/theme');

            return props => {
              
      const renderArgs = getDemoRenderArgs(props, demos);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
            }
          }
        }), props)
      },
      {
        "path": "/_demos/:uuid",
        "redirect": "/~demos/:uuid"
      },
      {
        "__dumiRoot": true,
        "layout": false,
        "path": "/~docs",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'D:/wenstormworkspace/coinisi-ui/node_modules/@umijs/preset-dumi/lib/theme/layout'), loading: LoadingComponent}), dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'D:/wenstormworkspace/coinisi-ui/node_modules/dumi-theme-default/es/layout.js'), loading: LoadingComponent})],
        "routes": [
          {
            "path": "/~docs",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'README.md' */'D:/wenstormworkspace/coinisi-ui/README.md'), loading: LoadingComponent}),
            "exact": true,
            "meta": {
              "locale": "en-US",
              "order": null,
              "filePath": "README.md",
              "updatedTime": 1627722392000,
              "componentName": "coinisi-ui",
              "slugs": [
                {
                  "depth": 1,
                  "value": "Ant Design Pro",
                  "heading": "ant-design-pro"
                },
                {
                  "depth": 2,
                  "value": "Environment Prepare",
                  "heading": "environment-prepare"
                },
                {
                  "depth": 2,
                  "value": "Provided Scripts",
                  "heading": "provided-scripts"
                },
                {
                  "depth": 3,
                  "value": "Start project",
                  "heading": "start-project"
                },
                {
                  "depth": 3,
                  "value": "Build project",
                  "heading": "build-project"
                },
                {
                  "depth": 3,
                  "value": "Check code style",
                  "heading": "check-code-style"
                },
                {
                  "depth": 3,
                  "value": "Test code",
                  "heading": "test-code"
                },
                {
                  "depth": 2,
                  "value": "More",
                  "heading": "more"
                }
              ],
              "title": "Ant Design Pro"
            },
            "title": "Ant Design Pro"
          },
          {
            "path": "/~docs/components",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'components__index.md' */'D:/wenstormworkspace/coinisi-ui/src/components/index.md'), loading: LoadingComponent}),
            "exact": true,
            "meta": {
              "filePath": "src/components/index.md",
              "updatedTime": 1627722392000,
              "title": "业务组件",
              "sidemenu": false,
              "slugs": [
                {
                  "depth": 1,
                  "value": "业务组件",
                  "heading": "业务组件"
                },
                {
                  "depth": 2,
                  "value": "Footer 页脚组件",
                  "heading": "footer-页脚组件"
                },
                {
                  "depth": 2,
                  "value": "HeaderDropdown 头部下拉列表",
                  "heading": "headerdropdown-头部下拉列表"
                },
                {
                  "depth": 2,
                  "value": "HeaderSearch 头部搜索框",
                  "heading": "headersearch-头部搜索框"
                },
                {
                  "depth": 3,
                  "value": "API",
                  "heading": "api"
                },
                {
                  "depth": 2,
                  "value": "NoticeIcon 通知工具",
                  "heading": "noticeicon-通知工具"
                },
                {
                  "depth": 3,
                  "value": "NoticeIcon API",
                  "heading": "noticeicon-api"
                },
                {
                  "depth": 3,
                  "value": "NoticeIcon.Tab API",
                  "heading": "noticeicontab-api"
                },
                {
                  "depth": 3,
                  "value": "NoticeIconData",
                  "heading": "noticeicondata"
                },
                {
                  "depth": 2,
                  "value": "RightContent",
                  "heading": "rightcontent"
                }
              ],
              "group": {
                "path": "/~docs/components",
                "title": "Components"
              }
            },
            "title": "业务组件"
          }
        ],
        "title": "ant-design-pro",
        "component": (props) => props.children
      },
      {
        "path": "/user",
        "layout": false,
        "routes": [
          {
            "path": "/user",
            "routes": [
              {
                "name": "login",
                "path": "/user/login",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__Login' */'D:/wenstormworkspace/coinisi-ui/src/pages/user/Login'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          }
        ]
      },
      {
        "path": "/log",
        "name": "日志管理",
        "routes": [
          {
            "path": "/log/loginLog",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__management__loginLog' */'D:/wenstormworkspace/coinisi-ui/src/pages/management/loginLog'), loading: LoadingComponent}),
            "name": "loginLog",
            "exact": true
          },
          {
            "path": "/log/operateLog",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__management__operateLog' */'D:/wenstormworkspace/coinisi-ui/src/pages/management/operateLog'), loading: LoadingComponent}),
            "name": "operateLog",
            "exact": true
          }
        ]
      },
      {
        "path": "/admin",
        "name": "系统管理",
        "routes": [
          {
            "path": "/admin/user",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__management__user' */'D:/wenstormworkspace/coinisi-ui/src/pages/management/user'), loading: LoadingComponent}),
            "name": "user",
            "exact": true
          },
          {
            "path": "/admin/menu",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__management__menu' */'D:/wenstormworkspace/coinisi-ui/src/pages/management/menu'), loading: LoadingComponent}),
            "name": "menu",
            "exact": true
          },
          {
            "path": "/admin/role",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__management__role' */'D:/wenstormworkspace/coinisi-ui/src/pages/management/role'), loading: LoadingComponent}),
            "name": "role",
            "exact": true
          },
          {
            "path": "/admin/dept",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__management__dept' */'D:/wenstormworkspace/coinisi-ui/src/pages/management/dept'), loading: LoadingComponent}),
            "name": "dept",
            "exact": true
          },
          {
            "path": "/admin/post",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__management__post' */'D:/wenstormworkspace/coinisi-ui/src/pages/management/post'), loading: LoadingComponent}),
            "name": "post",
            "exact": true
          },
          {
            "path": "/admin/operateLog",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__management__operateLog' */'D:/wenstormworkspace/coinisi-ui/src/pages/management/operateLog'), loading: LoadingComponent}),
            "name": "log",
            "exact": true
          },
          {
            "path": "/admin/dict",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__management__dict' */'D:/wenstormworkspace/coinisi-ui/src/pages/management/dict'), loading: LoadingComponent}),
            "name": "dict",
            "exact": true
          },
          {
            "path": "/admin/dictItem",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__management__dictItem' */'D:/wenstormworkspace/coinisi-ui/src/pages/management/dictItem'), loading: LoadingComponent}),
            "name": "dictItem",
            "exact": true
          },
          {
            "path": "/admin/post",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__management__post' */'D:/wenstormworkspace/coinisi-ui/src/pages/management/post'), loading: LoadingComponent}),
            "name": "post",
            "exact": true
          }
        ]
      },
      {
        "path": "/welcome",
        "name": "welcome",
        "icon": "smile",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'D:/wenstormworkspace/coinisi-ui/src/pages/Welcome'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/admin",
        "name": "admin",
        "icon": "crown",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Admin' */'D:/wenstormworkspace/coinisi-ui/src/pages/Admin'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/admin/sub-page",
            "name": "sub-page",
            "icon": "smile",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'D:/wenstormworkspace/coinisi-ui/src/pages/Welcome'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "name": "list.table-list",
        "icon": "table",
        "path": "/list",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TableList' */'D:/wenstormworkspace/coinisi-ui/src/pages/TableList'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/",
        "redirect": "/welcome",
        "exact": true
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/wenstormworkspace/coinisi-ui/src/pages/404'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
