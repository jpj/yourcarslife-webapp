solairis.ycl.view.FuelLogGraph = Backbone.View.extend({
	initialize: function() {
		this.collection.on("all", this.render, this);
		
		$.jqplot.config.enablePlugins = true;
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
		
		alert(JSON.stringify(fuelEconomy));

		this.$el.empty(); // Clear graph

		$.jqplot(this.$el.attr("id"), [fuelEconomy], {
//			//title: "My Graph",
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
});