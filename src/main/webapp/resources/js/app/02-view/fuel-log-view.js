
solairis.ycl.view.FuelLog = Backbone.View.extend({
	tagName: "li",
	className: "fuel-log",
	events: {
		"click .view": "editFuelLog",
		"submit form": "saveFuelLog",
		"click input[name=cancel]": "cancelFuelLog"
	},
	initialize: function() {
		this.model.on("change", this.render, this);
		this.options.nextModel.on("change", this.render, this);
		this.model.on("all", this.render, this);
	},
	render: function() {
		var tmpl = solairis.ycl.template;
		var logDate = new Date(this.model.get("logDate"));
		var c = !this.model.get("cost") ? null : this.model.get("cost").toString();
		var costFmt = c === null ? null : c.substr(0, c.length - 2) + "." + c.substr(c.length -2);
		var economy = "-";
		var nextModel = this.options.nextModel;
		if (nextModel !== undefined && !this.model.get("missedFillup")) {
			economy = ((this.model.get("odometer")-nextModel.get("odometer")) / this.model.get("fuel")).toFixed(2);
		}

		this.$el.html(tmpl.render(solairis.ycl.template.text["fuel-log-template"], {
			fuelLog: this.model.toJSON(),
			logDateFormattedForHumans: logDate.toString("MMM d, yyyy"),
			logDateFormattedForDateTimeLocal: logDate.toString("yyyy-MM-ddTHH:mm"),
			odometer: this.model.get("odometer") ? this.model.get("odometer").toFixed(1) : this.model.get("odometer"),
			fuel: this.model.get("fuel") ? this.model.get("fuel").toFixed(3) : this.model.get("fuel"),
			cost: costFmt,
			costPerFuel: this.model.get("cost") ? parseFloat((costFmt)/this.model.get("fuel")).toFixed(3) : "-"
		}));
		this.$(".missedFillup input").get(0).checked = this.model.get("missedFillup");
		this.$(".economy .number").text(economy);
		this.$el.addClass("fuel-log-"+this.model.get("logId"));

		return this;
	},
	serialize: function() {
		var cost = null;
		var costStr = this.$(".cost input").val();
		if (costStr !== null) {
			if (costStr.indexOf(".") !== -1) {
				var costStrParts = costStr.split(".");
				if (costStrParts.length === 2 && costStrParts[1].length === 2) {
					cost = parseInt(costStrParts[0]+costStrParts[1]);
				}
			} else {
				cost = parseInt(costStr+"00");
			}
		}
		return {
			odometer: parseFloat( this.$(".odometer input").val() ),
			logDate: Date.parse(this.$(".date input").val().replace("T", " ")),
			fuel: parseFloat( this.$(".fuel input").val() ),
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
		this.$el.removeClass("editing");
		if (this.model.isNew()) {
			this.closeNew();
		}
	},
	enableNew: function() {
		$(this.el).addClass("is-new fuel-log editing");
	},
	closeNew: function() {
		this.$el.removeClass("is-new fuel-log").removeData("logDate").remove();
	}
});