/* ~/Scripts/Fivemin.lib.js */

if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }
if (typeof (FIVEMIN.LIB) == "undefined") {
    FIVEMIN.LIB = (function () {
        /* Built with DEVIGN js fw, extended by Eli Sklar and Dylan Kennet */
        FIVEMIN.LIB = function () {
            var af = function () { }; // Anonymous function that does nothing

            function $() { return $.getById.apply(this, arguments); }

            $.extend = function (destination, source) {
                for (var key in (source || {})) {
                    destination[key] = source[key];
                }
                return destination;
            };

            var _docForRestore;

            $.extend($, {
                // elements
                document: document,
                // elements
                getById: function (id, doc) {
                    return id ? id.nodeName ? id : (doc || document).getElementById(id) : null;
                },
                create: function (tag, props, doc) {
                    var el = (doc || $.document || document).createElement(tag);
                    if (props) { $.alter(el, props); }
                    return el;
                },
                setDocument: function (doc) {
                    //$.log("set document = ", doc);
                    _docForRestore = $.document || document; $.document = doc;
                },
                restoreDocument: function () { $.document = _docForRestore; _docForRestore = null; },
                alter: function (el, props) {
                    if (!props) { return; }
                    if (props.styles) {
                        $.css(el, props.styles);
                        delete props.styles;
                    }
                    if (props.events) {
                        $.each(props.events, function (handler, name) { $.addEvent(el, name, handler); });
                        delete props.events;
                    }
                    if (props.children) {
                        $.each(props.children, function (child) { el.appendChild(child); });
                        delete props.children;
                    }
                    var parent = props.parent;
                    delete props.parent;

                    $.extend(el, props);

                    if (parent) { parent.appendChild(el); }

                    return el;
                },
                // ----------------------------------------------------------
                // If you're not in IE (or IE version is less than 5) then:
                //     ie === undefined
                // If you're in IE (>5) then you can determine which version:
                //     ie === 7; // IE7
                // Thus, to detect IE:
                //     if (ie) {}
                // And to detect the version:
                //     ie === 6 // IE6
                //     ie> 7 // IE8, IE9 ...
                //     ie <9 // Anything less than IE9
                // ----------------------------------------------------------
                ie: (function () {
                    var rv = null; // Return value assumes failure.
                    if (navigator.appName == 'Microsoft Internet Explorer') {
                        rv = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent);
                        if (rv[1] != null) rv = parseFloat(rv[1]);
                        else rv = null;
                    }
                    return rv;
                } ()),


                /**
                * Remove an element (backward compatibility)
                * @param el
                */
                removeNode: function (el) {
                    if (el.parentNode) { el.parentNode.removeChild(el); }
                },

                destroyElement: function (el) {
                    if (el.hasChildNodes()) {
                        while (el.childNodes.length >= 1) {
                            el.removeChild(cell.firstChild);
                        }
                    }
                },

                getElement: function (selector, ctx) {
                    return $.getElements(selector, ctx)[0];
                },
                getElements: function (selector, ctx) {
                    if (!ctx) { ctx = $.document; }

                    var result = [];

                    if (selector.indexOf(".") > -1) {
                        for (
						var split = selector.split("."),
							re = new RegExp("\\b" + split[1] + "\\b"),
							list = ctx.getElementsByTagName(split[0] || "*"),
							length = list.length,
							i = 0,
							j = 0,
							node;
						i < length;
						++i
					) {
                            node = list[i];
                            if (re.test(node.className)) {
                                result[j++] = node;
                            }
                        }
                    }
                    else { result = $.toArray(ctx.getElementsByTagName(selector)); }

                    return result;
                },

                hasChild: function (parent, el) {
                    if ($.browser.features.xpath == false) { return $.indexOf($.toArray(parent.getElementsByTagName(el.tagName)), el) > -1; }
                    return parent.contains ? parent != el && parent.contains(el) : !!(parent.compareDocumentPosition(el) & 16);
                },

                /**
                * Attach an event to an element
                * Params:
                *
                * @see window.addEventListener
                * @param Element
                * @param Event
                * @param Callback
                * 
                */
                addEvent: function (el, name, fn) {
                    var eventFunc;
                    if (name == "mouseenter") {
                        name = "mouseover";
                        eventFunc = function (event) {
                            var related = event.relatedTarget;
                            var fireEvent = false;
                            if (related == undefined) fireEvent = true;
                            else if (related === false) fireEvent = false;
                            else fireEvent = (typeof (this) != 'document' && related != this && related.prefix != 'xul' && !$.hasChild(this, related));
                            if (fireEvent) fn(event);
                            return fireEvent;
                        };
                    }
                    else if (name == "mouseleave") {
                        name = "mouseout";
                        eventFunc = function (event) {
                            var related = event.relatedTarget;
                            var fireEvent = false;
                            if (related == undefined) fireEvent = true;
                            else if (related === false) fireEvent = false;
                            else fireEvent = (typeof (this) != 'document' && related != this && related.prefix != 'xul' && !$.hasChild(this, related));
                            if (fireEvent) fn(event);
                            return fireEvent;
                        };
                    } else eventFunc = fn;
                    document.attachEvent ? el.attachEvent("on" + name, eventFunc) : el.addEventListener(name, eventFunc, false);
                },
                removeEvent: function (el, name, fn) {
                    var eventFunc;
                    if (name == "mouseenter") {
                        name = "mouseover";
                        eventFunc = function (event) {
                            var related = event.relatedTarget;
                            var fireEvent = false;
                            if (related == undefined) fireEvent = true;
                            else if (related === false) fireEvent = false;
                            else fireEvent = (typeof (this) != 'document' && related != this && related.prefix != 'xul' && !$.hasChild(this, related));
                            if (fireEvent) fn();
                            return fireEvent;
                        };
                    }
                    else if (name == "mouseleave") {
                        name = "mouseout";
                        eventFunc = function (event) {
                            var related = event.relatedTarget;
                            var fireEvent = false;
                            if (related == undefined) fireEvent = true;
                            else if (related === false) fireEvent = false;
                            else fireEvent = (typeof (this) != 'document' && related != this && related.prefix != 'xul' && !$.hasChild(this, related));
                            if (fireEvent) fn();
                            return fireEvent;
                        };
                    }
                    else eventFunc = fn;
                    document.detachEvent ? el.detachEvent("on" + name, eventFunc) : el.removeEventListener(name, eventFunc, false);
                },

                stopEvent: function (e, preventDefault, stopPropagation) {
                    if (preventDefault !== false) {
                        if (e.preventDefault) { e.preventDefault(); }
                        else { e.returnValue = false; }
                    }
                    if (stopPropagation !== false) {
                        if (e.stopPropagation) { e.stopPropagation(); }
                        else { e.cancelBubble = true; }
                    }
                },
                eventElement: function (e) { return e.target ? e.target : e.srcElement; },

                // arrays/objects
                toArray: function (data) {
                    if (data instanceof Array) { return data; }
                    if (data.item) {
                        var array = [];
                        for (var i = 0, l = data.length; i < l; i++) { array[i] = data[i]; }
                        return array;
                    }
                    return Array.prototype.slice.call(data);
                },
                indexOf: function (data, item, from) {
                    var len = data.length;
                    for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++) {
                        if (data[i] === item) { return i; }
                    }
                    return -1;
                },
                removeItem: function (arr, item) {
                    for (var i = arr.length; i--; ) {
                        if (arr[i] === item) { arr.splice(i, 1); }
                    }
                },
                each: function (data, fn, bind) {
                    if (data instanceof Array) {
                        for (var i = 0; i < data.length; i++) { fn.call(bind || null, data[i], i); }
                    }
                    else {
                        for (var key in data) { fn.call(bind || null, data[key], key); }
                    }
                    return data;
                },

                trim: function (s) { return s.replace(/^\s+|\s+$/g, ""); },
                etrim: function (str, chars) {
                    if (typeof str !== 'string') return str;
                    return $.ltrim($.rtrim(str, chars), chars);
                },

                ltrim: function (str, chars) {
                    chars = chars || "\\s";
                    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
                },

                rtrim: function (str, chars) {
                    chars = chars || "\\s";
                    //					console.info('str info');
                    //					console.info(str)
                    //					console.info(typeof str);
                    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
                },

                time: function () { return new Date().getTime(); },

                map: function (data, fn, bind) {
                    var a = data instanceof Array ? [] : {};
                    $.each(data, function (value, key) {
                        a[key] = fn.call(bind || null, value, key);
                    });
                    return a;
                },
                css: function (el, style) {
                    if (el instanceof Array) {
                        for (var index = 0; index < el.length; ++index) {
                            var item = el[index];
                            $.css(item, style);
                        }
                        return;
                    }
                    else if (typeof (style) == "string") { el.style.cssText = style; }
                    else {
                        if (style.opacity !== undefined) {
                            $.opacity(el, style.opacity);
                            delete style.opacity;
                        }

                        style = $.map(style, function (value, key) {
                            if ($.indexOf(CSS_NUMERIC_VALUE, key) != -1) { return parseFloat(value); }
                            if ($.indexOf(CSS_PIXEL_VALUE, key) != -1 && typeof (value) == "number") { return value + "px"; }
                            return value;
                        });
                        $.extend(el.style, style);
                    }
                    return el;
                },

                hide: function (el) {
                    if (el instanceof Array) {
                        for (var i = 0; i < el.length; ++i) {
                            $.hide(el[i]);
                        }
                        return;
                    }
                    el.style.display = 'none';
                },

                show: function (el) {
                    el.style.display = 'block';
                },

                docSize: function (doc) {
                    var intH = 0, intW = 0;

                    if (self.innerHeight) {
                        intH = window.innerHeight;
                        intW = window.innerWidth;
                    }
                    else {
                        if (doc.documentElement && doc.documentElement.clientHeight) {
                            intH = doc.documentElement.clientHeight;
                            intW = doc.documentElement.clientWidth;
                        }
                        else {
                            if (document.body) {
                                intH = doc.body.clientHeight;
                                intW = doc.body.clientWidth;
                            }
                        }
                    }

                    if (intH < doc.body.clientHeight) {
                        intH = doc.body.clientHeight;
                    }

                    return {
                        height: parseInt(intH, 10),
                        width: parseInt(intW, 10)
                    };
                },

                addCls: function (el, cls) {
                    if (!$.hasCls(el, cls)) { el.className += " " + cls; }
                },
                removeCls: function (el, cls) {
                    el.className = el.className.replace(new RegExp("(^|\\s+)" + cls + "(\\s+|$)", "g"), " ");
                },
                hasCls: function (el, cls) {
                    return new RegExp("(^|\\s)" + cls + "(\\s|$)").test(el.className);
                },

                currCss: function (el, key, toNumber) {
                    if (key == "float") { key = "cssFloat"; }

                    if (key == "opacity" && $.browser.name == "ie") { return $.opacity(el); }

                    var result = null;

                    if (el.currentStyle) {
                        result = el.currentStyle[key.replace(/-\D/g, function (match) {
                            return match.charAt(1).toUpperCase();
                        })];
                    }
                    else {
                        var computed = el.ownerDocument.defaultView.getComputedStyle(el, null);
                        result = computed ? computed.getPropertyValue(key) : null;
                    }

                    if (result == "auto" && (key == "width" || key == "height")) {
                        result = el["offset" + key.charAt(0).toUpperCase() + key.substr(1)];
                        var removePadding = key == "width" ? ["left", "right"] : ["top", "bottom"];
                        result -= $.currCss(el, removePadding[0]) + $.currCss(el, removePadding[1]);
                        if (result < 0) { result = 0; }
                    }

                    if (
					result !== null &&
					(
						$.indexOf(CSS_PIXEL_VALUE, key) != -1 ||
						$.indexOf(CSS_NUMERIC_VALUE, key) != -1 ||
						toNumber ||
						result.indexOf("px") == result.length - 2
					)
				) { result = parseFloat(result); }

                    return $.etrim(result, "'\"");
                },

                opacity: function (el, value) {
                    if (value === undefined) { // get
                        if ($.browser.name != "ie") { return $.currCss(el, "opacity"); }
                        var filter = el.style.filter;
                        return filter && filter.indexOf("opacity=") >= 0 ? (parseFloat(filter.match(/opacity=([^)]*)/)[1]) / 100) : 1;
                    }
                    else { // set
                        if (value == 0) {
                            if (el.style.visibility != 'hidden') { el.style.visibility = 'hidden'; }
                        } else {
                            if (el.style.visibility != 'visible') { el.style.visibility = 'visible'; }
                        }
                        if (!el.currentStyle || !el.currentStyle.hasLayout) { el.style.zoom = 1; }
                        if ($.browser.name == "ie") { el.style.filter = value == 1 ? '' : 'alpha(opacity=' + value * 100 + ')'; }
                        el.style.opacity = value;
                    }
                },

                offset: function (el) {
                    var curleft = curtop = 0;
                    if (el.offsetParent) {
                        do {
                            curleft += el.offsetLeft;
                            curtop += el.offsetTop;
                        } while (el = el.offsetParent);
                    }
                    return { left: curleft, top: curtop };
                },
                //get current dimensions and position of an element
                //usage:   var dims = new ElementDimensions(elementToMeasure);
                dimensions: function (elem) {
                    var coords = {};
                    coords.inner = {	//content and padding; gives 0 for inline elements (you can use scrollWidth/Height if it's inline)
                        width: elem.clientWidth,
                        height: elem.clientHeight
                    };
                    coords.outer = {	//everything (content, padding, scrollbar, border)
                        width: elem.offsetWidth,
                        height: elem.offsetHeight
                    };
                    coords.scroll = {
                        //width & height of entire content field (including padding), visible or not
                        //incorrect in Opera; it doesn't include the padding
                        width: elem.scrollWidth,
                        //if there are no scrollbars, IE gives the actual height of the content instead of the height of the element
                        height: elem.scrollHeight < elem.clientHeight ? elem.clientHeight : elem.scrollHeight,

                        //scroll position of content & padding
                        left: elem.scrollLeft,
                        top: elem.scrollTop
                    };

                    //position of element from the top-left corner of the document
                    var tmp = elem;
                    coords.left = coords.top = 0;
                    while (tmp.offsetParent) {
                        coords.left += tmp.offsetLeft;
                        coords.top += tmp.offsetTop;
                        tmp = tmp.offsetParent;
                    }

                    return coords;
                },

                /**
                * Bind a function to a specific this object
                * @param function
                * @param bind object
                */
                bind: function (fn, bind) {
                    return function () {
                        fn.apply(bind, arguments);
                    };
                },

                /**
                * Spawns separate function call that waits for check to be true
                * @param check - function that returns true or false
                * @param onComplete - function to call when check is true
                * @param delay - how long to wait between checks (in ms)
                * @param timeout - how long before giving up
                * @param bind - the bind for this for the onComplete function
                * @param args - arguments to pass to the onComplete function
                */
                waitUntil: function (check, onComplete, delay, timeout, bind, args) {
                    if (!bind) bind = this;
                    if (!args) args = [];
                    // if the check returns true, execute onComplete immediately
                    if (check()) {
                        onComplete.apply(bind, args);
                        return;
                    }

                    if (!delay) delay = 100;

                    var timeoutPointer;
                    var intervalPointer = setInterval(function () {
                        if (!check()) return; // if check didn't return true, means we need another check in the next interval

                        // if the check returned true, means we're done here. clear the interval and the timeout and execute onComplete
                        clearInterval(intervalPointer);
                        if (timeoutPointer) clearTimeout(timeoutPointer);
                        onComplete.apply(bind, args);
                    }, delay);
                    // if after timeout milliseconds function doesn't return true, abort
                    if (timeout) timeoutPointer = setTimeout(function () {
                        clearInterval(intervalPointer);
                    }, timeout);
                },

                htmlenc: function encode(s) {
                    return s ? s.replace(/&/g, "&amp;")
                   .replace(/</g, "&lt;")
                   .replace(/>/g, "&gt;")
                   .replace(/'/g, "&apos;")
                   .replace(/"/g, "&quot;") : "";
                },

                addStylesheet: function (href, media, doc) {
                    if (doc == null) doc = document;
                    var head = doc.getElementsByTagName('head')[0];

                    var links = doc.getElementsByTagName('link');
                    for (var i = 0; i < links.length; ++i) {
                        var tempLink = links[i];

                        if (tempLink.getAttribute('href') == href) {
                            return true;
                        }
                    }

                    var link = doc.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = href;
                    link.type = 'text/css';
                    link.media = media || 'all';
                    head.appendChild(link);
                    return true;
                },

                log: function () {
                    if (typeof (console) == "undefined") { return; }
                    try { console.log.apply(console, arguments); }
                    catch (ex) { console.log($.toArray(arguments)); }
                },

                /**
                * Same thing as $.log function, but uses the info functio
                * that also shows the line from where it was fired.
                *
                * @param mixed
                */
                l: function () {
                    if (typeof (console) == 'undefined') { return af; }
                    return console.info;
                } (),

                d: function () {
                    if (typeof (console) == 'undefined') { return af; }
                    return console.dir;
                } (),

                prepend: function (parentEl, newChild) {
                    var firstChild = parentEl.firstChild;
                    if (typeof firstChild != "undefined") {
                        parentEl.insertBefore(newChild, firstChild);
                    }
                    else {
                        parentEl.appendChild(newChild);
                    }
                },

                getViewport: function () {

                    var viewPortWidth;
                    var viewPortHeight;

                    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
                    if (typeof window.innerWidth != 'undefined') {
                        viewPortWidth = window.innerWidth,
						viewPortHeight = window.innerHeight
                    }

                    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
                    else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
                        viewPortWidth = document.documentElement.clientWidth,
						viewPortHeight = document.documentElement.clientHeight
                    }

                    // older versions of IE
                    else {
                        viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
						viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
                    }
                    return { 'width': viewPortWidth, 'height': viewPortHeight };
                },

                // Randomizes an array using Fisher-Yates shuffle algorithm
                randomizeArray: function (oldArray) {
                    var i = oldArray.length;
                    if (i == 0) return [];
                    while (--i) {
                        var j = Math.floor(Math.random() * (i + 1));
                        var tempi = oldArray[i];
                        var tempj = oldArray[j];
                        oldArray[i] = tempj;
                        oldArray[j] = tempi;
                    }
                    return oldArray;
                },

                // Convert a hex value to its decimal value - the inputted hex must be in the
                // format of a hex triplet - the kind we use for HTML colours. The function
                // will return ([255,255,255] - [Reg, Green, Blue]) an array with three values.
                hex2num: function (hex) {
                    if (hex.charAt(0) == "#") hex = hex.slice(1); //Remove the '#' char - if there is one.
                    hex = hex.toUpperCase();
                    var hex_alphabets = "0123456789ABCDEF";
                    var value = new Array(3);
                    var k = 0;
                    var int1, int2;
                    for (var i = 0; i < 6; i += 2) {
                        int1 = hex_alphabets.indexOf(hex.charAt(i));
                        int2 = hex_alphabets.indexOf(hex.charAt(i + 1));
                        value[k] = (int1 * 16) + int2;
                        k++;
                    }
                    return (value);
                },

                // Give a array ([255,255,255] - [Reg, Green, Blue]) with three values as the argument and the function will return
                // the corresponding hex triplet.
                num2hex: function (triplet) {
                    var hex_alphabets = "0123456789ABCDEF";
                    var hex = "#";
                    var int1, int2;
                    for (var i = 0; i < 3; i++) {
                        int1 = triplet[i] / 16;
                        int2 = triplet[i] % 16;

                        hex += hex_alphabets.charAt(int1) + hex_alphabets.charAt(int2);
                    }
                    return (hex);
                },

                md5: function (strToMd5) {
                    var hexcase = 0; function hex_md5(a) { return rstr2hex(rstr_md5(str2rstr_utf8(a))) } function hex_hmac_md5(a, b) { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a), str2rstr_utf8(b))) } function md5_vm_test() { return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72" } function rstr_md5(a) { return binl2rstr(binl_md5(rstr2binl(a), a.length * 8)) } function rstr_hmac_md5(c, f) { var e = rstr2binl(c); if (e.length > 16) { e = binl_md5(e, c.length * 8) } var a = Array(16), d = Array(16); for (var b = 0; b < 16; b++) { a[b] = e[b] ^ 909522486; d[b] = e[b] ^ 1549556828 } var g = binl_md5(a.concat(rstr2binl(f)), 512 + f.length * 8); return binl2rstr(binl_md5(d.concat(g), 512 + 128)) } function rstr2hex(c) { try { hexcase } catch (g) { hexcase = 0 } var f = hexcase ? "0123456789ABCDEF" : "0123456789abcdef"; var b = ""; var a; for (var d = 0; d < c.length; d++) { a = c.charCodeAt(d); b += f.charAt((a >>> 4) & 15) + f.charAt(a & 15) } return b } function str2rstr_utf8(c) { var b = ""; var d = -1; var a, e; while (++d < c.length) { a = c.charCodeAt(d); e = d + 1 < c.length ? c.charCodeAt(d + 1) : 0; if (55296 <= a && a <= 56319 && 56320 <= e && e <= 57343) { a = 65536 + ((a & 1023) << 10) + (e & 1023); d++ } if (a <= 127) { b += String.fromCharCode(a) } else { if (a <= 2047) { b += String.fromCharCode(192 | ((a >>> 6) & 31), 128 | (a & 63)) } else { if (a <= 65535) { b += String.fromCharCode(224 | ((a >>> 12) & 15), 128 | ((a >>> 6) & 63), 128 | (a & 63)) } else { if (a <= 2097151) { b += String.fromCharCode(240 | ((a >>> 18) & 7), 128 | ((a >>> 12) & 63), 128 | ((a >>> 6) & 63), 128 | (a & 63)) } } } } } return b } function rstr2binl(b) { var a = Array(b.length >> 2); for (var c = 0; c < a.length; c++) { a[c] = 0 } for (var c = 0; c < b.length * 8; c += 8) { a[c >> 5] |= (b.charCodeAt(c / 8) & 255) << (c % 32) } return a } function binl2rstr(b) { var a = ""; for (var c = 0; c < b.length * 32; c += 8) { a += String.fromCharCode((b[c >> 5] >>> (c % 32)) & 255) } return a } function binl_md5(p, k) { p[k >> 5] |= 128 << ((k) % 32); p[(((k + 64) >>> 9) << 4) + 14] = k; var o = 1732584193; var n = -271733879; var m = -1732584194; var l = 271733878; for (var g = 0; g < p.length; g += 16) { var j = o; var h = n; var f = m; var e = l; o = md5_ff(o, n, m, l, p[g + 0], 7, -680876936); l = md5_ff(l, o, n, m, p[g + 1], 12, -389564586); m = md5_ff(m, l, o, n, p[g + 2], 17, 606105819); n = md5_ff(n, m, l, o, p[g + 3], 22, -1044525330); o = md5_ff(o, n, m, l, p[g + 4], 7, -176418897); l = md5_ff(l, o, n, m, p[g + 5], 12, 1200080426); m = md5_ff(m, l, o, n, p[g + 6], 17, -1473231341); n = md5_ff(n, m, l, o, p[g + 7], 22, -45705983); o = md5_ff(o, n, m, l, p[g + 8], 7, 1770035416); l = md5_ff(l, o, n, m, p[g + 9], 12, -1958414417); m = md5_ff(m, l, o, n, p[g + 10], 17, -42063); n = md5_ff(n, m, l, o, p[g + 11], 22, -1990404162); o = md5_ff(o, n, m, l, p[g + 12], 7, 1804603682); l = md5_ff(l, o, n, m, p[g + 13], 12, -40341101); m = md5_ff(m, l, o, n, p[g + 14], 17, -1502002290); n = md5_ff(n, m, l, o, p[g + 15], 22, 1236535329); o = md5_gg(o, n, m, l, p[g + 1], 5, -165796510); l = md5_gg(l, o, n, m, p[g + 6], 9, -1069501632); m = md5_gg(m, l, o, n, p[g + 11], 14, 643717713); n = md5_gg(n, m, l, o, p[g + 0], 20, -373897302); o = md5_gg(o, n, m, l, p[g + 5], 5, -701558691); l = md5_gg(l, o, n, m, p[g + 10], 9, 38016083); m = md5_gg(m, l, o, n, p[g + 15], 14, -660478335); n = md5_gg(n, m, l, o, p[g + 4], 20, -405537848); o = md5_gg(o, n, m, l, p[g + 9], 5, 568446438); l = md5_gg(l, o, n, m, p[g + 14], 9, -1019803690); m = md5_gg(m, l, o, n, p[g + 3], 14, -187363961); n = md5_gg(n, m, l, o, p[g + 8], 20, 1163531501); o = md5_gg(o, n, m, l, p[g + 13], 5, -1444681467); l = md5_gg(l, o, n, m, p[g + 2], 9, -51403784); m = md5_gg(m, l, o, n, p[g + 7], 14, 1735328473); n = md5_gg(n, m, l, o, p[g + 12], 20, -1926607734); o = md5_hh(o, n, m, l, p[g + 5], 4, -378558); l = md5_hh(l, o, n, m, p[g + 8], 11, -2022574463); m = md5_hh(m, l, o, n, p[g + 11], 16, 1839030562); n = md5_hh(n, m, l, o, p[g + 14], 23, -35309556); o = md5_hh(o, n, m, l, p[g + 1], 4, -1530992060); l = md5_hh(l, o, n, m, p[g + 4], 11, 1272893353); m = md5_hh(m, l, o, n, p[g + 7], 16, -155497632); n = md5_hh(n, m, l, o, p[g + 10], 23, -1094730640); o = md5_hh(o, n, m, l, p[g + 13], 4, 681279174); l = md5_hh(l, o, n, m, p[g + 0], 11, -358537222); m = md5_hh(m, l, o, n, p[g + 3], 16, -722521979); n = md5_hh(n, m, l, o, p[g + 6], 23, 76029189); o = md5_hh(o, n, m, l, p[g + 9], 4, -640364487); l = md5_hh(l, o, n, m, p[g + 12], 11, -421815835); m = md5_hh(m, l, o, n, p[g + 15], 16, 530742520); n = md5_hh(n, m, l, o, p[g + 2], 23, -995338651); o = md5_ii(o, n, m, l, p[g + 0], 6, -198630844); l = md5_ii(l, o, n, m, p[g + 7], 10, 1126891415); m = md5_ii(m, l, o, n, p[g + 14], 15, -1416354905); n = md5_ii(n, m, l, o, p[g + 5], 21, -57434055); o = md5_ii(o, n, m, l, p[g + 12], 6, 1700485571); l = md5_ii(l, o, n, m, p[g + 3], 10, -1894986606); m = md5_ii(m, l, o, n, p[g + 10], 15, -1051523); n = md5_ii(n, m, l, o, p[g + 1], 21, -2054922799); o = md5_ii(o, n, m, l, p[g + 8], 6, 1873313359); l = md5_ii(l, o, n, m, p[g + 15], 10, -30611744); m = md5_ii(m, l, o, n, p[g + 6], 15, -1560198380); n = md5_ii(n, m, l, o, p[g + 13], 21, 1309151649); o = md5_ii(o, n, m, l, p[g + 4], 6, -145523070); l = md5_ii(l, o, n, m, p[g + 11], 10, -1120210379); m = md5_ii(m, l, o, n, p[g + 2], 15, 718787259); n = md5_ii(n, m, l, o, p[g + 9], 21, -343485551); o = safe_add(o, j); n = safe_add(n, h); m = safe_add(m, f); l = safe_add(l, e) } return Array(o, n, m, l) } function md5_cmn(h, e, d, c, g, f) { return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d) } function md5_ff(g, f, k, j, e, i, h) { return md5_cmn((f & k) | ((~f) & j), g, f, e, i, h) } function md5_gg(g, f, k, j, e, i, h) { return md5_cmn((f & j) | (k & (~j)), g, f, e, i, h) } function md5_hh(g, f, k, j, e, i, h) { return md5_cmn(f ^ k ^ j, g, f, e, i, h) } function md5_ii(g, f, k, j, e, i, h) { return md5_cmn(k ^ (f | (~j)), g, f, e, i, h) } function safe_add(a, d) { var c = (a & 65535) + (d & 65535); var b = (a >> 16) + (d >> 16) + (c >> 16); return (b << 16) | (c & 65535) } function bit_rol(a, b) { return (a << b) | (a >>> (32 - b)) };
                    return hex_md5(strToMd5);
                },


                timer: function () {
                    var startTimeStamp;
                    return {
                        start: function () {
                            startTimeStamp = new Date().getTime();
                        },

                        getStatus: function () {
                            var now = new Date().getTime();
                            var seconds = (now - startTimeStamp) / 1000;
                            return seconds;
                        }
                    };
                } (),

                isDecendant: function (decendant, ancestor) {
                    var isDecendant = false;
                    do {
                        if (decendant == ancestor) {
                            isDecendant = true;
                            break;
                        }
                        decendant = decendant.parentNode;
                    }
                    while (decendant.tagName.toLowerCase() != "html")

                    return isDecendant;
                },

                getTopMostWindow: function () {
                    var currP = window;
                    while (currP) {
                        try {
                            var newP = currP.parent;
                            // try to reach the document, if didn't succeed - goes to catch {}
                            var doc = newP.document;
                            if (!doc) break;
                            // reached the top
                            // newP is ok. use it.
                            currP = newP;
                            if (newP == newP.parent) break;

                        } catch (ex) {
                            break;
                        }
                    }
                    $.getTopMostWindow = function () { return currP; };
                    return currP;
                },

                _parseQueryString: function (query) {
                    var params = {};
                    query.replace(/(.*?)=(.*?)(?:&|$)/g, function (match, key, value) {
                        params[key/*.toLowerCase()*/] = decodeURIComponent(value);
                    });
                    return params;
                },

                //Returns true if it is a DOM element
                isElement: function (o) {
                    return (
						typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
						typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === "string"
					);
                },

                _getQueryString: function () {
                    if (!$._getQueryString._overwritten) {
                        $._getQueryString._overwritten = true;

                        var queryString = $._parseQueryString(location.search.substr(1));
                        $._getQueryString = function (key, def) {
                            key = key.toLowerCase();
                            return (queryString[key] === undefined ? def : queryString[key]) || "";
                        };
                        return $._getQueryString.apply(null, arguments);
                    }
                }
            });

            $.browser = {};

            (function () {
                /* Borrowed from MooTools Browser object */
                var ua = navigator.userAgent.toLowerCase(),
					platform = navigator.platform.toLowerCase(),
					UA = ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, 'unknown', 0],
					mode = UA[1] == 'ie' && document.documentMode;
                $.browser.name = (UA[1] == 'version') ? UA[3] : UA[1];
                $.browser.version = mode || parseFloat((UA[1] == 'opera' && UA[4]) ? UA[4] : UA[2]);
                $.browser.platform = {
                    name: ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0]
                };
                $.browser.features = {
                    xpath: !!(document.evaluate),
                    air: !!(window.runtime),
                    query: !!(document.querySelector),
                    json: !!(window.JSON)
                };
                $.browser[$.browser.name] = true;
                $.browser[$.browser.name + parseInt($.browser.version, 10)] = true;
                $.browser.platform[$.browser.platform.name] = true;
            })();

            $.detectFlashVersion = function (reqMajorVer, reqMinorVer, reqRevision) {
                var isIE = $.browser.name == "ie" ? true : false;
                var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
                var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

                function ControlVersion() {
                    var version;
                    var axo;
                    var e;

                    // NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

                    try {
                        // version will be set for 7.X or greater players
                        axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
                        version = axo.GetVariable("$version");
                    } catch (e) {
                    }

                    if (!version) {
                        try {
                            // version will be set for 6.X players only
                            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");

                            // installed player is some revision of 6.0
                            // GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
                            // so we have to be careful. 

                            // default to the first public version
                            version = "WIN 6,0,21,0";

                            // throws if AllowScripAccess does not exist (introduced in 6.0r47)		
                            axo.AllowScriptAccess = "always";

                            // safe to call for 6.0r47 or greater
                            version = axo.GetVariable("$version");

                        } catch (e) {
                        }
                    }

                    if (!version) {
                        try {
                            // version will be set for 4.X or 5.X player
                            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
                            version = axo.GetVariable("$version");
                        } catch (e) {
                        }
                    }

                    if (!version) {
                        try {
                            // version will be set for 3.X player
                            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
                            version = "WIN 3,0,18,0";
                        } catch (e) {
                        }
                    }

                    if (!version) {
                        try {
                            // version will be set for 2.X player
                            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                            version = "WIN 2,0,0,11";
                        } catch (e) {
                            version = -1;
                        }
                    }

                    return version;
                }

                // JavaScript helper required to detect Flash Player PlugIn version information
                function GetSwfVer() {
                    // NS/Opera version >= 3 check for Flash plugin in plugin array
                    var flashVer = -1;

                    if (navigator.plugins != null && navigator.plugins.length > 0) {
                        if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
                            var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
                            var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
                            var descArray = flashDescription.split(" ");
                            var tempArrayMajor = descArray[2].split(".");
                            var versionMajor = tempArrayMajor[0];
                            var versionMinor = tempArrayMajor[1];
                            var versionRevision = descArray[3];
                            if (versionRevision == "") {
                                versionRevision = descArray[4];
                            }
                            if (versionRevision[0] == "d") {
                                versionRevision = versionRevision.substring(1);
                            } else if (versionRevision[0] == "r") {
                                versionRevision = versionRevision.substring(1);
                                if (versionRevision.indexOf("d") > 0) {
                                    versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
                                }
                            }
                            var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
                            //alert("flashVer=" + flashVer);
                        }
                    }
                    // MSN/WebTV 2.6 supports Flash 4
                    else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
                    // WebTV 2.5 supports Flash 3
                    else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
                    // older WebTV supports Flash 2
                    else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
                    else if (isIE && isWin && !isOpera) {
                        flashVer = ControlVersion();
                    }
                    return flashVer;
                }

                // When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
                function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision) {
                    versionStr = GetSwfVer();
                    if (versionStr == -1) {
                        return false;
                    } else if (versionStr != 0) {
                        if (reqMajorVer == null) return true;
                        if (isIE && isWin && !isOpera) {
                            // Given "WIN 2,0,0,11"
                            tempArray = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
                            tempString = tempArray[1]; 		// "2,0,0,11"
                            versionArray = tempString.split(","); // ['2', '0', '0', '11']
                        } else {
                            versionArray = versionStr.split(".");
                        }
                        var versionMajor = versionArray[0];
                        var versionMinor = versionArray[1];
                        var versionRevision = versionArray[2];

                        // is the major.revision >= requested major.revision AND the minor version >= requested minor
                        if (versionMajor > parseFloat(reqMajorVer)) {
                            return true;
                        } else if (versionMajor == parseFloat(reqMajorVer)) {
                            if (versionMinor > parseFloat(reqMinorVer))
                                return true;
                            else if (versionMinor == parseFloat(reqMinorVer)) {
                                if (versionRevision >= parseFloat(reqRevision))
                                    return true;
                            }
                        }
                        return false;
                    }
                }
                return DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision);
            };

            (function () {
                var _loaded,
				_observers = [];

                $.extend($, {
                    addDomReady: function (fn) {
                        if (_loaded) { return fn(); }

                        _observers[_observers.length] = fn;

                        if (!_domReadyInitialized) {
                            _domReadyInitialized = true;
                            initDomReady();
                        }
                    }
                });

                var _domReadyInitialized;
                function initDomReady() {

                    if ($.browser.name == "ie") {
                        var temp = $.create('div');
                        (function () {
                            var success;
                            try {
                                temp.doScroll('left');
                                $.document.body.appendChild(temp);
                                temp.innerHTML = "temp";
                                $.removeNode(temp);
                                success = true;
                            } catch (ex) {
                                setTimeout(arguments.callee, 500);
                            }

                            if (success) { domready(); }
                        })();
                    } else if ($.browser.features.query == false) {
                        (function () {
                            if ($.document.readyState == "loaded" || $.document.readyState == "complete") { domready(); }
                            else { setTimeout(arguments.callee, 500); }
                        })();
                    } else {
                        if ($.document.readyState == "loaded" || $.document.readyState == "complete") { domready(); }
                        else {
                            $.addEvent(window, 'load', domready);
                            $.addEvent(document, 'DOMContentLoaded', domready);
                        }
                    }

                    function domready() {
                        if (_loaded) { return; }
                        _loaded = true;
                        $.each(_observers, function (fn) {
                            fn();
                        });
                    }
                }
            })();

            var MAX_DUMP_DEPTH = 5;
            var CSS_PIXEL_VALUE = "left,top,bottom,right,width,height,maxWidth,maxHeight,minWidth,minHeight,fontSize,letterSpacing,lineHeight,margin,marginLeft,marginRight,marginTop,marginBottom,padding,paddingLeft,paddingRight,paddingTop,paddingBottom,borderWidthLeft,borderWidthRight,borderWidthTop,borderWidthBottom".split(",");
            var CSS_NUMERIC_VALUE = "z-index,font-weight,opacity,zoom,line-height".split(",");

            return $;
        } ();
        var $ = FIVEMIN.LIB;
        FIVEMIN.LIB.Fx = function () {
            var _defaultOptions = {
                duration: 500,
                fps: 50
            };
            function Fx(element, options, baseOptions) {
                this.element = element;
                this.options = $.extend(baseOptions || {}, $.extend($.extend({}, _defaultOptions), options));
                if (typeof this.options.transition == 'string') {
                    this.options.transition = eval("FIVEMIN.LIB.Fx.Transitions." + this.options.transition);
                }
            }
            Fx.prototype = {
                transition: function (p) {
                    if (this.options.transition) return this.options.transition(p);
                    return -(Math.cos(Math.PI * p) - 1) / 2;
                },
                start: function (to, callback) {
                    if (this.timer) { return false; }
                    this.to = to;
                    this.from = this.getFrom();
                    this.startTime = $.time();
                    this.endTime = this.startTime + this.options.duration;
                    this.timer = setInterval($.bind(this.step, this), Math.round(1000 / this.options.fps));

                    return this;
                },
                stop: function () {
                    if (!this.timer) { return false; }
                    clearInterval(this.timer);
                    this.timer = null;
                },
                cancel: function () {
                    this.stop();
                    if (this.options.onCancel) { this.options.onCancel.call(this); }
                },
                complete: function () {
                    this.set(1);
                    this.stop();
                    if (this.options.onComplete) { this.options.onComplete.call(this); }
                },
                step: function () {
                    var time = $.time();
                    if (time < this.endTime) {
                        var percentage = this.transition((time - this.startTime) / this.options.duration);
                        this.set(percentage);
                    }
                    else { this.complete(); }
                },
                getFrom: function (p) {
                    var from = {};
                    $.each(this.to, function (value, key) {
                        from[key] = $.currCss(this.element, key);
                        if (key == "marginLeft" && isNaN(from[key])) {
                            from[key] = $.currCss(this.element, "margin-left");
                        }
                    }, this);
                    return from;
                },
                set: function (p) {
                    var style = {};
                    $.each(this.to, function (value, key) {
                        style[key] = (value - this.from[key]) * p + this.from[key];
                        if (key !== "opacity") { style[key] = Math.floor(style[key]); }
                    }, this);
                    $.css(this.element, style);
                }
            };

            return Fx;
        } ();

        FIVEMIN.LIB.Fx.Transition = function (transition, params) {
            params = typeof (params) != 'array' ? [params] : params;
            return $.extend(transition, {
                easeIn: function (pos) {
                    return transition(pos, params);
                },
                easeOut: function (pos) {
                    return 1 - transition(1 - pos, params);
                },
                easeInOut: function (pos) {
                    return (pos <= 0.5) ? transition(2 * pos, params) / 2 : (2 - transition(2 * (1 - pos), params)) / 2;
                }
            });
        };

        FIVEMIN.LIB.Fx.Transitions = {};

        FIVEMIN.LIB.Fx.Transitions.extend = function (transitions) {
            for (var transition in transitions) FIVEMIN.LIB.Fx.Transitions[transition] = new FIVEMIN.LIB.Fx.Transition(transitions[transition]);
        };

        FIVEMIN.LIB.Fx.Transitions.extend({

            Pow: function (p, x) {
                return Math.pow(p, x[0] || 6);
            },

            Expo: function (p) {
                return Math.pow(2, 8 * (p - 1));
            },

            Circ: function (p) {
                return 1 - Math.sin(Math.acos(p));
            },

            Sine: function (p) {
                return 1 - Math.sin((1 - p) * Math.PI / 2);
            },

            Back: function (p, x) {
                x = x[0] || 1.618;
                return Math.pow(p, 2) * ((x + 1) * p - x);
            },

            Bounce: function (p) {
                var value;
                for (var a = 0, b = 1; 1; a += b, b /= 2) {
                    if (p >= (7 - 4 * a) / 11) {
                        value = b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
                        break;
                    }
                }
                return value;
            },

            Elastic: function (p, x) {
                return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (x[0] || 1) / 3);
            },

            Quad: function (p, x) {
                return Math.pow(p, 2);
            },
            Cubic: function (p, x) {
                return Math.pow(p, 2);
            },
            Quart: function (p, x) {
                return Math.pow(p, 2);
            },
            Quint: function (p, x) {
                return Math.pow(p, 2);
            }
        });

        FIVEMIN.LIB.toQueryString = function (params) {
            var arr = [];
            $.each(params, function (value, key) {
                if (typeof value == 'function' || value == null) return;
                arr.push(key + "=" + encodeURIComponent(value.toString()));
            });
            return arr.join("&");
        };

        return FIVEMIN.LIB;
    })();
}
if (typeof (FIVEMIN.LIB.Helpers) == "undefined") {
    FIVEMIN.LIB.Helpers = {
        getRnd: function (s) { var a = s.split(","); return a[Math.floor(Math.random() * a.length)]; }
		, getHead: function () { var $ = FIVEMIN.LIB; return $.getElement("head") || $.document.body || $.document.documentElement; }
    }
}