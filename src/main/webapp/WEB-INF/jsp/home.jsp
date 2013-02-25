<%--
    Document   : home
    Created on : Dec 19, 2010, 7:55:18 PM
    Author     : josh
--%>
<!doctype html>
<html>
	<head>
		<title>Home</title>
		<meta name="appcache" content="on"/>
		
		<script type="text/javascript">
			$(function() {
				// Start routing
				window.app = new solairis.ycl.router.App();
				Backbone.history.start({pushState: true, root: solairis.ycl.constant.BASE_URL+'/'});
			});
		</script>
	</head>
	<body>
		<%@include file="template/home.jspf" %>
	</body>
</html>
