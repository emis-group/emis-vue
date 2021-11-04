<template>
  <div v-if="pageContent.needTopText" class="main-text">
    共计有 {{ pageContent.courseTotalNum }} 条课程信息
  </div>
  <div class="table-wrapper" ref="wrapper">
    <table class="list">
      <thead>
        <tr>
          <th>课程编号</th>
          <th>课程名</th>
          <th>授课教师</th>
          <th>周数</th>
          <th>时间</th>
          <th>选课人数</th>
          <th v-for="(button, index) of pageContent.buttons" :key="index">
            {{ button.head }}
          </th>
        </tr>
      </thead>
      <tbody :class="{ active: pageContent.isActive }">
        <tr
          v-if="!pageContent.courseList || pageContent.courseList.length === 0"
          class="nothing"
        >
          <td :colspan="pageContent.buttons.length + 6">无课程信息</td>
        </tr>
        <tr v-for="item of pageContent.courseList" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.teacherName }}</td>
          <td>{{ item.weekNum }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.studentNum }}</td>
          <td
            v-for="(button, index) of pageContent.buttons"
            class="td-button"
            :key="index"
            style="width: 10%"
          >
            <button @click="button.clickFunction(item)">
              {{ button.text }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// 本模块负责解析传入的课表信息(coursePageContent)并显示为表格，如果输入参数中包含按钮信息，还会把按钮放在表格最右侧
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
  coursePageContent: {
    type: Object,
    default: function () {
      return {
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
        buttons: [{ head: null, text: null, clickFunction: null }],
        needTopText: false,
        isActive: false,
      };
    },
  },
});

const wrapper = ref(null);
let pageContent = props.coursePageContent;
let preHeight = 0;
let nextHeight = 0;

let autoHeight = () => {
  wrapper.value.style.height = "";
  nextTick(() => {
    nextHeight = getComputedStyle(wrapper.value).height;
    wrapper.value.style.height = preHeight;
    getComputedStyle(wrapper.value).height;
    wrapper.value.style.height = nextHeight;
    preHeight = nextHeight;
  });
};

onMounted(() => {
  preHeight = getComputedStyle(wrapper.value).height;
  window.addEventListener("resize", autoHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", autoHeight);
});

watch(pageContent, () => {
  if (pageContent.isActive) {
    autoHeight();
  }
});
</script>

<style scoped lang="scss">
button {
  min-width: 1em;
  padding-left: 20%;
  padding-right: 20%;
}

.td-button {
  /* padding: 6px 1.5%; */
  overflow: hidden;
  padding: 6px 6px;
}
</style>
