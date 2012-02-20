<%--
    Document   : log
    Created on : Nov 21, 2010, 8:26:55 PM
    Author     : josh
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!doctype html>
<html>
	<head>
		<title>Vehicle Log</title>

		<link rel="stylesheet" type="text/css" href="<c:url value="/resources/js/jquery/jqplot/jquery.jqplot.css"/>"/>
		<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/fuel-log-list.css"/>"/>
		<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/fuel-log-list-small.css"/>" media="screen and (max-width: 600px)"/>

		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/jquery.jqplot.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/plugins/jqplot.dateAxisRenderer.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/plugins/jqplot.canvasTextRenderer.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/plugins/jqplot.canvasAxisTickRenderer.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/plugins/jqplot.highlighter.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/jquery/jqplot/plugins/jqplot.cursor.min.js"/>"></script>
                <script type="text/javascript" src="<c:url value="/resources/js/fuel-log-list.js"/>"></script>
	</head>
	<body>
		<p id="vehicle">
			<a class="name" href="<c:url value="/vehicle/${vehicle.vehicleId}"/>">${vehicle.name}</a>: <span class="notes">${vehicle.notes}</span>
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
			<c:set var="prevFuelLog"/>
			<c:forEach begin="0" end="20" varStatus="fuelLogRow">
				<c:set var="fuelLog" value="${fuelLogs[fuelLogRow.index]}"/>
				<c:if test="${not fuelLogRow.first}">
					<li class="available ${empty prevFuelLog ? 'unused' : ''}">
						<form action="get">
							<div class="display">
								<div class="date">
									<span class="view"><fmt:formatDate pattern="yyyy MMM dd" value="${prevFuelLog.logDate}"/></span>
									<input type="text" class="edit" name="logDate"/>
								</div>
								<div class="odometer">
									<span class="view number">${prevFuelLog.odometer}</span>
									<input type="number" class="edit number" name="odometer"/>
									<span class="units">mi</span>
								</div>
								<div class="fuel">
									<span class="view number"><fmt:formatNumber type="number" maxFractionDigits="3" minFractionDigits="3" value="${prevFuelLog.fuel}"/></span>
									<input type="number" class="edit number" name="fuel"/>
									<span class="units">gal</span>
								</div>
								<div class="economy">
									<span class="number">
										<c:choose>
											<c:when test="${prevFuelLog.missedFillup or fuelLogRow.index eq fn:length(fuelLogs)}">
												-
											</c:when>
											<c:otherwise>
												<fmt:formatNumber type="number" maxFractionDigits="2" minFractionDigits="2" value="${(prevFuelLog.odometer - fuelLog.odometer) / prevFuelLog.fuel}"/>
											</c:otherwise>
										</c:choose>
									</span>
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
						</form>
					</li>
				</c:if>
				<c:set var="prevFuelLog" value="${fuelLog}"/>
			</c:forEach>
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
