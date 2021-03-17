<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id = "app">
    <!--<router-link to="/home">Go to Foo</router-link>-->
    <!--<router-link to="/EditWenjuan">Go to Bar</router-link>-->
    <router-view></router-view>
  </div>

</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.12/vue.js"></script>
<script src="src/vue.js"></script>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter);
  export default {
    name: 'App'
  }
</script>
<style>
</style>
