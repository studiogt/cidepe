function based(){
	var base = document.querySelector('.wrapper.flex').offsetWidth;
	var el = document.querySelectorAll('.produtos-categoria');
    for(var i = 0; i <= el.length - 1; i++){
	   el[i].style.width = base+'px';
    }
}

if(window.attachEvent) {
    window.attachEvent('onresize', function() {
    	based();
    });
}
else if(window.addEventListener) {
    window.addEventListener('resize', function() {
        based();
    }, true);
}

based();