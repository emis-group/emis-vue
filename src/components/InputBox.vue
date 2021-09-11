<template>
  <div class="input-box">
    <div class="label">{{ theProps.label }}</div>
    <div class="input">
      <div class="lineBlur" :class="{ hover: isHover }"></div>
      <div class="lineFocus" :class="{ active: isActive }"></div>
      <input
        v-model="theProps.model.value"
        :name="theProps.name"
        :type="theProps.type"
        v-on:keyup.enter="theProps.keyEnterEvent"
        @focus="isActive = true"
        @blur="isActive = false"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
      />
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
  setup(props) {
    let theProps = props;

    let isActive = ref(false);

    let isHover = ref(false);

    return { theProps, isActive, isHover};
  },
};
</script>
