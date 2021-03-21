<template>

  <div style="font-size: medium" id="wenjaunEdit">
    <div id ="wenjuanEditHeader">
      <img src="../assets/icon/arrowLeft.png"/>
      {{ wenjuanTitle }}
      <div style="margin:-10px 0px 0px 500px">问卷制作</div>
      <div style="margin:-18px 0px 0px 580px"><img  src="../assets/icon/arrowRight.png"/></div>

      <div style="margin:-25px 0px 0px 610px">问卷发布</div>
      <div id="wenjuanPreview"><img id="imgPreview" src="../assets/icon/video.png"/>预览</div>
      <div id="wenjuanSave">保存发布</div>
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
          <div class="question3">
            <img class = "imgCenter" src="../assets/icon/check.png"/>
            <div style="font-size: medium">评级题</div>
          </div>
          <div class="question1">
            <img class = "imgCenter" src="../assets/icon/video.png"/>
            <div style="font-size: medium">视频题</div>
          </div>
          <div class="question2">
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
               <div id="questionWel" @click="editWel()">
                  <div id="wenjuanTitleCenter">{{wenjuanTitle}}</div>
               </div>
               <div>{{welcomeMsg}}</div>
               <div id = questionList>
                 <!--问题列表-->
                  <li class="userQuestionBox" v-for="(question,index) in questionListVO"  :key="index"  @click="editQuestionOnRight(question)">
                    <div class="userQuestion">
                        <div style="margin-top: 5px;margin-bottom: 5px">
                          {{index+1}}.{{question.title}}
                        </div>
                        <!--选项列表-->
                        <!--<div class="userOptionBox"  v-for="option in question.optionList">-->
                          <!--<div style="margin-top: 5px;margin-bottom: 8px">-->

                            <!--<input v-if="question.type == 'singleChoice'" name="option.optionName" type="radio" v-bind:value="option.optionName" v-model="option.optionName"/>-->
                            <!--<input  v-if="question.type == 'multipleChoice'" name="option.optionName" type="checkbox" v-model="option.optionName"/>-->
                            <!--{{option.optionName}}-->
                          <!--</div>-->
                        <!--</div>-->
                      <el-radio class="optionClass" v-if="question.type == 'singleChoice'" v-for="(option, oIndex) in question.optionList" :key="oIndex" v-bind:label="option.optionName">
                        <!--<p>{{option.optionName}}</p>-->
                      </el-radio>
                      <el-checkbox class="optionClass" v-if="question.type == 'multipleChoice'" v-for="(option, oIndex) in question.optionList" :key="oIndex" :label="String(option.optionName)">
                        <!--<p>{{option.optionName}}</p>-->
                      </el-checkbox>
                    </div>
                  </li>
               </div>
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
            <!--{{option.optionName}}-->
            <!--<img  class="imgAddOrDelete" src="../assets/icon/iconsAdd.png"/>-->
            <!--<img  class="imgAddOrDelete" src="../assets/icon/iconsDelete.png">-->
          </el-radio>
          <el-checkbox class="optionClassEdit" v-if="questionEditing.type == 'multipleChoice'" v-for="(option, oIndex) in questionEditing.optionList" :key="oIndex" :label="String(option.optionName)">
            <!--<div>{{option.optionName}}</div>-->
            <input class = "optionEditInput" v-model="option.optionName">
            <!--<img @click="addOptionWithIndex(questionEditing.optionList,oIndex)" class="imgAddOrDelete" src="../assets/icon/iconsAdd.png"/>-->
            <!--<img @click="delOptionWithIndex(questionEditing.optionList,oIndex)" class="imgAddOrDelete" src="../assets/icon/iconsDelete.png">-->
            <img  class="imgAddOrDelete" src="../assets/icon/iconsAdd.png"/>
            <img  class="imgAddOrDelete" src="../assets/icon/iconsDelete.png">
          </el-checkbox>
          <div class="addOption" @click="addOption(questionEditing.optionList)">添加选项</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EditWenjuan',
    questionEditing:null,
    data () {

   return {
     wenjuanTitle : '未命名问卷',
     welcomeMsg : '非常感谢您能够参与调查，提供您的看法与意见，希望能够得到您的大力支持和合作，我们极其重视数据安全绝不会泄露任何您的隐私信息，现在我们马上就开始吧！',
     editQuestion:[],
    questionEditing:{
      type:'singleChoice',
      title:'单选题',
      optionList:[
        {
          optionName:'选项一'
        },
        {
          optionName:'选项二'
        },
        {
          optionName:'选项三'
        }
      ]
     },
     showHeaderControl:false,
     singleChoiceUnnamed:{
          type:'singleChoice',
          title:'单选题',
          optionList:[
            {
              optionName:'选项一'
            },
            {
              optionName:'选项二'
            },
            {
              optionName:'选项三'
            }
          ]
        },

        multipleChoiceUnnamed:{
          type:'multipleChoice',
          title:'多选题',
          optionList:[
            {
              optionName:'选项一'
            },
            {
              optionName:'选项二'
            },
            {
              optionName:'选项三'
            }
          ]
        },
        questionListVO : [
        {
          questionId:1,
          wenjuanId:1,
          type:'singleChoice',
          title:'您的年级是什么',
          imgUrls:'',
          optionList:[
            {
              optionName:'大一'
            },
            {
              optionName:'大二'
            },
            {
              optionName:'大三'
            },              {
              optionName:'大四'
            }
          ]
        },
        {
          questionId:2,
          wenjuanId:1,
          type:'singleChoice',
          title:'您的专业是什么',
          imgUrls:'',
          optionList:[
            {
              optionName:'计算机'
            },
            {
              optionName:'信息工程'
            },
            {
              optionName:'通信技术'
            }
          ]
        }
      ]
      }
    },
    methods:{
      addSingleChoice(){
        console.log('单选');
        console.log(this.singleChoiceUnnamed);
        this.questionListVO.push(this.singleChoiceUnnamed);

      },
      addMultipleChoice() {
        this.questionListVO.push(this.multipleChoiceUnnamed);
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
        var length =  this.convertToChinaNum(index);
        var option = {
          "optionName":"选项" + length
        }
//        optionList.push(index, option);
        optionList.splice(index,0,option);
      },
      delOptionWithIndex(optionList, index) {
        optionList.splice(index, 1);
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
      }
    }
  }
</script>

<style>

</style>
