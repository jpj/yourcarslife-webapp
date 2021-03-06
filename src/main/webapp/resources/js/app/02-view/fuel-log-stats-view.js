/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.view.FuelLogStats = Backbone.View.extend({
	initialize: function() {
		this.collection.on("all", this.render, this);
	},
	render: function() {
		var ctx = this;
		this.$el.html(solairis.ycl.template.render(solairis.ycl.template.text["fuel-log-stats-template"], {
			averageEconomy: ctx.collection.economyAverage(),
			recentAverageEconomy: ctx.collection.recentEconomyAverage(),
			totalFillups: ctx.collection.length
		}));
		return this;
	}
})