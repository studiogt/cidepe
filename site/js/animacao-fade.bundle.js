(function () {
	'use strict';

	(function($,window,undefined){

		var imgBanner = null;
		var imgBannerTime = 5000;
		var frameTime = 1500;

		function time() {
			var d = new Date();
			return d.getTime()*1;
		}

		function animate() {
			if ($('.frame').length<2) return false;
			var atual = $('.atualFrame');
			var proximo = atual.next();
			if (proximo.length==0) {
				proximo = $('.frame:first');
			}

			atual.removeClass('atualFrame').css({
				'z-index':3,
				'opacity':1
			});
			proximo.addClass('atualFrame').css({
				'z-index':2,
				'opacity':1
			});

			var frame = proximo.attr('frame');
			$('.paginacaobanner > [frame]').removeClass('ativo');
			$('.paginacaobanner > [frame='+frame+']').addClass('ativo');

			var start = time();
			atual.animate({
				'opacity':0
			},frameTime,function(){
				console.log('tempo: '+(time()-start));
				atual.css({'z-index':1,'opacity':0});
				proximo.css({'z-index':3,'opacity':1});
				clearTimeout(imgBanner);
				imgBanner = window.setTimeout(function(){
					animate();
				},imgBannerTime);
			});
		}

		$(function(){

			$('.frame:first').addClass('atualFrame').css({
				'z-index':3,
				'opacity':1
			});
			$('.frame').each(function(i,val){
				$(this).attr('frame',i);
				$paginacao = $('.paginacaobanner');
				$('<a href="javascript:void(0)"></a>').attr('frame',i).appendTo($paginacao);
			});
			$('.paginacaobanner > [frame=0]').addClass('ativo');

			$('.paginacaobanner > [frame]').click(function(){
				var frame = $(this).attr('frame');
				window.clearTimeout(imgBanner);
				$('.frame').removeClass('atualFrame').css({
					'z-index':1,
					'opacity':0
				}).stop(true,true);
				$('.frame:eq('+frame+')').addClass('atualFrame').css({
					'z-index':3,
					'opacity':1
				});
				$('.paginacaobanner > [frame]').removeClass('ativo');
				$(this).addClass('ativo');

				imgBanner = window.setTimeout(function(){
					animate();
				},imgBannerTime);

			});

			$('#banner .nav-right').unbind('click').click(function(){
				if ($('.frame:animated').length!=0) return false;
				window.clearTimeout(imgBanner);
				animate();
			});

			$('#banner .nav-left').unbind('click').click(function(){
				if ($('.frame:animated').length!=0) return false;
				window.clearTimeout(imgBanner);
				if ($('.frame').length<2) return false;
				var atual = $('.atualFrame');
				var proximo = atual.prev();
				if (proximo.length==0) {
					proximo = $('.frame:last');
				}

				atual.removeClass('atualFrame').css({
					'z-index':3,
					'opacity':1
				});
				proximo.addClass('atualFrame').css({
					'z-index':2,
					'opacity':1
				});

				var frame = proximo.attr('frame');
				$('.paginacaobanner > [frame]').removeClass('ativo');
				$('.paginacaobanner > [frame='+frame+']').addClass('ativo');

				var start = time();
				atual.animate({
					'opacity':0
				},frameTime,function(){
					
					atual.css({'z-index':1,'opacity':0});
					proximo.css({'z-index':3,'opacity':1});
					clearTimeout(imgBanner);
					imgBanner = window.setTimeout(function(){
						animate();
					},imgBannerTime);
				});
			});

			/*imgBanner = window.setInterval(function(){
				animate();
			},imgBannerTime);*/
			animate();

		});

	}(jQuery,window));

}());
//# sourceMappingURL=animacao-fade.bundle.js.map
