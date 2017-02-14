"use strict";

var _SwipeLeft = require("./SwipeLeft");

var _SwipeLeft2 = _interopRequireDefault(_SwipeLeft);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sl = new _SwipeLeft2.default();

sl.init(".menus", {
    menus: [{
        "text": "删除",
        "classes": ["on", "test"],
        "css": {
            "font-size": "14px",
            "width": "100px",
            "background-color": "red"
        },
        handler: function handler(e) {
            if (confirm("你确定删除此项吗?")) {
                e.el.parentNode.parentNode.removeChild(e.el.parentNode);
            }
        }
    }, {
        "text": "新增",
        "classes": "text-calss",
        "css": {
            "font-size": "14px",
            "background-color": "green"
        },
        handler: function handler(e) {
            alert("即将新增一项");
        }
    }]
});