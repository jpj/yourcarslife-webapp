<%--
    Document   : log
    Created on : Nov 21, 2010, 8:26:55 PM
    Author     : josh
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="jwr" uri="http://jawr.net/tags" %>
<!doctype html>
<html>
	<head>
		<title>Fuel Log</title>
		<jwr:script src="/resources/js/app/fuel-log-list.js"/>
	</head>
	<body>
		<p id="vehicle">
			<a class="name" href="<c:url value=""/>"></a>: <span class="notes"></span>
                </p>

		<div id="graph-holder">
			<div class="average-economy"></div>
			<div id="graph"></div>
		</div>

		<div class="options">
			<div class="add"><div class="indicator">+</div> <span class="text">Add</span></div>
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

		<ul id="fuel-logs">
		</ul>

		<div class="paging">
			<a href="#prev">prev</a>
			<a href="#next">next</a>
			<span class="from"></span>
			-
			<span class="to"></span>
			of
			<span class="total"></span>
		</div>


	</body>
</html>
