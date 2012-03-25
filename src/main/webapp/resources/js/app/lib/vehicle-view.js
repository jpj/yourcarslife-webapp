/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.view.Vehicle = Backbone.View.extend({
	tagName: "div",
	className: "vehicle",
	initialize: function() {
		this.model.on("change", this.render, this);
	},
	render: function() {
		var tmpl = solairis.ycl.template;
		alert(this.className);
		this.$el.html(tmpl.render(this.template, tmpl.view.vehicle(this.model.toJSON())));
		return this;
	},
	
	setTemplate: function(value) {
		this.template = value;
	}
});