<template>
     <span class="span-user-info">
        <span class="font-user-info-title">{{ userInfo.type }}信息：</span>
        <span class="span-line"/>
        <span class="font-user-info-content">姓名：{{ userInfo.name }}</span>
        <span class="font-user-info-content">{{ userInfo.idName }}：{{ userInfo.id }}</span>
      </span>
</template>

<script>
import {reactive} from "vue";
import {request} from "@/assets/js/request";

export default {
  name: "UserInfo",
  props: {
    userInfoProp: {
      type: Object,
      default: function () {
        return {
          id: String,
          type: String
        }
      }
    }
  },
  setup(props) {
    let userInfo = reactive({id: null, name: null, type: null, idName: null});

    let init = () => {
      userInfo.id = props.userInfoProp.id;

      request('user/name', {}).then((response) => {
        userInfo.name = response.data.data;
      })

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
    }

    init();

    return {
      userInfo
    }
  }
}
</script>

<style scoped>
.span-user-info {
  position: fixed;
  top: 8px;
  left: 8px;

  width: 140px;
  height: 68px;
  padding: 8px;

  /*display: block;*/
  background-color: rgba(255, 255, 255, 0.618);
  box-shadow: 0 0 5px 0 rgba(31, 113, 147, 0.25);
  border-radius: 5px;

  text-align: left;
}

.font-user-info-title {
  display: block;
  font-size: 12px;
  padding: 0 0 0 10px;
}

.font-user-info-content {
  display: block;
  font-size: 14px;
  padding: 0 0 3px 10px;
}

.span-line {
  height: 1px;
  width: 100%;

  display: block;
  margin: 5px 0;

  border: none;
  background-color: rgba(31, 113, 147, 0.5);
}
</style>