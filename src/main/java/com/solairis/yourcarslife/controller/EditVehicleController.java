/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.command.EditVehicleFormData;
import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.data.domain.Vehicle;
import com.solairis.yourcarslife.service.UserService;
import com.solairis.yourcarslife.service.VehicleService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Johnson
 */
@Controller
public class EditVehicleController {

	@Autowired
	private UserService userService;
	@Autowired
	private VehicleService vehicleService;
	@Autowired
	private Validator editVehicleFormDataValidator;

	@InitBinder("editVehicleFormData")
	protected void initBinder(WebDataBinder binder) {
		binder.setValidator(editVehicleFormDataValidator);
	}

	@RequestMapping(value = "/vehicle/{vehicleId}", method = {RequestMethod.GET, RequestMethod.HEAD})
	@Transactional
	public String form(@PathVariable long vehicleId, @ModelAttribute EditVehicleFormData editVehicleFormData, Model model) {
		org.springframework.security.core.userdetails.User securityUser = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = this.userService.getUser(Long.parseLong(securityUser.getUsername()));

		Vehicle vehicle = null;
		if (vehicleId > 0) {
			vehicle = this.vehicleService.getVehicle(vehicleId);
		}
		model.addAttribute("vehicle", vehicle);

		if (vehicle != null) {
			editVehicleFormData.setVehicleId(vehicle.getVehicleId());
			editVehicleFormData.setName(vehicle.getName());
			editVehicleFormData.setDescription(vehicle.getDescription());
			editVehicleFormData.setNotes(vehicle.getNotes());
		}
		return "vehicle";
	}

	@RequestMapping(value = "/vehicle/{vehicleId}", method = RequestMethod.POST)
	@Transactional
	public String submit(@Valid EditVehicleFormData editVehicleFormData, BindingResult errors, Model model) {
		org.springframework.security.core.userdetails.User securityUser = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = this.userService.getUser(Long.parseLong(securityUser.getUsername()));
		if (!errors.hasErrors()) {
			Vehicle vehicle;

			if (editVehicleFormData.getVehicleId() == 0) {
				vehicle = new Vehicle();
				vehicle.setUser(user);
			} else {
				vehicle = this.vehicleService.getVehicle(editVehicleFormData.getVehicleId());
			}
			vehicle.setName(editVehicleFormData.getName());
			vehicle.setDescription(editVehicleFormData.getDescription());
			vehicle.setNotes(editVehicleFormData.getNotes());
			this.vehicleService.saveVehicle(vehicle);
			model.addAttribute("vehicle", vehicle);
			model.addAttribute("success", true);
		}
		return "vehicle";
	}
}
