$( "#vencimento" )
	.change(function() {
		var barra = form.barra.value;
		var linha = form.linha.value;

		if (barra && linha){
			var vencimento = form.venc.value.split('-');
			var cur = new Date(vencimento[0], vencimento[1]-1, vencimento[2]);
			var base = new Date(1997,9,7);
			var data = Math.ceil((cur.getTime() - base.getTime()) / (1000*60*60*24));

			form.barra.value = form.barra.value.substr(0,5)+data+form.barra.value.substr(9);
			form.linha.value = form.linha.value.substr(0,33)+data+form.linha.value.substr(37);
		}else{
			alert('Gere o codigo de barra primeiro');
		}
});
$('#valor')
	.keyup(function() {
		var valor = $('#valor').val().replace(/[^0-9]/g,'');
		$('#valor').val(valor);
		if ($('#valor').val().length > 10) {
			$('#valor').val(valor.substr(0,10));
			return;
		}
		var valor10 = ('0000000000'.substr(valor.length-10 || 10) + valor);
		$('#digitado').val($('#digitado').val().substr(0, 37)+valor10);
		var res = $('#lido').val().substr(0,9) + valor10 + $('#lido').val().substr(19);
		console.log('res', res);
		$('#lido').val(res);
});
