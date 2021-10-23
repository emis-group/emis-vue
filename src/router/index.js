import {
    createRouter,
    createWebHistory
} from 'vue-router'
// 这是一个路由表，指定了路由名字对应的具体文件地址，页面跳转需靠它
const titlePreFix = "教务选课系统-";

const routes = [{
        path: '/',
        name: 'login',
        meta: {
            title: `${titlePreFix}登录界面`
        },
        component: () => import('/@/views/common/Login.vue')
    },
    {
        path: '/user/student',
        name: 'student-main',
        meta: {
            title: `${titlePreFix}学生端`
        },
        component: () => import('/@/views/user/student/Main.vue'),
        children: [{
                path: '',
                name: 'student-home',
                component: () => import('/@/views/user/Home.vue')
            },
            {
                path: 'select-course',
                name: 'select-course',
                component: () => import('/@/views/user/student/SelectCourse.vue')
            },
            {
                path: 'query-own-course',
                name: 'student-query-own-course',
                component: () => import('/@/views/user/student/QueryOwnCourse.vue')
            },
            {
                path: 'course-favourite',
                name: 'course-favourite',
                component: () => import('/@/views/user/student/CourseFavorite.vue')
            },
        ]
    },
    {
        path: '/user/teacher',
        name: 'teacher-main',
        meta: {
            title: `${titlePreFix}教师端`
        },
        component: () => import('/@/views/user/teacher/Main.vue'),
        children: [{
                path: '',
                name: 'teacher-home',
                component: () => import('/@/views/user/Home.vue')
            },
            {
                path: 'modify-course',
                name: 'modify-course',
                component: () => import('/@/views/user/teacher/ModifyCourse.vue')
            },
            {
                path: 'query-all-course',
                name: 'query-all-course',
                component: () => import('/@/views/user/teacher/QueryAllCourse.vue')
            },
        ]
    },
    {
        path: "/:pathMatch(.*)",
        name: "404",
        component: () => import("/@/views/common/404.vue")
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title != null) {
        document.title = to.meta.title;
    }
    next();
})

const routerPush = async (name) => {
    await router.push({
        name: name
    });
}

const routerBack = () => {
    if (document.referrer === "") {
        routerPush("login");
    }
    router.back();
}

export {
    routerPush,
    routerBack
}

export default router