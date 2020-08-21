/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.solairis.yourcarslife.data.input;

import com.solairis.yourcarslife.data.domain.Log;

/**
 *
 * @author josh
 */
public class LogInputData extends PageableInputData {

	private Long vehicleId;
	private Long logId;
	private Boolean active;
	private Class<? extends Log> logType;

	public Class<? extends Log> getLogType() {
		return logType;
	}

	public void setLogType(Class<? extends Log> logType) {
		this.logType = logType;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Long getLogId() {
		return logId;
	}

	public void setLogId(Long logId) {
		this.logId = logId;
	}

	public Long getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(Long vehicleId) {
		this.vehicleId = vehicleId;
	}

}
