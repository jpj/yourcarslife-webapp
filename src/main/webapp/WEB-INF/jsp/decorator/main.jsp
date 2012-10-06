<%--
    Document   : main
    Created on : Nov 17, 2010, 6:36:40 AM
    Author     : josh
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<%@taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib prefix="jwr" uri="http://jawr.net/tags" %>

<!doctype html>
<!--<html manifest="<c:url value="/resources/ycl.appcache"/>">-->
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="HandheldFriendly" content="true"/>
		<meta name="viewport" content="width=device-width, height=device-height, user-scalable=no"/>
		<title><decorator:title default="Welcome!"/> | Your Car's Life</title>

		<!-- Frameworks: Jquery, Underscore, Backbone -->
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jquery-1.7.1.min.js"/>"></script>

		<!-- Jquery Datepicker -->
		<link rel="stylesheet" type="text/css" href="<c:url value="/resources/js/jquery/jq.datepicker/jquery.datepick.css"/>"/>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jq.datepicker/jquery.datepick.js"/>"></script>

		<!-- Jquery JQPlot -->
		<link rel="stylesheet" type="text/css" href="<c:url value="/resources/js/jquery/jqplot/jquery.jqplot.css"/>"/>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/jquery.jqplot.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/plugins/jqplot.dateAxisRenderer.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/plugins/jqplot.canvasTextRenderer.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/plugins/jqplot.canvasAxisTickRenderer.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/plugins/jqplot.highlighter.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/plugins/jqplot.cursor.min.js"/>"></script>

		<jwr:script src="/resources/js/app/lib.js"/>
		<jwr:style src="/resources/css/app.css"/>
		<decorator:head/>

		<script type="text/javascript">
			$(function() {
				var app = new solairis.ycl.view.App();
			});
		</script>

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
				<div class="site-title">Your Car's Life</div>
				<div class="symbol"><span class="default">&#10033;</span><span class="small">*</span></div>
			</div>
		</div>

		<div id="page">
			<div class="container">
				<div id="navigation">
					<ul>
						<security:authorize ifAnyGranted="ROLE_USER">
							<li><a href="<c:url value="/app"/>#/">Dashboard</a></li>
							<li><a href="<c:url value="/logout"/>">Logout</a></li>
						</security:authorize>

						<security:authorize ifNotGranted="ROLE_USER">
							<li><a href="<c:url value="/login"/>">Login</a></li>
						</security:authorize>
					</ul>

					<div class="user-wrapper"></div>
				</div>
				<div id="page-content">
					<div class="content">
						<decorator:body/>
					</div>
				</div>
			</div>
		</div>

		<script id="dashboard-template" type="text/template">
			<h2>Your Vehicles</h2>

			<p class="user-has-no-vehicles">
				You have no vehicles. The first step is to
				<a class="add-new-vehicle" href="#">add a vehicle</a>,
				then you can add fuel and service logs
				to it.
			</p>

			<p>
				(<a class="add-new-vehicle" href="#">Add new vehicle</a>)
			</p>

			<ul id="vehicles">
			</ul>
		</script>

		<script id="fuel-log-page-template" type="text/template">
			<p class="vehicle-wrapper">
			</p>

			<div id="graph-holder">
				<div class="stats"></div>
				<div id="graph"></div>
			</div>

			<div class="options">
				<div class="add"><div class="indicator">+</div> <span class="text">Add</span></div>
			</div>
			<div class="new-fuel-log"></div>

			<div class="paging">
				<a href="#prev">prev</a>
				<a href="#next">next</a>
				<span class="from"></span>
				-
				<span class="to"></span>
				of
				<span class="total"></span>
			</div>

			<div id="fuel-logs-wrapper">
				<ul id="fuel-logs">
				</ul>
				<div>
					<a class="button load-more" href="#">Load More</a>
				</div>
			</div>

			<div class="paging">
				<a href="#prev">prev</a>
				<a href="#next">next</a>
				<span class="from"></span>
				-
				<span class="to"></span>
				of
				<span class="total"></span>
			</div>
		</script>

		<script id="fuel-log-template" type="text/template">
			<form method="get" action="#">
				<div class="display">
					<div class="date">
						<span class="view">{{logDate}}</span>
						<input type="text" class="edit" name="logDate" value="{{logDate}}"/>
					</div>
					<div class="cost">
						$
						<span class="view">{{cost}}</span>
						<input type="number" step=".01" class="edit" name="cost" value="{{cost}}"/>
					</div>
					<div class="cost-per-fuel">
						{{costPerFuel}}/gal.
					</div>
					<div class="odometer">
						<span class="view number">{{odometer}}</span>
						<input type="number" step=".1" class="edit number" name="odometer" value="{{odometer}}"/>
						<span class="units">od</span>
					</div>
					<div class="fuel">
						<span class="view number">{{fuel}}</span>
						<input type="number" step=".001" class="edit number" name="fuel" value="{{fuel}}"/>
						<span class="units">gal</span>
					</div>
					<div class="economy">
						<span class="number"></span>
						<span class="units">mpg</span>
					</div>
				</div>
				<div class="edit-section">
					<div class="separator"></div>
					<div class="holder">
						<div class="missedFillup">
							<label>
								<input type="checkbox" name="missedFillup"/>
								Missed a Fill-Up
							</label>
						</div>
						<div class="octane">
							<label>
								<input type="number" step="1" name="octane" value="{{octane}}"/>
								Oct
							</label>
						</div>
						<div class="submit">
							<input type="submit" name="save" value="Save"/>
							<input type="submit" name="cancel" value="Cancel"/>
						</div>
					</div>
				</div>
			</form>
		</script>

		<script id="vehicle-template" type="text/template">
			<div class="container edit">

			</div>
			<div class="container view">
				<div class="name">
					<a href="#/vehicle/{{vehicleId}}">{{name}}</a>
				</div>
				<div>
					<a href="#/log/fuel/{{vehicleId}}">Fuel Logs</a> |
					<a href="#/log/service/{{vehicleId}}">Service Logs</a>
				</div>
				<div>Notes: <span class="notes">{{notes}}</span></div>
				<div>Description: <span class="description">{{description}}</span></div>
			</div>
		</script>

		<script id="header-vehicle-template" type="text/template">
			<div>Vehicle: <span class="name">{{name}}</span></div>
		</script>

		<script id="header-user-template" type="text/template">
			<div>
				<span class="login">{{login}}</span>
			</div>
		</script>

		<script id="fuel-log-stats-template" type="text/template">
			<div>
				<span class="group">Avg Eco: {{averageEconomy}}mpg</span>
				<span class="group">Recent Eco: {{recentAverageEconomy}}mpg</span>
				<span class="group">Total Fillups: {{totalFillups}}</span>
			</div>
		</script>

		<script type="text/template" id="service-log-page-template">
			<p class="vehicle">Vehicle: <span class="name"></span></p>

			<p>
				<a id="add-new-service-log" href="#">New</a>
			</p>
			<ul id="new-service-log"></ul>

			<ul id="service-logs">
			</ul>
		</script>

		<script type="text/template" id="service-log-template">
			<div class="container edit">
				<form method="get" action="#">
					<div class="log-date"><input type="text" placeholder="Date"/></div>
					<div class="cost"><span class="units">$</span><span class="number"><input type="number" placeholder="Cost" step=".01"/></span></div>
					<div class="odometer"><span class="number"><input type="number" step=".1" value="<\%=odometer%>" placeholder="Odometer"/></span> <span class="units">mi</span></div>
					<div class="summary"><input type="text" value="<\%=summary%>" placeholder="Summary"/></div>
					<div class="description"><textarea placeholder="Description"><\%=description%></textarea></div>
					<div class="tags"></div>
					<div>
						<input type="submit" value="Save"/>
						<input type="button" value="Cancel" class="cancel"/>
					</div>
				</form>
			</div>
			<a class="container view edit-log" href="">
				<div class="log-date"></div>
				<div class="cost"><span class="units">$</span><span class="number"></span></div>
				<div class="odometer"><span class="number"><\%=odometer%></span> <span class="units">mi</span></div>
				<div class="summary"><\%=summary%></div>
				<div class="description"><\%=description%></div>
				<div class="tags"></div>
			</a>
		</script>

		<script type="text/template" id="vehicle-edit-template">
			<jsp:include page="../template/vehicle-edit.jsp"/>
		</script>

	</body>
</html>
