/* 
 * @fileOverview YCL JS API
 * @author Josh Johnson
 */


var YCL = function() {

	var vehicleFuelLogServiceUrl = '/yourcarslife-webapp/data/vehicle-fuel-log.json';

	/**
	 * @class {YCL.vehicleFuelLogSearch} Service for searching vehicle fuel logs.
	 * @param {YCL.VehicleFuelLogRequest} request
	 * @param {function} callback
	 */
	this.vehicleFuelLogSearch = function(request, callback) {

		var requestData = {
			pageNumber: request.pageNumber,
			maxResults: request.maxResults,
			vehicleId: request.vehicleId
		};

		$.ajax({
			url: vehicleFuelLogServiceUrl,
			data: requestData,
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("error: " + XMLHttpRequest.statusText);
			}, success: function(data) {
				alert("success: " + data);
			}, complete: function() {
				if (callback instanceof Function) {
					callback();
				}
			}
		});
	};
};

/**
 * @name YCL.VehicleFuelLogRequest
 * @class
 * @property {Integer} pageNumber
 * @property {Integer} maxResults
 * @property {Integer} vehicleId
 */