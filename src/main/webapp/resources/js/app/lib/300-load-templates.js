/**
 * Template Implementation Mustache
 */

/**
 * Template Renderer
 *
 * @param {String} template
 * @param {Object} view
 * @return {String} rendered template
 */
solairis.ycl.template.render = function(template, view) {
	return Mustache.to_html(template, view);
};

solairis.ycl.template.view.fuelLog = function(fuelLog) {
	var logDate = new Date(fuelLog.logDate);
	return {
		logDate: function() {
			return logDate.getFullYear()+" "+logDate.getMonthShortName()+" "+logDate.getDate();
		},
		odometer: function() {
			return fuelLog.odometer ? fuelLog.odometer.toFixed(1) : fuelLog.odometer;
		}
	};
};

$(function() {
	var tmpl = solairis.ycl.template.text;

	tmpl.fuelLog = $("#fuel-log-template").html();
});
