<script setup lang="ts">
import { reactive } from "vue";
import GridPatternDashed from "@/components/grid-pattern/grid-pattern-dashed.vue";

defineOptions({
  name: "home"
});

const contentList = reactive([
  { text: "⚡ Vue3 + Vite5", fullWidth: false },
  { text: "🍕 TypeScript", fullWidth: false },
  { text: "✨ Vant4 组件库", fullWidth: false },
  { text: "🍍 Pinia 状态管理", fullWidth: false },
  { text: "🌀 Tailwindcss 原子类框架", fullWidth: true },
  { text: "🗺️ Vue-router 4", fullWidth: false },
  { text: "📏 vmin 视口适配", fullWidth: false },
  { text: "📡 Axios 封装", fullWidth: false },
  { text: "🛠️ 开发 Mock 数据", fullWidth: false }
]);
</script>

<template>
  <GridPatternDashed />
  <div class="demo-content px-[12px]">
    <img
      class="block w-[120px] mx-auto mb-[30px] pt-[40px]"
      alt="Vue logo"
      src="@/assets/logo_vue3_ts.png"
    />
    <div
      class="text-[14px] py-[12px] px-[20px] rounded-[12px] bg-[var(--color-block-background)] mt-[14px]"
    ></div>

    <div
      class="mt-[16px] pb-[24px] grid grid-cols-2 gap-[12px] text-[14px] text-center"
    >
      <div
        v-for="item in contentList"
        :key="item.text"
        :class="[
          'truncate p-[12px] rounded-[12px] border border-[var(--color-border)]',
          item.fullWidth ? 'col-span-2' : ''
        ]"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>
