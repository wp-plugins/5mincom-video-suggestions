/* ~/Scripts/Fivemin.lightbox.js */

if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }
if (typeof (FIVEMIN.Lightbox) == "undefined") {
    FIVEMIN.Lightbox = function (options) {
        var $ = FIVEMIN.LIB;
        var CSS_PREFIX = "fmts-lb-";
        var CONTENT_CSS_PREFIX = CSS_PREFIX + "cn-";
        var OFFSET_FROM_TOP = 30;

        $.addStylesheet(FIVEMIN.BaseConfig.Lightbox.css, 'all', $.getTopMostWindow().document);

        function Lightbox(options, instanceNumber) {
            options = $.extend({}, options);
            if (options) {
                CSS_PREFIX = options.CSS_PREFIX ? options.CSS_PREFIX : CSS_PREFIX;
                CONTENT_CSS_PREFIX = options.CONTENT_CSS_PREFIX ? options.CONTENT_CSS_PREFIX : CONTENT_CSS_PREFIX;
                OFFSET_FROM_TOP = options.OFFSET_FROM_TOP ? options.OFFSET_FROM_TOP : OFFSET_FROM_TOP;
            }

            $.setDocument($.getTopMostWindow().document);
            this.instanceNumber = instanceNumber;
            var randomId = parseInt(Math.random(10000) * 10000);
            var animType = options.lightboxAnim;
            var onHideStart = options.onHideStart;
            var onShowStart = options.onShowStart;
            var onHideComplete = options.onHideComplete;
            var onShowComplete = options.onShowComplete;
            var customShow = options.customShow;
            var customHide = options.customHide;
            var relatedMode = options.relatedMode;
            var identifier = "FIVEMIN_Lightbox_" + randomId;

            try {
                $.getTopMostWindow()[identifier] = this;
            } catch (e) { alert(e); }

            this.box = new box();
            this.box.init({
                animConfig: {
                    duration: 300,
                    type: animType,
                    onHideStart: $.bind(function (box) {
                        if (onHideStart) onHideStart(box);
                    }, this),
                    onHideComplete: $.bind(function () {
                        this.overlay.hide();
                        if (onHideComplete) onHideComplete();
                    }, this),
                    onShowStart: $.bind(function (box) {
                        if (onShowStart) onShowStart(box);
                    }, this),
                    onShowComplete: $.bind(function () {
                        if (onShowComplete) onShowComplete();
                    }, this),
                    customShow: customShow,
                    customHide: customHide
                },
                hideFunc: $.bind(function () {
                    this.hide();
                }, this),
                instanceNumber: instanceNumber
            });

            this.overlay = new overlay();
            this.overlay.init({
                opacity: options.overlayOpacity || 0.5,
                bgColor: options.overlayColor || "#000000",
                animConfig: {
                    duration: 300,
                    onShowComplete: function () {
                        $.restoreDocument();
                    }
                },
                onClickFunc: $.bind(function () {
                    this.hide();
                }, this)
            });

            $.addEvent($.document, "keydown", $.bind(function (e) {
                this.hideOnEsc(e);
            }, this)
				);
            $.restoreDocument();
        }

        Lightbox.prototype = {
            constructor: Lightbox.constructor,

            clear: function () {
                this.box.clear();
                delete this.box;

                this.overlay.clear();
                delete this.overlay;
            },

            setTitle: function (title) {
                this.box.setTitle(title);
            },

            show: function (cfg) {
                cfg = cfg || {};
                $.setDocument($.getTopMostWindow().document);
                var self = this;
                this.overlay.show({
                    onShowComplete: $.bind(function () {
                        this.box.show(cfg);
                    }, this)
                });
            },

            hideOnEsc: function (e) {
                var keyId = (window.event) ? window.event.keyCode : e.keyCode;

                if (keyId == 27) {
                    this.hide();
                }
            },

            hide: function () {
                this.box.hide();
            }
        };

        function box() {
            var element,
			animConfig,
			titleEl,
			contentEl,
			iframe,
            contentBody,
			displayed = false;

            return {
                clear: function () {
                    if (this.element) {
                        this.element.parentNode.removeChild(this.element);
                        delete this.element;
                    }

                    if (this.iframe) {
                        this.iframe.parentNode.removeChild(this.iframe);
                        delete this.iframe;
                    }

                    if (this.boxShadow && this.boxShadow.getElement()) {
                        this.boxShadow.getElement().parentNode.removeChild(this.boxShadow.getElement());
                        delete this.boxShadow;
                    }
                },
                init: function (cfg) {
                    animConfig = cfg.animConfig;

                    if (animConfig.type == 2 || animConfig.type == 3) {
                        this.boxShadow.init();
                    }

                    var dimen = $.docSize($.getTopMostWindow().document);

                    // Element
                    element = $.create("div", {
                        id: CONTENT_CSS_PREFIX + "wrapper",
                        className: CONTENT_CSS_PREFIX + "wrapper",
                        parent: $.getTopMostWindow().document.body
                    });
                    this.element = element;
                    // iFrame to block objects
                    this.iframe = $.create("iframe", {
                        parent: $.getTopMostWindow().document.body,
                        'id': CONTENT_CSS_PREFIX + "iframe",
                        'name': CONTENT_CSS_PREFIX + "iframe",
                        'src': 'javascript:void(0);',
                        'frameborder': 0,
                        'scrolling': 'no',
                        'styles': {
                            'position': 'fixed',
                            'top': '-20px',
                            'left': '-20px',
                            'filter': 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)',
                            'opacity': 0,
                            'width': '100%', //dimensions.width + 'px',
                            'height': dimen.height + 'px', //dimensions.height + 'px',
                            'zIndex': 1,
                            'visibility': '',
                            'display': 'none'
                        }
                    });
                    // Top image
                    $.create("div", { className: CSS_PREFIX + "top", parent: element });
                    //Content
                    contentEl = $.create("div", { className: CSS_PREFIX + "cn", parent: element });
                    // Title wrapper
                    titleWrapper = $.create("div", { className: CSS_PREFIX + "title-wrapper", parent: contentEl });
                    // Title
                    titleEl = $.create("div", {
                        className: CONTENT_CSS_PREFIX + "title",
                        parent: titleWrapper
                    });
                    // Close button
                    $.create("div", {
                        className: CONTENT_CSS_PREFIX + "close",
                        innerHTML: "X",
                        parent: titleWrapper,
                        events: {
                            click: cfg.hideFunc
                        }
                    });
                    // Content Body
                    contentBody = $.create("div", { className: CSS_PREFIX + "body", parent: contentEl });
                    // Bottom image
                    $.create("div", { className: CSS_PREFIX + "bottom", parent: element });
                },

                show: function (cfg) {
                    $.css(this.iframe, { 'display': '' });
                    if (cfg.position != null) {
                        $.css(this.element, { position: cfg.position });
                        if (cfg.position == 'absolute') $.css(this.element, { top: this._getTopPos() + "px" });
                        else if (cfg.position == 'fixed') {
                            $.css(this.element, { top: "30px" });
                        }
                    }
                    else $.css(this.element, { top: this._getTopPos() + "px" });
                    this.setTitle(cfg.title);

                    if (typeof (cfg.body == "string")) contentBody.innerHTML = cfg.body;
                    else if (typeof (cfg.body == "object")) contentBody.appendChild(cfg.body);

                    if (cfg.width != null) $.css(element, { width: cfg.width });

                    if (animConfig.onShowStart) { animConfig.onShowStart(this); }
                    if (animConfig.customShow) {
                        animConfig.customShow(this,
                        $.bind(function () {
                            if (animConfig.onShowComplete) {
                                animConfig.onShowComplete();
                            }
                            if (cfg.onShowComplete) {
                                cfg.onShowComplete();
                                displayed = true;
                            }
                        }, this));
                    }
                    else {
                        switch (animConfig.type) {
                            // fade                                    
                            case 1:
                                $.css(this.element, { opacity: 0, display: "block" });
                                new $.Fx(this.element, {
                                    duration: animConfig.duration,
                                    onComplete: function () {
                                        if (animConfig.onShowComplete) {
                                            animConfig.onShowComplete();
                                        }
                                        if (cfg.onShowComplete) {
                                            cfg.onShowComplete();
                                            displayed = true;
                                        }
                                    }
                                }).start({
                                    opacity: 1
                                });
                                break;
                            // grow                                    
                            case 2:
                                var boxShadow = this.boxShadow.getElement();
                                $.css(boxShadow, {
                                    width: 0,
                                    height: 0,
                                    marginLeft: 0,
                                    top: this._getTopPos() + 360,
                                    display: "block",
                                    opacity: 0
                                });
                                new $.Fx(boxShadow, {
                                    duration: 200,
                                    onComplete: function () {
                                        $.css(boxShadow, { display: "none" });
                                        $.css(element, { display: "block" });
                                        if (animConfig.onShowComplete) {
                                            animConfig.onShowComplete();
                                        }
                                        if (cfg.onShowComplete) {
                                            cfg.onShowComplete();
                                            displayed = true;
                                        }
                                    }
                                }).start({
                                    width: 813,
                                    height: 630,
                                    marginLeft: -406,
                                    top: this._getTopPos() + 7,
                                    opacity: 0.7
                                });
                                break;
                            // windows7                                    
                            case 3:
                                var boxShadow = this.boxShadow.getElement();
                                $.css(boxShadow, {
                                    width: 740,
                                    height: 560,
                                    marginLeft: -370,
                                    top: this._getTopPos() + 35,
                                    display: "block",
                                    opacity: 0
                                });
                                new $.Fx(boxShadow, {
                                    duration: 400,
                                    onComplete: function () {
                                        $.css(boxShadow, { display: "none" });
                                        $.css(element, { display: "block" });
                                        if (animConfig.onShowComplete) {
                                            animConfig.onShowComplete();
                                        }
                                        if (cfg.onShowComplete) {
                                            cfg.onShowComplete();
                                            displayed = true;
                                        }
                                    }
                                }).start({
                                    width: 813,
                                    height: 630,
                                    marginLeft: -406,
                                    top: this._getTopPos() + 7,
                                    opacity: 0.85
                                });
                                break;
                            // no effect                                    
                            case 0:
                            default:
                                $.css(this.element, { display: "block" });
                                if (animConfig.onShowComplete) {
                                    animConfig.onShowComplete();
                                }
                                if (cfg.onShowComplete) {
                                    cfg.onShowComplete();
                                    displayed = true;
                                }
                        }
                    }
                },

                hide: function () {
                    if (!displayed) { return; }
                    $.css(this.iframe, { 'display': 'none' });
                    if (animConfig.onHideStart) { animConfig.onHideStart(this); }
                    if (animConfig.customHide) { animConfig.customHide(this, animConfig.onHideComplete); }
                    else {
                        switch (animConfig.type) {
                            // fade                                    
                            case 1:
                                new $.Fx(this.element, {
                                    onComplete: $.bind(function () {
                                        $.css(this.element, { display: "none" });
                                        contentBody.innerHTML = "";
                                        if (animConfig.onHideComplete) {
                                            animConfig.onHideComplete();
                                        }
                                    }, this),
                                    duration: animConfig.duration
                                }).start({
                                    opacity: 0
                                });
                                break;
                            // shrink                                    
                            case 2:
                                var boxShadow = this.boxShadow.getElement();
                                $.css(this.element, { display: "none" });
                                contentBody.innerHTML = "";
                                $.css(boxShadow, {
                                    display: "block",
                                    top: this._getTopPos() + 7
                                });
                                new $.Fx(boxShadow, {
                                    duration: 200,
                                    onComplete: function () {
                                        if (animConfig.onHideComplete) {
                                            animConfig.onHideComplete();
                                        }
                                    }
                                }).start({
                                    width: 0,
                                    height: 0,
                                    marginLeft: 0,
                                    top: this._getTopPos() + 360,
                                    opacity: 0
                                });
                                break;
                            // windows7                                    
                            case 3:
                                var boxShadow = this.boxShadow.getElement();
                                $.css(boxShadow, {
                                    width: 813,
                                    height: 630,
                                    marginLeft: -406,
                                    top: this._getTopPos() + 7,
                                    opacity: 0.85,
                                    display: "block"
                                });
                                $.css(this.element, { display: "none" });
                                contentBody.innerHTML = "";
                                new $.Fx(boxShadow, {
                                    duration: 400,
                                    onComplete: function () {
                                        if (animConfig.onHideComplete) {
                                            animConfig.onHideComplete();
                                        }
                                    }
                                }).start({
                                    width: 740,
                                    height: 560,
                                    marginLeft: -370,
                                    top: this._getTopPos() + 35,
                                    opacity: 0
                                });
                                break;
                            // no effect                                    
                            case 0:
                            default:
                                $.css(this.element, { display: "none" });
                                contentBody.innerHTML = "";
                                if (animConfig.onHideComplete) {
                                    animConfig.onHideComplete();
                                }
                        }
                    }
                    displayed = false;
                },

                setTitle: function (title) {
                    titleEl.innerHTML = title;
                },

                getElement: function () {
                    return element;
                },

                _getTopPos: function () {
                    var document = $.getTopMostWindow().document;
                    var scrollTop = function () {
                        if (typeof pageYOffset != 'undefined') {
                            //most browsers
                            return pageYOffset;
                        }
                        else {
                            var B = document.body; //IE 'quirks'
                            var D = document.documentElement; //IE with doctype
                            D = (D.clientHeight) ? D : B;
                            return D.scrollTop;
                        }
                    } ();
                    scrollTop += OFFSET_FROM_TOP;
                    return scrollTop;
                },

                boxShadow: function () {
                    var element;

                    return {
                        init: function () {
                            element = $.create("div", {
                                id: CONTENT_CSS_PREFIX + "shadow",
                                className: CONTENT_CSS_PREFIX + "shadow",
                                parent: $.getTopMostWindow().document.body
                            }
						);
                        },

                        getElement: function () {
                            return element;
                        }
                    };
                } ()
            };
        }

        function overlay() {
            var element,
			opacity,
			animConfig;

            var updateDimensions = function () {
                if ($.browser.ie && $.browser.version < 8) {
                    var dimensions = $.docSize($.getTopMostWindow().document);
                    $.css(this.element, {
                        height: dimensions.height + "px",
                        width: dimensions.width + "px"
                    });
                }
            };

            return {
                clear: function () {
                    this.element.parentNode.removeChild(this.element);
                    delete this.element;
                    delete this.opacity;
                    delete this.animConfig;
                },
                init: function (cfg) {
                    animConfig = cfg.animConfig;
                    opacity = cfg.opacity;

                    this.element = $.create("div", {
                        id: CSS_PREFIX + "overlay",
                        className: CSS_PREFIX + "overlay",
                        parent: $.getTopMostWindow().document.body,
                        styles: {
                            "backgroundColor": cfg.bgColor
                        }
                    });

                    $.addEvent(this.element, "click", cfg.onClickFunc);
                },

                show: function (cfg) {
                    $.bind(updateDimensions, this)();
                    $.css(this.element, { opacity: 0, display: "block" });
                    new $.Fx(this.element, {
                        onComplete: $.bind(function () {
                            if (animConfig.onShowComplete) {
                                animConfig.onShowComplete();
                            }
                            if (cfg.onShowComplete) {
                                cfg.onShowComplete();
                            }
                        }, this),
                        duration: animConfig.duration
                    }).start({
                        opacity: opacity
                    });
                },

                hide: function () {
                    new $.Fx(this.element, {
                        onComplete: $.bind(function () {
                            $.css(this.element, { display: "none" });
                        }, this),
                        duration: animConfig.duration
                    }).start({
                        opacity: 0
                    });
                }
            };
        }

        return Lightbox;
    } ();
}