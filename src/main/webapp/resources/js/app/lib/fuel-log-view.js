/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {
	var view = solairis.ycl.view;

	view.FuelLog = Backbone.View.extend({
		initialize: function() {
			this.model.on("change", this.render, this);
			this.model.on("all", this.render, this);
		},
		render: function() {
			var fuelLog = this.model.toJSON();

			alert("I have a log "+ fuelLog.odometer);
		}
	});

	view.FuelLogList = Backbone.View.extend({
		initialize: function() {
			this.collection.on("change", this.render, this);
			this.collection.on("all", this.render, this);
		},
		render: function() {
			alert("init list: "+JSON.stringify(this.collection.toJSON()));
		}
	});
});