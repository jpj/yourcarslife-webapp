
solairis.ycl.view.FuelLog = Backbone.View.extend({
	tagName: "li",
	className: "fuel-log",
	events: {
		"click .display": "editFuelLog",
		"submit form": "saveFuelLog",
		"click input[name=cancel]": "cancelFuelLog",
		"focus .date input": "addCalendar"
	},
	initialize: function() {
		this.model.on("change", this.render, this);
		this.model.on("all", this.render, this);
	},
	render: function() {
		var tmpl = solairis.ycl.template;

		this.$el.html(tmpl.render(tmpl.text.fuelLog, tmpl.view.fuelLog(this.model.toJSON())));
		this.$(".missedFillup input").get(0).checked = this.model.get("missedFillup");
		this.$el.data("logDate", new Date(this.model.get("logDate")));

		// TODO - Calculate economy in a better way. This is way too inefficient.
		// Maybe listen for change events in the list-view.
		new solairis.ycl.view.FuelLogEconomyCalculate({el: this.$el.parents("#fuel-logs"), collection: this.collection});

		return this;
	},
	serialize: function() {
		var cost = null;
		var costStr = this.$(".cost input").val();
		if (costStr != null) {
			if (costStr.indexOf(".") != -1) {
				var costStrParts = costStr.split(".");
				if (costStrParts.length == 2 && costStrParts[1].length == 2) {
					cost = parseInt(costStrParts[0]+costStrParts[1]);
				}
			} else {
				cost = parseInt(costStr+"00");
			}
		}
		return {
			odometer: parseFloat( this.$(".odometer input.edit").val() ),
			logDate: $(this.el).data("logDate"),
			fuel: parseFloat( this.$(".fuel input.edit").val() ),
			octane: parseInt( this.$(".octane input").val() ),
			cost: cost,
			missedFillup: this.$(".missedFillup input").get(0).checked,
			vehicle: {
				vehicleId: this.options.vehicleId
			}
		};
	},
	editFuelLog: function(e) {
		e.preventDefault();
		this.$el.addClass("editing");
	},
	saveFuelLog: function(e) {
		var ctx = this;
		e.preventDefault();
		this.model.set(this.serialize.call(ctx));
		if (this.model.get("logId")) {
			this.model.save(null, {
				wait: true,
				success: function() {
					ctx.$el.removeClass("editing");
				},
				error: function() {
					alert("Error saving fuel log");
				}
			});
		} else {
			// TODO - This should prob be moved out of here. The
			// fuel log view shouldn't know of the whole collection.
			this.collection.create(this.model.toJSON(), {
				wait: true,
				success: function() {
					ctx.$el.remove();
	},
				error: function() {
					alert("error adding new fuel log");
				}
			});
		}
	},
	cancelFuelLog: function(e) {
		e.preventDefault();
		$(this.el).removeClass("editing");
		if (this.model.get("logId")) {
			this.model.fetch();
			this.render();
		} else {
			this.closeNew();
		}
	},
	enableNew: function() {
		$(this.el).addClass("is-new fuel-log editing");
	},
	closeNew: function() {
		this.$el.removeClass("is-new fuel-log").removeData("logDate").remove();
	},
	addCalendar: function(e) {
		var viewCtx = this;
		$(e.currentTarget).datepick({dateFormat: 'yyyy M dd', defaultDate: new Date(this.model.get('logDate')), onSelect: function(dates) {
			if (dates.length === 1) {
				var selectedDate = dates[0];
				viewCtx.$el.data("logDate", selectedDate);
			} else {
				alert("Error getting date");
			}
		}});
	}
});