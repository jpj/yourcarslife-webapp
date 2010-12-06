<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html>
	<head>
		<title>Dashboard</title>
	</head>
	<body>
		<pre>
Vehicle Id: ${vehicleFuelLog.vehicleFuelLogId}
Created:    ${vehicleFuelLog.created}
Odometer:   ${vehicleFuelLog.odometer}
Fuel:       ${vehicleFuelLog.fuel}

User Login: ${user.login}
		</pre>

		<p>
			Vehicles owned by you:
		</p>
		<ul>
			<c:forEach var="vehicle" items="${vehicles}">
				<li>
					<a href="<spring:theme code="baseUrl"/>/log/${fn:replace(vehicle.name, " ", "_")}">${vehicle.name}</a>
				</li>
			</c:forEach>
		</ul>
	</body>
</html>
