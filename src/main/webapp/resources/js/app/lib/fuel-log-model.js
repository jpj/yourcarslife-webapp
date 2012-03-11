/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.model.FuelLog = Backbone.Model.extend({
	idAttribute: "logId"
});

solairis.ycl.collection.FuelLogList = Backbone.Collection.extend({
	model: solairis.ycl.model.FuelLog,
	url: function() {
		return YCLConstants.BASE_URL + '/api/vehicle/'+this.vehicleId+'/log/fuel';
	},
	vehicleId: null,
	setVehicleId: function(value) {
		this.vehicleId = value;
	}
});
