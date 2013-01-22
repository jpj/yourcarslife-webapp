/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

solairis.ycl.view.VehiclePage = Backbone.View.extend({
	events: {
		"submit form": "save"
	},
	initialize: function() {
		this.$el.html(solairis.ycl.template.text["vehicle-edit-template"]);
		if (this.model) {
			this.model.on("change", this.render, this);
		}
		return this;
	},
	render: function() {
		this.$(".display-name").text(this.model.get("name"));
		this.$("input[name=name]").val(this.model.get("name"));
		this.$("input[name=description]").val(this.model.get("description"));
		this.$("textarea[name=notes]").val(this.model.get("notes"));
		return this;
	},
	save: function(e) {
		var ctx = this;
		e.preventDefault();

		this.$("input.error, textarea.error").removeClass("error");
		this.$(".error").text('');

		this.model.save(
		{
			name: this.$("input[name=name]").val(),
			description: this.$("input[name=description]").val(),
			notes: this.$("textarea[name=notes]").val()
		}, {
			wait: true,
			silent: true,
			success: function(vehicle) {
				ctx.$(".success").show();
				setTimeout(function($sucess) {
					$sucess.fadeOut("slow");
				}, 4000, ctx.$(".success"));
			},
			error: function(vehicle, errorResponse) {
				if (errorResponse.status == 405) {
					var errors = JSON.parse(errorResponse.responseText);
					for (var i = 0; i < errors.length; i++) {
						var error = errors[i];
						ctx.$(".input.name .error").text(solairis.ycl.error.resolve(error));
						ctx.$("*[name="+error.field+"]").addClass("error");
					}
				} else {
					alert("Error saving vehicle");
				}
			}
		});
	}
});