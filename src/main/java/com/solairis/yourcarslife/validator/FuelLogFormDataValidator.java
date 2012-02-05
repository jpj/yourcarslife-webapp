/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.validator;

import com.solairis.yourcarslife.command.FuelLogFormData;
import com.solairis.yourcarslife.data.dao.UserDao;
import com.solairis.yourcarslife.data.dao.VehicleDao;
import com.solairis.yourcarslife.data.dao.LogDao;
import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.data.domain.Vehicle;
import com.solairis.yourcarslife.data.domain.Log;
import org.apache.log4j.Logger;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 *
 * @author josh
 */
public class FuelLogFormDataValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return FuelLogFormData.class.equals(clazz);
	}

	@Override
	@Transactional
	public void validate(Object target, Errors errors) {
		FuelLogFormData formData = (FuelLogFormData) target;

		if (formData.getLogDate() == null) {
			errors.rejectValue("logDate", "required");
		}

		if (formData.getOdometer() == null) {
			errors.rejectValue("odometer", "required");
		}

		if (!formData.isMissedFillup() && formData.getFuel() == null) {
			errors.rejectValue("fuel", "required");
		}


	}
}
