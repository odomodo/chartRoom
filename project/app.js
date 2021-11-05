/*
 * @Author: your name
 * @Date: 2021-10-26 20:29:38
 * @LastEditTime: 2021-10-27 23:56:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chatRoom\project\app.js
 */
const Koa = require('koa')


const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors');
const index = require('./routes/index')
const users = require('./routes/users')

const events = require('./common/event')

// error handler
onerror(app)



app.use(cors());
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app.callback());
const io = new Server(httpServer, {
  path: "/qwe/",
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
 });
let obj = {
  list: [],
  count: 0
};

io.on("connection", (socket) => {
  console.log('短链接连接成功');
  const count = io.engine.clientsCount;
  obj.count = count
  socket.emit(events.ALLEVENTS, events)
  socket.emit(events.RETURNMESSAGE, obj)
  socket.on(events.SENDMESSAGE, (data) => {
    const count = io.engine.clientsCount;
    obj = {
      list: [...obj.list??[], data],
      count
    }
    socket.emit(events.RETURNMESSAGE, obj)
    // 向所有人发送信息
    socket.broadcast.emit(events.RETURNMESSAGE, obj)
  });
});

httpServer.listen(4500);
module.exports = app
