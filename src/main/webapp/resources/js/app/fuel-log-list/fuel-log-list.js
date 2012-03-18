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
			var view = new solairis.ycl.view.FuelLog({model: fuelLog, collection: this.fuelLogList, el: this.$(".new-fuel-log")});
			view.enableNew();
			fuelLog.set("octane", this.fuelLogList.octaneMode());
			fuelLog.set("fuel", this.fuelLogList.fuelAverage());
			fuelLog.set("odometer", this.fuelLogList.distanceAverage());
			// TODO - Set new record defults here (maybe render won't have to be called manually
			// since we're changing the model.)
			view.render();
			this.$(".new-fuel-log").html(tmpl.render(tmpl.text.fuelLog, tmpl.view.fuelLog(fuelLog.toJSON())));
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

	var editRecord = function($row) {
		if ( !$row.hasClass("disabled") && !$row.hasClass("editing") ) {

			// Remove Fresh
			clearTimeout( $row.removeClass("fresh").data("freshTimeoutId") );
			var odometerWidth = $row.find(".odometer > .view.number").width();
			var fuelWidth = $row.find(".fuel > .view.number").width();
			var logId = $row.data("logId");

			$row.find(".odometer > .edit.number").width(odometerWidth);
			$row.find(".fuel > .edit.number").width(fuelWidth);

			ycl.getFuelLog({vehicleId : vehicleId, logId : logId}, function(response, status) {
				if (status === YCL.VehicleFuelLogStatus.OK) {

					var fuelLog = null;

					// Create defaults for new log
					if (logId == null && $row.hasClass("new")) {
						$row.find(".odometer > .edit.number").width(100);
						$row.find(".fuel > .edit.number").width(80);
						var now = new Date();

						// Calculatae avgs for od, fuel and oct.
						var prevOdometer = 0;
						var prevOdometerReading = isNaN( $row.next().find(".odometer > .view.number").text() ) ? 0 : parseInt( $row.next().find(".odometer > .view.number").text() );
						var odometerDifference = 0;
						var odometerCount = 0;
						var octaneMean = new YCL.mean();
						var fuelAvg = new YCL.average();
						$("#vehicleFuelLogs > li:not(:first):not(.unused):lt(11)").each(function() {
							var odometer = isNaN( $(this).find(".odometer > .view.number").text() ) ? 0 : parseInt( $(this).find(".odometer > .view.number").text() );
							if (prevOdometer !== 0) {
								odometerDifference = odometerDifference + prevOdometer - odometer;
								odometerCount++;

								fuelAvg.add( $(this).find(".fuel > .view.number").text() );
							}
							prevOdometer = odometer;
							octaneMean.add( $(this).data("octane") );
						});

						// Create New Log
						fuelLog = {
							logDate: now.getTime(),
							odometer: odometerCount == 0 ? 0 : prevOdometerReading + odometerDifference/odometerCount,
							fuel: fuelAvg.get(),
							octane: octaneMean.get(),
							missedFillup: odometerCount == 0 && prevOdometer == 0
						};
					} else {
						fuelLog = {
							logDate: response.fuelLog.logDate,
							odometer: response.fuelLog.odometer,
							fuel: response.fuelLog.fuel,
							octane: response.fuelLog.octane,
							missedFillup: response.fuelLog.missedFillup
						};
					}

					var logDate = new Date((fuelLog.logDate != null ? fuelLog.logDate : new Date().getTime()));
					$row.find(".odometer > .edit.number").val( fuelLog.odometer );
					$row.find(".fuel > .edit.number").val( fuelLog.fuel );
					$row.find(".octane input[name=octane]").val( fuelLog.octane );
					$row.data("logDate", logDate);
					$row.find(".date > .edit").val( logDate.getFullYear()+" "+logDate.getMonthShortName()+" "+logDate.getDate() ).datepick({dateFormat: 'yyyy M dd', defaultDate: logDate, onSelect: function(dates) {
							if (dates.length === 1) {
								var selectedDate = dates[0];
								$row.data("logDate", selectedDate);
							} else {
								alert("Error getting date");
							}
					}});

					if (fuelLog.missedFillup) {
						$row.find(".missedFillup input[name=missedFillup]").attr("checked", "checked");
					} else {
						$row.find(".missedFillup input[name=missedFillup]").removeAttr("checked");
					}
				} else {
					alert("Error retrieving this record: " + status);
				}
			});

			// Cleanup
			$("#vehicleFuelLogs > li, .options > .add").addClass("disabled");
			$row.removeClass("disabled").addClass("editing");
			$row.find(".edit-section").show();

			if ( !$row.hasClass("new") ) {
				$("#vehicleFuelLogs > li:not(:first)").each(function(e) {
					if ( $(this).data("logId") !== logId ) {
						$(this).addClass("lead");
						return true;
					} else {
						return false;
					}
				});
			}
		}
	};


	if (vehicleId) {

		// Add click events

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

		// Misc
		$(".options > .add").click(function() {
			if (!$(this).hasClass("disabled")) {
				if ( $("#vehicleFuelLogs > li.new").is(":visible") ) {
					closeNewRow();
				} else {
					alert("error. no new row");
				}
			}
		});
	}

});