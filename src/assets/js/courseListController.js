import request from "@/assets/js/request"

let getCoursePage = (coursePageInfo, requestUrlInCourse, requestData) => {
    let courseList = coursePageInfo.courseList;
    let pageNumList = null;
    courseList.splice(0);
    if (coursePageInfo.hasOwnProperty("pageNumList")) {
        pageNumList = coursePageInfo.pageNumList;
        pageNumList.splice(0);
    }
    request("course/" + requestUrlInCourse, requestData).then((response) => {
        for (let i = 0; i < response.data.data.courseList.length; i++) {
            courseList.push(response.data.data.courseList[i]);
        }
        if (coursePageInfo.hasOwnProperty("pageNumList")) {
            for (let i = 1; i <= response.data.data.maxPageNum; i++) {
                pageNumList.push(i);
            }
        }
        coursePageInfo.courseTotalNum = response.data.data.courseTotalNum;
    })
}

export {getCoursePage}