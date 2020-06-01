const Event = {
    on (name, fn) {
        const eventData = Event.data;
        if (eventData.hasOwnProperty(name)) {
            eventData[name].push(fn);
        } else {
            eventData[name] = [fn];
        }
        return this;
    },
    fire (name, data, thisArg) {
        const fnList = Event.data[name];
        const len = fnList.length;
        let fn;
        if (!fnList.length) {
            throw new Error(`Cannot find broadcast event ${name}`);
        }
        for (let i = 0; i < len; i++) {
            fn = fnList[i];
            fn.apply(thisArg, [data, name]);
        }
        return this;
    },
    data: {},
};

function complement (num) {
    return num >= 10 ? num : `0${num}`;
}

function compare (property, sort) {
    return function (a, b) {
        const value1 = a[property];
        const value2 = b[property];
        return sort <= 0 ? (value2 - value1) : (value1 - value2);
    }
}

function showToast (msg, type) {//type:1(成功) 0(失败)
    type = type ? "success" : "none";
    wx.showToast({
        title: msg,
        icon: type,
        image: '',
        duration: 700,
        mask: false
    });
}

var url = 'https://wechat.consumer.ymwlw.com/';
// 七牛云图片路径
const QINIU_DOMAIN_NAME = 'http://dwsaas.wowkai.cn/'
var apiList = {
    apipath: {
        //图片上传
        uploadImg: url + "uploadImg",
    }
};

function getWeek (n) {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var day = now.getDay();
    if (day !== 0) {
        n = n + (day - 1);
    }
    else {
        n = n + day;
    }
    if (day) {
        if (month > 1) {
            month = month;
        }
        else {
            year = year - 1;
            month = 12;
        }
    }
    console.log(day)
    now.setDate(now.getDate() - n);
    year = now.getFullYear();
    month = now.getMonth() + 1;
    date = now.getDate();
    return `${year}${complement(month)}${complement(date)}`;
}
function getCurrentPage () {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    if (!currentPage) {
        return { pages }
    }
    const url = '/' + currentPage.route
    let options = currentPage.options
    const optionsStr = Object.keys(options).map((item) => `${item}=${options[item]}`).join('&')
    let fullPath = url
    if (optionsStr) {
        fullPath += `?${optionsStr}`
    }
    return {
        pages,
        options,
        path: url,
        fullPath
    }
}
function isTabBarUrl (url) {
    const urls = ['/pages/index/index', '/pages/order/index', '/pages/personal/personal']
    const len = urls.filter((item) => (url.indexOf(item) > -1))
    return len.length > 0
}
function fmtDate (date, fmtExp) {
    date = !date ? new Date() : new Date(Number(date));
    var o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmtExp)) {
        fmtExp = fmtExp.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmtExp)) {
            fmtExp = fmtExp.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length)
            );
        }
    }
    return fmtExp;
}
module.exports = {
    Event,
    compare,
    complement,
    apiList,
    showToast,
    getWeek,
    getCurrentPage,
    isTabBarUrl,
    fmtDate,
    QINIU_DOMAIN_NAME
};
