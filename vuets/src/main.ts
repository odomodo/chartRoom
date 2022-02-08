/*
 * @Author: your name
 * @Date: 2021-10-24 11:23:15
 * @LastEditTime: 2021-10-27 22:59:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chatRoom\vue3ts\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "/public/rest.css";

createApp(App).use(store).use(router).mount('#app')
