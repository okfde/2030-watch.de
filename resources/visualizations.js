

// taken from http://colorbrewer2.org/
var colors = ["#d7191c", "#fdae61", "#ffffbf", "#a6d96a", "#1a9641", "#FFFFFF"];

var pane = document.getElementById("vis-pane");
var width = pane.getBoundingClientRect().width;
var height = pane.getBoundingClientRect().height;

var rows = 5;
var cols = Math.floor(data.length/rows)+1;
var rectWidth = width/cols;
var rectHeight = height/rows;
var circleRadius = Math.min(rectWidth, rectHeight)/2-3;

var color = function(data) {
    return colors[data.value-1];
};

var circleCoords = function(d, i){
    return "translate(" + (Math.floor(i/rows)*rectWidth+rectWidth/2) + "," + ((i%rows)*rectHeight+rectHeight/2) + ")";
};

var svg = d3.select("#vis-pane");
var chart = svg.selectAll("g")
    .data(data, function(d,i) {return d.rank;})
    .enter().append("g")
    .attr("transform", function(d,i){return circleCoords(d,i);});

chart.append("circle")
    .attr("r", circleRadius)
    .attr("fill", function(d,i){return color(d);})
    .on("click", function(d){alert(d.indicator);});

var update2 = function() {

    setTimeout(function() {

        var circle = svg.selectAll("g")
            .data(data, function(d,i) {return d.rank;});
        circle.enter().append("g");

        circle.transition()
            .duration(1000)
            .delay(750)
            .attr("transform", function(d,i){return circleCoords(d,i);})
            .style("fill-opacity", 1);

        circle.exit()
            .transition()
            .attr("transform", function(d,i) { return "translate(" + (Math.floor(i/rows)*rectWidth+rectWidth/2) + "," + height + ")" })
            .duration(500)
            .attr("r", 0)
            .style("fill-opacity", 1e-6)
            .remove();

        console.log('updated2 ' + data.length);
        //chart.remove();
    }, 3000);
};

var update = function() {

    setTimeout(function() {

        var sortedData = data.slice(3, 35).sort(function(d1, d2) {return d1.value > d2.value});
        var circle = svg.selectAll("g")
            .data(sortedData, function(d,i) {return d.rank;});
        circle.enter().append("circle");

        circle.transition()
            .duration(1500)
            .delay(1000)
            .attr("transform", function(d,i){return circleCoords(d,i);});

        circle.exit()
            .transition()
            .attr("transform", function(d,i) { return "translate(" + (Math.floor(i/rows)*rectWidth+rectWidth/2) + "," + height + ")" })
            .duration(1000)
            .attr("r", 0)
            .style("fill-opacity", 1e-6)
            .remove();

        console.log('updated ' + data.length);
        update2();
        //chart.remove();
    }, 500);
};

update();
