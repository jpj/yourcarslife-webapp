<%--
    Document   : mainenance-log-list
    Created on : Feb 20, 2012, 2:33:05 PM
    Author     : Joshua Johnson
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="jwr" uri="http://jawr.net/tags" %>
<!doctype html>
<html>
	<head>
		<title>Mainenance Logs</title>

		<c:if test="${empty maintenanceLogs}">
			<jwr:script src="/resources/js/app/maintenance-log-list.js"/>
		</c:if>
	</head>
	<body id="maintenance-log-list-app">
		<p>Vehicle: ${vehicle.name}</p>

		<p>
			<a href="<c:url value="/vehicle/${vehicle.vehicleId}/log/maintenance/0"/>">New</a>
		</p>

		<ul id="maintenance-logs">
			<c:forEach items="${maintenanceLogs}" var="log">
				<li class="maintenance-log">
					<div>${log.logDate}</div>
					<div><a href="<c:url value="/vehicle/${vehicle.vehicleId}/log/maintenance/${log.logId}"/>">${log.summary}</a></div>
					<div>${log.description}</div>
				</li>
			</c:forEach>
		</ul>

		<!-- Templates -->
		<script type="text/template" id="maintenance-log-template">
			<div class="container edit">
				Edit Div
				<form method="get" action="#">
					<div class="log-date"><input type="text"/></div>
					<div class="summary"><input type="text" value="<\%=summary\%>"/></div>
					<div class="description"><input type="text" value="<\%=description\%>"/></div>
					<div class="tags"></div>
					<div>
						<input type="submit" value="Save"/>
						<input type="button" value="Cancel" class="cancel"/>
					</div>
				</form>
			</div>
			<a class="container view edit-log" href="">
				<div class="log-date"></div>
				<div class="summary"><\%=summary\%></div>
				<div class="description"><\%=description\%></div>
				<div class="tags"></div>
			</a>
		</script>
</body>
</html>
