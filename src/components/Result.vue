<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="home">
    <div class="homeHeader">
      <img id="img" src="../assets/icon/wenjuan-title.png"/>
      <div id="title">Eij问卷</div>
      <div class="menuList">
        <div v-for="(menu,index) in sysMenuList" :key="index">
          <div :class="getSysMenuClass(menu)" @click="changeMenu(menu)">
            <img style="height: 18px;width: 18px" :src="menu.icon"/>
            {{menu.nameCn}}
          </div>
        </div>
      </div>
      <div v-if=userStatus() class="userLogin" style="font-size: small" v-on:click="userSettingStatus = true">
        <el-dropdown>
              <span class="el-dropdown-link" ref="echarType">
               {{this.username}}
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="userLogout()">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <img id="userHeader" src="../assets/icon/header.png"/>
      </div>
      <!--//登录弹窗-->
      <el-button v-if=!userStatus() class="userLogin" round @click="dialogFormVisible = true,loginDialog = true">登录
      </el-button>
      <el-dialog v-if="loginDialog" custom-class="loginDialog" title="登录" :visible.sync="dialogFormVisible" center>
        <el-form>
          <el-form-item :show-overflow-tooltip=true custom-class="el-tooltip__popper" label="用户名" prop="username">
            <el-input id="usernameLogin" v-model.number="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input id="passwordLogin" type="password" v-model="loginForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <!--<el-form-item label="记住密码" prop="delivery">-->
          <!--<el-switch v-model="loginForm.delivery"></el-switch>-->
          <!--</el-form-item>-->
          <!--<span><a>忘记密码？</a></span>-->
          <span><a v-on:click="userRegister()">立即注册</a></span>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false; resetForm('loginForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('login')">登 录</el-button>
        </div>
      </el-dialog>

      <!--//注册弹窗-->
      <el-dialog v-if="registerDialog" custom-class="loginDialog" title="注册" :visible.sync="dialogFormVisible" center>
        <el-form>
          <el-form-item :show-overflow-tooltip=true custom-class="el-tooltip__popper" label="用户名" prop="username">
            <el-input v-model.number="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <span><a v-on:click="userLogin()">立即登录</a></span>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false; resetForm('registerForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('register')">注 册</el-button>
        </div>
      </el-dialog>
      <PopUps :popUpsShow="popUpsShow" :popUpsTitle="popUpsTitle" @hideModal="hideModal" @submit="submit">
        <p>确定要删除问卷吗</p>
      </PopUps>
    </div>
    <div class=systemCenter>
      <div id="myWenjuan">我的问卷</div>
      <div style="display: flex;margin-left:78%">
        <vxe-button class="otherOperate" size="small">
          <template #default>更多操作</template>
          <template #dropdowns>
            <vxe-button type="text">新建文件夹</vxe-button>
          </template>
        </vxe-button>
        <vxe-input class="wenjuanSearch" v-model="keywords" placeholder="输入问卷名搜索" type="search"
                   @keyup.enter="wenjuanListFn(1,$event)" @search-click="wenjuanListFn(1,$event)"></vxe-input>
      </div>
      <div id="wenjuanBox">

        <div id="wenjuanList">
          <li v-for="(wenjuan,index) in wenjuanList" class="userWenjuanBox" :key="index" v-if="wenjuan.status==1">
            <div v-on:click="resultAnalysis(wenjuan.wenjuanTitle,wenjuan.wenjuanId,wenjuan.status)"
                 v-on:mouseover="mouseoverWenjuan(wenjuan.wenjuanId)"
                 v-on:mouseleave="mouseleaveWenjuan()">
              <img id="wenjuanImg" :src="wenjuan.imgUrl"/>
              <div class="userWenjuanBoxWenjuanTitle">{{ wenjuan.wenjuanTitle }}</div>
              <div :class="mouseHoverWenjuanId!=wenjuan.wenjuanId ?'userWenjuanShadow' :'userWenjuanShadowHover'">
                回收: {{wenjuan.recycleCount}}</div>
              <div class="userWenjuanBoxWenjuanOperate">
                <!--<div class="userWenjuanShadowBr" v-if="mouseHoverWenjuanId!=wenjuan.wenjuanId">-->
                </br>
                </br>
                <!--</div>-->
                <div :class="mouseHoverWenjuanId!=wenjuan.wenjuanId ? 'userWenjuanBoxWenjuanOperateHold' :'userWenjuanBoxWenjuanOperateMove'">
                  <div :class="mouseHoverWenjuanId!=wenjuan.wenjuanId ? 'userWenjuanBoxWenjuanStatus' :'userWenjuanBoxWenjuanStatusHover'">
                    <div v-if="wenjuan.status == 0" class="wenjuanStatus">
                      <!--圆圈-->
                      <div class="circle" style="background: #FFB15B"></div>
                      <div style="margin-left:5%;color:#FFB15B">未发布</div>
                    </div>
                    <div v-if="wenjuan.status == 1" class="wenjuanStatus">
                      <div class="circle" style="background:#47E400"></div>
                      <div style="margin-left:5%;color:#47E400">已发布</div>
                    </div>
                    <div class="wenjuanDate">{{getDate(wenjuan.createTime)}}</div>
                  </div>
                  </br>
                  <div :class="mouseHoverWenjuanId==wenjuan.wenjuanId ? 'userWenjuanBoxWenjuanEdit' :'userWenjuanBoxWenjuanEditMove'" v-if="mouseHoverWenjuanId==wenjuan.wenjuanId">
                    <div style="width: 30%" @click.stop="resultAnalysis(wenjuan.wenjuanTitle,wenjuan.wenjuanId,wenjuan.status)">
                      <img class="mouseHoverOnWenjuanImg" src="../assets/icon/resultAnalysis.png">
                      结果分析
                    </div>
                    <el-dropdown class="wenjuanOtherOperate">
                      <div class="wenjuanOtherOperate" v-on:mouseover="mouseoverWenjuan(wenjuan.wenjuanId)">
                        <img class="wenjuanOtherOperateImg" src="../assets/icon/other.png">
                      </div>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="deleteWenjuan(wenjuan.wenjuanId)">删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class = "userWenjuanBoxWenjuanEditMove" v-else>
                    <div style="width: 30%">
                      <img class="mouseHoverOnWenjuanImg" src="../assets/icon/resultAnalysis.png">
                      结果分析
                    </div>
                    <el-dropdown>
                      <div class="wenjuanOtherOperate">
                        <img class="wenjuanOtherOperateImg" src="../assets/icon/other.png">
                      </div>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="deleteWenjuan(wenjuan.wenjuanId)">删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </div>
      </div>
      <div :class = "pageSize > 4 ? 'pagging' : 'paggingTop'">
        <div v-if="total > 8" class="page-bar">
          <ul>
            <li v-if="currentPage>1">
              <a style="font-size: medium" v-on:click="currentPage--,pageClick()">上一页</a>
            </li>
            <li v-if="currentPage==1"><a style="font-size: medium" class="banClick">上一页</a></li>
            <li v-for="index in totalPage" style="font-size: medium" v-bind:class="{ 'active' : currentPage == index}">
              <a v-on:click="btnClick(index)">{{ index }}</a>
            </li>
            <li v-if="currentPage!=totalPage"><a style="font-size: medium" v-on:click="currentPage++,pageClick()">下一页</a>
            </li>
            <li v-if="currentPage==totalPage"><a style="font-size: medium" class="banClick">下一页</a></li>
            <li><a style="font-size: medium">共<i>{{ total }}</i>个</a></li>
          </ul>
        </div>
      </div>
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
  import PopUps from './PopUps.vue'
  export default {
    name: 'Result',
    data () {
      if (this.userStatus()) {
        this.wenjuanListFn(1,null);
//        this.getFolderList();
      }

      var checkNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(value)) {
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

      return {
        timer: null,
        hoverEnterTime: 200,
        hoverLeaveTime: 10,
        isShow: true,
        wenjuanIdDelete:0,
        loginBoxShowStatus: false,
        loginFormVisible: false,
        username: '',
        userheader: '../assets/icon/header.png',
        keywords:'',//搜索关键字
        sysMenuTest:'resultAnalysis',
        totalPage: 0,
        total: 0,
        pageSize: 0,
        currentPage: 0,
        wenjuanList: [],
        registerDialog: false, //注册弹窗
        loginDialog: false, //登录弹窗
        userSettingStatus: false,//用户设置
        loginPower: false,
        mouseHoverOnWenjuan:false, //鼠标hover在问卷上
        mouseHoverWenjuanId:0, //鼠标hover的问卷Id
        sysMenuList:[
          {
            nameEn:'myWenjuan',
            nameCn:'我的问卷',
            icon:require('../assets/picture/wenjuan.png')
          },
          {
            nameEn:'folder',
            nameCn:'文件夹',
            icon:require('../assets/picture/folder.png')
          },
          {
            nameEn:'wenjuanTemplate',
            nameCn:'问卷模板',
            icon:require('../assets/picture/template.png')
          },
          {
            nameEn:'resultAnalysis',
            nameCn:'结果分析',
            icon:require('../assets/picture/result.png')
          }
        ],
        /*插入form方法*/
        /*设定规则指向*/
        loginForm: {
          password: '',
          username: '',
          delivery: false,
        },
        registerForm: {
          password: '',
          username: '',
          delivery: false,
        },
        rules2: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],

          username: [
            {validator: checkNum, trigger: 'blur'}
          ]
        },
        popUpsTitle:'删除', //弹窗标题
        popUpsShow:false, //弹窗展示
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
    components:{
      PopUps
    },
    methods: {
      wenjuanListFn(index,e) {
        this.axios({
            method:'POST',
            url:'/wenjuan/list',
            data: {
              currentPage: index,
              pageSize: 8,
              keywords:this.keywords==null ? '':this.keywords,
              folderId:0,
              type:'self',
              status:'已发布'
            },
            header:{
              'Content-Type':'application/json'
            }
          }
        ).then((res) => {
          this.wenjuanList = res.data.data.wenjuanList;
          this.total = res.data.data.total;
          this.pageSize = this.wenjuanList.length;
          this.currentPage = res.data.data.currentPage;
          this.totalPage = res.data.data.totalPage;
          this.username = this.$cookies.get('userToken').split('-')[1];
        });
      },
      btnClick: function (data) {
        if (data != this.currentPage) {
          this.currentPage = data;
        }
        this.wenjuanListFn(this.currentPage.toString(),null);
      },
      pageClick: function () {
        this.wenjuanListFn(this.currentPage.toString(),null);
      },
      userRegister: function () {
        this.loginDialog = false;
        this.registerDialog = true;
        this.dialogFormVisible = true;
      },
      userLogin: function () {
        this.loginDialog = true;
        this.registerDialog = false;
        this.dialogFormVisible = true;
      },
      createWenjuan(wenjuanId) {
        this.$router.push({path: '/editWenjuan', query: {wenjuanId: wenjuanId}})
      },
      answerWenjuan(wenjuanId) {
        this.$router.push({path: '/editWenjuan', query: {wenjuanId: wenjuanId}})
      },
      userLogout() {
        this.$cookies.remove('userToken');
        this.wenjuanList = [];
        this.total = 0;
      },
      getDate(timestamp) {
        var date = new Date(timestamp * 1000);
        var Y = date.getFullYear() + '-';
        var M = this.dateAddZero(date.getMonth() + 1) + '-';
//        var D = (date.getDay() + 1 < 10 ? '0' + (date.getDay() + 1) : date.getDay() + 1) + ' ';
//        var D = (date.getDay() + 1) + ' ';
        var D = this.dateAddZero(date.getDate()) + ' ';
        var h = this.dateAddZero(date.getHours()) + ':';
        var m = this.dateAddZero(date.getMinutes()) + ':';
        var s = this.dateAddZero(date.getSeconds());
        return Y + M + D + h + m + s;
      },
      dateAddZero(value) {
        return value  < 10 ? ('0' + (value)) : value
      },
      userStatus() {
        return this.$cookies.isKey("userToken");
      },
      mouseoverWenjuan(wenjuanId) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() =>{
          this.mouseHoverOnWenjuan = true;
          this.mouseHoverWenjuanId=wenjuanId;
        },this.hoverEnterTime);
      },
      mouseleaveWenjuan() {
        $(document).mouseover(function(e){
        });
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.mouseHoverOnWenjuan = false;
          this.mouseHoverWenjuanId=0
        }, this.hoverLeaveTime)
      },
      mouseleaveWenjuan2() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.mouseHoverOnWenjuan = false;
          this.mouseHoverWenjuanId=0
        }, this.hoverLeaveTime)
      },
      deleteWenjuan(wenjuanId){
        this.popUpsShow = true;
        this.popUpsTitle = '删除'
        this.wenjuanIdDelete = wenjuanId;

      },
      resultAnalysis(wenjuanTitle,wenjuanId,wenjuanStatus) {
        if (wenjuanStatus != 1) {
          this.$message({
            type: 'failed',
            message: '问卷尚未发布'
          });
        } else {
          this.$router.push({path: '/resultAnalysis', query: {wenjuanId: wenjuanId,wenjuanTitle:wenjuanTitle}})
        }
      },
      hideModal() {
        // 取消弹窗回调
        this.popUpsShow = false
        this.wenjuanIdDelete = 0;
      },

      submit() {
        // 确认弹窗回调
        this.axios({
          method: 'GET',
          url: '/wenjuan/delete',
          params: {
            wenjuanId: this.wenjuanIdDelete
          }
        }).then((res) => {
          if(res.data.code==0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.popUpsShow = false
            this.wenjuanListFn(1,null);
          } else {
            this.$message({
              type: 'failed',
              message: '删除失败,请重试'
            });
            this.popUpsShow = false
          }
        });


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
            dropDown, dropDownMenu, dropDownItem
          },
        });
        return vue;
      },
      submitForm(loginOrRegister) {
        var usernameSubmit;
        var passwordSubmit;
        if (loginOrRegister == "login") {
          usernameSubmit = this.loginForm.username;
          passwordSubmit = this.loginForm.password;
        } else {
          usernameSubmit = this.registerForm.username;
          passwordSubmit = this.registerForm.password;
        }
        this.axios({
            method: 'POST',
            url: '/wenjuan/user/login',
            data: {
              username: usernameSubmit,
              password: passwordSubmit,
              loginOrRegister: loginOrRegister
            },
            header: {
              'Content-Type': 'application/json'
            }
          }
        ).then((res) => {
          if (res.data.code == 0) {
            this.$cookies.set('userToken', res.data.data, 6000000);
            this.username = this.$cookies.get('userToken').split('-')[1];
            this.wenjuanListFn(1,null);
            this.dialogFormVisible = false;
          } else {
            alert(res.data.message);
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getSysMenuClass(menu) {
        if (this.sysMenuTest == menu.nameEn) {
          return 'sysMenuCheck'
        } else {
          return 'sysMenu'
        }
      },
      changeMenu(menu) {
        switch (menu.nameEn) {
          case 'myWenjuan' :
            this.$router.push({path: '/home'});
            break;
          case 'folder':
            this.$router.push({path: '/folder'});
            break;
          case 'wenjuanTemplate':
            this.$router.push({path: '/template'});
            break;
          case 'resultAnalysis':
            this.$router.push({path:'/result'});
            break;
        }
      }
    },
    computed: {
      indexs: function () {
        var left = 1;
        var right = this.totalPage;
        var ar = [];
        if (this.allPage >= 5) {
          if (this.currentPage > 3 && this.cur < this.totalPage - 2) {
            left = this.currentPage - 2;
            right = this.currentPage + 2;
          } else {
            if (this.currentPage <= 3) {
              left = 1;
              right = 5;
            } else {
              right = this.totalPage;
              left = this.totalPage - 4;
            }
          }
        }
        while (left <= right) {
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
