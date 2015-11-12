
var colorSchemes = [    // taken from http://colorbrewer2.org/
    ["#2c7bb6", "#abd9e9", "#ffffbf", "#fdae61", "#d7191c", "#DDDDDD"],
    ["#0571b0", "#92c5de", "#f7f7f7", "#f4a582", "#ca0020", "#DDDDDD"],
    ["#04B404", "#2EFE2E", "#FFFF00", "#FF8000", "#FF4000", "#F2F2F2"],
    ["#1a9641", "#a6d96a", "#ffffbf", "#fdae61", "#d7191c", "#DDDDDD"],
    ["#008837", "#a6dba0", "#f7f7f7", "#c2a5cf", "#7b3294", "#DDDDDD"],
    ["#018571", "#80cdc1", "#f5f5f5", "#dfc27d", "#a6611a", "#DDDDDD"],
    ["#4dac26", "#b8e186", "#f7f7f7", "#f1b6da", "#d01c8b", "#DDDDDD"]
];

var colorScheme = 0;

var clickFunction = function (d,i) {
    // alert(d.title + " --- dataindex "+d.index+", value "+d.value+", score "+d.score+", country "+d.country+", D3-index "+i);
    barChart(d.index);
    scrollToAnchor("Einzelindikatoren");
};

var unfilter = function () {
    var mainVisFilteredBySDG = false;
    setSDGOpacity(20, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]);
    setResponsibilityColor();
    setStatusColor();
    filterMainVisBySDG();
    filterMainVisByResponsibility();
    filterMainVisByStatus();
};

var mainVisFilteredBySDG = false;
var mainVisFilteredByResponsibility = false;
var mainVisFilteredByStatus = false;

var setSDGOpacity = function (percentage, sdgs) {

    if (sdgs === undefined) {
        sdgs = [];
    }
    for(j=1; j<=17; j++) {
        if ( sdgs.indexOf(j) >= 0 ) {
            $('#sdg' + j).css('filter', 'opacity(' + percentage + '%)');
            $('#sdg' + j).css('webkitFilter', 'opacity(' + percentage + '%)');
        }
    }
}

var SDGsMouseOut = function (sdg) {
    if (sdg != mainVisFilteredBySDG)
        setSDGOpacity(20, [sdg]);
};

var SDGsMouseOver = function (sdg) {
    setSDGOpacity(100, [sdg]);
};

var SDGsClick = function (sdg) {
    filterMainVisBySDG(sdg);
    var set = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
    set.splice(sdg-1,1);
    setSDGOpacity(20, set);
};

var setResponsibilityColor = function (color, responsibilities) {

    if (responsibilities === undefined) {
        responsibilities = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    }

    if (color === undefined)
        color = 'black';

    for(j=1; j<=15; j++) {
        if ( responsibilities.indexOf(j) >= 0 ) {
            $('#responsibility' + j).css('color', color);
        }
    }
}

var responsibilityMouseOut = function (responsibility) {
    if (mainVisFilteredByResponsibility) {
        var toBlack =  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        toBlack.splice(mainVisFilteredByResponsibility-1,1);
        setResponsibilityColor('black',toBlack);
    }
    else
        setResponsibilityColor();
};

var responsibilityMouseOver = function (responsibility) {
    $('#responsibility' + responsibility).css('color', 'red');
};

var responsibilityClick = function (responsibility) {

    filterMainVisByResponsibility(responsibility);
    var toBlack =  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    toBlack.splice(mainVisFilteredByResponsibility-1,1);
    setResponsibilityColor('black',toBlack);
};

var setStatusColor = function (color, status) {
    if (status === undefined) {
        status = [1,2];
    }

    if (color === undefined)
        color = 'black';

    for(j=1; j<=2; j++) {
        if ( status.indexOf(j) >= 0 ) {
            $('#status' + j).css('color', color);
        }
    }
};

