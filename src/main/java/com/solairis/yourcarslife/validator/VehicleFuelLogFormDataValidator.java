/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.solairis.yourcarslife.validator;

import com.solairis.yourcarslife.command.VehicleFuelLogFormData;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 *
 * @author josh
 */
public class VehicleFuelLogFormDataValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return VehicleFuelLogFormData.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		VehicleFuelLogFormData formData = (VehicleFuelLogFormData)target;
	}

}
