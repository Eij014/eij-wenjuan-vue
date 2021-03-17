
<el-button round @click="submitForm()">登录</el-button>
<!--仔细阅读Dialog的各个属性参数，会影响到布局排版，例如遇到了一个大坑就是没有设置:append-to-body='true'，导致遮罩遮盖整个页面，:lock-scroll="false"没有设置的话，点击前后会感觉到头部导航栏的移动，体验性很不好！！还有设置dialog的宽度width="40%"前面不用加冒号：-->
<el-dialog title="登陆" :visible.sync="dialogTableVisible" center :append-to-body='true' :lock-scroll="false" width="30%">
  <login-name></login-name>
</el-dialog>
<script>
  import loginName  from 'login.vue';
  export default {
    components: {loginName},
    name: "navShow",
    data() {
      return {
        dialogTableVisible: false
      }
    },
    methods:{
      submitForm(){
        this.dialogTableVisible=true;//默认页面不显示为false,点击按钮将这个属性变成true
      }
    }
  }
</script>
