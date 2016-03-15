/**
 * Created by knutator on 04.03.16.
 */
var dataGermany = indicatorProvider.getLastScoringForCountry("Germany").slice()

dataGermany.sort(function(a,b){return b.score - a.score;});

var visMain = new vis("visPane", dataGermany, 5, "Germany");
visMain.show(dataGermany, 0);

var filterMainVisBySDG = function (sdg) {
    if (visMain.filterSwitchSDG(sdg) && sdg != undefined) {
        var copy = dataGermany.slice();
        var pred = function (object, index) {
            console.log('index: ' + index);
            return  indicatorProvider.getIndicatorByIndex(object.indicator).sdg.indexOf(sdg) > -1;
        };
        var filteredIndicators = copy.filter(pred);
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
            return indicatorProvider.getIndicatorByIndex(object.indicator).ministerial_responsibility.indexOf(responsibilitiesShort[responsibility-1])>-1;
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
            var source = indicatorProvider.getIndicatorByIndex(object.indicator).indicator_source.value;
            if (status === 1)
                return  source != "OKF";
            else
                return source === "OKF";
        };
        visMain.show(copy.filter(pred), 1000);
    }
    else {
        visMain.show(dataGermany, 1000);
    }
};

$(document).ready(function() {

    $('.sdgIcon').click(function (event) {
        var sdgnumber = parseInt($(event.currentTarget).attr('data-sdg-id'));
        SDGsClick(sdgnumber);
    });



    for (var i=1; i<=15; i++) {
        var handler = function (j) {
            $('#responsibility'+j).on('mouseout', function (e) {
                responsibilityMouseOut(j);
            });
            $('#responsibility'+j).on('mouseover', function (e) {
                responsibilityMouseOver(j);
            });
            $('#responsibility'+j).on('click', function (e) {
                responsibilityClick(j);
            });
        };
        handler(i);
    }

    for (var i=1; i<=2; i++) {
        var handler = function (j) {
            $('#status'+j).on('mouseout', function (e) {
                statusMouseOut(j);
            });
            $('#status'+j).on('mouseover', function (e) {
                statusMouseOver(j);
            });
            $('#status'+j).on('click', function (e) {
                statusClick(j);
            });
        };
        handler(i);
    }

    for (var j=1; j<=7; j++) {
        var handler = function (i) {
            $('#color-scheme-' + j).on('click', function (event) {
                changeAllColorSchemes(i-1, 500);
            });
        };
        handler(j);
    }
})
