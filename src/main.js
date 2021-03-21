import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
import vSelect from 'vselect-component'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import plugin from './js/plugin.js'
import { Button} from 'element-ui'
import Router from 'vue-router'
import "babel-polyfill";

import dropDown from './dropDown/dropDown'
import dropDownMenu from './dropDown/dropDownMenu'
import dropDownItem from './dropDown/dropDownItem'

axios.defaults.baseURL = 'http://localhost:8081'
// axios请求携带cookie
axios.defaults.withCredentials = true
global.axios = axios
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueCookies)
Vue.use(plugin)
Vue.use(ElementUI)
Vue.use(Router)
Vue.use(vSelect)
Vue.component(Button.name, Button)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
