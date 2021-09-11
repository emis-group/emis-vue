<template>
  <div class="content-wrapper">
    <div class="prominent-content-box">
      <div class="title">已选课程查询</div>
    </div>
    <div class="content-box">
      <div class="title">学生已选课程查询</div>
      <div class="content">
        <div class="font-normal-text">
          以下是你选上的所有课程，你可以在这里进行退课操作。
        </div>
        <CourseList :course-page-content="coursePageContent" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { getCoursePage } from "@/assets/js/courseListController";
import { request } from "@/assets/js/request";
import CourseList from "@/components/CourseList";

export default {
  name: "QueryCourse",
  components: { CourseList },
  setup() {
    let coursePageContent = reactive({
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

    let dropCourse = (course) => {
      if (
        confirm(
          "是否需要退选该课程？\n\n课程名：" +
            course.name +
            "\n课程代码：" +
            course.id
        )
      ) {
        request("course/dropCourse", { courseId: course.id }).then(
          (response) => {
            getCourses();
            alert(response.data.message);
          }
        );
      }
    };

    let getCourses = () => {
      getCoursePage(coursePageContent, "findAllCourseByUserId", {});
    };

    let init = () => {
      coursePageContent.buttons.push({
        head: "操作",
        text: "退课",
        clickFunction: dropCourse,
      });
      getCourses();
    };

    init();

    return {
      coursePageContent,
      dropCourse,
    };
  },
};
</script>

<style scoped>
</style>