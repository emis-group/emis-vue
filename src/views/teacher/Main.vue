<template>
  <div class="main-background">
    <div class="top-nav-wrapper">
      <div class="top-nav">
        <div class="title-box-wrapper">
          <div class="title-box">
            <div class="title">教务选课系统</div>
            <div class="sub-title">教师端</div>
          </div>
        </div>
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/user/teacher/">主页</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/user/teacher/modify-course">排课</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/user/teacher/query-all-course">查课</router-link>
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
    <div class="div-router-view" v-if="isVisible">
      <router-view />
    </div>
    <BottomBar :msg="'（教师端）'" />
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
  name: "TeacherMain",
  components: { BottomBar, ExitButton, UserInfo },
  setup() {
    let userInfo = reactive({
      id: null,
      type: null,
    });
    let isVisible = ref(true);

    let exit = () => {
      createConfirmPopupBox({
        text: "确定要退出账户？",
        funIfTrue: () => {
          routerPush("login");
          window.sessionStorage.clear();
        },
      });
    };

    let init = () => {
      if (!checkHasToken()) return;
      userInfo.id = window.sessionStorage.getItem("userId");
      userInfo.type = window.sessionStorage.getItem("userType");
      if (userInfo.type != "teacher") {
        isVisible.value = false;
        createPopupBox({
          text: "请注意，您所要访问的页面为教师端页面，该页面仅能由教师用户访问",
          buttons: [{ text: "点击此处返回", clickFun: routerBack }],
          isWarning: true,
        });
      }
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