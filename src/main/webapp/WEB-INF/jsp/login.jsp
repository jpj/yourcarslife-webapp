<%-- 
    Document   : login
    Created on : Dec 20, 2010, 6:30:15 PM
    Author     : josh
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html>
	<head>
		<title>Login</title>
		<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/login.css"/>"/>
		<script type="text/javascript" src="<c:url value="/resources/js/login.js"/>"></script>
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
				<div class="input">
					<label>
						<input type="checkbox" name="_spring_security_remember_me"/> <span class="remember-me">Remember me</span>

					</label>
				</div>
				<div class="input">
					<input type="submit" value="Login"/>
				</div>
			</form>
		</div>
	</body>
</html>
