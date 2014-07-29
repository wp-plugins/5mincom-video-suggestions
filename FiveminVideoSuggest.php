<?php
/***************************************************************************

Plugin Name: The AOL On Network Video Plugin
Plugin URI: http://wordpress.org/extend/plugins/5mincom-video-suggestions/
Description: The AOL On Network's video plugin for WordPress, allows you to embed videos in your posts or pages using our vast video library. Browse, search, or use our semantic engine (which suggests videos matching the content of your post). Our player has HTML5 fallback support for non-Flash browsers. Player's Layout and Advanced Settings can be easily configured using the plugin.
Version: 1.8
Author: The AOL On Network
Author URI: http://on.aol.com

***************************************************************************/

class FiveMinVideoSuggest {

	public function __construct() {
				
		add_filter( 'the_content', array( $this, 'the_content' ) );
		add_filter( 'tiny_mce_before_init', array( $this, 'tiny_mce_before_init' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ) );
		add_action( 'admin_print_styles-post.php', array( $this, 'admin_print_styles' ) );
		add_action( 'admin_print_styles-post-new.php', array( $this, 'admin_print_styles' ) );
		add_action( 'admin_init', array( $this, 'admin_init' ) );		
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );	
	}

	function admin_print_styles() {
		wp_enqueue_script('fivemin-plugin',"https://embed.5min.com/cmsplugin");
		wp_enqueue_style('fivemin-video-css',  "https://spshared.5min.com/Css/Plugin/Base.css");
	}

	function add_meta_boxes() {
		add_meta_box('FiveMinVideoSuggest', 'Aol Video Suggest', array( $this, 'meta_box_callback' ), 'post', 'side', 'high');
	}

	function meta_box_callback() {
		$options = get_option('videoSuggest_options');
						
		$sid = ( isset( $options['sid'] ) && 0 != $options['sid'] ) ? intval( $options['sid'] ) : 203;
		$api = ( isset( $options['api'] ) && '' != $options['api'] ) ? $options['api'] : 'Wordpress';
		$tag = ( isset( $options['tag'] ) && '' != $options['tag'] ) ? $options['tag'] : '';
		
		?>
		<div class='fivemin-videosuggestbox'>
			<script type="text/javascript"> FIVEMIN.Plugins.Defaults = <?php echo json_encode($options); ?>; </script>
			<div id="fivemin-plugin" data-api="<?php echo $api; ?>" data-params="sid=<?php echo $sid; ?>"></div>
		</div>
		<?php 
			if( !empty($tag) ) {
					//TODO: add the tag to param on the div 
				?>
					<script type="text/javascript">
						jQuery(document).ready(function(){
							
							// change the add to post function from plugin
							FIVEMIN.Plugins.Api.Wordpress.addContents = function(f) {
								try {
									if (window.switchEditors) {
										window.switchEditors.go("content", "tinymce")
									}
								} catch (d) {}
								if (window.tinyMCE) {
									window.tinyMCE.execCommand("mceInsertContent", false, f)
									
									jQuery("#new-tag-post_tag").val("<?php echo $tag; ?>"); 
									jQuery(".tagadd").trigger('click');
								}
							}
						});
					</script>
		<?php	
			}
		
	}

	// Makes tinymce allow any attribute in the img element so we can add the data-product / data-params attributes we want.
	function tiny_mce_before_init( $init ) {
		$init['extended_valid_elements'] = isset( $init['extended_valid_elements'] ) ? $init['extended_valid_elements'] . ',img[*]' : 'img[*]';
		return $init;
	}

	// filter the_content to convert img's to videos (thats where the magic is done)
	function the_content($content) {
		
		$pattern = '/<img *class="[^"]*fiveminVideoPlayer[^"]*" [^>]*>/';
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
				for($j=0;$j<count($splitted);$j++){
					$keyValuePair=explode('=',$splitted[$j]);
					$paramsArray[$keyValuePair[0]]=$keyValuePair[1];
				}

				$passedParams=implode("&",$splitted);
				
		
				if(is_ssl()) {
					$playerSeed = '<div style="overflow:hidden;"><script type="text/javascript" src="https://spshared.5min.com/Scripts/PlayerSeed.js?'.$passedParams.'"></script></div>';
				}
				else{
					$playerSeed = '<div style="overflow:hidden;"><script type="text/javascript" src="http://pshared.5min.com/Scripts/PlayerSeed.js?'.$passedParams.'"></script></div>';
				}
				
				

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
		
		add_filter( 'plugin_action_links_' . plugin_basename(__FILE__), array( $this, 'plugin_action_links' ) );
		
	}
	
	/**
	 * 	Admin page bellow
	 */
	function admin_menu() {
		add_submenu_page('options-general.php', 'AOL Video Plugin','AOL Video Plugin Settings','manage_options','aolvideo-settings',array($this, 'settings_page'));
	}
	
	function settings_page() {
		
		$url = plugins_url("static", __FILE__);
		
		wp_enqueue_style('aol-videos-colorpicker-css', $url."/css/colorpicker.css");
		wp_enqueue_style('aol-videos-plugin-css', $url."/css/style.css");
		
		wp_enqueue_script('aol-videos-colorpicker-js', $url."/js/colorpicker.js");
		wp_enqueue_script('aol-videos-plugin-js', $url."/js/scripts.js");
				
		$options = get_option('videoSuggest_options');
		
		if( isset($_POST['videoSuggest_options']) ) {
		
			$data = array();
						
			// handle the player width and height			
			if( isset($_POST['videoSuggest_options']['fivemin-player-size-width']) && 
				!empty($_POST['videoSuggest_options']['fivemin-player-size-width']) && 
				isset($_POST['videoSuggest_options']['fivemin-player-size-height']) &&
				!empty($_POST['videoSuggest_options']['fivemin-player-size-height']) )
			{
				
				$data['fivemin-player-size'] = esc_attr($_POST['videoSuggest_options']['fivemin-player-size-width']) ."X". esc_attr($_POST['videoSuggest_options']['fivemin-player-size-height']);
			}
			unset($_POST['videoSuggest_options']['fivemin-player-size-width']);
			unset($_POST['videoSuggest_options']['fivemin-player-size-height']);
			
			/////
			//   checkboxes bellow
			/////
			
			// show title
			if( isset($_POST['videoSuggest_options']['fivemin-showTitle']) )
				$data['fivemin-showTitle'] = "true";
			else
				$data['fivemin-showTitle'] = "false";
			unset($_POST['videoSuggest_options']['fivemin-showTitle']);
			
			// auto start
			if( isset($_POST['videoSuggest_options']['fivemin-autoStart']) )
				$data['fivemin-autoStart'] = "true";
			else
				$data['fivemin-autoStart'] = "false";
			unset($_POST['videoSuggest_options']['fivemin-autoStart']);
			
			// Continuous play
			if( isset($_POST['videoSuggest_options']['fivemin-continuous']) )
				$data['fivemin-continuous'] = "true";
			else
				$data['fivemin-continuous'] = "false";
			unset($_POST['videoSuggest_options']['fivemin-continuous']);
			
			// Shuffle videos
			if( isset($_POST['videoSuggest_options']['fivemin-shuffle']) )
				$data['fivemin-shuffle'] = "true";
			else
				$data['fivemin-autoStart'] = "false";
			unset($_POST['videoSuggest_options']['fivemin-shuffle']);
			
			
			// custom ad position
			if( isset($_POST['videoSuggest_options']['fivemin-ad-unit-location']) && $_POST['videoSuggest_options']['fivemin-ad-unit-location'] != "custom" ) 
			{
					$_POST['videoSuggest_options']['fivemin-cb-custom-id'] = "";
			}
			
			
			// save all the options			
			foreach( $_POST['videoSuggest_options']  as $name => $option)
				$data[$name] = esc_attr($option);
			
			$res = update_option('videoSuggest_options', $data);  
			
		}
		
		$options = get_option('videoSuggest_options');
				
		if( isset($options['fivemin-player-size']) ) {
			$playerSize = explode('X', $options['fivemin-player-size']);
			$options['fivemin-player-size-width'] = $playerSize[0];
			$options['fivemin-player-size-height'] = $playerSize[1];
			
			unset($options['fivemin-player-size']);
		}
		
		// display the view
		require_once('admin_page.php');
		
	}
	
}

$five_min_video_suggest = new FiveMinVideoSuggest;
