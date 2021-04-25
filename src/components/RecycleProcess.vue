<template>
  <div class="recycle">
    <div style="display: flex">
      <div id="recycleSchedule">
      </div>
      <div style="display: block">
        <div class="recycleCount">
          <div style="margin-left: 14%;padding-top: 4%">
            曝光量：{{wenjuanRecycleBrowse}}
            回收量：{{ recycleCount}}
          </div>
          <div id="recycleCountForm">
          </div>
        </div>
        <div class="recycleRatio">
          <div class="ratioTypeBox">
            <div id="radioForm"></div>
            <div style="display: flex;margin-left: 20%">
              <div v-for="(type,typeIndex) in ratioTypeList" :key="typeIndex">
                <div :class="ratioType == type.nameEn ? 'ratioTypeCheck' : 'ratioType'"
                     @click="changeRatioType(type)">
                  {{type.nameCn}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="chinaMap"></div>
    </div>
    <div style="display: flex;margin-bottom: 2%">


    </div>
    <div style="height: 100px"></div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  export default {

    name: 'Recycle',
    equipment: 0,
    props:{
      wenjuanId:0
    },
    data() {
      require('echarts');
      require("echarts/lib/component/legend");
      require('echarts/incubator-echarts/test/data/map/js/china')
      return {
        chinaMap: undefined,
        ratioType:'dayRatio',
        wenjuanRecycleBrowse:0,
        recycleCount:0,
        recoveryRate:0,
        dayRatio:0,
        weekRatio:0,
        monthRatio:0,
        ratioType:'dayRatio',
        ratioTypeList:[
          {
            nameCn:'日环比',
            nameEn:'dayRatio'
          },
          {
            nameCn:'周环比',
            nameEn:'weekRatio'
          },
          {
            nameCn:'月环比',
            nameEn:'monthRatio'
          }
        ]
      }
    },
    methods: {
      init() {
        let myChart = echarts.init(document.getElementById('recycleSchedule'));
        let mapData = []
        let form = [];
        let chinaMapChartOption = {};
        // 绘制图表
        this.axios({
          method: 'GET',
          url: '/wenjuan/analysis/get/recycle/process',
          params: {
            wenjuanId:2707350
          }
        }).then((res) => {
          mapData = res.data.data.chinaMapData;
          form = res.data.data.recycleForm[0];
          this.wenjuanRecycleBrowse = res.data.data.wenjuanRecycleBrowse;
          this.recycleCount = res.data.data.recycleCount;
          this.recoveryRate = res.data.data.recoveryRate;
          this.dayRatio = res.data.data.dayRatio;
          this.weekRatio =res.data.data.weekRatio;
          this.monthRatio = res.data.data.monthRatio;
          form.backgroundColor = '#eef3ff'
          //曲线图
          form.series[0].smooth=true;
          form.series[0].showSymbol=false;
          //线下阴影
          form.series[0].areaStyle={
          normal: {
            color: {
              x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#003472" // 0% 处的颜色
                  },
                  {
                    offset: 0.2,
                    color: "#3eede7" // 20% 处的颜色
                  },
//                  {
//                    offset: 0.6,
//                    color: "#3eede7" // 0% 处的颜色
//                  },
                  {
                    offset: 0.8,
                    color: "#e3f9fd" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
            }
          }
        },
         //荧光效果
          form.series[0].lineStyle={
            //背景虚化颜色
            shadowColor: '#ffa400',
            //曲线虚化程度
            shadowBlur: 10,
            color: {
              type: 'linear',
              colorStops: [
                {offset: 0, color: '#ffa400'},
                {offset: 1, color: 'yellow'}
              ],
            },
          };
          //去除背景纵坐标横线
          form.yAxis={
          type: 'value',
            splitLine: {
            show: false,
          },
          };
          form.xAxis.type='category';
//        //禁止横轴数据过多自动隐藏
//        form.xAxis.axisLabel={
//          interval: 0
//        }
        //添加背景横坐标竖线
          form.xAxis.splitLine={
            show: true,
            lineStyle: {
              type: 'dashed',
            },
          }
        //鼠标hover提示文字
          form.tooltip = {
            trigger: form.tooltip.trigger,
            formatter: function(params, ticket, callback) {
              let res = `<div><div>${params[0].name}：${params[0].value} </div></div>`;
              return res;
            },
            extraCssText: "z-index:4"
        }
        myChart.setOption(form);


        let chinaMapChart = echarts.init(document.getElementById('chinaMap'));
        // 使用刚指定的配置项和数据显示地图数据
        // 进行相关配置
        chinaMapChartOption = {
          title:{
              text: '数据地图',
              subText: '',
              x: 'center',
              y: 'top'
          },
          tooltip: { // 鼠标移到图里面的浮动提示框
            // formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
            formatter (params, ticket, callback) {
              // params.data 就是series配置项中的data数据遍历
              let cityList = [];
              if (params.data) {
                cityList= params.data.cityList
              }
              let cityStr = '';
              for (let index = 0;index<cityList.length;index++) {
                let city = cityList[index];
                cityStr += city.cityName + ' : ' + city.value + '</br>';
              }
              let value = params.value ? params.value : '0';
              let htmlStr = `
                  <div style='font-size:18px;'> ${params.name} : ${value}</div>
                  <p style='text-align:left;margin-top:-10px;'>
                    <div>${cityStr}</div>
                  </p>`
              return htmlStr
            }
          },
          // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
          visualMap: { // 左下角的颜色区域
            type: 'piecewise', // 定义为分段型 visualMap
            min: 0,
            max: this.recycleCount,
            itemWidth: 40,
            bottom: 60,
            left: 15
          },
          // geo配置详解： https://echarts.baidu.com/option.html#geo
          geo: { // 地理坐标系组件用于地图的绘制
            map: 'china', // 表示中国地图
             roam: false, // 是否开启鼠标缩放和平移漫游
            zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
            label: {
              show: true
            },
            itemStyle: { // 地图区域的多边形 图形样式。
              borderColor: 'rgba(0, 0, 0, 0.5)',
              emphasis: { // 高亮状态下的多边形和标签样式
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [
            {
              name: '', // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
              type: 'map',
              geoIndex: 0,
              label: {
                show: true
              },
              // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是我定义的假数据）
              data: mapData
            }
          ]
        }
        chinaMapChart.setOption(chinaMapChartOption)
        //回收率图
        let recycleRadio = echarts.init(document.getElementById('recycleCountForm'));
        recycleRadio.setOption({
          title:{
            text:'回收率',
            subText:'',
            x:'center',
            y:'center',
            textStyle: {
              fontWeight: 500,
              fontSize: 24
            }
          },
          legend:{
//            selectedMode: false,
//            orient: 'vertical',
//            x: 'left',
//            y: 'top',
//            top: '60%',
//            left:'78%',
//            itemWidth: 12,
//            itemHeight: 12
            show:false
          },
          color:[
            '#3eede7','#eef3ff'
          ],
          series:[
            {
              radius :['30%','54%'],
              name:'',
              type:'pie',
              data:[
                {
                  value: this.recoveryRate,
                  name: this.recoveryRate + '%'
                },
                {
                  value: 100 - this.recoveryRate,
                  name: ''
                }
              ]
            }
          ]
        })
        console.log(recycleRadio.getOption());
        //日环比
        let radioForm = echarts.init(document.getElementById('radioForm'));
        radioForm.setOption({
          title:{
            text:'日环比',
            subText:'',
            x:'center',
            y:'center',
            textStyle: {
              fontWeight: 500,
              fontSize: 18
            }
          },
          legend:{
//            selectedMode: false,
//            orient: 'vertical',
//            x: 'left',
//            y: 'top',
//            top: '60%',
//            left:'78%',
//            itemWidth: 12,
//            itemHeight: 12
            show:false
          },
          color:[
            '#d6ecf0','#eef3ff'
          ],
          series:[
            {
              radius :['30%','64%'],
              name:'',
              type:'pie',
              data:[
                {
                  value: this.dayRatio,
                  name: this.dayRatio + '%'
                },
                {
                  value: 100 - this.dayRatio,
                  name: ''
                }
              ]
            }
          ]
        })
      });
      },
      changeRatioType(type) {
        let radioForm = echarts.getInstanceByDom(document.getElementById('radioForm'));
        let option = radioForm.getOption();
        option.title[0].text = type.nameCn;
        let data = 0;
        switch (type.nameEn) {
          case 'dayRatio':
                data = this.dayRatio;
                break;
          case 'weekRatio':
                data = this.weekRatio;
                break;
          case 'monthRatio':
                data = this.monthRatio;
                break;
          default:
                break;
        }
      console.log(data);
        option.series[0].data =[
          {
            value: data,
            name: data + '%'
          },
          {
            value: 100 - data,
            name: ''
          }
        ]
        this.ratioType = type.nameEn;
        radioForm.setOption(option,true)
      }
    },
    mounted() {
      this.init();
    }
  }
</script>
<style>

</style>
