(function () {
    'use strict';

    //jshint esversion: 6


    var language, Modelo;

    language = 'br';
    Modelo = {

        init: function init() {

            language = $('meta[name=language]').attr('content');
            Modelo.marcacaomenu();

            $('.open-menu').click(Modelo.openMenu);

            $('.hide-menu > li > a').click(Modelo.menuResponsivo);

            $('.hide-menu .dropdown > li > a').click(Modelo.submenuResponsivo);

            $('.fancy').fancybox({
                helpers: {
                    title: {
                        type: 'inside'
                    },
                    overlay: {
                        locked: false
                    }
                },
                afterShow: function afterShow() {
                    $(':text').setMask();
                }
            });

            window.Alert = function(msg) {
                var dfd = $.Deferred();
                var promise = dfd.promise();

                var $el = $('<div></div>');
                $el.append('<div class="popup"><div class="row"><div class="columns small-12 text-center"><h2>' + msg + '</h2></div></div><div class="row"><div class="columns small-12"><a href="javascript:void(0);" class="btn eff-op btn-close-alert" style="font-size: 10px;">OK</a></div></div></div>');
                $.fancybox.open([{
                    content: $el.html()
                }], {
                    closeBtn: false,
                    closeClick: false,
                    modal: true,
                    afterClose: function afterClose() {
                        dfd.resolve();
                    }
                });

                return promise;
            };

            window.alert = function() {
                return window.Alert;
            }(window.alert);

            $('.toggle').on('click', function() {
                $('body').toggleClass('open');
            });

            if ($('.carousel').length != 0) {
                $('.carousel').slick({
                    arrows: false,
                    autoplay: true,
                    fade: true,
                    pauseOnHover: false,
                    speed: $('.carousel').data('speed')||3000
                });
            }

            if ($('.carousel-produtos').length != 0) {
                $('.carousel-produtos').slick({
                	speed: $('.carousel-produtos').data('speed')||3000,
                    slidesToShow: 7,
                    slidesToScroll: 1,
                    centerMode: true,
                    arrows: false,
                    autoplay: true,
                    pauseOnHover: false,
                    responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 1
                        }
                    }, {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    }]
                });
            }

            if ($('.carousel-empresa').length != 0) {
                $('.carousel-empresa').slick({
                    arrows: false,
                    autoplay: true,
                    dots: true,
                    speed: $('.carousel-empresa').data('speed')||3000
                });
            }


            $(window).on('load', function() {
                $('.produto-destaque').css('opacity', '1');
            });

            $('#dg-container').gallery({
                autoplay: true
            });

            $('body').on('click', '.btn-add-projeto', function() {
                var $self = $(this);

                var item_id = $self.data('item_id') | 0;

                var callback = function callback(resp) {
                    if (resp.redirect_url != undefined) {
                        location.href = resp.redirect_url;
                        return;
                    }
                    if (resp.popup_url != undefined) {
                        $.fancybox.open([{
                            href: resp.popup_url,
                            type: 'ajax'
                        }], {});
                        return;
                    }

                    Alert(resp.msg).done(function() {

                        if (resp.success) {
                            location.href = 'index.php/' + language + '/projetos';
                            return;
                        }
                        $.fancybox.hideLoading();
                    });
                };

                $.fancybox.showLoading();

                $.ajax({
                    url: 'index.php/' + language + '/post-add-projeto',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        item_id: item_id
                    },
                    success: callback,
                    error: function error() {
                        callback({ success: false, msg: 'Não foi possível enviar o formulário.' });
                    }
                });
            });

            $('body').on('click', '.btn-close-alert', function() {
                $.fancybox.close();
            });

            if ($(window).width() > 1024) {
                $(window).on('scroll load', function() {
                    var topScroll = $(window).scrollTop();

                    $('.bottomed').css({
                        '-webkit-transform': 'translate(-50% ,' + -topScroll + 'px)',
                        '-moz-transform': 'translate(-50% ,' + -topScroll + 'px)',
                        '-ms-transform': 'translate(-50% ,' + -topScroll + 'px)',
                        'transform': 'translate(-50% ,' + -topScroll + 'px)'
                    });

                    $('.wrap-banner').css({
                        '-webkit-transform': 'translateY(' + -(topScroll / 3) + 'px)',
                        '-moz-transform': 'translateY(' + -(topScroll / 3) + 'px)',
                        '-ms-transform': 'translateY(' + -(topScroll / 3) + 'px)',
                        'transform': 'translateY(' + -(topScroll / 3) + 'px)'
                    });

                });
            }

            $('section.bgParallax').each(function() {
                var obj = $(this);
                $(window).scroll(function() {
                    var yPos = -($(window).scrollTop() / obj.data('speed'));
                    var bgpos = '50% ' + (yPos + 500) + 'px';
                    obj.css('background-position', bgpos);
                });
            });

            $('.wrapper.flex > ul > li > a').on('click', function() {
                $('.produtos-categoria').hide();
                $('.produtos-categoria li a').removeClass('aberto');
                $(this).parent().next('ul').css('display', 'flex').find('li').each(function(i, el) {
                    setTimeout(function() {
                        $(el).find('a').addClass('aberto');
                    }, 75 * (i + 1));
                });

            });

            $('.chosen ul li input[type="radio"]').on('change', function() {
                var filtro = $(this).data('filter');

                $('.produtos-filter').not('.chosen').hide();
                $('.produtos-filter.' + filtro).slideDown();
            });

            $('.produtos-filter .titled input[type="checkbox"]').on('change', function() {
                if ($(this).is(':checked')) {
                    $(this).closest('ul').find('input[type="checkbox"]').prop('checked', true);
                } else {
                    $(this).closest('ul').find('input[type="checkbox"]').prop('checked', false);
                }
            });

            if ($('.wrap-thumbs').length != 0) {
                $('.wrap-thumbs').slick({
                	speed: $('.wrap-thumbs').data('speed')||3000,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows: true,
                    vertical: true,
                    infinite: false,
                    centerPadding: '30px',
                    centerMode: true,
                    responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            infinite: false,
                            vertical: false
                        }
                    }, {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            vertical: false
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            vertical: false,
                            arrows: false
                        }
                    }]
                });
            }

            $('.wrap-thumbs .thumb').on('click', function() {
                var src = $(this).data('src');
                var type = $(this).data('type');
                var html = '';
                if (type == "video") {
                    $('.produto-destaque').empty().removeClass('fancy');
                    html = '<div class="flex-video"><iframe width="560" height="315" src="' + src + '" frameborder="0" allowfullscreen></iframe></div>';
                    $('.produto-destaque').append(html);
                }

                if (type == "imagem") {
                    $('.produto-destaque').empty().addClass('fancy');
                    html = '<img src=' + src + ' />';
                    $('.produto-destaque').attr('href', src);
                    $('.produto-destaque').append(html);
                }
            });

            if ($('.carousel-relacionados').length != 0) {
                $('.carousel-relacionados').slick({
                	speed: $('.carousel-relacionados').data('speed')||3000,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true
                        }
                    }, {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: false
                        }
                    }]
                });
            }


            $(window).on('load', function() {
                $('.carousel-empresa').css({ 'opacity': '1' });
            });


            if ($(window).width() > 1024) {
                $(window).on('load resize', function() {
                    var wrapSize = $('.wrap-thumbs').height();
                    $('.produto-destaque').css('height', wrapSize);
                });
            }

            var ajustaZoom = function ajustaZoom() {
                var zoom = window.innerWidth / window.outerWidth;
                $('body').css('zoom', zoom);
            };

            ajustaZoom();
            $(window).on('resize', function() {
                ajustaZoom();
            });

            $(window).on('load', function() {
                $('.produto-destaque img, .produto-destaque .flex-video, .produto-vitrine .wrap-img img').fadeIn();
            });

            $(window).on('load scroll', function() {
                var $btn = $('.btn-add-projeto');
                if ($btn.length == 0) return;

                var topScroll = $(window).scrollTop();

                if (topScroll > $('.btn-add-projeto').offset().top + 31) {
                    $('.btn-add-fixed').css('opacity', '1');
                } else {
                    $('.btn-add-fixed').css('opacity', '0');
                }
            });

            if ($('body').hasClass('home')) {
                $('.area-logo').css('width', '70px');
                $('.area-logo img').attr('src', 'https://cdn.jsdelivr.net/gh/binho85/cidepe/img/logo.png');
            }

            $(function() {
                setTimeout(function() {
                    $('.area-misc ul li.cart a span').fadeOut();
                }, 10000);
            });

            $('body').on('click', '[name=formFiltroSubarea] [name^=area]', function() {
                var $self = $(this);
                var $li = $self.closest('li');
                $subareas = $li.find('[name^=subarea]');

                if ($subareas.length == 0) {

                    var $form = $self.closest('form');

                    var timer = $form.data('timer');
                    if (timer) {
                        window.clearTimeout(timer);
                    }

                    timer = window.setTimeout(function() {
                        $form.trigger('submit');
                    }, 500);

                    $form.data('timer', timer);

                    return;
                }

                if (!$self.is(':checked')) {
                    $subareas.attr('checked', 'checked');
                } else {
                    $subareas.removeAttr('checked');
                }
                $subareas.trigger('click');
            });

            $('body').on('click', '[name=formFiltroSubarea] [name^=subarea]', function() {
                var $self = $(this);
                var $form = $self.closest('form');

                var timer = $form.data('timer');
                if (timer) {
                    window.clearTimeout(timer);
                }

                timer = window.setTimeout(function() {
                    $form.trigger('submit');
                }, 500);

                $form.data('timer', timer);
            });

            Modelo.ajaxForm('[name=formNewsletter],[name=formOrcamento]');

            $('body').on('submit', '[name=formContato]', function() {
                var $self = $(this);

                if ($self.data('enviando')) return false;
                if (!$self.find('.required').validate()) return false;

                $self.data('enviando', true);
                $.fancybox.showLoading();

                var callback = function callback(resp) {
                    if (resp.redirect_url != undefined) {
                        location.href = resp.redirect_url;
                        return;
                    }
                    if (resp.popup_url != undefined) {
                        $self.data('enviando', false);
                        $.fancybox.hideLoading();
                        $.fancybox.open([{
                            href: resp.popup_url,
                            type: 'ajax'
                        }], {});
                        return;
                    }

                    Alert(resp.msg).done(function() {
                        if (resp.success) {
                            location.reload(true);
                            return;
                        }
                        $.fancybox.hideLoading();
                        $self.data('enviando', false);
                    });
                };

                $.ajax({
                    url: $self.attr('action'),
                    type: 'post',
                    dataType: 'json',
                    data: $self.serializeArray(),
                    success: callback,
                    error: function error() {
                        callback({
                            success: false,
                            msg: "Não foi possível enviar o formulário."
                        });
                    }
                });

                return false;
            });

            $('body').on('click', '.btn-remover-projeto', function() {
                var $self = $(this);

                var item_id = $self.data('item_id') | 0;

                var callback = function callback(resp) {
                    if (resp.redirect_url != undefined) {
                        location.href = resp.redirect_url;
                        return;
                    }
                    if (resp.popup_url != undefined) {
                        $.fancybox.hideLoading();
                        $.fancybox.open([{
                            href: resp.popup_url,
                            type: 'ajax'
                        }], {});
                        return;
                    }

                    Alert(resp.msg).done(function() {
                        if (resp.success) {
                            location.reload(true);
                            return;
                        }
                        $.fancybox.hideLoading();
                    });
                };

                $.ajax({
                    url: 'index.php/' + language + '/post-remover-projeto',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        item_id: item_id
                    },
                    success: callback,
                    error: function error() {
                        callback({
                            success: false,
                            msg: "Não foi possível enviar o formulário."
                        });
                    }
                });
            });

            $('body').on('submit', '[name=formProjeto]', function() {
                var $self = $(this);

                if ($self.data('enviando')) return false;
                if (!$self.find('.required').validate()) return false;

                $.fancybox.showLoading();
                $self.data('enviando', true);

                var callback = function callback(resp) {
                    if (resp.redirect_url != undefined) {
                        location.href = resp.redirect_url;
                        return;
                    }
                    if (resp.popup_url != undefined) {
                        $.fancybox.hideLoading();
                        $self.data('enviando', false);
                        $.fancybox([{
                            href: resp.popup_url,
                            type: 'ajax'
                        }], {});
                    }
                };

                $.ajax({
                    url: $self.attr('action'),
                    type: 'post',
                    dataType: 'json',
                    data: $self.serializeArray(),
                    success: callback,
                    error: function error() {
                        callback({
                            success: false,
                            msg: "Não foi possível enviar o formulário"
                        });
                    }
                });

                return false;
            });
        },

        ajaxForm: function ajaxForm(selector, cb) {
            $('body').on('submit', selector, function() {
                var $self = $(this);
                if ($self.data('enviando')) return false;
                if (!$self.find('.required').validate()) return false;

                $self.data('enviando', true);
                $.fancybox.showLoading();

                var callback = function callback(resp) {
                    $self.data('enviando', false);
                    $.fancybox.hideLoading();

                    if (cb) return cb(resp, $self);
                    Alert(resp.msg).done(function() {
                        if (resp.success) {
                            $self[0].reset();
                        }
                    });
                };

                $.ajax({
                    url: $self.attr('action'),
                    type: 'post',
                    dataType: 'json',
                    data: $self.serializeArray(),
                    success: callback,
                    error: function error() {
                        callback({ success: false, msg: "Não foi possível enviar o formulário." });
                    }
                });
                return false;
            });
        },

        marcacaomenu: function marcacaomenu() {
            $('[data-menu]').each(function() {
                var menu = $(this).data('menu');
                if ($('body').is('.' + menu)) {
                    $(this).find('a:eq(0)').addClass('actv');
                }
            });
        },

        openMenu: function openMenu() {
            $('.hide-menu').slideToggle(500);
        },

        menuResponsivo: function menuResponsivo() {
            $(this).parent().find('.dropdown').slideToggle(500);
        },

        submenuResponsivo: function submenuResponsivo() {
            $(this).parent().find('.dropdown-2').slideToggle();
        }

    };
    $(document).ready(function() {
        $(Modelo.init);
    });
    $(window).on('load', function() {
        $('.aux.box-fisica').fadeIn(400);
    });
    if ($(window).width() > 1024) {
        $(function() {
            $.mask.masks.phone.mask = '(99) 9999-99999';
            $(':text').setMask();
        });
    }

}());
//# sourceMappingURL=js.bundle.js.map
