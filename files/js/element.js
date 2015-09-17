/**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function(){

	var CounterElement = PlatformElement.extend({
		initialize: function() {
			// Cache counter element
			this.counter = this.$('.counter-number p');

			// Flag to keep track if the counter has already animated
			// Used to prevent overlapping calls during the setInterval period
			this.animated = false;

			this.startCounter();
		},

		// Wrapper function to determine when to start animating
		startCounter: function() {
			var timing = this.settings.get('timing');

			// Animate immediately if that is the setting, or if counter is already in view.
			// Otherwise, set interval to check if the counter is in view
			if (timing === "immediate" || this.isScrolledIntoView(this.counter)) {
				this.animateNum(); 
			} else {
				this.checkView = setInterval(this.animateWhenInView.bind(this), 200);
			}
		},

		// Perform animation
		animateNum: function() {
			var counter  = this.counter;
			var start 	 = this.settings.get('start');
			var end 	 = this.settings.get('end');
			var duration = this.settings.get('duration');
			var easing   = this.settings.get('easing');

			// Execute animation
			$({num: start}).animate({num: end}, {
				easing: easing,
				duration: duration,
				step: function() {
					counter.text(Math.round(this.num));
				},
				complete: function() {
					// With step function, we sometimes end up a little bit off the final number.
					// After the animate is done, we explicitly set it to the final number to make sure.
					counter.text(end);
				}
			});
		},

		// If counter is in view and the animation hasn't been performed,
		// perform animation and end interval
		animateWhenInView: function() {
			if (this.animated === false && this.isScrolledIntoView(this.counter)) {
				this.animated = true;
				clearInterval(this.checkView);
				this.animateNum();
			}
		},


		// Helper function to determine if an element is in view
		isScrolledIntoView: function($elem) {
		    var $window = $(window);

		    var docViewTop = $window.scrollTop();
		    var docViewBottom = docViewTop + $window.height();

		    var elemTop = $elem.offset().top;
		    var elemBottom = elemTop + $elem.height();

		    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
		}
	});
	
	return CounterElement;
})();
