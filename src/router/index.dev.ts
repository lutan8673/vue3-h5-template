import { createRouter, createWebHashHistory } from "vue-router";
import type {
  RouteRecordRaw,
  Router,
  RouteLocationNormalized
} from "vue-router";
import login from "@/login.vue";
import home from "@/home.vue";
import NProgress from "@/utils/progress";
import { useCachedViewStoreHook } from "@/store/modules/cached-view";
import setPageTitle from "@/utils/set-page-title";

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string;
    keepAlive?: boolean;
  };
}

const routers: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: { title: "登录" }
  },
  {
    path: "/home",
    name: "home",
    component: home,
    meta: { title: "主页" }
  }
];

// 动态加载router子文件夹中的 .js和.ts 文件
const loadRoutesFromFolder = async () => {
  const modules = import.meta.glob([
    "@/router/*/**/*.js",
    "@/router/*/**/*.ts"
  ]);
  const allRoutes: Array<RouteRecordRaw> = [];

  for (const path in modules) {
    const relativePath = path.match(/\/([^\/]+)\.(js|ts)$/)[1];

    const moduleRoutes = (await modules[path]()) as {
      default: RouteRecordRaw | RouteRecordRaw[];
    }; // 动态导入模块
    const routes = Array.isArray(moduleRoutes.default)
      ? moduleRoutes.default
      : [moduleRoutes.default];

    routes.forEach(route => {
      if (!/^\/$/.test(route.path)) {
        allRoutes.push(route);
      }
    });
  }

  return allRoutes;
};

const createAppRouter = async () => {
  const loadedRoutes: RouteRecordRaw[] = await loadRoutesFromFolder();
  routers.push(...loadedRoutes);

  // 创建路由实例
  return createRouter({
    history: createWebHashHistory(),
    routes: routers
  });
};

const router: Router = await createAppRouter();

router.beforeEach((to: toRouteType, from, next) => {
  NProgress.start();
  // 路由缓存
  useCachedViewStoreHook().addCachedView(to);
  // 页面 title
  setPageTitle(to.meta.title);
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
