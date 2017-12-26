import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/WelcomePage'
import Test from '@/components/test'
import Register from '@/components/login/register'
import Login from '@/components/login/login'
import Event from '@/components/events'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Welcome
    },
    {
    	path:'/test',
    	name: 'Test',
    	component:Test
    },
    {
      path:'/register',
      name: 'register',
      component:Register
    },
    {
      path:'/login',
      name: 'login',
      component:Login
    },
    {
      path:'/user/:username',
      name:'events',
      component: Event
    },
    {
      path:'/post/:id',
      name:'post_detail',
      component: Detail
    }
  ]
})
