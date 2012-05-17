
solairis.ycl.view.FuelLogList = Backbone.View.extend({
	events: {
		"click .load-more": "addPage",
		"click .load-all": "addAll"
	},
	initialize: function() {
		this.collection.on("add", this.addOne, this);
		this.collection.on("reset", this.addPage, this);
		this.cidsLoaded = [];
	},
	render: function() {
	},
	addOne: function(model) {
		var logIndex = this.collection.indexOf(model);
		var view = new solairis.ycl.view.FuelLog({model: model, collection: this.collection});
		if (this.$(".fuel-log").length == 0 || this.$(".fuel-log:eq("+logIndex+")").length == 0) {
			this.$("ul").append(view.render().el);
		} else {
			this.$(".fuel-log:eq("+logIndex+")").before(view.render().el);
		}
		this.cidsLoaded.push(model.cid);
	},
	addAll: function() {
		var ctx = this;
		this.$("ul").empty();
		this.collection.each(function(model) {
			ctx.addOne.call(ctx, model);
		});
		return this;
	},
	addPage: function() {
		var ctx = this;
		var numResults = 0;
		this.collection.filter(function(model, iterator) {
			if (ctx.cidsLoaded.indexOf(model.cid) == -1 && numResults < 20) {
				numResults++;
				ctx.addOne.call(ctx, model);
			}
		});
		return this;
	}
});