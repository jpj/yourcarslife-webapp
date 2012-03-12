
solairis.ycl.view.FuelLog = Backbone.View.extend({
	tagName: "li",
	className: "fuel-log",
	events: {
		"click .edit-button a": "editFuelLog"
	},
	initialize: function() {
		this.model.on("change", this.render, this);
		this.model.on("all", this.render, this);
	},
	render: function() {
		var tmpl = solairis.ycl.template;
		var fuelLog = this.model.toJSON();

		$(this.el).html(tmpl.render(tmpl.text.fuelLog, tmpl.view.fuelLog(fuelLog)));

		this.$(".missedFillup input").get(0).checked = fuelLog.missedFillup;
		return this;
	},
	editFuelLog: function(e) {
		e.preventDefault();
		$(this.el).addClass("editing");
	}
});

solairis.ycl.view.FuelLogList = Backbone.View.extend({
	el: $("#fuel-logs"),
	initialize: function() {
		this.collection.on("add", this.addOne, this);
		this.collection.on("reset", this.addAll, this);
	},
	render: function() {
	},
	addOne: function(fuelLogModel) {
//		var logIndex = this.collection.indexOf(fuelLogModel);
		var view = new solairis.ycl.view.FuelLog({model: fuelLogModel});
		$("#fuel-logs").append(view.render().el)
	},
	addAll: function() {
		this.collection.each(this.addOne);
		return this;
	}
});