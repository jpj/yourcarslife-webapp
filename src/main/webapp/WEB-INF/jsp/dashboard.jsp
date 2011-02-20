<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
	<head>
		<title>Dashboard</title>
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/dashboard.css"/>"/>
	</head>
	<body>

		<h2>Your Vehicles</h2>

		<p>
			(<a href="<c:url value="/edit-vehicle/0"/>">Add new vehicle</a>)
		</p>

		<ul id="vehicles">
			<c:forEach var="vehicle" items="${vehicles}">
				<li class="vehicle">
					<h3><a class="name" href="<c:url value="/vehicle-fuel-log/${vehicle.name}" />">${vehicle.name}</a></h3>
					<div class="details">
						<div class="holder">
							<p>Notes: ${vehicle.notes}</p>
							<p>Description: ${vehicle.description}</p>
						</div>
					</div>
				</li>
			</c:forEach>
		</ul>
	</body>
</html>
