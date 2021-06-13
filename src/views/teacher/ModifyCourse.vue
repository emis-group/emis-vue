<template>
  <div class="div-main-content">
    <h1 class="font-title">教师排课页面</h1>
    <h2 class="font-main-component-title">在这里新建课程</h2>
    <div class="div-normal-content">
      <div class="font-normal-text">在下表填写需要新建的课程信息，填写完后按下“点击新建课程”按钮。</div>
      <table class="table-content-special">
        <thead>
        <tr>
          <td>{{ htmlText.tableHeader.courseId }}</td>
          <td>{{ htmlText.tableHeader.courseName }}</td>
          <td>{{ htmlText.tableHeader.studentTotalNum }}</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><input v-model="newCourseInfo.courseId" placeholder="请输入课程代码" type="text"
                     @blur="checkIsEmpty"/></td>
          <td><input v-model="newCourseInfo.courseName" placeholder="请输入课程名" type="text"
                     @blur="checkIsEmpty"/></td>
          <td><input v-model="newCourseInfo.studentTotalNum" placeholder="请输入课程人数容量"
                     type="text" @blur="checkIsEmpty"/></td>
        </tr>
        </tbody>
      </table>
      <table class="table-content-special">
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
            <input v-model="newCourseInfo.isBiweekly" name="isBiweekly" type="radio" value="true"
                   @change="checkIsEmpty"/>是
            <input v-model="newCourseInfo.isBiweekly" name="isBiweekly" type="radio" value="false"
                   @change="checkIsEmpty"/>否
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
        <span :class="htmlClass.newCourseTips">{{ htmlText.newCourseTips.value }}。</span>
      </div>
      <button id="btn-new-course" :disabled="htmlDisabled.btnNewCourse" @click="newCourse()">点击新建课程</button>
    </div>
    <span class="span-main-component-line"/>

    <h2 class="font-main-component-title">您的现有课程</h2>
    <div class="div-normal-content">
      <CourseList :course-page-content="coursePageContent"/>
      <div class="font-normal-text">
        <span>备注：</span>
        <span>对于只有一位老师的课程，点击”退出课程“会同时删除课程信息。对于有多位老师的课程，点击”退出课程“不会影响其他老师在这节课的情况。</span>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import {getCoursePage} from "@/assets/js/courseListController";
import {request} from "@/assets/js/request";
import CourseList from "@/components/CourseList";

export default {
  name: "ModifyCourse",
  components: {CourseList},
  setup() {
    let selectOptions = {
      weekStartNums: [],
      weekEndNums: [],
      splitStartNums: [],
      splitEndNums: [],
      weekDays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
    }
    let coursePageContent = reactive({
      courseList: [{id: null, name: null, teacherName: null, weekNum: null, time: null, studentNum: null}],
      courseTotalNum: 0,
      buttons: [],
      needTopText: true
    })
    let newCourseInfo = reactive({
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
        courseId: "课程代码",
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

    let newCourse = () => {
      request('/course/newCourse', newCourseInfo).then((response) => {
        getCourses();
        if (response.data.code === 409) {
          htmlText.newCourseTips.value = response.data.data;
          htmlClass.newCourseTips = "font-warning-text";
        } else if (response.data.code === 200) {
          htmlText.newCourseTips.value = response.data.data;
          htmlClass.newCourseTips = "font-pass-text";
        }
        alert(response.data.message);
      })
    }

    let dropCourse = (course) => {
      if (confirm("是否需要退出该课程？\n\n课程名：" + course.name + "\n课程代码：" + course.id)) {
        request('/course/dropCourse', {courseId: course.id}).then((response) => {
          getCourses();
          alert(response.data.message);
        })
      }
    }

    let checkIsEmpty = () => {
      console.log("checkIsEmpty");
      console.log(newCourseInfo);
      let validity = true;
      if (validity) {
        for (let item in newCourseInfo) {
          if (newCourseInfo.hasOwnProperty(item)) {
            if (newCourseInfo[item] == null || newCourseInfo[item] === "") {
              htmlText.newCourseTips.value = "表格数据尚未填写完整，您还需要填写“" + htmlText.tableHeader[item] + "”";
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

    let getCourses = () => {
      getCoursePage(coursePageContent, "findAllCourseByUserId", {});
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
      coursePageContent.buttons.push({head: "操作", text: "退出课程", clickFunction: dropCourse})
      getCourses();
    }

    init();

    return {
      selectOptions,
      coursePageContent,
      newCourseInfo,
      htmlClass,
      htmlText,
      htmlDisabled,
      newCourse,
      dropCourse,
      checkIsEmpty
    }
  }
}
</script>

<style scoped>
#table-special tr:hover {
  background-color: inherit;
}

#table-special tr:nth-child(even) {
  background-color: rgb(235, 245, 248);
}

#table-special td:hover {
  background-color: rgba(127, 127, 127, 0.146);
}

#btn-new-course {
  margin: 10px 0;
}
</style>