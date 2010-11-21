<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<body>
<h2>Hello World!</h2>
<h3>Vehicle Log</h3>
<pre>
Vehicle Id: ${vehicleFuelLog.vehicleFuelLogId}
Created:    ${vehicleFuelLog.created}
Odometer:   ${vehicleFuelLog.odometer}
Fuel:       ${vehicleFuelLog.fuel}

User Login: ${user.login}
</pre>
</body>
</html>
