/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {
//	alert($("#fuel-log-template").length);
solairis.ycl.view.FuelLog = Backbone.View.extend({
	tagName: "li",
	className: "fuel-log",
	template: _.template($("#fuel-log-template").html()),
	initialize: function() {
		this.model.on("change", this.render, this);
		this.model.on("all", this.render, this);
	},
	render: function() {
		var fuelLog = this.model.toJSON();

		$(this.el).html(this.template);

		this.$(".odometer .view").text(fuelLog.odometer);
		return this;
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
});