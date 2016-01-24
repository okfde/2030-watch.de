// The place for additional visualizations.

var minimumWages = function () {

    var data = [
        {
            name: "Albania",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Australia",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Austria",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Belgium",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Bosnia and Herzegovina",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Brazil",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Bulgaria",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Canada",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Chile",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "China",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Croatia",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Cyprus",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Czech Republic",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Denmark",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Estonia",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Finland",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "France",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Germany",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Greece",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Hungary",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Iceland",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "India",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Indonesia",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Ireland",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Israel",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Italy",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Japan",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Latvia",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Lithuania",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Luxembourg",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Macedonia",
            data: [{
                y: 1,
                color: "#555555"
            }]
        },
        {
            name: "Malta",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Mexico",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Montenegro",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "New Zealand",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Norway",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Poland",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Portugal",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Republic of Korea",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Romania",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Russia",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Serbia",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Singapore",
            data: [{
                y: 1,
                color: "#555555"
            }]
        },
        {
            name: "Slovakia",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Slovenia",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "South Africa",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Spain",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Sudan",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Sweden",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Switzerland",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "The Netherlands",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Turkey",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "UK",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "USA",
            data: [{
                y: 5,
                color: "#555555"
            }]
        }
    ];


    $('#supplementaryPane').highcharts({

        chart: {
            type: 'column'
        },

        title: {
            text: "title"
        },

        xAxis: {
            categories: ['']
        },

        yAxis: {
            title: {
                text: "unit"
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
};

var minimumWagesMap = function () {

    var data = [
        {
            name: "Albania",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Australia",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Austria",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Belgium",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Bosnia and Herzegovina",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Brazil",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Bulgaria",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Canada",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Chile",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "China",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Croatia",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Cyprus",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Czech Republic",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Denmark",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Estonia",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Finland",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "France",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Germany",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Greece",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Hungary",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Iceland",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "India",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Indonesia",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Ireland",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Israel",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Italy",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Japan",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Latvia",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Lithuania",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Luxembourg",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Macedonia",
            data: [{
                y: 1,
                color: "#555555"
            }]
        },
        {
            name: "Malta",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Mexico",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Montenegro",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "New Zealand",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Norway",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Poland",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Portugal",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Republic of Korea",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Romania",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Russia",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Serbia",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Singapore",
            data: [{
                y: 1,
                color: "#555555"
            }]
        },
        {
            name: "Slovakia",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Slovenia",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "South Africa",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Spain",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Sudan",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Sweden",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "Switzerland",
            data: [{
                y: 3,
                color: "#555555"
            }]
        },
        {
            name: "The Netherlands",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "Turkey",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "UK",
            data: [{
                y: 5,
                color: "#555555"
            }]
        },
        {
            name: "USA",
            data: [{
                y: 5,
                color: "#555555"
            }]
        }
    ];


    var chart = new Highcharts.Map({

        chart: {
            renderTo: 'supplementaryPane'
        },

        mapData: Highcharts.maps["custom/world"],

        joinBy: ['name', 'name'],

        data: data

    });
};
