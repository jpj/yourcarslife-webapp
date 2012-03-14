
solairis.ycl.view.FuelLog = Backbone.View.extend({
	tagName: "li",
	className: "fuel-log",
	events: {
		"click .edit-button a": "editFuelLog",
		"click input[name=save]": "saveFuelLog",
		"click input[name=cancel]": "cancelFuelLog"
	},
	initialize: function() {
		this.model.on("change", this.render, this);
		this.model.on("all", this.render, this);
	},
	render: function() {
		var tmpl = solairis.ycl.template;
		var fuelLog = this.model.toJSON();

		$(this.el).html(tmpl.render(tmpl.text.fuelLog, tmpl.view.fuelLog(fuelLog)));

		this.$(".missedFillup input").get(0).checked = fuelLog.missedFillup;
		$(this.el).data("logDate", new Date(fuelLog.logDate));
		return this;
	},
	serialize: function() {
		return {
			odometer: parseFloat( this.$(".odometer input.edit").val() ),
			logDate: $(this.el).data("logDate"),
			fuel: parseFloat( this.$(".fuel input.edit").val() ),
			octane: parseInt( this.$(".octane input").val() ),
			missedFillup: this.$(".missedFillup input").get(0).checked
		};
	},
	editFuelLog: function(e) {
		e.preventDefault();
		$(this.el).addClass("editing");
	},
	saveFuelLog: function(e) {
		e.preventDefault();
		this.model.set(this.serialize());
		if (this.model.get("logId")) {
			this.model.save();
			$(this.el).removeClass("editing");
		} else {
			this.fuelLogList.create(this.model.toJSON());
			$(this.el).remove();
		}
	},
	cancelFuelLog: function(e) {
		e.preventDefault();
		// TODO - Reset form
		$(this.el).removeClass("editing");
	},
	fuelLogList: null,
	setFuelLogList: function(value) {
		this.fuelLogList = value;
	}
});

solairis.ycl.view.FuelLogList = Backbone.View.extend({
	el: $("#fuel-logs"),
	initialize: function() {
		this.collection.on("add", this.addOne, this);
		this.collection.on("reset", this.addAll, this);
	},
	render: function() {
	},
	addOne: function(fuelLogModel) {
//		var logIndex = this.collection.indexOf(fuelLogModel);
		var view = new solairis.ycl.view.FuelLog({model: fuelLogModel});
		$("#fuel-logs").append(view.render().el)
	},
	addAll: function() {
		this.collection.each(this.addOne);
		return this;
	}
});