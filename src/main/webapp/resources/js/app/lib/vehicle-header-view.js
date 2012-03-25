/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.view.VehicleHeader = Backbone.View.extend({
	tagName: "div",
	className: "vehicle",
	initialize: function() {
		this.model.on("change", this.render, this);
	},
	render: function() {
		var tmpl = solairis.ycl.template;
		this.$el.html(tmpl.render(solairis.ycl.template.text.headerVehicle, tmpl.view.vehicle(this.model.toJSON())));
		return this;
	}
});