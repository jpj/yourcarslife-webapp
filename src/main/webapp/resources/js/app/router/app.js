solairis.ycl.router.App = Backbone.Router.extend({

	vehicles: new solairis.ycl.collection.VehicleList(),
	fuelLogsForVehicle: {},

	routes: {
		"": "dashboard",
		"/": "dashboard",
		"/vehicle/:vehicleId": "getVehicle",
		"/log/fuel/:vehicleId": "getFuelLog",
		"/log/service/:vehicleId": "getServiceLog"
	},

	dashboard: function() {
		new solairis.ycl.view.Dashboard({el: $("#page-content > .content"), collection: this.vehicles});

		if(this.vehicles.length == 0) {
			this.vehicles.fetch({
				error: function() {
					alert("Error getting list of vehicles. This should not happen");
				}
			});
		} else {
			this.vehicles.trigger("reset");
		}
	},

	getVehicle: function(vehicleId) {
		var ctx = this;

		if(this.vehicles.length == 0) {
			this.vehicles.fetch({
				success: function() {
					new solairis.ycl.view.VehiclePage({el: $("#page-content > .content"), model: ctx.vehicles.get(vehicleId)}).render();
				},
				error: function() {
					alert("Error getting list of vehicles. This should not happen");
				}
			});
		} else {
			new solairis.ycl.view.VehiclePage({el: $("#page-content > .content"), model: this.vehicles.get(vehicleId)}).render();
		}


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