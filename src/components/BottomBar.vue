<template>
  <div class="div-footer">
    安徽大学 软件工程概论实验课程作业 &nbsp; 第2组 教务选课系统{{ msg }}
    &nbsp; 本系统仅供教学测试使用
  </div>
</template>

<script>
// 本模块显示底部栏信息，可根据传入的参数msg动态显示文字
export default {
  name: "BottomBar",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
</style>