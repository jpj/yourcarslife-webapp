<html>
	<head>
		<title>Loading Application...</title>

		<meta name="appcache" content="on"/>

		<script type="text/javascript">
			$(function() {
				var app = new solairis.ycl.view.App();

				// Start routing
				new solairis.ycl.router.App();
				Backbone.history.start();
			});
		
			solairis.ycl.handlingUnauthorizedError = false;
		
			$(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
				// Handle Ajax Errors Globally
				if (jqXHR.status === 401 && !solairis.ycl.handlingUnauthorizedError) {
					solairis.ycl.handlingUnauthorizedError = true;
					var url = document.createElement('a');
					url.href = document.location.href;
					url.pathname = solairis.ycl.constant.BASE_URL + '/login';
					url.search = 'redirect='+encodeURIComponent(document.location.href);
					document.location.href = url.href;
				}
			});
		</script>
	</head>
	<body>
	</body>
</html>