var statusMouseOut = function (status) {
    if (mainVisFilteredByStatus) {
        var toBlack =  [1,2];
        toBlack.splice(mainVisFilteredByStatus-1,1);
        setStatusColor('black',toBlack);
    }
    else
        setStatusColor();
};

var statusMouseOver = function (status) {
    $('#status' + status).css('color', 'red');
};

var statusClick = function (status) {

    filterMainVisByStatus(status);
    var toBlack =  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    toBlack.splice(mainVisFilteredByStatus-1,1);
    setStatusColor('black',toBlack);
};

var vis = function (svgID, data, rows) {

    var pane = document.getElementById(svgID);
    var svg = d3.select("#"+svgID);

    var width = pane.getBoundingClientRect().width;
    var height = pane.getBoundingClientRect().height;

    var lastSDGFilter = null;
    var lastResponsibilityFilter = null;
    var lastStatusFilter = null;

    var filterSwitchSDG = function (sdg) {

        if (lastSDGFilter === null) {
            lastSDGFilter = sdg;
            mainVisFilteredBySDG = sdg;
            return true;
        }

        if(sdg === lastSDGFilter)
        {
            lastSDGFilter = null;
            mainVisFilteredBySDG = false;
            return false;
        }
        else {
            lastSDGFilter = sdg;
            mainVisFilteredBySDG = sdg;
            return true;
        }
    };

    var filterSwitchResponsibility = function (responsibility) {

        if (lastResponsibilityFilter === null) {
            lastResponsibilityFilter = responsibility;
            mainVisFilteredByResponsibility = responsibility;
            return true;
        }

        if(responsibility === lastResponsibilityFilter)
        {
            lastResponsibilityFilter = null;
            mainVisFilteredByResponsibility = false;
            return false;
        }
        else {
            lastResponsibilityFilter = responsibility;
            mainVisFilteredByResponsibility = responsibility;
            return true;
        }
    };

    var filterSwitchStatus = function (status) {
        if (lastStatusFilter === null) {
            lastStatusFilter = status;
            mainVisFilteredByStatus = status;
            return true;
        }

        if(status === lastStatusFilter)
        {
            lastStatusFilter = null;
            mainVisFilteredByStatus = false;
            return false;
        }
        else {
            lastStatusFilter = status;
            mainVisFilteredByStatus = status;
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

        setSDGOpacity(100, indicators[d.index]["sdg"]);

        var respIndices = [];
        var respCollection = indicators[d.index]["ministerial responsibility"];
        for (var i in respCollection) {
            respIndices.push(responsibilitiesShort.indexOf(respCollection[i]));
        }
        setResponsibilityColor('red', respIndices.map(function (i) {return i+1;}));

        var status = indicators[d.index]["indicator source"];
        if (status === "OKF")
            setStatusColor('red', [2]);
        else
            setStatusColor('red', [1]);
    };

    var mouseoutFunction = function (d,i) {

        var radius = d3.select(this)
            .attr("r");
        var sdgs = indicators[d.index]["sdg"];

        document.getElementById(svgID+'Infos').innerHTML='';

        d3.select(this)
            .attr("r", Math.floor(radius)-3);

        var set =  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
        if (mainVisFilteredBySDG)
            set.splice(mainVisFilteredBySDG-1,1);
        setSDGOpacity(20, set);

        set = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        if (mainVisFilteredByResponsibility)
            set.splice(mainVisFilteredByResponsibility-1,1);
        setResponsibilityColor('black', set);

        set = [1,2];
        set.splice(mainVisFilteredByStatus-1,1);
        setStatusColor('black', set);

    };


    var show = function (newData, duration) {

        var groups = svg.selectAll("g")
            .data(newData, function(d,i) {return d.index;});

        var cont = groups.enter().append("g");

        cont.append("title").text(function(d){return d.title;});

        cont.append("circle")
            .attr("r", circleRadius)
            .attr("fill", function(d,i){return color(d);})
            .style("cursor", "pointer")
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
        filterSwitchSDG: filterSwitchSDG,
        filterSwitchResponsibility: filterSwitchResponsibility,
        filterSwitchStatus: filterSwitchStatus
    };

};

var dataGermany = getDataByCountry("Germany").slice().sort(function(a,b){return b.score - a.score;});
var visMain = new vis("visPane", dataGermany, 5);
visMain.show(dataGermany, 0);

var filterMainVisBySDG = function (sdg) {

    if (visMain.filterSwitchSDG(sdg) && sdg != undefined) {
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

var filterMainVisByResponsibility = function (responsibility) {

    if (visMain.filterSwitchResponsibility(responsibility) && responsibility != undefined) {
        var copy = dataGermany.slice();
        var pred = function (object) {
            return indicators[object.index]["ministerial responsibility"].indexOf(responsibilitiesShort[responsibility-1])>-1;
        };
        visMain.show(copy.filter(pred), 1000);
    }
    else {
        visMain.show(dataGermany, 1000);
    }
};

var filterMainVisByStatus = function (status) {
    if (visMain.filterSwitchStatus(status) && status != undefined) {
        var copy = dataGermany.slice();
        var pred = function (object) {
            if (status === 1)
                return indicators[object.index]["indicator source"] === "OKF";
            else
                return indicators[object.index]["indicator source"] != "OKF";
        };
        visMain.show(copy.filter(pred), 1000);
    }
    else {
        visMain.show(dataGermany, 1000);
    }
};

var country1 = 'France';
var country2 = 'UK';
var dataCountry1 = getDataByCountry("France");
var dataCountry2 = getDataByCountry("UK");
var visGermany = new vis("visGermany", dataGermany.slice(), 3);
var visCountry1 = new vis("visCountry1", dataCountry1.slice(), 3);
var visCountry2 = new vis("visCountry2", dataCountry2.slice(), 3);

var sortedByOneCountry = "Germany";

var sortCountryVisByCountry = function (country) {

    if (country === "country1")
        country = country1;
    if (country === "country2")
        country = country2;

    if (sortedByOneCountry === country) {
        visGermany.show(getDataByCountry('Germany').slice().sort(function(a,b){return b.score - a.score;}), 1000);
        visCountry1.show(getDataByCountry(country1).slice().sort(function(a,b){return b.score - a.score;}), 1000);
        visCountry2.show(getDataByCountry(country2).slice().sort(function(a,b){return b.score - a.score;}), 1000);
        sortedByOneCountry = null;
    }
    else {
        var dataSentinel = getDataByCountry(country).slice().sort(function(a,b){return b.score - a.score;});
        var dataSentinelArray = dataSentinel.map(function(x){return x.index;});

        var pred = function (a,b) {
            return dataSentinelArray.indexOf(a.index) - dataSentinelArray.indexOf(b.index);
        };

        visGermany.show(getDataByCountry('Germany').slice().sort(pred), 1000);
        visCountry1.show(getDataByCountry(country1).slice().sort(pred), 1000);
        visCountry2.show(getDataByCountry(country2).slice().sort(pred), 1000);

        sortedByOneCountry = country;
    }
};

sortCountryVisByCountry("Germany");

var changeCountry = function (number) {

    var element = document.getElementById("comparisonCountry" + number);
    var newCountry = element.options[element.selectedIndex].value;

    document.getElementById('country' + number).innerHTML = translate(newCountry);

    if ( number === 1) {
        country1 = newCountry;
        document.getElementById('visCountry1').innerHTML = '';
        dataCountry1 = getDataByCountry(newCountry).slice().sort(function(a,b){return b.score - a.score;});
        visCountry1 = new vis("visCountry1", dataCountry1.slice(), 3);
        visCountry1.show(dataCountry1, 1000);
    }

    if ( number === 2) {
        country2 = newCountry;
        document.getElementById('visCountry2').innerHTML = '';
        dataCountry2 = getDataByCountry(newCountry).slice().sort(function(a,b){return b.score - a.score;});
        visCountry2 = new vis("visCountry2", dataCountry2.slice(), 3);
        visCountry2.show(dataCountry2, 1000);
    }

    sortCountryVisByCountry();
    setTimeout(function () {
        sortCountryVisByCountry();
    }, 600);
}

var changeAllColorSchemes = function (newColor, duration) {
    visMain.newColor(newColor, duration);
    visGermany.newColor(newColor, duration);
    visCountry1.newColor(newColor, duration);
    visCountry2.newColor(newColor, duration);
};


// visualization of single indicators

var singleIndicatorIndex = null;
var singleIndicatorSortOrder = 'down';

var barChart = function (dataIndex, order) {
    $(function () {

        if (dataIndex === null)
            return false;

        if (dataIndex === undefined)
            dataIndex = singleIndicatorIndex;

        if (order === undefined)
            order = singleIndicatorSortOrder;

        singleIndicatorIndex = dataIndex;
        singleIndicatorSortOrder = order;

        var title = indicators[dataIndex]["our title"];
        var unit = indicators[dataIndex]["unit"];
        var longDescription = indicators[dataIndex]["long indicator description german"];

        if (longDescription === undefined)
            longDescription = "";

        document.getElementById('longDescription').innerHTML=longDescription;

        var collector = function (countryName) {

            try {
                var noValue = indicators[dataIndex]["no-value"];
            }
            catch (error) {
                var noValue = null;
            }

            try {
                var value = indicators[dataIndex]["country"][countryName].value;
                if ( value === noValue )
                    value = null;
            }
            catch (error) {
                var value = null;
            };

            try {
                var score = indicators[dataIndex]["country"][countryName].score;
            }
            catch (error) {
                var score = 6;
            };

            var color = colorSchemes[colorScheme][score-1];

            return { name: translate(countryName),
                     data: [{y: value,
                             score: score,
                             color: color,
                             name: translate(countryName),
                            }],
                     //pointWidth: 30,
                     pointPadding: 0,
                     groupPadding: 0.01
                   };
        }

        var filterOut = function (data) {
            return data.data[0].score != 6 && data.data[0].y != null;
        };

        var sortUpPred = function (a, b) {
            return a.data[0].y - b.data[0].y;
        };

        var sortDownPred = function (a, b) {
            return b.data[0].y - a.data[0].y;
        };

        if (order === 'up')
            var data = countryList.map(collector).sort(sortUpPred);

        if (order === 'down')
            var data = countryList.map(collector).sort(sortDownPred);

        if (order === 'standard')
            var data = countryList.map(collector);

        data = data.filter(filterOut);

        $('#highchartsPane').highcharts({

            chart: {
                type: 'column'
            },

            title: {
                text: title
            },

            xAxis: {
                categories: ['']
            },

            yAxis: {
                title: {
                    text: unit
                }
            },

            plotOptions: {column: {colorByPoint: true}},

            series: data,

            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        align: 'center',
                        inside: true,
                        defer: false,
                        allowOverlap: true,
                        rotation: -90,
                        y: -6,
                        style: {"color": "black",
                                "fontSize": "11px",
                                "fontWeight": "normal",
                                //"textShadow": "0 0 6px contrast, 0 0 3px contrast",
                               },
                        verticalAlign: 'middle',
                        formatter: function() {
                            return this.point.name;
                        }
                    }
                },
                pointPadding: 0,
            },

            legend: {
                enabled: false
            },

            tooltip: {
                enabled: true,
                useHTML: true,
                borderRadius: 10,
                borderWidth: 0,
                shadow: false,
                //style: 'height: 100px;',
                shape: 'square'
            }

        });
    });
};

barChart(0);

var mapChart = function () {
};
