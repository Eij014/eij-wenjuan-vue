<template>
  <div class="testVue">
      <div class="testVueList" v-for="(form,index) in recyclePieList" :key="index">
        <div :id = "form.questionId" style="width:800px;height:800px"></div>
      </div>
  </div>
  </template>
<script>
  import * as echarts from 'echarts'
  export default {
    name:'testVue',
    data() {
      require('echarts');
      require("echarts/lib/component/legend");
      return {
        recyclePieList:[]
      }
    },
    methods: {
      init() {
        this.axios({
          method:'GET',
          url:'/wenjuan/analysis/get/recycle/form',
          params:{
            wenjuanId:2707352
          }
        }).then((res) => {
        this.recyclePieList = res.data.data.pieResult;
        let newPromise = new Promise((resolve) => {
            resolve();
        });
        newPromise.then(() => {
          for (let index = 0; index < this.recyclePieList.length; index++) {
              let data = this.recyclePieList[index];
              let ehcartsForm = echarts.init(document.getElementById(data.questionId));
//              data.yAxis =  {minInterval:1};
          data.series[0].radius = ['35%'];
              ehcartsForm.setOption(data);

          console.log(echartsForm)
          }
         });
      });
      }
    },
    mounted() {
      this.init();
    }
  }

</script>
