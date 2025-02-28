import type { RouteRecordRaw } from "vue-router";
const route: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/custSearch"
  },
  {
    path: "/custSearch",
    name: "custSearch",
    component: () => import("@views/cust/custSearch/custSearch.vue"),
    meta: { title: "客户搜索" }
  }
];

export default route;
