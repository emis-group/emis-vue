<template>
  <div class="div-main-content">
    <h1 class="font-title">学生已选课程查询</h1>
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
      <tr v-for="item of courses">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.teacherName }}</td>
        <td>{{ item.weekNum }}</td>
        <td>{{ item.time }}</td>
        <td>{{ item.studentNum }}</td>
        <td>
          <button @click="dropCourse(item.id)">退课</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {reactive} from "vue";
import {getCourseList} from "@/assets/js/courseListController";
import request from "@/assets/js/request";

export default {
  name: "QueryCourse",
  setup() {
    let courses = reactive([{id: null, name: null, teacherName: null, weekNum: null, time: null, studentNum: null}]);

    let dropCourse = (courseId) => {
      request('/course/dropCourse', {courseId: courseId}).then((response) => {
        getCourses();
        alert(response.data.message);
      })
    }

    let getCourses = () => {
      getCourseList(courses, "findAllCourseByUserId", {});
    }

    let init = () => {
      getCourses()
    }

    init();

    return {
      courses,
      dropCourse
    }
  }
}
</script>

<style scoped>

</style>