/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.validator;

import com.solairis.yourcarslife.command.SaveVehicleFuelLogFormData;
import com.solairis.yourcarslife.data.dao.VehicleFuelLogDao;
import com.solairis.yourcarslife.data.domain.VehicleFuelLog;
import org.apache.log4j.Logger;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 *
 * @author josh
 */
public class SaveVehicleFuelLogFormDataValidator implements Validator {

	private VehicleFuelLogDao vehicleFuelLogDao;
	private final Logger logger = Logger.getLogger(this.getClass());

	@Override
	public boolean supports(Class<?> clazz) {
		return SaveVehicleFuelLogFormData.class.equals(clazz);
	}

	@Override
	@Transactional
	public void validate(Object target, Errors errors) {
		SaveVehicleFuelLogFormData saveVehicleFuelLogFormData = (SaveVehicleFuelLogFormData) target;

		if (saveVehicleFuelLogFormData.getVehicleFuelLogId() == 0) {
			logger.debug("Validating for adding a vehicle fuel log");
			if (saveVehicleFuelLogFormData.getVehicleId() == 0) {
				errors.rejectValue("vehicleId", "required");
			}
		} else {
			logger.debug("Validating for editing a vehicle fuel log");
			VehicleFuelLog vehicleFuelLog = this.vehicleFuelLogDao.getVehicleFuelLog(saveVehicleFuelLogFormData.getVehicleFuelLogId());
			if (vehicleFuelLog == null) {
				errors.rejectValue("vehicleFuelLogId", "invalid");
			} else {
				if (saveVehicleFuelLogFormData.getVehicleId() != vehicleFuelLog.getVehicleId()) {
					errors.rejectValue("vehicleId", "invalid");
				}
			}
		}
		// TODO - Validate logDate

		if (saveVehicleFuelLogFormData.getOdometer() == 0) {
			errors.rejectValue("odometer", "required");
		}

		if (!saveVehicleFuelLogFormData.isMissedFillup() && saveVehicleFuelLogFormData.getFuel() == 0) {
			errors.rejectValue("fuel", "required");
		}


	}

	public VehicleFuelLogDao getVehicleFuelLogDao() {
		return vehicleFuelLogDao;
	}

	public void setVehicleFuelLogDao(VehicleFuelLogDao vehicleFuelLogDao) {
		this.vehicleFuelLogDao = vehicleFuelLogDao;
	}
}
