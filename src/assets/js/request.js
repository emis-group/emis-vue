import axios from 'axios'

let request = async (requestUrl, requestData, notNeedToken) => {
    let token = window.sessionStorage.getItem("token");
    let responseData = null;
    let tokenValid = false;
    let headers = null;

    if (!notNeedToken) {
        if (!token) {
            alert("您的登录信息无效，请重新登陆");
            return;
        } else {
            tokenValid = true;
            headers = {headers: {"token": token}};
        }
    }

    const axiosService = axios.create({
        baseURL: 'http://localhost:8081/'
    })

    axiosService.interceptors.request.use((config) => {
        return config;
    }, (error) => {
        console.log("[axios]拦截到错误的请求");
        console.log(error);
        return Promise.reject(error);
    })

    axiosService.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        console.log("[axios]拦截到错误的响应");
        console.log(error);
        return Promise.reject(error);
    })

    if (requestData) {
        await axiosService.post(requestUrl, requestData, headers).then((response) => {
            responseData = response.data;
            console.log("post请求获得的response.data如下所示");
            console.log(responseData);
        })
    } else {
        await axiosService.get(requestUrl, headers).then((response) => {
            responseData = response.data;
            console.log("get请求获得的response.data如下所示");
            console.log(responseData);
        })
    }

    return {
        data: responseData,
        valid: tokenValid
    }
}

export {request}

