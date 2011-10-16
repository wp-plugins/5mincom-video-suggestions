<?php
/***************************************************************************

Plugin Name: Aol Video Suggest
Plugin URI: http://pshared.5min.com/wordpress/FiveMinVideoSuggestWPPlugin.zip
Description: Suggests videos for your post, based on 5min semantic engine.
Version: 0.2
Author: 5Min Media
Author URI: http://www.5minmedia.com

***************************************************************************/

//Include class
//require('FiveminVideoSuggestCls.php');

//error_reporting(E_ALL);
//ini_set('display_errors', '1');

function FiveMinVideoSuggest_admin_init() {
    /*wp_enqueue_script('fivemin-baseconfig',WP_PLUGIN_URL . "/FiveMinVideoSuggestWPPlugin/js/Fivemin.BaseConfig.js");
	wp_enqueue_script('fivemin-lib',WP_PLUGIN_URL . "/FiveMinVideoSuggestWPPlugin/js/Fivemin.Lib.js");
	
	wp_enqueue_script('fivemin-jquery',WP_PLUGIN_URL . "/FiveMinVideoSuggestWPPlugin/js/Fivemin.JQuery.js");
	wp_enqueue_script('fivemin-lightbox',WP_PLUGIN_URL . "/FiveMinVideoSuggestWPPlugin/js/Fivemin.lightbox.js");
	wp_enqueue_script('fivemin-video-suggest',WP_PLUGIN_URL . "/FiveMinVideoSuggestWPPlugin/js/Fivemin.wp.plugin.js");
	wp_enqueue_style('fivemin-video-css',  WP_PLUGIN_URL . "/FiveMinVideoSuggestWPPlugin/css/style.css");*/
	
	wp_enqueue_script('fivemin-plugin',"http://pshared.5min.com/Scripts/Plugin.js?c=0&v=2");
	wp_enqueue_style('fivemin-video-css',  "http://pshared.5min.com/Css/Plugin/Base.css");
	
}

function FiveMinVideoSuggest_init() {
	add_meta_box('FiveMinVideoSuggest', 'Aol Video Suggest', 'FiveMinVideoSuggestBox', 'post', 'side', 'high');
}
function FiveMinVideoSuggestBox() {
	$options = get_option('videoSuggest_options');
	$sid =  (intval($options['sid']));
	if ($sid==0)
		$sid=203;
	
	?>
	<div class='fivemin-videosuggestbox'>
		<div id="fivemin-plugin" data-api="Wordpress" data-params="sid=<?=$sid?>"></div>
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
	$pattern = '/<img .*class="fiveminVideoPlayer" [^>]*>/';
 	preg_match_all($pattern , $content, $media);

	for($i=0; $i<count($media[0]); $i++)
	{
		$img = ($media[0][$i]);
		preg_match_all('/data-params="(.+?)"/',$img,$params);
		/*
		Array ( [0] => Array ( [0] => data-params="517061814" ) [1] => Array ( [0] => 517061814 ) ) Array ( [0] => Array ( [0] => data-params="500048780" ) [1] => Array ( [0] => 500048780 ) ) 
		*/
		if (count($params)!=0){
			$paramsAttribute= $params[1][0];
			
			$splitted= explode('|||', $paramsAttribute);
            $paramsArray=array();
			for($j=0;$j<=count($splitted);$j++){
				$keyValuePair=explode('=',$splitted[$j]);
				$paramsArray[$keyValuePair[0]]=$keyValuePair[1];
			}
			$videoId = $paramsArray['videoId'];
			
			$passedParams=implode("&",$splitted);
			//$passedParams=substr($passedParams,1);
			$playerSeed = '<div style="overflow:hidden;"><script type="text/javascript" src="http://pshared.5min.com/Scripts/PlayerSeed.js?'.$passedParams.'"></script></div>';
			
			$content = str_replace($img, $playerSeed, $content);
			
		}
	}
	return $content;
}

// add pre post render hook so we can convert img's to videos (thats where the magic is done)
add_filter('the_content','add_5min_video');

// validate fivemin attributes in img element inside tinymce
add_filter('tiny_mce_before_init', 'add_fivemin_to_mce_options');
//Register an AJAX hook for the get videos function
//add_action('wp_ajax_FiveMin_getVideos', 'FiveMin_getVideos');
//add_action('wp_ajax_FiveMin_getSearchResults', 'FiveMin_getSearchResults');
//Initialization to add the box to the post page
add_action('admin_menu', 'FiveMinVideoSuggest_init');
//Initialization to add css and js
add_action('admin_init', 'FiveMinVideoSuggest_admin_init');


/*
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
*/

/* settings */

// add the admin options page
add_action('admin_menu', 'plugin_admin_add_page');

// Add settings link on plugin page
function videoSuggest_settings_link($links) { 
  $settings_link = '<a href="options-general.php?page=videoSuggest">Settings</a>'; 
  array_unshift($links, $settings_link); 
  return $links; 
}
 
$plugin = plugin_basename(__FILE__); 
add_filter("plugin_action_links_$plugin", 'videoSuggest_settings_link' );

function plugin_admin_add_page() {
add_options_page('Video Suggest', 'Video Suggest', 'manage_options', 'videoSuggest', 'videoSuggest_options_page');
}

// display the admin options page
function videoSuggest_options_page() {
?>
<div>
<h2>Video suggest plugin</h2>
Options relating to the Plugin.
<form action="options.php" method="post">
<?php settings_fields('videoSuggest_options'); ?>
<?php do_settings_sections('videoSuggest'); ?>

<input name="Submit" type="submit" value="<?php esc_attr_e('Save Changes'); ?>" />
</form></div>

<?php
}

// add the admin settings and such
add_action('admin_init', 'plugin_admin_init');
function plugin_admin_init(){
	register_setting( 'videoSuggest_options', 'videoSuggest_options' );
	add_settings_section('videoSuggest_main', 'Main Settings', 'videoSuggest_section_text', 'videoSuggest');
	add_settings_field('videoSuggest_text_string', 'Syndicator Id', 'videoSuggest_setting_string', 'videoSuggest', 'videoSuggest_main');
	//add_settings_field('videoSuggest_text_string2', 'Something else', 'videoSuggest_setting_string2', 'videoSuggest', 'videoSuggest_main');
}

function videoSuggest_section_text() {
	//echo '<p>Main description of this section here.</p>';
}

function videoSuggest_setting_string() {
$options = get_option('videoSuggest_options');
echo "<input id='videoSuggest_text_string' name='videoSuggest_options[sid]' size='40' type='text' value='{$options['sid']}' />";
echo "</br>";
} 
/*
function videoSuggest_setting_string2() {
$options = get_option('videoSuggest_options');
echo "<input id='videoSuggest_text_string2' name='videoSuggest_options[something]' size='40' type='text' value='{$options['something']}' />";
echo "</br>";
} */

?>

