import cdn from "vite-plugin-cdn-import";

export function cdnPlugin(isEnabled: string) {
  if (isEnabled === "true") {
    return cdn({
      modules: [
        {
          name: "vue", // Vue 库
          var: "Vue",
          path: "https://fastly.jsdelivr.net/npm/vue@3"
        },
        // {
        //   name: "pinia", // Pinia 库
        //   var: "Pinia",
        //   path: "https://cdn.jsdelivr.net/npm pinia@2.1.7/dist/pinia.iife.min.js"
        // },
        // {
        //   name: "axios", // Axios 库
        //   var: "axios",
        //   path: "https://cdn.jsdelivr.net/npm/axios@1.6.2/dist/axios.min.js"
        // },
        {
          name: "vue-router", // Vue Router 库
          var: "VueRouter",
          path: "https://fastly.jsdelivr.net/npm/vue-router@4"
        },
        {
          name: "vant", // Vant 库
          var: "Vant",
          path: "https://fastly.jsdelivr.net/npm/vant@4/lib/vant.min.js",
          css: "https://fastly.jsdelivr.net/npm/vant@4/lib/index.css"
        }
      ]
    });
  }
}
