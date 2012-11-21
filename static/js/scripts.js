if( typeof(Fivemin) == 'undefined')
	Fivemin = {};

Fivemin.ColorSchemes = Fivemin.ColorSchemes || {
		0: {
			themeColor: "#191919",
			vcdBgColor: "#191919",
            colorPallet: "#FFEB00",
			},
		1: {
			themeColor: "#7EC359",
			vcdBgColor: "#2E7720",
			colorPallet: "#93C47D"
			},
		2: {
			themeColor: "#E50030",
			vcdBgColor: "#CC0000",
			colorPallet: "#EA9999"
			},
		3: {
			themeColor: "#006699",
			vcdBgColor: "#006699",
			colorPallet: "#9FC5E8"
			},
		4: {
			themeColor: "#FB612B",
			vcdBgColor: "#FF6600",
			colorPallet: "#F9CB9C"
			},
		5: {
			themeColor: "#C1BCBD",
			vcdBgColor: "#656565",
			colorPallet: "#B4B4B4"
			},
		6: {
			themeColor: "#923DF4",
			vcdBgColor: "#592E7B",
			colorPallet: "#B4A7D6"
			},
		7: {
			themeColor: "#5DC0E9",
			vcdBgColor: "#79B0CB",
			colorPallet: "#CFE2F3"
			},
			
};

