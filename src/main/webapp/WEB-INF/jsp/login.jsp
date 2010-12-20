<%-- 
    Document   : login
    Created on : Dec 20, 2010, 6:30:15 PM
    Author     : josh
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!doctype html>
<html>
    <head>
        <title>Login</title>
    </head>
    <body>
        <div>
			<form action="<spring:theme code="baseUrl"/>/j_spring_security_check" method="post">
				<div>
					<input type="text" name="j_username" value="<c:if test="${not empty param.login_error}"><c:out value="${SPRING_SECURITY_LAST_USERNAME}"/></c:if>"/>
				</div>
				<div>
					<input type="password" name="j_password"/>
				</div>
				<div>
					<input type="submit" value="Login"/>
				</div>
			</form>
		</div>
    </body>
</html>
