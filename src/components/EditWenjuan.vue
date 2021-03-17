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
          <div class="question2">
            <img class = "imgCenter" src="../assets/icon/check.png"/>
            <div style="font-size: medium">多选框</div>
          </div>
          <div class="question3">
            <img class = "imgCenter" src="../assets/icon/check.png"/>
            <div style="font-size: medium">多选框</div>
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
            <div style="font-size: medium">多选框</div>
          </div>
        </div>
      </div>
      <div id = "wenjuanEditCenterMid"></div>
             <div id="questionHeader">
               <div id="wenjuanTitleCenter">
                 {{wenjuanTitle}}
               </div>
               <div>{{welcomeMsg}}</div>
               <div id = questionList>
                  <li id="userQuestionBox" v-for="question in singleChoiceList"  :key="question.questionId">
                      <!--{{index+1}}.-->
                      {{question.title}}
                    <li id="userOptionBox"  v-for="option in question.optionList" :key="option.optionId">
                      {{option.optionName}}
                    </li>
                  </li>
               </div>
             </div>
      <div id = "wenjuanEditCenterRight"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EditWenjuan',

    data () {
      return {
        wenjuanTitle:'未命名问卷',
        welcomeMsg: '非常感谢您能够参与调查，提供您的看法与意见，希望能够得到您的大力支持和合作，我们极其重视数据安全绝不会泄露任何您的隐私信息，现在我们马上就开始吧！',
        singleChoiceList:[
          {
            questionId:1,
            wenjuanId:1,
            type:'singleChoice',
            title:'您对加班什么看法',
            imgUrls:'',
            qIndex:1,
            optionList:[
              {
                optionId:1,
                questionId:1,
                optionName:'可以接受'
              },
              {
                optionId:2,
                questionId:1,
                optionName:'不太希望加班'
              },
              {
                optionId:3,
                questionId:1,
                optionName:'无所谓'
              }
            ]
          }
        ],
        multipleChoiceList:[],
        pictureList:[],
        videoList:[]
      }
    },
    methods:{
      addSingleChoice(){
        console.log('单选');

      }
    }
  }
</script>

<style>

</style>
