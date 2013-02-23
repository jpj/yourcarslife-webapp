/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.security;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

/**
 *
 * @author josh.j
 */
public class Http401NotAuthorizedEntryPoint implements AuthenticationEntryPoint {

	/**
	 * Always return 401
	 * @param request
	 * @param response
	 * @param authException
	 * @throws IOException
	 * @throws ServletException 
	 */
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Not Authorized");
	}
	
}
