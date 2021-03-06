<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<%@taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<c:set var="appcacheenabled" value="${param.login_error ne 'true'}"/>

<!doctype html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="application-name" content="Your Car's Life Web Application v<%@include file="../template/version.jspf" %>"/>
		<meta name="HandheldFriendly" content="true"/>
		<meta name="viewport" content="width=device-width, height=device-height"/>
		<title><decorator:title default="Welcome!"/> | Your Car's Life</title>

		<link rel="icon" href="data:;base64,iVBORw0KGgo=">

		<!-- Jquery JQPlot -->
		<link rel="stylesheet" type="text/css" href="${pageContext.servletContext.contextPath}/resources/js/jquery/jqplot/jquery.jqplot.css"/>

		<script type="text/javascript">
			window.solairis = window.solairis || {};

			solairis.ycl = {
				collection: {},
				constant: {
					BASE_URL: '${pageContext.servletContext.contextPath}',
					SITE_TITLE: "Your Car's Life"
				},
				error: {
					properties: {}
				},
				model: {},
				router: {},
				template: {
					render: null,
					text: {},
					view: {}
				},
				util: {},
				view: {}
			};
		</script>

		<link rel="stylesheet" type="text/css" href="${pageContext.servletContext.contextPath}/wro/app.css" media="screen"/>
		<script type="text/javascript" src="${pageContext.servletContext.contextPath}/wro/app.js"></script>

		<decorator:head/>

		<script type="text/javascript">
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-12616011-3']);
			_gaq.push(['_trackPageview']);

			(function() {
				var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
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
				<nav id="navigation">
					<ul class="navigation-wrapper">
					</ul>

					<div class="user-wrapper"></div>
					<div class="appcache-status">App Status</div>
				</nav>
				<div class="application-error"></div>
				<div id="page-content">
					<div id="page-content-content" class="content">
						<decorator:body/>
					</div>
				</div>
			</div>
		</div>

		<script id="fuel-log-page-template" type="text/template">
			<p class="vehicle-wrapper">
				Vehicle: <span class="vehicle-name"></span>
			</p>

			<div id="graph-holder">
				<div class="stats"></div>
				<div id="graph"></div>
			</div>

			<div class="options">
				<a href="#" class="add">Add</a>
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
				<section id="fuel-logs">
				</section>
				<div>
					<a class="button load-more" href="#">Load More</a>
				</div>
				<div>
					<a class="button load-all" href="#">Load All</a>
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
			<div class="container view">
				<div class="date">
					{{logDateFormattedForHumans}}
				</div>
				<div class="cost">
					$ {{cost}}
				</div>
				<div class="cost-per-fuel">
					{{costPerFuel}}/gal.
				</div>
				<div class="odometer">
					{{odometer}}
					<span class="units">od</span>
				</div>
				<div class="fuel">
					{{fuel}}
					<span class="units">gal</span>
				</div>
				<div class="economy">
					<span class="number"></span>
					<span class="units">mpg</span>
				</div>
			</div>
			<div class="container edit">
				<form method="get" action="#">
					<div class="date">
						<input type="datetime-local" name="logDate" value="{{logDateFormattedForDateTimeLocal}}"
							   placeholder="Date &amp; Time"/>
					</div>
					<div class="cost">
						$
						<input type="number" step=".01" name="cost" value="{{cost}}" placeholder="Cost"
							   autocomplete="off"/>
					</div>
					<div class="cost-per-fuel">
						{{costPerFuel}}/gal.
					</div>
					<div class="odometer">
						<input type="number" step=".1" name="odometer" value="{{odometer}}" placeholder="Odometer"
							   autocomplete="off"/>
						<span class="units">od</span>
					</div>
					<div class="fuel">
						<input type="number" step=".001" name="fuel" value="{{fuel}}" placeholder="Fuel"
							   autocomplete="off"/>
						<span class="units">gal</span>
					</div>
					<div class="economy">
						<span class="number"></span>
						<span class="units">mpg</span>
					</div>
					<div class="separator"></div>
					<div class="missedFillup">
						<label>
							<input type="checkbox" name="missedFillup"/>
							Missed a Fill-Up
						</label>
					</div>
					<div class="octane">
						<label>
							<input type="number" step="1" name="octane" value="{{octane}}"
								   placeholder="Octane"/>
							Oct
						</label>
					</div>
					<div class="submit">
						<input type="submit" name="save" value="Save"/>
						<input type="submit" name="cancel" value="Cancel"/>
					</div>
				</form>
			</div>
		</script>

		<script id="header-vehicle-template" type="text/template">
			<div>Vehicle: <span class="name">{{name}}</span></div>
		</script>

		<script id="header-anonymous-navigation-template" type="text/template">
			<li><a href="<c:url value="/login"/>">Login</a></li>
		</script>

		<script id="header-navigation-template" type="text/template">
			<li><a class="dash" href="<c:url value="/dash"/>">Dashboard</a></li>
		</script>

		<script id="header-user-template" type="text/template">
			<!--{{user.login}} --><a href="<c:url value="/logout"/>">Logout</a>
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
					<div class="log-date"><input type="datetime-local" value="{{logDateFormattedForDateTimeLocal}}"/></div>
					<div class="cost"><span class="units">$</span><span class="number"><input type="number" placeholder="Cost" step=".01" value="{{costFmt}}" autocomplete="off"/></span></div>
					<div class="odometer"><span class="number"><input type="number" step=".1" value="{{serviceLog.odometer}}" placeholder="Odometer" autocomplete="off"/></span> <span class="units">mi</span></div>
					<div class="summary"><input type="text" value="{{serviceLog.summary}}" placeholder="Summary" autocomplete="off"/></div>
					<div class="description"><textarea placeholder="Description">{{serviceLog.description}}</textarea></div>
					<div class="tags"></div>
					<div>
						<input type="submit" value="Save"/>
						<input type="button" value="Cancel" class="cancel"/>
					</div>
				</form>
			</div>
			<a class="container view edit-log" href="">
				<div class="log-date">{{logDateFormattedForHumans}}</div>
				<div class="cost"><span class="units">$</span><span class="number">{{costFmt}}</span></div>
				<div class="odometer"><span class="number">{{serviceLog.odometer}}</span> <span class="units">mi</span></div>
				<div class="summary">{{serviceLog.summary}}</div>
				<div class="description"></div>
				<div class="tags"></div>
			</a>
		</script>

		<script id="dashboard-template" type="text/template">
			<h2>Your Vehicles</h2>

			<p>
				(<a id="add-new-vehicle" class="add-new-vehicle" href="#">Add new vehicle</a>)
			</p>

			<ul id="vehicles">
			</ul>
		</script>

		<script id="vehicle-template" type="text/template">
			<li class="vehicle vehicle-{{vehicleId}}">
				<div class="container edit">

				</div>
				<div class="container view">
					<div class="name">
						<a href="<c:url value="/vehicle"/>#/vehicle/{{vehicleId}}">{{name}}</a>
						(Total logs: <span class="total-log-count">...</span>)
					</div>
					<div class="actions">
						<a class="fuel-logs" href="<c:url value="/log/fuel"/>#/log/fuel/{{vehicleId}}">Fill Up</a>
						<a class="service-logs"
						   href="<c:url value="/log/service"/>#/log/service/{{vehicleId}}">Service</a>
					</div>
					<div>
						(Test:
						<a href="#/fuel/{{vehicleId}}">Fuel</a>)
					</div>
					<div>Notes: <span class="notes">{{notes}}</span></div>
					<div>Description: <span class="description">{{description}}</span></div>
					<a href="#" class="delete" data-vehicleid="{{vehicleId}}">Delete</a>
				</div>
			</li>
		</script>

	</body>
</html>
