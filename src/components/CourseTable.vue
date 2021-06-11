<template>
  <table class="table-content-special">
    <thead>
    <tr>
      <th colspan="2">时间</th>
      <th v-for="weekDay of weekDays">{{ weekDay }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(courseRow,index) of courses.morning">
      <th v-if="index===0" class="td_course_rough_time" rowspan="4">上午</th>
      <td>第{{ index + 1 }}节</td>
      <td v-for="tableItem of courseRow" :rowspan="tableItem.itemLength">
        <span v-for="(courseItem,index) of tableItem.courseItemList">
          <span v-if="index!==0" class="span-small-component-line"/>
          <span>{{ courseItem.courseName }}</span><br/>
          <span>{{ courseItem.courseTime }}</span><br/>
          <span>{{ courseItem.courseWeekRange }}</span><br/>
          <span>{{ courseItem.teacherName }}</span><br/>
        </span>
      </td>
    </tr>
    <tr v-for="(courseRow,index) of courses.afternoon">
      <th v-if="index===0" class="td_course_rough_time" rowspan="4">下午</th>
      <td>第{{ index + 5 }}节</td>
      <td v-for="tableItem of courseRow" :rowspan="tableItem.itemLength">
        <span v-for="(courseItem,index) of tableItem.courseItemList">
          <span v-if="index!==0" class="span-small-component-line"/>
          <span>{{ courseItem.courseName }}</span><br/>
          <span>{{ courseItem.courseTime }}</span><br/>
          <span>{{ courseItem.courseWeekRange }}</span><br/>
          <span>{{ courseItem.teacherName }}</span><br/>
        </span>
      </td>
    </tr>
    <tr v-for="(courseRow,index) of courses.evening">
      <th v-if="index===0" class="td_course_rough_time" rowspan="3">晚上</th>
      <td>第{{ index + 9 }}节</td>
      <td v-for="tableItem of courseRow" :rowspan="tableItem.itemLength">
        <span v-for="(courseItem,index) of tableItem.courseItemList">
          <span v-if="index!==0" class="span-component-line"/>
          <span>{{ courseItem.courseName }}</span><br/>
          <span>{{ courseItem.courseTime }}</span><br/>
          <span>{{ courseItem.courseWeekRange }}</span><br/>
          <span>{{ courseItem.teacherName }}</span><br/>
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
      morning: [[{
        itemLength: null,
        courseItemList: [{courseName: null, courseTime: null, courseWeekRange: null, teacherName: null}]
      }]],
      afternoon: [[{
        itemLength: null,
        courseItemList: [{courseName: null, courseTime: null, courseWeekRange: null, teacherName: null}]
      }]],
      evening: [[{
        itemLength: null,
        courseItemList: [{courseName: null, courseTime: null, courseWeekRange: null, teacherName: null}]
      }]]
    });

    let getCourses = () => {
      request("course/findCourseTable", {}).then((response) => {
        let courseTable = response.data.data.courseTable;
        courses.morning.splice(0);
        courses.afternoon.splice(0);
        courses.evening.splice(0);
        for (let i = 0; i < 4; i++) {
          courses.morning.push(courseTable[i]);
        }
        for (let i = 4; i < 8; i++) {
          courses.afternoon.push(courseTable[i]);
        }
        for (let i = 8; i < courseTable.length; i++) {
          courses.evening.push(courseTable[i]);
        }
      })
    }

    let init = () => {
      getCourses();
    }

    init();

    return {
      weekDays,
      courses,
    }
  }
}
</script>

<style scoped>
.td_course_rough_time {
  width: 1.5em;
}
</style>