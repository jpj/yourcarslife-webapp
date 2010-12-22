$(document).ready(function() {
	var ycl = new YCL();

	var performSearch = function(request) {

		$("#vehicleFuelLogs li").addClass("available");

		ycl.vehicleFuelLogSearch(
			{pageNumber: request.pageNumber, maxResults: 20, vehicleId: 1},
			function(response, status) {
				if (status === YCL.VehicleFuelLogStatus.OK) {
					$.each(response.vehicleFuelLogs, function(index, vehicleFuelLog) {
						if ($("#vehicleFuelLogs li.available").length === 0) {
							$("#vehicleFuelLogs").append('<li class="available"><div class="odometer"></div><div class="fuel"></div></li>');
						}

						var $row = $("#vehicleFuelLogs li.available:first");
						$row.removeClass("available").removeClass("unused");
						$row.data("vehicleFuelLogId", vehicleFuelLog.vehicleFuelLogId);
						$row.find(".odometer").text(vehicleFuelLog.odometer);
						$row.find(".fuel").text(vehicleFuelLog.fuel + " " + new Date(vehicleFuelLog.logDate));
					});

					$("#vehicleFuelLogs li.available").addClass("unused");

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