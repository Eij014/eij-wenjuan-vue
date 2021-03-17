<template>
  <div id ="wenjuanEditHeader">
      <img src="./assets/icon/arrowLeft.png"/>
      {{ wenjuanTitle }}
      <div>问卷制作</div>
      <img src="./assets/icon/arrowRight.png"/>
      <div>问卷发布</div>
      <div id="wenjuanPreview"><img id="imgPreview" src="./assets/icon/video1.png"/>预览</div>
    <div id="wenjuanSave">保存发布</div>
  </div>
  <div id = "wenjuanEditCenter">
    <div id = "wenjuanEditCenterLeft"></div>
        <div>基本控件</div>
        <div id="questionBox">
            <div @click="addSingleChoice()" class="question1">
              <img class = "imgCenter" src=".assets/icon/singleChoice.png"/>
              <div>单选框</div>
            </div>
            <div class="question2">
              <img class = "imgCenter" src=".assets/icon/check.png"/>
              <div>多选框</div>
            </div>
            <div class="question3">
              <img class = "imgCenter" src=".assets/icon/check.png"/>
            <div>多选框</div>
            </div>
            <div class="question1">
              <img class = "imgCenter" src=".assets/icon/video.png"/>
              <div>视频题</div>
            </div>
            <div class="question2">
              <img class = "imgCenter" src=".assets/icon/picture.png"/>
              <div>图片题</div>
            </div>
            <div class="question3">
                 <img class = "imgCenter" src=".assets/icon/check.png"/>
                  <div>多选框</div>
            </div>
        </div>
    </div>
    <div id = "wenjuanEditCenterMid"></div>
    <div id = "wenjuanEditCenterRight"></div>
  </div>
  <div id = "wenjuanEditBotton">
  </div>
</template>
<script>

  export default {
    name: 'CreateWenjuanVue',
    wenjuanTitle:"未命名问卷",

    data(){
      this.wenjuanListDetail(wenjuanTitle);
      return{
        sayHello: "Child say hello"
      }
    },
    methods: {
      wenjuanListDetail(wenjuanTitle) {
        this.axios({
            method:'POST',
            url:'/v3/wenjuan/detail',
            data:{
              currentPage:index,
              pageSize:8
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
      }
    }
  }
</script>
