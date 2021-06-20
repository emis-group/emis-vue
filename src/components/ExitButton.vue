<template>
  <button class="btn-exit" @click="exit">退出系统</button>
</template>

<script>
// 本模块就是一个退出按钮，点了跳转到登录页面，并清空本地存储(window.sessionStorage)的信息
import {getCurrentInstance} from "vue";

export default {
  name: "ExitButton",
  setup() {
    let router = getCurrentInstance().proxy.$router;
    let exit = () => {
      router.push({name: "login"});
      window.sessionStorage.clear();
    }
    return {
      exit
    }
  }
}
</script>

<style scoped>
.btn-exit {
  position: fixed;
  top: 8px;
  right: 8px;

  padding: 10px 12px;

  font-size: 14px;
  color: rgb(113, 47, 24);
  z-index: 1;

  border: none;
  background-color: rgba(255, 229, 217, 0.75);

  box-shadow: 0 0 5px 0 rgba(113, 86, 76, 0.5);
}
</style>