<template>
  <div class="div-main-content">
    <h1 class="font-title">主页</h1>
    <div class="font-title">{{ userName }}，您好。欢迎访问教学选课系统！</div>
    <h2 class="font-main-component-title">教师课程表</h2>
    <div class="div-main-content">
      <CourseTable/>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import request from "@/assets/js/request";
import CourseTable from "@/components/CourseTable";

export default {
  name: "Home",
  components: {CourseTable},
  setup() {
    let userName = ref("");

    request('user/name', {}).then((response) => {
      userName.value = response.data;
    })

    return {
      userName,
    }
  }
}
</script>

<style scoped>

</style>