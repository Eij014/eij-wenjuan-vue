<template>

  <div style="font-size: medium" id="wenjuanEdit">
    <div id="wenjuanEditHeader">
      <div class="headerLeft">
        <img style="height: 20px" @click="goHome()" src="../assets/icon/arrowLeft.png"/>
        问卷预览
      </div>
      <div class="headerCenter">
        <div class="equipments">
          <img :class="computerActive==-1 ? 'equipment' : 'equipmentActive'"
               src="../assets/icon/computer.png" @click="computerVO()">
          <img :class="phoneActive==-1 ? 'equipment' : 'equipmentActive'"
               src="../assets/icon/phone.png"  @click="phoneVO()">
        </div>
      </div>
      <div class="headerRight">
      </div>
    </div>
    <div style="height: 100%;width: 100%" v-if="computerActive==0">
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
              <el-radio class="optionClass" v-if="question.type == 'singleChoice'"
                        v-for="(option, oIndex) in question.optionList" :key="oIndex"
                        v-bind:label="option.optionName"></el-radio>
              <el-checkbox class="optionClass" v-if="question.type == 'multipleChoice'"
                           v-for="(option, oIndex) in question.optionList" :key="oIndex"
                           :label="String(option.optionName)"></el-checkbox>
              <div class="Rating-gray" v-if="question.type=='score'">
                <score style="width:100%;margin-top:5%;margin-left: 20%" :score.sync="question.optionList[0].optionName" ></score>
              </div>
              <!--输入框-->
              <div v-if="question.type=='input'">
                <textarea style="height:80px;width: 800px" v-model="question.text"> </textarea>
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
              <el-radio class="optionClass" v-if="question.type == 'picture'"
                        v-for="(option, oIndex) in question.optionList" :key="oIndex" v-bind:label="option.optionName">
                <!--没有图片-->
                <div class="uploadPicture" v-if="option.optionName == ''">
                  <!--<form name="multipartFile" id="multipartFile" enctype="multipart/form-data" action="图片上传接口"-->
                  <!--method='POST'>-->
                  <input class="imgUploadInput" accept="image/*" name="multipartFile" id="userUploadImg"
                         v-on:change="uploadImg(option)" type="file">
                  <!--</form>-->
                  <img src="../assets/icon/createWenjuan.png"/>
                </div>
                <!--有图片-->
                <div class="imageUploadHasImg" v-else>
                  <img class="imageOptionPreview" :src="option.optionName"/>
                </div>
              </el-radio>
            </div>
          </div>
          <div class="questionBottom">
            <div class="submmit">提交</div>
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
                <el-radio class="optionClass" v-if="question.type == 'singleChoice'"
                          v-for="(option, oIndex) in question.optionList" :key="oIndex"
                          v-bind:label="option.optionName"></el-radio>
                <el-checkbox class="optionClass" v-if="question.type == 'multipleChoice'"
                             v-for="(option, oIndex) in question.optionList" :key="oIndex"
                             :label="String(option.optionName)"></el-checkbox>
                <div class="Rating-gray" v-if="question.type=='score'">
                  <score style="width:100%;margin-top:5%;margin-left: 20%" :score.sync="question.optionList[0].optionName" ></score>
                </div>
                <div v-if="question.type=='input'">
                  <textarea style="height:20px;width: 280px" v-model="question.text"> </textarea>
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
  import score from './score.vue'
  export default {
    name: 'PreviewWenjuan',
    wenjuanId: 0,
    components:{
      score
    },
    data () {
      if (this.$router.currentRoute.query.wenjuanId != 0
        && this.$router.currentRoute.query.wenjuanId != undefined) {
        this.getWenjuan(this.$router.currentRoute.query.wenjuanId);
      } else {
        this.getImgUrl();
      }
      return {
        questionActive: -1,
        deleteActive: -1,
        computerActive:0,
        phoneActive:-1,
        showHeaderControl: true,
        wenjuanId: 0,
        wenjuanTitle: '未命名问卷',
        welcomeMsg: '非常感谢您能够参与调查，提供您的看法与意见，希望能够得到您的大力支持和合作，我们极其重视数据安全绝不会泄露任何您的隐私信息，现在我们马上就开始吧！',
        imgUrl: '',
        questionVOList: [],
        questionEditing: undefined
      };
    },
    methods:{
      getWenjuan(wenjuanId) {
        console.log(wenjuanId);
        this.axios({
          method: 'GET',
          url: '/wenjuan/detail',
          params: {
            wenjuanId: wenjuanId,
            type:'preview'
          }
        }).then((res) => {
          console.log(res);
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
      imageUploadHasImgJudge(optionList) {
        for (let option of optionList) {
          if(option == '') {
            return 'uploadPictureHasImgAndHasBlankImg';
          }
        }
        return 'uploadPictureHasImg';
      },

    },

    computed: {
    }
  }
</script>

<style>

</style>
