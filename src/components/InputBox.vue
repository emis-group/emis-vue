<template>
  <div class="input-box-root">
    <div
      class="input-box-wrapper"
      @click="isActive = true"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
    >
      <div
        class="label"
        :class="{ active: isActive || theProps.model.value != '' }"
      >
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
import { onMounted, ref, watch } from "vue";
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

    let inputEl = ref(null);

    onMounted(() => {
      watch(
        isActive,
        () => {
          if (isActive.value) {
            inputEl.value.focus();
          } else {
            inputEl.value.blur();
          }
        },
        { immediate: true }
      );
    });

    return { theProps, isActive, isHover, inputEl };
  },
};
</script>