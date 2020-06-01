const app = getApp();
// 获取客户信息（个人中心）
exports.getCustomerInfo = options => {
    let data = options.data || {};
    app.ajax({
        url: `/haircut/customers/${options.cid}/info`,
        type: "get",
        data,
        success(res) {
            if (options.success) options.success(res);
        },
        fail(res) {
            if (options.fail) options.fail(res);
        }
    });
};
//获取客户的个人档案
exports.personalInfo = options => {
    let data = options.data || {};
    app.ajax({
        url: "/haircut/consumer/personalInfo",
        type: "get",
        data,
        success(res) {
            if (options.success) options.success(res);
        },
        fail(res) {
            if (options.fail) options.fail(res);
        }
    });
};
//个人档案保存
exports.saveOrUpdateCustome = options => {
    let data = options.data || {};
    app.ajax({
        url: "/haircut/consumer/updCustomerPersonal",
        type: "post",
        data,
        success(res) {
            if (options.success) options.success(res);
        },
        fail(res) {
            if (options.fail) options.fail(res);
        }
    });
};
//获取用户套卡信息列表
exports.getCardList = options => {
    let data = options.data || {};
    app.ajax({
        url: "/haircut/cSetmealCard/getCSetmealCard/list",
        type: "get",
        data,
        success(res) {
            if (options.success) options.success(res);
        },
        fail(res) {
            if (options.fail) options.fail(res);
        }
    });
};
//套卡详情
exports.cardDetail = options => {
    let data = options.data || {};
    app.ajax({
        url: `/haircut/getCSetmealCard/${options.id}/information`,
        type: "get",
        data,
        success(res) {
            if (options.success) options.success(res);
        },
        fail(res) {
            if (options.fail) options.fail(res);
        }
    });
};
//套卡使用记录
exports.cardUseRecord = options => {
    let data = options.data || {};
    app.ajax({
        url: `/haircut/getCSetmealCard/${options.id}/useDetail`,
        type: "get",
        data,
        success(res) {
            if (options.success) options.success(res);
        },
        fail(res) {
            if (options.fail) options.fail(res);
        }
    });
};
//历史发型
exports.historyHairstyle = options => {
    let data = options.data || {};
    app.ajax({
        url: `/haircut/consumer/historicalHairstyle`,
        type: "post",
        data,
        success(res) {
            if (options.success) options.success(res);
        },
        fail(res) {
            if (options.fail) options.fail(res);
        }
    });
};
//剪发日历
exports.haircutCalendar = options => {
    let data = options.data || {};
    app.ajax({
        url: `/haircut/consumer/haircutCalendar`,
        type: "post",
        data,
        success(res) {
            if (options.success) options.success(res);
        },
        fail(res) {
            if (options.fail) options.fail(res);
        }
    });
};
//删除历史发型
exports.delHistoryHairstyle = options => {
    let data = options.data || {};
    app.ajax({
        url: `/haircut/consumer/delHistoricalHairstyle`,
        type: "get",
        data,
        success(res) {
            if (options.success) options.success(res);
        },
        fail(res) {
            if (options.fail) options.fail(res);
        }
    });
};
