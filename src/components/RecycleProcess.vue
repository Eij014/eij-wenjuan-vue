<template>
  <div class="recycle">
    <div id="echartsTest"></div>
    <div id="chinaMap"></div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  export default {

    name: 'Recycle',
    wenjuanId: 0,
    equipment: 0,
    data() {
      require('echarts');
      require("echarts/lib/component/legend");
      require('echarts/incubator-echarts/test/data/map/js/china')
      return {
        wenjuanId: 2707352,
        chinaMap: undefined
      }
    },
    methods: {
      init() {
        let myChart = echarts.init(document.getElementById('echartsTest'));
        let mapData = []
        let form = [];
        let chinaMapChartOption = {};
        // 绘制图表
        this.axios({
          method: 'GET',
          url: '/wenjuan/analysis/get/recycle/process',
          params: {
            wenjuanId: 2707352
          }
        }).then((res) => {
          mapData = res.data.data.chinaMapData;
          form = res.data.data.recycleForm[0];
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
            max: 100,
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
