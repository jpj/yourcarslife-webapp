$(document).ready(function() {
	var ycl = new YCL();
	var vehicleId = $("meta[name=vehicleId]").attr("content");

	var performSearch = function(request) {

		$("#vehicleFuelLogs li").addClass("available");

		ycl.vehicleFuelLogSearch(
			{pageNumber: request.pageNumber, maxResults: 21, vehicleId: vehicleId},
			/**
			 * @function for you
			 * @param {YCL.VehicleFuelLogResponse} response is the response
			 * @param {YCL.VehicleFuelLogStatus} status is the status
			 */
			function(response, status) {
				if (status === YCL.VehicleFuelLogStatus.OK) {
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

						//if ( $row.data("vehicleFuelLogId") !== vehicleFuelLog.vehicleFuelLogId && $row.data("modified") !== vehicleFuelLog.modified ) {
						if (true) {
							$row.data("vehicleFuelLogId", vehicleFuelLog.vehicleFuelLogId);
							$row.data("modified", vehicleFuelLog.modified);
							$row.data("missedFillup", vehicleFuelLog.missedFillup);
							$row.find(".odometer > .view.number").text( vehicleFuelLog.odometer.toFixed(1) ); // TODO - Adjustable fixed
							$row.find(".fuel > .view.number").text( vehicleFuelLog.fuel );
							$row.find(".date > .view").text( rowDate.getFullYear()+" "+rowDate.getMonthShortName()+" "+rowDate.getDate() ).attr("title", rowDate.toString());
							$row.find(".economy > .number").text(".");
						}

						if (month != null && month != rowDate.getMonth()) {
							altMonth = !altMonth;
						}
						month = rowDate.getMonth();
						//alert(altMonth);
						$row.addClass(altMonth ? "altMonth1" : "altMonth2").removeClass(!altMonth ? "altMonth1" : "altMonth2");

						// TODO: If this record and the previous were not modified, don't calculate economy.

						if ( $prevRow.length !== 0 && prevFuel !== 0 && prevOdometer !== 0 /* && $prevRow.data("missedFillup") !== true */ ) {
							var rawMpg = (prevOdometer - vehicleFuelLog.odometer) / prevFuel;
							$prevRow.find(".economy > .number").text( rawMpg.toFixed(2) );
						}

						prevFuel = vehicleFuelLog.fuel;
						prevOdometer = vehicleFuelLog.odometer;
						$row.find(".economy > .number").text('-');
						
					});

					$("#vehicleFuelLogs > li.available").addClass("unused");
					$("#vehicleFuelLogs > li:even").removeClass("odd");
					$("#vehicleFuelLogs > li:odd").addClass("odd");

					var from = response.pageNumber * response.pageSize - response.pageSize + 1;
					var to = response.pageNumber * response.pageSize;
					var total = response.totalResults;

					$("#paging").data("pageNumber", response.pageNumber);
					$("#paging .from").text(from);
					$("#paging .to").text(to > total ? total : to);
					$("#paging .total").text(total);
				} else {
					alert("error: " + status);
				}
			}
		);
	};

	// Add click events

	/* Edit */
	$("#vehicleFuelLogs > li > form > .display > .edit-button > a").click(function(e) {
		e.preventDefault();
		var $row = $(this).parent().parent().parent().parent();
		if ( !$row.hasClass("disabled") && !$row.hasClass("editing") ) {
			var odometerWidth = $row.find(".odometer > .view.number").width();
			var fuelWidth = $row.find(".fuel > .view.number").width();

			$row.find(".odometer > .edit.number").width(odometerWidth);
			$row.find(".fuel > .edit.number").width(fuelWidth);

			ycl.getVehicleFuelLog(vehicleId, $row.data("vehicleFuelLogId"), function(vehicleFuelLog, status) {
				if (status === YCL.VehicleFuelLogStatus.OK) {
					var logDate = new Date(vehicleFuelLog.logDate);
					$row.find(".odometer > .edit.number").val( vehicleFuelLog.odometer );
					$row.find(".fuel > .edit.number").val( vehicleFuelLog.fuel );
					$row.find(".octane input[name=octane]").val( vehicleFuelLog.octane );
					$row.find(".date > .edit").val( logDate.getFullYear()+'/'+parseInt(logDate.getMonth()+1)+'/'+logDate.getDate() );

					if (vehicleFuelLog.missedFillup) {
						$row.find(".missedFillup input[name=missedFillup]").attr("checked", "checked");
					} else {
						$row.find(".missedFillup input[name=missedFillup]").removeAttr("checked");
					}
				} else {
					alert("Error retrieving this record: " + status);
				}
			});

			$("#vehicleFuelLogs > li").addClass("disabled");
			$row.removeClass("disabled").addClass("editing");
			$row.find(".edit-section").slideDown(500);
		}
	});

	// Save
	$("#vehicleFuelLogs > li > form > .edit-section > .holder > .submit > input[name=save]").click(function(e) {
		e.preventDefault();
		var vehicleFuelLogId = $(this).parent().parent().parent().parent().parent().data("vehicleFuelLogId");
		alert("Save isn't hooked up yet. Record " + vehicleFuelLogId);
	});

	// Cancel
	$("#vehicleFuelLogs > li > form > .edit-section > .holder > .submit > input[name=cancel]").click(function(e) {
		e.preventDefault();
		var $row = $(this).parent().parent().parent().parent().parent();
		var vehicleFuelLogId = $row.data("vehicleFuelLogId");
		$row.find(".edit-section").slideUp(500, function() {
			performSearch({
				pageNumber: $("#paging").data("pageNumber")
			});
			$row.removeClass("editing");
			$("#vehicleFuelLogs > li").removeClass("disabled");
		});

	});

	// Default Search
	performSearch({
		pageNumber: 1
	});

	$("#paging a[href=#prev]").click(function(e) {
		e.preventDefault();
		performSearch({
			pageNumber: $("#paging").data("pageNumber") - 1
		});
	});

	$("#paging a[href=#next]").click(function(e) {
		e.preventDefault();
		performSearch({
			pageNumber: $("#paging").data("pageNumber") + 1
		});
	});

});