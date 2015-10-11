
// todos: filter in, filter out, color transition, sort by country, mouse over

// taken from http://colorbrewer2.org/
var colorSchemes = [
    ["#1a9641", "#a6d96a", "#ffffbf", "#fdae61", "#d7191c", "#FFFFFF"],
    ["#2c7bb6", "#abd9e9", "#ffffbf", "#fdae61", "#d7191c", "#FFFFFF"],
    ["#018571", "#80cdc1", "#f5f5f5", "#dfc27d", "#a6611a", "#FFFFFF"]];
var colorScheme = 0;

var clickFunction = function (d,i) {
    alert("dataindex "+d.index+", value "+d.value+", score "+d.score+", country "+d.country+", D3-index "+i);
};

var mouseoverFunction = function (d,i) {

    var radius = d3.select(this)
        .attr("r");

    document.getElementById('visPaneInfos').innerHTML=getInfos("Germany", d.index);

    d3.select(this)
        .attr("r", Math.floor(radius)+3);
};

var mouseoutFunction = function (d,i) {
    var radius = d3.select(this)
        .attr("r");

    document.getElementById('visPaneInfos').innerHTML='';

    d3.select(this)
        .attr("r", Math.floor(radius)-3);
};

var vis = function (svgID, data, rows) {

    var pane = document.getElementById(svgID);
    var svg = d3.select("#"+svgID);

    var width = pane.getBoundingClientRect().width;
    var height = pane.getBoundingClientRect().height;

    if (typeof(rows)==='undefined') {
        rows = 2;
    }

    var cols = Math.floor(data.length/rows)+1;
    var rectWidth = width/cols;
    var rectHeight = height/rows;
    var circleRadius = Math.min(rectWidth, rectHeight)/2-3;

    var color = function(data) {
        return colorSchemes[colorScheme][data.score-1];
    };

    var circleCoords = function(d, i){
        return "translate(" + (Math.floor(i/rows)*rectWidth+rectWidth/2) + "," + ((i%rows)*rectHeight+rectHeight/2) + ")";
    };

    var init = function () {

        var chart = svg.selectAll("g")
            .data(data, function(d,i) {return i;})
            .enter().append("g")
            .attr("transform", function(d,i){return circleCoords(d,i);});

        chart.append("circle")
            .attr("r", circleRadius)
            .attr("fill", function(d,i){return color(d);})
            .on("mouseover", mouseoverFunction)
            .on("mouseout", mouseoutFunction)
            .on("click", clickFunction);
    };

    var show = function (newData, duration) {

        var groups = svg.selectAll("g")
            .data(newData, function(d,i) {return d.index;});

        groups.enter().append("g")
            .append("circle")
            .attr("r", circleRadius)
            .attr("fill", function(d,i){return color(d);})
            .on("mouseover", mouseoverFunction)
           .on("mouseout", mouseoutFunction)
            .on("click", clickFunction);

        groups.transition()
            .duration(duration)
            .attr("transform", function(d,i){return circleCoords(d,i);});

        var exit = groups.exit()
            .transition()
            .attr("transform", function(d,i) { return "translate(" + (Math.floor(i/rows)*rectWidth+rectWidth/2) + "," + height + ")" })
            .attr("r", 0)
            .style("fill-opacity", 1e-6)
            .duration(duration)
            .remove();
    };

    var newColor = function (n, duration) {

        var groups = svg.selectAll("g");

        colorScheme = n;

        groups.transition()
            .select("circle")
            .duration(duration)
            .attr("fill", color);
    };

    return {
        show: show,
        newColor: newColor
    };

};

var testData = [{index:0, value: 10, score:1, country: "FAKE"},
                {index:1, value: 20, score:2, country: "FAKE"},
                {index:2, value: 30, score:3, country: "FAKE"},
                {index:3, value: 40, score:4, country: "FAKE"}];

var filteredData = [{index:0, value: 10, score:1, country: "FAKE"},
                    {index:3, value: 40, score:4, country: "FAKE"}];

var sortedData = [{index:3, value: 40, score:4, country: "FAKE"},
                  {index:2, value: 30, score:3, country: "FAKE"},
                  {index:1, value: 20, score:2, country: "FAKE"},
                  {index:0, value: 10, score:1, country: "FAKE"}];

var emptyData = [];

var main = new vis("visPane", testData, 5);
setTimeout(function () {main.show(testData, 0);}, 0100);

setTimeout(function () {main.newColor(2, 1000);}, 1000);
setTimeout(function () {main.newColor(1, 1000);}, 3000);

setTimeout(function () {main.show(filteredData, 1000);}, 7000);
setTimeout(function () {main.show(testData, 1000);}, 8500);
setTimeout(function () {main.show(filteredData, 1000);}, 9500);
setTimeout(function () {main.show(sortedData, 1000);}, 11000);
setTimeout(function () {main.show(testData, 1000);}, 13000);
setTimeout(function () {main.show(emptyData, 1000);}, 15000);
setTimeout(function () {main.show(testData, 2000);}, 17000);

setTimeout(function () {main.newColor(0, 1000);}, 20000);
