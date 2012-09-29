solairis.ycl.router.App = Backbone.Router.extend({

	fuelLogs: null,

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
		if (this.fuelLogs == null) {
			this.fuelLogs = new solairis.ycl.collection.FuelLogList();
		}

		var fuelLogPageView = new solairis.ycl.view.FuelLogApp({el: $("#page-content > .content"), collection: this.fuelLogs, vehicleId: vehicleId});

		if (this.fuelLogs.length == 0) {
			this.fuelLogs.fetch({
				data: {
					numResults: 10,
					vehicleId: vehicleId
				},
				error: function(a, errorResponse) {
					alert("Error fetching fuel logs");
				}
			});
		} else {
			this.fuelLogs.trigger("reset");
		}


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