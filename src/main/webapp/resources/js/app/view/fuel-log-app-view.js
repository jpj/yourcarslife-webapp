solairis.ycl.view.FuelLogApp = Backbone.View.extend({
	events: {
		"click #page-content .options .add": "addFuelLog",
		"blur .fuel-log.is-new .fuel input": "guessCost"
	},
	initialize: function() {
		document.title = "Fuel Logs | "+solairis.ycl.constant.SITE_TITLE;
		var ctx = this;
		this.$el.html( solairis.ycl.template.text.fuelLogPage );

		// Load Fuel Log list
		new solairis.ycl.view.FuelLogList({collection: this.collection, el: $("#fuel-logs-wrapper"), vehicleId: this.options.vehicleId});

		// Load Graph
		new solairis.ycl.view.FuelLogGraph({collection: this.collection, el: $("#graph")});

		// Load Stats
		new solairis.ycl.view.FuelLogStats({collection: this.collection, el: this.$(".stats")});

		// Load Vehicle
		var vehicleModel = new solairis.ycl.model.Vehicle({vehicleId: this.options.vehicleId})
		new solairis.ycl.view.VehicleHeader({
			el: ctx.$(".vehicle-wrapper"), // can this be `this`?
			model: vehicleModel
		});
		vehicleModel.fetch();
	},
	addFuelLog: function() {
		var tmpl = solairis.ycl.template;
		var fuelLog = new solairis.ycl.model.FuelLog;
		fuelLog.set("octane", this.collection.octaneMode());
		fuelLog.set("fuel", this.collection.fuelAverage());
		fuelLog.set("odometer", this.collection.distanceAverage());
		var view = new solairis.ycl.view.FuelLog({model: fuelLog, collection: this.collection, vehicleId: this.options.vehicleId});
		this.$(".new-fuel-log").html(view.render().el);
		view.enableNew();
	},
	guessCost: function() {
		var $cost = this.$el.find(".fuel-log.is-new .cost input");
		var fuel = this.$el.find(".fuel-log.is-new .fuel input").val();
		if (!$cost.val()) {
			var cost = this.collection.guessNextCost(fuel);
			var c = cost == null || cost === 0 ? null : cost.toString();
			var costFmt = c == null ? null : c.substr(0, c.length - 2) + "." + c.substr(c.length -2);
			$cost.val(costFmt);
		}
	}
});