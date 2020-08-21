/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.data.domain;

/**
 *
 * @author josh
 */
public class FuelLog extends Log {

	private double fuel;
	private int octane;
	private boolean missedFillup;

	public double getFuel() {
		return fuel;
	}

	public void setFuel(double fuel) {
		this.fuel = fuel;
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

}
