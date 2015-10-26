
var colorSchemes = [    // taken from http://colorbrewer2.org/
    ["#1a9641", "#a6d96a", "#ffffbf", "#fdae61", "#d7191c", "#DDDDDD"],
    ["#008837", "#a6dba0", "#f7f7f7", "#c2a5cf", "#7b3294", "#DDDDDD"],
    ["#2c7bb6", "#abd9e9", "#ffffbf", "#fdae61", "#d7191c", "#DDDDDD"],
    ["#018571", "#80cdc1", "#f5f5f5", "#dfc27d", "#a6611a", "#DDDDDD"],
    ["#4dac26", "#b8e186", "#f7f7f7", "#f1b6da", "#d01c8b", "#DDDDDD"]];

var colorScheme = 0;

var clickFunction = function (d,i) {
    alert(d.title + " --- dataindex "+d.index+", value "+d.value+", score "+d.score+", country "+d.country+", D3-index "+i);
};

var vis = function (svgID, data, rows) {

    var pane = document.getElementById(svgID);
    var svg = d3.select("#"+svgID);

    var width = pane.getBoundingClientRect().width;
    var height = pane.getBoundingClientRect().height;

    var lastSDGFilter = null;

    var filterSwitch = function (sdg) {

        if (lastSDGFilter === null) {
            lastSDGFilter = sdg;
            return true;
        }

        if(sdg === lastSDGFilter)
        {
            lastSDGFilter = null;
            return false;
        }
        else {
            lastSDGFilter = sdg;
            return true;
        }
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
        var sdgs = indicators[d.index]["sdg"];

        document.getElementById(svgID+'Infos').innerHTML=getInfos(d.country, d.index);

        d3.select(this)
            .attr("r", Math.floor(radius)+3);

        for(i=0; i<sdgs.length; i++) {
            $('#sdg' + sdgs[i]).css('color', 'red').css('font-weight', 'bold');
        };
    };

    var mouseoutFunction = function (d,i) {

        var radius = d3.select(this)
            .attr("r");
        var sdgs = indicators[d.index]["sdg"];

        document.getElementById(svgID+'Infos').innerHTML='';

        d3.select(this)
            .attr("r", Math.floor(radius)-3);

        for(i=0; i<sdgs.length; i++) {
            $('#sdg' + sdgs[i]).css('color', 'black').css('font-weight', 'normal');
        };
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

var dataGermany = getDataByCountry("Germany").slice().sort(function(a,b){return a.score<b.score;});
var visMain = new vis("visPane", dataGermany, 3);
visMain.show(dataGermany, 0);

var dataFrance = getDataByCountry("France");
var dataUK = getDataByCountry("UK");

var visGermany = new vis("visGermany", dataGermany.slice(), 2);
var visFrance = new vis("visFrance", dataFrance.slice(), 2);
var visUK = new vis("visUK", dataUK.slice(), 2);

var filterMainVisBySDG = function (sdg) {

    if (visMain.filterSwitch(sdg)) {
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

var sortedByOneCountry = null;

var sortCountryVisByCountry = function (country) {

    if (sortedByOneCountry === country) {
        visGermany.show(getDataByCountry('Germany').slice().sort(function(a,b){return a.score<b.score;}), 1000);
        visFrance.show(getDataByCountry('France').slice().sort(function(a,b){return a.score<b.score;}), 1000);
        visUK.show(getDataByCountry('UK').slice().sort(function(a,b){return a.score<b.score;}), 1000);
        sortedByOneCountry = null;
    }
    else {
        var dataSentinel = getDataByCountry(country).slice().sort(function(a,b){return a.score<b.score;});
        var dataSentinelArray = dataSentinel.map(function(x){return x.index;});

        var pred = function (a,b) {
            return dataSentinelArray.indexOf(a.index)>dataSentinelArray.indexOf(b.index);
        };

        visGermany.show(getDataByCountry('Germany').slice().sort(pred), 1000);
        visFrance.show(getDataByCountry('France').slice().sort(pred), 1000);
        visUK.show(getDataByCountry('UK').slice().sort(pred), 1000);

        sortedByOneCountry = country;
    }
};

sortCountryVisByCountry("Germany");

var changeAllColorSchemes = function (newColor, duration) {
    visMain.newColor(newColor, duration);
    visGermany.newColor(newColor, duration);
    visFrance.newColor(newColor, duration);
    visUK.newColor(newColor, duration);
};

var barChart = function () {
    $(function () {
        $('#highchartsPane').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Fruit Consumption'
            },
            xAxis: {
                categories: ['Apples', 'Bananas', 'Oranges']
            },
            yAxis: {
                title: {
                    text: 'Fruit eaten'
                }
            },
            plotOptions: {column: {colorByPoint: true}},
            series: [{
                name: 'Jane',
                data: [{y: 1, color: 'red'},
                       {y: 0, color: 'blue'},
                       {y: 4, color: 'green'}]
            }, {
                name: 'John',
                data: [5, 7, 3]
            }]
        });
    });
};

barChart();
