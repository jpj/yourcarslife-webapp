/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.view.Dashboard = Backbone.View.extend({
	events: {
		"click .add-new-vehicle": "addVehicle"
	},
	initialize: function() {
		document.title = "Dashboard | "+solairis.ycl.constant.SITE_TITLE;
		if (this.collection) {
			this.collection.on("all", this.render, this);
		}
		return this;
	},
	render: function() {
		this.$el.html(solairis.ycl.template.text["dashboard-template"]);
		var vehicleListView = new solairis.ycl.view.VehicleList({el: this.$("#vehicles"), collection: this.collection});
		vehicleListView.render();
		if (this.collection.length === 0) {
			this.$(".user-has-no-vehicles").show();
		} else {
			this.$(".user-has-no-vehicles").hide();
		}
		return this;
	},

	addVehicle: function(e) {
		e.preventDefault();
		var vehicleName = prompt("New Vehicle Name:");
		if (vehicleName !== null && vehicleName !== "") {
			this.collection.create({name: vehicleName}, {
				wait: true,
				success: function(collectionMaybe, vehicle) {
					document.location.hash = "#/vehicle/"+vehicle.vehicleId;
				}
			});
		}
	}
});