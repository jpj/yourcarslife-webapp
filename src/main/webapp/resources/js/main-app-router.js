solairis.ycl.router.App = Backbone.Router.extend({
	dashboardView: null,
	vehicleView: null,
	fuelLogPageView: null,

	initialize: function() {
		$("#page-content > .content").html('<h1>Loading Application...</h1>');

		this.serviceLogPageView = new solairis.ycl.view.ServiceLogPage({el: $("#page-content > .content"), collection: new solairis.ycl.collection.ServiceLogList()});

		this.serviceLogPageView.collection.comparator = function(serviceLog) {
			return serviceLog.get("odometer") * -1;
		};
	},

	routes: {
		"log/fuel/:vehicleId": "getFuelLog",
		"log/service/:vehicleId": "getServiceLog"
	},

	getFuelLog: function(vehicleId) {
		if (!this.fuelLogPageView) {
			this.fuelLogPageView = new solairis.ycl.view.FuelLogApp({el: $("#page-content > .content"), collection: new solairis.ycl.collection.FuelLogList(), vehicleId: vehicleId});
		} else {
			this.fuelLogPageView.options.vehicleId = vehicleId;
			this.fuelLogPageView.initialize();
		}

		this.fuelLogPageView.collection.fetch({
			reset: true,
			data: {
				offset: 0,
				numResults: 10,
				vehicleId: vehicleId
			}
		});

		return this;
	},

	getServiceLog: function(vehicleId) {
		this.serviceLogPageView.options.vehicleId = vehicleId;

		this.serviceLogPageView.collection.fetch({
			reset: true,
			data: {
				vehicleId: vehicleId
			}
		});

		return this;
	}
});