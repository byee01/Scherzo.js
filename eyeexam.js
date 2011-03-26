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

	$.fn.orbit = function(options) {

		var defaults = {
			delay: 800
		};

		var options = $.extend(defaults, options);

		return this.each(function() {


		/* Include evil code here */
		$('h1').css('color', 'green');
		console.log("Oh hi!");
		});
	}
})(jQuery);
