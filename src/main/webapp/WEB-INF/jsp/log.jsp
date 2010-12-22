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
		<link rel="stylesheet" type="text/css" href="<spring:theme code="baseUrl"/>/static/css/vehicle-fuel-log.css"/>
		<script type="text/javascript" src="<spring:theme code="baseUrl"/>/static/js/YCL.js"></script>
		<script type="text/javascript" src="<spring:theme code="baseUrl"/>/static/js/vehicle-fuel-log.js"></script>
    </head>
    <body>
        <p>${vehicle.name}: ${vehicle.notes} (${allVehicleFuelLogsSize})</p>

		<div class="paging"></div>

		<ul id="vehicleFuelLogs">
		</ul>
		<div id="paging">
			<a href="#prev">prev</a>
			<a href="#next">next</a>
			<span class="from"></span>
			-
			<span class="to"></span>
			of
			<span class="total"></span>
		</div>
    </body>
</html>
