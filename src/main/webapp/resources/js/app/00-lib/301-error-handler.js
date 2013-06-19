/*
 * Error Handling
 */

solairis.ycl.error.properties = {
	"Size.vehicle.name": "Vehicle name must be at least 1 character and no more than 100 characters",
	"required": "Field required"
};

solairis.ycl.error.resolve = function(error) {
	for(var i = 0; i < error.codes.length; i++) {
		var code = error.codes[i];
		if (solairis.ycl.error.properties[code]) {
			return solairis.ycl.error.properties[code];
		}
	}
	return error.defaultMessage;
};