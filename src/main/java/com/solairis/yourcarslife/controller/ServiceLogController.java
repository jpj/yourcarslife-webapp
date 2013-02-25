/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.data.domain.ServiceLog;
import com.solairis.yourcarslife.service.LogService;
import com.solairis.yourcarslife.service.TagService;
import com.solairis.yourcarslife.service.VehicleService;
import java.beans.PropertyEditor;
import java.util.Date;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Joshua Johnson
 */
@Controller
@RequestMapping(value="/api/log/service")
public class ServiceLogController {

	@Autowired
	private LogService logService;
	@Autowired
	private TagService tagService;
	@Autowired
	private VehicleService vehicleService;
	@Autowired
	private PropertyEditor customDateEditor;

	@InitBinder
	protected void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(Date.class, customDateEditor);
	}

	@RequestMapping(method = RequestMethod.GET)
	@Transactional
	@ResponseBody
	public List<ServiceLog> list(@RequestParam("vehicleId") long vehicleId) {
		return logService.getServiceLogsForVehicle(vehicleId, 1, 100);
	}
	
	@RequestMapping(value = "/{logId}", method = RequestMethod.GET)
	@Transactional
	@ResponseBody
	public ServiceLog get(@PathVariable("logId") long logId) {
		return this.logService.getServiceLog(logId);
	}

	@RequestMapping(value = "/{logId}", method = RequestMethod.PUT)
	@Transactional
	@ResponseBody
	public ServiceLog put(@PathVariable("logId") long logId, @RequestBody ServiceLog log, Model model) {
		if (logId != log.getLogId()) {
			throw new IllegalArgumentException("Param Log ID ("+logId+") does not match Request Body Log ID ("+log.getLogId()+")");
		}
		logService.save(log);
		return log;
	}

	@RequestMapping(method = RequestMethod.POST)
	@Transactional
	@ResponseBody
	public ServiceLog save(@Valid @RequestBody ServiceLog inLog) {
		ServiceLog log = new ServiceLog();
		log.setActive(true);
		log.setCost(inLog.getCost());
		log.setDescription(inLog.getDescription());
		log.setLogDate(inLog.getLogDate());
		log.setOdometer(inLog.getOdometer());
		log.setSummary(inLog.getSummary());
		log.setVehicle(this.vehicleService.getVehicle(inLog.getVehicle().getVehicleId()));
		this.logService.save(log);
		return log;
	}

}
