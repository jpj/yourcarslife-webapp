/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Joshua P Johnson
 */
@Controller
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping(value="/api/user/{userId}", method= RequestMethod.GET)
	@Transactional
	@ResponseBody
	public User get(@PathVariable("userId") long userId) {
		return this.userService.getUser(userId);
	}

	@RequestMapping(value="/api/currentuser", method= RequestMethod.GET)
	@Transactional
	@ResponseBody
	public User getCurrentUser() {
		return this.userService.getUser(( Long.parseLong(((org.springframework.security.core.userdetails.User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername())) );
	}

}
