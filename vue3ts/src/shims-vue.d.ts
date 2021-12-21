/*
 * @Author: your name
 * @Date: 2021-10-24 11:23:15
 * @LastEditTime: 2021-10-26 23:05:04
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue3ts\src\shims-vue.d.ts
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
