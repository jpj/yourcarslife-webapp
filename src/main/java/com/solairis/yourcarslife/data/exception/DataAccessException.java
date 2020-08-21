/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.solairis.yourcarslife.data.exception;

/**
 *
 * @author josh
 */
public class DataAccessException extends RuntimeException {

	public DataAccessException(String message) {
		super(message);
	}

	public DataAccessException(Exception e) {
		super(e);
	}

}
