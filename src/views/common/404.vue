<template>
  <div class="main-background"></div>
</template>

<script>
import { createPopupBox } from "@/assets/js/popupBox";
import { routerBack } from "@/router";

export default {
  setup() {
    createPopupBox({
      text: "抱歉，我们找不到这个页面",
      buttons: [{ text: "点击此处返回", clickFun: routerBack }],
      isWarning: true,
    });
  },
};
</script>

<style scoped lang="less">
@import url(../../assets/css/mainPage.less);
</style>
