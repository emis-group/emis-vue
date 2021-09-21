<template>
  <div class="input-box-root">
    <div
      class="input-box-wrapper"
      @click="isActive = true"
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
          ref="inputEl"
          :name="theProps.name"
          :type="theProps.type"
          v-model="theProps.model.value"
          v-on:keyup.enter="theProps.keyEnterEvent"
          @focus="isActive = true"
          @blur="isActive = false"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(../assets/css/inputBox.css);
</style>

<script>
import { ref, watch } from "vue";
export default {
  name: "InputBox",
  props: {
    label: String,
    model: "",
    name: "",
    type: "",
    keyEnterEvent: null,
  },
  setup(props) {
    let theProps = props;

    let isActive = ref(false);

    let isHover = ref(false);

    let hasText = ref(false);

    let inputEl = ref(null);

    watch(theProps.model, () => {
      if (theProps.model.value != "") {
        hasText.value = true;
      } else {
        hasText.value = false;
      }
    });

    watch(isActive, () => {
      if (isActive.value) {
        inputEl.value.focus();
      } else {
        inputEl.value.blur();
      }
    });

    return { theProps, isActive, isHover, hasText, inputEl};
  },
};
</script>
