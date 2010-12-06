<%-- 
    Document   : main
    Created on : Nov 17, 2010, 6:36:40 AM
    Author     : josh
--%>
<%@taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%--<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>--%>
<!doctype html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><decorator:title default="Welcome!"/> | Your Car's Life</title>
		<link rel="stylesheet" type="text/css" href="<spring:theme code="baseUrl"/>/static/css/layout.css"/>
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
							<%--<li><sec:authentication property="principal.username"/></li>--%>
							<li><a href="<spring:theme code="baseUrl"/>/dashboard">Dashboard</a></li>
							<li><a href="<spring:theme code="baseUrl"/>/j_spring_security_logout">Logout</a></li>
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
