<?php
/***************************************************************************

Plugin Name: FiveMin Video Suggest
Plugin URI: http://shared.5min.com/wordpress/FiveMinVideoSuggestWPPlugin.zip
Description: Suggests videos for your post, based on 5min semantic engine.
Version: 0.0.1
Author: 5Min Media
Author URI: http://www.5min.com

***************************************************************************/

//Include class
require('FiveminVideoSuggestCls.php');

//Initialization to add the box to the post page
add_action('admin_menu', 'FiveMinVideoSuggest_init');
function FiveMinVideoSuggest_init() {
	add_meta_box('FiveMinVideoSuggest', 'FiveMin Video Suggest', 'FiveMinVideoSuggestBox', 'post', 'normal', 'high');
}
function FiveMinVideoSuggestBox() {
	?>
	<style type="text/css">
		#FiveMin_VideoSuggestions{
			width:100%;
			float:left;
			padding-bottom:10px;
		}
		#FiveMin_VideoSuggestions .fivemin_suggested_video{
			width:140px;
			padding:4px;
			border:1px solid #cfcfcf;
			float:left;
			margin-right:5px;
		}
			#FiveMin_VideoSuggestions .fivemin_suggested_video .thumb{
				padding-bottom:5px;
				cursor:pointer;
				height:105px;
				width:140px;
				overflow:hidden;
			}
			#FiveMin_VideoSuggestions .fivemin_suggested_video .ttl{
				padding-bottom:5px;
				height:36px;
				font-size:11px;
				line-height:12px;
			}
			#FiveMin_VideoSuggestions .fivemin_suggested_video textarea{
				width:140px;
				height:30px;
			}
			/* lightbox*/
			.fiveMinVideoPreview{
				position:absolute;
				top:100px;
				left:50%;
				width:480px;
				margin-left:-240px;
				padding:15px;
				padding-top:25px;
				border:1px solid #cfcfcf;
				background:#fff;
			}
			.fiveMinVideoPreview .closeFiveMinLb{
				position:absolute;
				top:5px;
				right:5px;
			}

	</style>
	<?php require('FiveminVideoSuggestJs.inc'); ?>
	<div style="clear: both"></div>
	<br />
	<input type="button" class="button" onclick="FiveMin_GetVideoSuggest()" value="Get Video Suggestions" /><br /><br />
	<div id="FiveMin_VideoSuggestion_Msg">&nbsp;</div>
	<br/>
	<div id="FiveMin_VideoSuggestions" >&nbsp;
	</div>
	<div style="clear: both"></div>
	
<?php	
}

//Register an AJAX hook for the get videos function
add_action('wp_ajax_FiveMin_getVideos', 'FiveMin_getVideos');


function FiveMin_getVideos() {
	header('Content-type: application/json');
	$content = stripslashes($_POST['text']);
	$title = stripslashes($_POST['title']);
	
	$fiveMinVideoSuggest = new FiveminVideoSuggestCls();
	$jsonResponse = $fiveMinVideoSuggest->getVideos($content,$title);	

	die($jsonResponse);	
}