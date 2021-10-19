<template>
  <div class="main-background"></div>
</template>

<script>
import { createPopupBox } from "@/assets/js/popupBox";
import { routerBack } from "@/router";

export default {
  setup() {
    createPopupBox({
      text: "请注意，您所要访问的页面并不存在",
      buttons: [{ text: "点击此处返回", clickFun: routerBack }],
      isWarning: true,
    });
  },
};
</script>

<style scoped lang="less">
@import url(../../assets/css/mainPage.less);
</style>
