<template>
  <div class="content-wrapper">
    <div class="prominent-content-box">
      <div class="title">教师安排课程</div>
    </div>
    <div class="content-box">
      <div class="title">在这里新建课程</div>
      <div class="content">
        <div class="font-normal-text">
          在下表填写需要新建的课程信息，填写完后按下“点击新建课程”按钮。
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <td>{{ htmlText.tableHeader.courseId }}</td>
                <td>{{ htmlText.tableHeader.courseName }}</td>
                <td>{{ htmlText.tableHeader.studentTotalNum }}</td>
              </tr>
            </thead>
            <tbody :class="{ active: isActive }">
              <tr>
                <td>
                  <input
                    v-model="newCourseInfo.courseId"
                    class="input-text"
                    placeholder="请输入课程代码"
                    type="text"
                  />
                </td>
                <td>
                  <input
                    v-model="newCourseInfo.courseName"
                    class="input-text"
                    placeholder="请输入课程名"
                    type="text"
                  />
                </td>
                <td>
                  <input
                    v-model="newCourseInfo.studentTotalNum"
                    class="input-text"
                    placeholder="请输入课程人数容量"
                    type="text"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <td>{{ htmlText.tableHeader.weekNums }}</td>
                <td>{{ htmlText.tableHeader.isBiweekly }}</td>
                <td>{{ htmlText.tableHeader.weekDay }}</td>
                <td>{{ htmlText.tableHeader.splitNums }}</td>
              </tr>
            </thead>
            <tbody :class="{ active: isActive }">
              <tr>
                <td>
                  第
                  <select v-model="newCourseInfo.weekStart">
                    <option
                      v-for="(num, index) of selectOptions.weekStartNums"
                      :value="num"
                      :key="index"
                    >
                      {{ num }}
                    </option>
                  </select>
                  周 —— 第
                  <select v-model="newCourseInfo.weekEnd">
                    <option
                      v-for="(num, index) of selectOptions.weekEndNums"
                      :value="num"
                      :key="index"
                    >
                      {{ num }}
                    </option>
                  </select>
                  周
                </td>
                <td>
                  <input
                    v-model="newCourseInfo.isBiweekly"
                    name="isBiweekly"
                    type="radio"
                    value="true"
                  />是&nbsp;&nbsp;
                  <input
                    v-model="newCourseInfo.isBiweekly"
                    name="isBiweekly"
                    type="radio"
                    value="false"
                  />否
                </td>
                <td>
                  <select v-model="newCourseInfo.weekDay">
                    <option
                      v-for="(weekDay, index) of selectOptions.weekDays"
                      :value="index + 1"
                      :key="index"
                    >
                      {{ weekDay }}
                    </option>
                  </select>
                </td>
                <td>
                  第
                  <select v-model="newCourseInfo.splitStart">
                    <option
                      v-for="(num, index) of selectOptions.splitStartNums"
                      :value="num"
                      :key="index"
                    >
                      {{ num }}
                    </option>
                  </select>
                  节 —— 第
                  <select v-model="newCourseInfo.splitEnd">
                    <option
                      v-for="(num, index) of selectOptions.splitEndNums"
                      :value="num"
                      :key="index"
                    >
                      {{ num }}
                    </option>
                  </select>
                  节
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="font-normal-text">
          <span>提示：</span>
          <span :class="htmlClass.newCourseTips"
            >{{ htmlText.newCourseTips.value }}。</span
          >
        </div>
        <button
          id="btn-new-course"
          :disabled="htmlDisabled.btnNewCourse"
          @click="newCourse()"
        >
          点击新建课程
        </button>
      </div>
    </div>
    <!-- <span class="span-main-component-line" /> -->
    <div class="content-box">
      <div class="title">你的现有课程</div>
      <div class="content">
        <CourseList :course-page-content="coursePageContent" />
        <div class="font-normal-text">
          <span>备注：</span>
          <span
            >对于只有一位老师的课程，点击”退出课程“会同时删除课程信息。对于有多位老师的课程，点击”退出课程“不会影响其他老师在这节课的情况。</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick, onMounted, watch, reactive, ref } from "vue";
import { getCoursePage } from "@/assets/js/courseListController";
import { request } from "@/assets/js/request";
import { createPopupBox, createConfirmPopupBox } from "@/assets/js/popupBox";
import CourseList from "@/components/CourseList";

