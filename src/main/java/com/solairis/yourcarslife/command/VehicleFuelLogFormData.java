/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.solairis.yourcarslife.command;

/**
 *
 * @author josh
 */
public class VehicleFuelLogFormData {

	private int pageNumber;
	private int maxResults;
	private long vehicleFuelLogId;

	public int getMaxResults() {
		return maxResults;
	}

	public void setMaxResults(int maxResults) {
		this.maxResults = maxResults;
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public long getVehicleFuelLogId() {
		return vehicleFuelLogId;
	}

	public void setVehicleFuelLogId(long vehicleFuelLogId) {
		this.vehicleFuelLogId = vehicleFuelLogId;
	}

}
