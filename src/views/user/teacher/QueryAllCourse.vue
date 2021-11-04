<template>
  <div class="prominent-container">
    <div class="title">查询课程</div>
  </div>
  <div class="main-container-wrapper">
    <div class="title">查询全校所有课程</div>
    <div class="main-container">
      <div class="main-text">
        下表会展示选课系统中存在的所有课程，你可以点击“加入课程”按钮成为对应课程的授课老师的一员。
      </div>
      <div class="float-start mb-1 clearfix">
        表格页码：
        <select v-model="selectedPageNum" @change="changePage">
          <option
            v-for="(num, index) of coursePageContent.pageNumList"
            :value="num"
            :key="index"
          >
            {{ num }}
          </option>
        </select>
      </div>
      <div class="float-end mb-1 clearfix">
        共计有 {{ coursePageContent.courseTotalNum }} 条课程信息， 当前页面显示
        {{ coursePageContent.courseList.length }} 条
      </div>
      <CourseList :course-page-content="coursePageContent" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { getCoursePage } from "/@/assets/js/courseListController";
import { request } from "/@/assets/js/request";
import { createPopupBox } from "/@/assets/js/popupBox";
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
  pageNumList: [1],
  courseTotalNum: 0,
  buttons: [],
  needTopText: false,
});

const selectedPageNum = ref(1);

const joinCourse = (course) => {
  request("course/addCourse", { courseId: course.id }).then((response) => {
    createPopupBox({ text: response.data.message, canceled: getCourses });
  });
};

const changePage = () => {
  getCourses();
};

const getCourses = async () => {
  await getCoursePage(coursePageContent, "findAllCourse", {
    pageNum: selectedPageNum.value,
  });
};

const init = () => {
  coursePageContent.buttons.push({
    head: "操作",
    text: "加入课程",
    clickFunction: joinCourse,
  });
  getCourses();
};

init();
</script>
