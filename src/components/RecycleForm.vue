<template>
  <div class="recycleForm">
    <div class="formList" v-for="(form,index) in recycleFormList" :key="index">
        <div class="questionForm">
          <div style="background-color: #c0c4cc ">{{form.questionName}}</div>
          <div :id = "form.questionId" style="width:700px;height:500px"></div>
          <!--类型选择-->
          <div  class="formTypeList" @click="changeFormType(type.nameEn,index)">
            <div v-for="(type,typeIndex) in echartsTypeList" :key="typeIndex">
              <div :class="form.formType == type.nameEn ? 'formTypeCheck' : 'formType'"
                  @click="changeFormType(type.nameEn,index)">
                {{type.nameCn}}</div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    name: 'RecycleForm',
    props:{
      wenjuanId:0
    },
    data() {
      require('echarts');
      require("echarts/lib/component/legend");
      return {
        recycleFormList:[],
        recyclePieList:[],
        echartsTypeList:[
          {
            nameCn:'柱状图',
            nameEn:'bar'
          },
          {
            nameCn:'折线图',
            nameEn:'line'
          },
          {
            nameCn:'饼图',
            nameEn:'pie'
          }
        ]
      }
    },
    methods:{
      init() {
        this.axios({
          method:'GET',
          url:'/wenjuan/analysis/get/recycle/form',
          params:{
            wenjuanId:this.wenjuanId
          }
        }).then((res) => {
            this.recycleFormList = res.data.data.result;
            this.recyclePieList = res.data.data.pieResult;
            console.log(this.recycleFormList);
            let newPromise = new Promise((resolve) => {
                resolve();
            });
            newPromise.then(() => {
                for (let index = 0; index < this.recycleFormList.length; index++) {
                    let data = this.recycleFormList[index];
                    let ehcartsForm = echarts.init(document.getElementById(data.questionId));
                    data.yAxis =  {
                      minInterval:1,
                      type: 'value',
                      splitLine: {
                        show: false,
                      }
                    };
                    data.xAxis.type='category';
                    data.xAxis.splitLine={
                      show: true,
                      lineStyle: {
                        type: 'dashed',
                      },
                    }
                    data.color=[
                      '#70f3ff','#56004f'
                    ]
                    ehcartsForm.setOption(data);
                }
            });
        });
      },
      changeFormType(typeNameEn,questionIndex) {
        let data;
        if (typeNameEn != 'pie') {
          data = this.recycleFormList[questionIndex];
          data.xAxis = {
            data:data.xAxis.data,
            show:true
          }
        } else {
          data = this.recyclePieList[questionIndex];
          data.series[0].radius = ['0%', '54%'];
          data.series[0].labelLine = {
            normal: {
              length: 20,
              length2: 70,
              lineStyle: {
                color: '#333'
              }
            }
          };
          data.series[0].label = {
            normal: {
              show: true,
              position: 'outside',
              textStyle: {color: '#3c4858', fontSize: "10"},
              formatter: function (val) {
                //引导线文字
                return val.name.replace('(', '').replace(')', '');
              },
              rich: {
                a: {
                  color: '#333',
                  fontSize: 12,
                  lineHeight: 20
                },
                b: {
                  fontSize: 12,
                  lineHeight: 20,
                  color: '#333'
                }
              },
              emphasis: {    //文本样式
                show: true,    //展示
                textStyle: {    //文本样式
                  fontSize: '14',
                  fontWeight: '600',
                }
              }
            }
          };
//          data.series[0].itemStyle = {
//          }
          data.legend = {
            selectedMode: false,
            orient: 'vertical',
            x: 'left',
            y: 'top',
            top: '60%',
            left:'78%',
            itemWidth: 12,
            itemHeight: 12
          };
          data.graphic = {
            type:'text',
            left:'center',
            top:'center'
          }
          data.tooltip = {
            trigger: 'item',
            formatter: "{b}: {c}"
          }
          data.xAxis = {
            show:false
          }
        }
        let ehcartsForm = echarts.getInstanceByDom(document.getElementById(data.questionId));
        data.series[0].type = typeNameEn;
        this.recycleFormList[questionIndex].formType = typeNameEn;
        ehcartsForm.setOption(data);
        console.log("afterChange");
        console.log(data);
      },
      test() {
        console.log("this is a test");
      }
    },
    mounted() {
      this.init();
    }
  }
</script>
