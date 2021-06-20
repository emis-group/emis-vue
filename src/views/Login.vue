<template>
  <div class="div-login-background">
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
              <td style="min-width: 3em"><label>账号：</label></td>
              <td>
                <input v-model="loginData.id" name="id"
                       placeholder="请输入账号" type="text" v-on:keyup.enter="login"/>
              </td>
            </tr>
            <tr>
              <td style="min-width: 3em"><label>密码：</label></td>
              <td>
                <input v-model="loginData.password" name="password"
                       placeholder="请输入密码" type="password" v-on:keyup.enter="login"/>
              </td>
            </tr>
          </table>
          <button class="input-btn" type="button" @click="login">登录</button>
        </form>
      </div>
    </div>
    <BottomBar/>
  </div>
</template>

<script>

import {reactive} from "vue"
import {routerPush} from "@/router";
import {request, setIsAllowToLoginPage} from "@/assets/js/request";
import {sha256} from "js-sha256";
import BottomBar from "@/components/BottomBar";

export default {
  name: "Login",
  components: {BottomBar},
  // setup是一个用于初始化的函数
  setup() {
    let loginData = reactive({
      id: "",
      password: ""
    });

    let message = reactive({message: "请输入账号和密码"});

    // 点击“登录”按钮后会执行下面的函数
    let login = () => {
      if (loginData.id === "" || loginData.password === "") {
        alert('账号或密码不能为空')
        return;
      }
      let encryptedLoginData = {
        id: loginData.id,
        password: sha256(loginData.password)  // 密码使用sha256加密传输
      }
      setIsAllowToLoginPage(true);
      request('user/login', encryptedLoginData, false).then((response) => {
        if (response.data.code === 200) {
          message.message = response.data.message;
        } else {
          alert(response.data.message)
        }

        if (response.data.data && response.data.data.hasOwnProperty("token")) {
          // 如果登录成功，后端服务器会返回一条token，这条token将会是该用户未来进行操作的凭据，现在需要保存下来
          window.sessionStorage.setItem("userId", loginData.id);
          window.sessionStorage.setItem("token", response.data.data.token);
          window.sessionStorage.setItem("userType", response.data.data.userType);
          if (response.data.data.userType === "student") {
            // 如果服务器返回的用户类型是"student"，那么就跳转到学生端主页
            routerPush("student-home");
          } else if (response.data.data.userType === "teacher") {
            // 如果服务器返回的用户类型是"student"，那么就跳转到教师端主页
            routerPush("teacher-home");
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