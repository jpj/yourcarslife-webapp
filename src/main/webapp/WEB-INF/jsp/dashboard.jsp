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
		</script>
	</head>
	<body>
	</body>
</html>
