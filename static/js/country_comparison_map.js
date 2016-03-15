var indicatorMap = angular.module('indicatorMap', []);

indicatorMap.controller('MainCtrl', function ($scope) {
    $scope.indicators = indicatorProvider.getAllIndicators();
    $scope.test = "Test";
    var countries = [];

    $scope.setIndicator = function(id) {
        $scope.activeIndicator = indicatorProvider.getIndicatorByIndex(id);
        countries = indicatorProvider.getLastScoringForIndicator(id).countries;
        updateData();
    };

    var width = 960,
        height = 1160;

    var projection = d3.geo.albers()
        .center([25, 40])
        .rotate([0, 0])
        .parallels([50, 60])
        .scale(900)
        .translate([width / 2, height / 2]);


    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select(".indicator-vis-map").append("svg")
        .attr("width", width)
        .attr("height", height);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            console.log(d);
            var country = countries[d.properties.name];
            var resultstring = "<strong>" + d.properties.name + "</strong>";
            if (country) {
                resultstring += "<br /><br />Value: " + country.value + "<br />Score: " + country.score;
            }
            return resultstring;
        });

    svg.call(tip);


    function mouseOverCountry(d) {
        console.log('mouse over');
        console.log(d);
        d3.selectAll("#country-" + d.properties.id)
            .style("fill", "pink");
        tip.show(d);
    }

    function mouseOutOfCountry(d) {
        d3.selectAll("#country-" + d.properties.id)
            .style("fill", function(d){
                console.log('color');
                console.log(d);
                return getBackground(d.properties.name)
            });
        tip.hide(d);
    }

//TODO: needs refactoring
    function getBackground(country) {
        var value = countries[country];
        if (value) {
            switch (value.score) {
                case 1:
                    return "#2c7bb6";
                    break;
                case 2:
                    return "#abd9e9";
                    break;
                case 3:
                    return "#ffffbf";
                    break;
                case 4:
                    return "#fdae61";
                    break;
                case 5:
                    return "#d7191c";
                    break;
                default:
                    return "#DDDDDD";
                    break;
            }
        }
        return "#DDDDDD";
    }

    function getBackgroundForScore(score) {

        switch (score) {
            case 1:
                return "#2c7bb6";
                break;
            case 2:
                return "#abd9e9";
                break;
            case 3:
                return "#ffffbf";
                break;
            case 4:
                return "#fdae61";
                break;
            case 5:
                return "#d7191c";
                break;
            default:
                return "#DDDDDD";
                break;
        }
        return "#DDDDDD";
    }

    d3.json("/static/js/europe.json", function(error, europe) {
        if (error) return console.error(error);
        console.log(europe);
        console.log(europe.objects.europe);
        console.log(topojson.feature(europe, europe.objects.europe));
        var featureArray = europe.objects.europe.geometries;

        featureArray.forEach(function(elem) {
            return topojson.feature(europe, elem)
        });
        console.log(featureArray);
        data = europe;

        vis = svg.selectAll('.country')
            .data(topojson.feature(data, data.objects.europe).features)
            .enter()
            .append("path")
            .style("stroke", "black")
            .style("stroke-width", 0.5)
            .on("mouseover", mouseOverCountry)
            .on("mouseout", mouseOutOfCountry)
            //.on("click", openModal)
         ;

        updateData(data);
    });

    function updateData() {
        vis
            .attr("class", function(d) { console.log(d); return "country " + d.properties.name.toLowerCase(); })
            .attr("d", path)
            .attr("id", function(d,i) {d.properties.id = i; return "country-" + i})
            .style("fill", function(d) {
                return getBackground(d.properties.name);
            });

    }
});