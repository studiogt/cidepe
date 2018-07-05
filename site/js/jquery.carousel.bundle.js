(function () {
    'use strict';

    (function ( $, window, document, undefined ) {
        var pluginName = 'carousel',
            defaults = {
                time: {
                	animation: 6000,
                	fade: 2000
                },
                imgSelector: 'a',
                type: 'slideTop'
            };
        function Plugin( element, options ) {
            this.element = element;
            this.options = $.extend( {}, defaults, options) ;
            this._defaults = defaults;
            this._name = pluginName;
            this.init();
        }
        Plugin.prototype.init = function () {
            var $el = $(this.element);
            this.$el = $el;
            var $frames = $el.children();
            this.$frames = $frames;
            $el.css({position: 'relative'});
            $frames.css({
    			position: 'absolute',
    			top: 0,
    			left: 0,
    			width: '100%',
    			height: '100%',
    			'z-index': 1
            });
            $frames.find(this.options.imgSelector).css({
            	position: 'relative'
            });
            this.$atual = $frames.eq(0);
            this.start();
        };
        Plugin.prototype.start = function() {
        	var that = this;
        	var $proxima = this.$atual.next();
        	if ($proxima.length==0) {
        		$proxima = this.$frames.eq(0);
        	}
        	this.$proxima = $proxima;
        	$proxima.css({
        		'z-index': 2,
        		'opacity': 1
        	});
        	this.$atual.css({
        		'z-index': 3,
        		'opacity': 1
        	});
        	this[this.options.type](function(){
        		that.$atual = $proxima;
        		that.start();
        	});
        };
        Plugin.prototype.slideTop = function(cb) {
        	var that = this;
        	var $img = this.$atual.find(this.options.imgSelector);
        	var $img2 = this.$proxima.find(this.options.imgSelector);
        	$img.css({
        		'background-position-y': '0%'
        	});
        	$img2.css({
        		'background-position-y': '0%'
        	});
        	$img.animate({
        		'background-position-y': '100%'
        	},this.options.time.animation,function(){
        		that.$atual.animate({
        			opacity: 0
        		},that.options.time.fade,function(){
        			if (cb) cb();
        		});
        	});
        };
        Plugin.prototype.slideBottom = function(cb) {
        	var that = this;
        	var $img = this.$atual.find(this.options.imgSelector);
        	var $img2 = this.$proxima.find(this.options.imgSelector);
        	$img.css({
        		'background-position-y': '100%'
        	});
        	$img2.css({
        		'background-position-y': '100%'
        	});
        	$img.animate({
        		'background-position-y': '0%'
        	},that.options.time.animation,function(){
        		this.$atual.animate({
        			opacity: 0
        		},that.options.time.fade,function(){
        			if (cb) cb();
        		});
        	});
        };
        Plugin.prototype.slideLeft = function(cb) {
        	var that = this;
        	var $img = this.$atual.find(this.options.imgSelector);
        	var $img2 = this.$proxima.find(this.options.imgSelector);
        	$img.css({
        		'background-position-x': '0%'
        	});
        	$img2.css({
        		'background-position-x': '0%'
        	});
        	$img.animate({
        		'background-position-x': '100%'
        	},this.options.time.animation,function(){
        		that.$atual.animate({
        			opacity: 0
        		},that.options.time.fade,function(){
        			if (cb) cb();
        		});
        	});
        };
        Plugin.prototype.slideRight = function(cb) {
        	var that = this;
        	var $img = this.$atual.find(this.options.imgSelector);
        	var $img2 = this.$proxima.find(this.options.imgSelector);
        	$img.css({
        		'background-position-x': '100%'
        	});
        	$img2.css({
        		'background-position-x': '100%'
        	});
        	$img.animate({
        		'background-position-x': '0%'
        	},that.options.time.animation,function(){
        		this.$atual.animate({
        			opacity: 0
        		},that.options.time.fade,function(){
        			if (cb) cb();
        		});
        	});
        };
        $.fn[pluginName] = function ( options ) {
            var args = arguments;
            if (options === undefined || typeof options === 'object') {
                return this.each(function () {
                    if (!$.data(this, 'plugin_' + pluginName)) {
                        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                    }
                });
            } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
                var returns;
                this.each(function () {
                    var instance = $.data(this, 'plugin_' + pluginName);
                    if (instance instanceof Plugin && typeof instance[options] === 'function') {
                        returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                    }
                    if (options === 'destroy') {
                      $.data(this, 'plugin_' + pluginName, null);
                    }
                });
                return returns !== undefined ? returns : this;
            }
        };
    }(jQuery, window, document));

}());
//# sourceMappingURL=jquery.carousel.bundle.js.map
