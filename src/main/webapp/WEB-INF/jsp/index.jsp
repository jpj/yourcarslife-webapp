<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
	<head>
		<title>Index Page</title>
	</head>
	<body>
		<h2>Hello World!</h2>
		<h3>Vehicle Log</h3>
		<pre>
Vehicle Id: ${vehicleFuelLog.vehicleFuelLogId}
Created:    ${vehicleFuelLog.created}
Odometer:   ${vehicleFuelLog.odometer}
Fuel:       ${vehicleFuelLog.fuel}

User Login: ${user.login}
		</pre>

		<p>
			Vehicles Owned by User:
		</p>
		<ul>
			<c:forEach var="vehicle" items="${user.vehicles}">
				<li>
					${vehicle.name}
					<c:if test="${not empty vehicle.vehicleFuelLogs}">
						<ul>
							<c:forEach var="vehicleFuelLog" items="${vehicle.vehicleFuelLogs}">
								<li>${vehicleFuelLog.odometer}</li>
							</c:forEach>
						</ul>
					</c:if>
				</li>
			</c:forEach>
		</ul>
	</body>
</html>
