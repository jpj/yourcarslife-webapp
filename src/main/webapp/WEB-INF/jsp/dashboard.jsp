<html>
	<head>
		<title>Dashboard</title>
		<script type="text/javascript">
			$(function() {
				var app = new solairis.ycl.view.DashboardApp({el: $("body")});
			});
		</script>
	</head>
	<body>

		<h2>Your Vehicles</h2>

		<p class="user-has-no-vehicles">
			You have no vehicles. The first step is to
			<a class="add-new-vehicle" href="#">add a vehicle</a>,
			then you can add fuel and service logs
			to it.
		</p>

		<p>
			(<a class="add-new-vehicle" href="#">Add new vehicle</a>)
		</p>

		<ul id="vehicles">
		</ul>
	</body>
</html>
