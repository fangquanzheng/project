// https://interestingengineering.com/computer-engineering-salaries-state-by-state
// https://github.com/d3/d3-scale-chromatic
var dataP = d3.json('us-states.json').then(function(data){
drawMap(data);
})

var drawMap = function(data){
	var screen={width:1000,height:1000};
	var svg = d3.select("#map")
						.attr("width", screen.width)
						.attr("height", screen.height);
	var path = d3.geoPath().projection(d3.geoAlbersUsa());
	var color = d3.scaleQuantize()
		.range(d3.schemeSet3);
	var features = data.features;
	color.domain([
		d3.min(features, function(d) { return d.properties.salary; }),
		d3.max(features, function(d) { return d.properties.salary; })
	]);
	svg.selectAll("path")
	.data(data.features)
	.enter()
	.append("path")
	.attr("d", path)
	.style("fill", function(d) {
		//Get data value
		var value = d.properties.salary;
		if (value) {
			//If value exists…
			return color(value);
		} else {
			//If value is undefined…
			return "#ccc";
		}
	});

}
