<%-- 
    Document   : edit-vehicle
    Created on : Feb 20, 2011, 12:09:22 PM
    Author     : Johnson
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!doctype html>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Editing Your ${vehicle.name}</title>

		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/edit-vehicle.css"/>"/>
	</head>
	<body>
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
