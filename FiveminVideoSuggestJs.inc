<script type="text/javascript">
//<![CDATA[

	function FiveMin_GetVideoSuggest() {
		document.getElementById('FiveMin_VideoSuggestion_Msg').innerHTML = 'Getting videos from 5min ...';
		jQuery.post('<?php bloginfo( 'wpurl' ); ?>/wp-admin/admin-ajax.php', {title: FiveMin_getPostTitle(), text: FiveMin_getPostContent(), action: 'FiveMin_getVideos', cookie: document.cookie}, onFiveMinGetVideosComplete,'json');
	}
	function FiveMin_getPostContent() {
		if (typeof tinyMCE != 'undefined' && tinyMCE.activeEditor != null && tinyMCE.activeEditor.isHidden() == false) {
			return tinyMCE.activeEditor.getBody().innerHTML;
		}
		return document.getElementById('content').value;
	}
	
	function FiveMin_getPostTitle(){
		return document.getElementById('title').value;
	}
	
	function onFiveMinGetVideosComplete(responseJson) {
		document.getElementById('FiveMin_VideoSuggestion_Msg').innerHTML = '';
		var returnedItems= responseJson.binding;
		if (returnedItems==null){
			if (responseJson.error!=null){
			document.getElementById('FiveMin_VideoSuggestion_Msg').innerHTML = responseJson.error;
			}
			return;
		}
		
		
		var videoBox = document.getElementById('FiveMin_VideoSuggestions');
		videoBox.innerHTML = '';
		for (i = 0; i < Math.min(5,returnedItems.length); i++) {
			var item=returnedItems[i];
			var videoElement = document.createElement('div');
			videoElement.className = 'fivemin_suggested_video';
			var embedUrl = item.EmbedURL;
			var itemTitle = item.Title;
			var itemLink = item.PageURL;
			var embedSource = "<div style='text-align:center'>"+
			"<object width='480' height='401' id='FiveminPlayer' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'>"+
			"<param name='allowfullscreen' value='true'/><param name='allowScriptAccess' value='always'/>"+
			"<param name='movie' value='"+embedUrl+"'/>"+
			"<embed name='FiveminPlayer' src='"+embedUrl+"' type='application/x-shockwave-flash' width='480' height='401' allowfullscreen='true' allowScriptAccess='always'></embed>"+
			"</object><br/>"+
			"<a href='"+itemLink+"' style='font-family: Verdana;font-size: 10px;' target='_blank'>"+itemTitle+
			"</a></div>";
			
			videoElement.innerHTML = '<div class="thumb"><img src="'+item.ThumbURL+'"/></div>'+
			'<div class="ttl">'+item.Title+'</div>'+
			'<div class="embedCode"><textarea class="embedCode">'+embedSource+'</textarea></div>'+
			'</div>';
			videoBox.appendChild(videoElement);
		}
		jQuery(videoBox).find(".thumb").bind("click",function(e){
			if (jQuery(".fiveMinVideoPreview").length==0){
				var lb=document.createElement('div');
				lb.className="fiveMinVideoPreview";
				lb.innerHTML='';
				document.body.appendChild(lb);
			}
			
			var lb=jQuery(".fiveMinVideoPreview").eq(0);
			var lbHtml = "<a href='#' class='closeFiveMinLb'>X</a>"+jQuery(e.target).parents(".fivemin_suggested_video").find(".embedCode textarea").val();
			lb.html(lbHtml);
			
			// bind close button
			lb.find(".closeFiveMinLb").bind("click",function(e){
				jQuery(".fiveMinVideoPreview").empty().remove();
			});
			
			
		});
	}
	jQuery(document).ready(function() { /* init function */ });
//]]>
</script>