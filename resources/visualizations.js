
// todos: filter in, filter out, color transition, sort by country, mouse over

// taken from http://colorbrewer2.org/
var colorSchemes = [
    ["#1a9641", "#a6d96a", "#ffffbf", "#fdae61", "#d7191c", "#FFFFFF"],
    ["#2c7bb6", "#abd9e9", "#ffffbf", "#fdae61", "#d7191c", "#FFFFFF"],
    ["#018571", "#80cdc1", "#f5f5f5", "#dfc27d", "#a6611a", "#FFFFFF"]];
var colorScheme = 0;

var vis = function (svgID, data, rows, doUpdate) {

    var pane = document.getElementById(svgID);
    var svg = d3.select("#"+svgID);

    var width = pane.getBoundingClientRect().width;
    var height = pane.getBoundingClientRect().height;

    if (typeof(rows)==='undefined') {
        rows = 5;
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
            .on("click", function(d){alert(d.indicator);});
    };

    var update = function() {
        
        var sortedData = data.slice(1, 35).sort(function(d1, d2) {return d1.value > d2.value});
        var circle = svg.selectAll("g")
            .data(sortedData, function(d,i) {return d.rank;});
        circle.enter().append("circle");
        
        circle.transition()
            .duration(1500)
            .delay(1000)
            .attr("transform", function(d,i){return circleCoords(d,i);});
            
        
        var exit = circle.exit()
            .transition()
            .attr("transform", function(d,i) { return "translate(" + (Math.floor(i/rows)*rectWidth+rectWidth/2) + "," + height + ")" })
            .attr("r", 0)
            .style("fill-opacity", 1e-6)
            .duration(1000)
            .remove();
 
    };

    init();
    update();
    
    var newColor = function (n) {
        var circle = svg.selectAll("g");

        colorScheme = n;
        
        circle.transition()
            .select("circle")
            .duration(1000)
            .attr("fill", color);
    };
    
    return {
        reset: init,
        newColor: newColor
    };

};

var main = new vis("visPane", getDataByCountry("Germany"), 5, true);

setTimeout(function () {main.newColor(1);}, 1000);
setTimeout(function () {main.newColor(2);}, 4000);
setTimeout(function () {main.reset();}, 7000);
