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
	 *	function({@link YCL.VehicleFuelLogResponse} response, {@link YCL.VehicleFuelLogStatus} status)
	 */
	this.vehicleFuelLogSearch = function(request, callback) {

		var requestData = {
			pageNumber: request.pageNumber,
			maxResults: request.maxResults,
			vehicleId: request.vehicleId
		};

		var status = YCL.VehicleFuelLogStatus.INCOMPLETE;
		var response = {
			vehicleFuelLogs: []
		};

		$.ajax({
			url: vehicleFuelLogServiceUrl,
			data: requestData,
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				status = YCL.VehicleFuelLogStatus.UNKNOWN_ERROR;
				alert("error: " + XMLHttpRequest.statusText);
			}, success: function(data) {
				status = YCL.VehicleFuelLogStatus.OK;
				$.each(data.vehicleFuelLogs, function(index, value) {
					response.vehicleFuelLogs.push({
						created: value.created,
						fuel: value.fuel,
						logDate: value.logDate,
						modified: value.modified,
						octane: value.octane,
						odometer: value.odometer,
						vehicleFuelLogId: value.vehicleFuelLogId
					});
				});
			}, complete: function() {
				if (callback instanceof Function) {
					callback(response, status);
				}
			}
		});
	};

};

/**
 * @name YCL.VehicleFuelLog
 * @class
 * @property {Number} created
 * @property {Number} fuel
 * @property {Number} logDate
 * @property {Number} modified
 * @property {Integer} octane
 * @property {Number} odometer
 * @property {Integer} vehicleFuelLogId
 */

/**
 * @name YCL.VehicleFuelLogRequest
 * @class
 * @property {Integer} pageNumber
 * @property {Integer} maxResults
 * @property {Integer} vehicleId
 */

/**
 * @name YCL.VehicleFuelLogResponse
 * @class
 * @property {Array} vehicleFuelLogs Array.<{@link YCL.VehicleFuelLog}>
 */

/**
 * @class {YCL.VehicleFuelLogStatus}
 */
YCL.VehicleFuelLogStatus = {
	/**
	 * Request has not yet finished
	 * @constant
	 */
	INCOMPLETE: "INCOMPLETE",

	/**
	 * Request completed succesfully
	 * @constant
	 */
	OK: "OK",

	/**
	 * There was an error with the request
	 * @constant
	 */
	UNKNOWN_ERROR: "UNKNOWN_ERROR"
};