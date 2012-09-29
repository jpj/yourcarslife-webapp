/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.model.Vehicle = Backbone.Model.extend({
	idAttribute: "vehicleId",
	urlRoot: YCLConstants.BASE_URL + '/api/vehicle'
});

solairis.ycl.collection.VehicleList = Backbone.Collection.extend({
	model: solairis.ycl.model.FuelLog,
	url: YCLConstants.BASE_URL + '/api/vehicle'
});