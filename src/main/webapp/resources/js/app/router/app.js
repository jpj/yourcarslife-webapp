solairis.ycl.router.App = Backbone.Router.extend({
	routes: {
		"/": "dashboard",
		"/vehicle/:id": "getVehicle",
		"/log/fuel/:id": "getFuelLog",
		"/log/service/:id": "getServiceLog"
	},

	dashboard: function() {
		var vehicleList = new solairis.ycl.collection.VehicleList();
		new solairis.ycl.view.Dashboard({el: $("#page-content > .content"), collection: vehicleList});

		vehicleList.fetch();
	},

	getVehicle: function(id) {
		alert("Get vehicle not implemented yet");
	},

	getFuelLog: function(id) {
		alert("Get fuel log not implemented yet");
	},

	getServiceLog: function(id) {
		alert("Get service log not implmented yet");
	}
});