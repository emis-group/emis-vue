<template>
  <div class="div-main-content">
    <h1 class="font-title">教师排课页面</h1>
    <h2 class="font-main-component-title">在这里添加课程</h2>
    <div class="div-normal-content">
      <div class="font-normal-text">在下表填写需要新建的课程信息，填写完后按下“点击增加课程”按钮。</div>
      <table class="table-content">
        <thead>
        <tr>
          <td>课程编号</td>
          <td>课程名</td>
          <td>上课周数</td>
          <td>是否隔周上课</td>
          <td>星期几上课</td>
          <td>第几节课上课</td>
          <td>容量（人数）</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><input v-model="newCourseInfo.courseId" type="text" placeholder="请输入课程编号"/></td>
          <td><input v-model="newCourseInfo.courseName" type="text" placeholder="请输入课程名"/></td>
          <td>
            第
            <select v-model="newCourseInfo.weekStart">
              <option v-for="num in weekNums" :value="num">{{ num }}</option>
            </select>
            周 —— 第
            <select v-model="newCourseInfo.weekEnd">
              <option v-for="num in weekNums" :value="num">{{ num }}</option>
            </select>
            周
          </td>
          <td><input v-model="newCourseInfo.isBiweekly" type="checkbox"/></td>
          <td>
            <select v-model="newCourseInfo.weekDay">
              <option v-for="(weekDay,index) in weekDays" :value="index">{{ weekDay }}</option>
            </select>
          </td>
          <td>
            第
            <select v-model="newCourseInfo.splitStart">
              <option v-for="num in splitNums" :value="num">{{ num }}</option>
            </select>
            节 —— 第
            <select v-model="newCourseInfo.splitEnd">
              <option v-for="num in splitNums" :value="num">{{ num }}</option>
            </select>
            节
          </td>
          <td><input v-model="newCourseInfo.studentTotalNum" type="text" placeholder="请输入课程人数容量"/></td>
        </tr>
        </tbody>
      </table>
      <br/>
      <button @click="addCourse()">点击增加课程</button>
    </div>
    <span class="span-main-component-line"/>
    <h2 class="font-main-component-title">您的现有课程</h2>
    <div class="div-normal-content">
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
            <button @click="deleteCourse(item.id)">删除课程</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue"
import {request} from "@/assets/js/request"

export default {
  name: "ModifyCourse",
  setup() {
    let weekNums = [];
    let splitNums = [];
    let weekDays = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
    let courses = reactive([{id: null, name: null, teacherName: null, weekNum: null, time: null, studentNum: null}]);
    let newCourseInfo = reactive({
      userId: null,
      courseId: null,
      courseName: null,
      weekStart: null,
      weekEnd: null,
      isBiweekly: false,
      weekDay: null,
      splitStart: null,
      splitEnd: null,
      studentTotalNum: null
    });

    // TODO: 新增课程条件判断
    let addCourse = () => {
      newCourseInfo.userId = window.sessionStorage.getItem("userId");
      request('/course/addCourse', newCourseInfo).then((response) => {
        alert(response.data.message);
      })
    }

    let deleteCourse = (courseId) => {
      let requestData = {userId: window.sessionStorage.getItem("userId"), courseId: courseId};
      request('/course/deleteCourse', requestData).then((response) => {
        alert(response.data.message);
      })
    }

    let init = () => {
      for (let i = 1; i <= 21; i++) {
        weekNums.push(i);
      }
      for (let i = 1; i <= 11; i++) {
        splitNums.push(i);
      }

      let requestData = {userId: window.sessionStorage.getItem("userId")};
      request('course/findAllCourseByTeacherId', requestData).then((response) => {
        courses.splice(0);
        for (let i = 0; i < response.data.length; i++) {
          courses.push(response.data[i]);
        }
      });
    }

    init();

    return {
      weekNums,
      weekDays,
      splitNums,
      courses,
      newCourseInfo,
      addCourse,
      deleteCourse
    }
  }
}
</script>

<style scoped>

</style>