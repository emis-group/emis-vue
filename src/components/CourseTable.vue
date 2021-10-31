<template>
  <div class="table-wrapper" ref="wrapper">
    <table>
      <thead>
        <tr>
          <th colspan="2">时间</th>
          <th v-for="(weekDay, index) of weekDays" class="weekday" :key="index">
            {{ weekDay }}
          </th>
        </tr>
      </thead>
      <tbody :class="{ active: isActive }">
        <tr v-for="(courseRow, index) of courses.morning" :key="index">
          <td v-if="index === 0" class="course-rough-time" rowspan="4">
            <div class="text">上午</div>
          </td>
          <td class="split-num">第{{ index + 1 }}节</td>
          <td
            v-for="(tableItem, index) of courseRow"
            :rowspan="tableItem.itemLength"
            :key="index"
          >
            <span
              v-for="(courseItem, index) of tableItem.courseItemList"
              :key="index"
            >
              <span v-if="index !== 0" class="span-small-component-line" />
              <span>{{ courseItem.courseName }}</span
              ><br />
              <span>{{ courseItem.courseTime }}</span
              ><br />
              <span>{{ courseItem.courseWeekRange }}</span
              ><br />
              <span>{{ courseItem.teacherName }}</span
              ><br />
            </span>
          </td>
        </tr>
        <tr v-for="(courseRow, index) of courses.afternoon" :key="index">
          <td v-if="index === 0" class="course-rough-time" rowspan="4">
            <div class="text">下午</div>
          </td>
          <td class="split-num">第{{ index + 5 }}节</td>
          <td
            v-for="(tableItem, index) of courseRow"
            :rowspan="tableItem.itemLength"
            :key="index"
          >
            <span
              v-for="(courseItem, index) of tableItem.courseItemList"
              :key="index"
            >
              <span v-if="index !== 0" class="span-small-component-line" />
              <span>{{ courseItem.courseName }}</span
              ><br />
              <span>{{ courseItem.courseTime }}</span
              ><br />
              <span>{{ courseItem.courseWeekRange }}</span
              ><br />
              <span>{{ courseItem.teacherName }}</span
              ><br />
            </span>
          </td>
        </tr>
        <tr v-for="(courseRow, index) of courses.evening" :key="index">
          <td v-if="index === 0" class="course-rough-time" rowspan="3">
            <div class="text">晚上</div>
          </td>
          <td class="split-num">第{{ index + 9 }}节</td>
          <td
            v-for="(tableItem, index) of courseRow"
            :rowspan="tableItem.itemLength"
            :key="index"
          >
            <span
              v-for="(courseItem, index) of tableItem.courseItemList"
              :key="index"
            >
              <span v-if="index !== 0" class="span-component-line" />
              <span>{{ courseItem.courseName }}</span
              ><br />
              <span>{{ courseItem.courseTime }}</span
              ><br />
              <span>{{ courseItem.courseWeekRange }}</span
              ><br />
              <span>{{ courseItem.teacherName }}</span
              ><br />
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// 本模块向后端服务器请求课表信息，并解析课表信息显示为一个大表格
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { request } from "/@/assets/js/request";

const weekDays = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];
const courses = reactive({
  morning: [
    [
      {
        itemLength: null,
        courseItemList: [
          {
            courseName: null,
            courseTime: null,
            courseWeekRange: null,
            teacherName: null,
          },
        ],
      },
    ],
  ],
  afternoon: [
    [
      {
        itemLength: null,
        courseItemList: [
          {
            courseName: null,
            courseTime: null,
            courseWeekRange: null,
            teacherName: null,
          },
        ],
      },
    ],
  ],
  evening: [
    [
      {
        itemLength: null,
        courseItemList: [
          {
            courseName: null,
            courseTime: null,
            courseWeekRange: null,
            teacherName: null,
          },
        ],
      },
    ],
  ],
});
const isActive = ref(false);
const wrapper = ref(null);
let preHeight = 0;
let nextHeight = 0;

const autoHeight = () => {
  wrapper.value.style.height = "";
  nextTick(() => {
    nextHeight = getComputedStyle(wrapper.value).height;
    wrapper.value.style.height = preHeight;
    getComputedStyle(wrapper.value).height;
    wrapper.value.style.height = nextHeight;
    preHeight = nextHeight;
  });
};

const getCourses = async () => {
  let response = await request("course/findCourseTable", {});
  courses.morning.splice(0);
  courses.afternoon.splice(0);
  courses.evening.splice(0);
  if (response.data.data && response.data.data.courseTable) {
    let courseTable = response.data.data.courseTable;
    for (let i = 0; i < 4; i++) {
      courses.morning.push(courseTable[i]);
    }
    for (let i = 4; i < 8; i++) {
      courses.afternoon.push(courseTable[i]);
    }
    for (let i = 8; i < courseTable.length; i++) {
      courses.evening.push(courseTable[i]);
    }
  }
  isActive.value = true;
};

const init = () => {
  getCourses();
};

init();

onMounted(() => {
  preHeight = getComputedStyle(wrapper.value).height;
  window.addEventListener("resize", autoHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", autoHeight);
});

watch(isActive, () => {
  if (isActive.value) {
    autoHeight();
  }
});
</script>

<style scoped lang="scss">
.table-wrapper {
  table {
    .weekday {
      padding-left: 0.5%;
      padding-right: 0.5%;
    }

    .course-rough-time {
      padding: 0;
      .text {
        width: 1.5em;
        margin: 0 auto;
        font-weight: 700;
        @media screen and (max-width: 750px) {
          width: 1.1em;
        }
      }
    }
  }
}

.split-num {
  padding: 0.5em 0;
}
</style>
