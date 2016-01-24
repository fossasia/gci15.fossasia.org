// saSlider (super awesome slider) jQuery plugin
// By Yair Even-Or
// Dec. 2014

;(function($){
    "use strict";

    var defaults, debounce,
        pluginName = 'saSlider',
        DOM = {
            window   : $(window),
            document : $(document)
        },
        raf = window.requestAnimationFrame
           || window.webkitRequestAnimationFrame
           || window.mozRequestAnimationFrame
           || window.msRequestAnimationFrame
           || function(cb) { return window.setTimeout(cb, 1000 / 60); },


    // default settings
    defaults = {
        loop       : true,        // Allows navigation between first and last images
        indicators : true,        // Renderes a UI which shows the number of slides and marks the currently viewed one
        keys       : {
            prev  : '37, 80',     // keycodes to navigate to the previous image, default: Left arrow (37), 'p' (80)
            next  : '39, 78'      // keycodes to navigate to the next image, default: Right arrow (39), 'n' (78)
        }
    };


    // constructor
    function SaSlider(sliderElm, settings){
        this.slider   = $(sliderElm);
        this.slides   = this.slider.find('> ul > li'); // cache all the slides
        this.settings = $.extend({}, defaults, settings || {});
        this.active   = this.slider.find('.active');
        this.index    = 0; // start from first slide

        // Run whatever needs to be executed
        if( !this.settings.loop )
            this.markEdges();

        this.checkOrientation.call(this);

        // last thing
        this.bind();
    }

    SaSlider.prototype = {
        // All plugin-related events
        bind : function(){
            var that = this;

            // next / prev arrows
            this.slider.on('click', '> .arrow', this.events.btn.bind(this));
            // cleanup styles after transition
            this.slider.find('> ul').on('transitionend', '> li', this.events.transitionEnd.bind(this));
            // keyboard controls
            DOM.document.on('keydown.' + pluginName, this.events.keyDown.bind(this));
            // indicators
            if( this.settings.indicators ){
                this.indicators.generate.apply(this);
                this.indicators.elm.on('click', 'i', function(){
                    that.changeSlide( $(this).index() );
                });
            }
            // window resize
            DOM.window.on('resize.' + pluginName, function(){
                Date.now() % 2 == 0 && that.checkOrientation.call(that);
            });

            // mobile drag
           // this.slider.on('touchStart', this.events.touchmove.bind(this));
           // this.slider.on('touchmove', this.events.touchmove.bind(this));

            this.slider.on('dragstart', function(event) { event.preventDefault(); });

            this.slider.on('swipe', this.events.move.bind(this) );
            this.slider.on('mouseup touchend', this.events.cancelDragging.bind(this));
        },

        events : {
            drag : {
                offset      : 0,
                dirtySlides : $(), // a jQuery set of elements which have been styled and have yet to be reset
                dragSibling : null
            },

            btn : function(e){
                var idx =  e.currentTarget.classList[1] == 'next' ? this.index + 1 : this.index - 1;
                this.changeSlide(idx);
            },

            keyDown : function (e){
                var idx = this.settings.keys.next.indexOf(e.keyCode) ? this.index - 1 : this.index + 1;
                // Prevent default keyboard action (like navigating inside the page)
                return this.settings.keys.next.indexOf(e.keyCode) >= 0 && this.changeSlide(idx) ||
                       this.settings.keys.prev.indexOf(e.keyCode) >= 0 && this.changeSlide(idx) || true;
            },

            transitionEnd : function(e){
                //e.currentTarget.removeAttribute('style');
                this.events.drag.dirtySlides = $();
                this.slides.each(function(){
                    this.removeAttribute('style');
                })
               // this.slider.removeClass('dragging prevSlide');
            },

            move : function(e, Dx, Dy){
                var that = this,
                    percent = (Dx / this.slider[0].clientWidth) * 100,
                    idx = Dx > 0 ? this.index + 1 : this.index - 1; // the index to change to


                this.events.drag.offset = percent;
                percent = Math.abs(percent);

                // loop logic
                if( idx > this.slides.length - 1 )
                    idx = 0;
                else if( idx < 0 )
                    idx = this.slides.length - 1;

                this.events.drag.dragSibling = this.slides.eq(idx); // the element which moves into  the frame
                this.events.drag.dirtySlides = this.events.drag.dirtySlides.add( this.events.drag.dragSibling[0] );

               // elm.toggleClass('active', Dx > 0);
                that.slider.toggleClass('prevSlide', Dx > 0);

                raf(function(){
                    that.slider.addClass('dragging');

                    if( that.events.drag.dragSibling )
                        that.events.drag.dragSibling[0].style.width = percent + '%';

                    that.active[0].style.width = 100 - percent + '%';
                    that.events.drag.dirtySlides.not(that.events.drag.dragSibling).removeAttr('style');
                });
            },

            cancelDragging : function(e){
                var pointOfChange = 22;  // the amount of % change neeed to make the changing of the frame, esle snap back

                this.slider.removeClass('dragging');
                this.events.drag.dragSibling && this.events.drag.dragSibling.removeClass('active').removeAttr('style');
                this.active.removeAttr('style');


                if( this.events.drag.offset < -pointOfChange ){
                    this.changeSlide(this.index - 1, true);
                }
                else if( this.events.drag.offset > pointOfChange ){
                    this.changeSlide(this.index + 1, true);
                }

                // cleapup
                this.events.drag.offset = 0;
                this.events.drag.dragSibling = null;
            }
        },

        // change the current slide
        changeSlide : function(idx, force){
            var isAnimating = this.active.width() < this.slider[0].clientWidth,
                newActive = this.slides.eq(idx),
                floatItem;

            // if there shouldn't be looping and it's the "edge", do not continue
            if( !force && isAnimating || (!this.settings.loop && !newActive.length) )
                return;

            this.slider.toggleClass('prevSlide', idx < this.index);

            // loop logic
            if( idx > this.slides.length - 1 )
                idx = 0;
            else if( idx < 0 )
                idx = this.slides.length - 1;

            // find newActive again one "idx" has been fixed
            newActive = this.slides.eq(idx);

            this.checkOrientation.call(this, newActive);

            // update the active element and begin animation
            this.active.css('width',0).removeClass('active');
            this.active = newActive.addClass('active');

            if( !this.settings.loop )
                this.markEdges();

            // update to new index
            this.index = idx;

            if( this.settings.indicators )
                this.indicators.mark.apply(this);
        },

        // fixes slide image orientation to best fit the slider constraints
        checkOrientation : (function(){
            var timer; // throttle timer
            return function($slide){
                $slide = $slide || this.active;
                var that = this,
                    img, imgRatio, sliderRatio,
                    isPortrait;

                // Chrome doesn't report the dimentions properly unless theres a delay
                clearTimeout(timer);
                timer = setTimeout(function(){
                    img = $slide.find('> img')[0];
                    // also chrome is crazy and sometimes report '0' so the check much run again until craziness stops
                    if( img.clientWidth == 0 || img.clientHeight == 0 ){
                        that.checkOrientation.call(that, $slide);
                        return;
                    }

                    // calculate aspct ratios of slide's image and the slider itself
                    imgRatio = img.naturalWidth / img.naturalHeight;
                    sliderRatio = that.slider[0].clientWidth / that.slider[0].clientHeight;

                    isPortrait = imgRatio > sliderRatio;
                    $slide.toggleClass('portrait', isPortrait);
                }, 20);
            }
        })(),

        // check if reached an edge (max left or max right)
        markEdges : function(){
            this.slider.toggleClass('start', !this.active.prev().length)
                       .toggleClass('end', !this.active.next().length);
        },

        // controller for the elements which represent which slide is currently viewed and how many are there
        indicators : {
            generate : function(){
                var htmlString = '<div class="indicators"><div class="wrap">' + Array(this.slides.length + 1).join('<i></i>') + '<b></b></div></div>';
                this.slider.append(htmlString);
                this.indicators.elm = this.slider.find('.indicators');
                this.indicators.marker = this.indicators.elm.find('b');
                return this;
            },
            mark : function(){
                var pos = this.indicators.marker.outerWidth(true) * this.index;
                this.indicators.marker.css('left', pos);
                return this;
            }
        }
    }

    // jQuery plugin init
    $.fn[pluginName] = function(settings){
        return this.each(function(){
            var saSlider = $(this).data('_' + pluginName);

            if( saSlider )
                return this;

            $(this).data('_' + pluginName, new SaSlider(this, settings));
        });
    };
})(jQuery);