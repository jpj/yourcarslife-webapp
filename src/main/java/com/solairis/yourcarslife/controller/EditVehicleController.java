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
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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

	@RequestMapping(value = "/edit-vehicle/{vehicleId}", method = {RequestMethod.GET, RequestMethod.HEAD})
	public String form(@PathVariable long vehicleId, @ModelAttribute EditVehicleFormData formData, Model model) {
		org.springframework.security.core.userdetails.User securityUser = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = this.userService.getUser(Long.parseLong(securityUser.getUsername()));
		Vehicle vehicle = this.vehicleService.getVehicleByUserAndVehicleId(user, vehicleId);

		if (vehicle != null) {
			formData.setVehicleId(vehicle.getVehicleId());
			formData.setName(vehicle.getName());
			formData.setDescription(vehicle.getDescription());
			formData.setNotes(vehicle.getNotes());
		}
		return "edit-vehicle";
	}

	@RequestMapping(value="/edit-vehicle/{vehicleId}", method=RequestMethod.POST)
	public String submit(@Valid EditVehicleFormData formData, BindingResult errors, Model model) {
		org.springframework.security.core.userdetails.User securityUser = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = this.userService.getUser(Long.parseLong(securityUser.getUsername()));
		if (!errors.hasErrors()) {
			Vehicle vehicle = null;

			if (formData.getVehicleId() == 0) {
				vehicle = new Vehicle();
				vehicle.setUser(user);
			} else {
				vehicle = this.vehicleService.getVehicle(formData.getVehicleId());
			}
			vehicle.setName(formData.getName());
			vehicle.setDescription(formData.getDescription());
			vehicle.setNotes(formData.getNotes());
			this.vehicleService.saveVehicle(vehicle);
			model.addAttribute("success", true);
		}
		return "edit-vehicle";
	}
}
