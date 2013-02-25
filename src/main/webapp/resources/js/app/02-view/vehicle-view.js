/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.view.Vehicle = Backbone.View.extend({
	tagName: "li",
	className: "vehicle",
	events: {
		"click .delete": "deleteVehicle",
		"click .name a": "goToVehicle",
		"click .fuel-logs": "goToFuelLogs",
		"click .service-logs": "goToServiceLogs"
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
				}
			});
		} else {
			this.$el.removeClass("deleting");
		}


	},
	goToVehicle: function(e) {
		e.preventDefault();
		window.app.getVehicle(this.model.get("vehicleId")).navigate('/vehicle/'+this.model.get("vehicleId"));
	},
	goToFuelLogs: function(e) {
		e.preventDefault();
		window.app.getFuelLog(this.model.get("vehicleId")).navigate('/log/fuel/'+this.model.get("vehicleId"));
	},
	goToServiceLogs: function(e) {
		e.preventDefault();
		window.app.getServiceLog(this.model.get("vehicleId")).navigate('/log/service/'+this.model.get("vehicleId"));
	}
});