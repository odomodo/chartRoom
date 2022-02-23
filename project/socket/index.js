/*
 * @Author: your name
 * @Date: 2022-02-21 14:57:33
 * @LastEditTime: 2022-02-23 15:54:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \chartRoom\project\socket\index.js
 */
const Koa = require('koa')
const app = new Koa()
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app.callback());
const events = require('../common/event')
const io = new Server(httpServer, {
  path: "/all/",
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

//  公聊列表
let obj = {
  list: [],
  count: 0,
  lastMessage: {}
};
const User = {}
// 向所有人发信息
function sendAll (socket, data) {
  const count = io.engine.clientsCount;
  obj = {
    list: [...obj.list??[], data],
    count,
    lastMessage: data
  }
  socket.broadcast.emit(events.RETURN_MESSAGE, obj)
  socket.emit(events.RETURN_MESSAGE, obj)
}

// 私聊
function sendOne (socket, data) {
  let next = false;
  User[data.user.id].list.map(v => {
    if (v.id === data.data.id) {
      next = true
    }
  })
  const { name, id, url } = data.data
  console.log('qwe', next, User[data.user.id]);
  if (!next) {
    User[data.user.id].list.push({
      name,
      id,
      url,
      data: []
    })
  }
  User[data.user.id].socket.emit(events.UPDATE_FRIEND_LIST, User[data.user.id].list)
}

io.on("connection", (socket) => {
  
  // 接收到客户端信息
  socket.on(events.SEND_MESSAGE, (data) => {
    sendAll(socket, data)
  })

  // 用户第一次链接
  socket.on(events.NEW_CONNECT, (data) => {
    const { name, id, url } = data
    !User.hasOwnProperty(data.id) && (User[data.id] = {
      socket,
      name,
      id,
      url,
      list: []
    })
    sendAll(socket, data)
  })

  // 私聊
  socket.on(events.SEND_ONE, (data) => {
    sendOne(socket, data)
  })

});

httpServer.listen(10002);