/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.data.domain.FuelLog;
import com.solairis.yourcarslife.service.LogService;
import com.solairis.yourcarslife.service.VehicleService;
import java.util.List;
import javax.inject.Inject;
import javax.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author josh
 */
@Controller
@RequestMapping(value = "/api/log/fuel")
public class FuelLogController {

	@Inject
	private LogService logService;
	@Inject
	private VehicleService vehicleService;
	@Inject
	private Validator fuelLogValidator;

	@InitBinder(value = {"fuelLog"})
	protected void initBinder(WebDataBinder binder) {
		binder.setValidator(this.fuelLogValidator);
	}

	@RequestMapping(method = RequestMethod.GET)
	@Transactional
	@ResponseBody
	@PreAuthorize("@decider.canAccessVehicle(#vehicleId, principal)")
	public List<FuelLog> list(@RequestParam("vehicleId") long vehicleId, @RequestParam(value = "offset", defaultValue = "0") int offset, @RequestParam(value = "numResults") int numResults) {
		return this.logService.getFuelLogsForVehicle(vehicleId, offset, numResults);
	}

	@RequestMapping(value = "/{logId}", method = RequestMethod.GET)
	@Transactional
	@ResponseBody
	@PreAuthorize("@decider.canAccessLog(#logId, principal)")
	public FuelLog get(@PathVariable("logId") long logId) {
		return this.logService.getFuelLog(logId);
	}

	@RequestMapping(method = RequestMethod.POST)
	@Transactional
	@ResponseBody
	@PreAuthorize("@decider.canAccessVehicle(#inFuelLog.vehicle.vehicleId, principal)")
	public FuelLog save(@Valid @RequestBody FuelLog inFuelLog) {
		FuelLog fuelLog = new FuelLog();
		fuelLog.setActive(true);
		fuelLog.setCost(inFuelLog.getCost());
		fuelLog.setFuel(inFuelLog.getFuel());
		fuelLog.setLogDate(inFuelLog.getLogDate());
		fuelLog.setMissedFillup(inFuelLog.isMissedFillup());
		fuelLog.setOctane(inFuelLog.getOctane());
		fuelLog.setOdometer(inFuelLog.getOdometer());
		fuelLog.setVehicle(this.vehicleService.getVehicle(inFuelLog.getVehicle().getVehicleId()));
		this.logService.save(fuelLog);
		return fuelLog;
	}

	@RequestMapping(value = "/{logId}", method = RequestMethod.PUT)
	@Transactional
	@ResponseBody
	@PreAuthorize("@decider.canAccessVehicle(#inFuelLog.vehicle.vehicleId, principal)")
	public FuelLog put(@PathVariable("logId") Long logId, @Valid @RequestBody FuelLog inFuelLog) {
		if (logId != inFuelLog.getLogId()) {
			throw new IllegalArgumentException("Log ID of " + logId + " passed on URL does not match the id " + inFuelLog.getLogId() + "passed in the body");
		}

		FuelLog fuelLog = this.logService.getFuelLog(logId);
		fuelLog.setActive(inFuelLog.isActive());
		fuelLog.setCost(inFuelLog.getCost());
		fuelLog.setFuel(inFuelLog.getFuel());
		fuelLog.setLogDate(inFuelLog.getLogDate());
		fuelLog.setMissedFillup(inFuelLog.isMissedFillup());
		fuelLog.setOctane(inFuelLog.getOctane());
		fuelLog.setOdometer(inFuelLog.getOdometer());

		this.logService.save(fuelLog);

		return fuelLog;
	}
}
