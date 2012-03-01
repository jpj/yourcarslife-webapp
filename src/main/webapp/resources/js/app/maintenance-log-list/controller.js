/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {

	var vehicleId = YCL.Request.getParameter("vehicleId");

	var MaintLog = Backbone.Model.extend({
		idAttribute: "logId",
		defaults: function() {
			var now = new Date();
			return {
				logDate: now.getTime(),
				summary: null,
				description: null
			};
		}
	});

	var MaintLogList = Backbone.Collection.extend({
		model: MaintLog,
		url: function() {
			return YCLConstants.BASE_URL + '/vehicle/'+vehicleId+'/log/maintenance';
		}
	});

	var MaintenanceLogs = new MaintLogList;

	// Views
	var MaintLogView = Backbone.View.extend({
		tagName: "li",
		className: "maintenance-log",
		template: _.template($("#maintenance-log-template").html()),

		events: {
			"click .view": "edit",
			"submit .edit form": "close",
			"click .cancel" : "cancel"
		},

		initialize: function() {
			this.model.bind('change', this.render, this);
		},
		render: function() {
			// TODO - attach date as data() to main li
			var $el = $(this.el);
			$(this.el).html(this.template(this.model.toJSON()));
			var logDate = new Date(this.model.get("logDate"));
			this.$(".edit-log").attr("href", YCLConstants.BASE_URL+"/vehicle/"+vehicleId+"/log/maintenance/"+this.model.get("logId"));
			this.$(".view .log-date").text( logDate.getFullYear()+" "+logDate.getMonthShortName()+" "+logDate.getDate() );

			this.$(".edit .log-date input").val( logDate.getFullYear()+" "+logDate.getMonthShortName()+" "+logDate.getDate() ).datepick({dateFormat: 'yyyy M dd', defaultDate: logDate, onSelect: function(dates) {
				if (dates.length === 1) {
					$el.data("logDate", dates[0]);
				} else {
					alert("Error getting date");
				}
			}});
			if (this.model.get("tags")) {
				var maintLogView = this;
				$.each(this.model.get("tags"), function(index, tag) {
					maintLogView.$(".tags").append('<span class="tag">'+tag.label+'</span> ');
				});
			}
			return this;
		},

		serialize: function() {
			return {
				summary: this.$(".edit .summary input").val(),
				description: this.$(".edit .description input").val(),
				logDate: $(this.el).data("logDate")
			};
		},

		edit: function() {
			$(this.el).addClass("editing");
			return false;
		},
		close: function(e) {
			e.preventDefault();
			this.model.set(this.serialize());
			if (this.model.get("logId")) {
				this.model.save();
			} else {
				MaintenanceLogs.create(this.model.toJSON());
			}

			$(this.el).removeClass("editing");
		},
		cancel: function(e) {
			e.preventDefault();
			$(this.el).removeClass("editing");
			this.model.fetch();
			this.render();
		}
	});

	var AppView = Backbone.View.extend({
		el: $("body"),

		events: {
			"click #add-new-maintenance-log": "addNew"
		},

		initialize: function() {
			MaintenanceLogs.bind('add', this.addOne, this);
			MaintenanceLogs.bind('all', this.render, this);
			MaintenanceLogs.bind('reset', this.addAll, this);
			MaintenanceLogs.fetch();
		},
		render: function() {

		},
		addOne: function(maintLog) {
			var view = new MaintLogView({model: maintLog});
			$("#maintenance-logs").append(view.render().el);
		},
		addAll: function() {
			MaintenanceLogs.each(this.addOne);
		},

		addNew: function(e) {
			e.preventDefault();
			var view = new MaintLogView({model: new MaintLog});
			$("#add-new-maintenance-log").parent().append(view.render().el);
			// TODO - Delete "new" container
		}
	});

	var App = new AppView;
});