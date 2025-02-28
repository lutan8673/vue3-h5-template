import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import mockDevServerPlugin from "vite-plugin-mock-dev-server";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";
import { enableCDN } from "./build/cdn";
import routerImportPlugin from "./build/routerImportPlugin";

// 当前工作目录路径
const root: string = process.cwd();

export default defineConfig(({ mode }) => {
  // 环境变量
  const env = loadEnv(mode, root, "");
  let entryFile: string;
  if (mode === "production") {
    entryFile = "build/main.prod.ts";
  } else {
    entryFile = "build/main.dev.ts";
  }
  return {
    root: "./",
    base: env.VITE_PUBLIC_PATH || "./",
    plugins: [
      routerImportPlugin(),
      vue(),
      vueJsx(),
      mockDevServerPlugin(),
      // vant 组件自动按需引入
      Components({
        dts: "src/typings/components.d.ts",
        resolvers: [VantResolver()]
      }),
      // svg icon
      createSvgIconsPlugin({
        // 指定图标文件夹
        iconDirs: [path.resolve(root, "src/icons/svg")],
        // 指定 symbolId 格式
        symbolId: "icon-[dir]-[name]"
      }),
      // 生产环境 gzip 压缩资源
      // viteCompression(),
      // 注入模板数据
      createHtmlPlugin({
        minify: false,
        entry: entryFile,
        inject: {
          data: {
            ENABLE_ERUDA: env.VITE_ENABLE_ERUDA || "false"
          }
        }
      }),
      // 生产环境默认不启用 CDN 加速
      enableCDN(env.VITE_CDN_DEPS)
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@views": fileURLToPath(new URL("./src/views", import.meta.url))
      }
    },
    server: {
      host: "localhost", // 指定服务器主机名
      port: 8888, // 指定服务器端口
      hmr: true, // 开启热更新
      // open: true,
      // 仅在 proxy 中配置的代理前缀， mock-dev-server 才会拦截并 mock
      // doc: https://github.com/pengzhanbo/vite-plugin-mock-dev-server
      proxy: {
        "^/dev-api": {
          target: ""
        }
      }
    },
    build: {
      outDir: path.resolve(__dirname, "dist"), // 指定输出路径
      assetsInlineLimit: 4096, //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求
      emptyOutDir: true, //Vite 会在构建时清空该目录
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true, // 生产环境去除 console
          drop_debugger: true // 生产环境去除 debugger
        },
        format: {
          comments: false // 删除注释
        }
      },
      rollupOptions: {
        // input: "index.html",
        output: {
          assetFileNames: "[ext]/[name]-[hash].[ext]", //静态文件输出的文件夹名称
          chunkFileNames: "js/[name]-[hash].js", //chunk包输出的文件夹名称
          entryFileNames: "js/main-[hash].js", //入口文件输出的文件夹名称
          compact: true,
          manualChunks: id => {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          }
        }
      }
    }
  };
});
