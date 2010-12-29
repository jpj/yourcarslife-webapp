<%-- 
    Document   : main
    Created on : Nov 17, 2010, 6:36:40 AM
    Author     : josh
--%>
<%@taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<!doctype html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><decorator:title default="Welcome!"/> | Your Car's Life</title>
		<link rel="stylesheet" type="text/css" href="<spring:theme code="baseUrl"/>/static/css/layout.css"/>

		<script type="text/javascript" src="<spring:theme code="baseUrl"/>/static/js/jquery/jquery-1.4.4.min.js"></script>
		<script type="text/javascript" src="<spring:theme code="baseUrl"/>/static/js/extend.js"></script>
		<decorator:head/>
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
							<security:authorize ifNotGranted="ROLE_ANONYMOUS">
							<li><a href="<spring:theme code="baseUrl"/>/dashboard">Dashboard</a></li>
							<li><a href="<spring:theme code="baseUrl"/>/logout">Logout</a></li>
							</security:authorize>
							<security:authorize ifAnyGranted="ROLE_ANONYMOUS">
							<li><a href="<spring:theme code="baseUrl"/>/login">Login</a></li>
							</security:authorize>
							<li><a href="<spring:theme code="baseUrl"/>/login">Login</a></li>
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
