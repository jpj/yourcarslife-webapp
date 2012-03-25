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

		var vehicleList = new solairis.ycl.collection.VehicleList;
		var vehicleListView = new solairis.ycl.view.VehicleList({el: this.$("#vehicles"), collection: vehicleList});

		vehicleList.fetch();
	},
	render: function() {
		return this;
	}
});