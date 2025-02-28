import { createFilter } from "vite";

let buildData, env;
const indexReg = new RegExp("src/router/index.prod.ts$");

export default function routerImportPlugin() {
  return {
    name: "router-import-plugin",

    config(config, { mode }) {
      env = mode;
      buildData = config.data;
    },

    transform(code, id) {
      if (env !== "production") {
        return null;
      }
      // 使用 createFilter 来过滤需要处理的文件
      const filter = createFilter(indexReg);

      if (!filter(id)) {
        return null; // 如果不是目标文件，直接返回
      }

      let routerPath = `@/router/${buildData.module}/${buildData.name}.ts`;

      const importStr = `import routers from '${routerPath}';\n`;
      const transformedCode = importStr + code;

      return {
        code: transformedCode,
        map: null // 如果需要 source map，可以生成一个
      };
    }
  };
}
