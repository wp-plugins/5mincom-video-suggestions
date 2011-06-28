<?php
/***************************************************************************

Plugin Name: FiveMin Video Suggest
Plugin URI: http://pshared.5min.com/wordpress/FiveMinVideoSuggestWPPlugin.zip
Description: Suggests videos for your post, based on 5min semantic engine.
Version: 0.2
Author: 5Min Media
Author URI: http://www.5min.com

***************************************************************************/

//Include class
require('FiveminVideoSuggestCls.php');

function FiveMinVideoSuggest_admin_init() {
wp_enqueue_script('fivemin-baseconfig',WP_PLUGIN_URL . "/FiveMinVideoSuggestWPPlugin/js/Fivemin.BaseConfig.js");
	wp_enqueue_script('fivemin-lib',WP_PLUGIN_URL . "/FiveMinVideoSuggestWPPlugin/js/Fivemin.Lib.js");
	
	wp_enqueue_script('fivemin-jquery',WP_PLUGIN_URL . "/FiveMinVideoSuggestWPPlugin/js/Fivemin.JQuery.js");
	wp_enqueue_script('fivemin-lightbox',WP_PLUGIN_URL . "/FiveMinVideoSuggestWPPlugin/js/Fivemin.lightbox.js");
	wp_enqueue_script('fivemin-video-suggest',WP_PLUGIN_URL . "/FiveMinVideoSuggestWPPlugin/js/Fivemin.wp.plugin.js");
	wp_enqueue_style('fivemin-video-css',  WP_PLUGIN_URL . "/FiveMinVideoSuggestWPPlugin/css/style.css");
}

function FiveMinVideoSuggest_init() {
	add_meta_box('FiveMinVideoSuggest', 'FiveMin Video Suggest', 'FiveMinVideoSuggestBox', 'post', 'normal', 'high');
}
function FiveMinVideoSuggestBox() {
	?>
	<div class='fivemin-videosuggestbox'>
		<div class='head'>
			<input type=text class='txt_ipt'/>
			<input type="button" class="button" onclick="FIVEMIN.VideoSuggestPlugin.getSearchResults()" value="Search" />
			<input type="button" class="button" onclick="FIVEMIN.VideoSuggestPlugin.getVideoSuggest()" value="Get Video Suggestions" />
		</div>
		<div id="FiveMin_VideoSuggestion_Msg">&nbsp;</div>
		<br/>
		<div id="FiveMin_VideoSuggestions" >&nbsp;	</div>
		<div style="clear: both"></div>
	</div>
<?php	
}



// this function will authorize the data-product / data-params attributes we want to chuck into the img element.
function add_fivemin_to_mce_options( $init ) {
    // Command separated string of extended elements
    $ext = 'img[*]';

    // Add to extended_valid_elements if it alreay exists
    if ( isset( $init['extended_valid_elements'] ) ) {
        $init['extended_valid_elements'] .= ',' . $ext;
    } else {
        $init['extended_valid_elements'] = $ext;
    }

    // Super important: return $init!
    return $init;
}


function add_5min_video($content) {
	$szSearchPattern = '~<img class="fiveminVideoPlayer" [^>]* />~';
	
	preg_match_all($szSearchPattern, $content, $media);
	for($i=0; $i<count($media[0]); $i++)
	{
		$img = ($media[0][$i]);
		preg_match_all('/data-params="(.+?)"/',$img,$params);
		/*
		Array ( [0] => Array ( [0] => data-params="517061814" ) [1] => Array ( [0] => 517061814 ) ) Array ( [0] => Array ( [0] => data-params="500048780" ) [1] => Array ( [0] => 500048780 ) ) 
		*/
		if (count($params)!=0){
			$paramsAttribute= $params[1][0];
			// todo split by comma and implement parameters ....

			$videoId = $paramsAttribute;

			$vCode = "<div style='text-align:center'><object width='480' height='401' id='FiveminPlayer' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'><param name='allowfullscreen' value='true'/><param name='allowScriptAccess' value='always'/><param name='movie' value='http://embed.5min.com/".$videoId."/&sid=203'/><embed name='FiveminPlayer' src='http://embed.5min.com/".$videoId."/&sid=203' type='application/x-shockwave-flash' width='480' height='401' allowfullscreen='true' allowScriptAccess='always'></embed></object></div>";
			
			$content = str_replace($img, $vCode, $content);
			
		}
	}
	return $content;
}

// add pre post render hook so we can convert img's to videos (thats where the magic is done)
add_filter('the_content','add_5min_video');

// validate fivemin attributes in img element inside tinymce
add_filter('tiny_mce_before_init', 'add_fivemin_to_mce_options');
//Register an AJAX hook for the get videos function
add_action('wp_ajax_FiveMin_getVideos', 'FiveMin_getVideos');
add_action('wp_ajax_FiveMin_getSearchResults', 'FiveMin_getSearchResults');
//Initialization to add the box to the post page
add_action('admin_menu', 'FiveMinVideoSuggest_init');
//Initialization to add css and js
add_action('admin_init', 'FiveMinVideoSuggest_admin_init');



function FiveMin_getSearchResults() {
	header('Content-type: application/json');
	$term = stripslashes($_POST['searchTerm']);
	
	$fiveMinVideoSuggest = new FiveminVideoSuggestCls();
	$jsonResponse = $fiveMinVideoSuggest->getSearchResults($term);	

	die($jsonResponse);	
}

function FiveMin_getVideos() {
	header('Content-type: application/json');
	$content = stripslashes($_POST['text']);
	$title = stripslashes($_POST['title']);
	
	$fiveMinVideoSuggest = new FiveminVideoSuggestCls();
	$jsonResponse = $fiveMinVideoSuggest->getVideos($content,$title);	

	die($jsonResponse);	
}

?>