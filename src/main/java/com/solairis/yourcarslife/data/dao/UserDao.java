/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.solairis.yourcarslife.data.dao;

import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.data.exception.UserDaoException;

/**
 *
 * @author josh
 */
public interface UserDao {

	public User getUser(long userId) throws UserDaoException;
	public User getUser(String login) throws UserDaoException;
	public void saveUser(User user) throws UserDaoException;

}
