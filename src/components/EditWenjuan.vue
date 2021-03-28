<template>

  <div style="font-size: medium" id="wenjaunEdit">
    <div id ="wenjuanEditHeader">
      <img src="../assets/icon/arrowLeft.png"/>
      {{ wenjuanTitle }}
      <div style="margin:-10px 0px 0px 620px">问卷制作</div>
      <div style="margin:-18px 0px 0px 680px"><img  src="../assets/icon/arrowRight.png"/></div>

      <div style="margin:-25px 0px 0px 700px">问卷发布</div>
      <div id="wenjuanPreview"><img id="imgPreview" src="../assets/icon/video.png"/>预览</div>
      <div id="wenjuanSave" @click="saveWenjuan()">保存发布</div>
      <p class="horizontalLine"></p>
    </div>

    <div id = "wenjuanEditCenter">
      <div id = "wenjuanEditCenterLeft">
        <div>基本控件</div>
        <div id="questionBox">
          <div @click="addSingleChoice()" class="question1">
            <img class = "imgCenter" src="../assets/icon/singleChoice.png"/>
            <div style="font-size: medium">单选框</div>
          </div>
          <div @click="addMultipleChoice()" class="question2">
            <img class = "imgCenter" src="../assets/icon/check.png"/>
            <div style="font-size: medium">多选框</div>
          </div>
          <div @click="addScore()" class="question3">
            <img class = "imgCenter" src="../assets/icon/score.png"/>
            <div style="font-size: medium">评分题</div>
          </div>
          <div @click="addVideo()" class="question1">
            <img class = "imgCenter" src="../assets/icon/video.png"/>
            <div style="font-size: medium">视频题</div>
          </div>
          <div @click="addPicture()" class="question2">
            <img class = "imgCenter" src="../assets/icon/picture.png"/>
            <div style="font-size: medium">图片题</div>
          </div>
          <div class="question3">
            <img class = "imgCenter" src="../assets/icon/check.png"/>
            <div style="font-size: medium"></div>
          </div>
        </div>
      </div>
      <div id = "wenjuanEditCenterMid"></div>
             <div id="questionHeader">
               <img class="editingWenjuanImg" :src= "this.imgUrl"/>
               <div id="questionWel" @click="editWel()">
                  <div id="wenjuanTitleCenter">{{wenjuanTitle}}</div>
                 <div>{{welcomeMsg}}</div>
               </div>
               <div id = questionList>
                 <!--问题列表-->
                  <li class="userQuestionBox" v-for="(question,index) in questionVOList"  :key="index"  @click="editQuestionOnRight(question)">
                    <div class="userQuestion">
                        <div style="margin-top: 5px;margin-bottom: 5px">
                          {{index+1}}.{{question.title}}
                        </div>
                        <!--选项列表-->
                      <el-radio class="optionClass" v-if="question.type == 'singleChoice'" v-for="(option, oIndex) in question.optionList" :key="oIndex" v-bind:label="option.optionName"></el-radio>
                      <el-checkbox class="optionClass" v-if="question.type == 'multipleChoice'" v-for="(option, oIndex) in question.optionList" :key="oIndex" :label="String(option.optionName)"></el-checkbox>
                       <div class="Rating-gray" v-if="question.type=='scoring'">
                        <!--<my-rate  :score.sync='score'/>-->
                        <!--<span v-for="(itemClass,index2) in itemClasses" :class="itemClass" class="star-item" :key="index2"></span>-->
                      </div>
                      <!--视频题-->
                      <div v-if="question.type=='video'">
                        <div v-if="question.playerOptions.sources[0].src!=''" class="videoBox">
                          <video-player class="video-player vjs-custom-skin"
                                        ref="videoPlayer"
                                        :playsinline="true"
                                        :options="question.playerOptions">
                          </video-player>
                        </div>
                        <div v-if="question.playerOptions.sources[0].src==''" class="noVideoBox">

                          <input class="imgUploadInputHasImgInput" accept="video/*" name="multipartFile" id="userUploadVideo"  v-on:change="uploadVideo(question)" type="file">
                          请上传视频
                          </input>
                        </div>
                        <div class="videoOption">
                          <el-radio class="optionClass" v-if="question.type == 'video'" v-for="(option, oIndex) in question.optionList" :key="oIndex" v-bind:label="option.optionName"></el-radio>
                        </div>
                      </div>
                      <!--图片题目-->
                      <el-radio class="optionClass" v-if="question.type == 'picture'" v-for="(option, oIndex) in question.optionList" :key="oIndex" v-bind:label="option.optionName">
                        <div class="uploadPicture" v-if="option.optionName == ''">
                          <form name="multipartFile" id="multipartFile" enctype="multipart/form-data" action="图片上传接口" method='POST'>
                            <input class="imgUploadInput" accept="image/*" name="multipartFile" id="userUploadImg"  v-on:change="uploadImg(option)" type="file">
                          </form>
                        </div>

                        <div class = "imageUploadHasImg" v-else>
                          <input class="imgUploadInputHasImgInput" accept="image/*" name="multipartFile" id="userUploadImgHasImg"  v-on:change="uploadImg(option)" type="file">
                          <img class="uploadPictureHasImg" :src="option.optionName"/>

                        </div>
                      </el-radio>
                    </div>
                  </li>
               </div>
               <p class="horizontalLine"></p>
             </div>
      <div id = "wenjuanEditCenterRight">
        <div  v-if="showHeaderControl">
             <div class="editControlTitle">头部控件</div>
             <p class="horizontalLine"></p>
             <div class="editName" >问卷名称</div>
             <input style="height: 20px" v-model="wenjuanTitle">
             <div  class="editName">描述</div>
             <textarea  style="height: 80px" v-model="welcomeMsg"> </textarea>
        </div>
        <div v-else>
          <div v-if="questionEditing.type == 'singleChoice'">
            <div class="editControlTitle">单选题</div>
          </div>
          <p class="horizontalLine"></p>
          <div class="editName">标题</div>
          <input style="height: 20px" v-model="questionEditing.title">
          <div class="editName">选项设置</div>
          <el-radio class="optionClassEdit"  v-if="questionEditing.type == 'singleChoice'" v-for="(option, oIndex) in questionEditing.optionList" :key="oIndex" :label="String(option.optionName)">
            <input class = "optionEditInput" v-model="option.optionName">
            <img @click="addOptionWithIndex(questionEditing.optionList,oIndex)" class="imgAddOrDelete" src="../assets/icon/iconsAdd.png"/>
            <img @click="delOptionWithIndex(questionEditing.optionList,oIndex)" class="imgAddOrDelete" src="../assets/icon/iconsDelete.png">
          </el-radio>
          <el-radio class="optionClassEdit"  v-if="questionEditing.type == 'video'" v-for="(option, oIndex) in questionEditing.optionList" :key="oIndex" :label="String(option.optionName)">
            <input class = "optionEditInput" v-model="option.optionName">
            <img @click="addOptionWithIndex(questionEditing.optionList,oIndex)" class="imgAddOrDelete" src="../assets/icon/iconsAdd.png"/>
            <img @click="delOptionWithIndex(questionEditing.optionList,oIndex)" class="imgAddOrDelete" src="../assets/icon/iconsDelete.png">
          </el-radio>

          <el-checkbox class="optionClassEdit" v-if="questionEditing.type == 'multipleChoice'" v-for="(option, oIndex) in questionEditing.optionList" :key="oIndex" :label="String(option.optionName)">
            <input class = "optionEditInput" v-model="option.optionName">
            <img @click="addOptionWithIndex(questionEditing.optionList,oIndex)" class="imgAddOrDelete" src="../assets/icon/iconsAdd.png"/>
            <img @click="delOptionWithIndex(questionEditing.optionList,oIndex)" class="imgAddOrDelete" src="../assets/icon/iconsDelete.png">
          </el-checkbox>
          <div class="addOption" @click="addOption(questionEditing.optionList)">添加选项</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  import MyRate from './score.vue'
