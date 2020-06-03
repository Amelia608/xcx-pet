/*
 * @Author: your name
 * @Date: 2020-06-03 20:33:30
 * @LastEditTime: 2020-06-03 21:41:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /xcx-appointment-mf-user-sass/src/pages/column/index.js
 */
//Page Object
const app = getApp();

Page({
  data: {
    list: [{}, {}, {}],
    tabs: [
      { name: "寻宠", code: "1" },
      { name: "寻主", code: "2" },
    ],
    tabIndex: 0,
    filterList: [
      { name: "离我最近", code: "1" },
      { name: "发布时间", code: "2" },
      { name: "浏览热度", code: "3" },
    ],
    filterIndex:0,
    ajax: false,
    isGetList: true,
  },
  onLoad: function () {},
});
