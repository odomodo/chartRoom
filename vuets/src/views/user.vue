<!--
 * @Author: your name
 * @Date: 2022-02-09 20:39:40
 * @LastEditTime: 2022-02-21 13:58:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \chartRoom\vuets\src\views\user.vue
-->
<template>
  <div class="box">
    <div class="head df fww">
      <div class="item" v-for="i in 10" :key="i" :class="{ active : i === index}" @click="handleClick(i)">
        <img :src="`/images/${i}.jpeg`" alt="">
      </div>
    </div>
    <div class="btns">
        <input type="text" v-model="input" class="input" placeholder="请输入名称">
        <button type="submit" class="btn" @click="save" >确定</button>
      </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { User } from "../type/index";
import { uid } from "../utils/index"
export default {
  name: "chartroom",
  setup (): any {
    const index = ref(0)
    const input = ref('')
    const Router = useRouter()
    const handleClick = (i : number) => {
      index.value = i
    }
    const save = () => {
      if(index.value <= 0){
        alert('请选择头像')
      } else if (input.value.length <= 0) {
        alert('请输入名称')
      } else {
        const obj: User = {
          url: index.value,
          name: input.value,
          id: uid(),
          timer: new Date().valueOf(),
        }
        localStorage.setItem('user', JSON.stringify(obj))
        Router.push({
          name: 'chartroom'
        })
      }
    }
    return {
      index,
      input,
      handleClick,
      save
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  .head{
    width: 100%;
    .item{
      width: 200px;
      height: 200px;
      padding: 5px;
      img{
        width: 100%;
      }
    }
    .active{
      border: 3px solid blue;
    }
  }
  .btns{
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    .input{
      width: 200px;
      height: 40px;
      margin-right: 20px;
      padding-left: 15px;
    }
    .btn{
      width: 50px;
      height: 30px;
    }
  }
}
</style>
