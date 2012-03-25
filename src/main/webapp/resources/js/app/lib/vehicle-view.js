/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.view.Vehicle = Backbone.View.extend({
	initialize: function() {
		this.model.on("change", this.render, this);
	},
	render: function() {
		this.$(".name").text(this.model.get("name"));
		this.$(".notes").text(this.model.get("notes"));
	}
});