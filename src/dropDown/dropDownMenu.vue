<template>
  <div class="dropDownMenu">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "dropDownMenu"
  }
</script>

<style scoped>
  .dropDownMenu {
    padding: 8px 0; /* 盒子内边距上下为8px 左右为0 */
    border-radius: 4px;  /* 盒子圆角 */
    border: 1px solid #f2f6fc;  /* 边框为1px 灰色 */
    position: absolute;  /* 绝对定位 */
    right: 0;   /* 在右侧 */
    top: 110%; /* 盒子在按钮下方 */
    background-color: #fff;  /* 背景颜色为白色 */
    box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,.04);
    /* 为盒子添加阴影 */
  }
</style>
