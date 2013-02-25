solairis.ycl.router.App = Backbone.Router.extend({

	vehicles: new solairis.ycl.collection.VehicleList(),
	fuelLogsForVehicle: {},

	dashboardView: null,
	vehicleView: null,
	fuelLogPageView: null,
	serviceLogPageView: null,
	
	initialize: function() {
		$("#page-content > .content").html('<h1>Loading Application...</h1>');
	},

	routes: {
		"": "home",
		"dash": "dashboard",
		"vehicle/:vehicleId": "getVehicle",
		"log/fuel/:vehicleId": "getFuelLog",
		"log/service/:vehicleId": "getServiceLog",
		"*actions": "defaultAction"
	},
	
	defaultAction: function(action) {
		// 404
	},
	
	home: function() {
		$("#page-content > .content").html( solairis.ycl.template.text["home-template"] );
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

		if(this.vehicles.length == 0) {
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


	},

	getFuelLog: function(vehicleId) {
		if (this.fuelLogsForVehicle[vehicleId] == null) {
			this.fuelLogsForVehicle[vehicleId] = new solairis.ycl.collection.FuelLogList();
		}

		if (!this.fuelLogPageView) {
			this.fuelLogPageView = new solairis.ycl.view.FuelLogApp({el: $("#page-content > .content"), collection: this.fuelLogsForVehicle[vehicleId], vehicleId: vehicleId});
		} else {
			this.fuelLogPageView.options.vehicleId = vehicleId;
			this.fuelLogPageView.initialize();
		}

		if (this.fuelLogsForVehicle[vehicleId].length == 0) {
			this.fuelLogsForVehicle[vehicleId].fetch({
				data: {
					offset: 0,
					numResults: 10,
					vehicleId: vehicleId
				}
			});
		} else {
			this.fuelLogsForVehicle[vehicleId].trigger("reset");
		}

		return this;
	},

	getServiceLog: function(vehicleId) {
		var serviceLogs = new solairis.ycl.collection.ServiceLogList;
		serviceLogs.comparator = function(ServiceLog) {
			return ServiceLog.get("odometer") * -1;
		};

		if (!this.serviceLogPageView) {
			this.serviceLogPageView = new solairis.ycl.view.ServiceLogPage({el: $("#page-content > .content"), collection: serviceLogs, vehicleId: vehicleId});
		} else {
			this.serviceLogPageView.setElement($("#page-content > .content"));
			this.serviceLogPageView.collection = serviceLogs;
			this.serviceLogPageView.initialize();
		}

		serviceLogs.fetch({
			data: {
				vehicleId: vehicleId
			}
		});
	
		return this;
	}
});