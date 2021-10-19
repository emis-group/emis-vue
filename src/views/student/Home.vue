<template>
  <div class="content-wrapper">
    <div class="prominent-content-box">
      <div class="title">主页</div>
      <div class="content">{{ userName }}，您好。欢迎访问教学选课系统！</div>
    </div>
    <div class="content-box">
      <div class="title">学生课程表</div>
      <div class="content">
        <CourseTable />
      </div>
    </div>
    <div class="content-box">
      <div class="title">快捷入口（外部链接）</div>
      <div class="content">
        <div class="text">
          点击以下按钮，前往其它安徽大学的网站（将离开本教务选课系统）。
        </div>
        <div class="channel-list">
          <a
            href="https://wvpn.ahu.edu.cn/"
            target="_blank"
            class="channel-item"
          >
            <i class="far fa-lightbulb"></i>
            <div class="text">智慧安大</div>
            <div class="url">wvpn.ahu.edu.cn</div>
          </a>
          <a
            href="https://jwxt.ahu.edu.cn/"
            target="_blank"
            class="channel-item"
          >
            <i class="fas fa-user-cog"></i>
            <div class="text">教务系统</div>
            <div class="url">jwxt.ahu.edu.cn</div>
          </a>
          <a href="http://101.76.160.144/" target="_blank" class="channel-item">
            <i class="fas fa-money-check"></i>
            <div class="text">服务大厅</div>
            <div class="url">101.76.160.144</div>
          </a>
          <a href="http://jwc.ahu.edu.cn/" target="_blank" class="channel-item">
            <i class="fas fa-university"></i>
            <div class="text">教务处</div>
            <div class="url">jwc.ahu.edu.cn</div>
          </a>
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
</template>

<script>
import { ref } from "vue";
import { request } from "@/assets/js/request";
import CourseTable from "@/components/CourseTable";

export default {
  name: "Home",
  components: { CourseTable },
  setup() {
    let userName = ref("");

    let init = () => {
      request("user/name", {}).then((response) => {
        userName.value = response.data.data;
      });
    };

    init();

    return {
      userName,
    };
  },
};
</script>
