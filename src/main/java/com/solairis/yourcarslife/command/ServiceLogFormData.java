/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.command;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 *
 * @author Joshua Johnson
 */
public class ServiceLogFormData {

	private Date logDate;
	private String summary;
	private String description;
	private Double odometer;
	private Set<Long> tagIds = new HashSet<Long>();

	public Set<Long> getTagIds() {
		return tagIds;
	}

	public void setTagIds(Set<Long> tagIds) {
		this.tagIds = tagIds;
	}

	public Double getOdometer() {
		return odometer;
	}

	public void setOdometer(Double odometer) {
		this.odometer = odometer;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getLogDate() {
		return logDate;
	}

	public void setLogDate(Date logDate) {
		this.logDate = logDate;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

}
