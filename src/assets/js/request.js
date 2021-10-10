import axios from 'axios'
import {
    routerPush
} from "@/router";
import {
    createPopupBox
} from "./popupBox"

let axiosService;
let isAllowToLoginPage;

let install = (app, options) => {
    isAllowToLoginPage = true;

    initAxios();
}

let initAxios = () => {
    axiosService = axios.create({
        baseURL: "http://49.235.110.57:8081/emis-springboot/"
    })

    axiosService.interceptors.request.use((config) => {
        return config;
    }, (error) => {
        console.log("[request.js]拦截到错误的请求");
        console.log(error);
        createPopupBox({
            text: `出现了意外错误：${error.message}`,
            isError: true
        });
    })

    axiosService.interceptors.response.use((response) => {
        if (response.headers.hasOwnProperty("set-token")) {
            if (response.headers["set-token"] === "null") {
                if (isAllowToLoginPage) {
                    isAllowToLoginPage = false;
                    routerPush("login");
                    createPopupBox({
                        text: "您的登录信息失效，需要重新登录",
                        isWarning: true
                    });
                }
            } else {
                window.sessionStorage.setItem("token", response.headers["set-token"]);
            }
        }
        return response;
    }, (error) => {
        console.log("[request.js]拦截到错误的响应");
        console.log(error);
        if (error.message === "Network Error") {
            createPopupBox({
                text: "网络出了些问题，请稍后再试",
                isError: true
            });
        } else {
            createPopupBox({
                text: `出现了意外错误：${error.message}`,
                isError: true
            });
        }
    })
}

let request = async (requestUrl, requestData, needToken = true) => {
    let token = window.sessionStorage.getItem("token");
    let responseData = null;
    let headers = null;
    let requestDataCopy = {};

    if (needToken) {
        if (checkHasToken(token)) {
            headers = {
                headers: {
                    "Authorization": token
                }
            };
        } else {
            return {
                data: {}
            };
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
        let response = await axiosService.post(requestUrl, requestDataCopy, headers);
        responseData = response.data;
        console.log("[request.js][" + requestUrl + "]post请求获得的response.data如下所示");
        console.log(responseData);
    } else {
        let response = await axiosService.get(requestUrl, headers);
        responseData = response.data;
        console.log("[request.js][" + requestUrl + "]get请求获得的response.data如下所示");
        console.log(responseData);
    }

    return {
        data: responseData === "" ? {} : responseData,
    }
}

let checkHasToken = (token) => {
    if (token == null) {
        token = sessionStorage.getItem("token");
    }
    if (token == null) {
        if (isAllowToLoginPage) {
            isAllowToLoginPage = false;
            routerPush("login");
            createPopupBox({
                text: "您的登录信息无效，请重新登录",
                isWarning: true
            });
        }
        return false;
    }
    return true;
}

let setIsAllowToLoginPage = (state) => {
    isAllowToLoginPage = state;
}

export {
    request,
    checkHasToken,
    setIsAllowToLoginPage
};

export default install;