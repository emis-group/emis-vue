<template>
  <div class="prominent-container">
    <div class="title">选课</div>
  </div>
  <div class="main-container-wrapper">
    <div class="title">学生选课页面</div>
    <div class="main-container">
      <div class="main-text">你可以在下表选上或收藏相应的课程。</div>
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

const selectCourse = function (course) {
  request("course/addCourse", { courseId: course.id }).then((response) => {
    createPopupBox({ text: response.data.message, canceled: getCourses });
  });
};

const addCourseToFavorites = (course) => {
  request("course/addCourseToFavorites", { courseId: course.id }).then(
    (response) => {
      createPopupBox({ text: response.data.message, canceled: getCourses });
    }
  );
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
    text: "选课",
    clickFunction: selectCourse,
  });
  coursePageContent.buttons.push({
    head: "操作",
    text: "收藏",
    clickFunction: addCourseToFavorites,
  });
  getCourses();
};

init();
</script>
