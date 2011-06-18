/* ~/Scripts/Fivemin.baseconfig.js */

/**
* Config for ThumbSeed
*
* User: Eli Sklar
* Date: 05-Jul-2010 - 15:23:17
*/
if (typeof (FIVEMIN) == "undefined") { var FIVEMIN = {}; }
if (typeof (FIVEMIN.BaseConfig) == 'undefined') { FIVEMIN.BaseConfig = {}; }

// Default Config for ThumbSeed
FIVEMIN.BaseConfig.ThumbSeed = {
    debug: true
	, "script-regex": /http:\/\/(\w?)shared\.5min\.com\/scripts\/thumbseed2?\.js\?/i
	, colors: {
	    "header-text": "#666666"
		, "desc-text": "#FFFFFF"
		, "desc-background": "#000000"
	}
	, url: {
	    "website": "http://www.5min.com/"
		, "syn": "http://syn.5min.com/"
		, "shared": "http://pshared.5min.com/"
		, "graphics": "http://pshared.5min.com/Graphics/Thumbseed/"
		, "files": "http://pfiles.5min.com/flashproxy/"
	}
	, obj: "ThumbSeed"
	, styles: {
	    sizes: {
	        "horizontal": {
	            large: {
	                bottom: [
		         { width: 468, height: 200, num_thumbs: 3 },
				 { width: 310, height: 200, num_thumbs: 2 },
				 { width: 148, height: 220, num_thumbs: 1 }
			    ],
	                side: [
				   { width: 300, height: 200, num_thumbs: 1 }
			    ]
	            },
	            small: {
	                bottom: [
				    { width: 468, height: 164, num_thumbs: 4 },
				    { width: 347, height: 164, num_thumbs: 3 },
				    { width: 230, height: 205, num_thumbs: 2 },
				    { width: 109, height: 205, num_thumbs: 1 }
			    ],
	                side: [

				    { width: 483, height: 120, num_thumbs: 2 },
				    { width: 239, height: 120, num_thumbs: 1 }
			    ]
	            }
	        },
	        "vertical": {
	            small: {
	                bottom: [
				    { width: 109, height: 620, num_thumbs: 4 },
				    { width: 109, height: 480, num_thumbs: 3 },
				    { width: 109, height: 340, num_thumbs: 2 },
				    { width: 109, height: 205, num_thumbs: 1 }
			        ],
	                side: [
				    { width: 250, height: 330, num_thumbs: 3 },
				    { width: 250, height: 235, num_thumbs: 2 },
				    { width: 250, height: 140, num_thumbs: 1 },
				    { width: 300, height: 250, num_thumbs: 2 }
			        ]
	            },
	            large: {
	                bottom: [
				        { width: 148, height: 560, num_thumbs: 3 },
				        { width: 148, height: 390, num_thumbs: 2 },
				        { width: 148, height: 220, num_thumbs: 1 }
			        ],
	                side: [
				        { width: 300, height: 300, num_thumbs: 2 },
				        { width: 300, height: 163, num_thumbs: 1 }
			        ]
	            }
	        },
	        "matrix": {
	            small: {
	                bottom: [
				        { width: 347, height: 445, num_thumbs: 9 },
				        { width: 347, height: 305, num_thumbs: 6 },
				        { width: 347, height: 164, num_thumbs: 3 }
				    ],
	                side: [
				        { width: 250, height: 330, num_thumbs: 3 },
				        { width: 250, height: 235, num_thumbs: 2 },
				        { width: 250, height: 140, num_thumbs: 1 }
    			    ]
	            },

	            large: {
	                bottom: [
				        { width: 468, height: 544, num_thumbs: 9 },
				        { width: 468, height: 365, num_thumbs: 6 },
				        { width: 468, height: 200, num_thumbs: 3 }
			        ],
	                side: [
				        { width: 300, height: 300, num_thumbs: 2 },
				        { width: 300, height: 163, num_thumbs: 1 }
			        ]
	            }
	        }
	    },
	    sizeLimits: {
	        "small_bottom_min": { width: 108, height: 152 },
	        "small_bottom_max": { width: 906, height: 807 },
	        "small_side_min": { width: 200, height: 108 },
	        "small_side_max": { width: 711, height: 696 },
	        "large_bottom_min": { width: 148, height: 182 },
	        "large_bottom_max": { width: 923, height: 504 },
	        "large_side_min": { width: 300, height: 138 },
	        "large_side_max": { width: 922, height: 723 }
	    },
	    sizesWithAd: {
	        "468X200": { ad: { width: 468, height: 60 }, thumbnailSize: "large", textLocation: "bottom" },
	        "728X164": { ad: { width: 728, height: 90 }, thumbnailSize: "small", textLocation: "bottom" },
	        "728X120": { ad: { width: 728, height: 90 }, thumbnailSize: "small", textLocation: "side" },
	        "468X164": { ad: { width: 125, height: 125 }, thumbnailSize: "small", textLocation: "bottom" },
	        "468X164"/*B*/: { ad: { width: 468, height: 60 }, thumbnailSize: "small", textLocation: "bottom" },
	        "108X600": { ad: { width: 160, height: 600 }, thumbnailSize: "small", textLocation: "bottom" },

	        "300X300": { ad: { width: 300, height: 250 }, thumbnailSize: "large", textLocation: "side" },
	        "300X250": { ad: { width: 300, height: 250 }, thumbnailSize: "small", textLocation: "side" },
	        "468X544": { ad: { width: 468, height: 60 }, thumbnailSize: "large", textLocation: "bottom" }
	    },
	    colors: {
	        black: {
	            name: "Black",
	            colors: {
	                small: {
	                    headerTextColor: "#000000",
	                    textFGColor: "#FFFFFF",
	                    textBGColor: "#000000",
	                    textFGColor_MO: "#FFFFFF",
	                    textBGColor_MO: "#000000"
	                },
	                large: {
	                    headerTextColor: "#000000",
	                    textFGColor: "#000000",
	                    textBGColor: "",
	                    textFGColor_MO: "#FFFFFF",
	                    textBGColor_MO: "#000000"
	                }
	            },
	            iconBg: "#191919",
	            iconBorder: "#000000"
	        },
	        green: {
	            name: "Green",
	            colors: {
	                small: {
	                    headerTextColor: "#2E7720",
	                    textFGColor: "#FFFFFF",
	                    textBGColor: "#2E7720",
	                    textFGColor_MO: "#FFFFFF",
	                    textBGColor_MO: "#000000"
	                },
	                large: {
	                    headerTextColor: "#2E7720",
	                    textFGColor: "#333333",
	                    textBGColor: "",
	                    textFGColor_MO: "#FFFFFF",
	                    textBGColor_MO: "#2E7720"
	                }
	            },
	            iconBg: "#7EC359",
	            iconBorder: "#7B975F"
	        },
	        red: {
	            name: "Red",
	            colors: {
	                small: {
	                    headerTextColor: "#CC0000",
	                    textFGColor: "#FFFFFF",
	                    textBGColor: "#CC0000",
	                    textFGColor_MO: "#FFFFFF",
	                    textBGColor_MO: "#000000"
	                },
	                large: {
	                    headerTextColor: "#CC0000",
	                    textFGColor: "#333333",
	                    textBGColor: "",
	                    textFGColor_MO: "#FFFFFF",
	                    textBGColor_MO: "#CC0000"
	                }
	            },
	            iconBg: "#E50030",
	            iconBorder: "#7E151E"
	        },
	        blue: {
	            name: "Blue",
	            colors: {
	                small: {
	                    headerTextColor: "#006699",
	                    textFGColor: "#FFFFFF",
	                    textBGColor: "#006699",
	                    textFGColor_MO: "#FFFFFF",
	                    textBGColor_MO: "#000000"
	                },
	                large: {
	                    headerTextColor: "#006699",
	                    textFGColor: "#006699",
	                    textBGColor: "",
	                    textFGColor_MO: "#FFFFFF",
	                    textBGColor_MO: "#006699"
	                }
	            },
	            iconBg: "#006699",
	            iconBorder: "#002780"
	        },
	        orange: {
	            name: "Orange",
	            colors: {
	                small: {
	                    headerTextColor: "#FF6600",
	                    textFGColor: "#FFFFFF",
	                    textBGColor: "#FF6600",
	                    textFGColor_MO: "#FFFFFF",
	                    textBGColor_MO: "#000000"
	                },
	                large: {
	                    headerTextColor: "#FF6600",
	                    textFGColor: "#333333",
	                    textBGColor: "",
	                    textFGColor_MO: "#FFFFFF",
	                    textBGColor_MO: "#FF6600"
	                }
	            },
	            iconBg: "#FB612B",
	            iconBorder: "#B45E3F"
	        },
	        grey: {
	            name: "Grey",
	            colors: {
	                small: {
	                    headerTextColor: "#656565",
	                    textFGColor: "#FFFFFF",
	                    textBGColor: "#656565",
	                    textFGColor_MO: "#FFFFFF",
	                    textBGColor_MO: "#000000"
	                },
	                large: {
	                    headerTextColor: "#656565",
	                    textFGColor: "#333333",
	                    textBGColor: "",
	                    textFGColor_MO: "#FFFFFF",
	                    textBGColor_MO: "#656565"
	                }
	            },
	            iconBg: "#C1BCBD",
	            iconBorder: "#ABABA6"
	        },
	        purple: {
	            name: "Purple",
	            colors: {
	                small: {
	                    headerTextColor: "#592e7b",
	                    textFGColor: "#FFFFFF",
	                    textBGColor: "#592e7b",
	                    textFGColor_MO: "#FFFFFF",
	                    textBGColor_MO: "#000000"
	                },
	                large: {
	                    headerTextColor: "#592e7b",
	                    textFGColor: "#592e7b",
	                    textBGColor: "",
	                    textFGColor_MO: "#FFFFFF",
	                    textBGColor_MO: "#592e7b"
	                }
	            },
	            iconBg: "#923DF4",
	            iconBorder: "#5F3584"
	        },
	        lightblue: {
	            name: "Light blue",
	            colors: {
	                small: {
	                    headerTextColor: "#79B0CB",
	                    textFGColor: "#FFFFFF",
	                    textBGColor: "#79B0CB",
	                    textFGColor_MO: "#FFFFFF",
	                    textBGColor_MO: "#000000"
	                },
	                large: {
	                    headerTextColor: "#79B0CB",
	                    textFGColor: "#79B0CB",
	                    textBGColor: "",
	                    textFGColor_MO: "#FFFFFF",
	                    textBGColor_MO: "#79B0CB"
	                }
	            },
	            iconBg: "#5DC0E9",
	            iconBorder: "#5D95A7"
	        }
	    },
	    defaults: {
	        layout: "horizontal",
	        layoutWithAd: "468X200",
	        color: "black",
	        sizeType: "standard",
	        featured: "semantic",
	        title: "Related Videos",
	        headerTextColor: '#000000',
	        textFGColor: '#FFFFFF',
	        textFGColor_MO: '#FFFFFF',
	        textBGColor: '#000000',
	        textBGColor_MO: '#000000',
	        fallback: 1,
	        fallbackType: 'category'
	    }
	}
};

