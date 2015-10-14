/**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function() {

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
            // Animate immediately if counter is already in view.
            // Otherwise, set interval to check if the counter is in view
            var view = this;
            view.checkView = setInterval(function() {
                if (view.isScrolledIntoView(view.counter)) {
                    clearInterval(view.checkView);
                    view.animateNum();
                }
            }, 200);
        },

        // Perform animation
        animateNum: function() {
            var intervalCounter = 0;
            var end = this.settings.get('end');
            var duration = this.settings.get('duration');
            var view = this;

            view.animateNumInterval = setInterval(function() {
                view.counter.text(Math.round((intervalCounter * duration * 100) / end));
                intervalCounter++;
                if ((intervalCounter / 10) == duration) {
                    // to beat any rounding issues
                    view.counter.text(end);
                    clearInterlva(view.animateNumInterval);
                }
            }, 10);
        },

        // Helper function to determine if an element is in view
        isScrolledIntoView: function($elem) {
            // For nested counters that are hidden
            if (!$elem.is(':visible')) {
                return false;
            }

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