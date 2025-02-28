import type { RouteRecordRaw } from "vue-router";
const route: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/cloudLoanView"
  },
  {
    path: "/cloudLoanView",
    name: "cloudLoanView",
    component: () => import("@views/loan/cloudLoan/cloudLoanView/example.vue"),
    meta: { title: "云贷视图" }
  }
];

export default route;
