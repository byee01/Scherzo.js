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
			randomness: 100, /* Controls the randomness of events.  ie, 20/100 = 20% */
			delay: 1000,

			blur: 2,
			textElements: ['p', 'a', 'strong', 'em', 'h1', 'h2', 'h3', 'h4'],

			offset: 10,

			curses: ['poop', 'penis', 'lol', 'dildo'],

			rotate: 180, /* How much to rotate images */

			disableForms: true,

			yt: 'CD2LRROpph0', /* YouTube URL - Friday */

			timeoutTime: 3000,
			defaultTitle: document.title,
			pageTitles: [
				'My poop is green.',
				'boiling water 101',
				'cheap hookers near pittsburgh, pa',
				'boobs',
				'justin beiber sexy pics',
				'how do i shot web',
				'Has anyone really been far even as decided to use even go want to do look more like?'
			]


		}; 
		/* Supported options */
		/*
		tourettesFreq: int, % of spaces converted to bad words
		rotateFreq: int, % of images rotated
		sillyScrollFreq: int, % of times scroll messes up
		ytFreq: int, % of time redirect to YouTube link

		*/
        
        //Extend those options
        var options = $.extend(defaults, options); 
	
        return this.each(function() {

		// ==============
		// ! EVIL FUNCTIONS   
		// ==============

			/***** Utility *****/
			/* boolean */
			/* Returns true/false based off of the parameter: randomness/100 */
			function randomNum(randNum) {
				randNum = randNum || options.randomness;
				/* Didn't work.
				return 4;
				*/
				return Math.floor(Math.random()*101) < randNum ? true : false;
			}

			/* Rotates element */			
			function rotateElem(elem, rotate) {
				rotate = rotate || options.rotate;
				$(elem).css({
					'-webkit-transform': 'rotate(' + rotate + 'deg)',
					'-moz-transform': 'rotate(' + rotate + 'deg)',
					transform: 'rotate(' + rotate + 'deg)'
				});
			}

			/***** Text Shadow *****/
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

			function addMoreTextShadow() {
				/* To do */
			}

			function addTextShadow() {

				options.textElements.map(function(value) {
					var textElem = $(value);
					if(textElem.css('color') != undefined) {
						var textColor = rgbToHex(textElem.css('color'));

						textElem.css('textShadow',
							textColor + ' 0 0 ' + options.blur + 'px, '
							+ textColor + ' 0 0 ' + options.blur + 'px'
						);
						/*
						textElem.live('mouseover', addMoreTextShadow(textElem));
						*/
					}
				});				
			}

			/***** Runaway Links *****/

			function addRunawayLinks() {
				$('a').hover( function(event) {
					var elem = $(event.target);
					
					elem.css('position', 'relative');

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
			}

			/***** Tourettes Syndrom *****/

			function randomCurse() {
				return options.curses[(Math.floor(Math.random()*options.curses.length))];
			}

			function addTourettes() {
				$("input[type=text]").keypress(function(event){
					if(randomNum(options.tourettesFreq) && event.keyCode == 32) {
						event.currentTarget.value += " "+randomCurse().toUpperCase();
					}

				});
			}


			/***** Rotate Images *****/

			function addRotateImg() {
				$("img").each(function() {
					if(randomNum(options.rotateFreq)) {
						rotateElem(this);
					}
				});
			}

			/***** Disable Buttons *****/

			function addDisabledForms() {
				if(options.disableForms) {
					$("form").submit(function() { return false;});
				}
			}

			/***** Silly Scroll *****/
			function scrollToTop() {
				console.log("lolrandom");
				if(randomNum(options.sillyScrollFreq)) {				
					$('body').animate({scrollTop : 0},'slow')	
				}
			}

			function addSillyScroll() {
				options.sillyScrollInterval = options.sillyScrollInterval || options.delay;
				console.log("lolrandom");
				if(randomNum(options.sillyScrollFreq)) {				
					$('body').stop().animate({scrollTop : 0},'slow')	
				}
				setTimeout(addSillyScroll, options.sillyScrollInterval );
				/* Can't get this to work right now */
				/*
				$(window).scroll(function() {
					if(randomNum(options.sillyScrollFreq)) {
						console.log("gotcha!");
						$('body').animate({scrollTop : 0},'slow');
					}
				})
				*/
			}

			/***** YouTube Redirect *****/
			function addYouTubeRedirect() {
				$('a').click(function(){
					window.location.href = "http://www.youtube.com/watch?v=" + options.yt;	
				})
			}

			/***** TimeoutTitle *****/
			function switchTitle() {
				document.title = options.pageTitles[Math.floor(Math.random()*options.pageTitles.length)];
			}

			function addTimeoutTitle() {
				var timeoutTimer = setTimeout(switchTitle, options.timeoutTime);
				$('body').bind('mousemove keydown', function(event) {
					document.title  =  options.defaultTitle;
					clearTimeout(timeoutTimer);
					timeoutTimer = setTimeout(switchTitle, options.timeoutTime);
				});
			}


// ==============
// ! EVIL CODE GOES HERE   
// ==============

			/***** Text Shadow *****/
			addTextShadow();

			/***** Runaway Links *****/
			addRunawayLinks();

			/***** Tourettes *****/
			addTourettes();

			/***** Rotate Images *****/
			addRotateImg();

			/***** Disable Forms *****/
			addDisabledForms();

			/***** Silly Scroll *****/
			addSillyScroll();

			/***** YouTube Redirect *****/
			addYouTubeRedirect();

			/***** TimeoutTitle *****/
			addTimeoutTitle();

        });//each call
    }//eyeexam plugin call
})(jQuery);


/* Bad form, I know, but these are my testing functions */
/* TESTING
			var y = 0;
			var z = 0;
			for(var x = 0; x < 100; x++) {
				randomNum() ? y++ : z++;
			}
			console.log("Y: " + y + ", Z: " + z);
*/