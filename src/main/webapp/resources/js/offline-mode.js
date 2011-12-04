/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//$(document).ready(function() {
//	alert("ofline mode ready");
//
//	if (navigator.onLine) {
//		alert("online");
//	} else {
//		alert("offline");
//	}
//})

window.addEventListener("load", function(e) {
	var appCache = window.applicationCache;

	appCache.addEventListener("error", function(e) {
		$("#app-cache-status").text('Error');
	}, false);

	appCache.addEventListener("checking", function(e) {
		$("#app-cache-status").text('Checking');
	}, false);

	appCache.addEventListener("cached", function(e) {
		$("#app-cache-status").text('Cached');
	}, false);
}, false);

$(document).ready(function() {	
	$("#navigation .debug a").click(function(e) {
		e.preventDefault();
	});
});