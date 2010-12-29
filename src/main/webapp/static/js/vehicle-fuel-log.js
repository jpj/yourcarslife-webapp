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

	// Add click events
	$("#vehicleFuelLogs > li > .economy > span.number").click(function(e) {
		var econ = $(this).text();
		var $parent = $(this).parent();
		var width = $(this).width();
		$parent.find(".number").remove();
		$parent.prepend('<input type="text" value="'+econ+'" class="number" style="width: '+width+'px;"/>');
		$parent.find(".number").focus();
	});

	$("#vehicleFuelLogs > li").click(function(e) {
		if ( !$(this).hasClass("disabled") && !$(this).hasClass("editing") ) {
			$("#vehicleFuelLogs > li").addClass("disabled");
			$(this).removeClass("disabled").addClass("editing");
			$(this).find(".edit").slideDown(500);
		}
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