/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {
	var model = solairis.ycl.model;

	model.Vehicle = Backbone.Model.extend({
		idAttribute: "vehicleId",
		urlRoot: YCLConstants.BASE_URL + '/api/vehicle',
		defaults: function() {
			var now = new Date();
			return {
				logDate: now.getTime()
			};
		}
	});
});