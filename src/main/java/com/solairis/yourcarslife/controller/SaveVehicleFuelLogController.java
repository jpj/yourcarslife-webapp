/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.command.SaveVehicleFuelLogFormData;
import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.service.UserService;
import java.beans.PropertyEditor;
import java.util.Date;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author josh
 */
@Controller
public class SaveVehicleFuelLogController {

	@Autowired
	private UserService userService;
	@Autowired
	private org.springframework.validation.Validator saveVehicleFuelLogFormDataValidator;
	@Autowired
	private PropertyEditor customDateEditor;

	@InitBinder
	protected void initBinder(WebDataBinder binder) {
		binder.setValidator(this.saveVehicleFuelLogFormDataValidator);
		binder.registerCustomEditor(Date.class, customDateEditor);
	}

	@RequestMapping(value = "/data/save-vehicle-fuel-log")
	public void saveVehicleFuelLog(@Valid SaveVehicleFuelLogFormData saveVehicleFuelLogFormData, BindingResult errors, Model model) {
		if (!errors.hasFieldErrors()) {
			org.springframework.security.core.userdetails.User securityUser = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			User user = this.userService.getUser(Long.parseLong(securityUser.getUsername()));
		}
		model.addAttribute("errors", errors.getFieldErrors());
	}
}
