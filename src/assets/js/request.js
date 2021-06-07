// TODO: 使用统一的request函数完成前端的请求操作

import {getCurrentInstance} from "vue"

let request = (requestUrl, requestContent) => {
    let token = window.sessionStorage.getItem("token");

    const {proxy} = getCurrentInstance();

    let responseData;

    if (requestContent) {
        proxy.$axios.post('http://localhost:8081/' + requestUrl, requestContent, {headers: {"token": token}}).then((response) => {
            responseData = response.data;
            console.log("post获得的response.data如下所示");
            console.log(response.data);
            return {
                responseData
            }
        })
    } else {
        proxy.$axios.get('http://localhost:8081/' + requestUrl, {headers: {"token": token}}).then((response) => {
            responseData = response.data;
            console.log("get获得的response.data如下所示");
            console.log(response.data);
            return {
                responseData
            }
        })
    }
}

let requestPromise = new Promise((resolve, reject) => {
    request();
});

export {requestPromise}

