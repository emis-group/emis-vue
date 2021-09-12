<template>
  <div class="login-background">
    <div class="login-box-wrapper">
      <div class="login-box">
        <div class="title">欢迎访问教务选课系统</div>
        <div class="message">
          <div>{{ message.message }}</div>
        </div>
        <div class="input-area">
          <InputBox
            :label="idInputBox.label"
            :model="idInputBox.model"
            :name="idInputBox.name"
            :type="idInputBox.type"
            :keyEnterEvent="idInputBox.keyEnterEvent"
          />
          <InputBox
            :label="passwordInputBox.label"
            :model="passwordInputBox.model"
            :name="passwordInputBox.name"
            :type="passwordInputBox.type"
            :keyEnterEvent="passwordInputBox.keyEnterEvent"
          />
          <button class="login-btn" type="button" @click="login">登录</button>
        </div>
      </div>
      <div>
        <div class="extra-message">
          建议在电脑端使用谷歌或火狐浏览器访问本网站（本网站尚未适配移动端）
        </div>
      </div>
    </div>
    <BottomBar />
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { routerPush } from "@/router";
import { request, setIsAllowToLoginPage } from "@/assets/js/request";
import { sha256 } from "js-sha256";
import InputBox from "@/components/InputBox";
import BottomBar from "@/components/BottomBar";

export default {
  name: "Login",
  components: { BottomBar, InputBox },
  // setup是一个用于初始化的函数
  setup() {
    let loginData = {
      id: ref(""),
      password: ref(""),
    };

    let message = reactive({ message: "请输入账号和密码" });

    // 点击“登录”按钮后会执行下面的函数
    let login = () => {
      if (loginData.id.value === "" || loginData.password.value === "") {
        alert("账号或密码不能为空");
        return;
      }
      let encryptedLoginData = {
        id: loginData.id.value,
        password: sha256(loginData.password.value), // 密码使用sha256加密传输
      };
      setIsAllowToLoginPage(true);
      request("user/login", encryptedLoginData, false).then((response) => {
        if (response.data.code === 200) {
          message.message = response.data.message;
        } else {
          alert(response.data.message);
        }

        if (response.data.data && response.data.data.hasOwnProperty("token")) {
          // 如果登录成功，后端服务器会返回一条token，这条token将会是该用户未来进行操作的凭据，现在需要保存下来
          window.sessionStorage.setItem("userId", loginData.id.value);
          window.sessionStorage.setItem("token", response.data.data.token);
          window.sessionStorage.setItem(
            "userType",
            response.data.data.userType
          );
          if (response.data.data.userType === "student") {
            // 如果服务器返回的用户类型是"student"，那么就跳转到学生端主页
            routerPush("student-home");
          } else if (response.data.data.userType === "teacher") {
            // 如果服务器返回的用户类型是"student"，那么就跳转到教师端主页
            routerPush("teacher-home");
          }
        }
      });
    };

    let idInputBox = {
      label: "账号（学工号）",
      model: loginData.id,
      name: "id",
      type: "text",
      keyEnterEvent: login,
    };

    let passwordInputBox = {
      label: "密码",
      model: loginData.password,
      name: "password",
      type: "password",
      keyEnterEvent: login,
    };

    return {
      loginData,
      message,
      idInputBox,
      passwordInputBox,
      login,
    };
  },
};
</script>

<style scoped>
@import url("../assets/css/login.css");
</style>