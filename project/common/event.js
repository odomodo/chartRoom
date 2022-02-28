/*
 * @Author: your name
 * @Date: 2021-12-18 14:13:37
 * @LastEditTime: 2022-02-28 15:02:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \chartRoom\project\common\event.js
 */
const Events = {
  ALL_EVENTS: "返回所有连接方法",
  SEND_MESSAGE: "客户端发送消息",
  RETURN_MESSAGE: "服务端返回消息",
  ADD_USER: "新增用户",
  SEND_ONE: "私聊",
  NEW_CONNECT: "第一次链接",
  UPDATE_FRIEND_LIST: "更新好友列表",
  SEND_ONE_MESSAGE: "私聊信息",
  UPDATE_ONE_MESSAGE: "更新私聊信息"
}

module.exports = Events