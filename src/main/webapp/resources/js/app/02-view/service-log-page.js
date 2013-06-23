solairis.ycl.view.ServiceLogPage = Backbone.View.extend({
	events: {
		"click #add-new-service-log": "addNew"
	},

	initialize: function() {
		this.collection.on('add', this.addOne, this);
		this.collection.on("reset", this.render, this);
		return this;
	},
	render: function() {
		document.title = "Service Logs | "+solairis.ycl.constant.SITE_TITLE;
		this.$el.html( solairis.ycl.template.text["service-log-page-template"] );

		var vehicle = new solairis.ycl.model.Vehicle({
			vehicleId: this.options.vehicleId
		});
		new solairis.ycl.view.VehicleHeader({
			el: $(".vehicle"),
			model: vehicle
		});
		vehicle.fetch();

		this.collection.each(function(serviceLog) {
			this.addOne.call(this, serviceLog);
		}, this);

		return this;
	},
	addOne: function(serviceLog) {
		var logIndex = this.collection.indexOf(serviceLog);
		var view = new solairis.ycl.view.ServiceLog({
			collection: this.collection,
			model: serviceLog,
			vehicleId: this.options.vehicleId
		});
		if ($("#service-logs .service-log").length === 0 || $("#service-logs .service-log:eq("+logIndex+")").length === 0) {
			$("#service-logs").append(view.render().el);
		} else {
			$("#service-logs .service-log:eq("+logIndex+")").before(view.render().el);
		}
		view.enableNew();
		setTimeout(function() {
			view.disableNew();
		}, 2000);
	},

	addNew: function(e) {
		e.preventDefault();
		var view = new solairis.ycl.view.ServiceLog({
			collection: this.collection,
			model: new solairis.ycl.model.ServiceLog,
			vehicleId: this.options.vehicleId
		});
		view.enableEditMode();
		view.enableNew();
		$("#new-service-log").html(view.render().el);
	}
});