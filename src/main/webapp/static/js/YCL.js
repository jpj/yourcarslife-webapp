/* 
 * @fileOverview YCL JS API
 * @author Josh Johnson
 */


var YCL = function() {

	var vehicleFuelLogServiceUrl = '${theme.baseUrl}/data/vehicle-fuel-log.json';
	var saveVehicleFuelLogServiceUrl = '${theme.baseUrl}/data/save-vehicle-fuel-log.json';

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
			vehicleId: request.vehicleId,
			vehicleFuelLogId: request.vehicleFuelLogId
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
			},
			success: function(data) {
				status = YCL.VehicleFuelLogStatus.OK;

				response.pageNumber = data.pageNumber;
				response.pageSize = data.pageSize;
				response.totalResults = data.totalResults;

				$.each(data.vehicleFuelLogs, function(index, value) {

					response.vehicleFuelLogs.push({
						created: value.created,
						fuel: value.fuel,
						logDate: value.logDate,
						missedFillup: value.missedFillup,
						modified: value.modified,
						octane: value.octane,
						odometer: value.odometer,
						vehicleFuelLogId: value.vehicleFuelLogId
					});

				});
			},
			complete: function() {
				if (callback instanceof Function) {
					callback(response, status);
				}
			}
		});
	};

	/**
	 * @class {YCL.getVehicleFuelLog} Service for retrieving one Vehicle Fuel Log
	 * @param {Number} vehicleId
	 * @param {Number} vehicleFuelLogId
	 * @param {function} callback
	 *	function({@link YCL.VehicleFuelLog} vehicleFuelLog, {@link YCL.VehicleFuelLogStatus} status)
	 */
	this.getVehicleFuelLog = function(vehicleId, vehicleFuelLogId, callback) {
		this.vehicleFuelLogSearch({vehicleId: vehicleId, vehicleFuelLogId: vehicleFuelLogId}, function(response, status) {
			var vehicleFuelLog = null;

			if (status === YCL.VehicleFuelLogStatus.OK && response.vehicleFuelLogs.length === 1) {
				vehicleFuelLog = response.vehicleFuelLogs[0];
			}
			if (callback instanceof Function) {
				callback(vehicleFuelLog, status);
			}
		});
	};

	/**
	 * @class {YCL.saveVehicleFuelLog} Service to save Vehicle Fuel Log
	 * @param {YCL.SaveVehicleFuelLogRequest} request
	 * @param {Function} callback
	 *	function({@link YCL.SaveVehicleFuelLogResponse} response, {@link YCL.VehicleFuelLogStatus} status)
	 */
	this.saveVehicleFuelLog = function(request, callback) {

		var requestData = {
			vehicleFuelLogId: request.vehicleFuelLogId,
			vehicleId: request.vehicleId,
			logDate: request.logDate.getFullYear()+'/'+parseInt(request.logDate.getMonth()+1)+'/'+request.logDate.getDate(),
			odometer: request.odometer,
			fuel: request.fuel,
			octane: request.octane,
			missedFillup: request.missedFillup
		};
		var status = YCL.VehicleFuelLogStatus.INCOMPLETE;
		var response = {
			errors: [],
			success: false,
			vehicleFuelLogId: 0
		};

		$.ajax({
			url: saveVehicleFuelLogServiceUrl,
			data: requestData,
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				status = YCL.VehicleFuelLogStatus.UNKNOWN_ERROR;
				alert("error: " + XMLHttpRequest.statusText);
			},
			success: function(data) {
				status = YCL.VehicleFuelLogStatus.OK;
				if (data.errors.length > 0) {
					response.success = false;
					$.each(data.errors, function(index, error) {
						response.errors.push({
							code: error.code,
							fieldName: error.field
						});
					});
				} else {
					response.success = true;
					response.vehicleFuelLogId = data.vehicleFuelLogId;
				}
			},
			complete: function() {
				if (callback instanceof Function) {
					callback(response, status);
				}
			}
		})

	};

};

YCL.average = function() {

	var store = [];

	this.add = function(x) {
		if (!isNaN(x)) {
			store.push( parseInt(x) );
		} else {
			throw "Only numbers can be entered to average. '"+x+"' is not a number.";
		}
	};

	this.get = function() {
		var total = 0;
		for(var i = 0; i < store.length; i++) {
			total += store[i];
		}

		return store.length != 0 ? total/store.length : 0;
	};

	return this;
};

YCL.mean = function() {

	var store = {};

	this.add = function(x) {
		if ( store[x] == null ) {
			store[x] = 0;
		}

		store[x]++;
	};

	this.get = function() {
		var highestKey = null;
		var highest = 0;
		for (var key in store) {
			if (store[key] > highest) {
				highest = store[key];
				highestKey = key;
			}
		}
		return highestKey;
	};

	return this;
};

/**
 * @class {YCL.Error}
 * @property {String} code Error code
 * @property {String} fieldName Field name
 */
YCL.Error = {
	code: null,
	fieldName: null
};

/**
 * @class {YCL.SaveVehicleFuelLogRequest}
 * @property {Number} fuel
 * @property {Date} logDate
 * @property {Boolean} missedFillup
 * @property {Number} octane Octane rating of gasoline
 * @property {Number} odometer Odometer reading
 * @property {Number} vehicleFuelLogId
 * @property {Number} vehicleId
 */
YCL.SaveVehicleFuelLogRequest = {
	fuel: null,
	logDate: null,
	missedFillup: null,
	octane: null,
	odometer: null,
	vehicleFuelLogId: null,
	vehicleId: null
};

/**
 * @class {YCL.SaveVehicleFuelLogResponse}
 * @property {Array} errors Array.<{@link YCL.Error}> List of errors
 * @property {Boolean} success
 * @property {Number} vehicleFuelLogId
 */
YCL.SaveVehicleFuelLogResponse = {
	errors: null,
	success: null,
	vehicleFuelLogId: null
};

/**
 * @name YCL.VehicleFuelLog
 * @class
 * @property {Number} created
 * @property {Number} fuel
 * @property {Number} logDate
 * @property {Boolean} missedFillup
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
 * @property {Integer} pageNumber
 * @property {Integer} pageSize
 * @property {Integer} totalResults
 * @property {Array} vehicleFuelLogs Array.<{@link YCL.VehicleFuelLog}> List of fuel logs
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