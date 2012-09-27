<html>
	<head>
		<title>Loading Application...</title>

		<script type="text/javascript">
			$(function() {
				var app = new solairis.ycl.view.App();

				// TODO - START ROUTING
				new solairis.ycl.router.App();
				Backbone.history.start();
			});
		</script>
	</head>
	<body>
	</body>
</html>
