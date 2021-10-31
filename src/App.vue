<template>
  <div class="app-root">
    <router-view />
  </div>
  <PopupBox ref="popupBox" />
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "@vue/runtime-core";
import { initPopupBox } from "/@/assets/js/popupBox";
import PopupBox from "/@/components/PopupBox.vue";

const popupBox = ref(null);

onMounted(() => {
  initPopupBox(popupBox.value);
});
</script>

<style lang="scss">
@use "./assets/css/normalize.css";
@use "./assets/css/main";
@import "./assets/fs/css/all.css";

html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>