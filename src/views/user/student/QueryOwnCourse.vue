<template>
  <div class="prominent-container">
    <div class="title">已选课程查询</div>
  </div>
  <div class="main-container-wrapper">
    <div class="title">学生已选课程查询</div>
    <div class="main-container">
      <div class="main-text">
        以下是你选上的所有课程，你可以在这里进行退课操作。
      </div>
      <CourseList :course-page-content="coursePageContent" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { getCoursePage } from "/@/assets/js/courseListController";
import { request } from "/@/assets/js/request";
import { createPopupBox, createConfirmPopupBox } from "/@/assets/js/popupBox";
import CourseList from "/@/components/CourseList.vue";

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

const dropCourse = (course) => {
  const dropCourseRequest = () => {
    request("course/dropCourse", { courseId: course.id }).then((response) => {
      createPopupBox({
        text: response.data.message,
        canceled: getCourses,
      });
    });
  };
  createConfirmPopupBox({
    text: `是否需要退选该课程？\n\n课程名：${course.name}\n课程代码：${course.id}`,
    funIfTrue: dropCourseRequest,
  });
};

const getCourses = () => {
  getCoursePage(coursePageContent, "findAllCourseByUserId", {});
};

const init = () => {
  coursePageContent.buttons.push({
    head: "操作",
    text: "退课",
    clickFunction: dropCourse,
  });
  getCourses();
};

init();
</script>
