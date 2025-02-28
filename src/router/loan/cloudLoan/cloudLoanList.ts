import type { RouteRecordRaw } from "vue-router";
const route: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/cloudLoanList"
  },
  {
    path: "/cloudLoanList",
    name: "cloudLoanList",
    component: () => import("@views/loan/cloudLoan/cloudLoanList/example.vue"),
    meta: { title: "云贷视图列表" }
  }
];

export default route;
