
solairis.ycl.view.FuelLogList = Backbone.View.extend({
	events: {
		"click .load-more": "loadNextPage"
	},
	initialize: function() {
		this.collection.on("add", this.addOne, this);
		this.collection.on("reset", this.render, this);
	},
	render: function() {
		this.$(".fuel-logs ul").empty();

		this.collection.each(function(model) {
			this.addOne.call(this, model);
		}, this);

		return this;
	},
	addOne: function(model) {
		var logIndex = this.collection.indexOf(model);
		var view = new solairis.ycl.view.FuelLog({model: model, collection: this.collection, vehicleId: this.options.vehicleId});
		if (this.$(".fuel-log").length === 0 || this.$(".fuel-log:eq("+logIndex+")").length === 0) {
			this.$("ul").append(view.el);
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

	}
});