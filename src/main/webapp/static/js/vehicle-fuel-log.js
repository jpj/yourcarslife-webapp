$(document).ready(function() {
	var ycl = new YCL();
	ycl.vehicleFuelLogSearch({pageNumber: 1, maxResults: 100, vehicleId: 1},
		function(response, status) {
			if (status === YCL.VehicleFuelLogStatus.OK) {
				alert("returned " + response.vehicleFuelLogs.length);
			} else {
				alert("error: " + status);
			}
		});
});