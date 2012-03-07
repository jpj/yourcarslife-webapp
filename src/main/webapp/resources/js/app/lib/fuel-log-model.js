/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {
	var model = solairis.ycl.model;
	var collection = solairis.ycl.collection;

	model.FuelLog = Backbone.Model.extend({
		idAttribute: "logId",
		defaults: function() {
			return {

			};
		}
	});

	collection.FuelLogList = Backbone.Collection.extend({
		model: model.FuelLog,
		url: function() {
			alert('Got Vehicle ID of ' + this.vehicleId);
			return YCLConstants.BASE_URL + '/api/vehicle/'+this.vehicleId+'/log/fuel';
		}
	});
});