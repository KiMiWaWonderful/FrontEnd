import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Car from "../views/Car";
import Map from "../views/Map";
import MapTwo from "../views/MapTwo";
import Drive from "../views/Drive";
import DriveVideo from "../views/DriveVideo";
import Weather from "../components/Weather";
import Transit from "../components/Transit";
import Trace from "../components/Trace";
import Fence from "../components/Fence";
import Login from "../views/Login";
import Main from "../views/Main";
import Register from "../views/Register";

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   redirect: '/login'
  // },
  {
    path: '/',
    // name: 'main',
    component: Main,
    children: [
      {
        path: '/',
        // name: 'map',
        redirect: '/map'
      },
      {
        path: '/map',
        name: 'map',
        component:MapTwo
      },
      {
        path: '/car',
        name: 'car',
        component:Car
      },
      {
        path: '/drive',
        name: 'drive',
        component:DriveVideo
      },
      {
        path: '/weather',
        name: 'weather',
        component:Weather
      },
      {
        path: '/transit',
        name: 'transit',
        component:Transit
      },
      // {
      //   path: '/select',
      //   name: 'select',
      //   component:Select
      // },
      {
        path: '/trace',
        name: 'trace',
        component:Trace
      },
      {
        path: '/fence',
        name: 'fence',
        component:Fence
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component:Login
  },
  {
    path: '/register',
    name: 'register',
    component:Register
  },


  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// router.beforeEach((to, from, next) => {
//   if(to.fullPath !== '/login'){
//     if(!sessionStorage.getItem("loginuser")) {
//       return next("/login")
//     }
//   }
// })
