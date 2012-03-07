/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {
	var view = solairis.ycl.view;

	view.FuelLog = Backbone.View.extend({
		initialize: function() {
			this.model.on("change", this.render, this);
		},
		render: function() {
			var fuelLog = this.model.toJSON();

			alert("I have a log "+ fuelLog.odometer);
		}
	});

	view.FuelLogList = Backbone.View.extend({
		initialize: function() {
//			this.collection
//			alert("constructors: "+JSON.stringify(constructors));
			this.collection.on("change", this.render, this);
		},
		render: function() {
			alert("init list: "+this.collection);
		},

		fuelLogs: [],
		setFuelLogs: function(fuelLogs) {
			this.fuelLogs = fuelLogs;
		}
	});
});