/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.security;

import com.solairis.yourcarslife.data.domain.Log;
import com.solairis.yourcarslife.data.domain.Vehicle;
import com.solairis.yourcarslife.service.LogService;
import com.solairis.yourcarslife.service.VehicleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author josh
 */
@Component
public class Decider {

	@Autowired
	private VehicleService vehicleService;
	@Autowired
	private LogService logService;

	@Transactional
	public boolean canAccessVehicle(long vehicleId, User principal) {
		Vehicle vehicle = this.vehicleService.getVehicle(vehicleId);
		return vehicle.getUser().getLogin().equals(principal.getUsername());
	}

	@Transactional
	public boolean canAccessLog(long logId, User principal) {
		Log log = this.logService.getLog(logId);
		return log.getVehicle().getUser().getLogin().equals(principal.getUsername());
	}

}
