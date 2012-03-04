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
public class FuelLogFormData {

	private Long logId;
	private Date logDate;
	private Double odometer;
	private Double fuel;
	private Integer octane;
	private boolean missedFillup;

	public Double getFuel() {
		return fuel;
	}

	public void setFuel(Double fuel) {
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

	public Integer getOctane() {
		return octane;
	}

	public void setOctane(Integer octane) {
		this.octane = octane;
	}

	public Double getOdometer() {
		return odometer;
	}

	public void setOdometer(Double odometer) {
		this.odometer = odometer;
	}

	public Long getLogId() {
		return logId;
	}

	public void setLogId(Long logId) {
		this.logId = logId;
	}

}
