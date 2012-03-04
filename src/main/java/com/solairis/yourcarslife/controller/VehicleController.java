/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.data.domain.Vehicle;
import com.solairis.yourcarslife.service.UserService;
import com.solairis.yourcarslife.service.VehicleService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Joshua Johnson
 */
@Controller
public class VehicleController {

	@Autowired
	private UserService userService;
	@Autowired
	private VehicleService vehicleService;

	@RequestMapping(value="/api/vehicle", method= RequestMethod.GET)
	@Transactional
	@ResponseBody
	public List<Vehicle> list() {
		return vehicleService.getVehiclesByUserId(Long.parseLong( ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()));
	}

	@RequestMapping(value="/api/vehicle", method= RequestMethod.POST)
	@Transactional
	@ResponseBody
	public void save(@RequestBody Vehicle vehicle) {
		vehicle.setUser(userService.getUser(Long.parseLong( ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername())));
		vehicleService.saveVehicle(vehicle);
	}

	@RequestMapping(value="/api/vehicle/{vehicleId}", method= RequestMethod.PUT)
	@Transactional
	@ResponseBody
	public void put(@RequestBody Vehicle vehicle, @PathVariable("vehicleId") long vehicleId) {
		if (vehicleId != vehicle.getVehicleId()) {
			throw new IllegalArgumentException("Vehicle ID passed on param ("+vehicleId+") does not match ID passed in request ("+vehicle.getVehicleId()+")");
		}
		vehicleService.saveVehicle(vehicle);
	}

}
