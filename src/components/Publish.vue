<template>

  <div style="font-size: medium; height:1000px;background-color: #f4f5f6">
    <div id="wenjuanEditHeader">
      <div class="headerLeft">
         <img style="margin-right: 5%" @click="goHome()" src="../assets/icon/arrowLeft.png"/>
         <div style="display: flex"> {{ wenjuanTitle }}</div>
      </div>
      <div class="headerCenter">
          <div style="margin-right: 5%">问卷制作</div>
          <div style="margin-right: 5%"><img src="../assets/icon/arrowRight.png"/></div>
          <div style="color: #0b97c4">问卷发布</div>
      </div>
      <div class="headerRight">
        <div class='preview' @click="preview(wenjuanId)">
          <img id="imgPreview" src="../assets/icon/video.png"/>
          <div style="color: #0b97c4;font-size: 14px">预览</div>
        </div>
      </div>
    </div>
    <div id="publishCenter">
      <div class="publishHeader">
        <div class="publishMessage">
          <div style="font-size: 18px;font-weight: bolder;margin-bottom: 10px">问卷连接与二维码</div>
          <div style="font-size: 12px;font-weight: lighter;margin-bottom: 10px">把连接或二维码分享给你的用户，邀请他们来填写</div>
          <input style="left:-5%;position: absolute" type="text" class="publishUrl" disabled="disabled" size="80"
                 v-model="publishUrl">
          <div class='publishButton'>
            <div v-clipboard:success="onCopy"
                 v-clipboard:copy="publishUrl"
              style="width: 20%;text-align:center;height: 30px;border:solid;
              border-radius: 1px; background-color: #0b97c4;color: #ffffff">
              复制
            </div>
            <div @click="answerWenjuan(wenjuanId)"
              style="width: 20%;margin-top:1%;text-align:center;margin-left:2%;height: 4%;border-color:#ccc;
              border: solid;border-radius: 1em;background-color: #ffffff;color: black">
              打开
            </div>
          </div>
        </div>
        <div id="qrCode" ref="qrCodeDiv"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcode2';

  export default {
    name: 'Publish',
    wenjuanId: 0,
    wenjuanTitle: '',
    publishUrl: '',
    data () {
      if (this.$router.currentRoute.query.wenjuanId != 0
        && this.$router.currentRoute.query.wenjuanId != undefined) {
        this.getWenjuan(this.$router.currentRoute.query.wenjuanId);
        this.publishUrl = 'http://192.168.137.1:8081/#/wenjuan/' + this.$router.currentRoute.query.wenjuanId;
      } else {
        this.getImgUrl();
      }


      return {
        wenjuanTitle: '',
        questionActive: -1,
        deleteActive: -1,
        showHeaderControl: true,
        wenjuanId: 0,
        questionVOList: [],
        questionEditing: undefined
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.bindQRCode();
      })
    },
    methods: {
      bindQRCode: function () {
        new QRCode(this.$refs.qrCodeDiv, {
          text: 'http://192.168.137.1:8081/#/' + this.$router.currentRoute.query.wenjuanId,
          width: 128,
          height: 128,
          colorDark: '#000',
          colorLight: '#fff',
          correctLevel: QRCode.CorrectLevel.H
        })
      },
      closeHandle () {
        document.getElementById('qrCode').innerHTML = ""
      },
      onCopy(e){
        this.$message({
          message:'复制成功！',
          type:'success'
        })
      },
      getWenjuan(wenjuanId) {
        this.axios({
          method: 'GET',
          url: '/wenjuan/detail',
          withCredentials: true,
          params: {
            wenjuanId: wenjuanId
          }
        }).then((res) => {
          console.log(res);
        this.wenjuanId = res.data.data.wenjuanId;
        this.wenjuanTitle = res.data.data.wenjuanTitle;
      })
        ;
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
      preview(wenjuanId) {
        this.$router.push({path: '/PreviewWenjuan', query: {wenjuanId: wenjuanId}})
      },
      goHome() {
        this.$router.push({path: '/Home'})
      },
      answerWenjuan(wenjuanId) {
        this.$router.push({path: '/wenjuan/' + wenjuanId});
      }
    },
    computed: {}
  }
</script>

<style>

</style>
