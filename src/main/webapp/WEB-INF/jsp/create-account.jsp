<%-- 
    Document   : create-account
    Created on : Feb 6, 2011, 4:19:20 PM
    Author     : josh
--%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!doctype html>
<html>
    <head>
        <title>Create Account</title>
    </head>
    <body>
	    <form:form commandName="createAccountFormData">
		    <div class="input">
			    <label>Email <form:errors path="email" cssClass="error"/>
				    <form:input path="email"/></label>
		    </div>
		    <div class="input">
			    <label>Password <form:errors path="password" cssClass="error"/>
				    <form:password path="password"/></label>
		    </div>
		    <div class="input">
			    <input type="submit" value="Create Account"/>
		    </div>
	    </form:form>
    </body>
</html>
