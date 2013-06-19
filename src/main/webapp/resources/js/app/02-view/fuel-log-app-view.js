solairis.ycl.view.FuelLogApp = Backbone.View.extend({
	events: {
		"click #page-content .options .add": "addFuelLog"
	},
	initialize: function() {
		document.title = "Fuel Logs | "+solairis.ycl.constant.SITE_TITLE;
		var ctx = this;
		this.$el.html( solairis.ycl.template.text["fuel-log-page-template"] );

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
	render: function() {
		return this;
	},
	addFuelLog: function(e) {
		e.preventDefault();
		var tmpl = solairis.ycl.template;
		var fuelLog = new solairis.ycl.model.FuelLog;
		fuelLog.set("octane", this.collection.octaneMode());
		fuelLog.set("fuel", this.collection.fuelAverage());
		fuelLog.set("odometer", this.collection.distanceAverage());
		var view = new solairis.ycl.view.FuelLog({model: fuelLog, collection: this.collection, vehicleId: this.options.vehicleId});
		this.$(".new-fuel-log").html(view.render().el);
		view.enableNew();
	}
});