<template>
  <div class="div-main-background">
    <div class="div-header">
      <UserInfo :user-info-prop="userInfo"/>
      <ExitButton/>
      <h1 class="font-login-title">教务选课系统 教师端</h1>
      <div class="div-nav">
        <router-link to="/user/teacher/">主页</router-link>
        |
        <router-link to="/user/teacher/modify-course">排课</router-link>
        |
        <router-link to="/user/teacher/query-all-course">查询所有课程</router-link>
      </div>
    </div>
    <div class="div-router-view">
      <router-view/>
    </div>
    <div class="div-footer">
      软件工程概论实验 第2组 教务选课系统（学生端）未完成版本
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";
import UserInfo from "@/components/UserInfo";
import ExitButton from "@/components/ExitButton";

export default {
  name: "TeacherMain",
  components: {ExitButton, UserInfo},
  setup() {
    let userInfo = reactive({
      id: null,
      type: null
    })

    let init = () => {
      userInfo.id = window.sessionStorage.getItem("userId");
      userInfo.type = window.sessionStorage.getItem("userType");
    }

    init();

    return {
      userInfo,
    }
  }
}
</script>
<style scoped>

</style>