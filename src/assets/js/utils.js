const throttle = (fun, waitTime = 1000) => {
    let timer = null;
    return function () {
        let _this = this;
        if (timer) {
            throw "节流阻止";
        }
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
            }, waitTime);
            return fun.call(_this, arguments);
        }
    }
}

export {
    throttle
};