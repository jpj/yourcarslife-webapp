/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.validator;

import com.solairis.yourcarslife.command.EditVehicleFormData;
import com.solairis.yourcarslife.service.UserService;
import com.solairis.yourcarslife.service.VehicleService;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 *
 * @author Johnson
 */
public class EditVehicleFormDataValidator implements Validator {

	@Override
	public boolean supports(Class<?> type) {
		return EditVehicleFormData.class.equals(type);
	}

	@Override
	public void validate(Object o, Errors errors) {
		EditVehicleFormData formData = (EditVehicleFormData) o;

		if (formData.getName() == null || formData.getName().trim().length() == 0) {
			errors.rejectValue("name", "required");
		}

	}
}
