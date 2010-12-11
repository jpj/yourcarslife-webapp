/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.command.VehicleFuelLogFormData;
import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.data.domain.Vehicle;
import com.solairis.yourcarslife.service.UserService;
import com.solairis.yourcarslife.service.VehicleFuelLogService;
import com.solairis.yourcarslife.service.VehicleService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author josh
 */
@Controller
public class VehicleFuelLogController {

	@Autowired
	private VehicleFuelLogService vehicleFuelLogService;
	@Autowired
	private VehicleService vehicleService;
	@Autowired
	private UserService userService;
	@Autowired
	private Validator vehicleFuelLogFormDataValidator;

	@InitBinder
	protected void initBinder(WebDataBinder binder) {
		binder.setValidator(vehicleFuelLogFormDataValidator);
	}

	@RequestMapping(value = "/data/vehicle-fuel-log")
	public void vehicleFuelLog(@Valid VehicleFuelLogFormData vehicleFuelLogFormData, BindingResult errors, Model model) {
		if (!errors.hasFieldErrors()) {
			org.springframework.security.core.userdetails.User securityUser = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			User user = this.userService.getUser(Long.parseLong(securityUser.getUsername()));
			Vehicle vehicle = this.vehicleService.getVehicleByUserAndVehicleId(user, vehicleFuelLogFormData.getVehicleId());

			if (vehicle != null) {
				model.addAttribute("vehicleFuelLogs", this.vehicleFuelLogService.getVehicleFuelLogsByVehicle(vehicle, vehicleFuelLogFormData.getPageNumber(), vehicleFuelLogFormData.getMaxResults()));
			}
		}

		model.addAttribute("errors", errors.getFieldErrors());
	}
}
