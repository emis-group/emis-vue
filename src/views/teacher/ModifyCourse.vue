<template>
  <div class="div-main-content">
    <h1 class="font-title">教师排课页面</h1>
    <h2 class="font-main-component-title">在这里新建课程</h2>
    <div class="div-normal-content">
      <div class="font-normal-text">在下表填写需要新建的课程信息，填写完后按下“点击新建课程”按钮。</div>
      <table class="table-content">
        <thead>
        <tr>
          <td>{{ htmlText.tableHeader.courseId }}</td>
          <td>{{ htmlText.tableHeader.courseName }}</td>
          <td>{{ htmlText.tableHeader.studentTotalNum }}</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><input v-model="newCourseInfo.courseId" @blur="checkIsEmpty" type="text"
                     placeholder="请输入课程编号"/></td>
          <td><input v-model="newCourseInfo.courseName" @blur="checkIsEmpty" type="text"
                     placeholder="请输入课程名"/></td>
          <td><input v-model="newCourseInfo.studentTotalNum" @blur="checkIsEmpty"
                     type="text" placeholder="请输入课程人数容量"/></td>
        </tr>
        </tbody>
      </table>
      <table class="table-content">
        <thead>
        <tr>
          <td>{{ htmlText.tableHeader.weekNums }}</td>
          <td>{{ htmlText.tableHeader.isBiweekly }}</td>
          <td>{{ htmlText.tableHeader.weekDay }}</td>
          <td>{{ htmlText.tableHeader.splitNums }}</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            第
            <select v-model="newCourseInfo.weekStart" @change="checkIsEmpty">
              <option v-for="num in selectOptions.weekStartNums" :value="num">{{ num }}</option>
            </select>
            周 —— 第
            <select v-model="newCourseInfo.weekEnd" @change="checkIsEmpty">
              <option v-for="num in selectOptions.weekEndNums" :value="num">{{ num }}</option>
            </select>
            周
          </td>
          <td>
            <input v-model="newCourseInfo.isBiweekly" @change="checkIsEmpty" type="radio" name="isBiweekly"
                   value="true"/>是
            <input v-model="newCourseInfo.isBiweekly" @change="checkIsEmpty" type="radio" name="isBiweekly"
                   value="false"/>否
          </td>
          <td>
            <select v-model="newCourseInfo.weekDay" @change="checkIsEmpty">
              <option v-for="(weekDay,index) in selectOptions.weekDays" :value="index+1">{{ weekDay }}</option>
            </select>
          </td>
          <td>
            第
            <select v-model="newCourseInfo.splitStart" @change="checkIsEmpty">
              <option v-for="num in selectOptions.splitStartNums" :value="num">{{ num }}</option>
            </select>
            节 —— 第
            <select v-model="newCourseInfo.splitEnd" @change="checkIsEmpty">
              <option v-for="num in selectOptions.splitEndNums" :value="num">{{ num }}</option>
            </select>
            节
          </td>
        </tr>
        </tbody>
      </table>
      <div class="font-normal-text">
        <span>提示：</span>
        <span :class="htmlClass.newCourseTips">{{ htmlText.newCourseTips.value }}</span>
      </div>
      <button @click="addCourse()" id="btn-new-course" :disabled="htmlDisabled.btnNewCourse">点击新建课程</button>
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
import {reactive, ref} from "vue"
import {request} from "@/assets/js/request"

export default {
  name: "ModifyCourse",
  setup() {
    let selectOptions = {
      weekStartNums: [],
      weekEndNums: [],
      splitStartNums: [],
      splitEndNums: [],
      weekDays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
    }
    let courses = reactive([{id: null, name: null, teacherName: null, weekNum: null, time: null, studentNum: null}]);
    let newCourseInfo = reactive({
      userId: null,
      courseId: null,
      courseName: null,
      studentTotalNum: null,
      weekStart: null,
      weekEnd: null,
      isBiweekly: null,
      weekDay: null,
      splitStart: null,
      splitEnd: null
    });
    let courseInfoRange = {
      minWeek: 1,
      maxWeek: 21,
      minSplitNum: 1,
      maxSplitNum: 11
    }
    let htmlClass = reactive({
      newCourseTips: "div-normal-content",
    });
    let htmlText = {
      tableHeader: {
        courseId: "课程编号",
        courseName: "课程名",
        studentTotalNum: "容量（人数）",
        weekNums: "上课周数",
        weekStart: "上课周数（起始值）",
        weekEnd: "上课周数（结束值）",
        isBiweekly: "是否隔周上课",
        weekDay: "星期几上课",
        splitNums: "第几节课上课",
        splitStart: "第几节课上课（起始值）",
        splitEnd: "第几节课上课（结束值）"
      },
      newCourseTips: ref("需要把表格信息填完才能点击新建课程"),
    };
    let htmlDisabled = reactive({
      btnNewCourse: true,
    })

    // TODO: 新增课程条件判断
    let addCourse = () => {
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

    let checkIsEmpty = () => {
      console.log("checkIsEmpty");
      console.log(newCourseInfo);
      let validity = true;
      if (!newCourseInfo.userId) {
        htmlText.newCourseTips.value = "您的登录信息无效，需要重新登录";
        validity = false;
      }
      if (validity) {
        for (let item in newCourseInfo) {
          if (newCourseInfo.hasOwnProperty(item)) {
            if (newCourseInfo[item] == null || newCourseInfo[item] === "") {
              htmlText.newCourseTips.value = "表格数据尚未填写完整，您还需要填写”" + htmlText.tableHeader[item] + "“";
              validity = false;
              break;
            }
          }
        }
      }
      if (validity) {
        validity = checkNumRange();
      }
      if (validity) {
        htmlText.newCourseTips.value = "表格数据已经填写完整，您可以点击新建课程了";
        htmlClass.newCourseTips = "font-pass-text";
        htmlDisabled.btnNewCourse = false;
      } else {
        htmlClass.newCourseTips = "font-warning-text";
        htmlDisabled.btnNewCourse = true;
      }
    }

    let checkNumRange = () => {
      let validity = true;
      if (newCourseInfo.weekStart > newCourseInfo.weekEnd) {
        htmlText.newCourseTips.value = "数据填写有误：";
        htmlText.newCourseTips.value += htmlText.tableHeader.weekStart + "不能大于" + htmlText.tableHeader.weekEnd;
        validity = false;
      } else if (newCourseInfo.splitStart > newCourseInfo.splitEnd) {
        htmlText.newCourseTips.value = "数据填写有误：";
        htmlText.newCourseTips.value += htmlText.tableHeader.splitStart + "不能大于" + htmlText.tableHeader.splitStart;
        validity = false;
      }

      return validity;
    }

    let init = () => {
      for (let i = courseInfoRange.minWeek; i <= courseInfoRange.maxWeek; i++) {
        selectOptions.weekStartNums.push(i);
        selectOptions.weekEndNums.push(i);
      }
      for (let i = courseInfoRange.minSplitNum; i <= courseInfoRange.maxSplitNum; i++) {
        selectOptions.splitStartNums.push(i);
        selectOptions.splitEndNums.push(i);
      }

      newCourseInfo.userId = window.sessionStorage.getItem("userId");
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
      selectOptions,
      courses,
      newCourseInfo,
      htmlClass,
      htmlText,
      htmlDisabled,
      addCourse,
      deleteCourse,
      checkIsEmpty
    }
  }
}
</script>

<style scoped>
#btn-new-course {
  margin: 10px 0;
}
</style>