import axios from 'axios'
import {ref} from "vue";

let axiosService;
let router;
let isAllowToLoginPage;

let install = (app, options) => {
    console.log("[request.js]install");
    console.log(app);
    router = app.config.globalProperties.$router;
    isAllowToLoginPage = ref(true);
    app.config.globalProperties.$isAllowToLoginRage = isAllowToLoginPage;

    initAxios();
}

let initAxios = () => {
    axiosService = axios.create({
        baseURL: 'http://localhost:8081/'
    })

    axiosService.interceptors.request.use((config) => {
        return config;
    }, (error) => {
        console.log("[request.js]拦截到错误的请求");
        console.log(error);
        return Promise.reject(error);
    })

    axiosService.interceptors.response.use((response) => {
        if (response.headers.hasOwnProperty("set-token")) {
            if (response.headers["set-token"] === "null") {
                if (isAllowToLoginPage.value) {
                    isAllowToLoginPage.value = false;
                    router.push({name: "login"});
                    alert("您的登录信息失效，需要重新登录");
                }
            } else {
                window.sessionStorage.setItem("token", response.headers["set-token"]);
            }
        }
        return response;
    }, (error) => {
        console.log("[request.js]拦截到错误的响应");
        console.log(error);
        return Promise.reject(error);
    })
}

let setIsAllowToLoginPage = (state) => {
    isAllowToLoginPage.value = state;
}

let request = async (requestUrl, requestData, needToken = true) => {
    let token = window.sessionStorage.getItem("token");
    let responseData = null;
    let tokenValid = false;
    let headers = null;
    let requestDataCopy = {};

    if (needToken) {
        if (!token) {
            if (isAllowToLoginPage.value) {
                isAllowToLoginPage.value = false;
                alert("您的登录信息无效，请重新登录");
                await router.push({name: "login"});
                return;
            }
        } else {
            tokenValid = true;
            headers = {headers: {"Authorization": token}};
        }
    }

    if (requestData) {
        for (let item in requestData) {
            if (requestData.hasOwnProperty(item)) {
                requestDataCopy[item] = requestData[item];
            }
        }
        if (needToken) {
            requestDataCopy.userId = window.sessionStorage.getItem("userId");
            requestDataCopy.userType = window.sessionStorage.getItem("userType");
        }
        await axiosService.post(requestUrl, requestDataCopy, headers).then((response) => {
            responseData = response.data;
            console.log("[request.js][" + requestUrl + "]post请求获得的response.data如下所示");
            console.log(responseData);
        })
    } else {
        await axiosService.get(requestUrl, headers).then((response) => {
            responseData = response.data;
            console.log("[request.js][" + requestUrl + "]get请求获得的response.data如下所示");
            console.log(responseData);
        })
    }

    return {
        data: responseData,
        valid: tokenValid
    }
}

export {request, setIsAllowToLoginPage};

export default install;