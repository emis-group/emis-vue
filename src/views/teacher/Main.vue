<template>
  <div class="main-background">
    <div class="top-nav-wrapper">
      <div class="top-nav">
        <div class="title-wrapper">
          <div class="title">教务选课系统</div>
          <div class="sub-title">教师端</div>
        </div>

        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/user/teacher/">主页</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/user/teacher/modify-course">排课</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/user/teacher/query-all-course"
              >查课</router-link
            >
          </li>
          <li class="nav-item">
            <a class="red" href="javascript:;" @click="exit">退出系统</a>
          </li>
        </ul>
        <div class="user-info">
          <UserInfo :user-info-prop="userInfo" />
        </div>
      </div>
    </div>
    <div class="div-router-view">
      <router-view />
    </div>
    <BottomBar :msg="'（教师端）'" />
  </div>
</template>

<script>
import { reactive } from "vue";
import { getCurrentInstance } from "vue";
import UserInfo from "@/components/UserInfo";
import ExitButton from "@/components/ExitButton";
import BottomBar from "@/components/BottomBar";

export default {
  name: "TeacherMain",
  components: { BottomBar, ExitButton, UserInfo },
  setup() {
    let userInfo = reactive({
      id: null,
      type: null,
    });

    let router = getCurrentInstance().proxy.$router;

    let init = () => {
      userInfo.id = window.sessionStorage.getItem("userId");
      userInfo.type = window.sessionStorage.getItem("userType");
    };

    let exit = () => {
      router.push({ name: "login" });
      window.sessionStorage.clear();
    };

    init();

    return {
      userInfo,
      exit
    };
  },
};
</script>

<style scoped>
@import url(../../assets/css/mainPage.css);
</style>