<%-- 
    Document   : main
    Created on : Nov 17, 2010, 6:36:40 AM
    Author     : josh
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<%@taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<security:authorize ifAnyGranted="ROLE_USER">
	<c:set var="isLoggedIn" value="true"/>
</security:authorize>

<!doctype html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title><decorator:title default="Welcome!"/> | Your Car's Life</title>
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/layout.css"/>"/>
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/js/jquery/jq.datepicker/jquery.datepick.css"/>"/>

		<script type="text/javascript" src="<c:url value="/static/js/jquery/jquery-1.4.4.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery/jq.datepicker/jquery.datepick.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/extend.js"/>"></script>

		<script type="text/javascript" src="<c:url value="/static/js/YCLConstants.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/YCL.js"/>"></script>
		<decorator:head/>

		<script type="text/javascript">
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-12616011-3']);
			_gaq.push(['_trackPageview']);

			(function() {
				var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();

		</script>
	</head>
	<body>
		<div id="header">
			<div class="banner">
				<div class="holder">
					<div class="site-title">Your Car's Life</div>
					<h1><decorator:title default="Welcome"/></h1>
				</div>
			</div>
		</div>

		<div id="page">
			<div class="container">
				<div id="navigation">
					<div class="holder">
						<ul>
							<security:authorize ifAnyGranted="ROLE_USER">
								<li><a href="<c:url value="/dashboard"/>">Dashboard</a></li>
								<li><a href="<c:url value="/logout"/>">Logout</a></li>
							</security:authorize>

							<c:if test="${!isLoggedIn}">
								<li><a href="<c:url value="/login"/>">Login</a></li>
							</c:if>
						</ul>
					</div>
				</div>
				<div id="page-content">
					<div class="holder">
						<div class="content">
							<decorator:body/>
						</div>
					</div>
				</div>
			</div>
		</div>

	</body>
</html>
