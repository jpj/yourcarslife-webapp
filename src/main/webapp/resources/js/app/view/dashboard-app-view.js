/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.view.Dashboard = Backbone.View.extend({
	events: {
	},
	initialize: function() {
		document.title = "Dashboard | "+solairis.ycl.constant.SITE_TITLE;
		var addNewVehicleAnchor = document.createElement("a");
		addNewVehicleAnchor.href = solairis.ycl.constant.BASE_URL + "/vehicle/0";
		this.$(".add-new-vehicle").attr("href", addNewVehicleAnchor.href);

		this.collection.on("all", this.render, this);
	},
	render: function() {
		this.$el.html(solairis.ycl.template.text.dashboard);
		var vehicleListView = new solairis.ycl.view.VehicleList({el: this.$("#vehicles"), collection: this.collection});
		vehicleListView.render();
		if (this.collection.length == 0) {
			this.$(".user-has-no-vehicles").show();
		} else {
			this.$(".user-has-no-vehicles").hide();
		}
		return this;
	}
});