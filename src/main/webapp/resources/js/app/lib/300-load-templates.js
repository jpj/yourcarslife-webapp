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
	var c = fuelLog.cost == null || fuelLog.cost === 0 ? null : fuelLog.cost.toString();
	var costFmt = c == null ? null : c.substr(0, c.length - 2) + "." + c.substr(c.length -2);
	return {
		logDate: function() {
			return logDate.getFullYear()+" "+logDate.getMonthShortName()+" "+logDate.getDate();
		},
		odometer: function() {
			return fuelLog.odometer ? fuelLog.odometer.toFixed(1) : fuelLog.odometer;
		},
		fuel: function() {
			return fuelLog.fuel ? fuelLog.fuel.toFixed(3) : fuelLog.fuel;
		},
		octane: fuelLog.octane,
		cost: function() {
			return costFmt;
		},
		costPerFuel: function() {
			return fuelLog.cost ? parseFloat((costFmt)/fuelLog.fuel).toFixed(3) : "-"
		},
		missedFillup: fuelLog.missedFillup
	};
};

$(function() {
	var tmpl = solairis.ycl.template.text;

	tmpl.fuelLog = $("#fuel-log-template").html();
});
