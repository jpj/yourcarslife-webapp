/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.data.domain.ServiceLog;
import com.solairis.yourcarslife.service.LogService;
import com.solairis.yourcarslife.service.VehicleService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Josh Johnson
 */
@Controller
public class ServiceLogListController {

	@Autowired
	private VehicleService vehicleService;

	@Autowired
	private LogService logService;

	@RequestMapping(value = "/vehicle/{vehicleId}/log/service/list/{pageNumber}")
	@Transactional
	public String list(@PathVariable("vehicleId") long vehicleId, @PathVariable("pageNumber") Integer pageNumber, Model model) {
		model.addAttribute("vehicle", vehicleService.getVehicle(vehicleId));
		model.addAttribute("serviceLogs", logService.getServiceLogsForVehicle(vehicleId, pageNumber == null || pageNumber == 0 ? 1 : pageNumber, 100));
		return "service-log-list";
	}

}
