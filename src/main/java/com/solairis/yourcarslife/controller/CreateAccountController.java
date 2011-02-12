/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.command.CreateAccountFormData;
import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.service.UserService;
import com.solairis.yourcarslife.validator.CreateAccountFormDataValidator;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author josh
 */
@Controller
public class CreateAccountController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private Validator createAccountFormDataValidator;

	@InitBinder("createAccountFormData")
	protected void initBinder(WebDataBinder binder) {
		binder.setValidator(createAccountFormDataValidator);
	}

	@RequestMapping(value="/create-account", method={RequestMethod.GET, RequestMethod.HEAD})
	public String createAccountForm(@ModelAttribute CreateAccountFormData createAccountFormData) {
		return "create-account";
	}

	@RequestMapping(value="/create-account", method=RequestMethod.POST)
	public String createAccountSubmit(@Valid CreateAccountFormData formData, BindingResult errors, Model model) {
		if (!errors.hasFieldErrors()) {
			User user = new User();
			user.setEmail(formData.getEmail());
			user.setEnabled(true);
			user.setLogin(formData.getEmail());
			this.userService.createUser(user, formData.getPassword());
		}
		model.addAttribute("errors", errors.getFieldErrors());
		return errors.hasFieldErrors() ? "create-account" : "create-account-success";
	}

}
