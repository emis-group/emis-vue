import {
    request
} from "/@/assets/js/request"

const getCoursePage = async (coursePageInfo, requestUrlInCourse, requestData) => {
    coursePageInfo.isActive = false;

    let courseList = coursePageInfo.courseList;
    courseList.splice(0);
    let response = await request("course/" + requestUrlInCourse, requestData);
    if (response.data.data) {
        for (let i = 0; i < response.data.data.courseList.length; i++) {
            courseList.push(response.data.data.courseList[i]);
        }
        if (coursePageInfo.hasOwnProperty("pageNumList")) {
            let pageNumList = coursePageInfo.pageNumList;
            pageNumList.splice(0);
            for (let i = 1; i <= response.data.data.maxPageNum; i++) {
                pageNumList.push(i);
            }
        }
        coursePageInfo.courseTotalNum = response.data.data.courseTotalNum;
    }

    coursePageInfo.isActive = true;
}

export {
    getCoursePage
}