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
          <button>TODO: 退课</button>
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

    let request = {id: window.sessionStorage.getItem("userId")};
    let token = window.sessionStorage.getItem("token");

    const {proxy} = getCurrentInstance();

    proxy.$axios.post('http://localhost:8081/course/findAllCourseByStudentId', request, {headers: {"token": token}}).then((response) => {
      let responseData = response.data;
      courses.splice(0);
      for (let i = 0; i < responseData.length; i++) {
        courses.push(responseData[i]);
      }
      console.log("response.data在这里");
      console.log(response.data);
      console.log(courses)
    })
    return {
      courses,
    }
  }
}
</script>

<style scoped>

</style>