/**
 * Created by knutator on 11.02.16.
 */
"use strict";

var getInfos = function (country, index) {

    var translation = ["sehr gut", "gut", "mittel", "schlecht", "sehr schlecht", "(keine Bewertung)"];

    var indicator = indicators[index];
    var sortedScorings = indicatorUtils.sortScoringAsc(indicator.scoring);
    var lastScoring = _.last(sortedScorings);
    var scoring = _.find(lastScoring.countries, function(curr) { return curr.name === country});

    if (indicator) {

        var title = indicator["title"] ? indicator["title"] : '(kein Indicator vorhanden)';
        var value = scoring.value  ? Math.round(scoring.value * 100) / 100 : 'nicht vorhanden';
        var score = scoring.score ? scoring.score : 6;
        //Todo: Zweispachig
        var unit = indicator.long_indicator_description['de']["baseunit"] ? indicator.long_indicator_description['de']["baseunit"] : 'unit unbekannt';

        return title + " Wert " + value + ' ' + unit + ' <b> ' + translation[score-1] + '</b>';
    }
    return "Indikator unbekannt";
};

var clickFunction = function (d) {
    barChart(d.index);
};

//var unfilter = function () {
//    var mainVisFilteredBySDG = false;
//    setResponsibilityColor();
//    setStatusColor();
//    filterMainVisBySDG();
//    filterMainVisByResponsibility();
//    filterMainVisByStatus();
//};

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