/**
 * Template Implementation Mustache
 */

/**
 * Template Renderer
 *
 * @param {String} template
 * @param {Object} view
 * @return {String} rendered template
 */
solairis.ycl.template.render = function(template, view) {
	return Mustache.to_html(template, view);
};

solairis.ycl.template.view.fuelLog = function(fuelLog) {
	var logDate = new Date(fuelLog.logDate);
	var c = fuelLog.cost == null || fuelLog.cost === 0 ? null : fuelLog.cost.toString();
	var costFmt = c == null ? null : c.substr(0, c.length - 2) + "." + c.substr(c.length -2);
	return {
		logDate: function() {
			return logDate.toString("yyyy-MM-ddTHH:mm");
		},
		odometer: function() {
			return fuelLog.odometer ? fuelLog.odometer.toFixed(1) : fuelLog.odometer;
		},
		fuel: function() {
			return fuelLog.fuel ? fuelLog.fuel.toFixed(3) : fuelLog.fuel;
		},
		octane: fuelLog.octane,
		cost: function() {
			return costFmt;
		},
		costPerFuel: function() {
			return fuelLog.cost ? parseFloat((costFmt)/fuelLog.fuel).toFixed(3) : "-";
		},
		missedFillup: fuelLog.missedFillup
	};
};

solairis.ycl.template.view.vehicle = function(vehicle) {
	return {
		vehicleId: vehicle.vehicleId,
		name: vehicle.name,
		notes: vehicle.notes,
		description: vehicle.description,
		editVehicleUrl: function() {
			var editVehicleUrl = document.createElement("a");
			editVehicleUrl.href = solairis.ycl.constant.BASE_URL + "/vehicle/" + vehicle.vehicleId;
			return editVehicleUrl.href;
		},
		fuelLogsUrl: function() {
			var fuelLogListUrl = document.createElement("a");
			fuelLogListUrl.href = solairis.ycl.constant.BASE_URL + "/vehicle/log/fuel/list";
			fuelLogListUrl.hash = JSON.stringify({vehicleId: vehicle.vehicleId});
			return fuelLogListUrl.href;
		},
		serviceLogsUrl: function() {
			var serviceLogListUrl = document.createElement("a");
			serviceLogListUrl.href = solairis.ycl.constant.BASE_URL + "/vehicle/log/service/list";
			serviceLogListUrl.hash = JSON.stringify({vehicleId: vehicle.vehicleId});
			return serviceLogListUrl.href;
		}
	};
};

/**
 * Load Templates
 *
 * Load templates stored in <script> tags which have `id`s that end in "-template"
 */
$(function() {
	$("script[id$=-template]").each(function() {
		solairis.ycl.template.text[$(this).attr("id")] = $(this).html();
	});
});

/*
 * Error Handling
 */

solairis.ycl.error.properties = {
	"Size.vehicle.name": "Vehicle name must be at least 1 character and no more than 100 characters",
	"required": "Field required"
};

solairis.ycl.error.resolve = function(error) {
	for(var i = 0; i < error.codes.length; i++) {
		var code = error.codes[i];
		if (solairis.ycl.error.properties[code]) {
			return solairis.ycl.error.properties[code];
		}
	}
	return error.defaultMessage;
}