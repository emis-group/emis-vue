<template>
  <div class="div-content">
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
        <td>操作1</td>
        <td>操作2</td>
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
          <button>TODO: 选课</button>
        </td>
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
  name: "SelectCourse",
  setup() {
    let courses = reactive([{id: "", name: "", teacherName: "", weekNum: "", studentNum: ""}]);

    const {proxy} = getCurrentInstance();
    const token = window.sessionStorage.getItem("token");
    if(token){
      proxy.$axios.get('http://localhost:8081/course/findAllCourse',{headers:{"token":token}}).then((response) => {
        let responseData=response.data;
        courses.splice(0);
        for(let i = 0;i<responseData.length;i++){
          courses.push(responseData[i]);
        }
      })
    }
    return {
      courses,
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