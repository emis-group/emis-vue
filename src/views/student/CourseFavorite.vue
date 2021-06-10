<template>
  <div class="div-main-content">
    <h1 class="font-title">学生课程收藏夹</h1>
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
          <button @click="removeCourseFromFavorites(item.id)">取消收藏</button>
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
  name: "CourseFavorite",
  setup() {
    let courses = reactive([{id: null, name: null, teacherName: null, weekNum: null, time: null, studentNum: null}]);

    let selectCourse = (courseId) => {
      request('course/addCourse', {courseId: courseId}).then((response) => {
        getCourses();
        alert(response.data.message);
      })
    }

    let removeCourseFromFavorites = (courseId) => {
      request('course/removeCourseFromFavorites', {courseId: courseId}).then((response) => {
        getCourses();
        alert(response.data.message);
      })
    }

    let getCourses = () => {
      getCourseList(courses, "findAllFavoriteCourseByStudentId", {});
    }

    let init = () => {
      getCourses();
    }

    init();

    return {
      courses,
      selectCourse,
      removeCourseFromFavorites
    }
  }
}
</script>

<style scoped>

</style>