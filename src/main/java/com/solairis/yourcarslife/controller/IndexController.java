/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.data.dao.VehicleLogDao;
import com.solairis.yourcarslife.data.domain.VehicleLog;
import com.solairis.yourcarslife.data.exception.VehicleLogDaoException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author josh
 */
@Controller
public class IndexController {

	@Autowired
	private VehicleLogDao vehicleLogDao;

	private final Logger logger = Logger.getLogger(this.getClass());

	@RequestMapping("/")
	@Transactional
	public ModelAndView index() throws VehicleLogDaoException {
		ModelAndView mav = new ModelAndView("index");

		VehicleLog vehicleLog = this.vehicleLogDao.getVehicleLog(486);

		mav.addObject("test", "the value");
		mav.addObject("vehicleLog", vehicleLog);

//		vehicleLog.setOdometer(3.0);
//		this.vehicleLogDao.updateVehicleLog(vehicleLog);

		return mav;
	}

	@RequestMapping("/admin")
	public String admin() {
		return "admin";
	}
}
