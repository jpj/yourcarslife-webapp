solairis.ycl.router.App = Backbone.Router.extend({

	fuelLogsForVehicle: {},

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
		if (this.fuelLogsForVehicle[vehicleId] == null) {
			this.fuelLogsForVehicle[vehicleId] = new solairis.ycl.collection.FuelLogList();
		}

		var fuelLogPageView = new solairis.ycl.view.FuelLogApp({el: $("#page-content > .content"), collection: this.fuelLogsForVehicle[vehicleId], vehicleId: vehicleId});

		if (this.fuelLogsForVehicle[vehicleId].length == 0) {
			this.fuelLogsForVehicle[vehicleId].fetch({
				data: {
					offset: 0,
					numResults: 10,
					vehicleId: vehicleId
				},
				error: function(a, errorResponse) {
					alert("Error fetching fuel logs");
				}
			});
		} else {
			this.fuelLogsForVehicle[vehicleId].trigger("reset");
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