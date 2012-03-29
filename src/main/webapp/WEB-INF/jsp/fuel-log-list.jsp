<%--
    Document   : log
    Created on : Nov 21, 2010, 8:26:55 PM
    Author     : josh
--%>
<!doctype html>
<html>
	<head>
		<title>Fuel Log</title>
		<script type="text/javascript">
			$(function() {
				var app = new solairis.ycl.view.FuelLogApp({el: $("body")}); // Initialize Application
			});
		</script>
	</head>
	<body>
		<p class="vehicle-wrapper">
                </p>

		<div id="graph-holder">
			<div class="average-economy"></div>
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
