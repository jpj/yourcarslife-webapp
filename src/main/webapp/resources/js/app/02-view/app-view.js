/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.view.App = Backbone.View.extend({
	initialize: function() {
		this.model.on("change", this.render, this);
		var user = new solairis.ycl.model.CurrentUser();
		var userHeaderView = new solairis.ycl.view.UserHeader({el: $(".navigation-wrapper"), model: user});
	},
	render: function() {
		if (this.model.get("isAnonymous") && this.model.get("isAnonymous") === true) {
			this.$(".navigation-wrapper").html(solairis.ycl.template.text["header-anonymous-navigation-template"]);
		} else {
			this.$(".navigation-wrapper").html(solairis.ycl.template.text["header-navigation-template"]);
			this.$(".user-wrapper").html(solairis.ycl.template.render(solairis.ycl.template.text["header-user-template"], {user: this.model.toJSON()}));
		}
		return this;
	}
});