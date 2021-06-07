<template>
  <div class="div-login-background">
    <div class="div-footer">
      <span>软件工程概论实验 第2组 教务选课系统 未完成版本</span>
    </div>
    <div class="div-login-main">
      <div class="div-login-title">
        <span class="font-login-title">欢迎访问教务系统</span>
      </div>
      <div class="div-login-message">
        <label>{{ message.message }}</label>
      </div>
      <div id="inputArea">
        <form id="formLogin" action="" method="get">
          <table class="table-login">
            <tr>
              <td><label>用户名：</label></td>
              <td><input v-model="loginData.id" name="id" placeholder="请输入用户名" type="text"/></td>
            </tr>
            <tr>
              <td><label>密码：</label></td>
              <td><input v-model="loginData.password" name="password" placeholder="请输入密码" type="password"/></td>
            </tr>
          </table>
          <button class="input-btn" type="button" @click="login()">登录</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import {reactive, getCurrentInstance} from "vue"
import {createRouter, createWebHistory} from "vue-router";

// router.beforeEach((to,from,next)=>{
//   const token = window.sessionStorage.getItem("token");
//   const userType = window.sessionStorage.getItem("userType");
//   console.log("开始导航");
//   if(token){
//     if(userType==="student"){
//       next('student-home');
//     }
//     else if(userType==="teacher"){
//       next('teacher-home');
//     }
//   }
//   else{
//     next(false);
//     alert("导航失败");
//   }
// })

export default {
  name: "Login",
  setup() {
    const {proxy} = getCurrentInstance();

    let loginData = reactive({
      id: "",
      password: "",
    });

    let message = reactive({message: "请输入账号和密码"});

    function login() {
      if (loginData.id === "" || loginData.password === "") {
        alert('账号或密码不能为空')
        return;
      }
      proxy.$axios.post('http://localhost:8081/user/login', loginData).then((response) => {
        const router = proxy.$router;
        if (response.data.code === 200) {
          message.message = response.data.message;
        } else {
          alert(response.data.message)
        }
        console.log(response.data);

        if (response.data.data && response.data.data.hasOwnProperty("token")) {
          window.sessionStorage.setItem("userId", loginData.id);
          window.sessionStorage.setItem("token", response.data.data.token);
          window.sessionStorage.setItem("userType", response.data.data.userType);
          if (response.data.data.userType === "student") {
            router.push({name: "student-home"});
          } else if (response.data.data.userType === "teacher") {
            router.push({name: "teacher-home"});
          }
        }
      })
    }

    return {
      loginData,
      message,
      login
    }
  },
}
</script>

<style scoped>

@import "../assets/css/main.css";

.div-login-background {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  position: fixed;
  background-image: linear-gradient(to bottom right, rgb(42, 206, 201), rgb(10, 113, 168));
}

input {
  font-size: 16px;
}

input[type=radio] {
  width: 16px;
  height: 16px;
}

.div-login-main {
  background-color: rgba(255, 255, 255, 0.382);
  position: relative;
  display: block;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(31, 113, 147, 0.5);
  top: 50%;
  transform: translateY(-50%);
}

.font-login-title {
  color: #FFFFFF;
  font-size: 32px;
}

.div-login-title {
  padding: 20px 0 10px 0;
}

.table-login {
  margin: 0 auto;
  padding: 15px 30px;
  background-color: rgba(255, 255, 255, 0.618);
  border-spacing: 10px 15px;
  border-radius: 10px;
  font-size: 18px;

  box-shadow: 0 0 5px 0 rgba(31, 113, 147, 0.25);

}

.input-btn {
  margin: 20px 0 20px 0;
  font-size: 18px;
}

.div-login-message {
  padding: 0 0 15px 0;
  color: #FFFFFF;
  font-size: 16px;
}
</style>