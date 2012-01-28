/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.data.domain.Vehicle;
import com.solairis.yourcarslife.service.UserService;
import com.solairis.yourcarslife.service.VehicleService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author josh
 */
@Controller
public class VehicleFuelLogController {

	@Autowired
	private UserService userService;
	@Autowired
	private VehicleService vehicleService;
	private final Logger logger = Logger.getLogger(this.getClass());

	@ExceptionHandler(value = Exception.class)
	public ModelAndView handleServiceException(Exception e) {
                logger.fatal("", e);
		ModelAndView mav = new ModelAndView("error");
		mav.addObject("errorMessage", e.getMessage());
		return mav;
	}

	@RequestMapping("/vehicle-fuel-log/{vehicleId}")
	public String log(@PathVariable("vehicleId") long vehicleId, Model model) {
		ModelAndView mav = new ModelAndView("log");
		org.springframework.security.core.userdetails.User securityUser = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = this.userService.getUser(Long.parseLong(securityUser.getUsername()));
		Vehicle vehicle = this.vehicleService.getVehicle(vehicleId);

		model.addAttribute("vehicle", vehicle);

		return "vehicle-fuel-log";
	}
}
