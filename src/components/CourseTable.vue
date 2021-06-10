<template>
  <table class="table-content">
    <thead>
    <tr>
      <td colspan="2">时间</td>
      <td v-for="weekDay of weekDays">{{ weekDay }}</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(courseList,index) of courses.morning">
      <td v-if="index===0" class="td_course_rough_time" rowspan="4">上午</td>
      <td>第{{ index + 1 }}节</td>
      <td v-for="courses of courseList" :rowspan="courses.courseLength">
        <span v-for="course of courses">
          <span>{{ course.courseName }}</span>
          <span>{{ course.courseTime }}</span>
          <span>{{ course.courseWeekRange }}</span>
          <span>{{ course.teacherName }}</span>
          <br/>
        </span>
      </td>
    </tr>
    <tr v-for="(courseList,index) of courses.afternoon">
      <td v-if="index===0" class="td_course_rough_time" rowspan="4">下午</td>
      <td>第{{ index + 5 }}节</td>
      <td v-for="courses of courseList" :rowspan="courses.courseLength">
        <span v-for="course of courses">
          <span>{{ course.courseName }}</span>
          <span>{{ course.courseTime }}</span>
          <span>{{ course.courseWeekRange }}</span>
          <span>{{ course.teacherName }}</span>
          <br/>
        </span>
      </td>
    </tr>
    <tr v-for="(courseList,index) of courses.evening">
      <td v-if="index===0" class="td_course_rough_time" rowspan="3">晚上</td>
      <td>第{{ index + 9 }}节</td>
      <td v-for="courses of courseList" :rowspan="courses.courseLength">
        <span v-for="course of courses">
          <span>{{ course.courseName }}</span>
          <span>{{ course.courseTime }}</span>
          <span>{{ course.courseWeekRange }}</span>
          <span>{{ course.teacherName }}</span>
          <br/>
        </span>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import request from "@/assets/js/request";

const {reactive} = require("vue");

export default {
  name: "CourseTable",
  setup() {
    let weekDays = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
    let courses = reactive({
      morning: [[[{
        courseLength: null,
        courseItems: [{courseName: null, courseTime: null, courseWeekRange: null, teacherName: null}]
      }]]],
      afternoon: [[[{
        courseLength: null,
        courseItems: [{courseName: null, courseTime: null, courseWeekRange: null, teacherName: null}]
      }]]],
      evening: [[[{
        courseLength: null,
        courseItems: [{courseName: null, courseTime: null, courseWeekRange: null, teacherName: null}]
      }]]]
    });

    let getCourses = () => {
      request("course/findCourseTable", {}).then((response) => {
        let courseList = response.data.data;
        courses.morning.splice(0);
        courses.afternoon.splice(0);
        courses.evening.splice(0);
        for (let i = 0; i < 3; i++) {
          courses.morning.push(courseList[i]);
        }
        for (let i = 3; i < 7; i++) {
          courses.afternoon.push(courseList[i]);
        }
        for (let i = 7; i < courseList.length; i++) {
          courses.evening.push(courseList[i]);
        }
      })
    }

    let init = () => {
      getCourses();
    }

    init();

    return {
      weekDays,
      courses
    }
  }
}
</script>

<style scoped>
.td_course_rough_time {
  width: 1.5em;
}
</style>