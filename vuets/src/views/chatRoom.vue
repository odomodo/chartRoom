<!--
 * @Author: your name
 * @Date: 2021-10-24 11:23:15
 * @LastEditTime: 2021-10-28 00:01:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chatRoom\vue3ts\src\App.vue
-->
<template>
<div class="app">
  <div class='left'>
    <div class='box'>
      <div v-for="(v, i) in list" :key="i">
        <div v-if="v.id !== UID"  class="item">
          <img :src="v.imgUrl" class="head-portrait" />
          <div>
            <p class="name">{{v.name}}</p>
            <p class="content">{{v.data}}</p>
          </div>
        </div>
        <div v-else class="self-item">
          <div>
            <p class=" content self-content">{{v.data}}</p>
          </div>
          <img :src="v.imgUrl" class="head-portrait" />
        </div>
      </div>
    </div>

    <input type="text" v-model="inputValue">
    <button @click="handleClick" @keyup.enter="handleClick">发送</button>
  </div>
  <div class="right">
    当前在线人数{{count}}
  </div>
</div>
</template>

<script lang="ts">
import { onMounted, ref, computed } from "vue";
import { io } from "socket.io-client";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
export default {
  name:"chartroom",
  setup() {
    const list = ref([] as Array<any>)
    const inputValue = ref("")
    const count = ref(0)
    const UID = computed((len = 8) => {
      var chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
      var uuid = [], i;
      let radix = chars.length;
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
      return uuid.join('');
    })
    const imgUrl = computed(() => {
      let ind = Math.floor(Math.random() * 10) + 1
      return `/images/${ind}.jpeg`
    })
    const uName = computed(() => {
        let s = []
        const hexDigits = '微软啊实打实大大商店VS辅导员和微软公司的v为啥让我十分出色的人多少啊散热'
        for (let i = 0; i < 4; i++) {
          s[i] = hexDigits[Math.floor(Math.random() * 36)]
        }
        return s.join('')
    })
    const socket = io("http://47.112.238.202:10002/", {
      path: '/qwe/'
    });
    const handleClick = () => {
      let data = inputValue.value
      let obj = {
        data,
        name:uName.value,
        id: UID.value,
        imgUrl: imgUrl.value,
      }
      socket.emit(events.SENDMESSAGE, obj);
      inputValue.value = ""
    }
    let events :any = {}
    onMounted(() => {
      socket.on("返回所有连接方法", (data) => {
        events = data
        console.log(data, '返回所有连接方法');
        socket.on(events.RETURNMESSAGE, (data: any) => {
          count.value = data.count
          list.value = data.list
        });
      })
    })
    onBeforeRouteLeave(() => {
      // socket.close()
    })
    return {
      list,
      handleClick,
      inputValue,
      uName,
      count,
      UID,
      events
    }
  }
}
</script>

<style lang='scss' scoped>
.app{
  display: flex;
}
.box{
  width: 600px;
  height: 500px;
  border: 1px solid #666;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 10px;
  .item{
    display: flex;
    margin-bottom: 10px;
  }
  .self-item{
    display: flex;
    justify-content: flex-end;
  }
  .head-portrait{
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .name{
    font-size: 12px;
    color: #d1d1d1;
    margin-bottom: 6px;
  }

  .content{
    font-size: 14px;
    padding: 5px;
    background: #fff;
    color: #000;
    display: inline-block;
  }
  .self-content{
    background: green;
    margin-right: 10px;
    line-height: 30px;
  }
}
.right{
  font-size: 20;
}
</style>