<template>
  <div class="prominent-container">
    <div class="title">课程收藏夹</div>
  </div>
  <div class="main-container-wrapper">
    <div class="title">学生课程收藏夹</div>
    <div class="main-container">
      <div class="main-text">
        以下是你收藏的所有课程，你可以在这里进行选课操作。
      </div>
      <CourseList :course-page-content="coursePageContent" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { getCoursePage } from "/@/assets/js/courseListController";
import { request } from "/@/assets/js/request";
import { createPopupBox } from "/@/assets/js/popupBox";
import CourseList from "/@/components/CourseList.vue";

// coursePageContent包含了课程信息列表中的所有内容，如课程ID、课程名、教师名字等文字内容，还可以包含列表中的按钮元素(buttons)，按钮元素在后面的init函数中进行添加，在这里初始化时是空的
// coursePageContent将作为参数传入到CourseList.vue模块中
const coursePageContent = reactive({
  courseList: [
    {
      id: null,
      name: null,
      teacherName: null,
      weekNum: null,
      time: null,
      studentNum: null,
    },
  ],
  courseTotalNum: 0,
  buttons: [],
  needTopText: true,
});

const selectCourse = (course) => {
  request("course/addCourse", { courseId: course.id }).then((response) => {
    createPopupBox({ text: response.data.message, canceled: getCourses });
  });
};

const removeCourseFromFavorites = (course) => {
  request("course/removeCourseFromFavorites", { courseId: course.id }).then(
    (response) => {
      createPopupBox({ text: response.data.message, canceled: getCourses });
    }
  );
};

const getCourses = () => {
  getCoursePage(coursePageContent, "findAllFavoriteCourseByStudentId", {});
};

const init = () => {
  // 为coursePageContent添加按钮元素，包含信息：按钮所在列的表头、按钮名、按钮点击后需要触发的函数
  coursePageContent.buttons.push({
    head: "操作",
    text: "选课",
    clickFunction: selectCourse,
  });
  coursePageContent.buttons.push({
    head: "操作",
    text: "取消收藏",
    clickFunction: removeCourseFromFavorites,
  });
  getCourses();
};

init();
</script>
