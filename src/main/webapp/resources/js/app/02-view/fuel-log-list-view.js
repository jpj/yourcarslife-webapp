
solairis.ycl.view.FuelLogList = Backbone.View.extend({
	events: {
		"click .load-more": "loadNextPage"
	},
	initialize: function() {
		this.collection.on("add", this.addOne, this);
		this.collection.on("reset", this.render, this);
	},
	render: function() {
		var ctx = this;

		this.collection.each(function(model) {
			ctx.addOne.call(ctx, model);
		});

		return this;
	},
	addOne: function(model) {
		var logIndex = this.collection.indexOf(model);
		var view = new solairis.ycl.view.FuelLog({model: model, collection: this.collection, vehicleId: this.options.vehicleId});
		if (this.$(".fuel-log").length == 0 || this.$(".fuel-log:eq("+logIndex+")").length == 0) {
			this.$("ul").append(view.el);
		} else {
			this.$(".fuel-log:eq("+logIndex+")").before(view.el);
		}
		view.render();
	},
	loadNextPage: function(e) {
		e.preventDefault();

		this.collection.fetch({
			add: true,
			data: {
				offset: this.collection.length + 1,
				numResults: 10,
				vehicleId: this.options.vehicleId
			},
			error: function(a, errorResponse) {
				alert("Error fetching fuel logs");
			}
		});

	}
});