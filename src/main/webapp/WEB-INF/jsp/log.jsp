<%-- 
    Document   : log
    Created on : Nov 21, 2010, 8:26:55 PM
    Author     : josh
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!doctype html>

<html>
    <head>
        <title>Vehicle Log</title>
    </head>
    <body>
        <p>Vehicle Notes: ${vehicle.notes}</p>
		<p>Owned by: ${vehicle.user.firstName}</p>
    </body>
</html>
