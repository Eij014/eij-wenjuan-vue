<template>

  <div style="font-size: medium" id="wenjuanEdit">
    <div id="wenjuanEditHeader">
      <div class="headerLeft">
        <img style="margin-right: 5%" @click="goHome()" src="../assets/icon/arrowLeft.png"/>
        {{ wenjuanTitle }}
      </div>
      <div class="headerCenter">
        <div style="color: #0b97c4;margin-right: 5%">问卷制作</div>
        <div style="margin-right: 5%"><img src="../assets/icon/arrowRight.png"/></div>
        <div>问卷发布</div>
      </div>
      <div class="headerRight">
        <div class="preview" @click="preview(wenjuanId)"><img id="imgPreview" src="../assets/icon/video.png"/>
          <div style="font-size: 14px">预览</div>
        </div>
        <div class="wenjuanSave" @click="saveWenjuan()">
          <div style="font-size: 14px;margin-left: 30%">保存</div>
        </div>
        <div class="wenjuanPublish" @click="publishWenjuan(wenjuanId)">
          <div style="font-size: 14px;margin-left: 30%">发布</div>
        </div>
      </div>
        <!--<p class="horizontalLine"></p>-->
    </div>

    <div class="wenjuanEditCenter">
      <div class="wenjuanEditCenterLeft">
        <div class="wenjuanEditCenterLeftSubTitle">基本控件</div>
            <div id="questionBox">
              <div
                  @click="addSingleChoice(-1)" class="question1" draggable="true"
                  @dragstart="questionDragStart($event,questionTypeList[0])"
                  @drag="testing($event,questionTypeList[0])"
                  @dragend="questionDragEnter($event,questionTypeList[0])">
                <!--onmousedown="mouseDown()"-->
                <!--onmouseup="mouseUp()"-->
                <img class="imgCenter" src="../assets/icon/singleChoice.png"/>
                <div style="font-size: medium">单选题</div>
              </div>
              <div @click="addMultipleChoice(-1)" class="question2" draggable="true"
                   @dragstart="questionDragStart($event,questionTypeList[1])"
                   @drag="testing($event,questionTypeList[1])"
                   @dragend="questionDragEnter($event,questionTypeList[1])">
                <img class="imgCenter" src="../assets/icon/check.png"/>
                <div style="font-size: medium">多选题</div>
              </div>
              <!--<div @click="addScore()" class="question3" draggable="true">-->
                <!--<img class="imgCenter" src="../assets/icon/score.png"/>-->
                <!--<div style="font-size: medium">评分题</div>-->
              <!--</div>-->
              <div @click="addVideo(-1)" class="question1" draggable="true"
                   @dragstart="questionDragStart($event,questionTypeList[2])"
                   @drag="testing($event,questionTypeList[2])"
                   @dragend="questionDragEnter($event,questionTypeList[2])">
                <img class="imgCenter" src="../assets/icon/video.png"/>
                <div style="font-size: medium">视频题</div>
              </div>
              <div @click="addPicture(-1)" class="question2" draggable="true"
                   @dragstart="questionDragStart($event,questionTypeList[3])"
                   @drag="testing($event,questionTypeList[3])"
                   @dragend="questionDragEnter($event,questionTypeList[3])">
                <img class="imgCenter" src="../assets/icon/picture.png"/>
                <div style="font-size: medium">图片题</div>
              </div>
              <!--<div class="question3">-->
                <!--<img class="imgCenter" src="../assets/icon/check.png"/>-->
                <!--<div style="font-size: medium"></div>-->
              <!--</div>-->
            </div>
      </div>
      <div class="wenjuanEditCenterMid">
        <div id="questionHeader" @click="showHeaderControl = true; questionActive= -1;deleteActive = -1">
          <img class="editingWenjuanImg" :src="this.imgUrl"/>
          <div class="questionWel">
            <div class="wenjuanTitleCenter" style="font-size: large">{{wenjuanTitle}}</div>
            <p></p>
            <div class="welcomeMessage">{{welcomeMsg}}</div>
          </div>
        </div>
        <div class=questionList>
          <div class="noQuestion" v-if="questionVOList.length==0">
            <img class="noQuestionImg" src="../assets/icon/click.png">
            点击控件 或
            <img class="noQuestionImg" src="../assets/icon/move.png">
            把控件拖入此区域
          </div>
          <!--问题列表-->
          <div
            class="userQuestionBox"
            v-for="(question,index) in questionVOList" :key="index" @click="editQuestionOnRight(index, question)"
            tabindex="0">
            <img @click="deleteQuestion(index)"
                 :class="deleteActive==index ? 'deleteActive':'delete'"
                 src="../assets/icon/delete.png"/>
            <div style="margin-top: 5px;margin-bottom: 5px;margin-left: 10px">
              {{question.title}}
            </div>
            <!--选项列表-->
            <el-radio class="optionClass" v-if="question.type == 'singleChoice'"
                      v-for="(option, oIndex) in question.optionList" :key="oIndex"
                      v-bind:label="option.optionName"></el-radio>
            <el-checkbox class="optionClass" v-if="question.type == 'multipleChoice'"
                         v-for="(option, oIndex) in question.optionList" :key="oIndex"
                         :label="String(option.optionName)"></el-checkbox>
            <div class="Rating-gray" v-if="question.type=='scoring'">
              <!--<my-rate  :score.sync='score'/>-->
              <!--<span v-for="(itemClass,index2) in itemClasses" :class="itemClass" class="star-item" :key="index2"></span>-->
            </div>
            <!--视频题-->
            <div v-if="question.type=='video'">
              <div v-if="question.imgUrls!=''" class="videoBox">
                <video class="video" :src="question.imgUrls" type="video/mp4" controls>
                </video>
              </div>
              <div v-if="question.imgUrls==''" class="noVideoBox">
                  <input class="videoUploadInput" accept="video/*" name="multipartFile" id="userUploadVideo"
                         v-on:change="uploadVideo(question)" type="file">
                  </input>
                <img src="../assets/icon/createWenjuan.png"/>
              </div>
              <div class="videoOption">
                <el-radio class="optionClass" v-if="question.type == 'video'"
                          v-for="(option, oIndex) in question.optionList" :key="oIndex"
                          v-bind:label="option.optionName"></el-radio>
              </div>
            </div>
            <!--图片题目-->
            <el-radio class="optionClassPic" v-if="question.type == 'picture'"
                      v-for="(option, oIndex) in question.optionList" :key="oIndex" v-bind:label="option.optionName">
              <!--没有图片-->
              <div class="uploadPicture" v-if="option.optionName==''">
                <input class="imgUploadInput" accept="image/*" name="multipartFile" id="userUploadImg"
                         v-on:change="uploadImg(option)" type="file">
                <img src="../assets/icon/createWenjuan.png"/>
              </div>
              <!--有图片-->
              <div class="imageUploadHasImg" v-else>
                <img :class="imageUploadHasImgJudge(question.optionList)" :src="option.optionName"/>
              </div>
            </el-radio>
          </div>
        </div>
        <div class="questionBottom">
          <div class="submmit">提交</div>
        </div>
        <br/>
      </div>
      <div id="wenjuanEditCenterRight">
        <div v-if="showHeaderControl">
          <div class="editControlTitle">头部控件</div>
          <p class="horizontalLine"></p>
          <div class="editName">问卷名称</div>
          <input style="height: 20px" v-model="wenjuanTitle">
          <div class="editName">描述</div>
          <textarea style="height: 80px" v-model="welcomeMsg"> </textarea>
        </div>
        <div v-else>
          <div v-if="questionEditing.type == 'singleChoice'">
            <div class="editControlTitle">单选题</div>
          </div>
          <div v-if="questionEditing.type == 'multipleChoice'">
            <div class="editControlTitle">多选题</div>
          </div>
          <div v-if="questionEditing.type == 'video'">
            <div class="editControlTitle">视频题</div>
          </div>
          <div v-if="questionEditing.type == 'picture'">
            <div class="editControlTitle">图片题</div>
          </div>
          <p class="horizontalLine"></p>
          <div class="editName">标题</div>
          <input style="height: 20px" v-model="questionEditing.title">
          <div class="editName">选项设置</div>
          <el-radio class="optionClassEdit" v-if="questionEditing.type == 'singleChoice'"
                    v-for="(option, oIndex) in questionEditing.optionList" :key="oIndex"
                    :label="String(option.optionName)">
            <input class="optionEditInput" v-model="option.optionName">
            <img @click="addOptionWithIndex(questionEditing.optionList,oIndex)" class="imgAddOrDelete"
                 src="../assets/icon/iconsAdd.png"/>
            <img @click="delOptionWithIndex(questionEditing.optionList,oIndex)" class="imgAddOrDelete"
                 src="../assets/icon/iconsDelete.png">
          </el-radio>
          <el-radio class="picOptionClassEdit" v-if="questionEditing.type == 'picture'"
                    v-for="(option, oIndex) in questionEditing.optionList" :key="oIndex"
                    :label="String(option.optionName)">
            <img class="picOptionClassEditImg" :src="option.optionName"/>
            <img @click="addPicOptionWithIndex(questionEditing.optionList,oIndex)" class="imgAddOrDeletePic"
                 src="../assets/icon/iconsAdd.png"/>
            <img @click="delOptionWithIndex(questionEditing.optionList,oIndex)" class="imgAddOrDeletePic"
                 src="../assets/icon/iconsDelete.png">
          </el-radio>
          <el-radio class="optionClassEdit" v-if="questionEditing.type == 'video'"
                    v-for="(option, oIndex) in questionEditing.optionList" :key="oIndex"
                    :label="String(option.optionName)">
            <input class="optionEditInput" v-model="option.optionName">
            <img @click="addOptionWithIndex(questionEditing.optionList,oIndex)" class="imgAddOrDelete"
                 src="../assets/icon/iconsAdd.png"/>
            <img @click="delOptionWithIndex(questionEditing.optionList,oIndex)" class="imgAddOrDelete"
                 src="../assets/icon/iconsDelete.png">
          </el-radio>

          <el-checkbox class="optionClassEdit" v-if="questionEditing.type == 'multipleChoice'"
                       v-for="(option, oIndex) in questionEditing.optionList" :key="oIndex"
                       :label="String(option.optionName)">
            <input class="optionEditInput" v-model="option.optionName">
            <img @click="addOptionWithIndex(questionEditing.optionList,oIndex)" class="imgAddOrDelete"
                 src="../assets/icon/iconsAdd.png"/>
            <img @click="delOptionWithIndex(questionEditing.optionList,oIndex)" class="imgAddOrDelete"
                 src="../assets/icon/iconsDelete.png">
          </el-checkbox>
          <div class="addOption" @click="addOption(questionEditing.type, questionEditing.optionList)">添加选项</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  function test(fn, threshhold) {
    threshhold || (threshhold = 250);
    var last,
      deferTimer;
    return function () {
      var context = this;

      var now = +new Date,
        args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }
  export default {
    name: 'EditWenjuan',
    wenjuanId: 0,
    data () {
      if (this.$router.currentRoute.query.wenjuanId != 0
        && this.$router.currentRoute.query.wenjuanId != undefined) {
        this.getWenjuan(this.$router.currentRoute.query.wenjuanId);
      } else {
        this.getImgUrl();
      }
      return {
        inserting:false,
        testIndex:0,
        questionActive: -1,
        deleteActive: -1,
        showHeaderControl: true,
        click:false, //鼠标是否摁下
        mouseX:0,//鼠标横坐标
        mouseY:0,//鼠标纵坐标
        mouseAfterMoveX:0,//鼠标移动后松开时横坐标
        mouseAfterMoveY:0,//鼠标移动后松开时纵坐标坐标
//        questionListLeftTopX:0,//问题列表左上角横坐标
//        questionListLeftTopY:0,//问题列表左上角纵坐标
//        questionListRightBottomX:0,//问题列表右下角横坐标
//        questionListRightBottomY:0,//问题列表右下角横坐标
        //问题类型列表
        questionTypeList:[
          {
            nameEn:'singleChoice',
            nameCn:'单选题',
            icon:require('../assets/icon/singleChoice.png')
          },
          {
            nameEn:'multipleChoice',
            nameCn:'多选题',
            icon:require('../assets/icon/check.png')
          },
          {
            nameEn:'video',
            nameCn:'视频题',
            icon:require('../assets/icon/video.png')
          },
          {
            nameEn:'picture',
            nameCn:'图片题',
            icon:require('../assets/icon/picture.png')
          }
        ],
        wenjuanId: 0,
        draggingQuestion:null,
        wenjuanTitle: '未命名问卷',
        welcomeMsg: '非常感谢您能够参与调查，提供您的看法与意见，希望能够得到您的大力支持和合作，我们极其重视数据安全绝不会泄露任何您的隐私信息，现在我们马上就开始吧！',
        imgUrl: '',
        questionVOList: [],
        questionEditing: undefined
      }
    },
    methods: {
//      init() {
//          let questionListElement = document.getElementById('questionList');
//          console.log(questionListElement);
//          //问题列表的左上角坐标
//          //1.x坐标
//          let offsetLeft = questionListElement.offsetLeft;
//          let offsetParent = questionListElement.offsetParent;
//        console.log('testInit()1')
//          while (offsetParent !== null) {
//            offsetLeft += offsetParent.offsetLeft;
//            offsetParent = offsetParent.offsetParent;
//          }
//
//          //2.坐标
//          let offsetTop = questionListElement.offsetTop;
//          offsetParent = questionListElement.offsetParent;
//          while (offsetParent !== null){
//            offsetTop += (offsetParent.offsetTop+offsetParent.clientTop);
//            offsetParent = offsetParent.offsetParent;
//          }
//          this.questionListLeftTopX = offsetLeft;
//          this.questionListLeftTopY = offsetTop;
//          //问题列表的右下角坐标
//          //1.问题列表高、宽
//          let width = questionListElement.offsetWidth;
//          let height = questionListElement.offsetHeight;
//          this.questionListRightBottomX = this.questionListLeftTopX + width;
//          this.questionListRightBottomY = this.questionListLeftTopY + height;
//
//          console.log('左上角X坐标=')
//          console.log(this.questionListLeftTopX)
//          console.log('左上角Y坐标=')
//          console.log(this.questionListLeftTopY)
//          console.log('问题列表宽度')
//          console.log(width);
//          console.log('问题列表高度')
//          console.log(height);
//          console.log('右下角X坐标=')
//          console.log(this.questionListRightBottomX)
//          console.log('右下角Y坐标=')
//          console.log(this.questionListRightBottomY)
//
//      },
      getWenjuan(wenjuanId) {
        this.axios({
          method: 'GET',
          url: '/wenjuan/detail',
          withCredentials: true,
          params: {
            wenjuanId: wenjuanId
          }
        }).then((res) => {
        this.wenjuanId = res.data.data.wenjuanId;
        this.wenjuanTitle = res.data.data.wenjuanTitle;
        this.welcomeMsg = res.data.data.welcomeMsg;
        this.questionVOList = res.data.data.questionVOList;
        this.imgUrl = res.data.data.imgUrl;
      });
      },
      getImgUrl() {
        console.log(this.$cookies.get("userToken"));
        this.axios({
          method: 'GET',
          url: '/wenjuan/init/img/url',
          withCredentials: true
        }).then((res) => {
          console.log('获取图片');
        this.imgUrl = res.data.data;
      })
        ;
      },
      addSingleChoice(index){

        let singleChoiceUnnamed = {
          "questionId": 0,
          "wenjuanId": this.wenjuanId,
          "must": 0,
          "imgUrls": '',
          "questionIndex": 0,
          "type": 'singleChoice',
          "title": '单选题',
          "optionList": [
            {
              "optionId": 0,
              "questionId": 0,
              "optionName": '选项一',
              "optionIndex": 0
            },
            {
              "optionId": 0,
              "questionId": 0,
              "optionName": '选项二',
              "optionIndex": 0
            },
            {
              "optionId": 0,
              "questionId": 0,
              "optionName": '选项三',
              "optionIndex": 0
            }
          ]
        }
        if (index < 0) {
          this.questionVOList.push(singleChoiceUnnamed);
        } else {
          this.questionVOList.splice(index,0,singleChoiceUnnamed);
        }
      },
      addMultipleChoice(index) {
        let multipleChoiceUnnamed = {
          "questionId": 0,
          "wenjuanId": this.wenjuanId,
          "must": 0,
          "imgUrls": '',
          "questionIndex": 0,
          "type": 'multipleChoice',
          "title": '多选题',
          "optionList": [
            {
              "optionId": 0,
              "questionId": 0,
              "optionName": '选项一',
              "optionIndex": 0
            },
            {
              "optionId": 0,
              "questionId": 0,
              "optionName": '选项二',
              "optionIndex": 0
            },
            {
              "optionId": 0,
              "questionId": 0,
              "optionName": '选项三',
              "optionIndex": 0
            }
          ]
        }
        if (index < 0) {
          this.questionVOList.push(multipleChoiceUnnamed);
        } else {
          this.questionVOList.splice(index,0,multipleChoiceUnnamed);
        }
      },
      addScore() {
        this.questionVOList.push(this.scoringQuestionUnnamed);
      },
      addVideo(index) {
        let videoUnnamed = {
          "questionId": 0,
          "wenjuanId": this.wenjuanId,
          "must": 0,
          "imgUrls": '',
          "type": 'video',
          "title": '观看视频，做出您的选择',
          "optionList": [
            {
              "optionId": 0,
              "questionId": 0,
              "optionName": '选项一',
              "optionIndex": 0
            },
            {
              "optionId": 0,
              "questionId": 0,
              "optionName": '选项二',
              "optionIndex": 0
            },
            {
              "optionId": 0,
              "questionId": 0,
              "optionName": '选项三',
              "optionIndex": 0
            }
          ]
        };
        if (index < 0) {
          this.questionVOList.push(videoUnnamed);
        } else {
          this.questionVOList.splice(index,0,videoUnnamed);
        }
      },
      addPicture(index) {
        let pictureUnnamed = {
          "questionId": 0,
          "wenjuanId": this.wenjuanId,
          "must": 0,
          "imgUrls": '',
          "type": 'picture',
          "title": '从以下图片中选出一张',
          "optionList": [
            {
              "optionId": 0,
              "questionId": 0,
              "optionName": '',
              "optionIndex": 0
            }
          ]
        }
        if (index < 0) {
          this.questionVOList.push(pictureUnnamed);
        } else {
          this.questionVOList.splice(index,0,pictureUnnamed);
        }
      },
      imageUploadHasImgJudge(optionList) {
        for (let option of optionList) {
          if(option == '') {
            return 'uploadPictureHasImgAndHasBlankImg';
          }
        }
        return 'uploadPictureHasImg';
      },
      mouseDown(event){
        let test = window.event;
        console.log('鼠标摁下了')
        console.log(test.target)
        console.log('当前位置classList=')
        console.log(test.target.classList);
      },
      mouseUp(event) {
        let test = window.event;
        console.log('鼠标松开了')
        console.log(test.target)
        console.log('当前位置classList=')
        console.log(test.target.classList);
      },
      questionDragStart(e,questionType) {
          this.draggingQuestion = questionType;
            e.dataTransfer.dropEffect = 'move'//为需要移动的元素设置dragstart事件
        $(".question1").draggable({
          cursor: "move"
        });
        console.log('拖拽开始了')

      },
      questionDragOn(e) {

      },
      questionDragging(e, questionType) {
//        console.log(e);
//        console.log(questionType);
        e.dataTransfer.dropEffect = 'move'// e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
        let elementArray = document.elementsFromPoint(e.pageX, e.pageY);
        this.mouseY = e.pageY;
//        console.log('原y坐标')
//        console.log(this.mouseAfterMoveY)
//        console.log('现y坐标')
//        console.log(e.pageY)
        if (e.pageY != this.mouseAfterMoveY) {
          for (let element of elementArray) {
            let classList = element.classList;
            for (let className of classList) {
              if (className == 'questionList') {
                let questionListElement = document.getElementsByClassName('questionList')[0];
                let userQuestionBoxArray = document.getElementsByClassName('userQuestionBox');
                let questionInserting = document.getElementsByClassName('questionInserting');
                //在空白区域上额外显示一个待插入题目
                if (this.questionVOList.length == 0 && questionInserting.length == 0) {
                  this.inserting = true;
                  var dom = document.createElement('div');
                  dom.className = 'questionInserting';
                  //题型图标
                  let img = document.createElement('img');
                  img.src = questionType.icon;
                  img.className = 'imgInserting'
                  dom.appendChild(img);
                  dom.appendChild(document.createElement('br'));
                  //题型中文名
                  dom.appendChild(document.createTextNode(questionType.nameCn));
                  let noQuestion = document.getElementsByClassName('noQuestion')[0];
                  questionListElement.insertBefore(dom, noQuestion);
                }
                //在已有题目列表中插入新题目
                if (this.questionVOList.length != 0) {
                  //当前鼠标位置Y坐标
                  let mouseY = e.pageY;
                  //判断鼠标位置Y坐标与每个question区域关系，决定插入位置
                  for (let questionIndex = 0; questionIndex < userQuestionBoxArray.length; questionIndex++) {
                    let question = userQuestionBoxArray[questionIndex];
                    //quesiton区域左上角Y坐标offsetTop
                    let offsetTop = question.getBoundingClientRect().top;
//                    let offsetParent = question.offsetParent;
//                    while (offsetParent !== null) {
//                      offsetTop += (offsetParent.offsetTop + offsetParent.clientTop);
//                      offsetParent = offsetParent.offsetParent;
//                    }
                    //问题区域在网页可见区域中的高度
                    let questionHeight = question.offsetHeight
                    var dom = document.createElement('div');
                    dom.className = 'questionInsertingHasQuestion';
                    //题型图标
                    let img = document.createElement('img');
                    img.src = questionType.icon;
                    img.className = 'imgInserting'
                    dom.appendChild(img);
                    dom.appendChild(document.createElement('br'));
                    //题型中文名
                    dom.appendChild(document.createTextNode(questionType.nameCn));
                    //如果鼠标当前位置在问题区域上半部分，则将新问题插入当前问题之前
                    let questionElement = document.getElementsByClassName('questionList')[0];
                    if (mouseY < (offsetTop + (questionHeight / 2))){
//                      && (question.previousElementSibling == null
//                      || question.previousElementSibling == undefined
//                      || question.previousElementSibling.className != 'questionInsertingHasQuestion')) {
//                      console.log(questionIndex);
//                      console.log(mouseY);
//                      console.log(offsetTop);
//                      console.log(questionHeight);
//                      console.log('之前插入')
                      let questionInsertingHasQuestion = document.getElementsByClassName('questionInsertingHasQuestion');
                      if (questionInsertingHasQuestion.length > 0) {
                        if (questionInsertingHasQuestion[0] != undefined && questionInsertingHasQuestion[0] != null) {
                          questionElement.removeChild(questionInsertingHasQuestion[0]);
                        }
                      }
//                      console.log(question);
                      questionListElement.insertBefore(dom, question);
//                      console.log(questionIndex)
//                      console.log('之前插入完成')
                      break;
                    } else if (mouseY > (offsetTop + (questionHeight / 2))
                      && questionIndex == userQuestionBoxArray.length - 1){
//                      && (question.nextElementSibling == null
//                      || question.nextElementSibling == undefined
//                      || question.nextElementSibling.className != 'questionInsertingHasQuestion')) {
                      //如果鼠标当前位置在问题区域下半部分，且该问题是最后一个，则将新问题插入当前问题之后
                      let questionInsertingHasQuestion = document.getElementsByClassName('questionInsertingHasQuestion');
                      if (questionInsertingHasQuestion.length > 0) {
                        if (questionInsertingHasQuestion[0] != undefined && questionInsertingHasQuestion[0] != null) {
                          questionElement.removeChild(questionInsertingHasQuestion[0]);
                        }
                      }
                      if (question.parentNode.lastChild == question) {
                        question.parentNode.appendChild(dom);
                      } else {
                        question.parentNode.insertBefore(dom, question.nextSibling);
                      }
//                      console.log('插入完成')
                      break;
                    }

                  }
                }
              }
            }
          }
        }
        this.mouseAfterMoveY = e.pageY;
      },
      addQuestionWithIndex(questionType, index) {
        switch (questionType.nameEn) {
          case 'singleChoice':
            this.addSingleChoice(index);
            break;
          case 'multipleChoice':
            this.addMultipleChoice(index);
            break;
          case 'video':
            this.addVideo(index);
            break;
          case 'picture':
            this.addPicture(index);
            break;
          default:
            break;
        }
      },
      questionDragEnter(e, questionType) {
          e.dataTransfer.effectAllowed = 'move'//为需要移动的元素设置dragstart事件
        this.inserting = false;
        //删除拖拽过程中创建的dom
        let questionElement = document.getElementsByClassName('questionList')[0];
        let questionInserting = document.getElementsByClassName('questionInserting')[0];
        let questionInsertingHasQuestion = document.getElementsByClassName('questionInsertingHasQuestion')[0];
        if (questionInserting != undefined && questionInserting != null) {
          questionElement.removeChild(questionInserting);
        }
        if (questionInsertingHasQuestion != undefined && questionInsertingHasQuestion != null) {
          questionElement.removeChild(questionInsertingHasQuestion);
        }
        let elementArray = document.elementsFromPoint(e.pageX, e.pageY);
        for (let element of elementArray) {
          let classList = element.classList;
          for (let className of classList) {
            if (className =='questionList') {
              console.log('插入题目')
              let questionListElement = document.getElementsByClassName('questionList')[0];
              let userQuestionBoxArray = document.getElementsByClassName('userQuestionBox');
              //在空白区域插入一个题目
              if (this.questionVOList.length == 0) {
                console.log('插入题目')
                this.addQuestionWithIndex(questionType, -1);
              }
              //在已有题目列表中插入新题目
              if (this.questionVOList.length != 0) {
                console.log('有问题时插入题目')
                //当前鼠标位置Y坐标
                let mouseY = e.pageY;
                //判断鼠标位置Y坐标与每个question区域关系，决定插入位置
                for (let questionIndex = 0; questionIndex < userQuestionBoxArray.length; questionIndex++) {
                  let question = userQuestionBoxArray[questionIndex];
                  //quesiton区域左上角Y坐标offsetTop
                  let offsetTop = question.getBoundingClientRect().top;
//                    let offsetParent = question.offsetParent;
//                    while (offsetParent !== null) {
//                      offsetTop += (offsetParent.offsetTop + offsetParent.clientTop);
//                      offsetParent = offsetParent.offsetParent;
//                    }
                  //问题区域在网页可见区域中的高度
                  let questionHeight = question.offsetHeight
                  //如果鼠标当前位置在问题区域上半部分，则将新问题插入当前问题之前
                  if (mouseY < (offsetTop + (questionHeight / 2))){
                    console.log('之前插入')
                    this.addQuestionWithIndex(questionType, questionIndex);
                    console.log('之前插入完成')
                    break;
                  } else if (mouseY > (offsetTop + (questionHeight / 2))
                    && questionIndex == userQuestionBoxArray.length - 1){
                    //如果鼠标当前位置在问题区域下半部分，且该问题是最后一个，则将新问题插入当前问题之后
                    if (question.parentNode.lastChild == question) {
                      this.addQuestionWithIndex(questionType, -1);
                    } else {
                      this.addQuestionWithIndex(questionType, questionIndex);
                    }
                    console.log('插入完成')
                    break;
                  }
                }
              }
          }
        }
//        if (window.event.target.classList.indexOf('questionList') > -1) {
//          console.log('当前鼠标位置')
//          console.log('在问题列表区域')
//          console.log('允许释放')
//        } else {
//          console.log('鼠标松开了2。。。')
//          switch (questionType.nameEn) {
//            case 'singleChoice':
//              this.addSingleChoice();
//              break;
//            case 'multipleChoice':
//              this.addMultipleChoice();
//              break;
//            case 'video':
//              this.addVideo();
//              break;
//            case 'picture':
//              this.addPicture();
//              break;
//            default:
//              break;
//          }
//          console.log('鼠标松开了3。。。')
        }
      },
      editWel() {
        this.showHeaderControl = true;
      },
      editQuestionOnRight(index, question) {
        this.questionActive = index;
        this.deleteActive = index;
        this.questionEditing = question;
        this.showHeaderControl = false;
      },
      addOption(type, optionList) {
        var length = this.convertToChinaNum(optionList.length + 1);
        var option = {
          "optionName": type == 'picture' ? '' : "选项" + length
        }

        optionList.push(option);
      },
      addOptionWithIndex(optionList, index) {
        var length = this.convertToChinaNum(index + 1);
        var option = {
          "optionName": "选项" + length
        }
        optionList.splice(index, 0, option);
      },
      addPicOptionWithIndex(optionList, index){
        var option = {
          "optionName": ''
        }
        optionList.splice(index, 0, option);
      },
      delOptionWithIndex(optionList, index) {
        optionList.splice(index, 1);
      },
      deleteQuestion(index) {
        this.questionVOList.splice(index, 1);
      },
      uploadVideo(question) {
        var file = document.getElementById("userUploadVideo").files[0];
        console.log(file);
        var formdata1 = new FormData();// 创建form对象
        formdata1.append('multipartFile', file);
        formdata1.append('name', 'video');// 通过append向form对象添加数据,可以通过append继续添加数据
        this.axios({
          method: 'POST',
          url: 'wenjuan/upload/image',
          withCredentials: true,
          header: {
            'Content-Type': 'multipart/form-data;charset=utf-8',
          },
          data: formdata1
        }).then((res) => {
        question.imgUrls = res.data.data;

      });
      },
      uploadImg(option) {
        var file = document.getElementById("userUploadImg").files[0];
        var formdata1 = new FormData();// 创建form对象
        formdata1.append('multipartFile', file);
        formdata1.append('name', 'name');// 通过append向form对象添加数据,可以通过append继续添加数据
        this.axios({
          method: 'POST',
          url: '/wenjuan/upload/image',
          withCredentials: true,
          header: {
            'Content-Type': 'multipart/form-data;charset=utf-8',
          },
          data: formdata1
        }).then((res) => {
          let url = res.data.data;
        option.optionName = url;
      });
      },
      saveWenjuan() {
        this.axios({
          method: 'POST',
          url: '/wenjuan/create/update',
          header: {
            'Content-Type': 'application/json',
          },
          data: {
            wenjuanId: this.wenjuanId,
            wenjuanTitle: this.wenjuanTitle,
            imgUrl : this.imgUrl,
            welcomeMsg: this.welcomeMsg,
            questionVOList: this.questionVOList
          }
        }).then((res) => {
          alert(res.data.message);
      });
      },
      preview(wenjuanId) {
        this.$router.push({path: '/previewWenjuan', query: {wenjuanId: wenjuanId}})
      },
      publishWenjuan(wenjuanId) {
        this.axios({
          method: 'GET',
          url: '/wenjuan/publish',
          params: {
            wenjuanId: this.wenjuanId
          }
        }).then((res) => {
        if (res.data.data == 1) {
          this.$router.push({path: '/publish', query: {wenjuanId: wenjuanId}})
        } else {
          alert(res.data.message);
        }
      });
      },
      goHome() {
        this.$router.push({path: '/home'})
      },
      convertToChinaNum(num) {
        var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
        var arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿');//可继续追加更高位转换值
        if (!num || isNaN(num)) {
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
    created() {
      this.testing = test(this.questionDragging,800)
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
