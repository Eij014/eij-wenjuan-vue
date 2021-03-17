<template>
  <div class="box">
    <div>
      <!--  此处使用具名插槽 一级按钮   放入按钮  -->
      <slot name="title"></slot>
    </div>
    <!--  此处使用具名插槽   二级盒子  放入需要下拉的内容 -->
    <slot name="dropDown"></slot>
  </div>
</template>

<script>
  export default {
    name: "dropDown"
  }
</script>

<style scoped>
  .box {
    display: inline-block; /* 行内块 */
    position: relative; /* 相对定位 */
  }
</style>
