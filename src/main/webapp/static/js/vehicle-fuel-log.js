$(document).ready(function() {
	var ycl = new YCL();
	ycl.vehicleFuelLogSearch({pageNumber: 1, maxResults: 100, vehicleId: 1}, function() { alert('callback');});
});