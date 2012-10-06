/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.data.domain.Vehicle;
import com.solairis.yourcarslife.service.UserService;
import com.solairis.yourcarslife.service.VehicleService;
import java.util.List;
import javax.annotation.Resource;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.ObjectError;
import org.springframework.validation.Validator;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *
 * @author Joshua Johnson
 */
@Controller
public class VehicleController {

	@Resource
	private UserService userService;
	@Resource
	private VehicleService vehicleService;

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
	public List<ObjectError> validationErrorHandler(MethodArgumentNotValidException e) {
		return e.getBindingResult().getAllErrors();
	}

	// TODO - User Id should be passed in and authed
	@RequestMapping(value="/api/vehicle", method= RequestMethod.GET)
	@Transactional
	@ResponseBody
	public List<Vehicle> list() {
		return vehicleService.getVehiclesByUserId(Long.parseLong( ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()));
	}

	@RequestMapping(value="/api/vehicle/{vehicleId}", method= RequestMethod.GET)
	@Transactional
	@ResponseBody
	@PreAuthorize("@decider.canAccessVehicle(#vehicleId, principal)")
	public Vehicle get(@PathVariable("vehicleId") long vehicleId) {
		return vehicleService.getVehicle(vehicleId);
	}

	@RequestMapping(value="/api/vehicle", method= RequestMethod.POST)
	@Transactional
	@ResponseBody
	public Vehicle save(@Valid @RequestBody Vehicle inVehicle) {
		Vehicle vehicle = new Vehicle();
		vehicle.setUser(userService.getUser(Long.parseLong( ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername())));
		this.updateVehicleFields(inVehicle, vehicle);

		vehicleService.saveVehicle(vehicle);
		return vehicle;
	}

	@RequestMapping(value="/api/vehicle/{vehicleId}", method= RequestMethod.PUT)
	@Transactional
	@ResponseBody
	@PreAuthorize("@decider.canAccessVehicle(#vehicleId, principal)")
	public Vehicle put(@Valid @RequestBody Vehicle inVehicle, @PathVariable("vehicleId") long vehicleId) {
		if (vehicleId != inVehicle.getVehicleId()) {
			throw new IllegalArgumentException("Vehicle ID passed on param ("+vehicleId+") does not match ID passed in request ("+inVehicle.getVehicleId()+")");
		}
		Vehicle vehicle = this.vehicleService.getVehicle(vehicleId);
		this.updateVehicleFields(inVehicle, vehicle);
		vehicleService.saveVehicle(vehicle);
		return vehicle;
	}

	private void updateVehicleFields(Vehicle inVehicle, Vehicle vehicle) {
		vehicle.setDescription(inVehicle.getDescription());
		vehicle.setName(inVehicle.getName());
		vehicle.setNotes(inVehicle.getNotes());
	}

}
