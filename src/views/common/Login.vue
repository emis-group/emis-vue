<template>
  <div class="login-background">
    <div class="login-box-wrapper">
      <div class="login-box">
        <div class="title">欢迎访问教务选课系统</div>
        <div class="message" :class="message.class">
          <div>{{ message.text }}</div>
        </div>
        <div class="input-area">
          <div class="input-box-area" :class="{ hidden: inputBoxHidden }">
            <InputBox
              :label="idInputBox.label"
              :model="idInputBox.model"
              :name="idInputBox.name"
              :type="idInputBox.type"
              :keyEnterEvent="login"
            />
            <InputBox
              :label="passwordInputBox.label"
              :model="passwordInputBox.model"
              :name="passwordInputBox.name"
              :type="passwordInputBox.type"
              :keyEnterEvent="login"
            />
          </div>
          <button
            class="login-btn"
            :style="loginBtn.style"
            type="button"
            @click="login"
            ref="loginBtnDom"
          >
            {{ loginBtn.text }}
          </button>
        </div>
      </div>
      <div>
        <div class="extra-message">
          建议在电脑端使用最新版本的谷歌或火狐浏览器访问本网站（本网站尚未适配移动端）
        </div>
      </div>
    </div>
    <BottomBar />
  </div>
</template>

<script setup>
import {
  onMounted,
  onDeactivated,
  reactive,
  ref,
  toRef,
  onBeforeUnmount,
} from "vue";
import { routerPush } from "/@/router";
import { request, setIsAllowToLoginPage } from "/@/assets/js/request";
import { sha256 } from "js-sha256";
import { throttle } from "/@/assets/js/utils";
import InputBox from "/@/components/InputBox.vue";
import BottomBar from "/@/components/BottomBar.vue";

const loginData = {
  id: "",
  password: "",
};

const idInputBox = {
  label: "账号（学工号）",
  model: toRef(loginData, "id"),
  name: "id",
  type: "text",
};

const passwordInputBox = {
  label: "密码",
  model: toRef(loginData, "password"),
  name: "password",
  type: "password",
};

const message = reactive({
  text: "请输入账号和密码",
  class: { hidden: false, emphasize: false, "slight-emphasize": false },
});
const inputBoxHidden = ref(false);
const loginBtn = reactive({ style: {}, text: "登录" });
const loginBtnDom = ref(null);

// 点击“登录”按钮后会执行下面的函数
const login = () => {
  if (loginData.id === "" || loginData.password === "") {
    setMessage("账号或密码不能为空");
    return;
  }

  try {
    throttleLoginRequest();
    setLoginView(true);
  } catch (e) {
    if (e === "节流阻止") {
      setMessage("您的操作速度太快了，请再试一次");
    }
  }
};

const loginRequest = async () => {
  let encryptedLoginData = {
    id: loginData.id,
    password: sha256(loginData.password), // 密码使用sha256加密传输
  };
  let response = null;
  try {
    response = await request("user/login", encryptedLoginData, false);
  } catch (error) {
    setLoginView(false);
    setMessage("抱歉，登录失败了，请再试一次");
    return;
  }

  if (response.data.code === 200) {
    message.text = response.data.message;
  } else {
    setMessage(response.data.message);
  }

  if (response.data.data && response.data.data.token) {
    setIsAllowToLoginPage(true);
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

  setLoginView(false);
};

const throttleLoginRequest = throttle(() => {
  setTimeout(loginRequest, 1000);
});

const setLoginView = (() => {
  let intervalID = null;
  return (isLogining = false) => {
    if (intervalID) {
      clearInterval(intervalID);
    }
    if (isLogining) {
      message.class.hidden = true;
      inputBoxHidden.value = true;
      loginBtn.text = "正在登录，请稍后";
      let i = { value: 0 };
      intervalID = setInterval(() => {
        if (i.value === 3) {
          loginBtn.text = loginBtn.text.slice(0, -3);
          i.value = 0;
        } else {
          loginBtn.text += ".";
          i.value++;
        }
      }, 400);
      loginBtn.style["pointer-events"] = "none";
      loginBtn.style.transform =
        "translateY(" + -loginBtnDom.value.offsetTop / 2 + "px)";
    } else {
      message.class.hidden = false;
      inputBoxHidden.value = false;
      loginBtn.text = "登录";
      loginBtn.style["pointer-events"] = "";
      loginBtn.style.transform = "";
    }
  };
})();

const setMessage = (() => {
  let timerID = null;
  return (text, isEmphasized = true) => {
    message.text = text;
    if (isEmphasized) {
      message.class.emphasize = true;
    }
    if (timerID) {
      clearTimeout(timerID);
    }
    timerID = setTimeout(() => {
      message.class.emphasize = false;
      timerID = null;
    }, 400);
  };
})();

onMounted(() => {
  loginBtn.style.offsetTop = loginBtnDom.value.offsetTop;
});

onDeactivated(() => {
  setIsAllowToLoginPage(true);
});

onBeforeUnmount(() => {
  setIsAllowToLoginPage(true);
});
</script>

<style scoped lang="scss">
@use "../../assets/css/login";
</style>
