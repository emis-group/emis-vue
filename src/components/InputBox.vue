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
        :class="{ active: isActive || props.model.value != '' }"
      >
        {{ props.label }}
      </div>
      <div class="input">
        <div class="lineBlur" :class="{ hover: isHover }"></div>
        <div class="lineFocus" :class="{ active: isActive }"></div>
        <input
          ref="inputEl"
          :name="props.name"
          :type="props.type"
          v-model="props.model.value"
          v-on:keyup.enter="props.keyEnterEvent"
          @focus="isActive = true"
          @blur="isActive = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  label: String,
  model: "",
  name: "",
  type: "",
  keyEnterEvent: null,
});

const isActive = ref(false);
const isHover = ref(false);
const inputEl = ref(null);

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
</script>

<style scoped lang="scss">
@use "../assets/css/inputBox";
</style>
