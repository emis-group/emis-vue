let popupBox = null;

let install = (app) => {

}

let initPopupBox = (thePopupBox) => {
    popupBox = thePopupBox;
}

let createPopupBox = (options) => {
    if (popupBox && typeof popupBox.createPopupBox === "function") {
        popupBox.createPopupBox(options);
    } else {
        console.log("缺乏合适的弹窗组件或执行函数");
    }
}

let createConfirmPopupBox = (options) => {
    if (popupBox && typeof popupBox.createConfirmPopupBox === "function") {
        popupBox.createConfirmPopupBox(options);
    } else {
        console.log("缺乏合适的弹窗组件或执行函数");
    }
}

export default install;
export {
    initPopupBox,
    createPopupBox,
    createConfirmPopupBox
};