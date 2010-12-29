$(document).ready(function() {
	var ycl = new YCL();

	var performSearch = function(request) {

		$("#vehicleFuelLogs li").addClass("available");

		ycl.vehicleFuelLogSearch(
			{pageNumber: request.pageNumber, maxResults: 21, vehicleId: 1},
			/**
			 * @function for you
			 * @param {YCL.VehicleFuelLogResponse} response is the response
			 * @param {YCL.VehicleFuelLogStatus} status is the status
			 */
			function(response, status) {
				if (status === YCL.VehicleFuelLogStatus.OK) {
					var prevFuel = 0;
					var prevOdometer = 0;
					/**
					 * Documentation is good
					 * @param {Number} index
					 * @param {YCL.VehicleFuelLog} vehicleFuelLog is good
					 */
					$.each(response.vehicleFuelLogs, function(index, vehicleFuelLog) {
						if ($("#vehicleFuelLogs li.available").length === 0) {
							$("#vehicleFuelLogs").append('<li class="available"><div class="odometer"><span class="number"></span> <span class="units">mi</span></div><div class="fuel"><span class="number"></span> <span class="units">gal</span></div><div class="date"></div><div class="economy"><span class="number"></span> <span class="units">mpg</span></div></li>');
						}

						var $row = $("#vehicleFuelLogs li.available:first");
						var $prevRow = $row.prev();
						var rowDate = new Date(vehicleFuelLog.logDate);

						$row.removeClass("available").removeClass("unused");
						$row.data("vehicleFuelLogId", vehicleFuelLog.vehicleFuelLogId);
						$row.data("modified", vehicleFuelLog.modified)
						$row.find(".odometer > .number").text( vehicleFuelLog.odometer );
						$row.find(".fuel > .number").text( vehicleFuelLog.fuel );
						$row.find(".date").text( rowDate.getFullYear()+" "+rowDate.getMonthShortName()+" "+rowDate.getDate() ).attr("title", rowDate.toString());

						if ( $prevRow.length !== 0 && prevFuel !== 0 && prevOdometer !== 0 /* && $prevRow.data("missedFillUp") !== true */ ) {
							var rawMpg = (prevOdometer - vehicleFuelLog.odometer) / prevFuel;
							$prevRow.find(".economy > .number").text( rawMpg.toFixed(2) );
						}

						prevFuel = vehicleFuelLog.fuel;
						prevOdometer = vehicleFuelLog.odometer;
						$row.find(".economy > .number").text('-');
					});

					$("#vehicleFuelLogs > li.available").addClass("unused");
					$("#vehicleFuelLogs > li").removeClass("odd");
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