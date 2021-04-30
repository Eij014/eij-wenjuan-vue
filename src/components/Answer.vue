<template>

  <div style="font-size: medium" id="wenjuanEdit">
    <!--<div id="wenjuanEditHeader">-->
      <!--<div class="headerLeft">-->
        <!--<img style="height: 20px" @click="goHome()" src="../assets/icon/arrowLeft.png"/>-->
        <!--问卷预览-->
      <!--</div>-->
      <!--<div class="headerCenter">-->
        <!--<div class="equipments">-->
          <!--<img :class="computerActive==-1 ? 'equipment' : 'equipmentActive'"-->
               <!--src="../assets/icon/computer.png" @click="computerVO()">-->
          <!--<img :class="phoneActive==-1 ? 'equipment' : 'equipmentActive'"-->
               <!--src="../assets/icon/phone.png"  @click="phoneVO()">-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="headerRight">-->
      <!--</div>-->
    <!--</div>-->
    <div style="height: 100%;width: 100%" v-if="equipment==0">
      <div class="wenjuanPrewCenter">
        <div class="wenjuanPrewCenterMid">
          <div id="questionHeader">
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
              v-for="(question,index) in questionVOList" :key="index"
              @click="questionActive=index">
              <div style="margin-top: 5px;margin-bottom: 5px;margin-left: 10px">
                {{question.title}}
              </div>
              <!--选项列表-->
              <el-radio-group v-model="radioArray[index]">
                <el-radio class="optionClass" v-if="question.type == 'singleChoice'"
                          v-for="(option, oIndex) in question.optionList" :key="oIndex"
                          :label="option.optionName"
                          @change="singleRadioChange(question.questionId,question.type,option.optionId)"></el-radio>
                <el-checkbox class="optionClass" v-if="question.type == 'multipleChoice'"
                             v-for="(option, oIndex) in question.optionList" :key="oIndex"
                             :label="String(option.optionName)"
                              @change="multipleRadioChange(question.questionId,question.type,option.optionId)">
                </el-checkbox>
              </el-radio-group>
              <div class="Rating-gray" v-if="question.type=='scoring'">

              </div>
              <div v-if="question.type=='input'">
                <textarea @keyup="inputChange(question.questionId,question.type,question.imgUrls)"
                          @keydown="inputChange(question.questionId,question.type,question.imgUrls)"
                          style="height:80px;width: 800px" v-model="question.imgUrls"> </textarea>
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
              <el-radio-group v-model="radioArray[index]">
                <el-radio class="optionClass" v-if="question.type == 'picture'"
                          v-for="(option, oIndex) in question.optionList" :key="oIndex" v-bind:label="option.optionName"
                          >
                  <!--有图片-->
                  <div class="imageUploadHasImg">
                    <input class="imgUploadInputHasImgInput" accept="image/*" name="multipartFile" id="userUploadImgHasImg"
                           v-on:change="uploadImg(option)" type="file">
                    <img class="imageOptionPreview" :src="option.optionName"/>
                  </div>
                </el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="questionBottom">
            <div class="submmit" @click="submitAnswer()">提交</div>
          </div>
          <br/>
        </div>
      </div>
    </div>
    <div style="height: 100%" v-else>
      <div class="wenjuanPhonePrewCenter">
        <div class="wenjuanPrewCenterMid">
          <img class="wenjuanPrewCenterMidPhoneImg" src="../assets/icon/phoneVO.svg">
          <div class="wenjuanPrewCenterMidQuestion">
            <div class="phoneQuestionHeader">
              <img class="preWenjuanImg" :src="this.imgUrl"/>
              <div class="questionWel">
                <div class="wenjuanTitleCenter" style="font-size: 15px">{{wenjuanTitle}}</div>
                <p></p>
                <div class="welcomeMessage">{{welcomeMsg}}</div>
              </div>
            </div>
            <div class=questionListPhone>
              <div class="noQuestion" v-if="questionVOList.length==0">
                <img class="noQuestionImg" src="../assets/icon/click.png">
                点击控件 或
                <img class="noQuestionImg" src="../assets/icon/move.png">
                把控件拖入此区域
              </div>
              <!--问题列表-->
              <div
                :class="questionActive==index ? 'userQuestionBoxPhoneActive' : 'userQuestionBoxPhone'"
                v-for="(question,index) in questionVOList" :key="index"
                @click="questionActive=index">
                <div style="margin-top: 5px;margin-bottom: 5px;margin-left: 10px">
                  {{question.title}}
                </div>
                <!--选项列表-->
                <el-radio-group :model="radioArray[index]" @change="onclick(index)">
                    <el-radio class="optionClass" v-if="question.type == 'singleChoice'"
                              v-for="(option, oIndex) in question.optionList" :key="oIndex"
                              :label="option.optionName"
                              @change="singleRadioChange(question.questionId,question.type,option.optionId)"></el-radio>
                    <el-checkbox class="optionClass" v-if="question.type == 'multipleChoice'"
                                 v-for="(option, oIndex) in question.optionList" :key="oIndex"
                                 :label="String(option.optionName)"></el-checkbox>
                </el-radio-group>
                <div class="Rating-gray" v-if="question.type=='scoring'">
                  <!--<my-rate  :score.sync='score'/>-->
                  <!--<span v-for="(itemClass,index2) in itemClasses" :class="itemClass" class="star-item" :key="index2"></span>-->
                </div>
                <!--视频题-->
                <div v-if="question.type=='video'">
                  <div v-if="question.imgUrls!=''" class="videoBoxPhone">
                    <video class="videoPhone" :src="question.imgUrls" type="video/mp4" controls>
                    </video>
                  </div>
                  <div v-if="question.imgUrls==''" class="noVideoBox">
                    <img src="../assets/icon/createWenjuan.png"/>
                  </div>
                  <div class="videoOptionPhone">
                    <el-radio class="optionClass" v-if="question.type == 'video'"
                              v-for="(option, oIndex) in question.optionList" :key="oIndex"
                              v-bind:label="option.optionName"></el-radio>
                  </div>
                </div>
                <!--图片题目-->
                <div class="optionClass" v-if="question.type == 'picture'"
                     v-for="(option, oIndex) in question.optionList" :key="oIndex" v-bind:label="option.optionName">
                  <el-radio v-bind:src="option.optionName">
                  </el-radio>
                  <div class="imageUploadHasImg">
                    <img class="pictureHasImgPhone" :src="option.optionName"/>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Answer',
    wenjuanId: 0,
    equipment:0,
    data () {
      var str = window.location.href.split('/');
      this.wenjuanId = str[5];
      this.getWenjuan(this.wenjuanId);
      if (this.getEquipment()) {
        this.equipment = 0;
      } else {
        this.equipment = 1;
      }
      return {
        questionActive: -1,
        deleteActive: -1,
        equipment:0, //0-PC.1-phone
        phoneActive:-1,
        showHeaderControl: true,
        wenjuanId: 0,
        wenjuanTitle: '未命名问卷',
        welcomeMsg: '非常感谢您能够参与调查，提供您的看法与意见，希望能够得到您的大力支持和合作，我们极其重视数据安全绝不会泄露任何您的隐私信息，现在我们马上就开始吧！',
        imgUrl: '',
        questionVOList: [],
        radioArray:[],//el-radio结构要求
        resultList:[]//结果集合，每个题目只能有一个结果
      };
    },
    methods:{
      getEquipment() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      },
      getWenjuan(wenjuanId) {
        this.axios({
          method: 'GET',
          url: '/wenjuan/detail',
          params: {
            wenjuanId: wenjuanId,
            type:'answer'
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
        this.axios({
          method: 'GET',
          url: '/wenjuan/init/img/url',
          withCredentials: true
        }).then((res) => {
          this.imgUrl = res.data.data;
      });
      },
      goHome() {
        this.$router.push({path: '/home'})
      },
      computerVO() {
        this.computerActive = 0;
        this.phoneActive = -1;
      },
      phoneVO() {
        this.phoneActive = 0;
        this.computerActive = -1;
      },
      /**
       * 单选题
       * @param questionId
       * @param type
       * @param optionId
         */
      singleRadioChange(questionId, type,optionId) {
        let currentQuestionResult = {
              questionId:questionId,
              type:type,
              optionId:optionId,
              text:''
        }
        //去重
        let hasQuestion = false
        for (let result of this.resultList) {
            if(result.questionId == currentQuestionResult.questionId) {
              console.log(true);
              result.optionId = currentQuestionResult.optionId;
              hasQuestion = true;
            }
        }
        if (!hasQuestion) {
          this.resultList.push(currentQuestionResult);
        }
        console.log(this.resultList);
      },
      /**
       * 多选题
       * @param questionId
       * @param type
       * @param optionId
         */
      multipleRadioChange(questionId, type,optionId) {
        let currentQuestionResult = {
          questionId:questionId,
          type:type,
          optionIdList:[optionId],
          text:''
        }
        let hasQuestion = false;
        let hasOption = false;
        for (let questionIndex = 0;questionIndex < this.resultList.length; questionIndex++) {
          let result = this.resultList[questionIndex];
          if(result.questionId == questionId) {
            hasQuestion = true;
            for (let optionIndex = 0;optionIndex < result.optionIdList.length; optionIndex++) {
              let option = result.optionIdList[optionIndex];
              //取消选中
              if (option == optionId) {
                hasOption = true;
                result.optionIdList.splice(optionIndex, 1);
              }
            }
            //没有选择过
            if (!hasOption) {
              result.optionIdList.push(optionId);
            }
            //全部取消
            if (result.optionIdList.length == 0) {
              this.resultList.splice(questionIndex, 1);
            }
          }
        }
        //没有回答过
        if (!hasQuestion) {
          this.resultList.push(currentQuestionResult);
        }
        console.log(this.resultList);
      },
      /**
       * 输入框
       */
      inputChange(questionId,type, text) {
        console.log('触发输入框改变啦' + questionId);
        let currentQuestionResult = {
          questionId:questionId,
          type:type,
          optionIdList:[],
          text:text
        }
        let hasQuestion = false;
        for (let questionIndex = 0;questionIndex < this.resultList.length; questionIndex++) {
          let result = this.resultList[questionIndex];
          if (result.questionId == questionId) {
            hasQuestion = true;
            result.text = text;
          }
        }
        //没有回答过
        if (!hasQuestion) {
          this.resultList.push(currentQuestionResult);
        }
        console.log(this.resultList)
      },
      submitAnswer() {
        console.log(this.resultList);
        this.axios({
          method: 'POST',
          url: 'wenjuan/answer',
          header: {
            'Content-Type': 'application/json',
          },
          data: {
            wenjuanId:this.wenjuanId,
            resultList:this.resultList
          }
        }).then((res) => {
          if (res.data.code==0) {
             this.$message({
                 message:'提交成功！',
                 type:'success'
              })
          }

      });
      }

    },

    computed: {
    }
  }
</script>

<style>

</style>
