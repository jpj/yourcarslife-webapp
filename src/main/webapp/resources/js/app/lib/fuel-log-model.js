/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.model.FuelLog = Backbone.Model.extend({
	idAttribute: "logId",
	defaults: function() {
		var now = new Date();
		return {
			logDate: now.getTime(),
			odometer: 0, // TODO - default to best guess based on last 10-ish fillups
			fuel: 0, // TODO - default to best guess based on last 10-ish fillups
			octane: 0, // TODO - default to mode of last 10-ish fillups
			missedFillup: false,
			active: true
		};
	}
});

solairis.ycl.collection.FuelLogList = Backbone.Collection.extend({
	model: solairis.ycl.model.FuelLog,
	url: function() {
		return YCLConstants.BASE_URL + '/api/vehicle/'+this.vehicleId+'/log/fuel';
	},
	vehicleId: null,
	setVehicleId: function(value) {
		this.vehicleId = value;
	},
	comparator: function(fuelLog) {
		return fuelLog.get("odometer") * -1;
	},
	average: function() {
		var avg = 0;
		// TODO - finish
		this.each(function(fuelLog){
//			avg += fuelLog;
		});
		return avg;
	}
});
