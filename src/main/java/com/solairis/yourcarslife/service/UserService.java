/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.service;

import com.solairis.yourcarslife.data.dao.UserDao;
import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.data.domain.UserRole;
import com.solairis.yourcarslife.util.YCLConstants;

/**
 *
 * @author josh
 */
public class UserService {

	private UserDao userDao;
	private PasswordService passwordService;

	public User getUser(long userId) {
		return this.userDao.getUser(userId);
	}

	public User getUser(String login) {
		return this.userDao.getUser(login);
	}

	public void createUser(User user, String password) {
		user.setPassword(this.passwordService.encodePassword(password));
		this.userDao.saveUser(user);
		UserRole userRole = new UserRole();
		userRole.setRoleKey(YCLConstants.ROLE_USER);
		user.getUserRoles().add(userRole);
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	public void setPasswordService(PasswordService passwordService) {
		this.passwordService = passwordService;
	}
}
