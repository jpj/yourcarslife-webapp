<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
	<head>
		<title>Dashboard</title>

		<script type="text/javascript">
			document.addEventListener("DOMContentLoaded", function () {
				const mainHolder = document.getElementById("vehicles");
				const dashboardTemplate = document.getElementById("vehicle-template");

				fetch(solairis.ycl.constant.BASE_URL + '/api/vehicle')
						.then(response => response.json())
						.then(data => {

							data.forEach(vehicle => {
								let template = dashboardTemplate.innerHTML;
								Object.keys(vehicle).forEach(key => {
									template = template.replace(new RegExp("{{" + key + "}}", "g"), vehicle[key]);
								});
								mainHolder.insertAdjacentHTML("beforeend", template);
							});
						});
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

		<script id="vehicle-template" type="text/template">
			<li class="vehicle">
				<div class="container edit">

				</div>
				<div class="container view">
					<div class="name">
						<a href="<c:url value="/vehicle"/>#/vehicle/{{vehicleId}}">{{name}}</a>
					</div>
					<div class="actions">
						<a class="fuel-logs" href="<c:url value="/log/fuel"/>#/log/fuel/{{vehicleId}}">Fill Up</a>
						<a class="service-logs"
						   href="<c:url value="/log/service"/>#/log/service/{{vehicleId}}">Service</a>
					</div>
					<div>Notes: <span class="notes">{{notes}}</span></div>
					<div>Description: <span class="description">{{description}}</span></div>
					<a href="#" class="delete">Delete</a>
				</div>
			</li>
		</script>
	</body>
</html>