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
            var source = indicators[object.index]["indicator source"]
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
