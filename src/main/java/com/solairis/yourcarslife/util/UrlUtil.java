/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.solairis.yourcarslife.util;

/**
 *
 * @author josh
 */
public class UrlUtil {

	public static String convertFromUrl(String url) {
		return url.replaceAll("_", " ");
	}

	public static String convertToUrl(String candidate) {
		return candidate.replaceAll(" ", "_");
	}

}
