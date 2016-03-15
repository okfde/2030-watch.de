/**
 * Created by knutator on 11.02.16.
 */
"use strict";

var getInfos = function (country, index) {

    var translation = ["sehr gut", "gut", "mittel", "schlecht", "sehr schlecht", "(keine Bewertung)"];

    var indicator = indicatorProvider.getIndicatorByIndex(index);

    var scoring = indicatorProvider.getLastScoringForCountryByIndicator(country, index);


    if (indicator) {

        var title = indicator["title"] ? indicator["title"] : '(kein Indicator vorhanden)';
        var value = scoring.value  ? scoring.value : 'nicht vorhanden';
        var score = scoring.score ? scoring.score : 6;
        var unit = indicator["unit"] ? indicator["unit"] : 'unit unbekannt';

        return title + " Wert " + value * unit.multiplier + ' ' + unit.base + ' <b> ' + translation[score-1] + '</b>';
    }
    return "Indikator unbekannt";
};

var clickFunction = function (d) {
    barChart(d.index);
};

var unfilter = function () {
    var mainVisFilteredBySDG = false;
    setResponsibilityColor();
    setStatusColor();
    filterMainVisBySDG();
    filterMainVisByResponsibility();
    filterMainVisByStatus();
};

var mainVisFilteredBySDG = false;
var mainVisFilteredByResponsibility = false;
var mainVisFilteredByStatus = false;

var SDGsClick = function (sdg) {
    filterMainVisBySDG(sdg);
    var set = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
    set.splice(sdg-1,1);
};

var setResponsibilityColor = function (color, responsibilities) {

    if (responsibilities === undefined) {
        responsibilities = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    }

    if (color === undefined)
        color = 'black';

    for(var j = 1; j <= 15; j++) {
        if (responsibilities.indexOf(j) >= 0 ) {
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

    for(var j = 1; j <= 2; j++) {
        if (status.indexOf(j) >= 0) {
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
    var toBlack =  [1,2];
    toBlack.splice(mainVisFilteredByStatus-1,1);
    setStatusColor('black',toBlack);
};

var vis = function (svgID, data, rows, country) {

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
        return colorScheme[data.score-1];
    };

    var circleCoords = function(d, i){
        return "translate(" + (Math.floor(i/rows)*rectWidth+rectWidth/2) + "," + ((i%rows)*rectHeight+rectHeight/2) + ")";
    };

    var mouseoverFunction = function (d,i) {

        var radius = d3.select(this)
            .attr("r");

        document.getElementById(svgID+'Infos').innerHTML = getInfos(country, d.indicator);

        var currentIndicator = indicatorProvider.getIndicatorByIndex(i);

        d3.select(this)
            .attr("r", Math.floor(radius)+3);

        var respIndices = [];
        var respCollection = currentIndicator.ministerial_responsibility;
        for (var i in respCollection) {
            respIndices.push(responsibilitiesShort.indexOf(respCollection[i]));
        }
        setResponsibilityColor('red', respIndices.map(function (i) {return i+1;}));

        var status = currentIndicator.indicator_source;
        if (status === "OKF")
            setStatusColor('red', [2]);
        else
            setStatusColor('red', [1]);
    };

    var mouseoutFunction = function (d,i) {

        var radius = d3.select(this)
            .attr("r");
        var sdgs = indicatorProvider.getIndicatorByIndex(i).sdg;

        document.getElementById(svgID+'Infos').innerHTML='';

        d3.select(this)
            .attr("r", Math.floor(radius)-3);

        var set =  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
        if (mainVisFilteredBySDG)
            set.splice(mainVisFilteredBySDG-1,1);

        set = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        if (mainVisFilteredByResponsibility)
            set.splice(mainVisFilteredByResponsibility-1,1);
        setResponsibilityColor('black', set);

        set = [1,2];
        if (mainVisFilteredByStatus)
            set.splice(mainVisFilteredByStatus-1,1);
        setStatusColor('black', set);

    };

    var sort = function(sortfct) {

    }


    var show = function (newData, duration) {

        var groups = svg.selectAll("g")
            .data(newData, function(d,i) {return i;});

        var cont = groups.enter().append("g");

        groups.append("title").text(function(d){return d.title;});

        cont.append("circle")
            .attr("r", circleRadius)
            .style("cursor", "pointer")
            .on("mouseover", mouseoverFunction)
            .on("mouseout", mouseoutFunction)
            .on("click", clickFunction);

        groups
            .select('circle')
            .attr("fill", function(d){
                return color(d);})


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
var changeAllColorSchemes = function (newColor, duration) {
    visMain.newColor(newColor, duration);
    visGermany.newColor(newColor, duration);
    visCountry1.newColor(newColor, duration);
    visCountry2.newColor(newColor, duration);
    barChart(singleIndicatorIndex);
    setCookie("color-scheme", colorScheme, 365);
};
