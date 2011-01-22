$(document).ready(function() {
	if ( $("#login input[name=j_username]").val() == '' ) {
		$("#login input[name=j_username]").focus();
	} else {
		$("#login input[name=j_password]").focus();
	}
});