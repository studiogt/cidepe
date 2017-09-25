var Modelo = {

	init : function(){

		

		//Marcação do Menu
		Modelo.marcacaomenu();		

		$('.open-menu').click(Modelo.openMenu);

		//Abre menu no Responsivo
		$('.hide-menu > li > a').click(Modelo.menuResponsivo);

		$('.hide-menu .dropdown > li > a').click(Modelo.submenuResponsivo);

		$('.fancy').fancybox({
			helpers : {
				title : {
					type : 'inside'
				},
				overlay : {
					locked : false
				}
			},
			afterShow: function() {
				$(':text').setMask();
			}

		});

		window.alert = (function(original){
			return function(msg) {
				var $dfd = $.Deferred();

				$.fancybox.open([{
					content: msg,
					type: 'inline',
					afterClose: function() {
						$dfd.resolve();
					}
				}]);

				return $dfd.promise();
			};
		}(window.alert));

		$('.carousel').slick({
			fade: true,
			speed: 2500,
			autoplay: true,
			arrows: false,
			dots: true,
			pauseOnHover: false
		});

		$('.wrap-banner, .carousel, .carousel .slick-slide div').css('height', $(window).height());

		$('.cog').click(function(){
			$(this).next('div').toggle(100);
		});

		$('.exibicao-lista li a').mouseover(function(){
			var imgSrc = $(this).data('img-produto');
			var imgTitle = $(this).data('img-descricao');			
			$('.target').empty().html('<img src="'+imgSrc+'" alt="'+imgTitle+'" title="'+imgTitle+'" />');
		});

		$('.exibicao li a').click(function(){
			var acao = $(this).data('exibicao');
			
			if(acao == 'lista') {
				$('.modo-bloco').hide();
				$('.modo-lista').show();
			} else if(acao == "bloco") {
				$('.modo-lista').hide();
				$('.modo-bloco').show();
			}
		});

		$('.versao select').change(function(){
			var tip = $(this).find('option').filter(':selected').data('tip');
			$('.tip').find('span').empty().text(tip);
		});

		$('.veja-mais').click(function(){			
			$(this).hide().prev('div').animate({
				height : '100%'				
			}, 200).css({
				'border-bottom': 'none',
				'overflow': 'inherit'
			});
		});

		$('.veja-mais').each(function(){
			var $this = $(this);
			var $el = $this.prev('div');
			var $lis = $el.find('ul > li:not(.sandia)');

			if ($lis.length <= 4) {
				$el.css({
					height: '100%',
					'border-bottom': 'none',
					'overflow': 'inherit'
				});
				$this.hide();
			} else {
				var height = 0;
				for(var i=0;i<=3;i++) {
					var mb = $lis.eq(i).css('margin-bottom').replace(/[^\d\.]/igm,'')*1.0;
					var mt = $lis.eq(i).css('margin-top').replace(/[^\d\.]/igm,'')*1.0;
					var h = $lis.eq(i).height()*1.0;
					height += h + mb + mt;
				}
				$el.css({
					height: height+34
				});
			}

		});

		$('body').on('click','.wrap-hidden .veja-mais', function() {
			$(this).closest('.wrap-hidden').addClass('overflow-fix');
		});

		$('.carousel-conjunto').slick({
			vertical : true,
			slidesToShow : 3,
			slidesToScroll: 1,
			dots: false,
			arrows: true,
			lazyLoad : 'ondemand'
		});

		Modelo.ajaxForm('[name=formNewsletter],[name=formContato],[name=formOrcamento]');

		//Placeholder no IE
		/*if (jQuery.browser.msie){
			Modelo.placeHolder();
		}*/		

		$('body').on('change','[name=formMostrar] [name=rows]',function(){
			$(this).closest('form').submit();
		});

		$('body').on('change','[name=formSort] [name=sort]',function(){
			$(this).closest('form').submit();
		});

		Modelo.ajaxForm('[name=formLogin]',function(resp,$self){
			if (resp.success) {
				$.fancybox.showLoading();
				$self.data('enviando',false);
				location.reload(true);
				return;
			}

			if (resp.popup_url != undefined) {
				$.fancybox.open([
						{
							href: resp.popup_url,
							type: 'ajax'
						}
					],{});
				return;
			}

			alert(resp.msg);
		});

		$('body').on('click','ul.filtro-tipo :radio',function() {
			$(this).closest('form').trigger('submit');
		});

		$('body').on('click','.tbl-usuarios .btn-edit',function() {
			$(this).closest('tr').addClass('edit');
		});
		$('body').on('click','.tbl-usuarios .btn-cancel',function() {
			var $tr = $(this).closest('tr');
			var $table = $tr.closesgmt('table');
			var $id = $tr.find('[name=id]');
			if (($id.val()|0)==0) {
				$tr.remove();

				if ($table.find('tbody tr').length==0) {
					$table.hide();
				}
			} else {
				$tr.removeClass('edit');				
			}			
		});
		$('body').on('click','.tbl-usuarios .btn-remover',function() {			
			var $tr = $(this).closest('tr');		
			var $table = $tr.closest('table');
			var $id = $tr.find('[name=id]');
			if ($tr.data('enviando')) return false;
			if (!confirm("Deseja remover o usuário?")) return false;

			$tr.data('enviando',true);
			$.fancybox.showLoading();

			var callback = function(resp) {
				if (resp.redirect_url != undefined) {
					location.href = resp.redirect_url;
					return;
				}

				$.fancybox.hideLoading();
				$tr.data('enviando',false);

				if (!resp.success) {
					alert(resp.msg);
					return;
				}				

				$tr.remove();		

				if ($table.find('tbody tr').length==0) {
					$table.hide();
				}
			}

			var url = "index.php/comercial.post-remover-usuario";
			if ($('body').is('.conhecendo')) {
				url = "index.php/conhecendo.post-remover-usuario";
			}

			$.ajax({
				url: url,
				type: 'post',
				dataType: 'json',
				data: {
					id: $id.val()|0
				},
				success: callback,
				error: function() {
					callback({success: false, msg: "Não foi possível remover o usuário."});
				}
			});
			
		});
		$('body').on('click','.btn-novo-usuario',function() {
			var $table = $('.tbl-usuarios');
			var $tr = $($('#tpl-novo-usuario').html());
			$tr.find('[alt]').setMask();
			$table.find('tbody').append($tr);
			if ($table.find('tbody tr').length!=0) {
				$table.show();
			}
		});

		$('body').on('click','.tbl-usuarios .btn-save', function() {
			var $tr = $(this).closest('tr');
			var $id = $tr.find('[name=id]');

			if ($tr.data('enviando')) return false;
			if (!$tr.find('.required').validate()) return false;

			$tr.data('enviando',true);
			$.fancybox.showLoading();

			var callback = function(resp) {
				if (resp.redirect_url != undefined) {
					location.href = resp.redirect_url;
					return;
				}

				$.fancybox.hideLoading();
				$tr.data('enviando',false);

				if (!resp.success) {
					alert(resp.msg);
					return;
				}

				$.each(resp.record,function(name,val){
					var $input = $tr.find('[name='+name+']');
					var $span = $input.closest('td').find('span');

					if (name!='senha') {
						$input.val(val);
					}
					if (name!='id' && name!='senha') {
						$span.html(val);
					}
				});
				$tr.removeClass('edit');
			}

			var url = "index.php/comercial.post-salvar-usuario";
			if ($('body').is('.conhecendo')) {
				url = "index.php/conhecendo.post-salvar-usuario";
			}

			$.ajax({
				url: url,
				type: 'post',
				dataType: 'json',
				data: $tr.find(':text,[type=hidden],[type=password]').serializeArray(),
				success: callback,
				error: function() {
					callback({success: false, msg: "Não foi possível enviar o formulário."});
				}
			});
		});

		Modelo.ajaxForm('[name=formMeusDados]',function(resp,$self) {
			if (resp.redirect_url != undefined) {
				location.href = resp.redirect_url;
				return;
			}

			if (resp.popup_url != undefined) {
				$.fancybox.open([
						{
							href: resp.popup_url,
							type: 'ajax'
						}
					],{});
				return;
			}

			alert(resp.msg).done(function(){

				if (resp.success) {
					$.fancybox.showLoading();
					$self.data('enviando',true);				
					location.reload(true);
				}
			});
		});

		Modelo.ajaxForm('[name=formEsqueciSenha]',function(resp,$self) {
			if (resp.redirect_url != undefined) {
				location.href = resp.redirect_url;
				return;
			}

			if (resp.popup_url != undefined) {
				$.fancybox.open([
						{
							href: resp.popup_url,
							type: 'ajax'
						}
					],{});
				return;
			}

			alert(resp.msg);
			if (resp.success) {
				$.fancybox.close();
				return;
			}
		});

		$('body').on('change','[name=formVersao] [name=versao_id]',function(){
			location.href = $(this).val();
		});
	},

	ajaxForm: function(selector,cb) {
		$('body').on('submit',selector,function(){
			try {
				var $self = $(this);
				if ($self.data('enviando')) return false;
				if (!$self.find('.required').validate()) return false;
				
				$self.data('enviando',true);
				$.fancybox.showLoading();
				
				var callback = function(resp) {
					if (resp.redirect_url!=undefined) {
						location.href = resp.redirect_url;
						return;
					}

					$self.data('enviando',false);
					$.fancybox.hideLoading();

					if (cb) return cb(resp,$self);
					alert(resp.msg);
					if (resp.success) {
						$self[0].reset();
					}
				}
				
				$.ajax({
					url: $self.attr('action'),
					type: 'post',
					dataType: 'json',
					data: $self.serializeArray(),
					success: callback,
					error: function() {
						callback({success:false,msg:"Não foi possível enviar o formulário."});
					}
				});

			} catch (e) {
				console.log(e);				
			}
			return false;
		});
	},

	//Marcação Menu
	marcacaomenu : function(){
		$('.conhecendo-menu li').each(function(){
            var menu = $(this).attr('menu');            
            if ($('body').is('.'+menu)) {
                $(this).find('a:eq(0)').addClass('actv');                      
            }
        });
	},

	openMenu : function() {		
		$('.hide-menu').slideToggle(500);
	},

	menuResponsivo : function() {
		//e.preventDefault();
		$(this).parent().find('.dropdown').slideToggle(500);
	},

	submenuResponsivo : function() {
		//e.preventDefault();
		$(this).parent().find('.dropdown-2').slideToggle();
	}

}
$(document).ready(function(){
	$(Modelo.init);
});

$(function(){
	$.mask.masks.phone.mask = '(99) 9999-99999';
	$(':text').setMask();
});

$(window).load(function(){
	$('.carousel-conjunto').fadeIn();
});