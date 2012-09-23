/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.view.DashboardApp = Backbone.View.extend({
	events: {
	},
	initialize: function() {
		var addNewVehicleAnchor = document.createElement("a");
		addNewVehicleAnchor.href = YCLConstants.BASE_URL + "/vehicle/0";
		this.$(".add-new-vehicle").attr("href", addNewVehicleAnchor.href);

		this.vehicleList = new solairis.ycl.collection.VehicleList;
		this.vehicleList.on("all", this.render, this);
		var vehicleListView = new solairis.ycl.view.VehicleList({el: this.$("#vehicles"), collection: this.vehicleList});

		this.vehicleList.fetch();
	},
	render: function() {
		if (this.vehicleList.length == 0) {
			this.$(".user-has-no-vehicles").show();
		} else {
			this.$(".user-has-no-vehicles").hide();
		}
		return this;
	}
});