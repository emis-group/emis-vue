<template>
  <div class="content-wrapper">
    <div class="prominent-content-box">
      <div class="title">查询课程</div>
    </div>
    <div class="content-box">
      <div class="title">查询全校所有课程</div>
      <div class="content">
        <div class="font-normal-text">
          下表会展示选课系统中存在的所有课程，你可以点击“加入课程”按钮成为对应课程的授课老师的一员。
        </div>
        <div class="float-normal-text-left-align">
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
        <div class="float-normal-text-right-align">
          共计有 {{ coursePageContent.courseTotalNum }} 条课程信息，
          当前页面显示 {{ coursePageContent.courseList.length }} 条
        </div>
        <CourseList :course-page-content="coursePageContent" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { getCoursePage } from "@/assets/js/courseListController";
import { request } from "@/assets/js/request";
import { createPopupBox } from "@/assets/js/popupBox";
import CourseList from "@/components/CourseList";

export default {
  name: "QueryAllCourse",
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
      pageNumList: [1],
      courseTotalNum: 0,
      buttons: [],
      needTopText: false,
    });

    let selectedPageNum = ref(1);

    let joinCourse = (course) => {
      request("course/addCourse", { courseId: course.id }).then((response) => {
        createPopupBox({ text: response.data.message, canceled: getCourses });
      });
    };

    let changePage = () => {
      getCourses();
    };

    let getCourses = async () => {
      await getCoursePage(coursePageContent, "findAllCourse", {
        pageNum: selectedPageNum.value,
      });
    };

    let init = () => {
      coursePageContent.buttons.push({
        head: "操作",
        text: "加入课程",
        clickFunction: joinCourse,
      });
      getCourses();
    };

    init();

    return {
      coursePageContent,
      selectedPageNum,
      changePage,
      joinCourse,
    };
  },
};
</script>

<style scoped>
</style>