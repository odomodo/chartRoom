/*
 * @Author: your name
 * @Date: 2021-10-24 11:23:15
 * @LastEditTime: 2022-02-09 20:49:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chatRoom\vue3ts\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "/public/rest.css";
import "/public/base.scss";

createApp(App).use(store).use(router).mount('#app')
