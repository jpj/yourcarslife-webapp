/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.requestmatcher;

import javax.servlet.http.HttpServletRequest;
import org.springframework.security.web.util.RequestMatcher;
import org.springframework.security.web.util.UrlUtils;

/**
 *
 * @author JanieBear
 */
public class ServicesRequestMatcher implements RequestMatcher {

	@Override
	public boolean matches(HttpServletRequest hsr) {
		return UrlUtils.buildRequestUrl(hsr).startsWith("/api");
	}

}
