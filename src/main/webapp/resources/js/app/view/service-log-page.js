solairis.ycl.view.ServiceLogPage = Backbone.View.extend({
	events: {
		"click #add-new-service-log": "addNew"
	},

	initialize: function() {
		this.collection.bind('add', this.addOne, this);
		this.collection.bind('all', this.render, this);
		this.collection.bind('reset', this.addAll, this);

		var vehicleId = YCL.Request.getParameter("vehicleId");

		this.collection.fetch({
			data: {
				vehicleId: vehicleId
			},
			error: function(a, errorResponse) {
				alert("Error fetching service log list");
			}
		});

		var vehicleModel = new solairis.ycl.model.Vehicle({
			vehicleId: vehicleId
		})
		var vehicleView = new solairis.ycl.view.VehicleHeader({
			el: $(".vehicle"),
			model: vehicleModel
		});
		vehicleModel.fetch();
	},
	render: function() {

	},
	addOne: function(serviceLog) {
		var logIndex = this.collection.indexOf(serviceLog);
		var view = new solairis.ycl.view.ServiceLog({
			collection: this.collection,
			model: serviceLog,
			template: _.template($("#service-log-template").html())
		});
		if ($("#service-logs .service-log").length == 0 || $("#service-logs .service-log:eq("+logIndex+")").length == 0) {
			$("#service-logs").append(view.render().el);
		} else {
			$("#service-logs .service-log:eq("+logIndex+")").before(view.render().el);
		}
		view.enableNew();
		setTimeout(function() {
			view.disableNew();
		}, 2000);
	},
	addAll: function() {
		var ctx = this;
		this.collection.each(function(serviceLog) {
			ctx.addOne.call(ctx, serviceLog)
		});
	},

	addNew: function(e) {
		e.preventDefault();
		var view = new solairis.ycl.view.ServiceLog({
			collection: this.collection,
			model: new solairis.ycl.model.ServiceLog,
			template: _.template($("#service-log-template").html())
		});
		view.enableEditMode();
		view.enableNew();
		$("#new-service-log").html(view.render().el);
	}
});