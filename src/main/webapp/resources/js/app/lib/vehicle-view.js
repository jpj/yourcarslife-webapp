/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {
	var view = solairis.ycl.view;

	view.Vehicle = Backbone.View.extend({
		initialize: function() {
			this.render();
		},
		render: function() {
			this.model.fetch({
				success: function(model) {
					alert("veh: "+ JSON.stringify( model.toJSON() ));
				}
			});
		},
		doIt: function() {
//			alert("veh: "+ JSON.stringify( this.model.toJSON() ));
		}
	});
});