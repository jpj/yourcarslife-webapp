<%-- 
    Document   : log
    Created on : Nov 21, 2010, 8:26:55 PM
    Author     : josh
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!doctype html>
<html>
    <head>
        <title>Vehicle Log</title>
		<script type="text/javascript" src="<spring:theme code="baseUrl"/>/static/js/YCL.js"></script>
		<script type="text/javascript" src="<spring:theme code="baseUrl"/>/static/js/vehicle-fuel-log.js"></script>
    </head>
    <body>
        <p>Vehicle (${vehicle.vehicleId}) Notes: ${vehicle.notes}</p>
		<p>Owned by: ${vehicle.user.firstName}</p>
		<p>Auth: ${auth.principal.username}</p>

		<ul>
			<c:forEach var="vehicleFuelLog" items="${vehicleFuelLogs}">
				<li>${vehicleFuelLog.logDate}</li>
			</c:forEach>
		</ul>
    </body>
</html>
