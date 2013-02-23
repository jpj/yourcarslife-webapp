/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.view.VehicleList = Backbone.View.extend({
	initialize: function() {
		this.collection.on("reset", this.render, this);
	},
	render: function() {
		var viewCtx = this;

		this.collection.each(function(vehicle) {
			var view = new solairis.ycl.view.Vehicle({model: vehicle});
			viewCtx.$el.append(view.render().el);
		});
		return this;
	}
});