/*
 * @Author: your name
 * @Date: 2022-02-21 13:54:09
 * @LastEditTime: 2022-02-21 14:03:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \chartRoom\vuets\src\utils\index.ts
 */
export const uid = (nums = 8): string => {
  const str = 'abcdefghijklmnopqrstuvwxyz'
  let ret = ''
  for (let i = 0; i < nums; i++) {
    ret = str[Math.floor(Math.random() * 26)] + ret
  }
  return ret
}