//  import MyRate from '../Vue/score.vue'
//引入video样式
//import 'video.js/dist/video-js.css'
//import 'vue-video-player/src/custom-theme.css'
////引入hls.js
//import 'videojs-contrib-hls.js/src/videojs.hlsjs'

  export default {
    name: 'EditWenjuan',
    wenjuanId:0,
    data () {
      if (this.$router.currentRoute.query.wenjuanId != 0) {
        console.log('如果问卷id不等于0')
        console.log(this.$router.currentRoute.query.wenjuanId);
        console.log('如果问卷id不等于0')
        this.getWenjuan(this.$router.currentRoute.query.wenjuanId);
      } else {
        console.log('如果问卷id等于0')
        this.getImgUrl();
      }
     return {
       showHeaderControl:true,
       wenjuanId:0,
       wenjuanTitle:'未命名问卷',
       welcomeMsg:'欢迎参加本次问卷调查',
       imgUrl:'',
       questionVOList:[]
     }
    },
    methods:{
      getWenjuan(wenjuanId) {
        console.log(wenjuanId);
        console.log('获取问卷');
        this.axios({
          method:'GET',
          url:'/v3/wenjuan/detail',
          withCredentials: true,
          params:{
            wenjuanId:wenjuanId
          }
        }).then((res) => {
//          this.wenjuanTitle = res.data.data.wenjuanTitle;
//          this.welcomeMsg = res.data.data.welcomeMsg;
//          this.questionVOList = res.data.data.questionVOList;
        });
      },
      getImgUrl() {
        this.axios({
          method:'GET',
          url:'/v3/wenjuan/init/img/url',
          withCredentials: true
        }).then((res) => {
          console.log('获取图片');
          this.imgUrl = res.data.data;
        });
      },
      addSingleChoice(){

        let singleChoiceUnnamed = {
          "questionId":0,
          "wenjuanId":this.wenjuanId,
          "must":0,
          "imgUrls":'',
          "questionIndex":0,
          "type":'singleChoice',
            "title":'单选题',
            "optionList":[
            {
              "optionId":0,
              "questionId":0,
              "optionName":'选项一',
              "optionIndex":0
            },
            {
              "optionId":0,
              "questionId":0,
              "optionName":'选项二',
              "optionIndex":0
            },
            {
              "optionId":0,
              "questionId":0,
              "optionName":'选项二',
              "optionIndex":0
            }
          ]
        }
        this.questionVOList.push(singleChoiceUnnamed);

      },
      addMultipleChoice() {
        let multipleChoiceUnnamed = {
          "questionId":0,
          "wenjuanId":this.wenjuanId,
          "must":0,
          "imgUrls":'',
          "questionIndex":0,
          "type":'multipleChoice',
          "title":'多选题',
          "optionList":[
            {
              "optionId":0,
              "questionId":0,
              "optionName":'选项一',
              "optionIndex":0
            },
            {
              "optionId":0,
              "questionId":0,
              "optionName":'选项二',
              "optionIndex":0
            },
            {
              "optionId":0,
              "questionId":0,
              "optionName":'选项三',
              "optionIndex":0
            }
          ]
        }
        this.questionVOList.push(multipleChoiceUnnamed);
      },
      addScore() {
        this.questionVOList.push(this.scoringQuestionUnnamed);
      },
      addVideo() {
        let videoUnnamed = {
          "questionId":0,
          "wenjuanId":this.wenjuanId,
          "must":0,
          "imgUrls":'',
          "type":'video',
          "title":'观看视频，做出您的选择',
          "playerOptions": {
            "playbackRates": [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
            "autoplay": false, // 如果为true,浏览器准备好时开始回放。
            "muted": false, // 默认情况下将会消除任何音频。
            "loop": false, // 是否视频一结束就重新开始。
            "preload": 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            "language": 'zh-CN',
            "aspectRatio": '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            "fluid": true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            "sources": [{
              "type": "video/mp4", // 类型
              "src": '' // url地址
            }],
            "poster": '', // 封面地址
            "notSupportedMessage": '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
            "controlBar": {
              "timeDivider": true, // 当前时间和持续时间的分隔符
              "durationDisplay": true, // 显示持续时间
              "remainingTimeDisplay": false, // 是否显示剩余时间功能
              "fullscreenToggle": true // 是否显示全屏按钮
            }
          },
          "optionList":[
            {
              "optionId":0,
              "questionId":0,
              "optionName":'选项一',
              "optionIndex":0
            },
            {
              "optionId":0,
              "questionId":0,
              "optionName":'选项二',
              "optionIndex":0
            },
            {
              "optionId":0,
              "questionId":0,
              "optionName":'选项三',
              "optionIndex":0
            },
            {
              "optionId":0,
              "questionId":0,
              "optionName":'选项三',
              "optionIndex":0
            }
          ]
        };
        this.questionVOList.push(videoUnnamed);
      },
      addPicture() {
        let pictureUnnamed = {
          "questionId":0,
          "wenjuanId":this.wenjuanId,
          "must":0,
          "imgUrls":'',
          "type":'picture',
          "title":'从以下图片中选出一张',
          "optionList":[
            {
              "optionId":0,
              "questionId":0,
              "optionName":'',
              "optionIndex":0
            },
            {
              "optionId":0,
              "questionId":0,
              "optionName":'',
              "optionIndex":0
            },
            {
              "optionId":0,
              "questionId":0,
              "optionName":'',
              "optionIndex":0
            }
          ]
        }
        this.questionVOList.push(pictureUnnamed);
      },
      editWel() {
        this.showHeaderControl = true;
      },
      editQuestionOnRight(question) {
          this.questionEditing = question;
        this.showHeaderControl = false;
      },
      addOption(optionList) {
        var length = this.convertToChinaNum(optionList.length + 1);
        var option = {
          "optionName":"选项" + length
        }
        optionList.push(option);
      },
//      addOptionWithIndex(num1, num2) {
//          console.log(num1 + num2);
//      },
      addOptionWithIndex(optionList, index) {
        var length =  this.convertToChinaNum(index + 1);
        var option = {
          "optionName":"选项" + length
        }
//        optionList.push(index, option);
        optionList.splice(index,0,option);
      },
      delOptionWithIndex(optionList, index) {
        optionList.splice(index, 1);
      },
      uploadVideo(question) {
        var file = document.getElementById("userUploadVideo").files[0];
        var formdata1=new FormData();// 创建form对象
        formdata1.append('multipartFile', file);
        formdata1.append('name',file.name);// 通过append向form对象添加数据,可以通过append继续添加数据
        this.axios({
          method:'POST',
          url:'/v3/wenjuan/upload/image',
          withCredentials: true,
          header:{
            'Content-Type':'multipart/form-data;charset=utf-8',
          },
          data:formdata1
        }).then((res) => {
            let sources =[{
              type: 'video/mp4', // 类型
              src: res.data.data
          }];
        question = sources;
      });
      },
      uploadImg(option) {
        var file = document.getElementById("userUploadImg").files[0];
        var formdata1=new FormData();// 创建form对象
        formdata1.append('multipartFile', file);
        formdata1.append('name',file.name);// 通过append向form对象添加数据,可以通过append继续添加数据
        this.axios({
            method:'POST',
            url:'/v3/wenjuan/upload/image',
            withCredentials: true,
            header:{
              'Content-Type':'multipart/form-data;charset=utf-8',
            },
            data:formdata1
        }).then((res) => {
          let url =  res.data.data;
            option.optionName =url;
          console.log(option);
        });
      },
      saveWenjuan() {
        this.axios({
          method:'POST',
          url:'/v3/wenjuan/create/update',
          header:{
            'Content-Type':'multipart/form-data;charset=utf-8',
          },
          data:{
            wenjuanId:this.wenjuanId,
            wenjuanTitle:this.wenjuanTitle,
            welcomeMsg:this.welcomeMsg,
            questionVOList:this.questionVOList
          }
        }).then((res) => {
          alert(res.data.message);
        });
      },
      convertToChinaNum(num) {
        var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
        var arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千','万', '十', '百', '千','亿');//可继续追加更高位转换值
        if(!num || isNaN(num)){
          return "零";
        }
        var english = num.toString().split("")
        var result = "";
        for (var i = 0; i < english.length; i++) {
          var des_i = english.length - 1 - i;//倒序排列设值
          result = arr2[i] + result;
          var arr1_index = english[des_i];
          result = arr1[arr1_index] + result;
        }
        //将【零千、零百】换成【零】 【十零】换成【十】
        result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
        //合并中间多个零为一个零
        result = result.replace(/零+/g, '零');
        //将【零亿】换成【亿】【零万】换成【万】
        result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');
        //将【亿万】换成【亿】
        result = result.replace(/亿万/g, '亿');
        //移除末尾的零
        result = result.replace(/零+$/, '')
        //将【零一十】换成【零十】
        //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
        //将【一十】换成【十】
        result = result.replace(/^一十/g, '十');
        return result;
      },
//      itemClasses(){
//        let result = [];
//        // 如 4.8 对分数进行处理, 向下取0.5的倍数
//        let score = Math.floor(this.rating*2)/2;
//        // 用来判断哪种星星的标准
//        let integer = Math.floor(score);
//        let hasDecimal = score % 1 !== 0;
//        for (let i = 0; i < integer; i++) {
//          result.push('fa-star');
//        };
//        if(hasDecimal) {
//          result.push('fa-star-half-empty');
//        };
//        while(result.length < 5) {
//          result.push('fa-star-0');
//        };
//        return result;
//      }
    },
    computed: {
//      MyRate
//      itemClasses(){
//        let result = [];
//        // 如 4.8 对分数进行处理, 向下取0.5的倍数
//        let score = Math.floor(this.rating*2)/2;
//        // 用来判断哪种星星的标准
//        let integer = Math.floor(score);
//        let hasDecimal = score % 1 !== 0;
//        for (let i = 0; i < integer; i++) {
//          result.push('fa-star');
//        };
//        if(hasDecimal) {
//          result.push('fa-star-half-empty');
//        };
//        while(result.length < 5) {
//          result.push('fa-star-0');
//        };
//        return result;
//      }
    }
  }
</script>

<style>

</style>
