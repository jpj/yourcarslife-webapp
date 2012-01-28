/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.service.impl;

import com.solairis.yourcarslife.service.PasswordService;
import org.springframework.security.authentication.encoding.PasswordEncoder;

/**
 *
 * @author josh
 */
public class PasswordServiceSpringSecurity implements PasswordService {
	
	private PasswordEncoder passwordEncoder;

	@Override
	public String encodePassword(String password) {
		return this.passwordEncoder.encodePassword(password, null);
	}

	public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}
	
}
