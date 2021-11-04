<template>
  <div class="div-footer">
    安徽大学课程设计作业 &nbsp; 教务选课系统{{ msg }}
    &nbsp; 本系统仅供教学测试使用
  </div>
</template>

<script setup>
// 本模块显示底部栏信息，可根据传入的参数msg动态显示文字
defineProps({
  msg: String,
});
</script>
