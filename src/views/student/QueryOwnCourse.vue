<template>
  <div class="div-main-content">
    <h1 class="font-title">学生已选课程查询</h1>
    <div class="font-normal-text">共计有 {{ coursePageInfo.courseTotalNum }} 条课程信息</div>
    <table class="table-content">
      <thead>
      <tr>
        <th>课程编号</th>
        <th>课程名</th>
        <th>授课教师</th>
        <th>周数</th>
        <th>时间</th>
        <th>选课人数</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item of coursePageInfo.courseList">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.teacherName }}</td>
        <td>{{ item.weekNum }}</td>
        <td>{{ item.time }}</td>
        <td>{{ item.studentNum }}</td>
        <td>
          <button @click="dropCourse(item)">退课</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {reactive} from "vue";
import {getCoursePage} from "@/assets/js/courseListController";
import {request} from "@/assets/js/request";

export default {
  name: "QueryCourse",
  setup() {
    let coursePageInfo = reactive({
      courseList: [{id: null, name: null, teacherName: null, weekNum: null, time: null, studentNum: null}],
      courseTotalNum: 0
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
      getCoursePage(coursePageInfo, "findAllCourseByUserId", {});
    }

    let init = () => {
      getCourses()
    }

    init();

    return {
      coursePageInfo,
      dropCourse
    }
  }
}
</script>

<style scoped>

</style>