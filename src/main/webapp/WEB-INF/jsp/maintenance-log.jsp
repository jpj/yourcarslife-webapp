<%--
    Document   : maintenance-log
    Created on : Feb 20, 2012, 2:37:54 PM
    Author     : Joshua Johnson
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<%@page contentType="text/html" pageEncoding="windows-1252"%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
		<title>Maintenance Log</title>
	</head>
	<body>
		<c:if test="${param.saved}">
			<p>
				Form has been saved!
			</p>
		</c:if>
			<p>
				<a href="<c:url value="/vehicle/${vehicle.vehicleId}/log/maintenance/list/1"/>">Back to list</a>
			</p>
		<form:form commandName="maintenanceLogFormData">
			<p>
				<form:label path="logDate">Date</form:label>
				<form:input path="logDate"/>
			</p>
			<p>
				<form:errors path="odometer"/>
				<form:label path="odometer">Odometer</form:label>
				<form:input path="odometer" placeholder="${not empty lastLog.odometer ? lastLog.odometer: ''}"/>
			</p>
			<p>
				<form:errors path="summary"/>
				<form:label path="summary">Summary</form:label>
				<form:input path="summary"/>
			</p>
			<p>
				<form:label path="description">Description</form:label>
				<form:textarea path="description"/>
			</p>
			<p>
				<input type="submit" value="Save"/>
			</p>
		</form:form>
	</body>
</html>
