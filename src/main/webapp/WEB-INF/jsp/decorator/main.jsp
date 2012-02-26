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

<security:authorize ifAnyGranted="ROLE_USER">
	<c:set var="isLoggedIn" value="true"/>
</security:authorize>

<!doctype html>
<!--<html manifest="<c:url value="/resources/ycl.appcache"/>">-->
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="HandheldFriendly" content="true"/>
		<meta name="viewport" content="width=device-width, height=device-height, user-scalable=no"/>
		<title><decorator:title default="Welcome!"/> | Your Car's Life</title>
<!--		<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/layout.css"/>" media="screen"/>-->
<!--		<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/layout-mobile.css"/>" media="screen and (max-width: 600px)"/>-->
		<link rel="stylesheet" type="text/css" href="<c:url value="/resources/js/jquery/jq.datepicker/jquery.datepick.css"/>"/>

		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jquery-1.7.1.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jq.datepicker/jquery.datepick.js"/>"></script>

		<link rel="stylesheet" type="text/css" href="<c:url value="/resources/js/jquery/jqplot/jquery.jqplot.css"/>"/>
<!--		<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/fuel-log-list.css"/>"/>-->
<!--		<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/fuel-log-list-small.css"/>" media="screen and (max-width: 600px)"/>-->

		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/jquery.jqplot.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/plugins/jqplot.dateAxisRenderer.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/plugins/jqplot.canvasTextRenderer.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/plugins/jqplot.canvasAxisTickRenderer.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/plugins/jqplot.highlighter.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/plugins/jqplot.cursor.min.js"/>"></script>

<!--		<script type="text/javascript" src="<c:url value="/resources/js/extend.js"/>"></script>

		<script type="text/javascript" src="<c:url value="/resources/js/YCLConstants.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/YCL.js"/>"></script>-->

		<jwr:script src="/resources/js/app.js"/>
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

						<c:if test="${!isLoggedIn}">
							<li><a href="<c:url value="/login"/>">Login</a></li>
						</c:if>
					</ul>
				</div>
				<div id="page-content">
					<div class="content">
						<decorator:body/>
					</div>
				</div>
			</div>
		</div>

	</body>
</html>
