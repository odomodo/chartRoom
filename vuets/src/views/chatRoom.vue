<!--
 * @Author: your name
 * @Date: 2021-10-24 11:23:15
 * @LastEditTime: 2022-02-23 16:07:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chatRoom\vue3ts\src\App.vue
-->
<template>
<div class="app">
  <div class="user  df fdc">
    <div class="head-portrait">
      <img :src="`/images/${user.url}.jpeg`" alt="" @click="goUser">
    </div>
  </div>
  <div class="chat-list">
    <div class="search">
      <input type="text" class="input">
    </div>
    <div class="dialog-box">
      <div class="item df active" @click="changeChat(-1)">
        <img src="/images/qun.png" alt="" class="img">
        <div class="text df fdc jcsb">
          <p>群聊</p>
          <div class="lastMesg">
            <p v-if="list?.lastMessage?.type === 'userMesg'">{{list.lastMessage.name}}:{{list.lastMessage.data}}</p>
            <p v-if="list?.lastMessage?.type === 'systemMesg' && list.lastMessage.data === '新增'">
              {{`欢迎${list.lastMessage.name}进入聊天室`}}
            </p>
          </div>
        </div>
        <p class="time">16: 00</p>
      </div>
      <div class="item df" v-for="(v, i) in parentList" :key="i" :class="{ active: i === activeIndex }" @click="changeChat(i)">
        <img :src="`/images/${v.url}.jpeg`" alt="" class="img">
        <div class="text df fdc jcsb">
          <p>{{v.name}}</p>
          <div class="lastMesg">
            <p v-if="list?.lastMessage?.type === 'userMesg'">{{list.lastMessage.name}}:{{list.lastMessage.data}}</p>
          </div>
        </div>
        <p class="time">16: 00</p>
      </div>
    </div>
  </div>
  <div class="content">
    <div class="head df aic">
      群聊({{list?.count}})
    </div>
    <div class="show">
      <div class="item" v-for="(v, i) in list.list" :key="i">
        <div
          v-if="v.type === 'userMesg' && v.id !== user.id "
          class="df other" @click="privateCchat(v)"
        >
          <img :src="`/images/${v.url}.jpeg`" alt="" class="img" >
          <div class="box">
            <p class="name">{{v.name}}</p>
            <p class="content1">{{v.data}}</p>
          </div>
        </div>
        <div v-if="v.type === 'userMesg' && v.id === user.id " class="df me fdrr">
          <img :src="`/images/${v.url}.jpeg`" alt="" class="img">
          <div class="box df fdc aife">
            <p class="name">{{v.name}}</p>
            <p class="content1">{{v.data}}</p>
          </div>
        </div>
        <div class="system" v-if="v.type === 'systemMesg' && v.data === '新增' ">{{`欢迎${v.name}进入聊天室`}}</div>
      </div>
    </div>
    <div class="input">
      <div class="text-box">
        <textarea cols="30" rows="10" class="text" v-model="inputValue"></textarea>
      </div>
      <div>
        <button class="btn" @click="handleClick">发送</button>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { io } from "socket.io-client";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { User } from "../type/index";
import { Events } from "../utils/events"
import axios from 'axios'
export default {
  name: "chartroom",
  setup (): any {
    const list = ref({}) // 聊天列表
    const inputValue = ref("")  // 输入内容
    const activeIndex = ref(0 as number) // 对话框选中状态
    const Router = useRouter()
    const erroNums = ref(0) // 重连次数
    const parentList = ref([] as any) // 好友列表
    let user = ref({} as User)
    const socket = io(`${process.env.VUE_APP_SECRET}` , {
      path: '/all/'
    });

    // 发送消息
    const handleClick = () => {
      let data = inputValue.value
      let obj = {
        data,
        name: user.value.name,
        url: user.value.url,
        id: user.value.id,
        timer: new Date().valueOf(),
        type: 'userMesg'
      }
      socket.emit(Events.SEND_MESSAGE  , obj);
      setTimeout(() => {
        const elemt: any = document.querySelector('.show')
        elemt.scrollTo(0,32000)
      }, 0);
      inputValue.value = ""
    }

    // 一开始链接socket
    const socketAll = () => {
      socket.on("connect", () => {
        socket.emit(Events.NEW_CONNECT, {
          name: user.value.name,
          url: user.value.url,
          id: user.value.id,
          timer: new Date().valueOf(),
          type: 'systemMesg',
          data: '新增'
        })
      });
    }

    // 接受服务端信息
    const getServerMesg = () => {
      socket.on(Events.RETURN_MESSAGE, (data: any) => {
        console.log(data, 'dadad');
        list.value = data
      })
    }

    const getOne = () => {
      console.log(341);
      
      socket.on(Events.UPDATE_FRIEND_LIST, (data: any) => {
        parentList.value = data
      })
    }

    // 错误处理
    const socketError = () => {
      if(erroNums.value <= 5) {
        erroNums.value = erroNums.value + 1
        console.log(erroNums.value);
        socket.connect();
      } else {
        socket.close()
      }
    }
    
    const goUser = () => {
      Router.push({
        path: '/user'
      })
    }

    // 私聊
    const privateCchat = (data: any) => {
      socket.emit(Events.SEND_ONE, {
        user: user.value,
        data
      })
    }

    const changeChat = (data: number) => {
      activeIndex.value = data
    }

    onMounted(() => {
      try {
        user.value = JSON.parse(localStorage.getItem("user") || '')
      } catch (error) {
        console.log(error);
      }
      
      if(!user.value.url){
        Router.push({
          path: '/user'
        })
      }
      socketAll()
      getServerMesg()
      getOne()
      // 错误处理
      socket.io.on("error",(error) => {
        console.log(error, "error");
        socketError()
      })
    })
    onBeforeRouteLeave(() => {
      socket.close()
    })
    return {
      user,
      activeIndex,
      list,
      handleClick,
      goUser,
      inputValue,
      Events,
      privateCchat,
      changeChat,
      parentList
    }
  }
}
</script>

