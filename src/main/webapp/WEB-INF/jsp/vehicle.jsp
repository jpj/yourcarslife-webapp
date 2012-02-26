<%--
    Document   : edit-vehicle
    Created on : Feb 20, 2011, 12:09:22 PM
    Author     : Johnson
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!doctype html>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title><c:choose><c:when test="${vehicle == null}">Add New Vehicle</c:when><c:otherwise>Editing ${vehicle.name}</c:otherwise></c:choose></title>

<!--		<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/edit-vehicle.css"/>"/>-->
	</head>
	<body>

		<c:choose>
			<c:when test="${vehicle == null}">
				<h1>Add New Vehicle</h1>
			</c:when>
			<c:otherwise>
				<h1>Editing ${vehicle.name}</h1>
			</c:otherwise>
		</c:choose>

		<c:if test="${success}">
			<p class="success">Vehicle Updated</p>
		</c:if>

		<div>
			<form:form commandName="editVehicleFormData">
				<div>
					<form:hidden path="vehicleId"/>
				</div>
				<div class="input">
					<div class="error"><form:errors path="name"/></div>
					<label>Name
						<form:input path="name"/>
					</label>
				</div>
				<div class="input">
					<label>Description
						<form:input path="description"/>
					</label>
				</div>
				<div class="input notes">
					<label>Notes
						<form:textarea path="notes"/>
					</label>
				</div>
				<div class="input">
					<input type="submit" value="Update"/>
				</div>
			</form:form>
		</div>
	</body>
</html>
