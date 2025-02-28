import type { RouteRecordRaw } from "vue-router";
const route: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/houseLoan"
  },
  {
    path: "/houseLoan",
    name: "houseLoan",
    component: () => import("@views/loan/houseLoan/example.vue"),
    meta: { title: "房贷" }
  }
];
export default route;
