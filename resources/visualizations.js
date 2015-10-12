
var colorSchemes = [    // taken from http://colorbrewer2.org/
    ["#1a9641", "#a6d96a", "#ffffbf", "#fdae61", "#d7191c", "#FFFFFF"],
    ["#2c7bb6", "#abd9e9", "#ffffbf", "#fdae61", "#d7191c", "#FFFFFF"],
    ["#018571", "#80cdc1", "#f5f5f5", "#dfc27d", "#a6611a", "#FFFFFF"]];

var colorScheme = 0;

var clickFunction = function (d,i) {
    alert(d.title + " --- dataindex "+d.index+", value "+d.value+", score "+d.score+", country "+d.country+", D3-index "+i);
};

var vis = function (svgID, data, rows) {

    var pane = document.getElementById(svgID);
    var svg = d3.select("#"+svgID);

    var width = pane.getBoundingClientRect().width;
    var height = pane.getBoundingClientRect().height;

    var filtered = false;

    var filterSwitch = function () {
        filtered = !filtered;
        return filtered;
    };

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

    var mouseoverFunction = function (d,i) {

        var radius = d3.select(this)
            .attr("r");
        document.getElementById(svgID+'Infos').innerHTML=getInfos(d.country, d.index);

        d3.select(this)
            .attr("r", Math.floor(radius)+3);
    };

    var mouseoutFunction = function (d,i) {

        var radius = d3.select(this)
            .attr("r");

        document.getElementById(svgID+'Infos').innerHTML='';

        d3.select(this)
            .attr("r", Math.floor(radius)-3);
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
        newColor: newColor,
        filterSwitch: filterSwitch
    };

};

var dataGermany = getDataByCountry("Germany").sort(function(a,b){return a.score<b.score;});
var visMain = new vis("visPane", dataGermany, 2);
visMain.show(dataGermany, 1000);
// setTimeout(function(){
//     var sortedDataGermany = dataGermany.slice().sort(function(a,b){return a.score<b.score;});
//     visMain.show(sortedDataGermany,1000)},
//            1000);
// setTimeout(function(){
//     visMain.show(dataGermany, 1000);
// }, 3000);
// setTimeout(function(){
//     visMain.newColor(2,1000);
// }, 5000);
// setTimeout(function(){
//     visMain.show({},1000);
// }, 7000);
// setTimeout(function(){
//     visMain.show(dataGermany,1000);
// }, 9000);

var dataFrance = getDataByCountry("France");
var dataUK = getDataByCountry("UK");

var visGermany = new vis("visGermany", dataGermany.slice(), 2);
var visFrance = new vis("visFrance", dataFrance.slice(), 2);
var visUK = new vis("visUK", dataUK.slice(), 2);

var filterMainVisBySDG = function (sdg) {

    if (visMain.filterSwitch()) {
        var copy = dataGermany.slice();
        var pred = function (object) {
            return indicators[object.index]["sdg"].indexOf(sdg)>-1;
        };
        visMain.show(copy.filter(pred), 1000);
    }
    else {
        visMain.show(dataGermany, 1000);
    }
};

var sortCountryVisByCountry = function (country) {
    var dataSentinel = getDataByCountry(country).sort(function(a,b){return a.score>b.score;});
    var dataSentinelArray = dataSentinel.map(function(x){return x.index;});
    console.log(dataSentinel);
    console.log(dataSentinelArray);
    var pred = function (a,b) {
        return dataSentinelArray.indexOf(a.index)<dataSentinelArray.indexOf(b.index);
    };
    visGermany.show(dataGermany.slice().sort(pred), 1000);
    visFrance.show(dataFrance.slice().sort(pred), 1000);
    visUK.show(dataUK.slice().sort(pred), 1000);
};

sortCountryVisByCountry("Germany");
