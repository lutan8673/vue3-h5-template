import { createApp } from "vue";
import { store } from "@/store";
// import Vant from "vant";
// normalize.css
import "normalize.css/normalize.css";
// 全局样式
import "@/styles/index.less";
// tailwindcss
import "@/styles/tailwind.css";
// svg icon
import "virtual:svg-icons-register";
import { initializeDarkMode } from "@/utils/dark-mode";
import App from "@/App.vue";
import router from "@/router/index.prod";

initializeDarkMode();

const app = createApp(App);
app.use(store);
app.use(router);

// app.use(Vant);

// 通过 CDN 引入时不会自动注册 Lazyload 组件
// app.use(Vant.Lazyload);

app.mount("#app");
