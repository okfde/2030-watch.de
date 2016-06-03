var countryApp = angular.module('CountryComparisonApp', [], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

countryApp.controller('CompareCountryCtrl', function ($scope) {

    $scope.country1 = { name: 'Deutschland'};
    $scope.country2 = { name: 'Frankreich'};
    $scope.country3 = { name: 'Schweden'};
    $scope.countries = indicatorProvider.getSupportedCountries().map(function(d){
        return {
            name: translate(d)
        };
    }).sort(function (a, b) {
        var nameA = a.name.toLowerCase(),
           nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    $scope.filter = ['Allgemeine Verteilung', 'Indikatoren'];
    $scope.selctedfilter = $scope.filter[0];

    $scope.changeFilter = function(){

    };

    //console.log($scope.countries);

});

countryApp.directive('compareViz', function () {
    return {
        restrict: 'E',
        scope: {
            countries: '=',
            binding: '=',
            name: '='
        },
        templateUrl: 'compare_viz.html',
        link: function (scope) {
            scope.change = function (){

            }
        }
    }
});


var country1 = 'France';
var country2 = 'UK';
var dataGermany = indicatorProvider.getLastScoringForCountry("Germany");
var dataCountry1 = indicatorProvider.getLastScoringForCountry("France");
var dataCountry2 = indicatorProvider.getLastScoringForCountry("UK");

var visGermany = new vis("visGermany", dataGermany.slice(), 3, "Germany");
var visCountry1 = new vis("visCountry1", dataCountry1.slice(), 3, "France");
var visCountry2 = new vis("visCountry2", dataCountry2.slice(), 3, "UK");

var sortedByOneCountry = "Germany";

var sortCountryIndicators = function(first, second) {
    return second.score - first.score;
};

var sortCountryVisByCountry = function (country) {

    if (country === "country1")
        country = country1;
    if (country === "country2")
        country = country2;

    if (sortedByOneCountry === country) {
        visGermany.show(dataGermany.slice().sort(sortCountryIndicators), 1000);
        visCountry1.show(dataCountry1.slice().sort(sortCountryIndicators), 1000);
        visCountry2.show(dataCountry2.slice().sort(sortCountryIndicators), 1000);
        sortedByOneCountry = null;
    }
    else {
        var dataSentinel = indicatorProvider.getLastScoringForCountry(country).slice().sort(sortCountryIndicators);
        var dataSentinelArray = dataSentinel.map(function(x){return x.indicator;});

        var pred = function (a,b) {
            return dataSentinelArray.indexOf(a.indicator) - dataSentinelArray.indexOf(b.indicator);
        };

        visGermany.show(dataGermany.slice().sort(pred), 1000);
        visCountry1.show(dataCountry1.slice().sort(pred), 1000);
        visCountry2.show(dataCountry2.slice().sort(pred), 1000);

        sortedByOneCountry = country;
    }
};

var changeAllColorSchemes = function (newColor, duration) {
    visMain.newColor(newColor, duration);
    visGermany.newColor(newColor, duration);
    visCountry1.newColor(newColor, duration);
    visCountry2.newColor(newColor, duration);
    barChart(singleIndicatorIndex);
    setCookie("color-scheme", colorScheme, 365);
};

function selectCountryForSelectBox(element, country) {
    var entries = $('#' + element).children();
    for (var i = 0; i < entries.length; i++) {
        var item = entries[i];
        if ($(item).attr('value') == country) {
            $(item).attr('selected', 'selected');
        }
    }
}

$(document).ready(function() {
    selectCountryForSelectBox('comparisonCountry1', 'France');
    selectCountryForSelectBox('comparisonCountry2', 'UK');
    sortCountryVisByCountry(sortedByOneCountry);
});

function changeCountry(number) {

    var element = document.getElementById("comparisonCountry" + number);
    var newCountry = element.options[element.selectedIndex].value;

    document.getElementById('country' + number).innerHTML = translate(newCountry);

    if (number === 1) {
        var country1 = newCountry;
        document.getElementById('visCountry1').innerHTML = '';
        var dataCountry1 = indicatorProvider.getLastScoringForCountry(newCountry).slice().sort(sortCountryIndicators);
        var visCountry1 = new vis("visCountry1", dataCountry1.slice(), 3, newCountry);
        visCountry1.show(dataCountry1, 1000);
    }

    if (number === 2) {
        var country2 = newCountry;
        document.getElementById('visCountry2').innerHTML = '';
        var dataCountry2 = indicatorProvider.getLastScoringForCountry(newCountry).slice().sort(sortCountryIndicators);
        var visCountry2 = new vis("visCountry2", dataCountry2.slice(), 3, newCountry);
        visCountry2.show(dataCountry2, 1000);
    }

    //sortCountryVisByCountry();
    //setTimeout(function () {
    //    sortCountryVisByCountry();
    //}, 0);
}




