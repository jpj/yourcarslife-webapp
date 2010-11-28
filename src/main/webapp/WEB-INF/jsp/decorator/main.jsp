<%-- 
    Document   : main
    Created on : Nov 17, 2010, 6:36:40 AM
    Author     : josh
--%>
<%@taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<!doctype html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><decorator:title default="Welcome!"/> | Your Car's Life</title>
		<link rel="stylesheet" type="text/css" href="/yourcarslife_war/static/css/layout.css"/>
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
						<div class="content">
							test<br />
							test<br/>
							test<br/>
							<a href="/yourcarslife_war/j_spring_security_logout">Logout</a>
						</div>
					</div>
				</div>
				<div id="page-content">
					<div class="holder">
						<div class="content">
						Hello there, world<br/><br/>
							<decorator:body/>
						</div>
					</div>
				</div>
			</div>
		</div>

    </body>
</html>
