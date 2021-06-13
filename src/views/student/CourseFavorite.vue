<template>
  <div class="div-main-content">
    <h1 class="font-title">学生课程收藏夹</h1>
    <CourseList :course-page-content="coursePageContent"/>
  </div>
</template>

<script>
import {reactive} from "vue";
import {getCoursePage} from "@/assets/js/courseListController";
import {request} from "@/assets/js/request";
import CourseList from "@/components/CourseList";

export default {
  name: "CourseFavorite",
  components: {CourseList},
  setup() {
    let coursePageContent = reactive({
      courseList: [{id: null, name: null, teacherName: null, weekNum: null, time: null, studentNum: null}],
      courseTotalNum: 0,
      buttons: [],
      needTopText: true
    })

    let selectCourse = (course) => {
      request('course/addCourse', {courseId: course.id}).then((response) => {
        getCourses();
        alert(response.data.message);
      })
    }

    let removeCourseFromFavorites = (course) => {
      request('course/removeCourseFromFavorites', {courseId: course.id}).then((response) => {
        getCourses();
        alert(response.data.message);
      })
    }

    let getCourses = () => {
      getCoursePage(coursePageContent, "findAllFavoriteCourseByStudentId", {});
    }

    let init = () => {
      coursePageContent.buttons.push({head: "操作", text: "选课", clickFunction: selectCourse});
      coursePageContent.buttons.push({head: "操作", text: "取消收藏", clickFunction: removeCourseFromFavorites});
      getCourses();
    }

    init();

    return {
      coursePageContent,
      selectCourse,
      removeCourseFromFavorites
    }
  }
}
</script>

<style scoped>

</style>