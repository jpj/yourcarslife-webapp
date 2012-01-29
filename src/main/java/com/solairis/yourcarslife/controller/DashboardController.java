/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.service.UserService;
import com.solairis.yourcarslife.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author josh
 */
@Controller
public class DashboardController {

	@Autowired
	private UserService userService;
	@Autowired
	private VehicleService vehicleService;

	@RequestMapping(value = "/dashboard")
	@Transactional
	public void dashboard(Model model) {

		org.springframework.security.core.userdetails.User securityUser = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = this.userService.getUser(Long.parseLong(securityUser.getUsername()));

		model.addAttribute("vehicles", this.vehicleService.getVehiclesByUserId(user.getUserId()));

		model.addAttribute("user", user);

	}

}
