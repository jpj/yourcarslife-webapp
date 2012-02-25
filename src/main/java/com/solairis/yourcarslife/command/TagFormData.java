/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.command;

/**
 *
 * @author Joshua Johnson
 */
public class TagFormData {

	public enum Submit {
		Save, Cancel;
	}
	private String label;
	private Submit submit;

	public Submit getSubmit() {
		return submit;
	}

	public void setSubmit(Submit submit) {
		this.submit = submit;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}
}
