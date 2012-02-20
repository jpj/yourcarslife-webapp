<%--
    Document   : mainenance-log-list
    Created on : Feb 20, 2012, 2:33:05 PM
    Author     : Joshua Johnson
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="windows-1252"%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
		<title>Mainenance Logs</title>
	</head>
	<body>
		<p>Vehicle: ${vehicle.name}</p>

		<p>
			<a href="<c:url value="/vehicle/${vehicle.vehicleId}/log/maintenance/0"/>">New</a>
		</p>

		<ul id="mainenance-logs">
			<c:forEach items="${maintenanceLogs}" var="log">
				<li class="maintenance-log">
					<div>${log.logDate}</div>
					<div><a href="<c:url value="/vehicle/${vehicle.vehicleId}/log/maintenance/${log.logId}"/>">${log.summary}</a></div>
					<div>${log.description}</div>
				</li>
			</c:forEach>
		</ul>
	</body>
</html>
