<template>
  <div class="app-root">
    <router-view />
  </div>
  <PopupBox ref="popupBox" />
</template>

<style>
@import url(./assets/css/normalize.css);
@import url("./assets/css/main.css");
@import url("./assets/fs/css/all.css");

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

<script>
import { ref } from "vue";
import { computed, onMounted, provide, reactive } from "@vue/runtime-core";
import { initPopupBox } from "@/assets/js/popupBox";
import PopupBox from "@/components/PopupBox";

export default {
  name: "App",
  components: { PopupBox },
  setup() {
    let popupBox = ref(null);

    onMounted(() => {
      initPopupBox(popupBox.value);
    });
    
    return { popupBox };
  },
};
</script>
