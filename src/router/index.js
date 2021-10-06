import {
    createRouter,
    createWebHistory
} from 'vue-router'
// 这是一个路由表，指定了路由名字对应的具体文件地址，页面跳转需靠它
const routes = [{
        path: '/',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/user/student',
        name: 'student-main',
        component: () => import('../views/student/Main.vue'),
        children: [{
                path: '',
                name: 'student-home',
                component: () => import('../views/student/Home.vue')
            },
            {
                path: 'select-course',
                name: 'select-course',
                component: () => import('../views/student/SelectCourse.vue')
            },
            {
                path: 'query-own-course',
                name: 'student-query-own-course',
                component: () => import('../views/student/QueryOwnCourse.vue')
            },
            {
                path: 'course-favourite',
                name: 'pre-select-course',
                component: () => import('../views/student/CourseFavorite.vue')
            },
        ]
    },
    {
        path: '/user/teacher',
        name: 'teacher-main',
        component: () => import('../views/teacher/Main.vue'),
        children: [{
                path: '',
                name: 'teacher-home',
                component: () => import('../views/teacher/Home.vue')
            },
            {
                path: 'modify-course',
                name: 'modify-course',
                component: () => import('../views/teacher/ModifyCourse.vue')
            },
            {
                path: 'query-all-course',
                name: 'query-all-course',
                component: () => import('../views/teacher/QueryAllCourse.vue')
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

const routerPush = async (name) => {
    await router.push({
        name: name
    });
}

export {
    routerPush
}

export default router