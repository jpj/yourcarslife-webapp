/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


solairis.ycl.model.ServiceLog = Backbone.Model.extend({
	idAttribute: "logId",
	defaults: function() {
		var now = new Date();
		return {
			logDate: now.getTime(),
			odometer: null,
			summary: null,
			description: null,
			active: true
		};
	}
});

solairis.ycl.collection.ServiceLogList = Backbone.Collection.extend({
	model: solairis.ycl.model.ServiceLog,
	url: function() {
		return YCLConstants.BASE_URL + '/api/log/service';
	}
});