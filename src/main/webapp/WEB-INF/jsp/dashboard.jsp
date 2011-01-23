<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html>
	<head>
		<title>Dashboard</title>
		<link rel="stylesheet" type="text/css" href="<spring:theme code="baseUrl"/>/static/css/dashboard.css"/>
	</head>
	<body>

		<h2>Your Vehicles</h2>

		<ul id="vehicles">
			<c:forEach var="vehicle" items="${vehicles}">
				<li class="vehicle">
					<h3><a class="name" href="<spring:theme code="baseUrl"/>/log/${fn:replace(vehicle.name, " ", "_")}">${vehicle.name}</a></h3>
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
