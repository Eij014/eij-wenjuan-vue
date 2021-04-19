import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
import vSelect from 'vselect-component'
import VideoPlayer from 'vue-video-player'
import 'vue-layer/lib/vue-layer.css'
import layer from "vue-layer";
import plugin from './js/plugin.js'
import { Button} from 'element-ui'
import Router from 'vue-router'
import 'vue-video-player/src/custom-theme.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import "babel-polyfill"
import 'video.js/dist/video-js.css'
import Video from 'video.js'

import dropDown from './dropDown/dropDown'
import dropDownMenu from './dropDown/dropDownMenu'
import dropDownItem from './dropDown/dropDownItem'
import VueClipboard  from 'vue-clipboard2';


//Vue.prototype.$echarts = echarts
axios.defaults.baseURL = 'http://localhost:8081'
// axios请求携带cookie
axios.defaults.withCredentials = true
global.axios = axios
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.prototype.$video = Video
Vue.prototype.$layer = layer(Vue, {
  msgtime: 3 //目前只有一项，即msg方法的默认消失时间，单位：秒
});
Vue.use(VueResource)
Vue.use(VueCookies)
Vue.use(plugin)
Vue.use(ElementUI)
Vue.use(Router)
Vue.use(vSelect)
Vue.use(VideoPlayer)
Vue.component(Button.name, Button)
Vue.use( VueClipboard );
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
