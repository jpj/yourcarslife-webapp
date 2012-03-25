solairis.ycl.view.FuelLogGraph = Backbone.View.extend({
	initialize: function() {
		var viewContext = this;
		
		this.collection.on("all", this.render, this);
		
		$.jqplot.config.enablePlugins = true;
		
		// Re-render glaph on resize
		$(window).resize(function() {
			viewContext.render();
		});
	},
	render: function() {
		
		var viewContext = this;

		var fuelEconomy = [];

		this.collection.each(function(fuelLog) {
			
			var index = viewContext.collection.indexOf(fuelLog);
			var nextModel = viewContext.collection.at(index + 1);
			
			if (nextModel && nextModel.get("odometer") && !fuelLog.get("missedFillup")) {
				var logDate = new Date(fuelLog.get("logDate"));
				fuelEconomy.push([logDate, parseFloat(((fuelLog.get("odometer")-nextModel.get("odometer")) / fuelLog.get("fuel")).toFixed(2))]);
			}
		});

		this.$el.empty(); // Clear graph

		if (fuelEconomy.length) {
			$.jqplot(this.$el.attr("id"), [fuelEconomy], {
				//title: "My Graph",
				grid: {
					borderWidth: 1,
					shadow: false
				},
				series:[
					{
						lineWidth: 1,
						color: "#6EAB75",
						shadow: false
					}
				],
				axes:{
					xaxis: {
						renderer: $.jqplot.DateAxisRenderer,
						rendererOptions: {tickRenderer:$.jqplot.CanvasAxisTickRenderer},
						tickOptions: {
							formatString: '%Y %b %#d'
						}
					},
					yaxis: {
						tickOptions: {
							formatString: '%.2f'
						}
						, min: 0
					}
				},
				highlighter: {
					sizeAdjust: 7.5
				},
				cursor: {
					tooltipLocation: 'sw',
					show: true
				}
			});
		}
	}
});