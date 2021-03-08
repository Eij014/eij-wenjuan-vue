<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id = "wenjuanVue">
   <div id = "systemTitle">
                 <img src="./assets/wenjuan-title.png">
            Eij问卷
          <!--<router-view/>-->
            <div id = "userLogin">
              登录
            </div>
    </div>
    <div id = "myWenjuan">
      我的问卷
    </div>
    <div id = "wenjuanBox">
        <div id = "createWenjuanBox">
          <img id = "imageCenter" src="./assets/createWenjuan.png">
          <div id = "buttonCreateWenjuan">新建问卷</div>
        </div>
        <div id = "wenjuanList">
          <li v-for = "(wenjuan,index) in wenjuanList" id = "userWenjuanBox" :key="index">
            <img id = "wenjuanImg" src= 'https://tse4-mm.cn.bing.net/th/id/OIP.XHR0ESekKzxVDwpuzYIJagHaEo?pid=ImgDet&rs=1'>
            <a>{{ wenjuan.wenjuanTitle }}</a>
            <br>
            <div>回收: {{wenjuan.recyclingNum}}</div>
            <div v-if="wenjuan.status == 0" style="color:#FFB15B">
              未发布
            </div>
            <div v-if="wenjuan.status == 1" style="color:#47E400">
              已发布
            </div>
            <a>
              {{getDate(wenjuan.createTime)}}
            </a>
          </li>
        </div>
    <div class="page-bar">
      <ul>
        <li v-if="currentPage>1">
          <a v-on:click="currentPage--,pageClick()">
            上一页
          </a>
        </li>
        <li v-if="currentPage==1"><a class="banClick">上一页</a></li>
        <li v-for="index in totalPage" style="font-size: medium" v-bind:class="{ 'active' : currentPage == index}">
          <a v-on:click="btnClick(index)">{{ index }}</a>
        </li>
          <li v-if="currentPage!=totalPage"><a v-on:click="currentPage++,pageClick()">下一页</a></li>
        <li v-if="currentPage==totalPage"><a class="banClick">下一页</a></li>
        <li><a style="font-size: medium">共<i>{{ total }}</i>个</a></li>
      </ul>
    </div>
    <!--<div>-->
      <!--<select v-model="rowNum">-->
        <!--<option value="5">5</option>-->
        <!--<option value="10">10</option>-->
        <!--<option selected="selected" value="20">20</option>-->
      <!--</select>-->
    <!--</div>-->
      <!--<span>{{currentPage}}/{{total}}</span>-->
      <!--<div id = "goto">-->
        <!--<input type="text" v-model="gotoPage"/>-->
        <!--<a href="javascript:void(0);" v-onclick="gotoNextPage">跳转</a>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.12/vue.js"></script>
<script src="src/vue.js"></script>
<script type="text/ecmascript-6">
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import axios from 'axios';
Vue.prototype.axios = axios
export default {
  name: 'App',

  data () {
    this.wenjuanListFn(1)
    return{
      totalPage:0,
      total:0,
      pageSize:0,
      currentPage:0,
      wenjuanList:[]
    }
  },
  methods:{
        wenjuanListFn(index) {
        this.axios({
          method:'POST',
          url:'/v3/wenjuan/list',
          data:{
            currentPage:index,
            pageSize:10
          },
          header:{
             'Content-Type':'application/json'
          }
        }
        ).then((res) => {
            console.log(res);
            this.wenjuanList =  res.data.data.wenjuanList;
            this.total = res.data.data.total;
            this.pageSize = res.data.data.pageSize;
            this.currentPage = res.data.data.currentPage;
            this.totalPage = res.data.data.totalPage;
          console.log(this.totalPage);
        });
      },
      btnClick:function(data) {
        if (data != this.currentPage) {
          this.currentPage = data;
        }
        this.wenjuanListFn(this.currentPage.toString());
      },
      pageClick: function () {
        this.wenjuanListFn(this.currentPage.toString());
      },
      getDate(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
      }
  },
  computed: {
    indexs:function() {
      var left = 1;
      var right = this.totalPage;
      var ar = [];
      if (this.allPage >= 5) {
        if(this.currentPage > 3 && this.cur< this.totalPage - 2) {
          left = this.currentPage - 2;
          right = this.currentPage + 2;
        } else {
          if (this.currentPage <= 3) {
            left = 1;
            right =5;
          } else {
            right = this.totalPage;
            left = this.totalPage - 4;
          }
        }
      }
      while(left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    }
  }
}
</script>
<style>
</style>
