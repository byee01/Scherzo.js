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

        //Defaults to extend options
		var defaults = {
			delay: 800,
			textElements: ['p', 'h1', 'h2', 'h3', 'h4']
		}; 
        
        //Extend those options
        var options = $.extend(defaults, options); 
	
        return this.each(function() {
			/* Utility Functions */

			/* rgbToHex, converts RGB to hex as a string with a '#' */
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


			/* Include evil code here */

			/* Text Shadow */

			options.textElements.map(function(value) {
				var textElem = $(value);
				if(textElem.css('color') != undefined) {
					var textColor = rgbToHex(textElem.css('color'));

					textElem.css('textShadow',
						textColor + ' 0 2px 2px, '
						+ textColor + ' 0 -2px 2px'
					);
				}
			});


        });//each call
    }//eyeexam plugin call
})(jQuery);
        