export default {
  name: "ModifyCourse",
  components: { CourseList },
  setup() {
    let selectOptions = {
      weekStartNums: [],
      weekEndNums: [],
      splitStartNums: [],
      splitEndNums: [],
      weekDays: [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日",
      ],
    };
    let coursePageContent = reactive({
      courseList: [
        {
          id: null,
          name: null,
          teacherName: null,
          weekNum: null,
          time: null,
          studentNum: null,
        },
      ],
      courseTotalNum: 0,
      buttons: [],
      needTopText: true,
    });
    let newCourseInfo = reactive({
      courseId: null,
      courseName: null,
      studentTotalNum: null,
      weekStart: null,
      weekEnd: null,
      isBiweekly: null,
      weekDay: null,
      splitStart: null,
      splitEnd: null,
    });
    let courseInfoRange = {
      minWeek: 1,
      maxWeek: 21,
      minSplitNum: 1,
      maxSplitNum: 11,
    };
    let htmlClass = reactive({
      newCourseTips: "",
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
        splitEnd: "第几节课上课（结束值）",
      },
      newCourseTips: ref("需要把表格信息填完才能点击新建课程"),
    };
    let htmlDisabled = reactive({
      btnNewCourse: true,
    });
    let isActive = ref(false);

    let newCourse = () => {
      newCourseInfo.courseId = newCourseInfo.courseId.toUpperCase();
      request("/course/newCourse", newCourseInfo).then((response) => {
        if (response.data.code === 409) {
          htmlText.newCourseTips.value = response.data.data;
          htmlClass.newCourseTips = "font-warning-text";
        } else if (response.data.code === 200) {
          htmlText.newCourseTips.value = response.data.data;
          htmlClass.newCourseTips = "font-pass-text";
        }
        createPopupBox({ text: response.data.message, canceled: getCourses });
      });
    };

    let dropCourse = (course) => {
      let dropCourseRequest = () => {
        request("/course/dropCourse", { courseId: course.id }).then(
          (response) => {
            createPopupBox({
              text: response.data.message,
              canceled: getCourses,
            });
          }
        );
      };

      createConfirmPopupBox({
        text: `是否需要退出该课程？\n\n课程名：${course.name}\n课程代码：${course.id}`,
        funIfTrue: dropCourseRequest,
      });
    };

    let checkCourseValidity = () => {
      let validity = true;
      let keys = Object.keys(newCourseInfo);
      for (let key of keys) {
        if ((newCourseInfo[key] ?? "") === "") {
          htmlText.newCourseTips.value = `表格数据尚未填写完整，您还需要填写“${htmlText.tableHeader[key]}”`;
          validity = false;
          break;
        }
      }
      if (validity) {
        validity = checkCourseId() && checkNumRange();
      }
      if (validity) {
        htmlText.newCourseTips.value =
          "表格数据已经填写完整，您可以点击新建课程了";
        htmlClass.newCourseTips = "font-pass-text";
        htmlDisabled.btnNewCourse = false;
      } else {
        htmlClass.newCourseTips = "font-warning-text";
        htmlDisabled.btnNewCourse = true;
      }
    };

    let checkCourseId = () => {
      let validity = true;
      let message = "";
      let propName = htmlText.tableHeader.courseId;
      if (newCourseInfo.courseId.length < 7) {
        validity = false;
        message = `您输入的${propName}太短了`;
      } else if (!/^[a-zA-Z]{2}/.test(newCourseInfo.courseId)) {
        validity = false;
        message = `您输入${propName}的前2个字符应为英文字母`;
      } else if (!/^.{2}[0-9]{5}/.test(newCourseInfo.courseId)) {
        validity = false;
        message = `您输入${propName}的第3—7个字符应为数字`;
      }
      if (!validity) {
        htmlText.newCourseTips.value = `数据填写有误：${message}（${propName}开头的格式为2个字母+5个数字）`;
      }
      return validity;
    };

    let checkNumRange = () => {
      let validity = true;
      if (Number.isNaN(Number(newCourseInfo.studentTotalNum))) {
        validity = false;
        htmlText.newCourseTips.value = `数据填写有误：${htmlText.tableHeader.studentTotalNum}应为数字`;
      } else if (Number(newCourseInfo.studentTotalNum) <= 0) {
        validity = false;
        htmlText.newCourseTips.value = `数据填写有误：${htmlText.tableHeader.studentTotalNum}必须为正数`;
      } else if (Number(newCourseInfo.studentTotalNum) > 32767) {
        validity = false;
        htmlText.newCourseTips.value = `数据填写有误：${htmlText.tableHeader.studentTotalNum}数值过大`;
      } else if (newCourseInfo.weekStart > newCourseInfo.weekEnd) {
        validity = false;
        htmlText.newCourseTips.value = `数据填写有误：${htmlText.tableHeader.weekStart}不能大于${htmlText.tableHeader.weekEnd}`;
      } else if (newCourseInfo.splitStart > newCourseInfo.splitEnd) {
        validity = false;
        htmlText.newCourseTips.value = `数据填写有误：${htmlText.tableHeader.splitStart}不能大于${htmlText.tableHeader.splitStart}`;
      }
      return validity;
    };

    let getCourses = () => {
      getCoursePage(coursePageContent, "findAllCourseByUserId", {});
    };

    let init = () => {
      for (let i = courseInfoRange.minWeek; i <= courseInfoRange.maxWeek; i++) {
        selectOptions.weekStartNums.push(i);
        selectOptions.weekEndNums.push(i);
      }
      for (
        let i = courseInfoRange.minSplitNum;
        i <= courseInfoRange.maxSplitNum;
        i++
      ) {
        selectOptions.splitStartNums.push(i);
        selectOptions.splitEndNums.push(i);
      }
      coursePageContent.buttons.push({
        head: "操作",
        text: "退出课程",
        clickFunction: dropCourse,
      });
      getCourses();
    };

    init();

    onMounted(() => {
      nextTick(() => {
        isActive.value = true;
      });
    });

    watch(newCourseInfo, () => {
      checkCourseValidity();
    });

    return {
      selectOptions,
      coursePageContent,
      newCourseInfo,
      htmlClass,
      htmlText,
      htmlDisabled,
      isActive,
      newCourse,
      dropCourse,
    };
  },
};
</script>

<style scoped>
.input-text {
  width: 90%;
  max-width: 200px;
}

#btn-new-course {
  margin: 10px 0;
}
</style>