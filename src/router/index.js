import Vue from 'vue'
import Router from 'vue-router'
import EditWenjuan from '@/components/EditWenjuan'
import Home from '@/components/Home'
import App from '@/App'
Vue.use(Router)

export default new Router({

  routes: [
      {
        path: '/',
        name: 'App',
        componet: App
      },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/EditWenjuan',
      name: 'EditWenjuan',
      component: EditWenjuan
    }
  ]
})
