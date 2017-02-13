/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _SwipeLeft = __webpack_require__(1);

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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _parseFloat = __webpack_require__(21);

	var _parseFloat2 = _interopRequireDefault(_parseFloat);

	var _defineProperty2 = __webpack_require__(2);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(29);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _stringify = __webpack_require__(30);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _getIterator2 = __webpack_require__(32);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Toucher = __webpack_require__(69),
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
	        for (var _iterator = (0, _getIterator3.default)(cssObj), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var css = _step.value;

	            cur = css.selector + " " + (0, _stringify2.default)(css.rules).replace(/\"/g, "").replace(/\,/g, ";");
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
	        (0, _classCallCheck3.default)(this, SwipeLeft);

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


	    (0, _createClass3.default)(SwipeLeft, [{
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
	                }, (0, _defineProperty3.default)(_rules, "left", 0), (0, _defineProperty3.default)(_rules, "bottom", 0), (0, _defineProperty3.default)(_rules, "z-index", 109), (0, _defineProperty3.default)(_rules, "transition", "all 0.3s"), (0, _defineProperty3.default)(_rules, "background-color", "#fff"), _rules)
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
	                            width = width + (0, _parseFloat2.default)(el.style.width);
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
	                            return getStyle(a, "width", _parseFloat2.default) + getStyle(b, "width", _parseFloat2.default);
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(3);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	var $Object = __webpack_require__(8).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(16), 'Object', {defineProperty: __webpack_require__(12).f});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(8)
	  , ctx       = __webpack_require__(9)
	  , hide      = __webpack_require__(11)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(10);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(12)
	  , createDesc = __webpack_require__(20);
	module.exports = __webpack_require__(16) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(13)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , toPrimitive    = __webpack_require__(19)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(16) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(16) && !__webpack_require__(17)(function(){
	  return Object.defineProperty(__webpack_require__(18)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14)
	  , document = __webpack_require__(7).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(14);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(22), __esModule: true };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(23);
	module.exports = parseFloat;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var $export     = __webpack_require__(6)
	  , $parseFloat = __webpack_require__(24);
	// 20.1.2.12 Number.parseFloat(string)
	$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var $parseFloat = __webpack_require__(7).parseFloat
	  , $trim       = __webpack_require__(25).trim;

	module.exports = 1 / $parseFloat(__webpack_require__(27) + '-0') !== -Infinity ? function parseFloat(str){
	  var string = $trim(String(str), 3)
	    , result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6)
	  , defined = __webpack_require__(26)
	  , fails   = __webpack_require__(17)
	  , spaces  = __webpack_require__(27)
	  , space   = '[' + spaces + ']'
	  , non     = '\u200b\u0085'
	  , ltrim   = RegExp('^' + space + space + '*')
	  , rtrim   = RegExp(space + space + '*$');

	var exporter = function(KEY, exec, ALIAS){
	  var exp   = {};
	  var FORCE = fails(function(){
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if(ALIAS)exp[ALIAS] = fn;
	  $export($export.P + $export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function(string, TYPE){
	  string = String(defined(string));
	  if(TYPE & 1)string = string.replace(ltrim, '');
	  if(TYPE & 2)string = string.replace(rtrim, '');
	  return string;
	};

	module.exports = exporter;

/***/ },
/* 26 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(3);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(31), __esModule: true };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(8)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(33), __esModule: true };

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(34);
	__webpack_require__(64);
	module.exports = __webpack_require__(66);

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(35);
	var global        = __webpack_require__(7)
	  , hide          = __webpack_require__(11)
	  , Iterators     = __webpack_require__(38)
	  , TO_STRING_TAG = __webpack_require__(61)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(36)
	  , step             = __webpack_require__(37)
	  , Iterators        = __webpack_require__(38)
	  , toIObject        = __webpack_require__(39);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(42)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(40)
	  , defined = __webpack_require__(26);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(41);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(43)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(44)
	  , hide           = __webpack_require__(11)
	  , has            = __webpack_require__(45)
	  , Iterators      = __webpack_require__(38)
	  , $iterCreate    = __webpack_require__(46)
	  , setToStringTag = __webpack_require__(60)
	  , getPrototypeOf = __webpack_require__(62)
	  , ITERATOR       = __webpack_require__(61)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11);

/***/ },
/* 45 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(47)
	  , descriptor     = __webpack_require__(20)
	  , setToStringTag = __webpack_require__(60)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(11)(IteratorPrototype, __webpack_require__(61)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(13)
	  , dPs         = __webpack_require__(48)
	  , enumBugKeys = __webpack_require__(58)
	  , IE_PROTO    = __webpack_require__(55)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(18)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(59).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(12)
	  , anObject = __webpack_require__(13)
	  , getKeys  = __webpack_require__(49);

	module.exports = __webpack_require__(16) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(50)
	  , enumBugKeys = __webpack_require__(58);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(45)
	  , toIObject    = __webpack_require__(39)
	  , arrayIndexOf = __webpack_require__(51)(false)
	  , IE_PROTO     = __webpack_require__(55)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(39)
	  , toLength  = __webpack_require__(52)
	  , toIndex   = __webpack_require__(54);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(53)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(53)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(56)('keys')
	  , uid    = __webpack_require__(57);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 57 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 58 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7).document && document.documentElement;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(12).f
	  , has = __webpack_require__(45)
	  , TAG = __webpack_require__(61)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(56)('wks')
	  , uid        = __webpack_require__(57)
	  , Symbol     = __webpack_require__(7).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(45)
	  , toObject    = __webpack_require__(63)
	  , IE_PROTO    = __webpack_require__(55)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(26);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(65)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(42)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(53)
	  , defined   = __webpack_require__(26);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(13)
	  , get      = __webpack_require__(67);
	module.exports = __webpack_require__(8).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(68)
	  , ITERATOR  = __webpack_require__(61)('iterator')
	  , Iterators = __webpack_require__(38);
	module.exports = __webpack_require__(8).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(41)
	  , TAG = __webpack_require__(61)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Toucher
	 * build by rwson @8/15/16
	 * mail:rw_Song@sina.com
	 */

	"use strict";

	var _stringify = __webpack_require__(30);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _typeof2 = __webpack_require__(70);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return factory(root);
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        root.Toucher = factory(root);
	    }
	})(window, function (root, undefined) {

	    if (!"ontouchstart" in window) {
	        return;
	    }

	    var _wrapped;

	    //  获取对象上的类名
	    function _typeOf(obj) {
	        return Object.prototype.toString.call(obj).toLowerCase().slice(8, -1);
	    }

	    //  获取当前时间戳
	    function getTimeStr() {
	        return +new Date();
	    }

	    //  获取位置信息
	    function getPosInfo(ev) {
	        var _touches = ev.touches;
	        if (!_touches || _touches.length === 0) {
	            return;
	        }
	        return {
	            pageX: ev.touches[0].pageX,
	            pageY: ev.touches[0].pageY,
	            clientX: ev.touches[0].clientX || 0,
	            clientY: ev.touches[0].clientY || 0
	        };
	    }

	    //  绑定事件
	    function bindEv(el, type, fn) {
	        if (el.addEventListener) {
	            el.addEventListener(type, fn, {
	                capture: false,
	                passive: false,
	                once: false
	            });
	        } else {
	            el["on" + type] = fn;
	        }
	    }

	    //  解绑事件
	    function unBindEv(el, type, fn) {
	        if (el.removeEventListener) {
	            el.removeEventListener(type, fn, false);
	        } else {
	            el["on" + type] = fn;
	        }
	    }

	    //  获得滑动方向
	    function getDirection(startX, startY, endX, endY) {
	        var xRes = startX - endX;
	        var xResAbs = Math.abs(startX - endX);
	        var yRes = startY - endY;
	        var yResAbs = Math.abs(startY - endY);
	        var direction = "";

	        if (xResAbs >= yResAbs && xResAbs > 25) {
	            direction = xRes > 0 ? "Right" : "Left";
	        } else if (yResAbs > xResAbs && yResAbs > 25) {
	            direction = yRes > 0 ? "Down" : "Up";
	        }
	        return direction;
	    }

	    //  取得两点之间直线距离
	    function getDistance(startX, startY, endX, endY) {
	        return Math.sqrt(Math.pow(startX - endX, 2) + Math.pow(startY - endY, 2));
	    }

	    function getLength(pos) {
	        return Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2));
	    }

	    function cross(v1, v2) {
	        return v1.x * v2.y - v2.x * v1.y;
	    }

	    //  取向量
	    function getVector(startX, startY, endX, endY) {
	        return startX * endX + startY * endY;
	    }

	    //  获取角度
	    function getAngle(v1, v2) {
	        var mr = getLength(v1) * getLength(v2);
	        if (mr === 0) {
	            return 0;
	        }
	        ;
	        var r = getVector(v1.x, v1.y, v2.x, v2.y) / mr;
	        if (r > 1) {
	            r = 1;
	        }
	        return Math.acos(r);
	    }

	    //  获取旋转的角度
	    function getRotateAngle(v1, v2) {
	        var angle = getAngle(v1, v2);
	        if (cross(v1, v2) > 0) {
	            angle *= -1;
	        }
	        return angle * 180 / Math.PI;
	    }

	    //  包装一个新的事件对象
	    function wrapEvent(ev, obj) {
	        var res = {
	            touches: ev.touches,
	            type: ev.type
	        };
	        if (_typeOf(obj) === "object") {
	            for (var i in obj) {
	                res[i] = obj[i];
	            }
	        }
	        return res;
	    }

	    //  把伪数组转换成数组
	    function toArray(list) {
	        if (list && (typeof list === "undefined" ? "undefined" : (0, _typeof3.default)(list)) === "object" && isFinite(list.length) && list.length >= 0 && list.length === Math.floor(list.length) && list.length < 4294967296) {
	            return [].slice.call(list);
	        }
	    }

	    //  判断一个元素列表里面是否有多个元素
	    function isContain(collection, el) {
	        if (arguments.length === 2) {
	            return collection.some(function (elItem) {
	                return el.isEqualNode(elItem);
	            });
	        }
	        return false;
	    }

	    //  生成一个随机id
	    function uId() {
	        return Math.random().toString(16).slice(2);
	    }

	    //  事件模块
	    var Event = function () {

	        var storeEvents = {};

	        return {

	            //  add an event handle
	            add: function add(type, el, handler) {
	                var selector = el,
	                    len = arguments.length,
	                    finalObject = {},
	                    _type;
	                /**
	                 * Event.add("swipe", function() {
	                 *      //  ...
	                 * });
	                 */

	                if (_typeOf(el) === "string") {
	                    el = document.querySelectorAll(el);
	                }

	                if (len === 2 && _typeOf(el) === "function") {
	                    finalObject = {
	                        handler: el
	                    };
	                } else if (len === 3 && el instanceof HTMLElement || el instanceof NodeList && _typeOf(handler) === "function") {
	                    /**
	                     * Event.add("swipe", "#div", function(ev) {
	                     *      //  ...
	                     * });
	                     */
	                    _type = _typeOf(el);
	                    finalObject = {
	                        type: _type,
	                        selector: selector,
	                        el: _type === "nodelist" ? toArray(el) : el,
	                        handler: handler
	                    };
	                }

	                if (!storeEvents[type]) {
	                    storeEvents[type] = [];
	                }

	                storeEvents[type].push(finalObject);
	            },

	            //  remove an event handle
	            remove: function remove(type, selector) {
	                var len = arguments.length;
	                if (_typeOf(type) === "string" && _typeOf(storeEvents[type]) === "array" && storeEvents[type].length) {
	                    if (len === 1) {
	                        storeEvents[type] = [];
	                    } else if (len === 2) {
	                        storeEvents[type] = storeEvents[type].filter(function (item) {
	                            return !(item.selector === selector || _typeOf(selector) !== "string" && item.selector.isEqualNode(selector));
	                        });
	                    }
	                }
	            },

	            //  trigger an event handle
	            trigger: function trigger(type, el, argument) {
	                var len = arguments.length;

	                /**
	                 * Event.trigger("swipe", document.querySelector("#div"), {
	                 *      //  ...
	                 * });
	                 */
	                if (len === 3 && _typeOf(storeEvents[type]) === "array" && storeEvents[type].length) {
	                    storeEvents[type].forEach(function (item) {
	                        if (_typeOf(item.handler) === "function") {
	                            if (item.type && item.el) {
	                                argument.target = el;
	                                if (item.type === "nodelist" && isContain(item.el, el)) {
	                                    item.handler(argument);
	                                } else if (item.el.isEqualNode && item.el.isEqualNode(el)) {
	                                    item.handler(argument);
	                                }
	                            } else {
	                                item.handler(argument);
	                            }
	                        }
	                    });
	                }
	            }
	        };
	    }();

	    //  构造函数
	    function Toucher(selector) {
	        return new Toucher.fn.init(selector);
	    }

	    Toucher.fn = Toucher.prototype = {

	        //  修改原型构造器
	        constructor: Toucher,

	        //  初始化方法
	        init: function init(selector) {
	            this.el = selector instanceof HTMLElement ? selector : _typeOf(selector) === "string" ? document.querySelector(selector) : null;
	            if (_typeOf(this.el) === "null") {
	                throw new Error("you must specify a particular selector or a particular DOM object");
	            }
	            this.scale = 1;
	            this.pinchStartLen = null;
	            this.isDoubleTap = false;
	            this.triggedSwipeStart = false;
	            this.triggedLongTap = false;
	            this.delta = null;
	            this.last = null;
	            this.now = null;
	            this.tapTimeout = null;
	            this.singleTapTimeout = null;
	            this.longTapTimeout = null;
	            this.swipeTimeout = null;
	            this.startPos = {};
	            this.endPos = {};
	            this.preTapPosition = {};

	            this.cfg = {
	                doubleTapTime: 400,
	                longTapTime: 700
	            };

	            //  绑定4个事件
	            bindEv(this.el, "touchstart", this._start.bind(this));
	            bindEv(this.el, "touchmove", this._move.bind(this));
	            bindEv(this.el, "touchcancel", this._cancel.bind(this));
	            bindEv(this.el, "touchend", this._end.bind(this));
	            return this;
	        },

	        //  提供config方法进行配置
	        config: function config(option) {
	            if (_typeOf(option) !== "object") {
	                throw new Error("method Toucher.config must pass in an anguments which is an instance of Object, but passed in " + option.toString());
	            }
	            for (var i in option) {
	                this.cfg[i] = option[i];
	            }
	            return this;
	        },

	        //  on方法绑定事件
	        /**
	         * var toucher = Toucher({...});
	         *
	         * toucher.on("swipe", function(ev) {
	         *     //   ...
	         * });
	         *
	         * //   or
	         *
	         * toucher.on("tap", "#id", function(ev) {
	         *     //   ...
	         * });
	         *
	         * support events: singleTap,longTap,swipe,swipeStart,swipeEnd,swipeUp,swipeRight,swipeDown,swipeLeft,pinch,rotate
	         *
	         */

	        on: function on(type, el, callback) {
	            var len = arguments.length;
	            if (len === 2) {
	                Event.add(type, el);
	            } else {
	                Event.add(type, el, callback);
	            }
	            return this;
	        },

	        //  off 解除绑定
	        /**
	         *  var toucher = Toucher({...});
	         *  toucher.off(type);
	         *
	         *  //  or
	         *
	         *  toucher.off(type, selector);
	         */
	        off: function off(type, selector) {
	            Event.remove(type, selector);
	            return this;
	        },

	        //  手指刚触碰到屏幕
	        _start: function _start(ev) {
	            if (!ev.touches || ev.touches.length === 0) {
	                return;
	            }

	            var self = this;
	            var otherToucher,
	                v,
	                preV = this.preV,
	                target = ev.target;

	            self.now = getTimeStr();
	            self.startPos = getPosInfo(ev);
	            self.delta = self.now - (self.last || self.now);
	            self.triggedSwipeStart = false;
	            self.triggedLongTap = false;

	            //  快速双击
	            if ((0, _stringify2.default)(self.preTapPosition).length > 2 && self.delta < self.cfg.doubleTapTime && getDistance(self.preTapPosition.clientX, self.preTapPosition.clientY, self.startPos.clientX, self.startPos.clientY) < 25) {
	                self.isDoubleTap = true;
	            }

	            //  长按定时
	            self.longTapTimeout = setTimeout(function () {
	                _wrapped = {
	                    el: self.el,
	                    type: "longTap",
	                    timeStr: getTimeStr(),
	                    position: self.startPos,
	                    originalEvent: ev
	                };
	                Event.trigger("longTap", target, _wrapped);
	                self.triggedLongTap = true;
	            }, self.cfg.longTapTime);

	            //  多个手指放到屏幕
	            if (ev.touches.length > 1) {
	                self._cancelLongTap();
	                otherToucher = ev.touches[1];
	                v = {
	                    x: otherToucher.pageX - self.startPos.pageX,
	                    y: otherToucher.pageY - self.startPos.pageY
	                };
	                this.preV = v;
	                self.pinchStartLen = getLength(v);
	                self.isDoubleTap = false;
	            }

	            self.last = self.now;
	            self.preTapPosition = self.startPos;

	            ev.stopPropagation();
	        },

	        //  手指在屏幕上移动
	        _move: function _move(ev) {
	            if (!ev.touches || ev.touches.length === 0) {
	                return;
	            }

	            var v, otherToucher;
	            var self = this;
	            var len = ev.touches.length;
	            var posNow = getPosInfo(ev);
	            var preV = self.preV;
	            var currentX = posNow.pageX;
	            var currentY = posNow.pageY;
	            var target = ev.target;

	            //  手指移动取消长按事件和双击
	            self._cancelLongTap();
	            self.isDoubleTap = false;

	            //  一次按下抬起只触发一次swipeStart
	            if (!self.triggedSwipeStart) {
	                _wrapped = {
	                    el: self.el,
	                    type: "swipeStart",
	                    timeStr: getTimeStr(),
	                    position: posNow,
	                    originalEvent: ev
	                };
	                Event.trigger("swipeStart", target, _wrapped);
	                self.triggedSwipeStart = true;
	            } else {
	                _wrapped = {
	                    el: self.el,
	                    type: "swipe",
	                    timeStr: getTimeStr(),
	                    position: posNow,
	                    originalEvent: ev
	                };
	                Event.trigger("swipe", target, _wrapped);
	            }

	            if (len > 1) {
	                otherToucher = ev.touches[1];
	                v = {
	                    x: otherToucher.pageX - currentX,
	                    y: otherToucher.pageY - currentY
	                };

	                //  缩放
	                _wrapped = wrapEvent(ev, {
	                    el: self.el,
	                    type: "pinch",
	                    scale: getLength(v) / this.pinchStartLen,
	                    timeStr: getTimeStr(),
	                    position: posNow,
	                    originalEvent: ev
	                });
	                Event.trigger("pinch", target, _wrapped);

	                //  旋转
	                _wrapped = wrapEvent(ev, {
	                    el: self.el,
	                    type: "rotate",
	                    angle: getRotateAngle(v, preV),
	                    timeStr: getTimeStr(),
	                    position: posNow,
	                    originalEvent: ev
	                });
	                Event.trigger("rotate", target, _wrapped);
	                ev.preventDefault();
	            }

	            self.endPos = posNow;

	            ev.stopPropagation();
	        },

	        //  触碰取消
	        _cancel: function _cancel(ev) {
	            clearTimeout(this.longTapTimeout);
	            clearTimeout(this.tapTimeout);
	            clearTimeout(this.swipeTimeout);
	            clearTimeout(self.singleTapTimeout);

	            ev.stopPropagation();
	        },

	        //  手指从屏幕离开
	        _end: function _end(ev) {
	            if (!ev.changedTouches) {
	                return;
	            }

	            //  取消长按
	            this._cancelLongTap();

	            var self = this;
	            var direction = getDirection(self.endPos.clientX, self.endPos.clientY, self.startPos.clientX, self.startPos.clientY);
	            var callback,
	                target = ev.target;

	            if (direction !== "") {
	                self.swipeTimeout = setTimeout(function () {
	                    _wrapped = wrapEvent(ev, {
	                        el: self.el,
	                        type: "swipe",
	                        timeStr: getTimeStr(),
	                        position: self.endPos,
	                        originalEvent: ev
	                    });
	                    Event.trigger("swipe", target, _wrapped);

	                    //  获取具体的swipeXyz方向
	                    callback = self["swipe" + direction];
	                    _wrapped = wrapEvent(ev, {
	                        el: self.el,
	                        type: "swipe" + direction,
	                        timeStr: getTimeStr(),
	                        position: self.endPos,
	                        originalEvent: ev
	                    });
	                    Event.trigger("swipe" + direction, target, _wrapped);

	                    _wrapped = wrapEvent(ev, {
	                        el: self.el,
	                        type: "swipeEnd",
	                        timeStr: getTimeStr(),
	                        position: self.endPos,
	                        originalEvent: ev
	                    });
	                    Event.trigger("swipeEnd", target, _wrapped);
	                }, 0);
	            } else if (!self.triggedLongTap) {
	                self.tapTimeout = setTimeout(function () {
	                    if (self.isDoubleTap) {
	                        _wrapped = wrapEvent(ev, {
	                            el: self.el,
	                            type: "doubleTap",
	                            timeStr: getTimeStr(),
	                            position: self.startPos,
	                            originalEvent: ev
	                        });
	                        Event.trigger("doubleTap", target, _wrapped);
	                        clearTimeout(self.singleTapTimeout);
	                        self.isDoubleTap = false;
	                    } else {
	                        self.singleTapTimeout = setTimeout(function () {
	                            _wrapped = wrapEvent(ev, {
	                                el: self.el,
	                                type: "singleTap",
	                                timeStr: getTimeStr(),
	                                position: self.startPos,
	                                originalEvent: ev
	                            });
	                            Event.trigger("singleTap", target, _wrapped);
	                        }, 100);
	                    }
	                }, 0);
	            }

	            this.startPos = {};
	            this.endPos = {};

	            ev.stopPropagation();
	        },

	        //  取消长按定时器
	        _cancelLongTap: function _cancelLongTap() {
	            if (_typeOf(this.longTapTimeout) !== "null") {
	                clearTimeout(this.longTapTimeout);
	            }
	        }
	    };

	    Toucher.fn.init.prototype = Toucher.fn;

	    return Toucher;
	});

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(71);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(74);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(72), __esModule: true };

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	__webpack_require__(34);
	module.exports = __webpack_require__(73).f('iterator');

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(61);

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(76);
	__webpack_require__(87);
	__webpack_require__(88);
	__webpack_require__(89);
	module.exports = __webpack_require__(8).Symbol;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(7)
	  , has            = __webpack_require__(45)
	  , DESCRIPTORS    = __webpack_require__(16)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(44)
	  , META           = __webpack_require__(77).KEY
	  , $fails         = __webpack_require__(17)
	  , shared         = __webpack_require__(56)
	  , setToStringTag = __webpack_require__(60)
	  , uid            = __webpack_require__(57)
	  , wks            = __webpack_require__(61)
	  , wksExt         = __webpack_require__(73)
	  , wksDefine      = __webpack_require__(78)
	  , keyOf          = __webpack_require__(79)
	  , enumKeys       = __webpack_require__(80)
	  , isArray        = __webpack_require__(83)
	  , anObject       = __webpack_require__(13)
	  , toIObject      = __webpack_require__(39)
	  , toPrimitive    = __webpack_require__(19)
	  , createDesc     = __webpack_require__(20)
	  , _create        = __webpack_require__(47)
	  , gOPNExt        = __webpack_require__(84)
	  , $GOPD          = __webpack_require__(86)
	  , $DP            = __webpack_require__(12)
	  , $keys          = __webpack_require__(49)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(85).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(82).f  = $propertyIsEnumerable;
	  __webpack_require__(81).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(43)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(57)('meta')
	  , isObject = __webpack_require__(14)
	  , has      = __webpack_require__(45)
	  , setDesc  = __webpack_require__(12).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(17)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(7)
	  , core           = __webpack_require__(8)
	  , LIBRARY        = __webpack_require__(43)
	  , wksExt         = __webpack_require__(73)
	  , defineProperty = __webpack_require__(12).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(49)
	  , toIObject = __webpack_require__(39);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(49)
	  , gOPS    = __webpack_require__(81)
	  , pIE     = __webpack_require__(82);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 81 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 82 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(41);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(39)
	  , gOPN      = __webpack_require__(85).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(50)
	  , hiddenKeys = __webpack_require__(58).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(82)
	  , createDesc     = __webpack_require__(20)
	  , toIObject      = __webpack_require__(39)
	  , toPrimitive    = __webpack_require__(19)
	  , has            = __webpack_require__(45)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(16) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 87 */
/***/ function(module, exports) {

	

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(78)('asyncIterator');

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(78)('observable');

/***/ }
/******/ ]);