/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.service.VehicleService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author josh
 */
@Controller
public class VehicleFuelLogController {

	@Autowired
	private VehicleService vehicleService;
	private final Logger logger = Logger.getLogger(this.getClass());

	@ExceptionHandler(value = Exception.class)
	public ModelAndView handleServiceException(Exception e) {
                logger.fatal("", e);
		ModelAndView mav = new ModelAndView("error");
		mav.addObject("errorMessage", e.getMessage());
		return mav;
	}

	@RequestMapping("/vehicle-fuel-log/{vehicleId}")
	@Transactional
	public String log(@PathVariable("vehicleId") long vehicleId, Model model) {
		model.addAttribute("vehicle", this.vehicleService.getVehicle(vehicleId));
		return "vehicle-fuel-log";
	}
}