Fivemin.AdminPage = function() {
	
	this.selectTheme = function() {
		// checks if the current selected theme has been customized
		var selTheme = jQuery("#fivemin-selected-color-scheme").val();
		var bgCol = jQuery("#vcdBgColor").val();
		var palletCol = jQuery("#colorPallet").val();
		
		jQuery(".color-scheme").each(function(){
			jQuery(this).removeClass("selected-color-scheme");
		});
		
		
		if( Fivemin.ColorSchemes[selTheme].vcdBgColor == bgCol && Fivemin.ColorSchemes[selTheme].colorPallet == palletCol ) {
				// mark the colorscheme as selected
				jQuery(".color-scheme[data-color='"+ selTheme +"']").addClass("selected-color-scheme");
		}
	};
	
	this.getSizeVal = function(width, height) {

		var mode = jQuery("#videoSuggest_fivemin-player-size-type").val();

		if(width != null) {
			// calculate the height
			if( mode == 'custom'){
				if( width < 300 ) {
					this.showSizeError();
					return [300, 250];
				}
				else
					return [width, jQuery("#videoSuggest_fivemin-player-size-height").val()]
			}
			
			if( mode == 'normal' ) {
				if(width < 300) {
					this.showSizeError();
					return [300, 255];
				}
				else
					return [width, Math.round((width / 4 * 3) + 30)]
			}
			if( mode == 'wide' ){
				if(width < 391) {
					this.showSizeError();
					return [391, 250];
				}
				else
					return [width, Math.round((width / 16 * 9) + 30)]
			}
		}
		else {
			// calculate the width
			if( mode == 'custom'){
				if( height < 250 ) {
					this.showSizeError();
					return [300, 250];
				}
				else
					return [jQuery("#videoSuggest_fivemin-player-size-width").val(), 250]
			}
			
			if( mode == 'normal' ) {
				if(height < 255) {
					this.showSizeError();
					return [300, 255];
				}
				else
					return [Math.round((height - 30) / 3 * 4), height]
			}
			if( mode == 'wide' ){
				if(height < 250) {
					this.showSizeError();
					return [391, 250];
				}
				else
					return [Math.round((height-30) / 9 * 16), height]
			}
		}
		
				
	};
		
	this.showSizeError = function() {
		var mode = jQuery("#videoSuggest_fivemin-player-size-type").val();
		switch(mode) {
				case 'wide':
					jQuery(".player-size-error .width").html("391");
					jQuery(".player-size-error .height").html("250");
					break;
				case 'normal':
					jQuery(".player-size-error .width").html("300");
					jQuery(".player-size-error .height").html("255");
					break;
				case 'custom':
					jQuery(".player-size-error .width").html("300");
					jQuery(".player-size-error .height").html("250");
					break;
		}
		
		jQuery("#videoSuggest_fivemin-player-size-width").addClass("error");
		jQuery("#videoSuggest_fivemin-player-size-height").addClass("error");
		
		jQuery(".player-size-error").show();
		setTimeout(function() {
			jQuery("#videoSuggest_fivemin-player-size-width").removeClass("error");
			jQuery("#videoSuggest_fivemin-player-size-height").removeClass("error");
			jQuery(".player-size-error").hide();
		}, 3000);
				
		
	};
		
	var self = this;
	
	this.selectTheme();
	
	// bind the theme choser
	jQuery(".color-scheme").click(function(){
		var selTheme = jQuery(this).attr("data-color");
		
		jQuery("#fivemin-selected-color-scheme").val(selTheme);
		
		jQuery("#vcdBgColor").val( Fivemin.ColorSchemes[selTheme].vcdBgColor);
		jQuery("#colorPallet").val( Fivemin.ColorSchemes[selTheme].colorPallet);
		
		jQuery("#vcdBgColor-icon span").css({'background-color': Fivemin.ColorSchemes[selTheme].vcdBgColor});
		jQuery("#colorPallet-icon span").css({'background-color': Fivemin.ColorSchemes[selTheme].colorPallet});
		
		jQuery('#vcdBgColor').ColorPickerSetColor(Fivemin.ColorSchemes[selTheme].vcdBgColor);
		jQuery('#colorPallet').ColorPickerSetColor(Fivemin.ColorSchemes[selTheme].colorPallet);
		
		self.selectTheme();
		
	});
	
	jQuery("#vcdBgColor").ColorPicker({
		color: jQuery("#vcdBgColor").val(),
		onShow: function(colpkr) {
			jQuery(colpkr).fadeIn(200);
			return false;
		},
		onHide: function (colpkr) {
			jQuery(colpkr).fadeOut(200);
			self.selectTheme();
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			jQuery("#vcdBgColor-icon span").css('backgroundColor', '#' + hex);
			jQuery("#vcdBgColor").val("#"+hex);
		}
	});

	jQuery("#colorPallet").ColorPicker({
		color: jQuery("#colorPallet").val(),
		onShow: function(colpkr) {
			jQuery(colpkr).fadeIn(200);
			return false;
		},
		onHide: function (colpkr) {
			jQuery(colpkr).fadeOut(200);
			self.selectTheme();
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			jQuery("#colorPallet-icon span").css('backgroundColor', '#' + hex);
			jQuery("#colorPallet").val("#"+hex);
		}
	});

	
	jQuery("#colorPallet-icon span, #vcdBgColor-icon span").click(function(){
		jQuery(this).parent().siblings("input").trigger("click");
	});

	jQuery("#fivemin-ad-unit-location").change(function(){
		if(jQuery(this).val() == "custom") 
			jQuery("#custom-ad-position-row").show();
		else
			jQuery("#custom-ad-position-row").hide();
		
	});


	jQuery("#fivemin-videoGroup-select").change(function(){
		if(jQuery(this).val() == "0") 
			jQuery("#playlist-id-row").show();
		else
			jQuery("#playlist-id-row").hide();
		
	});

	jQuery("#videoSuggest_fivemin-related-mode").change(function(){
		if(jQuery(this).val() != "2" && jQuery(this).val() != "3") 
			jQuery("#related-height-row").hide();
		else
			jQuery("#related-height-row").show();
	});
	
	jQuery("#videoSuggest_fivemin-player-size-width, #videoSuggest_fivemin-player-size-height").blur(function(){
		var currProp = jQuery(this).attr("data-prop");
		var currValue = jQuery(this).val();
		
		if(currProp == "width") {
			var sizes = self.getSizeVal(currValue);
			jQuery(this).val(sizes[0]);
			jQuery("#videoSuggest_fivemin-player-size-height").val(sizes[1]);
		}
		else if(currProp == "height") {
			var sizes = self.getSizeVal(null, currValue);
			jQuery(this).val(sizes[1]);
			jQuery("#videoSuggest_fivemin-player-size-width").val(sizes[0]);
		}
		
	});
	
	jQuery("#videoSuggest_fivemin-player-size-type").change(function(){
		// change the sizes
		var sizes = self.getSizeVal(jQuery("#videoSuggest_fivemin-player-size-width").val()  );
		jQuery("#videoSuggest_fivemin-player-size-width").val(sizes[0]);
		jQuery("#videoSuggest_fivemin-player-size-height").val(sizes[1]);
	});
	
}
