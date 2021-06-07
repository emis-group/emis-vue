<template>
  <div class="div-content">
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
          <button @click="dropCourse(item.id)">TODO: 退课</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {getCurrentInstance, reactive} from "vue"

export default {
  name: "QueryCourse",
  setup() {
    let courses = reactive([{id: "", name: "", teacherName: "", weekNum: "", studentNum: ""}]);

    let request = {userId: window.sessionStorage.getItem("userId")};
    let token = window.sessionStorage.getItem("token");

    const {proxy} = getCurrentInstance();

    let dropCourse = (courseId) => {
      let request = {userId: window.sessionStorage.getItem("userId"), courseId: courseId};
      if (token) {
        proxy.$axios.post('http://localhost:8081/course/dropCourse', request, {headers: {"token": token}}).then((response) => {
          alert(response.data.message);
        })
      } else {
        alert("您的登录信息失效，请重新登录");
      }
    }

    proxy.$axios.post('http://localhost:8081/course/findAllCourseByStudentId', request, {headers: {"token": token}}).then((response) => {
      let responseData = response.data;
      courses.splice(0);
      for (let i = 0; i < responseData.length; i++) {
        courses.push(responseData[i]);
      }
      console.log("response.data如下");
      console.log(response.data);
    })
    return {
      courses,
      dropCourse
    }
  }
}
</script>

<style scoped>

</style>