/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.solairis.yourcarslife.validator;

import com.solairis.yourcarslife.command.CreateAccountFormData;
import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.service.UserService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 *
 * @author josh
 */
public class CreateAccountFormDataValidator implements Validator {

	private UserService userService;

	@Override
	public boolean supports(Class<?> clazz) {
		return CreateAccountFormData.class.equals(clazz);
	}

	@Override
	@Transactional
	public void validate(Object target, Errors errors) {
		CreateAccountFormData formData = (CreateAccountFormData)target;

		User user = this.userService.getUser(formData.getEmail());

		if (user != null) {
			errors.rejectValue("email", "duplicate");
		}
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

}
