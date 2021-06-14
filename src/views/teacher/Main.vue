<template>
  <div class="div-main-background">
    <div class="div-header">
      <UserInfo :user-info-prop="userInfo"/>
      <ExitButton/>
      <h1 class="font-main-title">教务选课系统 教师端</h1>
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
    <BottomBar :msg="'（教师端）'"/>
  </div>
</template>

<script>
import {reactive} from "vue";
import UserInfo from "@/components/UserInfo";
import ExitButton from "@/components/ExitButton";
import BottomBar from "@/components/BottomBar";

export default {
  name: "TeacherMain",
  components: {BottomBar, ExitButton, UserInfo},
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