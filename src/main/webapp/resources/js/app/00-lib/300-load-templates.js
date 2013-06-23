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