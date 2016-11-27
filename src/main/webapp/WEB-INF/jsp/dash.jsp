<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
	<head>
		<title>Dashboard</title>

		<script type="text/javascript">
			document.addEventListener("DOMContentLoaded", function (event) {
				var vehicleCollection = new solairis.ycl.collection.VehicleList();
				var dashboardView = new solairis.ycl.view.Dashboard({
					"el": $("#page-content > .content"),
					"collection": vehicleCollection
				});

				vehicleCollection.fetch();
			});
		</script>
	</head>
	<body>
		<form action="<c:url value="/connect/facebook"/>" method="POST">
			<p><input type="submit" value="Connect With Facebook"/></p>
		</form>
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

		<script id="dashboard-template" type="text/template">
			<form action="<c:url value="/connect/facebook" />" method="POST">
				<p><input type="submit" value="Connect With Facebook"/></p>
			</form>
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
		</script>
	</body>
</html>