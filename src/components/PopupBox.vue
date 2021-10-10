<template>
  <div
    class="popup-box-bg"
    :class="{ disappear: isDisappear }"
    v-if="isVisible"
  >
    <div class="wrapper">
      <div
        class="popup-box"
        :class="{ disappear: isDisappear, warning: isWarning, error: isError }"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
      >
        <div class="upper-box">
          <div class="title">
            {{ theProps.title ? theProps.title : "提示" }}
          </div>
          <div class="split-line" :class="{ active: isHover }" />
          <div class="content">
            <div class="text">{{ theProps.text }}</div>
          </div>
        </div>
        <div class="lower-box">
          <div class="control" :class="{ 'freeze-control': isDisappear }">
            <div class="buttons">
              <button
                v-for="(button, index) of theProps.buttons"
                :key="index"
                @click="
                  {
                    cancelPopupBox();
                    if (typeof button.clickFun === 'function') {
                      button.clickFun();
                    }
                  }
                "
              >
                {{ button.text }}
              </button>
              <button
                v-if="!theProps.buttons || theProps.buttons.length === 0"
                @click="cancelPopupBox"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(../assets/css/popupBox.css);
</style>

<script>
import { reactive, ref } from "vue";
export default {
  name: "PopupBox",
  setup() {
    let theProps = reactive({
      title: "",
      text: "",
      button: [],
    });
    let isVisible = ref(false);
    let isDisappear = ref(true);
    let isHover = ref(false);
    let canceled = null;
    let cancelTimerID = null;
    let isWarning = ref(false);
    let isError = ref(false);

    let universalCreate = (props) => {
      if (cancelTimerID) {
        clearTimeout(cancelTimerID);
      }
      theProps.title = props.title;
      theProps.text = props.text;
      canceled = props.canceled;
      isVisible.value = true;
      isDisappear.value = false;
      isHover.value = false;
      isWarning.value = false;
      isError.value = false;
      if (props.isWarning === true) {
        isWarning.value = true;
        if (props.title == null) {
          theProps.title = "注意";
        }
      }
      if (props.isError === true) {
        isError.value = true;
        if (props.title == null) {
          theProps.title = "出错了";
        }
      }
    };

    let createPopupBox = (props) => {
      universalCreate(props);
      theProps.buttons = props.buttons;
    };

    let createConfirmPopupBox = (props) => {
      universalCreate(props);
      theProps.buttons = [
        { text: "是", clickFun: props.funIfTrue },
        { text: "否", clickFun: props.funIfFalse },
      ];
    };

    let cancelPopupBox = () => {
      if (typeof canceled === "function") {
        canceled();
        canceled = null;
      }
      isDisappear.value = true;
      cancelTimerID = setTimeout(() => {
        isVisible.value = false;
        cancelTimerID = null;
      }, 300);
    };

    return {
      theProps,
      isHover,
      isVisible,
      isDisappear,
      isWarning,
      isError,
      createPopupBox,
      createConfirmPopupBox,
      cancelPopupBox,
    };
  },
};
</script>
