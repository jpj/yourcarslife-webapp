<html>
	<head>
		<title>Loading Application...</title>

		<meta name="appcache" content="on"/>

		<script type="text/javascript">
			$.ajaxSetup({cache: false});

			$(function() {
				var app = new solairis.ycl.view.App();

				// Start routing
				window.app = new solairis.ycl.router.App();
				Backbone.history.start({pushState: true, root: solairis.ycl.constant.BASE_URL + '/'});
			});
		</script>
	</head>
	<body>
	</body>
</html>
