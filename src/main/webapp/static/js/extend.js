/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Date.prototype.getMonthName = function() {
	var m = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	return m[this.getMonth()];
};
Date.prototype.getMonthShortName = function() {
	var m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	return m[this.getMonth()];
};
Date.prototype.getDayName = function() {
	var d = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	return d[this.getDay()];
};