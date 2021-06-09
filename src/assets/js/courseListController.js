import request from "@/assets/js/request"

let getCourseList = (courseList, requestUrlInCourse, requestData) => {
    courseList.splice(0);
    request("course/" + requestUrlInCourse, requestData).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
            courseList.push(response.data[i]);
        }
    })
}

export {getCourseList}