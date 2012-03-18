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
			odometer: 0,
			fuel: 0,
			octane: 0,
			cost: 0,
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
		var finalCount = 0;
		for (var i = 0; i < 10 && i < this.length; i++) {
			var fuelLog = this.at(i);
			avg += fuelLog.get("fuel");
			finalCount = i;
		}
		finalCount++;

		return avg/finalCount;
	},
	distanceAverage: function() {

		var prevOdometer = 0;
		var odometerDifference = 0;
		var count = 0;
		for (var i = 0; i < 10 && i < this.length; i++) {
			var fuelLog = this.at(i);
			if (prevOdometer != 0) {
				odometerDifference += prevOdometer - fuelLog.get("odometer");
				count++;
			}
			prevOdometer = fuelLog.get("odometer");
		}

		return count == 0 ? 0 : this.at(0).get("odometer") + odometerDifference / count;
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

		for (var i = 0; i < 10 && i < this.length; i++) {
			var fuelLog = this.at(i);
			add(fuelLog.get("octane"));
		}

		return get();
	}
});
