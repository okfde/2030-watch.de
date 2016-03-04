/**
 * Created by knutator on 02.03.16.
 */
// visualization of single indicators

var singleIndicatorIndex = null;
var singleIndicatorSortOrder = 'down';

var countryList = indicatorProvider.getSupportedCountries();

// fill single indicators dropdown from database
for(var i = 1; i <= indicators.length; i++) {
    document.getElementById('indicatorSelector' + i).innerHTML=indicators[i-1]["title"];
}

var fillIndicatorDetails = function (index) {

    var indicator = indicatorProvider.getIndicatorByIndex(index);
    var source = indicator.indicator_source ? indicator.indicator_source : "";
    var dataSource = indicator.source_of_data ? indicator.source_of_data : "";
    var year = indicator.most_recent_year ? indicator.most_recent_year : "";
    var sdg = indicator.sdg ? indicator.sdg : "";
    var datenpate = indicator.datenpate ? indicator.datenpate : "";

    var responsibility = indicator.ministerial_responsibility;
    var longResp = 'unbekannt';

    for(var i = 0; i < responsibilities.length; i++) {
        if (responsibilities[i][responsibility] != undefined) {
            longResp = responsibilities[i][responsibility];
        }
    };

    document.getElementById('indicatorDetailSource').innerHTML = source;
    document.getElementById('indicatorDetailDataSource').innerHTML = dataSource;
    document.getElementById('indicatorDetailResponsibility').innerHTML = responsibility;
    document.getElementById('indicatorDetailYear').innerHTML = year;
    document.getElementById('indicatorDetailSDGs').innerHTML = sdg;
    console.log(datenpate);
    if (datenpate.length > 0) {
        document.getElementById('indicatorDetailDatenpate').innerHTML='Datenpate: ' + datenpate + '<br>';
        $('#indicatorDetailDatenpate').css('display', 'inline');
    } else {
        $('#indicatorDetailDatenpate').css('display', 'none');
    }
};


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

        var currentIndicator = indicatorProvider.getIndicatorByIndex(dataIndex);
        var countries = indicatorProvider.getLastScoringByCountryForIndicator(dataIndex);

        var title = currentIndicator.title;
        var unit = currentIndicator.unit.base;
        var longDescription = currentIndicator.long_indicator_description_de;

        if (longDescription === undefined)
            longDescription = "";

        document.getElementById('longDescription').innerHTML = longDescription;

        var collector = function (country) {

            var value = ""
            var score = 6;

            if (country) {
                value = country.value;
                score = country.score;
            }

            var color = colorScheme[score-1];

            return {
                name: translate(country.name),
                data: [
                    {
                        y: value,
                        score: score,
                        color: color,
                        name: translate(country.name)
                    }
                ],
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

        var data;

        if (order === 'up')
            data = countries.map(collector).sort(sortUpPred);

        if (order === 'down')
            data = countries.map(collector).sort(sortDownPred);

        if (order === 'standard')
            data = countries.map(collector);

        data = data.filter(filterOut);

        $('#highchartsPane').highcharts({

            chart: {type: 'column'},
            title: {text: title},
            xAxis: {categories: ['']},
            yAxis: {title: {text: unit}},
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
                pointPadding: 0
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

    fillIndicatorDetails(dataIndex);

    var supplementaryViz;

    try {
        supplementaryViz = indicators[dataIndex]["supplementaryViz"];
    }
    catch (error) {
        supplementaryViz = [];
    }
    if ( supplementaryViz === undefined)
        supplementaryViz = [];

    if ( supplementaryViz.length >= 1) {
        $('#supplementaryRow').css('display', 'initial');
        showSupplementary();
    }
    else {
        $('#supplementaryRow').css('display', 'none');
    };

};

$(document).ready(function() {
    barChart(0);
});
