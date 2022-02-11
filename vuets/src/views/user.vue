<!--
 * @Author: your name
 * @Date: 2022-02-09 20:39:40
 * @LastEditTime: 2022-02-09 20:46:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \chartRoom\vuets\src\views\user.vue
-->
<template>
  <div class="box">
    <div class="head df">
      <div class="item" v-for="i in 10" :key="i">
        <img :src="`/images/${i}.jpeg`" alt="">
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// import { onMounted, ref, computed } from "vue";

export default {
  name: "chartroom",
  setup (): any {
    return {

    }
  }
}
</script>
