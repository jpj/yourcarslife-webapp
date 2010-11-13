/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.data.dao.VehicleLogDao;
import org.springframework.beans.factory.annotation.Autowired;
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

	@RequestMapping("/")
	public ModelAndView index() {
		ModelAndView mav = new ModelAndView("index");
		mav.addObject("test", "the value");
		return mav;
	}
}
