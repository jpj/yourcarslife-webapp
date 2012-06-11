/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.data.domain.FuelLog;
import com.solairis.yourcarslife.service.LogService;
import com.solairis.yourcarslife.service.VehicleService;
import java.util.List;
import javax.annotation.Resource;
import javax.validation.Valid;
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
public class FuelLogController {

	@Resource
	private LogService logService;
	@Resource
	private VehicleService vehicleService;
	@Resource
	private Validator fuelLogValidator;

	@InitBinder(value={"fuelLog"})
	protected void initBinder(WebDataBinder binder) {
		binder.setValidator(this.fuelLogValidator);
	}

	@RequestMapping(value= "/api/vehicle/{vehicleId}/log/fuel", method= RequestMethod.GET)
	@Transactional
	@ResponseBody
	public List<FuelLog> list(@PathVariable("vehicleId") long vehicleId, @RequestParam(value="page", defaultValue="1") int page, @RequestParam(value="numResults") int numResults) {
		return this.logService.getFuelLogsForVehicle(vehicleId, page, numResults > 1000 ? 1000 : numResults);
	}

	@RequestMapping(value="/api/vehicle/{vehicleId}/log/fuel/{logId}", method= RequestMethod.GET)
	@Transactional
	@ResponseBody
	public FuelLog get(@PathVariable("vehicleId") long vehicleId, @PathVariable("logId") long logId) {
		return this.logService.getFuelLog(logId);
	}

	@RequestMapping(value="/api/vehicle/{vehicleId}/log/fuel", method= RequestMethod.POST)
	@Transactional
	@ResponseBody
	public FuelLog save(@PathVariable("vehicleId") long vehicleId, @Valid @RequestBody FuelLog fuelLog) {
		fuelLog.setVehicle(this.vehicleService.getVehicle(vehicleId));
		this.logService.save(fuelLog);
		return fuelLog;
	}

	@RequestMapping(value = "/api/vehicle/{vehicleId}/log/fuel/{logId}", method = RequestMethod.PUT)
	@Transactional
	@ResponseBody
	public void put(@PathVariable("vehicleId") long vehicleId, @PathVariable("logId") Long logId, @Valid @RequestBody FuelLog inFuelLog) {
		if (logId != inFuelLog.getLogId()) {
			throw new IllegalArgumentException("Log ID of "+logId+" passed on URL does not match the id "+inFuelLog.getLogId()+ "passed in the body");
		}

		FuelLog fuelLog = this.logService.getFuelLog(logId);
		fuelLog.setActive(inFuelLog.isActive());
		fuelLog.setCost(inFuelLog.getCost());
		fuelLog.setFuel(inFuelLog.getFuel());
		fuelLog.setLogDate(inFuelLog.getLogDate());
		fuelLog.setMissedFillup(inFuelLog.isMissedFillup());
		fuelLog.setOctane(inFuelLog.getOctane());
		fuelLog.setOdometer(inFuelLog.getOdometer());

//		this.logService.save(fuelLog);
	}
}
