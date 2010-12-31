/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.solairis.yourcarslife.command;

import java.util.Date;

/**
 *
 * @author josh
 */
public class SaveVehicleFuelLogFormData {

	private long vehicleFuelLogId;
	private long vehicleId;
	private Date logDate;
	private double odometer;
	private double fuel;
	private int octane;
	private boolean missedFillup;

	public double getFuel() {
		return fuel;
	}

	public void setFuel(double fuel) {
		this.fuel = fuel;
	}

	public Date getLogDate() {
		return logDate;
	}

	public void setLogDate(Date logDate) {
		this.logDate = logDate;
	}

	public boolean isMissedFillup() {
		return missedFillup;
	}

	public void setMissedFillup(boolean missedFillup) {
		this.missedFillup = missedFillup;
	}

	public int getOctane() {
		return octane;
	}

	public void setOctane(int octane) {
		this.octane = octane;
	}

	public double getOdometer() {
		return odometer;
	}

	public void setOdometer(double odometer) {
		this.odometer = odometer;
	}

	public long getVehicleFuelLogId() {
		return vehicleFuelLogId;
	}

	public void setVehicleFuelLogId(long vehicleFuelLogId) {
		this.vehicleFuelLogId = vehicleFuelLogId;
	}

	public long getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(long vehicleId) {
		this.vehicleId = vehicleId;
	}

}
