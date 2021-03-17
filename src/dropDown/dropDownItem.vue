<template>
  <div class="dropDownItem">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "dropDownItem"
  }
</script>

<style scoped>
  .dropDownItem {
    line-height: 40px; /* 行高40px */
    white-space: nowrap;  /* 不换行 */
    padding: 0 20px; /* 内边距上下为0 左右为20px */
    color: #606266; /* 字体颜色为灰色 */
    cursor: pointer;  /* 鼠标移入为点击样子 */
  }
  .dropDownItem:hover {
    color: #409eff; /* 字体颜色为蓝色 */
    background-color: #ecf5ff; /* 背景颜色为 浅~~蓝色 非常浅就对了 */
  }
</style>
