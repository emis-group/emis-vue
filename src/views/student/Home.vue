<template>
  <div class="div-content">
    <h1 class="font-title">主页</h1>
    <div class="font-title">{{ userName }}，你好。欢迎访问教学选课系统！</div>
  </div>
</template>

<script>
import {getCurrentInstance, ref} from "vue"

export default {
  name: "Home",
  setup() {
    const {proxy} = getCurrentInstance();

    let userName = ref("");
    let request = {
      userId: window.sessionStorage.getItem("userId"),
      userType: window.sessionStorage.getItem("userType")
    };
    let token = window.sessionStorage.getItem("token");

    proxy.$axios.post('http://localhost:8081/user/name', request, {headers: {"token": token}}).then((response) => {
      userName.value = response.data;
      console.log("response.data在这里（Home）");
      console.log(response.data);
    })
    return {
      userName,
    }
  }
}
</script>

<style scoped>

</style>