<template>
  <div class="div-main-content">
    <h1 class="font-title">学生已选课程查询</h1>
    <CourseList :course-page-content="coursePageContent"/>
  </div>
</template>

<script>
import {reactive} from "vue";
import {getCoursePage} from "@/assets/js/courseListController";
import {request} from "@/assets/js/request";
import CourseList from "@/components/CourseList";

export default {
  name: "QueryCourse",
  components: {CourseList},
  setup() {
    let coursePageContent = reactive({
      courseList: [{id: null, name: null, teacherName: null, weekNum: null, time: null, studentNum: null}],
      courseTotalNum: 0,
      buttons: [],
      needTopText: true
    })

    let dropCourse = (course) => {
      if (confirm("是否需要退选该课程？\n\n课程名：" + course.name + "\n课程代码：" + course.id)) {
        request('course/dropCourse', {courseId: course.id}).then((response) => {
          getCourses();
          alert(response.data.message);
        })
      }
    }

    let getCourses = () => {
      getCoursePage(coursePageContent, "findAllCourseByUserId", {});
    }

    let init = () => {
      coursePageContent.buttons.push({head: "操作", text: "退课", clickFunction: dropCourse});
      getCourses();
    }

    init();

    return {
      coursePageContent,
      dropCourse
    }
  }
}
</script>

<style scoped>

</style>