<template>
  <div class="div-main-content">
    <h1 class="font-title">学生选课页面</h1>
    <div class="font-normal-text">你可以在下表选上或收藏相应的课程。</div>
    <div class="float-normal-text-left-align">
      表格页码：
      <select v-model="selectedPageNum" @change="changePage">
        <option v-for="num of coursePageContent.pageNumList" :value="num">{{ num }}</option>
      </select>
    </div>
    <div class="float-normal-text-right-align">
      共计有 {{ coursePageContent.courseTotalNum }} 条课程信息，
      当前页面显示 {{ coursePageContent.courseList.length }} 条
    </div>
    <CourseList :course-page-content="coursePageContent"/>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import {getCoursePage} from "@/assets/js/courseListController";
import {request} from "@/assets/js/request";
import CourseList from "@/components/CourseList";

export default {
  name: "SelectCourse",
  components: {CourseList},
  setup() {
    let coursePageContent = reactive({
      courseList: [{id: null, name: null, teacherName: null, weekNum: null, time: null, studentNum: null}],
      pageNumList: [1],
      courseTotalNum: 0,
      buttons: [],
      needTopText: false
    })

    let selectedPageNum = ref(1);

    let selectCourse = (course) => {
      request('course/addCourse', {courseId: course.id}).then((response) => {
        getCourses();
        alert(response.data.message);
      })
    }

    let addCourseToFavorites = (course) => {
      request('course/addCourseToFavorites', {courseId: course.id}).then((response) => {
        getCourses();
        alert(response.data.message);
      })
    }

    let changePage = () => {
      getCourses();
    }

    let getCourses = () => {
      getCoursePage(coursePageContent, "findAllCourse", {pageNum: selectedPageNum.value});
    }

    let init = () => {
      coursePageContent.buttons.push({head: "操作", text: "选课", clickFunction: selectCourse});
      coursePageContent.buttons.push({head: "操作", text: "收藏", clickFunction: addCourseToFavorites});
      getCourses();
    }

    init();

    return {
      coursePageContent,
      selectedPageNum,
      selectCourse,
      addCourseToFavorites,
      changePage
    }
  }
}
</script>

<style scoped>

</style>