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

		<ul id="vehicleFuelLogs">
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

		<script id="fuel-log-template" type="text/template">
			<div class="display">
				<div class="date">
					<span class="view"></span>
					<input type="text" class="edit" name="logDate"/>
				</div>
				<div class="odometer">
					<span class="view number"></span>
					<input type="number" class="edit number" name="odometer"/>
					<span class="units">mi</span>
				</div>
				<div class="fuel">
					<span class="view number"></span>
					<input type="number" class="edit number" name="fuel"/>
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
							<input type="number" name="octane"/>
							Octane
						</label>
					</div>
					<div class="submit">
						<input type="submit" name="save" value="Save"/>
						<input type="submit" name="cancel" value="Cancel"/>
					</div>
				</div>
			</div>
		</script>
	</body>
</html>
