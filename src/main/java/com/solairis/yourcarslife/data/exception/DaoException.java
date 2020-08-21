/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.data.exception;

/**
 *
 * @author josh
 */
public class DaoException extends RuntimeException {

	public DaoException(String message) {
		super(message);
	}

	public DaoException(Throwable e) {
		super(e);
	}
}
