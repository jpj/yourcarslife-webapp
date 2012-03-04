$(document).ready(function() {
	var enterApp = function() {
//		alert("forwarding");
//		window.location.href = './dashboard';
		$("#loading").html('<a href="dashboard">Application Loaded</a>!');
	};
	
	if (localStorage.getItem("ycl") != null) {
		//yclStore = JSON.parse( window.localStorage.getItem("ycl") );
		//alert("You have "+yclStore.vehicles.length);
		enterApp();
	} else {
		//alert("retrieving store");
		$.ajax({
			url: YCLConstants.BASE_URL+"/api/dashboard.json",
			data: {},
			error: function() {
				alert("error loading app");
			},
			success: function(data) {
				if (data && data.vehicles) {
					window.localStorage.setItem("ycl", JSON.stringify( data ));
					enterApp();
				} else {
					alert("your browser doesn't support local storage. Can't continue.")
				}
			}
		});
	}
});