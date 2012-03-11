$(document).ready(function() {
	var ycl = new YCL();
	var vehicleId = YCL.Request.getParameter("vehicleId");

	var fuelLogs = new solairis.ycl.collection.FuelLogList;
	fuelLogs.setVehicleId(vehicleId);

	var fuelLogListView = new solairis.ycl.view.FuelLogList({collection: fuelLogs});

	fuelLogs.fetch();

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

	var performSearch = function(request, callback) {

		$("#vehicleFuelLogs li:not(:first)").addClass("available");

		ycl.vehicleFuelLogSearch(
			{pageNumber: request.pageNumber, maxResults: 20, vehicleId: vehicleId},
			/**
			 * @function for you
			 * @param {YCL.VehicleFuelLogResponse} response is the response
			 * @param {YCL.VehicleFuelLogStatus} status is the status
			 */
			function(response, status) {
				if (status === YCL.VehicleFuelLogStatus.OK) {
					// Vehicle Info
					var editVehicleUrl = document.createElement("a");
					editVehicleUrl.href = YCLConstants.BASE_URL + "/vehicle/" + response.vehicle.vehicleId;
					$("#vehicle .name").text(response.vehicle.name).attr("href", editVehicleUrl.href);
					$("#vehicle .notes").text(response.vehicle.notes);

					var prevFuel = 0;
					var prevOdometer = 0;
					var month = null;
					var altMonth = false;
					/**
					 * Documentation is good
					 * @param {Number} index
					 * @param {YCL.VehicleFuelLog} vehicleFuelLog is good
					 */
					$.each(response.vehicleFuelLogs, function(index, vehicleFuelLog) {

						var $row = $("#vehicleFuelLogs li.available:first");
						var $prevRow = $row.prev();
						var rowDate = new Date(vehicleFuelLog.logDate);

						$row.removeClass("available").removeClass("unused");

						//if ( $row.data("logId") !== vehicleFuelLog.logId && $row.data("modified") !== vehicleFuelLog.modified ) {
						if (true) {
							$row.data("logId", vehicleFuelLog.logId);
							$row.data("modified", vehicleFuelLog.modified);
							$row.data("octane", vehicleFuelLog.octane);
							$row.data("missedFillup", vehicleFuelLog.missedFillup);
							$row.find(".odometer > .view.number").text( vehicleFuelLog.odometer.toFixed(1) ); // TODO - Adjustable fixed
							$row.find(".fuel > .view.number").text( vehicleFuelLog.fuel );
							$row.find(".date > .view").text( rowDate.getFullYear()+" "+rowDate.getMonthShortName()+" "+rowDate.getDate() ).attr("title", rowDate.toString());
							//$row.find(".economy > .number").text(".");
							$row.find(".economy > .number").text( vehicleFuelLog.economy != null ? vehicleFuelLog.economy.toFixed(2) : "-");
						}

						if (month != null && month != rowDate.getMonth()) {
							altMonth = !altMonth;
						}
						month = rowDate.getMonth();
						//alert(altMonth);
						$row.addClass(altMonth ? "altMonth1" : "altMonth2").removeClass(!altMonth ? "altMonth1" : "altMonth2");

						// TODO: If this record and the previous were not modified, don't calculate economy.

//						if ( $prevRow.length !== 0 && prevFuel !== 0 && prevOdometer !== 0 && !$prevRow.data("missedFillup") ) {
//							var rawMpg = (prevOdometer - vehicleFuelLog.odometer) / prevFuel;
//							$prevRow.find(".economy > .number").text( rawMpg.toFixed(2) );
//						}

						prevFuel = vehicleFuelLog.fuel;
						prevOdometer = vehicleFuelLog.odometer;
//						$row.find(".economy > .number").text('-');

					});

					$("#vehicleFuelLogs > li.available").addClass("unused");
					$("#vehicleFuelLogs > li:even").removeClass("odd");
					$("#vehicleFuelLogs > li:odd").addClass("odd");

					var from = response.pageNumber * response.pageSize - response.pageSize + 1;
					var to = response.pageNumber * response.pageSize;
					var total = response.totalResults;

					//$("#paging").data("pageNumber", response.pageNumber);
					pagingData.pageNumber = response.pageNumber;
					$(".paging .from").text(from);
					$(".paging .to").text(to > total ? total : to);
					$(".paging .total").text(total);

					if (total > response.pageSize) {
						$(".paging").show();
					} else {
						$(".paging").hide();
					}

					if (response.totalResults == 0) {
						openNewRow();
					}

					// Do Graph
					graphVehicleFuelLogs(response.vehicleFuelLogs);

					if (callback instanceof Function) {
						callback();
					}
				} else {
					alert("error: " + status);
				}
			}
		);
	};

	var openNewRow = function() {
		var $row = $("#vehicleFuelLogs > li.new");
		$row.slideDown(500 ,function() {
			$row.find(".odometer .edit.number").focus();
			$(".options > .add > .indicator").text("-");
		});
		editRecord( $row );
	};

	var closeNewRow = function() {
		$("#vehicleFuelLogs > li.new").slideUp(500 ,function() {
			$(".options > .add > .indicator").text("+");
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

		/* Edit */
		$("#vehicleFuelLogs > li > form > .display > .edit-button > a").click(function(e) {
			e.preventDefault();
			editRecord( $(this).parent().parent().parent().parent() );
		});

		/* Save */
		$("#vehicleFuelLogs > li > form > .edit-section > .holder > .submit > input[name=save]").click(function(e) {
			e.preventDefault();
			var $form = $(this).parent().parent().parent().parent();
			var $row = $(this).parent().parent().parent().parent().parent();

			$row.find("input.error").removeClass("error");

			ycl.saveFuelLog(
				{
					fuel: $form.find("input[name=fuel]").val(),
					logDate: $row.data("logDate"),
					missedFillup: $form.find("input[name=missedFillup]").is(":checked"),
					octane: $form.find("input[name=octane]").val(),
					odometer: $form.find("input[name=odometer]").val(),
					logId: $row.data("logId"),
					vehicleId: vehicleId
				},
				function(response, status) {
					if (status == YCL.VehicleFuelLogStatus.OK) {
						if (response.success) {

							// Close edit section, refresh searth, highlight entry in list.
							$row.find(".edit-section").hide();

							if ($row.hasClass("new")) {
								closeNewRow();
							}
							performSearch(
								{
									pageNumber: pagingData.pageNumber
								},
								function() {
									$("#vehicleFuelLogs > li").each(function() {
										if (response.logId === $(this).data("logId") && !$(this).hasClass("new")) {
											$(this).addClass("fresh");
											$(this).data("freshTimeoutId", setTimeout(function($row) {$row.removeClass("fresh");}, 8000, $(this)) );
											return false;
										}
										return true;
									});
								}
							);
							$row.removeClass("editing");
							$("#vehicleFuelLogs > li").removeClass("disabled").removeClass("lead");
							$(".options > .add").removeClass("disabled");

						} else {
							$.each(response.errors, function(index, error) {
								$form.find("input[name="+error.fieldName+"]").addClass("error");
							});
						}
					} else {
						alert("Error saving record: " + status);
					}
				}
			);
		});

		/* Cancel */
		$("#vehicleFuelLogs > li > form > .edit-section > .holder > .submit > input[name=cancel]").click(function(e) {
			e.preventDefault();
			var $row = $(this).parent().parent().parent().parent().parent();
			$row.find("input.error").removeClass("error");

			// Close Edit Section and redraw search results
			if ( !$row.hasClass("new") ) {
				$row.find(".edit-section").hide();
			}
			if ($row.hasClass("new")) {
				closeNewRow();
			}
			performSearch({
				pageNumber: pagingData.pageNumber
			});
			$row.removeClass("editing");
			$("#vehicleFuelLogs > li").removeClass("disabled").removeClass("lead");
			$(".options > .add").removeClass("disabled");

		});

		// Default Search
		$("#vehicleFuelLogs > li:first").removeClass("available").addClass("new");
		performSearch({
			pageNumber: 1
		});

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
					openNewRow();
				}
			}
		});
	}

});