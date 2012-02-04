/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.command.VehicleFuelLogFormData;
import com.solairis.yourcarslife.data.domain.Log;
import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.data.domain.Vehicle;
import com.solairis.yourcarslife.service.LogService;
import com.solairis.yourcarslife.service.UserService;
import com.solairis.yourcarslife.service.VehicleService;
import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author josh
 */
@Controller
public class FuelLogListController {

	@Autowired
	private LogService logService;
	@Autowired
	private VehicleService vehicleService;
	@Autowired
	private Validator vehicleFuelLogFormDataValidator;
	@Autowired
	private Integer vehicleFuelLogMaxResultsUpperLimit;
	@Autowired
	private Integer vehicleFuelLogDefaultMaxResults;

	@InitBinder("vehicleFuelLogFormData")
	protected void initBinder(WebDataBinder binder) {
		binder.setValidator(vehicleFuelLogFormDataValidator);
	}

	@RequestMapping(value = "/vehicle/{vehicleId}/log/fuel/list/{pageNumber}")
	@Transactional
	public String submit(@PathVariable("vehicleId") long vehicleId, @PathVariable("pageNumber") int pageNumber, @Valid VehicleFuelLogFormData vehicleFuelLogFormData, BindingResult errors, Model model) {
		if (!errors.hasFieldErrors()) {
			Vehicle vehicle = this.vehicleService.getVehicle(vehicleId);

			if (vehicle != null) {
				int maxResults = vehicleFuelLogFormData.getMaxResults();
				maxResults = maxResults < 1 ? this.vehicleFuelLogDefaultMaxResults.intValue() : maxResults;
				maxResults = maxResults > this.vehicleFuelLogMaxResultsUpperLimit.intValue() ? this.vehicleFuelLogMaxResultsUpperLimit.intValue() : maxResults;
				model.addAttribute("vehicle", vehicle);
				model.addAttribute("fuelLogs", this.logService.getFuelLogsForVehicle(vehicleId, pageNumber, maxResults));
				model.addAttribute("totalResults", this.logService.getFuelLogCountByVehicle(vehicle.getVehicleId()));
				model.addAttribute("pageSize", maxResults);
				model.addAttribute("pageNumber", pageNumber);
			}
		}

		model.addAttribute("errors", errors.getFieldErrors());

		return "fuel-log-list";
	}
}
