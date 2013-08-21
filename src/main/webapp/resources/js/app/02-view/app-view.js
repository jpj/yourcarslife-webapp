/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.view.App = Backbone.View.extend({
	events: {
		"click .dash": "goDashboard"
	},
	initialize: function() {
		this.model.on("change", this.render, this);
	},
	render: function() {
		if (this.model.get("isAnonymous") && this.model.get("isAnonymous") === true) {
			this.$(".navigation-wrapper").html(solairis.ycl.template.text["header-anonymous-navigation-template"]);
		} else {
			this.$(".navigation-wrapper").html(solairis.ycl.template.text["header-navigation-template"]);
			this.$(".user-wrapper").html(solairis.ycl.template.render(solairis.ycl.template.text["header-user-template"], {user: this.model.toJSON()}));
		}
		return this;
	},
	goDashboard: function(e) {
		// Not always guaranteed router.
		// TODO: Fix this
		if (window.app && window.app.navigate) {
			e.preventDefault();
			window.app.navigate('/dash');
			window.app.dashboard();
		}
	}
});