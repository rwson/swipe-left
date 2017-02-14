"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toucher = require("./Toucher"),
    doc = document,
    head = doc.head,
    body = doc.body;

/**
 * 获取元素集合
 * @param    {String}       el
 * @param    {HTMLElement}  context
 * @return   {Array.<HTMLDomElement>}
 */
function $(el) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : doc;

    return [].slice.call(context.querySelectorAll(el));
}

/**
 * 合并对象
 * @param    {Object}   obj1
 * @param    {Object}   obj2
 * @return   {Object}
 */
function merge(obj1, obj2) {
    for (var i in obj2) {
        obj1[i] = {}.toString.call(obj2[i]) === "[object Object]" ? merge({}, obj2[i]) : obj2[i];
    }
    return obj1;
}

/**
 * 创建style标签,元素添加相关样式
 * @param    {Array.<Object>}   cssObj
 */
function injectCss(cssObj) {
    var style = doc.createElement("style"),
        cur = void 0;
    style.type = "text/css";
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = cssObj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var css = _step.value;

            cur = css.selector + " " + JSON.stringify(css.rules).replace(/\"/g, "").replace(/\,/g, ";");
            css = doc.createTextNode(cur);
            style.appendChild(css);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    head.appendChild(style);
}

/**
 * 获取元素样式
 * @param    {HTMLElement}   el
 * @param    {String}        rule
 * @param    {Function}      ope
 */
function getStyle(el, rule, ope) {
    var res = void 0;
    if (el.currentStyle) {
        res = el.currentStyle[rule];
    } else {
        res = getComputedStyle(el).getPropertyValue(rule);
    }
    if (typeof ope === "function") {
        return ope(res);
    }
    return res;
}

/**
 * 获取后面的兄弟元素
 * @param    {HTMLElement}   el
 * @return   {Array.<HTMLElement>}
 */
function getNextSiblings(el) {
    var nextSibling = el.nextSibling,
        parentNode = el.parentNode,
        siblings = parentNode.getElementsByTagName("*");

    var res = [],
        index = -1;
    for (var i = 0, len = siblings.length; i < len; i++) {
        if (el.isEqualNode(siblings[i])) {
            index = i;
            //  最后一个
            if (index === len - 1) {
                return [];
            }
        }
        if (i > index && index !== -1) {
            res.push(siblings[i]);
        }
    }
    return res;
}

/**
 * 组件类
 */

var SwipeLeft = function () {

    /**
     * 构造器
     */
    function SwipeLeft() {
        _classCallCheck(this, SwipeLeft);

        this.defCfg = {
            menus: [{
                text: "menu1",
                css: {},
                classes: "",
                handler: function handler(e) {}
            }, {
                "text": "menu2",
                "css": {},
                classes: "",
                handler: function handler(e) {}
            }]
        };
    }

    /**
     * 初始化方法
     * @param    {String}           selctor
     * @param    {Array.<Object>}   cfg
     *                              @attribute  text
     *                              @attribute  css
     *                              @attribute  classes
     *                              @attribute  handler
     */


    _createClass(SwipeLeft, [{
        key: "init",
        value: function init(selctor, cfg) {
            var _rules,
                _this = this;

            var defCfg = this.defCfg;

            var cssObj = void 0,
                width = void 0,
                height = void 0,
                el = void 0,
                warpper = void 0,
                warpperId = void 0,
                cloneNode = void 0,
                parent = void 0,
                menu = void 0,
                menuId = void 0,
                siblings = void 0,
                menus = void 0,
                cssStr = void 0;

            cfg = merge(defCfg, cfg);

            this.elements = $(selctor);
            this.cfg = cfg;
            this.containerIds = [];
            this.menuIds = [];

            menus = cfg.menus;

            el = this.elements[0];
            parent = el.parentNode;

            width = getStyle(el, "width");
            height = getStyle(el, "height");

            cssObj = [{
                selector: ".swipe-left-wrapper",
                rules: {
                    width: width,
                    height: height,
                    position: "relative"
                }
            }, {
                selector: "" + selctor,
                rules: (_rules = {
                    position: "absolute",
                    left: 0,
                    top: 0
                }, _defineProperty(_rules, "left", 0), _defineProperty(_rules, "bottom", 0), _defineProperty(_rules, "z-index", 109), _defineProperty(_rules, "transition", "all 0.3s"), _defineProperty(_rules, "background-color", "#fff"), _rules)
            }, {
                selector: ".menu-item",
                rules: {
                    width: "40px",
                    height: height,
                    position: "absolute",
                    top: 0,
                    right: 0,
                    "line-height": height,
                    "z-index": 100,
                    "text-align": "center"
                }
            }];

            //  注入css
            injectCss(cssObj);

            this.elements.forEach(function (el, index) {
                warpper = doc.createElement("div");
                cloneNode = el.cloneNode(true);

                warpper.classList.add("swipe-left-wrapper");
                warpper.appendChild(cloneNode);
                warpperId = "swipe-wrapper-" + index;
                warpper.id = warpperId;

                cfg.menus.forEach(function (m, i) {
                    menu = doc.createElement("div");
                    if (Array.isArray(m.classes) && m.classes.indexOf("menu-item") === -1) {
                        m.classes = "menu-item " + m.classes.join(" ");
                    } else if (typeof m.classes === "string" && m.classes.indexOf("menu-item") === -1) {
                        m.classes = "menu-item " + m.classes;
                    }

                    menuId = "menu-" + Math.random().toString(16).slice(5, 11);
                    menu.setAttribute("class", m.classes);
                    menu.setAttribute("id", menuId);
                    menu.dataset.index = i;
                    cssStr = "";

                    for (var key in m.css) {
                        cssStr += key + ": " + m.css[key] + ";";
                    }

                    if (!m.css || typeof m.css.width === "undefined") {
                        cssStr += "width: 40px;";
                    }

                    menu.style.cssText = cssStr;
                    menu.innerHTML = m.text;
                    _this.menuIds.push(menuId);

                    warpper.appendChild(menu);
                });

                //  每一个menu设置相关right
                menus = $(".menu-item");
                menus.forEach(function (menu) {
                    siblings = getNextSiblings(menu);
                    width = 0;
                    if (siblings.length) {
                        cssStr = menu.style.cssText;
                        siblings.forEach(function (el) {
                            width = width + Number.parseFloat(el.style.width);
                        });
                        cssStr += "right: " + width + "px;";
                        menu.style.cssText = cssStr;
                    }
                });

                _this.containerIds.push(warpperId);
                parent.replaceChild(warpper, el);
            });

            //  绑定相关事件
            this.handleContainerSwipe();
            this.handleMenuTap();
        }

        /**
         * 父容器的swipe事件
         * @return   {[type]}   [description]
         */

    }, {
        key: "handleContainerSwipe",
        value: function handleContainerSwipe() {
            var containerIds = this.containerIds;

            var toucher = void 0,
                bar = void 0,
                nextMenus = void 0,
                css = void 0,
                width = void 0;
            containerIds.forEach(function (id) {
                toucher = Toucher("#" + id);
                toucher.off("swipeLeft");
                toucher.off("swipeRight");
                toucher.on("swipeLeft", function (e) {
                    bar = e.originalEvent.target;
                    if (!bar.classList.contains("menus")) {
                        bar = $(".menus", bar.parentNode);
                    }

                    nextMenus = $(".menu-item", bar.parentNode);

                    width = 0;
                    if (nextMenus.length) {
                        width = nextMenus.reduce(function (a, b) {
                            return getStyle(a, "width", Number.parseFloat) + getStyle(b, "width", Number.parseFloat);
                        });
                    }
                    css = "\n                    transform: translate3d(-" + width + "px, 0, 0);\n                    -webkit-transform: translate3d(-" + width + "px, 0, 0);\n                ";
                    $(".menu-open").forEach(function (el) {
                        el.classList.remove("menu-open");
                        el.style.cssText = "transform: translate3d(0, 0, 0); -webkit-transform: translate3d(0, 0, 0);";
                    });
                    bar.classList.add("menu-open");
                    bar.style.cssText = css;
                });
                toucher.on("swipeRight", function (e) {
                    bar.style.cssText = "transform: translate3d(0, 0, 0); -webkit-transform: translate3d(0, 0, 0);";
                });
            });
        }

        /**
         * 处理菜单的tap事件
         */

    }, {
        key: "handleMenuTap",
        value: function handleMenuTap() {
            var menuIds = this.menuIds,
                cfg = this.cfg;

            var toucher = void 0,
                finalCfg = void 0;
            menuIds.forEach(function (id) {
                toucher = Toucher("#" + id);
                toucher.off("singleTap");
                toucher.on("singleTap", function (e) {
                    finalCfg = cfg.menus[e.originalEvent.target.dataset.index];
                    if (typeof finalCfg.handler === "function") {
                        finalCfg.handler(e);
                    }
                    $(".menu-open").forEach(function (el) {
                        el.classList.remove("menu-open");
                        el.style.cssText = "transform: translate3d(0, 0, 0); -webkit-transform: translate3d(0, 0, 0);";
                    });
                    if (typeof e.originalEvent.stopPropagation === "function") {
                        e.originalEvent.stopPropagation();
                    } else {
                        e.originalEvent.cancelBubble = true;
                    }
                    e.originalEvent.preventDefault();
                });
            });
        }
    }]);

    return SwipeLeft;
}();

exports.default = SwipeLeft;