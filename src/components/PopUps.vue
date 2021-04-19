<template>
  <div class="modal-bg" v-show="popUpsShow">
    <div class="modal-container">
      <div class="modal-header">
        {{ popUpsTitle }}
      </div>
      <div class="modal-main">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button class="modal-footer-button" @click="hideModal">取消</button>
        <button class="modal-footer-button" @click="submit">确认</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'PopUps',
    props: {
      popUpsShow: {
        type: Boolean,
        default: false
      },
      popUpsTitle: {
        type: String,
        default: ''
      },
    },
    methods: {
      hideModal() {
        this.$emit('hideModal')
      },

      submit() {
        this.$emit('submit')
      },
    }
  }
</script>
<style scoped>
  .modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 10;
  }
  .modal-container {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .modal-header {
    height: 30px;
    background: #eef3ff;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
  }
  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 57px;
    border-top: 1px solid #ddd;

  }
  .modal-footer button {
    width: 100px;
    margin-left: 20px;
  }
  .modal-main {
    padding: 15px 40px;
    margin-left: 8%;
  }
  .modal-footer-button{
    margin-left: 1%;
    margin-right: 10%;
  }
</style>
