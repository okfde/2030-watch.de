var countries = [];

var indicatorCountryVis = (function(element) {
    var currentIndicator = {};
    var width = $('.indicator-vis-map').width();
    var height = width * 1.7;
    var rootElement = element;
    var vis = {};

    function updateData() {
        vis
            .attr("class", function(d) { console.log('country');console.log(d); return "country " + d.properties.name.toLowerCase(); })
            .attr("d", path)
            .attr("id", function(d,i) {d.properties.id = i; return "country-" + i})
            .style("fill", function(d) {
                var scoring =  indicatorProvider.getLastScoringForCountryAndIndicator(d.properties.name, indicator);
                var score = scoring ? scoring.score : 6;
                console.log('score: ' + score);
                console.log(score);
                return getBackgroundForScore(score);
            });

    }

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
                return getBackgroundForScore(d.properties.name)
            });
        tip.hide(d);
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

    function openModal(element) {
        var items = [];
        items.push("<thead><tr><th>Titel</th><th>Score</th></tr></thead><tbody>")
        $.each( indicators, function( key, val ) {
            var score_value = val.country[element.properties.name] ? val.country[element.properties.name].score : 0;
            items.push( "<tr><td>" + val['our title'] + "</td><td>" + score_value + "</td></tr>" );
        });
        items.push("</tbody>");
        $("#indicator-modal").html($( "<table/>", {
            "class": "indicator-table",
            html: items.join( "" )
        }, function(error) {
            console.log(error);
        }));
        $('.modal-title').html(element.properties.name);
        var records = indicators.map(function(item) {
            var score = item.country[element.properties.name] ? item.country[element.properties.name].score : "kein Wert"
            return {
                indikator: item['our title'],
                score: score,
                wert: item.country[element.properties.name] ? item.country[element.properties.name].value : "kein Wert",
                status: '<svg height="20" width="40"> <circle cx="25" cy="10" r="10" fill="' + getBackgroundForScore(score) +'" /> </svg>',
                ziel: item.target ? item.target : "kein Wert"
            }
        });
        console.log('Records');
        console.log(records);
        $('#indicator-table').dynatable({
            dataset: {
                records: records
            }
        });
        $("#myModal").modal('show');
    }

    return {
        init: function(countryUrl) {
            d3.json(countryUrl, function(error, europe) {
                if (error)
                    return console.error(error);
                console.log(europe);
                console.log(europe.objects.europe);
                console.log(topojson.feature(europe, europe.objects.europe));

                var featureArray = europe.objects.europe.geometries;

                featureArray.forEach(function(elem) {
                    return topojson.feature(europe, elem)
                });
                console.log(featureArray);
                data = europe;

                svg = d3.select(rootElement)
                    .appned("svg")
                    .attr("width", width)
                    .attr("height", height);

                vis = svg.selectAll('.country')
                    .data(topojson.feature(data, data.objects.europe).features)
                    .enter()
                    .append("path")
                    .style("stroke", "black")
                    .style("stroke-width", 0.5)
                    .on("mouseover", mouseOverCountry)
                    .on("mouseout", mouseOutOfCountry)
                    .on("click", openModal);

                updateData(data);
            });
        },
        show: function() {
            var projection = d3.geo.albers()
                .center([15, 30])
                .rotate([0, 0])
                .parallels([50, 60])
                .scale(width)
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
        },
        updateIndicator : function(indicator) {
            this.currentIndicator = indicator;
            updateData();
        }
    }
});

$(document).ready(function() {


    var items = [];
    $.each( indicators, function( key, val ) {
        items.push( "<li><a data-id=" + key + " href='#' class='indicator'>" + val.title + "</a></li>" );
    });

    $( "<ul/>", {
        "class": "indicator-list",
        html: items.join( "" )
    }, function(error) {
        console.log(error);
    }).appendTo( ".indicatorlist-wrapper" );


    $('.indicator').click(function(event) {
        event.preventDefault();
        var indicatorid = $(this).attr('data-id')
        var indicator = indicatorProvider.getIndicatorByIndex(indicatorid);
        countries = indicatorProvider.getLastScoringByCountryForIndicator(indicatorid);

        var indicatorstring =  "<h4>" + indicator.title + "</h4>" +
            "<p>" + indicator.long_indicator_description_de + "</p>"
            + "<p>Datenquelle: " + indicator.source_of_data + "</p>"
            + "<p>Indikatorenquelle: " + indicator.indicator_source.value + "</p>"

        $('.indicator-details').html(indicatorstring);
        updateData(countries, indicatorid);
    });

    $('#test').click(function() {
        $("#myModal").modal();
    });

    vis = new indicatorCountryVis('.indicator-vis-map');
    vis.init('/static/js/europe.json');


});



