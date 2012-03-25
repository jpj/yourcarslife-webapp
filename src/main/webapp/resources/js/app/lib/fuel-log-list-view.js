
solairis.ycl.view.FuelLogList = Backbone.View.extend({
	initialize: function() {
		this.collection.on("add", this.addOne, this);
		this.collection.on("reset", this.addAll, this);
	},
	render: function() {
	},
	addOne: function(fuelLogModel) {
		var logIndex = this.collection.indexOf(fuelLogModel);
		var view = new solairis.ycl.view.FuelLog({model: fuelLogModel, collection: this.collection});
		if (this.$(".fuel-log").length == 0 || this.$(".fuel-log:eq("+logIndex+")").length == 0) {
			this.$el.append(view.render().el);
		} else {
			this.$(".fuel-log:eq("+logIndex+")").before(view.render().el);
		}
	},
	addAll: function() {
		var listView = this;
		this.collection.each(function(fuelLog) {
			listView.addOne.call(listView, fuelLog);
		});
		return this;
	}
});