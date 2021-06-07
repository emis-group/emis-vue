<template>
     <span class="span-user-info">
        <span class="font-user-info">{{ userInfo.type }}信息：</span>
        <hr/>
        <span class="font-user-info">姓名：{{ userInfo.name }}</span>
        <br/>
        <span class="font-user-info">{{ userInfo.idName  }}：{{ userInfo.id }}</span>
      </span>
</template>

<script>
import {reactive, getCurrentInstance} from "vue";

export default {
  name: "UserInfo",
  props: {
    userInfoProp: {
      type: Object,
      default: function () {
        return {
          id: String,
          name: String,
          type: String
        }
      }
    }
  },
  setup(props) {
    let userInfo = reactive({id: String, name: String, type: String, idName: String});

    userInfo.id = props.userInfoProp.id;

    const {proxy} = getCurrentInstance();

    let request = {id: window.sessionStorage.getItem("userId"), userType: window.sessionStorage.getItem("userType")};
    let token = window.sessionStorage.getItem("token");

    proxy.$axios.post('http://localhost:8081/user/name', request, {headers: {"token": token}}).then((response) => {
      userInfo.name = response.data;
      console.log("response.data在这里UserInfo");
      console.log(response.data);
    })

    userInfo.name = props.userInfoProp.name;
    if (props.userInfoProp.type === "student") {
      userInfo.type = "学生";
      userInfo.idName="学号";
    } else if (props.userInfoProp.type === "teacher") {
      userInfo.type = "教师";
      userInfo.idName="工号";
    } else {
      userInfo.type = "(" + props.userInfoProp.type + ")";
      userInfo.idName="账号";
    }
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

.font-user-info {
  font-size: 12px;
  padding: 0 0 0 10px;
}

hr {
  margin: 5px;
  height: 1px;
  border: none;
  background-color:  rgba(31, 113, 147, 0.5);
}
</style>