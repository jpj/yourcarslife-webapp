/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {
	var view = solairis.ycl.view;

	view.Vehicle = Backbone.View.extend({
		initialize: function() {
			this.model.on("change", this.render, this);
		},
		render: function() {
			this.$(".name").text(this.model.get("name"));
//			$(this.el).html(this.template(this.model.toJSON()));
//			alert("veh: "+ JSON.stringify( this.model.toJSON() ));
		},
		doIt: function() {
//			alert("veh: "+ JSON.stringify( this.model.toJSON() ));
		}
	});
});