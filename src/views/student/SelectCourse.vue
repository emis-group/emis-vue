<template>
  <div class="div-main-content">
    <h1 class="font-title">学生选课页面</h1>
    <table class="table-content">
      <thead>
      <tr>
        <td>课程编号</td>
        <td>课程名</td>
        <td>授课教师</td>
        <td>周数</td>
        <td>时间</td>
        <td>选课人数</td>
        <td>操作</td>
        <td>操作</td>
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
          <button @click="selectCourse(item.id)">选课</button>
        </td>
        <td>
          <button @click="addCourseToFavorites(item.id)">收藏</button>
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
  name: "SelectCourse",
  setup() {
    let courses = reactive([{id: null, name: null, teacherName: null, weekNum: null, time: null, studentNum: null}]);

    let selectCourse = (courseId) => {
      request('course/addCourse', {courseId: courseId}).then((response) => {
        getCourses();
        alert(response.data.message);
      })
    }

    let addCourseToFavorites = (courseId) => {
      request('course/addCourseToFavorites', {courseId: courseId}).then((response) => {
        alert(response.data.message);
      })
    }

    let getCourses = () => {
      getCourseList(courses, "findAllCourse")
    }

    let init = () => {
      getCourses();
    }

    init();

    return {
      courses,
      selectCourse,
      addCourseToFavorites
    }
  }
}
</script>

<style scoped>
.div-login-main {
  margin: 0 auto;
  display: block;
}

</style>