<style lang='scss' scoped>
div{
  box-sizing: border-box;
}
.app{
  
  display: flex;
  align-items: center;
  justify-content: center;
  width: 900px;
  height: 600px;
  margin: 0 auto;
  margin-top: 200px;
  border:1px solid rgba(214,214,214,1);
  // padding-bottom: 1px;
  .user{
    width: 80px;
    height: 100%;
    background:rgba(46,46,46,1);
    .head-portrait{
      width: 40px;
      height: 40px;
      margin: 30px auto 0;
      img{
        width: 100%;
      }
    }
  }
  .chat-list{
    width: 380px;
    height: 100%;
    background:rgba(244,244,244,1);
    .search{
      background:rgba(250,250,250,1);
      height: 60px;
      display: flex;
      .input{
        width: 80%;
        height: 26px;
        border: none;
        border-radius: 4px;
        background:rgba(230,230,230,1);
        margin: 26px auto 0;
        padding-left: 15px;
        outline: none;
      }
    }
    .dialog-box{
      height: calc(100% - 60px);
      overflow-y: scroll;
      .item{
        height: 60px;
        padding: 3px;
        margin-bottom: 5px;
        position: relative;
        width: 100%;
        .img{
          width: 55px;
          height: 55px;
          margin-right: 5px;
        }
        .text{
          padding: 6px 0;
          width: 160px;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
        }
        .time{
          position: absolute;
          top: 6px;
          right: 6px;
        }
        .lastMesg{
          // width: 80%;
          
        }
      }
      .item:hover{
        background:rgba(214,214,214,1)
      }
      .active{
        background:rgba(214,214,214,1)
      }
    }
  }
  .content{
    width: 100%;
    height: 100%;
    background:rgba(244,244,244,1);
    border-left:1px solid rgba(214,214,214,1);
    .head{
      height: 60px;
      border-bottom:1px solid rgba(214,214,214,0.8);
      font-size: 20px;
      font-weight: 500;
      padding-left: 20px;
    }
    .show{
      height: 380px;
      overflow-y: scroll;
      padding-bottom: 10px;
      .item{
        padding-top: 10px;
        width: 100%;
        .img{
          width: 40px;
          height: 40px;
        }
        .other{
          padding-left: 20px;
          .img{
            margin-right: 4px;
          }
          .content1 {
            background:rgba(255,255,255,1);
            padding: 10px;
          }
        }
        .me{
           padding-right: 20px;
          .img{
            margin-left: 4px;
          }
          .content1 {
            background:rgba(255,255,255,1);
            padding: 10px;
          }
        }
        .system{
          text-align: center;
        }
        .content1{
          max-width: 400px;
        }
        .box{
          word-wrap:break-word;
          .name{
            margin-bottom: 3px;
            color: rgba(214, 214, 214, 0.9);
          }
        }
      }
    }
    .input{
      height: calc(100% - 60px - 380px);
      background:rgba(255,255,255,1);
      .text-box{
        width: 100%;
        border:none;
        padding-left: 10px;
        // overflow-y: scroll;
        padding-top: 10px;
        .text{
          width: 100%;
          border: none;
          height: 120px;
          outline: none;
          overflow-x: hidden;
          overflow-y: scroll;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>