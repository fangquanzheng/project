// https://github.com/d3/d3-scale-chromatic
// https://www.indeed.com/salaries/Computer-Science-Salaries
var dataP = d3.json('us-states.json').then(function(data){
drawMap(data);
})

var drawMap = function(data){
	var screen = {width:850,height:850};
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
	 //for tooltip 

    var projection = d3.geo.mercator()
        .scale(153)
        .translate([width/2,height/1.5])
        .rotate([rotated,0,0]);    
var offsetL = document.getElementById('map').offsetLeft+10;
    var offsetT = document.getElementById('map').offsetTop+10;

    var path = d3.geo.path()
        .projection(projection);

    var tooltip = d3.select("#map")
         .append("div")
         .attr("class", "tooltip hidden");	
    svg.selectAll("path")
	.data(data.features)
	.enter()
	.append("path")
	.attr("d", path)
	.style("fill", function(d) {
		//Get data value
		var value = d.properties.salary;
		if (value) {
			return color(value);
		} else {
			return "#ccc";
		}
	});

    var g = svg.append("g");
g.append("g")
          .attr("class", "boundary state hidden")
        .selectAll("boundary")
          .data(topojson.feature(world, world.objects.states).features)
          .enter().append("path")
          .attr("name", function(d) { return d.properties.name;})
          .attr("id", function(d) { return d.id;})
          .on('click', selected)
          .on("mousemove", showTooltip)
          .on("mouseout",  function(d,i) {
              tooltip.classed("hidden", true);
           })
          .attr("d", path);

      states = d3.selectAll('.state');
    });
    function showTooltip(d) {
      label = d.properties.name;
      var mouse = d3.mouse(svg.node())
        .map( function(d) { return parseInt(d); } );
      tooltip.classed("hidden", false)
        .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
        .html(label);
    }
}
