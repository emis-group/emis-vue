<template>
  <div class="input-box-root">
    <div
      class="input-box-wrapper"
      @click="activateInput"
      @mouseover="isHover = true"
      @mouseleave="isHover = false"
    >
      <div class="label" :class="{ active: isActive || hasText }">
        {{ theProps.label }}
      </div>
      <div class="input">
        <div class="lineBlur" :class="{ hover: isHover }"></div>
        <div class="lineFocus" :class="{ active: isActive }"></div>
        <input
          :name="theProps.name"
          :type="theProps.type"
          v-model="theProps.model.value"
          v-focus="isActive"
          v-on:keyup.enter="theProps.keyEnterEvent"
          @focus="isActive = true"
          @blur="
            isActive = false;
            checkText();
          "
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(../assets/css/inputBox.css);
</style>

<script>
import { ref } from "vue";
export default {
  name: "InputBox",
  props: {
    label: String,
    model: "",
    name: "",
    type: "",
    keyEnterEvent: null,
  },
  directives: {
    focus: {
      updated(el, { value }) {
        if (value) {
          el.focus();
        }
      },
    },
  },
  setup(props) {
    let theProps = props;

    let isActive = ref(false);

    let isHover = ref(false);

    let hasText = ref(false);

    let activateInput = () => {
      isActive.value = true;
    }

    let checkText = () => {
      if (theProps.model.value != "") {
        hasText.value = true;
      } else {
        hasText.value = false;
      }
    }

    return { theProps, isActive, isHover, hasText, activateInput, checkText };
  },
};
</script>
