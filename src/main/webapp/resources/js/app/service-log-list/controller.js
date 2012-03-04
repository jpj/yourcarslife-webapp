/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {

	var vehicleId = YCL.Request.getParameter("vehicleId");

	var ServiceLog = Backbone.Model.extend({
		idAttribute: "logId",
		defaults: function() {
			var now = new Date();
			return {
				logDate: now.getTime(),
				odometer: null,
				summary: null,
				description: null,
				active: true
			};
		}
	});

	var ServiceLogList = Backbone.Collection.extend({
		model: ServiceLog,
		url: function() {
			return YCLConstants.BASE_URL + '/vehicle/'+vehicleId+'/log/service';
		}
	});

	var ServiceLogs = new ServiceLogList;
	ServiceLogs.comparator = function(ServiceLog) {
		return ServiceLog.get("odometer") * -1;
	};

	// Views
	var ServiceLogView = Backbone.View.extend({
		tagName: "li",
		className: "service-log",
		template: _.template($("#service-log-template").html()),

		events: {
			"click .view": "edit",
			"submit .edit form": "save",
			"click .cancel" : "cancel"
		},

		initialize: function() {
			this.model.bind('change', this.render, this);
		},
		render: function() {
			var $el = $(this.el);
			$(this.el).html(this.template(this.model.toJSON()));
			var logDate = new Date(this.model.get("logDate"));
			$(this.el).data("logDate", logDate);
			this.$(".edit-log").attr("href", YCLConstants.BASE_URL+"/vehicle/"+vehicleId+"/log/service/"+this.model.get("logId"));
			this.$(".view .log-date").text( logDate.getFullYear()+" "+logDate.getMonthShortName()+" "+logDate.getDate() );

			this.$(".edit .log-date input").val( logDate.getFullYear()+" "+logDate.getMonthShortName()+" "+logDate.getDate() ).datepick({dateFormat: 'yyyy M dd', defaultDate: logDate, onSelect: function(dates) {
				if (dates.length === 1) {
					$el.data("logDate", dates[0]);
				} else {
					alert("Error getting date");
				}
			}});

//			alert(this.model.get("odometer"));
			var odometer = this.model.get("odometer") == null ? null : this.model.get("odometer").toFixed(1);
			this.$(".view .odometer .number").text(odometer);
			this.$(".edit .odometer .number input").val(odometer);

			if (this.model.get("tags")) {
				var ServiceLogView = this;
				$.each(this.model.get("tags"), function(index, tag) {
					ServiceLogView.$(".tags").append('<span class="tag">'+tag.label+'</span> ');
				});
			}
			return this;
		},

		serialize: function() {
			return {
				odometer: parseFloat( this.$(".edit .odometer input").val() ),
				summary: this.$(".edit .summary input").val(),
				description: this.$(".edit .description textarea").val(),
				logDate: $(this.el).data("logDate")
			};
		},

		edit: function() {
			$(this.el).addClass("editing");
			return false;
		},
		save: function(e) {
			e.preventDefault();
			this.model.set(this.serialize());
			if (this.model.get("logId")) {
				// Existing Model
				this.model.save();
				$(this.el).removeClass("editing");
			} else {
				// New Model
				ServiceLogs.create(this.model.toJSON());
				$(this.el).remove();
			}
		},
		cancel: function(e) {
			e.preventDefault();
			$(this.el).removeClass("editing");
			this.model.fetch();
			this.render();
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

	var AppView = Backbone.View.extend({
		el: $("body"),

		events: {
			"click #add-new-service-log": "addNew"
		},

		initialize: function() {
			ServiceLogs.bind('add', this.addOne, this);
			ServiceLogs.bind('all', this.render, this);
			ServiceLogs.bind('reset', this.addAll, this);
			ServiceLogs.fetch();
		},
		render: function() {

		},
		addOne: function(ServiceLog) {
			var logIndex = ServiceLogs.indexOf(ServiceLog);
			var view = new ServiceLogView({model: ServiceLog});
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
			ServiceLogs.each(this.addOne);
		},

		addNew: function(e) {
			e.preventDefault();
			var view = new ServiceLogView({model: new ServiceLog});
			view.enableEditMode();
			view.enableNew();
			$("#new-service-log").html(view.render().el);
		}
	});

	var App = new AppView;
});