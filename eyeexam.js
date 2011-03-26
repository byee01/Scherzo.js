/* EyeExam.js
 * http://github.com/byee01/eyeexam.js
 *
 * Created by Brian Yee.
 * http://www.brianayee.com
 *
 * Hacked together for the Facebook Hackathon at CMU
 *
*/


(function($) {

    $.fn.eyeexam = function(options) {


// ==============
// ! SETUP AND DEFAULTS  
// ==============
        //Defaults to extend options
		var defaults = {
			delay: 800,
			blur: 2,
			textElements: ['p', 'a', 'strong', 'em', 'h1', 'h2', 'h3', 'h4'],

			offset: 10
		}; 
        
        //Extend those options
        var options = $.extend(defaults, options); 
	
        return this.each(function() {
// ==============
// ! UTILITY FUNCTIONS   
// ==============

			/***** rgbToHex*****/
			/* string */
			/* Converts RGB to hex as a string with a '#' */
			function rgbToHex(rgb) {
				if (rgb.match(/^#[0-9A-Fa-f]{6}$/)) { return rgb; }
				var rgbvals = /rgb\((.+),(.+),(.+)\)/i.exec(rgb);
				if (!rgbvals) { return rgb; }

				var rval = parseInt(rgbvals[1]);
				var gval = parseInt(rgbvals[2]);
				var bval = parseInt(rgbvals[3]);

				var pad = function(value) {
					return (value.length < 2 ? '0' : '') + value;
				};
				return '#' + pad(rval.toString(16)) + pad(gval.toString(16)) + pad(bval.toString(16));
			} 

// ==============
// ! EVIL CODE GOES HERE   
// ==============

			/***** Text Shadow *****/

			options.textElements.map(function(value) {
				var textElem = $(value);
				if(textElem.css('color') != undefined) {
					var textColor = rgbToHex(textElem.css('color'));

					textElem.css('textShadow',
						textColor + ' 0 0 ' + options.blur + 'px, '
						+ textColor + ' 0 0 ' + options.blur + 'px'
					);
				}
			});

			/***** Runaway Links *****/

			$('a').hover( function(event) {
				var elem = $(event.target);
				
				elem.css({
					position: 'relative'
				});

				var offsetAmt = {left: '+=', top: '+='};
				switch(Math.floor(Math.random()*4)) {
					case 0:
						offsetAmt.left += ''+options.offset;
						offsetAmt.top += ''+options.offset;
					break;
					case 1:					
						offsetAmt.left += '-'+options.offset;
						offsetAmt.top += ''+options.offset;
					break;
					case 2:
						offsetAmt.left += '-'+options.offset;
						offsetAmt.top += '-'+options.offset;
					break;
					case 3:
						offsetAmt.left += ''+options.offset;
						offsetAmt.top += '-'+options.offset;
					break;
				}
				elem.stop().animate({
					duration: 500,
					left: offsetAmt.left,
					top: offsetAmt.top,
  				});
			});


        });//each call
    }//eyeexam plugin call
})(jQuery);
        