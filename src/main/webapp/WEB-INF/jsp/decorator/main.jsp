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
		<jwr:style src="/resources/css/app-small.css" media="screen and (max-width: 600px)"/>
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
				<div class="site-title">Your Car's Life</div>
				<div class="symbol"><span class="default">&#10033;</span><span class="small">*</span></div>
			</div>
		</div>

		<div id="page">
			<div class="container">
				<div id="navigation">
					<ul>
						<security:authorize ifAnyGranted="ROLE_USER">
							<li><a href="<c:url value="/vehicle/list"/>">Dashboard</a></li>
							<li><a href="<c:url value="/logout"/>">Logout</a></li>
						</security:authorize>

						<security:authorize ifNotGranted="ROLE_USER">
							<li><a href="<c:url value="/login"/>">Login</a></li>
						</security:authorize>
					</ul>
				</div>
				<div id="page-content">
					<div class="content">
						<decorator:body/>
					</div>
				</div>
			</div>
		</div>

		<script id="fuel-log-template" type="text/template">
			<form>
				<div class="display">
					<div class="date">
						<span class="view">{{logDate}}</span>
						<input type="text" class="edit" name="logDate" value="{{logDate}}"/>
					</div>
					<div class="odometer">
						<span class="view number">{{odometer}}</span>
						<input type="number" class="edit number" name="odometer" value="{{odometer}}"/>
						<span class="units">mi</span>
					</div>
					<div class="fuel">
						<span class="view number">{{fuel}}</span>
						<input type="number" class="edit number" name="fuel" value="{{fuel}}"/>
						<span class="units">gal</span>
					</div>
					<div class="economy">
						<span class="number"></span>
						<span class="units">mpg</span>
					</div>
					<div class="edit-button"><a href="#edit0">edit</a></div>
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
								<input type="number" name="octane" value="{{octane}}"/>
								Octane
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

	</body>
</html>
