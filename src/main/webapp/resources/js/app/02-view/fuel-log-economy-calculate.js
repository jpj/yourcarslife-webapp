/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.view.FuelLogEconomyCalculate = Backbone.View.extend({
	initialize: function() {
		var ctx = this;

		this.collection.each(function(model, index) {
			var nextModel = ctx.collection.at(index+1);

			var $fuelLog = ctx.$(".fuel-log:eq("+index+")");

			if (nextModel && nextModel.get("odometer") && !model.get("missedFillup")) {
				$fuelLog.find(".economy .number").text( ((model.get("odometer")-nextModel.get("odometer")) / model.get("fuel")).toFixed(2) );
			} else {
				$fuelLog.find(".economy .number").text("-");
			}
		});


		return this;
	}
});