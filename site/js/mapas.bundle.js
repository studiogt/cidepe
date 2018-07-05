(function () {
  'use strict';

  // Função para carregamento assíncrono
  function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBFLg3m9No8WQKQpRf7nTK-XAkIS3-wg6s&sensor=true&callback=initialize";
    document.body.appendChild(script);
  }

  window.onload = loadScript;

}());
//# sourceMappingURL=mapas.bundle.js.map
