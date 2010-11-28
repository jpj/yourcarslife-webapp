/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.data.dao.UserDao;
import com.solairis.yourcarslife.data.dao.VehicleFuelLogDao;
import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.data.domain.VehicleFuelLog;
import com.solairis.yourcarslife.data.exception.UserDaoException;
import com.solairis.yourcarslife.data.exception.VehicleLogDaoException;
import com.solairis.yourcarslife.service.VehicleService;
import com.solairis.yourcarslife.service.exception.VehicleServiceException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author josh
 */
@Controller
public class IndexController {

	@Autowired
	private VehicleFuelLogDao vehicleFuelLogDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private VehicleService vehicleService;

	private final Logger logger = Logger.getLogger(this.getClass());

	@RequestMapping("/")
	@Transactional
	public ModelAndView index() throws VehicleLogDaoException, UserDaoException {
		ModelAndView mav = new ModelAndView("index");

		VehicleFuelLog vehicleFuelLog = this.vehicleFuelLogDao.getVehicleFuelLog(486);

		mav.addObject("test", "the value");
		mav.addObject("vehicleFuelLog", vehicleFuelLog);

		User user = this.userDao.getUser(1);
		mav.addObject("user", user);

//		vehicleLog.setOdometer(3.0);
//		this.vehicleLogDao.updateVehicleLog(vehicleLog);

		return mav;
	}

	@RequestMapping("/log/{vehicleName}")
	public String log(@PathVariable String vehicleName, Model model) throws VehicleServiceException, UserDaoException {
		org.springframework.security.core.userdetails.User securityUser = (org.springframework.security.core.userdetails.User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = this.userDao.getUser(Long.parseLong(securityUser.getUsername()));
		model.addAttribute("auth", SecurityContextHolder.getContext().getAuthentication());
		model.addAttribute("vehicle", this.vehicleService.getVehicleByNameAndUser(vehicleName, user.getUserId()));
		return "log";
	}

	@RequestMapping("/admin")
	public String admin() {
		return "admin";
	}
}
