<template>
  <div class="create-course-wrapper">
    <div
      class="page"
      :class="{ active: visiblePage === pageEnum.RoughSelectCourse }"
    >
      <SelectCourseModel />
    </div>
    <div
      class="page"
      :class="{ active: visiblePage === pageEnum.NewCourseModel }"
    >
      <NewCourseModel />
    </div>
    <div
      class="page"
      :class="{ active: visiblePage === pageEnum.FillCourseDetail }"
    >
      <FillCourseDetail />
    </div>
  </div>
</template>

<script setup>
import SelectCourseModel from "./create_course/SelectCourseModel.vue";
import NewCourseModel from "./create_course/NewCourseModel.vue";
import FillCourseDetail from "./create_course/FillCourseDetail.vue";

let pageEnum = { SelectCourseModel: 0, NewCourseModel: 1, FillCourseDetail: 2 };
let visiblePage = pageEnum.SelectCourseModel;
</script>

<style lang="scss" scoped>
.create-course-wrapper {
  position: relative;
  .page {
    position: absolute;
    width: 100%;
    opacity: 0;
    visibility: hidden;

    .active {
      opacity: 100;
      visibility: visible;
      transition: 0.3s;
    }
  }
}
</style>