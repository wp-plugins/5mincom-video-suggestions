<?php
/***************************************************************************

Plugin Name: Aol Video Suggest
Plugin URI: http://www.5minmedia.com
Description: Suggests videos for your post, based on Aol Video semantic engine.
Version: 1.1
Author: 5Min Media
Author URI: http://www.5minmedia.com

***************************************************************************/

class FiveMinVideoSuggest {

	public function __construct() {
		add_filter( 'the_content', array( $this, 'the_content' ) );
		add_filter( 'tiny_mce_before_init', array( $this, 'tiny_mce_before_init' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ) );
		add_action( 'admin_print_styles-post.php', array( $this, 'admin_print_styles' ) );
		add_action( 'admin_print_styles-post-new.php', array( $this, 'admin_print_styles' ) );
		add_action( 'admin_init', array( $this, 'admin_init' ) );
	}

	function admin_print_styles() {
		wp_enqueue_script('fivemin-plugin',"http://pshared.5min.com/Scripts/Plugin.js?c=0&v=2");
		wp_enqueue_style('fivemin-video-css',  "http://pshared.5min.com/Css/Plugin/Base.css");
	}

	function add_meta_boxes() {
		add_meta_box('FiveMinVideoSuggest', 'Aol Video Suggest', array( $this, 'meta_box_callback' ), 'post', 'side', 'high');
	}

	function meta_box_callback() {
		$options = get_option('videoSuggest_options');
		$sid = ( isset( $options['sid'] ) && 0 != $options['sid'] ) ? intval( $options['sid'] ) : 203;
		?>
		<div class='fivemin-videosuggestbox'>
			<div id="fivemin-plugin" data-api="Wordpress" data-params="sid=<?php echo $sid; ?>"></div>
		</div>
		<?php
	}

	// Makes tinymce allow any attribute in the img element so we can add the data-product / data-params attributes we want.
	function tiny_mce_before_init( $init ) {
		$init['extended_valid_elements'] = isset( $init['extended_valid_elements'] ) ? $init['extended_valid_elements'] . ',img[*]' : 'img[*]';
		return $init;
	}


	// filter the_content to convert img's to videos (thats where the magic is done)
	function the_content($content) {
		
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

				$passedParams=implode("&",$splitted);
				
				$playerSeed = '<div style="overflow:hidden;"><script type="text/javascript" src="http://pshared.5min.com/Scripts/PlayerSeed.js?'.$passedParams.'"></script></div>';

				$content = str_replace($img, $playerSeed, $content);

			}
		}
		return $content;
	}



	// Add settings link on plugin page
	function plugin_action_links($links) {
		$settings_link = '<a href="options-media.php#videoSuggest">Settings</a>';
		array_unshift($links, $settings_link);
		return $links;
	}

	function admin_init(){
		register_setting( 'media', 'videoSuggest_options', array( $this, 'sanitize_options' ) );
		add_settings_section( 'videoSuggest_main', '5min Settings', '__return_false', 'media' );
		add_settings_field( 'videoSuggest_text_string', 'Syndicator Id', array( $this, 'settings_field_callback' ), 'media', 'videoSuggest_main' );

		add_filter( 'plugin_action_links_' . plugin_basename(__FILE__), array( $this, 'plugin_action_links' ) );
	}

	function sanitize_options( $input ) {
		$new_input['sid'] = isset( $input['sid'] ) ? intval( $input['sid'] ) : 0;
		return $new_input;
	}

	function settings_field_callback() {
		$options = get_option('videoSuggest_options');
		?>
		<a name="videoSuggest"></a>
		<input id="videoSuggest_text_string" name="videoSuggest_options[sid]" size="40" type="text" value="<?php if ( isset( $options['sid'] ) ) echo intval( $options['sid'] ); ?>" />
		</br>
		<?php
	}

}

$five_min_video_suggest = new FiveMinVideoSuggest;
