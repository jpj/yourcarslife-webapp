
solairis.ycl.view.FuelLogApp = Backbone.View.extend({
	events: {
		"click #page-content .options .add": "addFuelLog",
		"blur .fuel-log.is-new .fuel input": "guessCost"
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
		var vehicleView = new solairis.ycl.view.VehicleHeader({
			el: app.$(".vehicle-wrapper"),
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
	},
	guessCost: function() {
		var $cost = this.$el.find(".fuel-log.is-new .cost input");
		var fuel = this.$el.find(".fuel-log.is-new .fuel input").val();
		if (!$cost.val()) {
			var cost = this.fuelLogList.guessNextCost(fuel);
			var c = cost == null || cost === 0 ? null : cost.toString();
			var costFmt = c == null ? null : c.substr(0, c.length - 2) + "." + c.substr(c.length -2);
			$cost.val(costFmt);
		}
	}
});

	

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