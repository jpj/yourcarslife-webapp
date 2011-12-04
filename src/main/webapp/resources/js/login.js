$(document).ready(function() {
	if ( !('autofocus' in document.createElement('input'))) {
		$("#login input[name=j_username]").focus();
	}
});