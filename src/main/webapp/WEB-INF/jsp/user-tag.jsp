<%--
    Document   : user-tag
    Created on : Feb 25, 2012, 3:55:25 PM
    Author     : Joshua Johnson
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!doctype html>
<html>
	<head>
		<title>User Tag</title>
	</head>
	<body>
		<c:choose>
			<c:when test="${not empty tagFormData}">
				<form:form commandName="tagFormData">
					<p>
						<form:label path="label">Label</form:label>
						<form:input path="label"/>
					</p>
					<p>
						<input type="submit" name="submit" value="Save"/>
						<c:if test="${empty tagId or tagId != 0}">
							<input type="submit" name="submit" value="Cancel"/>
						</c:if>
					</p>
				</form:form>
			</c:when>
			<c:otherwise>
				<p>
					<a href="<c:url value="/user/tag/0"/>">Add New</a>
				</p>
			</c:otherwise>
		</c:choose>

		<ul>
			<c:forEach items="${userTags}" var="tag">
				<li>
					<a href="<c:url value="/user/tag/${tag.tagId}"/>">${tag.label}</a>
				</li>
			</c:forEach>
		</ul>
	</body>
</html>
