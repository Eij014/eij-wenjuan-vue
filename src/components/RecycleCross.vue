<template>
  <div class="cross">
    <div class="crossQuestion">
      <div style="margin-left: 3%">
        <vxe-select v-model="questionX" placeholder="questionX" size="medium" clearable>
            <vxe-option v-for="question in questionList" :key="question.questionId" :value="question.questionId"
                      :label="question.title"></vxe-option>
        </vxe-select>
      </div>
      <div style="margin-left: 3%">
        <vxe-select v-model="questionY" placeholder="questionY" size="medium" clearable>
          <vxe-option v-for="question in questionList" :key="question.questionId" :value="question.questionId"
                      :label="question.title"></vxe-option>
        </vxe-select>
      </div>
      <div class="startAnalysis" @click="crossAnalysis()">开始分析</div>
    </div>
    <div class="crossForm">
      <div v-for="(crossAnalysis, index) in crossAnalysisVOList" :key="index">
        <div style="margin-bottom: 1%">
        X:{{crossAnalysis.questionX}} <=> Y:{{crossAnalysis.questionY}}
        </div>
        <vxe-table :data="crossAnalysis.dataList">
          <vxe-table-column  v-for="(column, cIndex) in crossAnalysis.columns" :key="cIndex"
                               :field="column" :title="column">
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    name: 'RecycleCross',
    props:{
      wenjuanId:0
    },
    data() {
      require('echarts');
      require("echarts/lib/component/legend");
      return {
        questionY:'',
        questionX:'',
        questionList:[
//          {
//            questionId:1,
//            title:'满意度'
//          },
//          {
//            questionId:2,
//            title:'选项'
//          },
//          {
//            questionId:3,
//            title:'性别'
//          },
//          {
//            questionId:4,
//            title:'职业'
//          }
        ],


        crossAnalysisVOList: [
//          {
//            questionX: '满意度',
//            questionY: '选项',
//            columns: ['X/Y', '选项二', '选项三', '合计'],
//            dataList: [
//              {
//                'X/Y': '很不满意',
//                '选项二': '0(0.00%)',
//                '选项三': '0(0.00%)',
//                '合计': '0'
//              },
//              {
//                'X/Y': '不满意',
//                '选项二': '0(0.00%)',
//                '选项三': '0(0.00%)',
//                '合计': '0'
//              },
//              {
//                'X/Y': '一般',
//                '选项二': '0(0.00%)',
//                '选项三': '0(0.00%)',
//                '合计': '0'
//              },
//              {
//                'X/Y': '满意',
//                '选项二': '1(100.00%)',
//                '选项三': '0(0.00%)',
//                '合计': '1'
//              },
//              {
//                'X/Y': '很满意',
//                '选项二': '0(0.00%)',
//                '选项三': '0(0.00%)',
//                '合计': '0'
//              }
//            ]
//          }
        ],

      }
    },
    methods:{
      init(){
        this.axios({
          method: 'GET',
          url: '/wenjuan/get/question',
          params: {
            wenjuanId: this.wenjuanId
          }
        }).then((res) => {
            this.questionList = res.data.data;
        });
      },
      crossAnalysis() {
        console.log(this.questionX);
        console.log(this.questionY);
        if (this.questionX==0 || this.questionY == 0
            || this.questionX==null || this.questionY==null) {
          this.$message({
            type: 'failed',
            message: '尚未选择题目'
          });
        } else {
          this.axios({
            method: 'POST',
            url: '/wenjuan/analysis/get/cross/analysis',
            header: {
              'Content-Type': 'application/json'
            },
            data: {
              wenjuanId: this.wenjuanId,
              questionIdXList:[this.questionX],
              questionIdYList:[this.questionY]
            }
          }).then((res) => {
              this.crossAnalysisVOList = res.data.data;
          });
        }
      }
    },
    mounted() {
      this.init();
    }

  }
</script>
<style>
</style>
