/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.view.App = Backbone.View.extend({
	initialize: function() {
		var user = new solairis.ycl.model.CurrentUser();
		var userHeaderView = new solairis.ycl.view.UserHeader({el: $(".user-wrapper"), model: user});
		user.fetch();
	},
	render: function() {

	}
});