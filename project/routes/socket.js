/*
 * @Author: your name
 * @Date: 2022-02-22 15:15:57
 * @LastEditTime: 2022-02-22 15:28:22
 * @LastEditors: Please set LastEditors
 * @FilePath: \chartRoom\project\views\socket.js
 */
const router = require('koa-router')()

router.prefix('/socket')
router.get('/privateCchat', function (ctx, next) {
  console.log(ctx);
  ctx.body = 'this is a users/bar response'
})
module.exports = router