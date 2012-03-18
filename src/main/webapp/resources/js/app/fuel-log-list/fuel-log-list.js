$(document).ready(function() {

	var AppView = Backbone.View.extend({
		el: $("body"),
		events: {
			"click #page-content .options .add": "addFuelLog"
		},
		vehicleId: null,
		fuelLogList: null,
		initialize: function() {
			var app = this;
			var vehicleId = YCL.Request.getParameter("vehicleId");
			this.vehicleId = vehicleId;

			// Load Fuel Log list
			var fuelLogs = new solairis.ycl.collection.FuelLogList;
			fuelLogs.setVehicleId(vehicleId);
			this.fuelLogList = fuelLogs;

			var fuelLogListView = new solairis.ycl.view.FuelLogList({collection: fuelLogs, el: $("#fuel-logs")});
			
			// Load Graph
			var fuelLogGraphView = new solairis.ycl.view.FuelLogGraph({collection: fuelLogs, el: $("#graph")});

			fuelLogs.fetch();

			// Load Vehicle
			var vehicleModel = new solairis.ycl.model.Vehicle({vehicleId: vehicleId})
			var vehicleView = new solairis.ycl.view.Vehicle({
				el: app.$(".vehicle"),
				model: vehicleModel
			});
			vehicleModel.fetch();
		},
		addFuelLog: function() {
			var tmpl = solairis.ycl.template;
			var fuelLog = new solairis.ycl.model.FuelLog;
			fuelLog.set("octane", this.fuelLogList.octaneMode());
			fuelLog.set("fuel", this.fuelLogList.fuelAverage());
			fuelLog.set("odometer", this.fuelLogList.distanceAverage());
			var view = new solairis.ycl.view.FuelLog({model: fuelLog, collection: this.fuelLogList, el: this.$(".new-fuel-log")});
			view.render().enableNew();
		}
	});

	var appView = new AppView; // Initialize Application

//	if (vehicleId) {
//
//		// Paging
//		$(".paging a[href=#prev]").click(function(e) {
//			e.preventDefault();
//			performSearch({
//				pageNumber: pagingData.pageNumber - 1
//			});
//		});
//
//		$(".paging a[href=#next]").click(function(e) {
//			e.preventDefault();
//			performSearch({
//				pageNumber: pagingData.pageNumber + 1
//			});
//		});
//	}

});