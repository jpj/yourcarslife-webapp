/*
 * @fileOverview YCL JS API
 * @author Josh Johnson
 */

var YCL = function() {

	var saveVehicleFuelLogServiceUrl = YCLConstants.BASE_URL + '/data/save-vehicle-fuel-log.json';
	/**
	 * @param {YCL.VehicleListRequest} request
	 * @param {Function} callback
	 */
	this.getVehicleList = function(request, callback) {

		var status = YCL.VehicleListRequestStatus.INCOMPLETE;
		var response = {
			vehicles: []
		};

		$.ajax({
			url: YCLConstants.BASE_URL + '/vehicle/list.json',
			data: null,
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				status = YCL.VehicleListRequestStatus.UNKNOWN_ERROR;
			},
			success: function(data) {
				status = YCL.VehicleListRequestStatus.OK;
				$.each(data.vehicles, function(index, vehicle) {
					response.vehicles.push({
						vehicleId: vehicle.vehicleId,
						name: vehicle.name,
						description: vehicle.description,
						notes: vehicle.notes
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

};

YCL.Request = {
	getParameter: function(name) {
		var hash = document.location.hash;
		var pageRequestString = hash != null && hash.length > 0 ? hash.substr(1, hash.length) : null;
		var pageRequest = null;
		var requestString = null;
		if (pageRequestString != null) {
			// The client will sometimes sub %22 for " when copying.
			// Stringify will have already escaped " to \" so this should
			// be fine.
			requestString = pageRequestString.replace(/\%22/g, '"').replace(/\%7B/g, '{').replace(/\%7D/g, '}');
		}

		if (requestString != null) {
			try {
				pageRequest = JSON.parse( requestString );
			} catch (e) {}
		}

		if (pageRequest != null) {
			return pageRequest[name];
		}
		return null;
	},
	setParameter: function(name, value) {
		var hash = document.location.hash;
		var pageRequestString = hash != null && hash.length > 0 ? hash.substr(1, hash.length) : null;
		var pageRequest = null;
		var requestString = null;
		if (pageRequestString != null) {
			// The client will sometimes sub %22 for " when copying.
			// Stringify will have already escaped " to \" so this should
			// be fine.
			requestString = pageRequestString.replace(/\%22/g, '"').replace(/\%7B/g, '{').replace(/\%7D/g, '}');
		}

		if (requestString != null) {
			try {
				pageRequest = JSON.parse( requestString );
			} catch (e) {}
		}

		if (pageRequest == null) {
			pageRequest = {};
		}

		pageRequest[name] = value;

		// Persist request to anchor hash
		document.location.hash = JSON.stringify(pageRequest);
	}
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
 * @property {Number} logId
 * @property {Number} vehicleId
 */
YCL.SaveVehicleFuelLogRequest = {
	fuel: null,
	logDate: null,
	missedFillup: null,
	octane: null,
	odometer: null,
	logId: null,
	vehicleId: null
};

/**
 * @class {YCL.SaveVehicleFuelLogResponse}
 * @property {Array} errors Array.<{@link YCL.Error}> List of errors
 * @property {Boolean} success
 * @property {Number} logId
 */
YCL.SaveVehicleFuelLogResponse = {
	errors: null,
	success: null,
	logId: null
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
 * @property {Integer} logId
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

YCL.VehiclListRequest = {};

YCL.VehicleListRequestStatus = {

	INCOMPLETE: "INCOMPLETE",
	OK: "OK",
	UNKNOWN_ERROR: "UNKNOWN_ERROR"

};