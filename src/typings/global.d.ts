import type { RouteLocationNormalized } from "vue-router";
// 定义全局类型
declare global {
  interface Window {
    // 在这里添加你需要的全局类型定义
    myCustomProperty: string;
  }

  interface toRouteType extends RouteLocationNormalized {
    meta: {
      title?: string;
      keepAlive?: boolean;
    };
  }
}

export {};
