/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.validator;

import com.solairis.yourcarslife.data.domain.FuelLog;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 *
 * @author josh
 */
public class FuelLogValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return FuelLog.class.equals(clazz);
	}

	@Override
	@Transactional
	public void validate(Object target, Errors errors) {
		FuelLog fuelLog = (FuelLog) target;

		if (fuelLog.getLogDate() == null) {
			errors.rejectValue("logDate", "required");
		}

		if (fuelLog.getOdometer() == 0) {
			errors.rejectValue("odometer", "required");
		}

		if (!fuelLog.isMissedFillup() && fuelLog.getFuel() == 0) {
			errors.rejectValue("fuel", "required");
		}


	}
}
