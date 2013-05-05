<div class="wrap">
		<h2>Aol Videos</h2>

		<form method="post" action="">
			<table class="form-table">
				
				<tr valign="top">
					<th scope="row"><h3>General Options</h3></th>
					<td> </td>
				</tr>
				
				<tr valign="top">
					<th scope="row">Sid</th>
					<td>
						<input id="videoSuggest_text_string" name="videoSuggest_options[sid]" size="40" type="text" value="<?php if ( isset( $options['sid'] ) ) echo intval( $options['sid'] ); ?>" />
					</td>
				</tr>
				 
				<tr valign="top">
					<th scope="row">Api name</th>
					<td>
						<input id="videoSuggest_api_name" name="videoSuggest_options[api]" size="40" type="text" value="<?php if ( isset( $options['api'] ) ) echo $options['api']; ?>" />
					</td>
				</tr>
				
				<tr valign="top">
					<th scope="row">Custom tag</th>
					<td>
						<input id="videoSuggest_tag" name="videoSuggest_options[tag]" size="40" type="text" value="<?php if ( isset( $options['tag'] ) ) echo $options['tag']; ?>" />
					</td>
				</tr>
				
				<tr valign="top">
					<th scope="row"></th>
					<td>
						This tag will be automatically added to the post when you insert a video using the plugin.
					</td>
				</tr>
				
				<tr valign="top">
					<th scope="row"><h3>Default Layout Settings</h3></th>
					<td> </td>
				</tr>
				
				<tr valign="top">
					<th scope="row">Related Videos panel</th>
					<td>
						<select id="fivemin-videoGroup-select" name="videoSuggest_options[fivemin-videoGroup-select]">
							<?php  
								if(!isset( $options['fivemin-videoGroup-select'] ))
									$options['fivemin-videoGroup-select'] = "-2";
							?>
							<option value="-2" <?php echo ($options['fivemin-videoGroup-select'] == '-2')?'selected="selected"':''; ?> >Your Video Selections (above)</option>
							<option value="-1" <?php echo ($options['fivemin-videoGroup-select'] == '-1')?'selected="selected"':''; ?> >Semantic Related</option>
							<option value="0" <?php echo ($options['fivemin-videoGroup-select'] == '0')?'selected="selected"':''; ?> >Playlist Id</option>
						</select>
					</td>
				</tr>				
				
				<tr valign="top" id="playlist-id-row" class="playlist-id-row" style="<?php echo ($options['fivemin-videoGroup-select'] != '0')?'display: none;':''; ?>" >
					<th scope="row">Playlist Id</th>
					<td>
						<input id="fivemin-custom-videogroupId" name="videoSuggest_options[fivemin-custom-videogroupId]" size="40" type="text" value="<?php if ( isset( $options['fivemin-custom-videogroupId'] ) ) echo $options['fivemin-custom-videogroupId']; ?>" />
					</td>
				</tr>
				
				<tr valign="top">
					<th scope="row">Player aspect ratio</th>
					<td>
						<select id="videoSuggest_fivemin-player-size-type" name="videoSuggest_options[fivemin-player-size-type]">
							<?php  
								if(!isset( $options['fivemin-player-size-type'] ))
									$options['fivemin-player-size-type'] = "wide";
							?>
							<option value="wide" <?php echo ($options['fivemin-player-size-type'] == 'wide')?'selected="selected"':''; ?> >16:9  Ratio</option>
							<option value="normal" <?php echo ($options['fivemin-player-size-type'] == 'normal')?'selected="selected"':''; ?>>4:3 Ratio</option>
							<option value="custom" <?php echo ($options['fivemin-player-size-type'] == 'custom')?'selected="selected"':''; ?>>Custom</option>
						</select>
					</td>
				</tr>
				
				<tr valign="top" class="player-size-error-row">
					<th scope="row"></th>
					<td>
						<span class="player-size-error">Player minimum size of the player is: <span class="width"></span>X<span class="height"></span> </span>
					</td>
				</tr>
				
				<tr valign="top">
					<th scope="row">Player Width</th>
					<td>
						<input id="videoSuggest_fivemin-player-size-width" data-prop="width" name="videoSuggest_options[fivemin-player-size-width]" size="40" type="text" value="<?php if ( isset( $options['fivemin-player-size-width'] ) ) echo $options['fivemin-player-size-width']; ?>" />px
					</td>
				</tr>
				
				<tr valign="top">
					<th scope="row">Player Height</th>
					<td>
						<input id="videoSuggest_fivemin-player-size-height" data-prop="height" name="videoSuggest_options[fivemin-player-size-height]" size="40" type="text" value="<?php if ( isset( $options['fivemin-player-size-height'] ) ) echo $options['fivemin-player-size-height']; ?>" />px
					</td>
				</tr>
				
				<tr valign="top">
					<th scope="row">Related Video Pane Position</th>
					<td>
						<select id="videoSuggest_fivemin-related-mode" name="videoSuggest_options[fivemin-related-mode]">
							<?php  
								if(!isset( $options['fivemin-related-mode'] ))
									$options['fivemin-related-mode'] = 2;
							?>
							<option value="2" <?php echo ($options['fivemin-related-mode'] == '2')?'selected="selected"':''; ?> >Bottom(Default)</option>
							<option value="3" <?php echo ($options['fivemin-related-mode'] == '3')?'selected="selected"':''; ?>>Open Bottom</option>
							<option value="1" <?php echo ($options['fivemin-related-mode'] == '1')?'selected="selected"':''; ?>>Auto Height</option>
							<option value="101" <?php echo ($options['fivemin-related-mode'] == '101')?'selected="selected"':''; ?>>Right</option>
							<option value="0" <?php echo ($options['fivemin-related-mode'] == '0')?'selected="selected"':''; ?>>None</option>
						</select>
					</td>
				</tr>
				
				<tr valign="top"  id="related-height-row" style="<?php echo ( $options['fivemin-related-mode'] != '2' && $options['fivemin-related-mode'] != '3') ? "display: none;" : "" ?>">
					<th scope="row">Related Pane Height (px) Min 60, Max 300</th>
					<td>
						<input id="fivemin-related-height-custom" name="videoSuggest_options[fivemin-related-height-custom]" size="40" type="text" value="<?php echo ( isset($options['fivemin-related-height-custom']) && !empty($options['fivemin-related-height-custom'])) ? $options['fivemin-related-height-custom'] : "60"; ?>" />px
					</td>
				</tr>
				
				<tr valign="top">
					<th scope="row">Ad unit location</th>
					<td>
						<select id="fivemin-ad-unit-location" name="videoSuggest_options[fivemin-ad-unit-location]">
							<?php  
								if(!isset( $options['fivemin-ad-unit-location'] ))
									$options['fivemin-ad-unit-location'] = "";
							?>
							<option value="" <?php echo ($options['fivemin-ad-unit-location'] == '')?'selected="selected"':''; ?> >None (Default)</option>
							<option value="custom" <?php echo ($options['fivemin-ad-unit-location'] == 'custom')?'selected="selected"':''; ?>>Custom</option>
							<option value="below" <?php echo ($options['fivemin-ad-unit-location'] == 'below')?'selected="selected"':''; ?>>Below</option>
							<option value="right" <?php echo ($options['fivemin-ad-unit-location'] == 'right')?'selected="selected"':''; ?>>Right</option>
							<option value="left" <?php echo ($options['fivemin-ad-unit-location'] == 'left')?'selected="selected"':''; ?>>Left</option>
							<option value="top" <?php echo ($options['fivemin-ad-unit-location'] == 'top')?'selected="selected"':''; ?>>Above</option>
						</select>
					</td>
				</tr>
				
				<tr valign="top" id="custom-ad-position-row" style="<?php echo ( $options['fivemin-ad-unit-location'] != 'custom') ? "display: none;" : "" ?>">
					<th scope="row">Custom ad position</th>
					<td>
						<input id="fivemin-cb-custom-id" name="videoSuggest_options[fivemin-cb-custom-id]" size="40" type="text" value="<?php echo ( isset($options['fivemin-cb-custom-id'])) ? $options['fivemin-cb-custom-id'] : ""; ?>" />
					</td>
				</tr>
				
				<tr valign="top">
					<th scope="row">Show Title</th>
					<td>
						<input id="fivemin-showTitle" name="videoSuggest_options[fivemin-showTitle]" type="checkbox" <?php echo ( isset($options['fivemin-showTitle']) && $options['fivemin-showTitle'] == "true") ? "checked='checked'" : ""; ?> />
					</td>
				</tr>
				
				<tr valign="top">
					<th scope="row">Custom Title</th>
					<td>
						<input id="fivemin-title" name="videoSuggest_options[fivemin-title]" size="40" type="text" value="<?php echo ( isset($options['fivemin-title'])) ? $options['fivemin-title'] : ""; ?>" />
					</td>
				</tr>
				
				<tr valign="top">
					<th scope="row"><h3>Default Advanced Options</h3></th>
					<td> </td>
				</tr>
				
				<tr valign="top">
					<th scope="row">Autostart</th>
					<td>
						<input id="fivemin-autoStart" name="videoSuggest_options[fivemin-autoStart]" type="checkbox" <?php echo ( isset($options['fivemin-autoStart']) && $options['fivemin-autoStart'] == "true") ? "checked='checked'" : ""; ?> />
					</td>
				</tr>
				
				<tr valign="top">
					<th scope="row">Play Videos as Playlist (one after the other)</th>
					<td>
						<input id="fivemin-continuous" name="videoSuggest_options[fivemin-continuous]" type="checkbox" <?php echo ( isset($options['fivemin-continuous']) && $options['fivemin-continuous'] == "true") ? "checked='checked'" : ""; ?> />
					</td>
				</tr>
				
				<tr valign="top">
					<th scope="row">Shuffle Videos every page load</th>
					<td>
						<input id="fivemin-shuffle" name="videoSuggest_options[fivemin-shuffle]" type="checkbox" <?php echo ( isset($options['fivemin-shuffle']) && $options['fivemin-shuffle'] == "true") ? "checked='checked'" : ""; ?> />
					</td>
				</tr>
				
				<tr valign="top">
					<th scope="row">Default color theme</th>
					<td>
						<?php  
							$selected = (isset($options['fivemin-selected-color-scheme'])) ? $options['fivemin-selected-color-scheme'] : "0";
						?>
						<input id="fivemin-selected-color-scheme" name="videoSuggest_options[fivemin-selected-color-scheme]" type="hidden" value="<?php echo $selected; ?>" />
						
						<ul class="color-scheme-list">
							<li class="color-scheme" data-color="0">
								<span style="background-color: #191919; "></span>
							</li>
							
							<li class="color-scheme" data-color="1">
								<span style="background-color: #7EC359; "></span>
							</li>
							
							<li class="color-scheme" data-color="2">
								<span style="background-color: #E50030; "></span>
							</li>
							
							<li class="color-scheme" data-color="3">
								<span style="background-color: #006699; "></span>
							</li>
							
							<li class="color-scheme" data-color="4">
								<span style="background-color: #FB612B; "></span>
							</li>
							
							<li class="color-scheme" data-color="5">
								<span style="background-color: #C1BCBD; "></span>
							</li>
							
							<li class="color-scheme" data-color="6">
								<span style="background-color: #923DF4; "></span>
							</li>
							
							<li class="color-scheme" data-color="7">
								<span style="background-color: #5DC0E9; "></span>
							</li>
						</ul>
						
						
					</td>
				</tr>
				
				<tr valign="top">
					<th scope="row">Panel Color</th>
					<td>
						<span id="vcdBgColor-icon" class="colorpicker-trigger"><span style="background-color: <?php echo ( isset($options['vcdBgColor'])) ? $options['vcdBgColor'] : "#191919"; ?>; "></span></span>
						<input id="vcdBgColor" name="videoSuggest_options[vcdBgColor]" size="40" type="text" value="<?php echo ( isset($options['vcdBgColor'])) ? $options['vcdBgColor'] : "#191919"; ?>" />
					</td>
				</tr>
				
				<tr valign="top">
					<th scope="row">Buttons Theme</th>
					<td>
						<span id="colorPallet-icon" class="colorpicker-trigger"><span style="background-color: <?php echo ( isset($options['colorPallet'])) ? $options['colorPallet'] : "#FFEB00"; ?>; "></span></span>
						<input id="colorPallet" name="videoSuggest_options[colorPallet]" size="40" type="text" value="<?php echo ( isset($options['colorPallet'])) ? $options['colorPallet'] : "#FFEB00"; ?>" />
					</td>
				</tr>
				
			</table>
			
			<?php submit_button(); ?>

		</form>
		<script type="text/javascript">
			jQuery(document).ready(function(){
				Fivemin.AdminPage();
			});
		</script>
		
</div>
