(function () {
    'use strict';

    (function ($, window, document, undefined ) {
        
        Twig.extendFilter("hyphenize",function(value) {        
            return value.toLowerCase().split(' ').join('-');        
        });

        Twig.extendFilter("text_break",function(value,chars) {        
            var words = $('<div />').html(value).text().split(' ');
            var result = '';
            $.each(words,function(i,word) {
                var result2 = result+' '+word;
                if (result2.length>chars) return false;
                result = result2;
            });
            return result;
        });

        var pluginName = 'loadMore',
            defaults = {
                
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
        	var options = this.options;	

        	
        	this.enviando = false;
        	this.termiou = false;
            
            this.next = $el.data('next');
            this.url = $el.data('url');
            this.options.records = $el.data('records');

            this.template = twig({data:$el.find('.template').html()});
        	
            var that = this;
        	$el.on('click','.btn-more',function(){
                that.load();
            });
        };

        Plugin.prototype.onLoad = function(resp) {
        	$.fancybox.hideLoading();
        	this.enviando = false;

        	if (!resp.success) return;
        	if (resp.rows.length<this.options.records) {
        		this.termiou = true;
        		this.$el.find('.btn-more').hide();
        	}
            this.next += resp.rows.length;
        	this.render(resp.rows);
        };

        Plugin.prototype.render = function(rows) {
        	var template = this.template;
            var html = template.render({rows:rows});
            
        	this.$el.prepend(template.render({rows:rows}));
        };

        Plugin.prototype.load = function() {
    		if (this.enviando) return false;
    		this.enviando = true;
    		var that = this;
            
    		$.fancybox.showLoading();
            var callback = function(resp) {
                that.onLoad(resp);
            };
    		$.ajax({
    			url: this.url,
    			type: 'post',
    			dataType: 'json',
    			data: {
    				next: that.next,
    				rows: that.options.records
    			},
    			success: callback,
    			error: function() {
    				callback({success: false,msg:"mensagem de erro"});
    			}
    		});
        };

        $.fn[pluginName] = function ( options ) {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, 
                    new Plugin( this, options ));
                }
            });
        };
    })( jQuery, window, document );

}());
//# sourceMappingURL=jquery.load-more.bundle.js.map
