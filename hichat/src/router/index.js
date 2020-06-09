import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import HomeContent from '../components/Home/HomeContent.vue'
import HomeDynamic from '../components/Home/HomeDynamic.vue'
import Collection from '../views/Collection.vue'
import login from '../views/login.vue'
import ILike from '../views/ILike.vue'
import dymine from '../views/Dymine.vue'
import register from '../views/register.vue'

import { homedir } from 'os'





Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home',
  },
  {
    path: '/index',
    component:Home,
    children: [{
      path: '/user',
      component:User,
    },
    {
      path: '/page',
      component:HomeContent,
      children:[{
        path:'/home',
        component:HomeDynamic,
      },
      {
        path:'/seach/:word',
        name:"Search",
        component:HomeDynamic,
      },
        {
        path:'/collection',
        component:Collection,
        },
        {
          path:'/ilike',
          component:ILike,
        },
        {
          path:'/dymine',
          component:dymine,
        },
      ]
    },
  ],
  },
  {
    path:'/login',
    component:login,
  },
  {
    path:'/register',
    component:register,
  }
]

const router = new VueRouter({
  routes
})

export default router