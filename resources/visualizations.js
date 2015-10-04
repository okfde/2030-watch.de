
var data = [{"indicator": "dataset-00", "rank": 0, "value": 2},{"indicator": "dataset-01", "rank": 1, "value": 2},{"indicator": "dataset-02", "rank": 2, "value": 3},{"indicator": "dataset-03", "rank": 3, "value": 3},{"indicator": "dataset-04", "rank": 4, "value": 4},{"indicator": "dataset-05", "rank": 5, "value": 1},{"indicator": "dataset-06", "rank": 6, "value": 1},{"indicator": "dataset-07", "rank": 7, "value": 3},{"indicator": "dataset-08", "rank": 8, "value": 5},{"indicator": "dataset-09", "rank": 9, "value": 3},{"indicator": "dataset-10", "rank": 10, "value": 4},{"indicator": "dataset-11", "rank": 11, "value": 4},{"indicator": "dataset-12", "rank": 12, "value": 3},{"indicator": "dataset-13", "rank": 13, "value": 1},{"indicator": "dataset-14", "rank": 14, "value": 3},{"indicator": "dataset-15", "rank": 15, "value": 5},{"indicator": "dataset-16", "rank": 16, "value": 2},{"indicator": "dataset-17", "rank": 17, "value": 5},{"indicator": "dataset-18", "rank": 18, "value": 3},{"indicator": "dataset-19", "rank": 19, "value": 5},{"indicator": "dataset-20", "rank": 20, "value": 4},{"indicator": "dataset-21", "rank": 21, "value": 1},{"indicator": "dataset-22", "rank": 22, "value": 4},{"indicator": "dataset-23", "rank": 23, "value": 5},{"indicator": "dataset-24", "rank": 24, "value": 2},{"indicator": "dataset-25", "rank": 25, "value": 2},{"indicator": "dataset-26", "rank": 26, "value": 3},{"indicator": "dataset-27", "rank": 27, "value": 3},{"indicator": "dataset-28", "rank": 28, "value": 2},{"indicator": "dataset-29", "rank": 29, "value": 2},{"indicator": "dataset-30", "rank": 30, "value": 5},{"indicator": "dataset-31", "rank": 31, "value": 3},{"indicator": "dataset-32", "rank": 32, "value": 4},{"indicator": "dataset-33", "rank": 33, "value": 3},{"indicator": "dataset-34", "rank": 34, "value": 5},{"indicator": "dataset-35", "rank": 35, "value": 2},{"indicator": "dataset-36", "rank": 36, "value": 1},{"indicator": "dataset-37", "rank": 37, "value": 3},{"indicator": "dataset-38", "rank": 38, "value": 1},{"indicator": "dataset-39", "rank": 39, "value": 5},{"indicator": "dataset-40", "rank": 40, "value": 1},{"indicator": "dataset-41", "rank": 41, "value": 1},{"indicator": "dataset-42", "rank": 42, "value": 1},{"indicator": "dataset-43", "rank": 43, "value": 1},{"indicator": "dataset-44", "rank": 44, "value": 1},{"indicator": "dataset-45", "rank": 45, "value": 5},{"indicator": "dataset-46", "rank": 46, "value": 1},{"indicator": "dataset-47", "rank": 47, "value": 2},{"indicator": "dataset-48", "rank": 48, "value": 2},{"indicator": "dataset-49", "rank": 49, "value": 1},{"indicator": "dataset-50", "rank": 50, "value": 4},{"indicator": "dataset-51", "rank": 51, "value": 4}];

// taken from http://colorbrewer2.org/
var colors = ["#d7191c", "#fdae61", "#ffffbf", "#a6d96a", "#1a9641"];

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
    .on("click", function(d){console.log(d.indicator);});

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
            .duration(1000)
            .delay(750)
            .attr("transform", function(d,i){return circleCoords(d,i);});

        circle.exit()
            .transition()
            .attr("transform", function(d,i) { return "translate(" + (Math.floor(i/rows)*rectWidth+rectWidth/2) + "," + height + ")" })
            .duration(500)
            .attr("r", 0)
            .style("fill-opacity", 1e-6)
            .remove();

        console.log('updated ' + data.length);
        update2();
        //chart.remove();
    }, 500);
};

update();
