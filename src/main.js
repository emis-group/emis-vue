import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import requestPlugin from "@/assets/js/request";
import popupBox from "@/assets/js/popupBox";
import less from "less";

// 这里是main文件，整个程序从这里开始执行
// Vue搭建的是单页应用，“App.vue”是前端页面中的最顶层页面，其它页面都附属于它
const app = createApp(App);
app.use(store).use(router).use(requestPlugin).use(popupBox).use(less).mount('#app');