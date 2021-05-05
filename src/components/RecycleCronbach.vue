<template>
  <div class="cronbach">
    <div class="crossQuestion">
      <div style="margin-left: 3%">
        <vxe-select v-model="questionX" placeholder="question" size="medium" multiple clearable>
          <vxe-option v-for="question in questionList" :key="question.questionId" :value="question.questionId"
                      :label="question.title"></vxe-option>
        </vxe-select>
      </div>
      <div class="startAnalysis" @click="crossAnalysis()">开始分析</div>
    </div>
    <div class="crossForm">
      <div v-for="(crossAnalysis, index) in crossAnalysisVOList" :key="index">
        <div style="margin-bottom: 1%">

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
    name: 'RecycleCronbach',
    props:{
      wenjuanId:0
    },
    data() {
      require('echarts');
      require("echarts/lib/component/legend");
      return {
        questionY:[],
        questionX:[],
        questionList:[
        ],


        crossAnalysisVOList: [
          {
            columns:[
              'Cronbach\'s alpha',
              '内部一致性'
            ],
            dataList:[
              {
                'Cronbach\'s alpha':'α ≥ 0.9',
                '内部一致性':'优秀'
              },
              {
                'Cronbach\'s alpha':'0.7 ≤ α < 0.9',
                '内部一致性':'好'
              },
              {
                'Cronbach\'s alpha':'0.6 ≤ α < 0.7',
                '内部一致性':'可接受'
              },
              {
                'Cronbach\'s alpha':'0.5 ≤ α< 0.6',
                '内部一致性':'弱'
              },
              {
                'Cronbach\'s alpha':'α < 0.5',
                '内部一致性':'不可接受'
              },
            ]
          }
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
          let questions = res.data.data;
          for (let question of questions) {
            if(question.type == 'score') {
              this.questionList.push(question);
              this.questionX.push(question.questionId);
            }
          }
      });
      },
      crossAnalysis() {
        if(this.crossAnalysisVOList.length > 1) {
          this.crossAnalysisVOList.pop();
        }
        if (this.questionX==0 || this.questionX==null ) {
          this.$message({
            type: 'failed',
            message: '尚未选择题目'
          });
        } else {
          this.axios({
            method: 'POST',
            url: '/wenjuan/analysis/get/cronbach',
            header: {
              'Content-Type': 'application/json'
            },
            data: {
              questionIdXList:this.questionX
            }
          }).then((res) => {
            this.crossAnalysisVOList.push(
            {
              questionX:'',
              questionY:'',
              columns:[
                '克隆巴赫系数-Cronbach\'s coefficient alpha'
              ],
              dataList:[
                {
                  '克隆巴赫系数-Cronbach\'s coefficient alpha':'α = ' + res.data.data
                }
              ]
            }
          )
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
