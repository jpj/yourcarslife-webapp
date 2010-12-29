<%-- 
    Document   : log
    Created on : Nov 21, 2010, 8:26:55 PM
    Author     : josh
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!doctype html>
<html>
    <head>
        <title>Vehicle Log</title>
		<link rel="stylesheet" type="text/css" href="<spring:theme code="baseUrl"/>/static/css/vehicle-fuel-log.css"/>
		<script type="text/javascript" src="<spring:theme code="baseUrl"/>/static/js/YCL.js"></script>
		<script type="text/javascript" src="<spring:theme code="baseUrl"/>/static/js/vehicle-fuel-log.js"></script>
    </head>
    <body>
        <p>${vehicle.name}: ${vehicle.notes}</p>

		<div class="paging"></div>

		<ul id="vehicleFuelLogs">
			<c:forEach begin="1" end="100">
				<li class="available">
					<form action="get">
						<div class="display">
							<div class="odometer">
								<span class="view number"></span>
								<input type="text" class="edit number"/>
								<span class="units">mi</span>
							</div>
							<div class="fuel">
								<span class="view number"></span>
								<input type="text" class="edit number"/>
								<span class="units">gal</span>
							</div>
							<div class="date"></div>
							<div class="economy"><span class="number"></span> <span class="units">mpg</span></div>
							<div class="edit-button"><a href="#edit0">edit</a></div>
						</div>
						<div class="edit-section">
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
		<div id="paging">
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
