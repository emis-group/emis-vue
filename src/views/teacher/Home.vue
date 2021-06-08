<template>
  <div class="div-main-content">
    <h1 class="font-title">主页</h1>
    <div class="font-title">{{ userName }}，你好。欢迎访问教学选课系统！</div>
  </div>
</template>

<script>
import {ref} from "vue"
import {request} from "@/assets/js/request"

export default {
  name: "Home",
  setup() {
    let userName = ref("");
    let requestData = {
      userId: window.sessionStorage.getItem("userId"),
      userType: window.sessionStorage.getItem("userType")
    };

    request('user/name',requestData).then((response)=>{
      userName.value = response.data;
    })

    return {
      userName,
    }
  }
}
</script>

<style scoped>

</style>