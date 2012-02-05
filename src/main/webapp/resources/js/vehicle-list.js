$(document).ready(function() {
	var ycl = new YCL();

	ycl.getVehicleList(null, function(response, status) {
		if (status == YCL.VehicleListRequestStatus.OK) {
			$.each(response.vehicles, function(index, vehicle) {
				var $vehicle = $("#vehicles .vehicle.available:first");
				$vehicle.find(".name").text(vehicle.name);
				$vehicle.find(".description").text(vehicle.description);
				$vehicle.find(".notes").text(vehicle.notes);

				var fuelLogListRequest = {
					vehicleId: vehicle.vehicleId
				};
				var url = document.createElement("a");
				url.href = YCLConstants.BASE_URL + "/vehicle/log/fuel/list";
				url.hash = JSON.stringify(fuelLogListRequest);
				$vehicle.find(".fuel-log-list").attr("href", url.href);
				$vehicle.removeClass("available");
			});
		} else {
			alert("Error retrieving vehicle list: " + status);
		}
	});
});