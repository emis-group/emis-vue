<template>
  <div class="div-main-content">
    <h1 class="font-title">学生已选课程查询</h1>
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
import {reactive} from "vue"
import {request} from "@/assets/js/request"

export default {
  name: "QueryCourse",
  setup() {
    let courses = reactive([{id: null, name: null, teacherName: null, weekNum: null, time: null, studentNum: null}]);

    let dropCourse = (courseId) => {
      let requestData = {userId: window.sessionStorage.getItem("userId"), courseId: courseId};

      request('/course/dropCourse',requestData).then((response)=>{
        alert(response.data.message);
      })
    }

    let init = () => {
      let requestData = {userId: window.sessionStorage.getItem("userId")};

      request('course/findAllCourseByStudentId', requestData).then((response) => {
        courses.splice(0);
        for (let i = 0; i < response.data.length; i++) {
          courses.push(response.data[i]);
        }
      });
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