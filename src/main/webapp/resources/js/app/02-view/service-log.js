solairis.ycl.view.ServiceLog = Backbone.View.extend({
	// TODO - Inject Showdown
	tagName: "li",
	className: "service-log",

	events: {
		"click .view": "edit",
		"submit .edit form": "save",
		"click .cancel" : "cancel"
	},

	initialize: function() {
		this.model.bind('change', this.render, this);
	},
	render: function() {

		var converter = new Showdown.converter();
		var logDate = new Date(this.model.get("logDate"));

		var c = !this.model.get("cost") ? null : this.model.get("cost").toString();
		var costFmt = c === null ? null : c.substr(0, c.length - 2) + "." + c.substr(c.length -2);

		var $el = $(this.el);
		this.$el.html(solairis.ycl.template.render(solairis.ycl.template.text["service-log-template"], {
			serviceLog: this.model.toJSON(),
			logDateFormattedForHumans: logDate.toString("MMM d, yyyy"),
			logDateFormattedForDateTimeLocal: logDate.toString("yyyy-MM-ddTHH:mm"),
			costFmt: costFmt
		}));

		this.$(".edit-log").attr("href", solairis.ycl.constant.BASE_URL+"/vehicle/"+this.vehicleId+"/log/service/"+this.model.get("logId"));

		var odometer = this.model.get("odometer") == null ? null : this.model.get("odometer").toFixed(1);
		this.$(".view .odometer .number").text(odometer);
		this.$(".edit .odometer .number input").val(odometer);

		this.$(".view .description").html(this.model.get('description') == null ? null : converter.makeHtml(this.model.get('description')));

		if (this.model.get("tags")) {
			var ServiceLogView = this;
			$.each(this.model.get("tags"), function(index, tag) {
				ServiceLogView.$(".tags").append('<span class="tag">'+tag.label+'</span> ');
			});
		}

		this.$el.data("logId", this.model.get("logId"));

		return this;
	},

	serialize: function() {
		var cost = null;
		var costStr = this.$(".edit .cost input").val();
		if (costStr.indexOf(".") != -1) {
			var costStrParts = costStr.split(".");
			if (costStrParts.length == 2 && costStrParts[1].length == 2) {
				cost = parseInt(costStrParts[0]+costStrParts[1]);
			}
		} else {
			cost = parseInt(costStr+"00");
		}
		return {
			cost: cost,
			odometer: parseFloat( this.$(".edit .odometer input").val() ),
			summary: this.$(".edit .summary input").val(),
			description: this.$(".edit .description textarea").val(),
			logDate: Date.parse(this.$(".log-date input").val().replace("T", " "))
		};
	},

	edit: function() {
		var descViewHeight = this.$(".container.view .description").height() + 20;
		var descEditHeight = this.$(".container.edit .description textarea").height();

		if (descViewHeight > descEditHeight) {
			this.$(".container.edit .description textarea").height( descViewHeight );
		}
		this.$el.addClass("editing");
		this.$(".log-date input").focus();
		return false;
	},
	save: function(e) {
		var ctx = this;
		e.preventDefault();
		this.model.set(this.serialize());
		if (this.model.get("logId")) {
			// Existing Model
			this.model.save(null, {
				wait: true,
				success: function() {
					ctx.$el.removeClass("editing");
				},
				error: function() {
					alert("Error saving service log");
				}
			});
		} else {
			// New Model
			this.model.set("vehicle", {vehicleId: this.options.vehicleId});

			this.collection.create(this.model.toJSON(), {
				wait: true,
				success: function() {
					ctx.$el.remove();
				},
				error: function() {
					alert("Error creating new service log");
				}
			});
		}
	},
	cancel: function(e) {
		e.preventDefault();
		$(this.el).removeClass("editing");

		if (this.model.isNew()) {
			this.$el.remove();
		}
	},

	enableEditMode: function() {
		$(this.el).addClass("editing");
	},

	disableEditMode: function() {
		$(this.el).removeClass("editing");
	},
	enableNew: function() {
		$(this.el).addClass("new");
	},
	disableNew: function() {
		$(this.el).removeClass("new");
	}
});