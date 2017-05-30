"use strict";
var idInfoBoxAberto;
var infoBox = [];
var abertos = [];
function initialize() {

    // Exibir mapa;
    var mapOptions = {
      zoom: 3,
      center: new google.maps.LatLng(7.017646, -30.481081),
      scrollwheel: false,
      panControl: false,
      //draggable: false,
      // mapTypeId: google.maps.MapTypeId.ROADMAP
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    }

    // Exibir o mapa na div #mapa;
    var el = document.getElementById('mapa');
    if (!el) return;
    var map = new google.maps.Map(document.getElementById("mapa"), mapOptions);

    // Marcador personalizado;
    var image = 'https://cdn.jsdelivr.net/gh/binho85/cidepe/img/pin-mapa.png';
    var marcadorPersonalizado = new google.maps.Marker({
        map: map,
        icon: image,
        animation: google.maps.Animation.DROP
    });

    function abrirInfoBox(id, marker) {
        if (typeof(idInfoBoxAberto) == 'number' && typeof(infoBox[idInfoBoxAberto]) == 'object') {
            infoBox[idInfoBoxAberto].close();
        }
     
        infoBox[id].open(map, marker);
        idInfoBoxAberto = id;
    }

    function carregarPontos() {
 
        $.getJSON('index.php/br/post-get-pontos-onde-encontrar', function(pontos) {

            $.each(pontos, function(index, ponto) {

                ponto.titulo = ponto.titulo||'';
                ponto.texto = ponto.texto||'';
                ponto.texto_azul = ponto.texto_azul||'';
                ponto.Bandeira = ponto.Bandeira||'';

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(ponto.Latitude, ponto.Longitude),
                    map: map,
                    icon: image
                });

                var infowindow = new google.maps.InfoWindow(), marker;
                abertos.push(infowindow);
                google.maps.event.addListener(map, "click", function(event) {
                    infowindow.close();
                });
 
                google.maps.event.addListener(marker, 'click', (function(marker, i) {

                    return function() {                        
                        var zoom = map.getZoom();
                        map.setCenter(marker.position);
                        /*
                        if (zoom < 8) {
                            map.setZoom(8);
                            return;
                        } 
                        */
                        if (zoom < 11) {
                            map.setZoom(11);
                            return;
                        }

                        var html = "";
                        html += "<div class='wrap-window clearfix'><table style='border:0;width:auto;'><tr>";
                        html += "<td valign='top'>";
                        if (ponto.Bandeira!='') {
                            html += "<img src='_files/"+ ponto.Bandeira +"' />";
                        }
                        html += "</td><td valign='top'>";
                        html += "<h3 class='ponto-titulo'>"+ponto.titulo+"</h3>";
                        html += '<div class="texto-azul">'+ponto.texto_azul+'</div>';                    
                        html += ponto.texto;
                        html += "</td></tr></table></div>";
                        abertos.forEach(function(e){
                            e.close();
                        });
                        infowindow.setContent(html);
                        infowindow.open(map, marker);
                    }
                })(marker));

            });

        });
     
    }     
    carregarPontos();
}


// Função para carregamento assíncrono
function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBFLg3m9No8WQKQpRf7nTK-XAkIS3-wg6s&sensor=true&callback=initialize";
  document.body.appendChild(script);
}

window.onload = loadScript;