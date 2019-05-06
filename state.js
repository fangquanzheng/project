var dataP = d3.json('us-states.json').then(function(data) {
    drawMap(data);
})
var dataW = d3.json('wage.json').then(function(data) {
    drawBar(data);
})
var drawMap = function(data) {
    var screen = {
        width: 850,
        height: 650
    };
    var svg = d3.select("#map")
        .attr("width", screen.width)
        .attr("height", screen.height);
    var path = d3.geoPath().projection(d3.geoAlbersUsa());
    var color = d3.scaleQuantize()
        .range(d3.schemePuBu[0, 9]);
    var features = data.features;
    color.domain([
        d3.min(features, function(d) {
            return d.properties.salary;
        }),
        d3.max(features, function(d) {
            return d.properties.salary;
        })
    ]);
    //TOOPTIP
    svg.selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("transform", "translate(-50,50)")
        .attr("d", path)
        .attr("stroke", "black")
        .on("mouseover", function(d) {
            d3.select("#tooltip")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .select("#value")
                .text(d.properties.salary)
            d3.select("#tooltip").classed("hidden", false);
        })
        .style("fill", function(d) {
            //GET VALUE
            var value = d.properties.salary;
            if (value) {
                return color(value);
            } else {
                return "#ccc";
            }
        })
        .on("mouseout", function(d, i) {
            d3.select("#tooltip").classed("hidden", true);
        })
        .attr("d", path);
}
var drawBar = function(data) {
    console.log(data);
    var screen = {
        width: 850,
        height: 650
    }
    var svg = d3.select("#bar")
        .attr("width", screen.width)
        .attr("height", screen.height);
    var barPadding = 5;
    var barWidth = (screen.width / dataset.length);
    var xScale = d3.scaleLinear()
        .domain([0, 11])
        .nice()
        .range([0, chartW]);
    var binMaker = d3.histogram()
        .domain(xScale.domain())
        .thresholds(xScale.ticks(11));
    var bins = binMaker(quizes);
    var max = d3.max(bins, function(d) {
        return d.length;
    })
    var yScale = d3.scaleLinear()
        .domain([0, max])
        .range([chartH, 0])
        .nice();
    var colors = d3.scaleOrdinal(d3.schemeCategory10);
    var plotLand = svg.append("g")
        .classed("plot", true)
    //.attr("transform","translate("+margin.left+","+margin.top+")");   
    var rect = plotLand.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("fill", function(d) {
            return colors(d);
        })
        .attr("x", function(d) {
            console.log(d["Total Population"]);
            return xScale(d.x0) + 50;
        })
        .attr("y", function(d) {
            return yScale(d.length) + 100;
        })
        .attr("width", chartW / 11)
        .attr("height", function(d) {
            return chartH - yScale(d.length);
        })
}
