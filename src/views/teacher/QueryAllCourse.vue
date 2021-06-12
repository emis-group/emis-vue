<template>
  <div class="div-main-content">
    <h1 class="font-title">查询全校所有课程</h1>
    <div class="float-normal-text-left-align">
      表格页码：
      <select v-model="selectedPageNum" @change="changePage">
        <option v-for="num of coursePageInfo.pageNumList" :value="num">{{ num }}</option>
      </select>
    </div>
    <div class="float-normal-text-right-align">共计有 {{ coursePageInfo.courseTotalNum }} 条课程信息，当前页面显示
      {{ coursePageInfo.courseList.length }} 条
    </div>
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
          <button @click="joinCourse(item.id)">加入课程</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import {getCoursePage} from "@/assets/js/courseListController";
import {request} from "@/assets/js/request";

export default {
  name: "QueryAllCourse",
  setup() {
    let coursePageInfo = reactive({
      courseList: [{id: null, name: null, teacherName: null, weekNum: null, time: null, studentNum: null}],
      pageNumList: [1],
      courseTotalNum: 0
    })
    let selectedPageNum = ref(1);

    let joinCourse = (courseId) => {
      request('course/addCourse', {courseId: courseId}).then((response) => {
        getCourses();
        alert(response.data.message);
      });
    }

    let changePage = () => {
      getCourses();
    }

    let getCourses = () => {
      getCoursePage(coursePageInfo, "findAllCourse", {pageNum: selectedPageNum.value});
    }

    let init = () => {
      getCourses();
    }

    init();

    return {
      coursePageInfo,
      selectedPageNum,
      changePage,
      joinCourse
    }
  }
}
</script>

<style scoped>

</style>