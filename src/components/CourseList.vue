<template>
  <div v-if="pageContent.needTopText" class="font-normal-text">共计有 {{ pageContent.courseTotalNum }} 条课程信息</div>
  <table class="table-content">
    <thead>
    <tr>
      <th>课程编号</th>
      <th>课程名</th>
      <th>授课教师</th>
      <th>周数</th>
      <th>时间</th>
      <th>选课人数</th>
      <th v-for="button in pageContent.buttons">{{ button.head }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item of pageContent.courseList">
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.teacherName }}</td>
      <td>{{ item.weekNum }}</td>
      <td>{{ item.time }}</td>
      <td>{{ item.studentNum }}</td>
      <td v-for="button in pageContent.buttons" class="td-button">
        <button @click="button.clickFunction(item)">{{ button.text }}</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "CourseList",
  props: {
    coursePageContent: {
      type: Object,
      default: function () {
        return {
          courseList: [{id: null, name: null, teacherName: null, weekNum: null, time: null, studentNum: null}],
          courseTotalNum: 0,
          buttons: [{head: null, text: null, clickFunction: null}],
          needTopText: false,
        }
      }
    }
  },
  setup(props) {
    let pageContent = props.coursePageContent;

    return {
      pageContent,
    }
  }
}
</script>

<style scoped>
.td-button {
  padding: 6px 8px;
}
</style>