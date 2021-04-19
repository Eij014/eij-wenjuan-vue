import Vue from 'vue'
import Router from 'vue-router'
import EditWenjuan from '@/components/EditWenjuan'
import PreviewWenjuan from '@/components/Preview'
import Home from '@/components/Home'
import Publish from '@/components/Publish'
import Answer from '@/components/Answer'
import ResultAnalysis from '@/components/ResultAnalysis'
import RecycleProcess from '@/components/RecycleProcess'
import RecycleForm from '@/components/RecycleForm'
import testVue from '@/components/test'
import App from '@/App'
Vue.use(Router)

//解决它的提示是 避免到当前位置的冗余导航。 简单来说就是重复触发了同一个路由。
//个错误是 vur-router更新以后新出现的错误。（我使用的是 vue-router 3.2.0）出现的 但是 （vue-router 3.0.6) 没有出现。 但是也不排除是我的 3.0.6之前做过配置。

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({

  routes: [
      {
        path: '/',
        name: 'App',
        componet: App
      },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/editWenjuan',
      name: 'EditWenjuan',
      component: EditWenjuan
    },
    {
      path: '/previewWenjuan',
      name: 'PreviewWenjuan',
      component: PreviewWenjuan
    },
    {
      path:'/publish',
      name:'Publish',
      component:Publish
    },
    {
        path:'/wenjuan/:wenjuanId',
      name:'Answer',
      component:Answer
    },
    {
      path:'/resultAnalysis',
      name:'ResultAnalysis',
      component:ResultAnalysis
    },
    {
      path:'/resultAnalysis/recycleProcess',
      name:'RecycleProcess',
      component:RecycleProcess
    },
    {
      path:'/resultAnalysis/recycleForm',
      name:'RecycleForm',
      component:RecycleForm
    },
    {
      path:'/resultAnalysis/testVue',
      name:'testVue',
      component:testVue
    }

  ]
})
