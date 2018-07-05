(function () {
	'use strict';

	/*
	$('body').on('keyup','[alt=cep]',function() {
		var $self = $(this);

		if ($self.data('enviando')) return;
		
		//TROCAR O CONTAINER
		var $container = $self.closest('.clone');

		var cep = $self.val().replace(/\D/igm,'');
		if (cep.length!=8) return;

		$self.data('enviando',true);
		$.fancybox.showLoading();

		SGT.location.getLograduro(cep,function(resp) {
			$self.data('enviando',false);
			$.fancybox.hideLoading();

			var data = resp||{logradouro:'',bairro:'',cidade:'',uf:''};
			
			$.each(data,function(i,val) {		

				//Para o caso <input name="endereco[0][cidade]" />
				$container.find('[name$='+i+'\\]]').val(val);	

				//Para o caso <input name="cidade" />
				//$container.find('[name='+i+']').val(val);
			});

		});
	});
	*/

}());
//# sourceMappingURL=sgt.bundle.js.map
