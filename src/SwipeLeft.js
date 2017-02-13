const Toucher = require("./Toucher"),
    doc = document,
    head = doc.head,
    body = doc.body;

/**
 * 获取元素集合
 * @param    {String}       el
 * @param    {HTMLElement}  context
 * @return   {Array.<HTMLDomElement>}
 */
function $(el, context = doc) {
    return [].slice.call(context.querySelectorAll(el));
}

/**
 * 合并对象
 * @param    {Object}   obj1
 * @param    {Object}   obj2
 * @return   {Object}
 */
function merge(obj1, obj2) {
    for (let i in obj2) {
        obj1[i] = {}.toString.call(obj2[i]) === "[object Object]" ? merge({}, obj2[i]) : obj2[i];
    }
    return obj1;
}

/**
 * 创建style标签,元素添加相关样式
 * @param    {Array.<Object>}   cssObj
 */
function injectCss(cssObj) {
    let style = doc.createElement("style"),
        cur;
    style.type = "text/css";
    for (let css of cssObj) {
        cur = `${css.selector} ${JSON.stringify(css.rules).replace(/\"/g, "").replace(/\,/g, ";")}`;
        css = doc.createTextNode(cur);
        style.appendChild(css);
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
    let res;
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
    const { nextSibling, parentNode } = el,
    siblings = parentNode.getElementsByTagName("*");
    let res = [],
        index = -1;
    for (let i = 0, len = siblings.length; i < len; i++) {
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
export default class SwipeLeft {

    /**
     * 构造器
     */
    constructor() {
        this.defCfg = {
            menus: [{
                text: "menu1",
                css: {},
                classes: "",
                handler: (e) => {}
            }, {
                "text": "menu2",
                "css": {},
                classes: "",
                handler: (e) => {}
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
    init(selctor, cfg) {
        const { defCfg } = this;
        let cssObj, width, height, el, warpper, warpperId, cloneNode, parent, menu, menuId, siblings, menus, cssStr;

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
            selector: `${selctor}`,
            rules: {
                position: "absolute",
                left: 0,
                top: 0,
                left: 0,
                bottom: 0,
                "z-index": 109,
                transition: "all 0.3s",
                "background-color": "#fff"
            }
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

        this.elements.forEach((el, index) => {
            warpper = doc.createElement("div");
            cloneNode = el.cloneNode(true);

            warpper.classList.add("swipe-left-wrapper");
            warpper.appendChild(cloneNode);
            warpperId = `swipe-wrapper-${index}`;
            warpper.id = warpperId;

            cfg.menus.forEach((m, i) => {
                menu = doc.createElement("div");
                if (Array.isArray(m.classes) && m.classes.indexOf("menu-item") === -1) {
                    m.classes = `menu-item ${m.classes.join(" ")}`;
                } else if (typeof m.classes === "string" && m.classes.indexOf("menu-item") === -1) {
                    m.classes = `menu-item ${m.classes}`;
                }

                menuId = `menu-${Math.random().toString(16).slice(5, 11)}`;
                menu.setAttribute("class", m.classes);
                menu.setAttribute("id", menuId);
                menu.dataset.index = i;
                cssStr = "";

                for (let key in m.css) {
                    cssStr += `${key}: ${m.css[key]};`;
                }

                if (!m.css || typeof(m.css.width) === "undefined") {
                    cssStr += `width: 40px;`;
                }

                menu.style.cssText = cssStr;
                menu.innerHTML = m.text;
                this.menuIds.push(menuId);

                warpper.appendChild(menu);
            });

            //  每一个menu设置相关right
            menus = $(".menu-item");
            menus.forEach((menu) => {
                siblings = getNextSiblings(menu);
                width = 0;
                if (siblings.length) {
                    cssStr = menu.style.cssText;
                    siblings.forEach((el) => {
                        width = width + Number.parseFloat(el.style.width);
                    });
                    cssStr += `right: ${width}px;`;
                    menu.style.cssText = cssStr;
                }
            });

            this.containerIds.push(warpperId);
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
    handleContainerSwipe() {
        const { containerIds } = this;
        let toucher, bar, nextMenus, css, width;
        containerIds.forEach((id) => {
            toucher = Toucher(`#${id}`);
            toucher.off("swipeLeft");
            toucher.off("swipeRight");
            toucher.on("swipeLeft", (e) => {
                bar = e.originalEvent.target;
                if (!(bar.classList.contains("menus"))) {
                    bar = $(".menus", bar.parentNode);
                }

                nextMenus = $(".menu-item", bar.parentNode);

                width = 0;
                if (nextMenus.length) {
                    width = nextMenus.reduce((a, b) => {
                        return getStyle(a, "width", Number.parseFloat) + getStyle(b, "width", Number.parseFloat);
                    });
                }
                css = `
                    transform: translate3d(-${width}px, 0, 0);
                    -webkit-transform: translate3d(-${width}px, 0, 0);
                `;
                $(".menu-open").forEach((el) => {
                    el.classList.remove("menu-open");
                    el.style.cssText = "transform: translate3d(0, 0, 0); -webkit-transform: translate3d(0, 0, 0);";
                });
                bar.classList.add("menu-open");
                bar.style.cssText = css;
            });
            toucher.on("swipeRight", (e) => {
                bar.style.cssText = "transform: translate3d(0, 0, 0); -webkit-transform: translate3d(0, 0, 0);";
            });
        });
    }

    /**
     * 处理菜单的tap事件
     */
    handleMenuTap() {
        const { menuIds, cfg } = this;
        let toucher, finalCfg;
        menuIds.forEach((id) => {
            toucher = Toucher(`#${id}`);
            toucher.off("singleTap");
            toucher.on("singleTap", (e) => {
                finalCfg = cfg.menus[e.originalEvent.target.dataset.index];
                if (typeof finalCfg.handler === "function") {
                    finalCfg.handler(e);
                }
                $(".menu-open").forEach((el) => {
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

}
