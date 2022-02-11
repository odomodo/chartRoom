/*
 * @Author: your name
 * @Date: 2021-10-24 11:23:15
 * @LastEditTime: 2022-02-09 20:46:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chatRoom\vue3ts\src\router\index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import chatRoom from '../views/chatRoom.vue'
import user from '../views/user.vue'

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
  {
    path: '/user',
    name: 'user',
    component: user
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
