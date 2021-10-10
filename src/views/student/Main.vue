<template>
  <div class="main-background">
    <div class="top-nav-wrapper">
      <div class="top-nav">
        <div class="title-box-wrapper">
          <div class="title-box">
            <div class="title">教务选课系统</div>
            <div class="sub-title">学生端</div>
          </div>
        </div>
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/user/student/">主页</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/user/student/select-course">选课</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/user/student/query-own-course"
              >已选课程查询</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/user/student/course-favourite"
              >课程收藏夹</router-link
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
      <div class="div-router-view" v-if="isVisible">
        <router-view />
      </div>
      <BottomBar :msg="'（学生端）'" />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { routerPush, routerBack } from "@/router";
import { checkHasToken } from "@/assets/js/request";
import { createPopupBox, createConfirmPopupBox } from "@/assets/js/popupBox";
import UserInfo from "@/components/UserInfo";
import ExitButton from "@/components/ExitButton";
import BottomBar from "@/components/BottomBar";

export default {
  name: "StudentMain",
  components: { BottomBar, ExitButton, UserInfo },
  setup() {
    let userInfo = reactive({
      id: null,
      type: null,
    });
    let isVisible = ref(true);

    let init = () => {
      if (!checkHasToken()) return;
      userInfo.id = window.sessionStorage.getItem("userId");
      userInfo.type = window.sessionStorage.getItem("userType");
      if (userInfo.type != "student") {
        isVisible.value = false;
        createPopupBox({
          text: "请注意，您所要访问的页面为学生端页面，该页面仅能由学生用户访问",
          buttons: [{ text: "点击此处返回", clickFun: routerBack }],
          isWarning: true,
        });
      }
    };

    let exit = () => {
      createConfirmPopupBox({
        text: "确定要退出账户？",
        funIfTrue: () => {
          routerPush("login");
          window.sessionStorage.clear();
        },
      });
    };

    init();

    return {
      userInfo,
      isVisible,
      exit,
    };
  },
};
</script>

<style scoped>
@import url(../../assets/css/mainPage.css);
</style>