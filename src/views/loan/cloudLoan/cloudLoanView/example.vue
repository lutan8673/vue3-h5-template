<template>
  <div id="img1">
    <el-image :src="IMG" alt="img" />
  </div>
  <el-button type="primary"><el-icon><i-ep-Search /></el-icon>按钮央视</el-button>
  1233
  {{testName}}
</template>
<script setup>
  import { ref } from 'vue'
  import IMG from '@/assets/img/no-data.png'

  const testName = ref('案例1')
</script>

<style lang="less" scoped>
#img1{background-color: #f60;}
</style>