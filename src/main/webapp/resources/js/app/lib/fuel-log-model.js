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
	fuelAverage: function() {
		var avg = 0;
		// TODO - finish
		this.each(function(fuelLog){
//			avg += fuelLog;
		});
		return avg;
	},
	distanceAverage: function() {

	},
	octaneMode: function() {
		var store = {};

		var add = function(x) {
			if ( store[x] == null ) {
				store[x] = 0;
			}

			store[x]++;
		};

		var get = function() {
			var highestKey = null;
			var highest = 0;
			for (var key in store) {
				if (store[key] > highest) {
					highest = store[key];
					highestKey = key;
				}
			}
			return highestKey;
		};

		for (var i = 0; i < 10 || i < this.length; i++) {
			var fuelLog = this.at(i);
			add(fuelLog.get("octane"));
		}

		return get();
	}
});
