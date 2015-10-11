
// todos: filter in, filter out, color transition, sort by country, mouse over

// taken from http://colorbrewer2.org/
var colorSchemes = [
    ["#1a9641", "#a6d96a", "#ffffbf", "#fdae61", "#d7191c", "#FFFFFF"],
    ["#2c7bb6", "#abd9e9", "#ffffbf", "#fdae61", "#d7191c", "#FFFFFF"],
    ["#018571", "#80cdc1", "#f5f5f5", "#dfc27d", "#a6611a", "#FFFFFF"]];
var colorScheme = 0;

var clickFunction = function (d,i) {
    alert(d.title + " --- dataindex "+d.index+", value "+d.value+", score "+d.score+", country "+d.country+", D3-index "+i);
};

var mouseoverFunction = function (d,i) {

    var radius = d3.select(this)
        .attr("r");

    document.getElementById('visPaneInfos').innerHTML=getInfos(d.country, d.index);

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

    var show = function (newData, duration) {
        
        var groups = svg.selectAll("g")
            .data(newData, function(d,i) {return d.index;});

        var cont = groups.enter().append("g");
        
        cont.append("title").text(function(d){return d.title;});

        cont.append("circle")
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

var dataGermany = getDataByCountry("Germany");
var main = new vis("visPane", dataGermany, 2);
main.show(dataGermany, 0);
setTimeout(function(){
    var sortedDataGermany = dataGermany.slice().sort(function(a,b){return a.score<b.score;});
    main.show(sortedDataGermany,1000)},
           1000);
setTimeout(function(){
    main.show(dataGermany, 1000);
}, 3000);