FIVEMIN.BaseConfig.Lightbox = {
    css: "http://pshared.5min.com/CSS/Lightbox.css"
};

// Default config for Seedlet
FIVEMIN.BaseConfig.Seedlet = {
    "debug": true

	, "script-regex": /http:\/\/(\w?)shared\.5min\.com\/scripts\/seedlet?\.js\?/i

	, "url": {
	    "website": "http://www.5min.com/"
		, "syn": "http://syn.5min.com/"
		, "shared": "http://pshared.5min.com/"
		, "graphics": "http://pshared.5min.com/Graphics/Thumbseed/"
		, "files": "http://pfiles.5min.com/flashproxy/"
		, "stagingSyn": "http://synd6.5min.com/"
	}
	, "stylesheets": {
	    "bar": "http://pshared.5min.com/CSS/Seedlet.css"
		, "tab": "http://pshared.5min.com/CSS/Tabseed.css"
	}
	, "stagingStylesheets": {
	    "bar": "http://sharedd6.5min.com/CSS/Seedlet.css"
		, "tab": "http://sharedd6.5min.com/CSS/Tabseed.css"
	}
	, "anim": {
	    "panelIn": 1000,
	    "panelOut": 1000
	}
	, "dim": {
	    "panelHeight": 563
	    , "seedletHeight": 90
	}
	, "obj": "FIVEMIN.Seedlet"
	, options: {
	    type: 'bar',
	    initial_state: 'open',
	    thumb_handler: 'Default',
	    container_handler: 'Default',
	    backgroundcolor: null,
	    titlecolor: null,
	    bycolor: null,
	    bylinkurl: 'http://www.5min.com/BarSeed.aspx',
	    sid: null,
	    url: null,
	    categories: null,
	    playList: null,
	    fallback: null,
	    fallbackType: null,
	    featured: false,
	    contentQuality: null,
	    libraryID: null,
	    autoStart: false,
	    title: "Related Videos",
	    location: null,
	    position: null // top | bottom | middle | custom
	}
	, styles: {
	    colors: {
	        black: {
	            name: "Black",
	            colors: {
	                titlecolor: "#FFEB00",
	                backgroundcolor: "#000000",
	                bycolor: "#ffffff"
	            },
	            tab: {
	                titlecolor: "#ffeb00",
	                backgroundcolor: "#1f1f1f",
	                bycolor: "#ffffff"
	            },
	            iconBg: "#191919",
	            iconBorder: "#000000"
	        },
	        green: {
	            name: "Green",
	            colors: {
	                titlecolor: "#ffffff",
	                backgroundcolor: "#2E7720",
	                bycolor: "#93C47D"
	            },
	            iconBg: "#7EC359",
	            iconBorder: "#7B975F"
	        },
	        red: {
	            name: "Red",
	            colors: {
	                titlecolor: "#ffffff",
	                backgroundcolor: "#CC0000",
	                bycolor: "#EA9999"
	            },
	            iconBg: "#E50030",
	            iconBorder: "#7E151E"
	        },
	        blue: {
	            name: "Blue",
	            colors: {
	                titlecolor: "#ffffff",
	                backgroundcolor: "#006699",
	                bycolor: "#9FC5E8"
	            },
	            iconBg: "#006699",
	            iconBorder: "#002780"
	        },
	        orange: {
	            name: "Orange",
	            colors: {
	                titlecolor: "#ffffff",
	                backgroundcolor: "#FF6600",
	                bycolor: "#F9CB9C"
	            },
	            iconBg: "#FB612B",
	            iconBorder: "#B45E3F"
	        },
	        grey: {
	            name: "Grey",
	            colors: {
	                titlecolor: "#ffffff",
	                backgroundcolor: "#656565",
	                bycolor: "#B4B4B4"
	            },
	            iconBg: "#C1BCBD",
	            iconBorder: "#ABABA6"
	        },
	        purple: {
	            name: "Purple",
	            colors: {
	                titlecolor: "#ffffff",
	                backgroundcolor: "#592e7b",
	                bycolor: "#B4A7D6"
	            },
	            iconBg: "#923DF4",
	            iconBorder: "#5F3584"
	        },
	        lightblue: {
	            name: "Light blue",
	            colors: {
	                titlecolor: "#ffffff",
	                backgroundcolor: "#79B0CB",
	                bycolor: "#CFE2F3"
	            },
	            iconBg: "#5DC0E9",
	            iconBorder: "#5D95A7"
	        }
	    },
	    defaults: {
	        location: "bottom",
	        featured: "semantic",
	        color: "black",
	        title: 'Related Videos',
	        position: 'top'
	    }
	}
};
FIVEMIN.BaseConfig.VideoSection = {
    defaults: {
        textColor: "#006699",
        pageBgColor: "#FFFFFF",
        playerColor: "#006699",
        pageWidth: 975,
        categories: []
    },

    schemeLists: {
        "default": ["#191919", "#7EC359", "#E50030", "#006699", "#FB612B", "#C1BCBD", "#923DF4", "#5DC0E9"],
        textColor: ["#006699", "#191919", "#E50030", "#7EC359", "#FB612B", "#C1BCBD", "#923DF4", "#5DC0E9"],
        pageBgColor: ["#FFFFFF", "#191919", "#7EC359", "#E50030", "#006699", "#FB612B", "#C1BCBD", "#923DF4", "#5DC0E9"],
        playerColor: ["#006699", "#191919", "#E50030", "#7EC359", "#FB612B", "#C1BCBD", "#923DF4", "#5DC0E9", "#FFFFFF"]
    },

    maxPageWidth: 1200,
    minPageWidth: 955
};
FIVEMIN.BaseConfig.PlayerSeed = {
    defaults: {
        width: "400",
        height: "255",
        relatedBottomHeight: 60,
        companionPos: "right",
        hasCompanion: true,
        playerActions: 703,
        sizeType: "standard",
        featured: "semantic",
        fallback: 1,
        fallbackType: 'category'
    },
    relatedMode: {
        'auto-hide': 1,
        'right': 101,
        'below': 2,
        'open-bottom': 3,
        'minHeight': 60,
        'maxHeight': 330,
        'open-bottom-default': 250,
        'below-default': 60
    },
    playerActions: {
        'twitter': 1,
        'sendToFriend': 2,
        'embedCode': 4,
        'search': 8,
        'related': 16,
        'toolsDefault': 32,
        'tools': 64,
        'smartsDefault': 128,
        'smarts': 256,
        'by5minDefault': 512,
        'by5min': 1024,
        'by5minLinked': 2048,
        'autoStartRelated': 4096,
        'overlayPauseBottom': 8192
    },
    playerSizes: {
        wide: {
            '391': { width: 391, height: 250 },
            '400': { width: 400, height: 255 },
            '655': { width: 655, height: 398 },
            'min': 391,
            'max': 900
        },
        normal: {
            '300': { width: 300, height: 250 },
            '400': { width: 400, height: 330 },
            '485': { width: 485, height: 394 },
            'min': 300,
            'max': 900
        },
        extra: {
            controlHeight: 30,
            headerHeight: 20
        }
    },
    styles: {
        colors: {
            black: {
                name: "Black",
                vcdBgColor: '#191919',
                colorPallet: '#FFEB00',
                iconBg: "#191919",
                iconBorder: "#000000"
            },
            green: {
                name: "Green",
                iconBg: "#7EC359",
                iconBorder: "#7B975F",
                vcdBgColor: '#2E7720',
                colorPallet: '#93C47D'
            },
            red: {
                name: "Red",
                vcdBgColor: '#CC0000',
                colorPallet: '#EA9999',
                iconBg: "#E50030",
                iconBorder: "#7E151E"
            },
            blue: {
                name: "Blue",
                vcdBgColor: '#006699',
                colorPallet: '#9FC5E8',
                iconBg: "#006699",
                iconBorder: "#002780"
            },
            orange: {
                name: "Orange",
                vcdBgColor: '#FF6600',
                colorPallet: '#F9CB9C',
                iconBg: "#FB612B",
                iconBorder: "#B45E3F"
            },
            grey: {
                name: "Grey",
                vcdBgColor: '#656565',
                colorPallet: '#B4B4B4',
                iconBg: "#C1BCBD",
                iconBorder: "#ABABA6"
            },
            purple: {
                name: "Purple",
                vcdBgColor: '#592E7B',
                colorPallet: '#B4A7D6',
                iconBg: "#923DF4",
                iconBorder: "#5F3584"
            },
            lightblue: {
                name: "Light blue",
                vcdBgColor: '#79B0CB',
                colorPallet: '#CFE2F3',
                iconBg: "#5DC0E9",
                iconBorder: "#5D95A7"
            }
        }
    }
};
FIVEMIN.BaseConfig.Logger = {
    LogLevel: -1,
    LogServer: "http://l.5min.com",
    Enums: {
        broVer: {
            unknown: 0,
            ie: 1,
            firefox: 2,
            chrome: 3,
            safari: 4
        },
        osVer: {
            unknown: 0,
            win: 1,
            mac: 2,
            linux: 3,
            webos: 4,
            android: 5,
            ios: 6
        },
        rType: {
            noResults: 0,
            success: 1,
            timeout: 2
        },
        content: {
            featured: 0,
            seed: 1,
            playlist: 2
        },
        embCont: {
            single: 0,
            playlist: 1
        },
        pgLoc: {
            topLeft: 0,
            topCenter: 1,
            topRight: 2,
            bottomLeft: 3,
            bottomCenter: 4,
            bottomRight: 5
        },
        viewSrc: {
            productView: 0,
            playlistView: 1,
            relatedPlayer: 2,
            relatedDeep: 3
        },
        isDeep: {
            'false': 0,
            'true': 1
        },
        auStart: {
            'false': 0,
            'true': 1
        },
        adUnit: {
            'false': 0,
            'true': 1
        },
        adSize: {
            '728x90': 0,
            '300x250': 1,
            '468x60': 2,
            '160x600': 3
        },
        adLoc: {
            bottom: 0,
            side: 1
        },
        thSize: {
            large: 0,
            medium: 1,
            small: 2
        },
        txtLoc: {
            bottom: 0,
            size: 1
        },
        fType: {
            category: 0,
            video: 1,
            empty: 2
        },
        sHF: {
            'false': 0,
            'true': 1
        },
        thAlign: {
            horizontal: 0,
            vertical: 1
        },
        header: {
            'false': 0,
            'true': 1
        },
        cbPos: {
            left: 0,
            right: 1,
            bottom: 2,
            top: 3,
            custom: 4
        },
        uNxt: {
            'false': 0,
            'true': 1
        },
        ruNxt: {
            'false': 0,
            'true': 1
        },
        hc: {
            'false': 0,
            'true': 1
        },
        foos: {
            'false': 0,
            'true': 1
        },
        bType: {
            bar: 0,
            tab: 1
        },
        bLoc: {
            left: 0,
            right: 1
        },
        bPos: {
            top: 0,
            middle: 1,
            bottom: 2
        },
        bState: {
            half: 0,
            full: 1
        },
        vFlg: {
            'false': 0,
            'true': 1
        },
        vExp: {
            SID: 0,
            Fivemin: 1,
            Syndication: 2
        },
        vGeo: {
            All: 0,
            US: 1,
            NonUS: 2
        },
        vf: {
            'false': 0,
            'true': 1
        },
        emType: {
            TSDeepSeed: 0,
            BSDeepSeed: 1,
            VideoSection: 2,
            Regular: 3
        }
    },
    ThumbSeed: {
        params: {
            sid: "142",
            urlId: 0,
            content: 1, //featured,seed,playlist
            cqReq: 2, // contentQuality from js
            catsReq: "", // categories requested
            fType: 1, // fallbackType video, category
            sKey: ''
        },
        events: {
            addReq: {
                name: "TSRq",
                bitValue: 1,
                priorty: 2,
                params: {
                    isDeep: 0, // isDeepSeed 
                    adUnit: 0,
                    adSize: "", //728X90, 300X250 ,468X60, 106X600
                    adLoc: 1, // bottom or side // adLoation
                    thSize: 1, // ThumbSize
                    txtLoc: 0, // TextLocation - bottom, side 
                    sHF: 0, // Show header footer
                    nThumb: "",
                    thAlign: 0, // thumbAlign 0 = vertical, 1 = horizontal
                    uNxt: 0, // UpNext
                    ruNxt: 0 // Related up next
                }
            },
            AddResult: {
                name: "TSRs",
                bitValue: 2,
                params: {
                    rType: 1, //result type
                    nVids: "", // num of videos
                    uNxt: 0, // UpNext
                    ruNxt: 0 // Related up next
                }
            },
            AddImpression: {
                name: "TSI",
                bitValue: 4,
                params: {
                    nVids: "", // num of videos
                    pgLoc: "", // location in page
                    sessImp: 0,
                    isDeep: 0,
                    adUnit: 0,
                    adSize: "", //728X90, 300X250 ,468X60, 106X600
                    adLoc: 1, // bottom or side
                    thSize: 1, // ThumbSize
                    txtLoc: 0, // TextLocation - bottom, side 
                    nThumb: "",
                    thAlign: 0, // thumbAlign 0 = vertical, 1 = horizontal
                    sHF: 0, // Show header footer
                    uNxt: 0, // UpNext
                    ruNxt: 0 // Related up next
                }
            },
            AddVideoResults: {
                name: "TSVR",
                bitValue: 16,
                params: {
                    nVids: "", // num of videos
                    pgLoc: "", // location in page
                    vCat: "", // video categories
                    vid: 0,
                    vLocSrvr: "", // video location in result from server
                    isDeep: 0,
                    vCQ: "", //video content quality
                    vFlg: "", // Video flagged
                    vExp: "", //video Exposure permission
                    mId: "", // member id
                    vGeo: "", // video geo permission
                    vf: "" // Is featured video
                }
            }
        }
    },
    Seedlet: {
        params: {
            sid: "142",
            urlId: 0,
            content: 1, //featured,seed,playlist
            cqReq: 2, // contentQuality from js
            catsReq: "", // categories requested
            fType: 1, // fallbackType video, category
            sKey: ''
        },
        events: {
            addReq: {
                name: "BSRq",
                bitValue: 64,
                priorty: 2,
                params: {
                    isDeep: 0, // isDeepSeed
                    uNxt: 0, // UpNext
                    ruNxt: 0, // Related up next
                    bType: "", // barSeed Type
                    bLoc: "", // barSeed location
                    bPos: "" // barSeed Position
                }
            },
            AddResult: {
                name: "BSRs",
                bitValue: 128,
                params: {
                    rType: 1, //result type
                    nVids: "", // num of videos
                    uNxt: 0,
                    ruNxt: 0
                }
            },
            AddImpression: {
                name: "BSI",
                bitValue: 256,
                params: {
                    //rType:1,//result type
                    nVids: "", // num of videos
                    // pgLoc: "", // location in page
                    sessImp: 0,
                    isDeep: 0,
                    uNxt: 0, // UpNext
                    ruNxt: 0, // Related up next
                    bType: "", // barSeed Type
                    bLoc: "", // barSeed location
                    bPos: "" // barSeed Position
                }
            },
            AddVideoResults: {
                name: "BSVR",
                bitValue: 1024,
                params: {
                    nVids: "", // num of videos
                    pgLoc: "", // location in page
                    vCat: "", // video categories
                    vid: 0, // video Id,
                    vLocSrvr: "", // video location in result from server
                    isDeep: 0, // IsDeepSeed or LightBox
                    vCQ: "", //video content quality
                    vFlg: "", // Video flagged
                    vExp: "", //video Exposure permission
                    mId: "", // member id
                    vGeo: "", // video geo permission
                    vf: "" // Is featured video
                }
            },
            AddBannerClick: {
                name: "BBSBC",
                bitValue: 16777216,
                priorty: 2,
                params: {
                    sessImp: "",
                    bState: "",
                    aId: 0
                }
            }
        }
    },
    PlayerSeed: {
        params: {
            sid: "142",
            urlId: 0,
            content: 1, //featured,seed,playlist
            cqReq: 2, // contentQuality from js
            catsReq: "", // categories requested
            fType: 1, // fallbackType video, category
            sKey: ''
        },
        events: {
            addReq: {
                name: "PSRq",
                bitValue: 4096,
                priorty: 2,
                params: {
                    //isDeep: 0, // IsDeepSeed or LightBox
                    auStart: "", //Is autoStart
                    header: "", // Is header  - boolean,
                    hc: "", // hasCompanion - boolean
                    foos: "", // failOverOnStart = boolean
                    cbPos: "", // companion banner position
                    relMod: "",
                    uNxt: 0, // UpNext
                    ruNxt: 0 // Related up next
                }
            },
            AddResult: {
                name: "PSRs",
                bitValue: 8192,
                params: {
                    nVids: "", // num of videos
                    uNxt: 0, // UpNext
                    ruNxt: 0 // Related up next
                }
            },
            AddImpression: {
                name: "PSI",
                bitValue: 16384,
                param: {
                    auStart: "", //Is autoStart
                    sessImp: 0,
                    header: "", // Is header  - boolean,
                    hc: "", // hasCompanion - boolean
                    foos: "", // failOverOnStart = boolean
                    cbPos: "", // companion banner position
                    relMod: "",
                    uNxt: 0, // UpNext
                    ruNxt: 0, // Related up next
                    fType: "",
                    pgLoc: "", // location in page
                    vCat: "", // video categories
                    vid: 0, // video Id
                    vLoc: "", // video location in result from server
                    isDeep: 0, // IsDeepSeed or LightBox
                    vCQ: "", //video content quality
                    vFlg: "", // Video flagged
                    vExp: "", //video Exposure permission
                    mId: "", // member id
                    vGeo: "", // video geo permission
                    vf: "" // Is featured video
                }
            },
            AddVideoResults: {
                name: "PSVR",
                bitValue: 65536,
                params: {
                    pgLoc: "", // location in page
                    vCat: "", // video categories
                    vid: 0, // video Id
                    vLocSrvr: "", // video location in result from server
                    auStart: "", //Is autoStart
                    vCQ: "", //video content quality
                    vFlg: "", // Video flagged
                    vExp: "", //video Exposure permission
                    mId: "", // member id
                    vGeo: "", // video geo permission
                    vf: "" // Is featured video
                }
            },
            AddVideoView: {
                name: 'PSVV',
                bitValue: 131072,
                param: {
                    pgLoc: '',
                    sessImp: 0,
                    vCat: '',
                    vid: 0,
                    vLoc: 0,
                    vCQ: '',
                    vFlg: '',
                    vExp: '',
                    mId: '',
                    vGeo: '',
                    vf: '',
                    sessView: '',
                    vvpr: '',
                    tss: '',
                    tsp: ''
                }
            }
        }
    }
};