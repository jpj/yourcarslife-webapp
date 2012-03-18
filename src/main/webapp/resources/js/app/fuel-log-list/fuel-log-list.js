$(document).ready(function() {

	var AppView = Backbone.View.extend({
		el: $("body"),
		events: {
			"click #page-content .options .add": "addFuelLog"
		},
		vehicleId: null,
		fuelLogList: null,
		initialize: function() {
			var app = this;
			var vehicleId = YCL.Request.getParameter("vehicleId");
			this.vehicleId = vehicleId;

			var fuelLogs = new solairis.ycl.collection.FuelLogList;
			fuelLogs.setVehicleId(vehicleId);
			this.fuelLogList = fuelLogs;

			var fuelLogListView = new solairis.ycl.view.FuelLogList({collection: fuelLogs, el: $("#fuel-logs")});

			fuelLogs.fetch();

			var vehicleModel = new solairis.ycl.model.Vehicle({vehicleId: vehicleId})
			var vehicleView = new solairis.ycl.view.Vehicle({
				el: app.$(".vehicle"),
				model: vehicleModel
			});
			vehicleModel.fetch();
		},
		addFuelLog: function() {
			var tmpl = solairis.ycl.template;
			var fuelLog = new solairis.ycl.model.FuelLog;
			fuelLog.set("octane", this.fuelLogList.octaneMode());
			fuelLog.set("fuel", this.fuelLogList.fuelAverage());
			fuelLog.set("odometer", this.fuelLogList.distanceAverage());
			var view = new solairis.ycl.view.FuelLog({model: fuelLog, collection: this.fuelLogList, el: this.$(".new-fuel-log")});
			view.render().enableNew();
		}
	});

	var appView = new AppView; // Initialize Application

	return;

	var pagingData = {
		pageNumber: 0
	};

	$.jqplot.config.enablePlugins = true;

	var graphVehicleFuelLogs = function(vehicleFuelLogs) {

		var fuelEconomy = [];
		var fuelEconomyAvg = new YCL.average();

		$.each(vehicleFuelLogs, function(index, vehicleFuelLog) {

			if (!vehicleFuelLog.missedFillup && vehicleFuelLog.economy) {
				var logDate = new Date(vehicleFuelLog.logDate);
				var economy = vehicleFuelLog.economy;
				fuelEconomy.push([logDate, economy]);
				fuelEconomyAvg.add(economy);
			}
		});

		$("#graph").empty(); // Clear graph
		$("#graph-holder > .average-economy").text( fuelEconomyAvg.get() ); // Average Economy

		$.jqplot("graph", [fuelEconomy], {
			//title: "My Graph",
			grid: {
				borderWidth: 1,
				shadow: false
			},
			series:[
				{
					lineWidth: 1,
					color: "#6EAB75",
					shadow: false
				}
			],
			axes:{
				xaxis: {
					renderer: $.jqplot.DateAxisRenderer,
					rendererOptions: {tickRenderer:$.jqplot.CanvasAxisTickRenderer},
					tickOptions: {
						formatString: '%Y %b %#d'
					}
				},
				yaxis: {
					tickOptions: {
						formatString: '%.2f'
					}
				}
			},
			highlighter: {
				sizeAdjust: 7.5
			},
			cursor: {
				tooltipLocation: 'sw',
				show: true
			}
		});
	};


	if (vehicleId) {

		// Paging
		$(".paging a[href=#prev]").click(function(e) {
			e.preventDefault();
			performSearch({
				pageNumber: pagingData.pageNumber - 1
			});
		});

		$(".paging a[href=#next]").click(function(e) {
			e.preventDefault();
			performSearch({
				pageNumber: pagingData.pageNumber + 1
			});
		});
	}

});