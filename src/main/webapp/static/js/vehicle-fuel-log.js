$(document).ready(function() {
	var ycl = new YCL();

	var performSearch = function(request) {

		$("#vehicleFuelLogs li").addClass("available");

		ycl.vehicleFuelLogSearch(
			{pageNumber: request.pageNumber, maxResults: 100, vehicleId: 1},
			function(response, status) {
				if (status === YCL.VehicleFuelLogStatus.OK) {
					$.each(response.vehicleFuelLogs, function(index, vehicleFuelLog) {
						if ($("#vehicleFuelLogs li.available").length === 0) {
							$("#vehicleFuelLogs").append('<li class="available"><div class="vehicleFuelLogId"></div><div class="odometer"></div></li>');
						}

						var $row = $("#vehicleFuelLogs li.available:first");
						$row.removeClass("available")
						$row.find(".vehicleFuelLogId").text(vehicleFuelLog.vehicleFuelLogId);
						$row.find(".odometer").text(vehicleFuelLog.odometer);
					});
				} else {
					alert("error: " + status);
				}
			}
		);
	};

	// Default Search
	performSearch({
		pageNumber: 1
	});
});