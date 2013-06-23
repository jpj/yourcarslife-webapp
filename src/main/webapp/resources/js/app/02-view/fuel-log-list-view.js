
solairis.ycl.view.FuelLogList = Backbone.View.extend({
	events: {
		"click .load-more": "loadNextPage",
		"click .load-all": "loadAll"
	},
	initialize: function() {
		this.collection.on("add", this.addOne, this);
		this.collection.on("reset", this.render, this);
		this.collection.on("sync", this.calculateFuelEconomy, this);
	},
	render: function() {
		this.$("#fuel-logs").empty();

		this.collection.each(function(model) {
			this.addOne.call(this, model);
		}, this);

		return this;
	},
	addOne: function(model) {
		var logIndex = this.collection.indexOf(model);
		var nextModel = this.collection.at(logIndex + 1);

		var view = new solairis.ycl.view.FuelLog({model: model, nextModel: nextModel, collection: this.collection, vehicleId: this.options.vehicleId});
		if (this.$(".fuel-log").length === 0 || this.$(".fuel-log:eq("+logIndex+")").length === 0) {
			this.$("#fuel-logs").append(view.el);
		} else {
			this.$(".fuel-log:eq("+logIndex+")").before(view.el);
		}
		view.render();
	},
	loadNextPage: function(e) {
		e.preventDefault();

		this.collection.fetch({
			remove: false,
			data: {
				offset: this.collection.length,
				numResults: 10,
				vehicleId: this.options.vehicleId
			}
		});

	},
	loadAll: function(e) {
		e.preventDefault();

		this.collection.fetch({
			data: {
				offset: 0,
				numResults: 1000,
				vehicleId: this.options.vehicleId
			}
		});

	}
});