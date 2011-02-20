/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.validator;

import com.solairis.yourcarslife.command.EditVehicleFormData;
import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.data.domain.Vehicle;
import com.solairis.yourcarslife.service.UserService;
import com.solairis.yourcarslife.service.VehicleService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 *
 * @author Johnson
 */
public class EditVehicleFormDataValidator implements Validator {

	private VehicleService vehicleService;
	private UserService userService;

	@Override
	public boolean supports(Class<?> type) {
		return EditVehicleFormData.class.equals(type);
	}

	@Override
	public void validate(Object o, Errors errors) {
		EditVehicleFormData formData = (EditVehicleFormData) o;

		if (formData.getName() == null || formData.getName().trim().length() == 0) {
			errors.rejectValue("name", "required");
		} else {
			org.springframework.security.core.userdetails.User securityUser = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			User user = this.userService.getUser(Long.parseLong(securityUser.getUsername()));
			Vehicle vehicle = this.vehicleService.getVehicleByNameAndUser(formData.getName(), user.getUserId());
			if (vehicle != null && vehicle.getVehicleId() != formData.getVehicleId() && vehicle.getName().equals(formData.getName())) {
				errors.rejectValue("name", "duplicate");
			}
		}

	}

	public void setVehicleService(VehicleService vehicleService) {
		this.vehicleService = vehicleService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}
}
