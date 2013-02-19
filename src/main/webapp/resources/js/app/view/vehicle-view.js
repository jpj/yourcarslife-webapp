/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.view.Vehicle = Backbone.View.extend({
	tagName: "li",
	className: "vehicle",
	events: {
		"click .delete": "deleteVehicle"
	},
	initialize: function() {
		this.model.on("change", this.render, this);
	},
	render: function() {
		var tmpl = solairis.ycl.template;
		this.$el.html(tmpl.render(solairis.ycl.template.text.vehicle, tmpl.view.vehicle(this.model.toJSON())));
		return this;
	},
	deleteVehicle: function(e) {
		var ctx = this;
		e.preventDefault();

		this.$el.addClass("deleting");

		if ( confirm("Are you sure you want to delete "+this.model.get("name")+"? This action will delete all associated logs with this vehicle and cannot be undone!" ) ) {
			this.model.destroy({
				wait: true,
				success: function() {
					ctx.$el.remove();
				}, error: function() {
					alert("Error deleting vehicle. This shouldn't happen");
				}
			});
		} else {
			this.$el.removeClass("deleting");
		}


	}
});