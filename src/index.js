import SwipeLeft from "./SwipeLeft";

const sl = new SwipeLeft();

sl.init(".menus", {
    menus: [{
        "text": "删除",
        "classes": ["on", "test"],
        "css": {
        	"font-size": "14px",
        	"width": "100px",
        	"background-color": "red"
        },
        handler: (e) => {
        	if(confirm("你确定删除此项吗?")) {
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
        handler: (e) => {
        	alert("即将新增一项");
        }
    }]
});
