$.ajaxSetup({cache: false});

$(function() {
	var app = new solairis.ycl.view.App({el: $("#navigation"), model: new solairis.ycl.model.CurrentUser()});
	app.model.fetch();

	$(window.applicationCache).bind("updateready", function(e) {
		$(".appcache-status").text("Updating...");
		window.applicationCache.swapCache();
		$(".appcache-status").text("Update Ready").addClass("update-ready").click(function() {
			document.location.reload()
		});
	});
	$(window.applicationCache).bind("checking", function(e) {
		$(".appcache-status").text("Checking For App Update...");
	});
	$(window.applicationCache).bind("noupdate", function(e) {
		$(".appcache-status").text("App Current");
	});
	$(window.applicationCache).bind("cached", function(e) {
		$(".appcache-status").text("App Cached");
	});
	$(window.applicationCache).bind("error", function(e) {
		$(".appcache-status").text("Error");
	});
});

solairis.ycl.handlingUnauthorizedError = false;

$(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
	// Handle Ajax Errors Globally
	if (jqXHR.status === 401) {
		if (!solairis.ycl.handlingUnauthorizedError) {
			solairis.ycl.handlingUnauthorizedError = true;
			var url = document.createElement('a');
			url.href = document.location.href;
			url.pathname = solairis.ycl.constant.BASE_URL + '/login';
			url.search = 'redirect=' + encodeURIComponent(document.location.href);
			document.location.href = url.href;
		}
	} else {
		$(".application-error").text('Error: ' + jqXHR.statusText);
	}
});

$(function() {
	var path = window.location.pathname;
	var badPath = 'login';
	if (path.indexOf(badPath, path.length - badPath.length) === -1) {
		// Start routing
		if (solairis.ycl.router.App) {
			window.app = new solairis.ycl.router.App();
		}
		Backbone.history.start({pushState: false, root: solairis.ycl.constant.BASE_URL + '/'});
	}
});