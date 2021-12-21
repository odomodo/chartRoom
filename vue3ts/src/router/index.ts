/*
 * @Author: your name
 * @Date: 2021-10-24 11:23:15
 * @LastEditTime: 2021-10-27 22:07:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chatRoom\vue3ts\src\router\index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import chatRoom from '../views/chatRoom.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chartroom',
    name: 'chartroom',
    component: chatRoom
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
