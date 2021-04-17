<template>
  <div class="resultAnalysis">
      <div class="resultAnalysisHeader">
        <div class="headerLeft">
          <img style="margin-right: 5%" @click="goHome()" src="../assets/icon/arrowLeft.png"/>
          {{ wenjuanTitle }}
        </div>
        <div class="headerCenter">
        </div>
        <div class="headerRight">
        </div>
      </div>
    <div class="resultAnalysisCenter">
          <div class="resultAnalysisCenterLeft">
            <div class="leftMenuBox">
              <div class="menu" v-for="(menu,index) in resultAnalysisCenterLeftMenu"
                   :key="index">
                <div :class="menu.componentName == currentPageEn ? 'menuPick' : 'menuNoPick'"
                     @click="changeMenu(menu.componentName, menu.componentEn)">
                  <img style="margin-top:20%;width:40%;height:40%;margin-left: 25%" :src="menu.icon">
                  <div style="margin-left: 10%">{{ menu.menuName }}</div>
                </div>
              </div>
            </div>
        </div>
      <div class="resultAnalysisCenterRight">
        <div :is="currentPage"></div>
      </div>

    </div>
  </div>
</template>
<script>
  import RecycleProcess from '@/components/RecycleProcess'
  import RecycleForm from '@/components/RecycleForm'
  import * as echarts from 'echarts'
  export default {
    name: 'ResultAnalysis',
    wenjuanId: 0,
    equipment: 0,

    component:{
      RecycleProcess,
      RecycleForm
    },

    data () {
      return {
        currentPage:RecycleProcess,
        currentPageEn:'RecycleProcess',
        resultAnalysisCenterLeftMenu: [
          {
            icon: require('../assets/icon/progress.png'),
            menuName: '回收进度',
            componentName:'RecycleProcess',
            componentEn:RecycleProcess
          },
          {
            icon: require('../assets/icon/form.png'),
            menuName: '统计报表',
            componentName:'RecycleForm',
            componentEn:RecycleForm
          }
        ],

      }
    },
    methods: {
      changeMenu(componentName, componentEn) {
        console.log("componentEn=")
        console.log(componentEn);
        console.log(this.currentPage);
        this.currentPageEn = componentName;
        this.currentPage = componentEn;
        console.log(this.currentPage);
      }
    }
  }
</script>
<style>

</style>
