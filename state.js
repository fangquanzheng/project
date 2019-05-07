var dataP = d3.json('us-states.json').then(function(data) {
    drawMap(data);
    drawHappy(data);
})
var dataW = d3.json('wage.json').then(function(data) {
    drawBar(data);
})
var drawMap = function(data) {
    var screen = {
        width: 1000,
        height: 650
    };
    var svg = d3.select("#map")
        .attr("width", screen.width)
        .attr("height", screen.height);
    var path = d3.geoPath().projection(d3.geoAlbersUsa());
    var color = d3.scaleOrdinal().domain([60000, 130000]).range(["#ffbd6e", "#ffb761", "#ffb154", "#feaa47", "#fea439", "#fe9f30", "#fe9927", "#fe941c", "#fe8f16", "#fe890f", "#ff8407", "#ff7e00"]);
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
        .attr("transform", "translate(50,50)")
        .attr("d", path)
        .attr("stroke", "white")
        .on("mouseover", function(d) {

            d3.select("#tooltip")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .select("#value")
                .text("State: " + d.properties.name + " Salary : " + d.properties.salary)
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
    var w = 140,
        h = 300;

    var lowColor = '#ffbd6e'
    var highColor = '#ff7e00'
    var key = d3.select("svg")
        .append("g")
        .attr("id","legend1")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "legend");

    var legend = key.append("defs")
        .append("g:linearGradient")
        .attr("id", "gradient1")
        .attr("x1", "100%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    legend.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", highColor)
        .attr("stop-opacity", 0.9);

    legend.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", lowColor)
        .attr("stop-opacity", 0.9);

    key.append("rect")
        .attr("width", w - 100)
        .attr("height", h)
        .style("fill", "url(#gradient1)")
        .attr("transform", "translate(20,25)");

    var y = d3.scaleLinear()
        .range([h, 0])
        .domain([60000, 130000]);

    var yAxis = d3.axisRight(y);

    key.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(60,25)")
        .attr("opacity", 0.7)
        .call(yAxis)
}
var drawHappy = function(data) {
    var screen = {
        width: 1000,
        height: 650
    };
    var svg = d3.select("#happy")
        .attr("width", screen.width)
        .attr("height", screen.height);
    var path = d3.geoPath().projection(d3.geoAlbersUsa());
    var color = d3.scaleOrdinal().domain([30, 70]).range(["#ddc4fe", "#d6bdfe","#cfb6fe","#c7affe","#bea9fe","#b099f4","#a189ea","#937ae0","#7c5ec8", "#6642b1", "#502699", "#3a0082"]);
    var features = data.features;
    color.domain([
        d3.min(features, function(d) {
            return d.properties.happy;
        }),
        d3.max(features, function(d) {
            return d.properties.happy;
        })
    ]);
    //TOOPTIP
    svg.selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("transform", "translate(50,50)")
        .attr("d", path)
        .attr("stroke", "white")
        .on("mouseover", function(d) {

            d3.select("#tooltip")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .select("#value")
                .text("State: " + d.properties.name + " Happinese Index: " + d.properties.happy)
            d3.select("#tooltip").classed("hidden", false);
        })
        .style("fill", function(d) {
            //GET VALUE
            var index = d.properties.happy;
            if (index) {
                return color(index);
            } else {
                return "#ccc";
            }
        })
        .on("mouseout", function(d, i) {
            d3.select("#tooltip").classed("hidden", true);
        })
        .attr("d", path);
    var w = 140,
        h = 300;

    var lowColor = "#ddc4fe"
    var highColor = "#3a0082"
    var key = d3.select("#happy")
        .append("g")
        .attr("id","legend2")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "legend");

    var legend = key.append("defs")
        .append("g:linearGradient")
        .attr("id", "gradient2")
        .attr("x1", "100%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    legend.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", highColor)
        .attr("stop-opacity", 1);

    legend.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", lowColor)
        .attr("stop-opacity", 1);

    key.append("rect")
        .attr("width", w - 100)
        .attr("height", h)
        .style("fill", "url(#gradient2)")
        .attr("transform", "translate(20,25)");

    var y = d3.scaleLinear()
        .range([h, 0])
        .domain([30, 70]);

    var yAxis = d3.axisRight(y);

    key.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(60,25)")
        .attr("opacity", 0.7)
        .call(yAxis)
}
isSalaryMap = 1;
var changeGeoMap = function() {
    if (isSalaryMap == 1) {
        var svg = d3.select("#map")
            .attr("display", "none");
        var svg = d3.select("#happy")
            .attr("display", "block");
              d3.select("#legend2")
            .attr("display", "block");
             d3.select("#gradient2")
            .attr("display", "block");
        var svg = d3.select("#bar")
            .attr("display", "none");
        isSalaryMap = 2;
    } else if (isSalaryMap == 2) {
        var svg = d3.select("#map")
            .attr("display", "none");
        var svg = d3.select("#happy")
            .attr("display", "none");
        var svg = d3.select("#bar")
            .attr("display", "block");
        isSalaryMap = 3;
    } else {
        var svg = d3.select("#map")
            .attr("display", "block");
            d3.select("#legend1")
            .attr("display", "block");
             d3.select("#gradient1")
            .attr("display", "block");
        var svg = d3.select("#happy")
            .attr("display", "none");
        var svg = d3.select("#bar")
            .attr("display", "none");
        isSalaryMap = 1
    }
}
var drawBar = function(data) {
    console.log(data);
    // var screen = {
    //     width: 850,
    //     height: 650
    // }
    var margin = {
        top: 20,
        bottom: 20,
        left: 30,
        right: 80,
    }
    var width = 850;
    var height = 650;
    var chartW = width - margin.left - margin.right;
    var chartH = height - margin.top - margin.bottom;
    var padding = 5;
    var svg = d3.select("#bar")
        .attr("width", width)
        .attr("height", height);
    var barPadding = 5;
    var barWidth = (width / data.length);
    var xScale = d3.scaleLinear()
        .domain([0, data.length])
        .nice()
        .range([0, chartW]);
    var binMaker = d3.histogram()
        .domain(xScale.domain())
        .thresholds(xScale.ticks(data.length));
    var populations = data.map(function(d) {
        return d["Total Population"];
    })
    var bins = binMaker(populations);
    var max = d3.max(populations);
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
        .attr("x", function(d, i) {
            //console.log(d["Total Population"]);
            return i * (width / data.length);
        })
        .attr("y", function(d) {
            return yScale(d["Total Population"]);
        })
        .attr("width", chartW / data.length)
        .attr("height", function(d) {
            console.log(yScale(d["Total Population"]));
            return chartH - yScale(d["Total Population"]);
        })
}
