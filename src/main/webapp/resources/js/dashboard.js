$(document).ready(function() {
	var ycl = new YCL();
	ycl.getVehicles(null, function(response, status) {
		if (status == YCL.VehicleStatus.OK) {
			if (response.vehicles.length > 0) {
			$.each(response.vehicles, function(i, vehicle) {
				var $row = $("#vehicles > .vehicle.available:first");
				$row.find(".description").text(vehicle.description);
				$row.find(".name").text(vehicle.name);
				$row.find(".name").attr("data-vehicle-id", vehicle.vehicleId);
				$row.find(".notes").text(vehicle.notes);
				$row.removeClass("unused").removeClass("available");
			});
			$("#vehicles > .vehicle.available").addClass("unused");
			} else {
				$("#no-vehicles").show();
			}
		} else {
			alert("error retrieving vehicles: " + status);
		}
	});
	
	$("#vehicles .vehicle a.name").each(function() {
		var a = $(this).get(0);
		var qs = a.search;
		//alert(href);
		var vehicleFuelLogRequest = {
			vehicleId: parseInt( $(this).attr("data-vehicle-id"), 10 )
		};
		var href = a.href.replace(qs, '');
		a.href = href;
		a.hash = JSON.stringify(vehicleFuelLogRequest);
	});
});