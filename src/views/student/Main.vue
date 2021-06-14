<template>
  <div class="div-main-background">
    <div class="div-header">
      <UserInfo :user-info-prop="userInfo"/>
      <ExitButton/>
      <h1 class="font-main-title">教务选课系统 学生端</h1>
      <div class="div-nav">
        <router-link to="/user/student/">主页</router-link>
        |
        <router-link to="/user/student/select-course">选课</router-link>
        |
        <router-link to="/user/student/query-own-course">已选课程查询</router-link>
        |
        <router-link to="/user/student/course-favourite">选课收藏夹</router-link>
      </div>
    </div>
    <div class="div-router-view">
      <router-view/>
    </div>
    <BottomBar :msg="'（学生端）'"/>
  </div>
</template>

<script>
import {reactive} from "vue";
import UserInfo from "@/components/UserInfo";
import ExitButton from "@/components/ExitButton";
import BottomBar from "@/components/BottomBar";

export default {
  name: "StudentMain",
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