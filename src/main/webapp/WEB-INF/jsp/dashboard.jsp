<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
	<head>
		<title>Dashboard</title>
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
						</li>
					</c:forEach>
				</ul>
			</c:otherwise>
		</c:choose>
	</body>
</html>
