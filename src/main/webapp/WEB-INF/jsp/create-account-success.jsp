<%-- 
    Document   : create-account-success
    Created on : Feb 6, 2011, 4:21:54 PM
    Author     : josh
--%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html>
    <head>
        <title>Account Successfully Created!</title>
    </head>
    <body>
	    <div>Your account has been created! Please <a href="<c:url value="/login"/>">login</a></div>

	    <p>User Id: ${user.userId}</p>
    </body>
</html>
