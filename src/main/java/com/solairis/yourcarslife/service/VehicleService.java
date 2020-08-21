/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.solairis.yourcarslife.service;

import com.solairis.yourcarslife.data.dao.VehicleDao;
import com.solairis.yourcarslife.data.domain.Vehicle;
import com.solairis.yourcarslife.data.input.VehicleInputData;
import java.util.List;

/**
 *
 * @author josh
 */
public class VehicleService {

	private VehicleDao vehicleDao;

	public Vehicle getVehicle(long vehicleId) {
		return this.vehicleDao.getVehicle(vehicleId);
	}

	public List<Vehicle> getVehiclesByUserId(long userId) {
		VehicleInputData inputData = new VehicleInputData();
		inputData.setUserId(userId);

		return this.vehicleDao.getVehicles(inputData);
	}

	public void saveVehicle(Vehicle vehicle) {
		this.vehicleDao.saveVehicle(vehicle);
	}

	public void deleteVehicle(Vehicle vehicle) {
		this.vehicleDao.delete(vehicle);
	}

	public void setVehicleDao(VehicleDao vehicleDao) {
		this.vehicleDao = vehicleDao;
	}

}
