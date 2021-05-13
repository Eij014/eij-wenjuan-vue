<template>
  <div class="recycleData">
        <vxe-table :data="recycleDataList.dataList">
          <vxe-table-column  v-for="(column, cIndex) in recycleDataList.columns" :key="cIndex"
                             :field="column" :title="column">
          </vxe-table-column>
        </vxe-table>
      </div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    name: 'RecycleData',
    props:{
      wenjuanId:0
    },
    data() {
      require('echarts');
      require("echarts/lib/component/legend");
      return {
        recycleDataList:{
          columns:[],
          dataList:[]
        }
      }
    },
    methods:{
      init(){
        this.axios({
          method: 'GET',
          url: '/wenjuan/analysis/get/data',
          params: {
            wenjuanId: this.wenjuanId
          }
        }).then((res) => {
          this.recycleDataList.columns = res.data.data.questionNameList;
          this.recycleDataList.dataList = res.data.data.recycleDataList;
      });
      }
    },
    mounted() {
      this.init();
    }

  }
</script>
<style>
</style>
