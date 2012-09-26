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
		alert("Get service log not implmented yet");
	}
});