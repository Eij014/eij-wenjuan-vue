<template>
  <div class="_alert" v-show="visible">
    <div class="wind-alert">
      <div class="wind-alert-bg"></div>
      <div class="wind-alert-dialog animate-scale">
        <div class="wind-alert-title">{{title}}</div>
        <div class="wind-alert-content">{{content}}</div>
        <div class="wind-alert-btn" @click="close">{{btn}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:"rule_alert",
    data() {
      return {
        title: '提示',
        content:  '',
        btn:  '确定',
        visible:false
      }
    },
    methods: {
      close() {
        this.visible = false;
        this._promise &&  this._promise.resolve()
      }
    },
    watch: {
      '$route' () {
        this.close();
      }
    }
  }
</script>
<style>
  .wind-alert-dialog {
    top: 30%;
    width: 80%;
    left: 50%;
    opacity: 1;
    position: fixed;
    margin-left: -40%;
    font-size: 14px;
    text-align: center;
    font-family: 'Microsoft Yahei';
    background: #FFFFFF;
    border-radius: 8px;
    z-index: 999999999;
    box-sizing: content-box;
  }

  .wind-alert-bg {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    display: block;
    position: fixed;
    z-index: 999999998;
    background-color: #000000;
  }

  .wind-alert-title {
    font-size: 17px;
    padding: 20px 5px 0;
  }

  .wind-alert-content {
    padding: 5px 15px 20px 15px;
    border-bottom: 1px solid #ededed;
  }

  .wind-alert-btn {
    color: #0582cd;
    font-size: 15px;
    line-height: 40px;
    font-weight: bold;
  }

  .animate-scale {
    animation-name: scale;
    animation-duration: 0.375s;
  }

  @keyframes scale {
    0%{
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
