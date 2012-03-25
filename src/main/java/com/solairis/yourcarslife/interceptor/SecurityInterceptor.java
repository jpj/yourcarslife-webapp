/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.interceptor;

import com.solairis.yourcarslife.data.domain.Log;
import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.data.domain.Vehicle;
import com.solairis.yourcarslife.service.LogService;
import com.solairis.yourcarslife.service.UserService;
import com.solairis.yourcarslife.service.VehicleService;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author JanieBear
 */
public class SecurityInterceptor implements HandlerInterceptor {

	@Autowired
	private LogService logService;
	@Autowired
	private UserService userService;
	@Autowired
	private VehicleService vehicleService;

	@Override
	public void afterCompletion(HttpServletRequest hsr, HttpServletResponse hsr1, Object o, Exception excptn) throws Exception {
	}

	@Override
	public void postHandle(HttpServletRequest hsr, HttpServletResponse hsr1, Object o, ModelAndView mav) throws Exception {
	}

	@Override
	@Transactional
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
		User user = this.userService.getUser(( Long.parseLong(((org.springframework.security.core.userdetails.User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername())) );
		Map<String, String> uriVars = (HashMap<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		if (uriVars != null) {
			String vehicleIdParam = uriVars.get("vehicleId");
			if (vehicleIdParam != null) {
				Vehicle vehicle = this.vehicleService.getVehicle(Long.parseLong(vehicleIdParam));
				if (vehicle.getUser().getUserId() != user.getUserId()) {
					throw new AccessDeniedException("User does not own vehicle");
				}
			}

			String logIdParam = uriVars.get("logId");
			if (logIdParam != null) {
				Log log = this.logService.getLog(Long.parseLong(logIdParam));
				if (log.getVehicle().getUser().getUserId() != user.getUserId()) {
					throw new AccessDeniedException("Log not owned by user");
				}
			}
		}
		return true;
	}
}