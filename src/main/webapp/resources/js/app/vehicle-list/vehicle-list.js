$(document).ready(function() {
	var ycl = new YCL();

	ycl.getVehicleList(null, function(response, status) {
		if (status == YCL.VehicleListRequestStatus.OK) {
			$.each(response.vehicles, function(index, vehicle) {
				var $vehicle = $("#vehicles .vehicle.available:first");
				$vehicle.find(".name").text(vehicle.name);
				$vehicle.find(".description").text(vehicle.description);
				$vehicle.find(".notes").text(vehicle.notes);

				var fuelLogListUrl = document.createElement("a");
				fuelLogListUrl.href = YCLConstants.BASE_URL + "/vehicle/log/fuel/list";
				fuelLogListUrl.hash = JSON.stringify({vehicleId: vehicle.vehicleId});
				var serviceLogListUrl = document.createElement("a");
				serviceLogListUrl.href = YCLConstants.BASE_URL + "/vehicle/log/service/list";
				serviceLogListUrl.hash = JSON.stringify({vehicleId: vehicle.vehicleId});
				var editVehicleUrl = document.createElement("a");
				editVehicleUrl.href = YCLConstants.BASE_URL + "/vehicle/" + vehicle.vehicleId;
				$vehicle.find(".fuel-log-list").attr("href", fuelLogListUrl.href);
				$vehicle.find(".service-log-list").attr("href", serviceLogListUrl.href);
				$vehicle.find(".edit").attr("href", editVehicleUrl.href);
				$vehicle.removeClass("available");
			});
		} else {
			alert("Error retrieving vehicle list: " + status);
		}
	});
});