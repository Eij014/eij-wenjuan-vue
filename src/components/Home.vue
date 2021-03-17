<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id = "home">
    <div id="systemHeader">
      <img id = "img" src="../assets/icon/wenjuan-title.png"/>
      <div id = "title">Eij问卷</div>
      <div v-if= userStatus() class="userLogin" style="font-size: small" v-on:click="userSettingStatus = true">
        <el-dropdown>
              <span class="el-dropdown-link" ref="echarType">
               {{this.username}}
              </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item  @click.native="userLogout()">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <img id = "userHeader" src="../assets/icon/header.png"/>
      </div>
      <!--//登录弹窗-->
      <el-button  v-if= !userStatus() class="userLogin" round @click="dialogFormVisible = true,loginDialog = true">登录</el-button>
      <el-dialog v-if="loginDialog" custom-class="loginDialog" title="登录" :visible.sync="dialogFormVisible" center>
        <el-form>
          <el-form-item :show-overflow-tooltip=true custom-class="el-tooltip__popper" label= "用户名" prop="username">
            <el-input id = "usernameLogin" v-model.number="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label= "密码" prop="password">
            <el-input id = "passwordLogin" type="password" v-model="loginForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <!--<el-form-item label="记住密码" prop="delivery">-->
          <!--<el-switch v-model="loginForm.delivery"></el-switch>-->
          <!--</el-form-item>-->
          <!--<span><a>忘记密码？</a></span>-->
          <span><a  v-on:click="userRegister()">立即注册</a></span>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false; resetForm('loginForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('login')">登 录</el-button>
        </div>
      </el-dialog>

      <!--//注册弹窗-->
      <el-dialog v-if="registerDialog" custom-class="loginDialog" title="注册" :visible.sync="dialogFormVisible" center>
        <el-form>
          <el-form-item :show-overflow-tooltip=true custom-class="el-tooltip__popper" label= "用户名" prop="username">
            <el-input v-model.number="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label= "密码" prop="password">
            <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false; resetForm('registerForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('register')">注 册</el-button>
        </div>
      </el-dialog>


    </div>
    <div class = systemCenter>
      <div id="myWenjuan">我的问卷</div>

      <div id="wenjuanBox">
        <div id="createWenjuanBox" @click="createWenjuan()">
          <img id="imageCenter" src="../assets/icon/createWenjuan.png"/>
          <div id="buttonCreateWenjuan" v-on:click="createWenjuan()">
            新建问卷
          </div>
        </div>
        <div id="wenjuanList">
          <li v-for="(wenjuan,index) in wenjuanList" id="userWenjuanBox" :key="index">
            <img id = "wenjuanImg" :src= "wenjuan.imgUrl"/>
            <a>{{ wenjuan.wenjuanTitle }}</a>
            <div>回收: {{wenjuan.recyclingNum}}</div>
            <div v-if="wenjuan.status == 0" style="color:#FFB15B">未发布</div>
            <div v-if="wenjuan.status == 1" style="color:#47E400">已发布</div>
            <a>{{getDate(wenjuan.createTime)}}</a>
          </li>
        </div>
      </div>
      <div v-if="total > 8" class="page-bar">
        <ul>
          <li v-if="currentPage>1">
            <a  style="font-size: medium" v-on:click="currentPage--,pageClick()">上一页</a>
          </li>
          <li v-if="currentPage==1" ><a  style="font-size: medium" class="banClick">上一页</a></li>
          <li v-for="index in totalPage" style="font-size: medium" v-bind:class="{ 'active' : currentPage == index}">
            <a v-on:click="btnClick(index)">{{ index }}</a>
          </li>
          <li v-if="currentPage!=totalPage"><a  style="font-size: medium" v-on:click="currentPage++,pageClick()">下一页</a></li>
          <li v-if="currentPage==totalPage"><a  style="font-size: medium" class="banClick">下一页</a></li>
          <li><a style="font-size: medium">共<i>{{ total }}</i>个</a></li>
        </ul>
      </div>
      <div id = "bottom"/>
    </div>
  </div>

</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.12/vue.js"></script>
<script src="src/vue.js"></script>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import VueRouter from 'vue-router';
  Vue.use(VueRouter);
  import axios from 'axios';
  Vue.prototype.axios = axios
  export default {
    name: 'Home',
    data () {
      this.$cookies.set('testCookie', '1234', 1)
      if (this.userStatus()) {
        this.wenjuanListFn(1);
      }

      var checkNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(value) ) {
              callback(new Error('请输入正确的手机号码'));
            } else {
              callback();
            }

          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {

          callback();
        }
      };

      return{

        isShow:true,
        loginBoxShowStatus:false,
        loginFormVisible:false,
        username:'zhuhaojie',
        userheader:'../assets/icon/header.png',
        totalPage:0,
        total:0,
        pageSize:0,
        currentPage:0,
        wenjuanList:[],
        registerDialog:false, //注册弹窗
        loginDialog: false, //登录弹窗
        userSettingStatus:false,//用户设置
        loginPower:false,
        /*插入form方法*/
        /*设定规则指向*/
        loginForm: {
          password: '',
          username: '',
          delivery: false,
        },
        registerForm:{
          password: '',
          username: '',
          delivery: false,
        },
        rules2: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],

          username: [
            { validator: checkNum, trigger: 'blur' }
          ]
        },

        /*插入form方法*/

        dialogTableVisible: true,
        dialogFormVisible: true,
        form: {
          name: '',
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };
    },
    methods:{
      wenjuanListFn(index) {
        this.axios({
            method:'POST',
            url:'/v3/wenjuan/list',
            withCredentials: true,
            data:{
              currentPage:index,
              pageSize:8
            },
            header:{
              'Content-Type':'application/json',
              'Cookie':{
                'test':'123',
                'userToken':this.$cookies.get('userToken')
              }
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
      },
      btnClick:function(data) {
        if (data != this.currentPage) {
          this.currentPage = data;
        }
        this.wenjuanListFn(this.currentPage.toString());
      },
      pageClick: function () {
        this.wenjuanListFn(this.currentPage.toString());
      },
      userRegister: function () {
        this.loginDialog = false;
        this.registerDialog = true;
        this.dialogFormVisible = true;
      },
      createWenjuan() {
        console.log('test');
        this.$router.push({name:"EditWenjuan"});
      },
      userLogout() {
        console.log('userlogout');
        this.$cookies.remove('userToken');
        this.wenjuanList = [];
        this.total = 0;
      },
      getDate(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
      },
      userStatus() {
        return this.$cookies.isKey("userToken");
      },

      login() {
        this.loginFormVisible = true;
        var dom = document.createElement('div');
        document.getElementsByTagName('body')[0].appendChild(dom);
        let tpl = '\
        <el-dialog \
            :close-on-click-modal="false" \
            :custom-class="customClass" \
            :title="title" \
            :visible.sync="show" \
            :size="size" \
            :before-close="handleClose" \
            @close="close">\
                <dialogContent  @close="closeDialog" @confirm="confirmDialog" v-model="dialogData"></dialogContent>\
        </el-dialog>';
        var vue = new Vue({
          el: dom,
          data: function () {
            return {
              title: option.title,
              size: option.size || 'small',
              show: true,
              dialogData: option.data,
            };
          },
          template: tpl,
          computed: {
            customClass(){
              return `el-dialog--width-${option.size || 'auto'}`;
            }
          },
          methods: {
            handleClose(done){
              if (option.beforeClose) {
                option.beforeClose(done);
              } else {
                done();
              }
            },
            close() {
              if (option.close) {
                option.close();
              }
            },

            closeDialog(){
              this.show = false
            },
            confirmDialog(result){
              this.show = false
              option.confirm && option.confirm(result)
            }
          },
          components: {
            dialogContent: option.component,
            dropDown,dropDownMenu,dropDownItem
          },
        });
        return vue;
      },
      submitForm(loginOrRegister) {
//      this.$refs[formName].validate((valid) => {
//        if (valid) {
//          //提交成功做的动作
//          dialogFormVisible = false;
//          /* alert('submit!') ; */
//          this.$message({
//            type: 'success',
//            message: '提交成功'
//          });
//        } else {
//          console.log('error submit!!');
//          return false;
//        }
//      });
        this.axios({
            method:'POST',
            url:'/v3/wenjuan/user/login',
            data:{
              username:this.loginForm.username,
              password: this.loginForm.password,
              loginOrRegister:loginOrRegister
            },
            header:{
              'Content-Type':'application/json'
            }
          }
        ).then((res) => {
          if (res.data.code == 0) {
            console.log(res);
            this.$cookies.set('userToken', res.data.data, 6000000);
            this.username = this.$cookies.get('userToken').split('-')[1];
            this.wenjuanListFn(1);
            this.dialogFormVisible = false;
          } else {
            alert(res.data.message);
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    computed: {
      indexs:function() {
        var left = 1;
        var right = this.totalPage;
        var ar = [];
        if (this.allPage >= 5) {
          if(this.currentPage > 3 && this.cur< this.totalPage - 2) {
            left = this.currentPage - 2;
            right = this.currentPage + 2;
          } else {
            if (this.currentPage <= 3) {
              left = 1;
              right =5;
            } else {
              right = this.totalPage;
              left = this.totalPage - 4;
            }
          }
        }
        while(left <= right) {
          ar.push(left);
          left++;
        }
        return ar;
      }
    }
  }
</script>
<style>
</style>
