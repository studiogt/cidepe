var R = (function($,window,undefined){
	var sendRequest = function(method,params) {
		var dfd = $.Deferred();
		var data = {
			method: method,
			params: params
		}

		$.ajax({
			url: '_admin/js-api.php',
			type: 'post',
			dataType: 'json',
			data: data,
			success: function(resp) {
				if (!resp.success) {
					return dfd.resolve(new Error(resp.msg));
				}
				dfd.resolve(null,resp.data);
			},
			error: function() {
				dfd.resolve(new Error("Não foi possível conectar com o banco."));
			}
		})

		return dfd.promise();
	}
	return {
		find: function() {
			return sendRequest('find',arguments);			
		},
		findOne: function() {
			return sendRequest('findOne',arguments);			
		},
		getAll: function() {
			return sendRequest('getAll',arguments);
		},
		getRow: function() {
			return sendRequest('getRow',arguments);			
		},
		getCol: function() {
			return sendRequest('getCol',arguments);			
		},
		getCell: function() {
			return sendRequest('getCell',arguments);			
		},
		exec: function() {
			return sendRequest('exec',arguments);			
		}
	}
}(jQuery,window,undefined));