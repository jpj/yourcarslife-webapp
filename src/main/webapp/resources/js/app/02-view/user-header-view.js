/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.view.UserHeader = Backbone.View.extend({
	tagName: "ul",
	className: "user",
	initialize: function() {
		this.model.on("change", this.render, this);
	},
	render: function() {
		if (this.model.get("isAnonymous") && this.model.get("isAnonymous") === true) {
			this.$el.html(solairis.ycl.template.text["header-anonymous-user-template"]);
		} else {
			this.$el.html(solairis.ycl.template.render(solairis.ycl.template.text["header-user-template"], solairis.ycl.template.view.user(this.model.toJSON())));
		}
		return this;
	}
});