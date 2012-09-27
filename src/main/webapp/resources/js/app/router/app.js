solairis.ycl.router.App = Backbone.Router.extend({
	routes: {
		"": "dashboard",
		"/": "dashboard",
		"/vehicle/:vehicleId": "getVehicle",
		"/log/fuel/:vehicleId": "getFuelLog",
		"/log/service/:vehicleId": "getServiceLog"
	},

	dashboard: function() {
		var vehicleList = new solairis.ycl.collection.VehicleList();
		new solairis.ycl.view.Dashboard({el: $("#page-content > .content"), collection: vehicleList});

		vehicleList.fetch();
	},

	getVehicle: function(vehicleId) {
		alert("Get vehicle not implemented yet");
	},

	getFuelLog: function(vehicleId) {
		var fuelLogs = new solairis.ycl.collection.FuelLogList();
		new solairis.ycl.view.FuelLogApp({el: $("#page-content > .content"), collection: fuelLogs, vehicleId: vehicleId});

		fuelLogs.fetch({
			data: {
				numResults: 0,
				vehicleId: vehicleId
			}
		});
	},

	getServiceLog: function(vehicleId) {
		var serviceLogs = new solairis.ycl.collection.ServiceLogList;
		serviceLogs.comparator = function(ServiceLog) {
			return ServiceLog.get("odometer") * -1;
		};

		new solairis.ycl.view.ServiceLogPage({el: $("#page-content > .content"), collection: serviceLogs, vehicleId: vehicleId});

		serviceLogs.fetch({
			data: {
				vehicleId: vehicleId
			},
			error: function(a, errorResponse) {
				alert("Error fetching service log list");
			}
		});
	}
});