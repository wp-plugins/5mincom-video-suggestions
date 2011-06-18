if(typeof(FIVEMIN)=="undefined"){var FIVEMIN={}}
if(typeof(FIVEMIN.VideoSuggestPlugin)=="undefined"){
var FIVEMINVIDEOSUGGESTPLUGIN= (function () {

	VideoSuggestPlugin = function () {
        var that = this;
        this.handlerUrl = '/wp-admin/admin-ajax.php';
		jQuery(function(){
			that.lightbox = new FIVEMIN.Lightbox();
		});
		
    };

	VideoSuggestPlugin.prototype = {
	
	constructor: VideoSuggestPlugin,
	
	getVideoSuggest: function() {
		document.getElementById('FiveMin_VideoSuggestion_Msg').innerHTML = 'Getting videos from 5min ...';
		jQuery.post(this.handlerUrl, {title: this.getPostTitle(), text: this.getPostContent(), action: 'FiveMin_getVideos', cookie: document.cookie}, FIVEMIN.LIB.bind(this.onFiveMinGetVideosComplete,this),'json');
	},
	
	getSearchResults: function() {
		document.getElementById('FiveMin_VideoSuggestion_Msg').innerHTML = 'Getting videos from 5min ...';
		var searchTerm = jQuery(".fivemin-videosuggestbox .head .txt_ipt").val();
		jQuery.post(this.handlerUrl, {searchTerm:searchTerm, action: 'FiveMin_getSearchResults', cookie: document.cookie}, FIVEMIN.LIB.bind(this.onFiveMinGetVideosComplete,this),'json');
	},
	
	getPostContent: function() {
		if (typeof tinyMCE != 'undefined' && tinyMCE.activeEditor != null && tinyMCE.activeEditor.isHidden() == false) {
			return tinyMCE.activeEditor.getBody().innerHTML;
		}
		return document.getElementById('content').value;
	},
	
	getPostTitle:function(){
		return document.getElementById('title').value;
	},
	
	onFiveMinGetVideosComplete: function(responseJson) {
		var that=this;
		document.getElementById('FiveMin_VideoSuggestion_Msg').innerHTML = '';
		var returnedItems= responseJson.items;
		if (returnedItems==null){
			if (responseJson.error!=null){
			document.getElementById('FiveMin_VideoSuggestion_Msg').innerHTML = responseJson.error;
			}
			return;
		}
		
		if (returnedItems.length==0){
			document.getElementById('FiveMin_VideoSuggestion_Msg').innerHTML = "No related videos found, try writing more text.";
			return;
		}
		
		var videoBox = document.getElementById('FiveMin_VideoSuggestions');
		videoBox.innerHTML = '';
		for (i = 0; i < Math.min(5,returnedItems.length); i++) {
			var item=returnedItems[i];
			var videoElement = document.createElement('div');
			videoElement.className = 'fivemin_suggested_video';
			
			var itemTitle = item.title;
			var itemLink = item.player.url;
			var videoId = item.id;
			var embedSource = item.player.source;
			var itemImage = item.image;
			
			videoElement.innerHTML = '<div class="thumb"><div class="playIcon">&nbsp;</div><img src="'+itemImage+'"/></div>'+
			'<div class="ttl">'+itemTitle+'</div>'+
			'<div class="embedCode"><textarea class="embedCode2">'+embedSource+'</textarea><br/><b>to embed a video in post, Copy the above embed code to the html section.</b></div>'+
			/*'<div class="addToPostWrapper"><a href="#" class="addToPost">Add To Post</div>'+*/
			/*'<div class="embedCode"><textarea class="embedCode">'+playerSeed+'</textarea></div>'+*/
			'</div>';
			videoBox.appendChild(videoElement);
			
			jQuery(videoElement).data('videoData',item);
			
		}
		jQuery(videoBox).find(".thumb").bind("click",function(e){
			var videoElement=jQuery(e.target).parents(".fivemin_suggested_video");
			var videoData=(videoElement.data('videoData'));
			that.viewVideo(videoData);
		});
		
		jQuery(videoBox).find(".addToPost").bind("click",function(e){
			var videoElement=jQuery(e.target).parents(".fivemin_suggested_video");
			var videoData=(videoElement.data('videoData'));
			that.addToPost(videoData);
		});
	},
	
	addToPost: function(video){
	},
	
	 parseDate:function(d) {
            if (!isNaN(Date.parse(d))) return new Date(Date.parse(d));
            if (d.indexOf(" ") > -1) d = d.split(" ")[0];
            if (!isNaN(Date.parse(d))) return new Date(Date.parse(d));

            var parts = d.split("-");
            for (var c = 0; c < parts.length; c++) {
                if (parts[c].length == 1) parts[c] = "0" + parts[c];
            }
            d = parts.join("-");
            return new Date(Date.parse(d));
        },
	formatDate :function (d) {
            var m_names = new Array("January", "February", "March",
			"April", "May", "June", "July", "August", "September",
			"October", "November", "December");
            var curr_date = d.getDate();
            var sup = "";
            if (curr_date == 1 || curr_date == 21 || curr_date == 31) {
                sup = "st";
            }
            else if (curr_date == 2 || curr_date == 22) {
                sup = "nd";
            }
            else if (curr_date == 3 || curr_date == 23) {
                sup = "rd";
            }
            else {
                sup = "th";
            }

            var curr_month = d.getMonth();
            var curr_year = d.getFullYear();

            return m_names[curr_month] + " " + curr_date + sup + ", " + curr_year;
        },
	
	 viewVideo : function (video) {
			

            var lightboxBody = '<div id="fivemin-lightbox"><div class="player-wrapper" style="float: left; width:656px;height:450px;margin-right: 20px;"><div id="fivemin-player-placeholder">&nbsp;</div></div><div class="player-texts">' +
				'<h3>' + video.title + '</h3>' +
				'<p class="description">' + video.description + '</p>' +
				'<p class="date">Added on ' + this.formatDate(this.parseDate(video.pubDate.split(' ')[0])) + '</p>';
            if (video.expDate != undefined && video.expDate != '')
                lightboxBody += '<p class="date">Expires on ' + this.formatDate(this.parseDate(video.expDate.split(' ')[0])) + '</p>';
            else
                lightboxBody += '<p class="date">No expiration date</p>';
            lightboxBody += '<p class="tags"></p>' +
				'<p class="by">By: <span>' + video.videoOwner + '</span></p>';
            if (video.geoRestriction != null && video.geoRestriction != 'ALL')
                lightboxBody += '<p class="geo">Restricted to: ' + video.geoRestriction + '</p>';
            else
                lightboxBody += '<p class="geo">No geographical restrictions</p>';
            lightboxBody += '</div></div>';

            var flashparams = {
                allowfullscreen: true,
                allowscriptaccess: 'always'
            };

            var params = {
                title: 'Viewing video #' + video.id + ': ' + video.title,
                body: lightboxBody,
                width: 955,
                position: 'fixed',
                onShowComplete: function () {
                    var ps = document.createElement("script");
                    ps.setAttribute('type', 'text/javascript');
                    ps.setAttribute('src', "http://pshared.5min.com/Scripts/PlayerSeed.js?sid=577&width=655&height=398&autoStart=true&playerActions=0&isFreeWheel=false&playList="+video.id+"&r=" + Math.random());
                    document.getElementById('fivemin-player-placeholder').appendChild(ps);
                    //swfobject.embedSWF(swf, 'fivemin-player-placeholder', '655', '398', '9.0.0', null, flashparams);
                }
            };
            this.lightbox.show(params);
        }

	
    };

    return VideoSuggestPlugin;
})();
FIVEMIN.VideoSuggestPlugin = new FIVEMINVIDEOSUGGESTPLUGIN();
}

