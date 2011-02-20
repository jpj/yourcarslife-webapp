<%-- 
    Document   : log
    Created on : Nov 21, 2010, 8:26:55 PM
    Author     : josh
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html>
	<head>
		<meta name="vehicleId" content="${vehicle.vehicleId}"/>
		<title>Vehicle Log</title>

		<link rel="stylesheet" type="text/css" href="<c:url value="/static/js/jquery/jqplot/jquery.jqplot.css"/>"/>
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/vehicle-fuel-log.css"/>"/>

		<script type="text/javascript" src="<c:url value="/static/js/jquery/jqplot/jquery.jqplot.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery/jqplot/plugins/jqplot.dateAxisRenderer.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery/jqplot/plugins/jqplot.canvasTextRenderer.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery/jqplot/plugins/jqplot.canvasAxisTickRenderer.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery/jqplot/plugins/jqplot.highlighter.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery/jqplot/plugins/jqplot.cursor.min.js"/>"></script>
                <script type="text/javascript" src="<c:url value="/static/js/vehicle-fuel-log.js"/>"></script>
	</head>
	<body>
		<p>
                    <a href="<c:url value="/edit-vehicle/${vehicle.vehicleId}"/>">${vehicle.name}</a>: ${vehicle.notes}
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
			<c:forEach begin="1" end="101">
				<li class="available">
					<form action="get">
						<div class="display">
							<div class="date">
								<span class="view"></span>
								<input type="text" class="edit" name="logDate"/>
							</div>
							<div class="odometer">
								<span class="view number"></span>
								<input type="text" class="edit number" name="odometer"/>
								<span class="units">mi</span>
							</div>
							<div class="fuel">
								<span class="view number"></span>
								<input type="text" class="edit number" name="fuel"/>
								<span class="units">gal</span>
							</div>
							<div class="economy"><span class="number"></span> <span class="units">mpg</span></div>
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
										<input type="text" name="octane"/>
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
