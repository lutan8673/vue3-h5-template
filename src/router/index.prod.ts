import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw, Router } from "vue-router";
declare const routers: Array<RouteRecordRaw>;

// 创建路由实例
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: routers
});

export default router;
