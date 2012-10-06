/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.model.Vehicle = Backbone.Model.extend({
	idAttribute: "vehicleId",
	urlRoot: solairis.ycl.constant.BASE_URL + '/api/vehicle'
});

solairis.ycl.collection.VehicleList = Backbone.Collection.extend({
	model: solairis.ycl.model.Vehicle,
	url: solairis.ycl.constant.BASE_URL + '/api/vehicle'
});