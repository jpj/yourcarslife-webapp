<%--
    Document   : login
    Created on : Dec 20, 2010, 6:30:15 PM
    Author     : josh
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<!doctype html>
<html>
	<head>
		<title>Login</title>
		<security:authorize ifAnyGranted="ROLE_USER">
			<meta http-equiv="refresh" content="0; <c:url value="/dash"/>"/>
		</security:authorize>
	</head>
	<body>
		<p>
			Login to acces your account or
			<a href="<c:url value="/create-account"/>">create a new one</a>!
		</p>
		<c:if test="${not empty param.login_error}">
			<div class="error">
				<c:out value="${SPRING_SECURITY_LAST_EXCEPTION.message}"/>.
			</div>
		</c:if>

		<div>
			<form action="<c:url value="/j_spring_security_check"/>" method="post" id="login">
				<div class="input">
					<label>Email
						<input type="text" name="j_username" value="<c:if test="${not empty param.login_error}"><c:out value="${SPRING_SECURITY_LAST_USERNAME}" escapeXml="false"/></c:if>" placeholder="Email" autofocus="autofocus"/>
					</label>
				</div>
				<div class="input">
					<label>Password
						<input type="password" name="j_password" placeholder="Password"/>
					</label>
				</div>
					<div>
						<input type="hidden" name="redirect" value="${param.redirect}"/>
					</div>
				<div class="input">
					<input type="submit" value="Login"/>
				</div>
			</form>
		</div>
	</body>
</html>
