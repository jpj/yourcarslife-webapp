<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
	<head>
		<title>Dashboard</title>
		<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/dashboard.css"/>"/>
		<script type="text/javascript" src="<c:url value="/resources/js/dashboard.js"/>"></script>
	</head>
	<body>

		<h2>Your Vehicles</h2>

		<div id="no-vehicles">
			<p>
					You have no vehicles. The first step is to
				<a href="<c:url value="/edit-vehicle/0"/>">add a vehicle</a>,
					then you can add fuel and service logs
					to it.
			</p>

			<p>
			(<a href="<c:url value="/edit-vehicle/0"/>">Add new vehicle</a>)
			</p>
		</div>

		<ul id="vehicles">
			<c:forEach begin="1" end="10">
				<li class="vehicle available">
					<form action="#">
						<div class="display">
							<h3><a class="name" data-vehicle-id="0" href="<c:url value="/vehicle-fuel-log"/>">Vehicle Name</a> (<a href="<c:url value="/edit-vehicle/0"/>">edit</a>)</h3>
							<div class="details">
								<div class="holder">
									<p>Notes: <span class="notes">Vehicle Notes</span></p>
									<p>Description: <span class="description">Vehicle Description</span></p>
								</div>
							</div>
						</div>
					</form>
				</li>
			</c:forEach>
		</ul>
	</body>
</html>
