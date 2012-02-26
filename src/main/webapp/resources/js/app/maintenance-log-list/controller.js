/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {
	
	var vehicleId = YCL.Request.getParameter("vehicleId");
	
	var MaintLog = Backbone.Model.extend({
		defaults: function() {
			return {
				logDate: null,
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
		initialize: function() {
			this.model.bind('change', this.render, this);
		},
		render: function() {
			$(this.el).html(this.template(this.model.toJSON()));
			var logDate = new Date(this.model.get("logDate"));
			this.$(".edit").attr("href", YCLConstants.BASE_URL+"/vehicle/"+vehicleId+"/log/maintenance/"+this.model.get("logId"));
			this.$(".summary").text(this.model.get("summary"));
			this.$(".log-date").text(logDate.getFullYear()+" "+logDate.getMonthShortName()+" "+logDate.getDate());
			this.$(".description").text(this.model.get("description"));
			var maintLogView = this;
			$.each(this.model.get("tags"), function(index, tag) {
				maintLogView.$(".tags").append('<span class="tag">'+tag.label+'</span> ');
			});
			return this;
		}
	});
	
	var AppView = Backbone.View.extend({
		el: $("#maintenance-log-list-app"),
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
		}
	});
	
	var App = new AppView;
});