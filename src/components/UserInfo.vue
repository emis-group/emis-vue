<template>
  <div class="user-info-root">
    <span class="font-user-info-title">{{ userInfo.type }}信息：</span>
    <span class="span-line" />
    <span class="font-user-info-content">姓名：{{ userInfo.name }}</span>
    <span class="font-user-info-content"
      >{{ userInfo.idName }}：{{ userInfo.id }}</span
    >
  </div>
</template>

<script setup>
// 本模块根据用户ID向后端服务器获取用户姓名，并进行相应的显示
import { reactive } from "vue";
import { request } from "/@/assets/js/request";

const props = defineProps({
  userInfoProp: {
    type: Object,
    default: function () {
      return {
        id: String,
        type: String,
      };
    },
  },
});
const userInfo = reactive({ id: null, name: null, type: null, idName: null });

const init = () => {
  userInfo.id = props.userInfoProp.id;

  request("user/name", {}).then((response) => {
    if (response.data.data) {
      userInfo.name = response.data.data;
    }
  });

  if (props.userInfoProp.type === "student") {
    userInfo.type = "学生";
    userInfo.idName = "学号";
  } else if (props.userInfoProp.type === "teacher") {
    userInfo.type = "教师";
    userInfo.idName = "工号";
  } else {
    userInfo.type = "(" + props.userInfoProp.type + ")";
    userInfo.idName = "账号";
  }
};

init();
</script>

<style scoped>
.user-info-root {
  width: 146px;
  height: 84px;
  padding: 8px;

  z-index: -1;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 5px 0 rgba(31, 113, 147, 0.25);
  border-radius: 5px;
  overflow: hidden;

  text-align: left;

  transition: all 0.3s;
}

.font-user-info-title {
  display: block;
  padding: 0 0 0 10px;
  line-height: 1.35;
  font-size: 12px;
}

.font-user-info-content {
  display: block;
  padding: 4px 2px 2px 10px;
  line-height: 1.2;
  font-size: 14px;
}

.span-line {
  height: 1px;
  width: 100%;

  display: block;
  margin: 4px 0;

  border: none;
  background-color: rgba(31, 113, 147, 0.5);
}
</style>