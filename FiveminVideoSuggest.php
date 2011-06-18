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



add_filter('mce_external_plugins', "tinyplugin_register");
add_filter('mce_buttons', 'tinyplugin_add_button', 0);

function tinyplugin_add_button($buttons)
{
    array_push($buttons, "separator", "fiveminpagebreak");
    return $buttons;
}

function tinyplugin_register($plugin_array)
{
    $url = trim(get_bloginfo('url'), "/")."/wp-content/plugins/FiveMinVideoSuggestWPPlugin/js/editor_plugin.js";

    $plugin_array['fiveminpagebreak'] = $url;
    return $plugin_array;
}

function add_fivemin_to_mce_options( $init ) {
    // Command separated string of extended elements
    $ext = 'fivemin[videoId|width|height]';

    // Add to extended_valid_elements if it alreay exists
    if ( isset( $init['extended_valid_elements'] ) ) {
        $init['extended_valid_elements'] .= ',' . $ext;
    } else {
        $init['extended_valid_elements'] = $ext;
    }

    // Super important: return $init!
    return $init;
}


// add fivemin element to tinymce
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