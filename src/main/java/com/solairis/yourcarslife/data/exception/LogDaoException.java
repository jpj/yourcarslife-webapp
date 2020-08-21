/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.solairis.yourcarslife.data.exception;

/**
 *
 * @author josh
 */
public class LogDaoException extends DataAccessException {

	public LogDaoException(String message) {
		super(message);
	}

	public LogDaoException(Exception e) {
		super(e);
	}

}
