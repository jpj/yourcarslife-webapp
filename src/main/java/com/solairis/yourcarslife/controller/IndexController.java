/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.data.dao.VehicleLogDao;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author josh
 */
@Controller
public class IndexController {

	//@Autowired
	private VehicleLogDao VehicleLogDao;

	private final Logger logger = Logger.getLogger(this.getClass());

	@RequestMapping("/")
	public ModelAndView index() {
		ModelAndView mav = new ModelAndView("index");
		mav.addObject("test", "the value");
		logger.debug("TEST DEBUG");
		return mav;
	}
}
