solairis.ycl.router.App = Backbone.Router.extend({

	vehicles: new solairis.ycl.collection.VehicleList(),

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
		"": "dashboard",
		"dash": "dashboard",
		"vehicle/:vehicleId": "getVehicle",
		"log/fuel/:vehicleId": "getFuelLog",
		"log/service/:vehicleId": "getServiceLog",
		"connect/:providerId": "connectProvider",
		"*actions": "defaultAction"
	},
	defaultAction: function(action) {
		// 404
	},

	home: function() {
		this.navigate('/dash');
		this.dashboard();
	},

	dashboard: function() {
		if (!this.dashboardView) {
			this.dashboardView = new solairis.ycl.view.Dashboard();
		}
		this.dashboardView.setElement($("#page-content > .content"));
		this.dashboardView.collection = this.vehicles;
		this.dashboardView.initialize().render();

		if(this.vehicles.length == 0) {
			this.vehicles.fetch();
		} else {
			this.vehicles.trigger("reset");
		}
	},

	getVehicle: function(vehicleId) {
		var ctx = this;

		if (!this.vehicleView) {
			this.vehicleView = new solairis.ycl.view.VehiclePage({el: $("#page-content > .content")});
		}

		if(this.vehicles.length === 0) {
			this.vehicles.fetch({
				success: function() {
					ctx.vehicleView.model = ctx.vehicles.get(vehicleId);
					ctx.vehicleView.initialize().render();
				}
			});
		} else {
			ctx.vehicleView.model = ctx.vehicles.get(vehicleId);
			ctx.vehicleView.initialize().render();
		}

		return this;
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