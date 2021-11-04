<template>
  <div class="prominent-container">
    <div class="title">主页</div>
    <div class="content">{{ userInfo.name }}，您好。欢迎访问教学选课系统！</div>
  </div>
  <div class="main-container-wrapper">
    <div class="title">{{ userInfo.type }}课程表</div>
    <div class="main-container">
      <CourseTable />
    </div>
  </div>
  <div class="main-container-wrapper">
    <div class="title">快捷入口（外部链接）</div>
    <div class="main-container">
      <div class="main-text">
        点击以下按钮，前往其它安徽大学的网站（将离开本教务选课系统）。
      </div>
      <div class="container-fluid px-0">
        <div class="row g-2 row-cols-sm-3 row-cols-md-5">
          <div class="col">
            <a
              href="https://wvpn.ahu.edu.cn/"
              target="_blank"
              class="channel-item"
            >
              <i class="far fa-lightbulb"></i>
              <div class="text">智慧安大</div>
              <div class="url">wvpn.ahu.edu.cn</div>
            </a>
          </div>
          <div class="col">
            <a
              href="https://jwxt.ahu.edu.cn/"
              target="_blank"
              class="channel-item"
            >
              <i class="fas fa-user-cog"></i>
              <div class="text">教务系统</div>
              <div class="url">jwxt.ahu.edu.cn</div>
            </a>
          </div>
          <div class="col">
            <a
              href="http://101.76.160.144/"
              target="_blank"
              class="channel-item"
            >
              <i class="fas fa-money-check"></i>
              <div class="text">服务大厅</div>
              <div class="url">101.76.160.144</div>
            </a>
          </div>
          <div class="col">
            <a
              href="http://jwc.ahu.edu.cn/"
              target="_blank"
              class="channel-item"
            >
              <i class="fas fa-university"></i>
              <div class="text">教务处</div>
              <div class="url">jwc.ahu.edu.cn</div>
            </a>
          </div>
          <div class="col">
            <a
              href="http://csec.ahu.edu.cn/"
              target="_blank"
              class="channel-item"
            >
              <i class="fas fa-laptop-code"></i>
              <div class="text">计算机实验教学中心</div>
              <div class="url">csec.ahu.edu.cn</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { request } from "/@/assets/js/request";
import CourseTable from "/@/components/CourseTable.vue";

let userInfo = reactive({ name: "", type: "" });

request("user/name", {}).then((response) => {
  userInfo.name = response.data.data;
});

userInfo.type = sessionStorage.getItem("userType");
userInfo.type =
  userInfo.type === "student"
    ? "学生"
    : userInfo.type === "teacher"
    ? "教师"
    : userInfo.type;
</script>
