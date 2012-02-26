<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
	<head>
		<title>Dashboard</title>
<!--		<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/dashboard.css"/>"/>
		<script type="text/javascript" src="<c:url value="/resources/js/vehicle-list.js"/>"></script>-->
	</head>
	<body>

		<h2>Your Vehicles</h2>

		<c:choose>
			<c:when test="${empty vehicles}">
				<p>
					You have no vehicles. The first step is to
					<a href="<c:url value="/vehicle/0"/>">add a vehicle</a>,
					then you can add fuel and service logs
					to it.
				</p>
			</c:when>
			<c:otherwise>

				<p>
			(<a href="<c:url value="/vehicle/0"/>">Add new vehicle</a>)
				</p>

				<ul id="vehicles">
					<c:forEach var="vehicle" items="${vehicles}">
						<li class="vehicle available">
							<div class="display">
								<h3>
									<a class="name fuel-log-list" href="<c:url value="/vehicle/${vehicle.vehicleId}/log/fuel/list/1" />">${vehicle.name}</a>
									(<a class="edit" href="<c:url value="/vehicle/${vehicle.vehicleId}"/>">edit</a>)
									(<a class="maintenance-logs" href="<c:url value="/vehicle/${vehicle.vehicleId}/log/maintenance/list/1"/>">Maintenance Logs</a>)
								</h3>
								<div class="details">
									<div class="holder">
										<p class="notes">Notes: ${vehicle.notes}</p>
										<p class="description">Description: ${vehicle.description}</p>
									</div>
								</div>
							</div>
						</li>
					</c:forEach>
				</ul>
			</c:otherwise>
		</c:choose>
	</body>
</html>
