var mainVizApp = angular.module('MainVizApp', [], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

mainVizApp.controller('MonitoringGermanyCtrl', function ($scope) {

    var dataGermany = indicatorProvider.getLastScoringForCountry("Germany").slice();

    dataGermany.sort(function (a, b) {
        return a.score - b.score;
    });

    d3.selectAll('.sdgIcon')
        .on('mouseover', function () {
            d3.select(this).classed('hover', true);
        })
        .on('mouseout', function () {
            d3.select(this).classed('hover', false);
        });
    d3.selectAll('.responsibility')
        .on('mouseover', function () {
            d3.select(this).classed('hover', true);
        })
        .on('mouseout', function () {
            d3.select(this).classed('hover', false);
        });
    d3.selectAll('.status')
        .on('mouseover', function () {
            d3.select(this).classed('hover', true);
        })
        .on('mouseout', function () {
            d3.select(this).classed('hover', false);
        });


    $scope.data = dataGermany;
    $scope.showedData = dataGermany;
    $scope.visibility = false;
    $scope.detailData = [];


    /**
     * Filters for Viz
     */
    $scope.sdgFiltering = function (id) {
        d3.selectAll('.sdgIcon').classed('clicked', false);
        d3.select('#sdg'+id).classed('clicked', true);

        var filteredData = $scope.data.filter(function (d) {
            return d.sdg == id;
        }).sort(function (a, b) {
            return a.score - b.score;
        });
        $scope.showedData = filteredData;

        redraw();
        showIndicators();
    };

    $scope.types = [];
    
    $scope.type = function (id, type) {
        if (d3.select('#status'+id).classed('active')) {
            d3.select('#status'+id).classed('clicked', false).classed('active', false);
            $scope.types = $scope.types.filter(function(t) { return t !== type; });
        }
        else {
            d3.select('#status'+id).classed('clicked', true).classed('active', true);
            $scope.types.push(type);
        }

        if ($scope.types.length === 0) return $scope.resetFilter();

        var filteredData = $scope.data.filter(function (d) {
            //Turn list of sources (back!) into an array and check of any of them are in the list of current sources
            return d.indicatorsource.split(',').some(function(e) {
                return ($scope.types.indexOf(e.trim()) != -1 ? true : false);
            });
        }).sort(function (a, b) {
            return a.score - b.score;
        });
        $scope.showedData = filteredData;
        redraw();
        showIndicators();
    };
    $scope.resetFilter = function () {
        d3.selectAll('.sdgIcon').classed('clicked', false);
        d3.selectAll('.responsibility').classed('clicked', false);
        d3.selectAll('.status').classed('clicked', false).classed('active', false);

        $scope.types = [];
        var filteredData = $scope.data;
        $scope.showedData = filteredData;
        redraw();
    };


    /**
     * Visualization
     */
    var color = d3.scale.ordinal()
        .domain([1, 2, 3, 4, 5])
        .range(['#2c7bb6', '#abd9e9', '#ffe89d', '#fdae61', '#d7191c']);

    var categories = localized_categories;

    var el = document.getElementById('monitoring-germany');

    var margin = {top: 100, bottom: 10, left: 10, right: 10};
    var width = el.clientWidth - margin.left - margin.right;
    var height = 150 - margin.top - margin.bottom;

    var n = dataGermany.length;

    var x = d3.scale.ordinal()
        .domain(d3.range(n))
        .rangeBands([0, width], 0.1, 0.2);

    var svg = d3.select('#monitoring-germany')
        .append('svg')
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
        .attr('preserveAspectRatio', 'xMaxYMax')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0, " + (i * 16 - margin.top) + ")"; });

    legend.append("rect")
        .attr("x", width - 13)
        .attr("width", 13)
        .attr("height", 13)
        .style("fill", color)
        .style('opacity', 0.7);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 7)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return categories[d-1]; });

    redraw();

    function redraw(filter) {
        $scope.visibility = false;
        var rect = svg.selectAll('.rect')
            .data($scope.showedData)
            .attr("class", function(d){
                return  "rect cat-"+ d.score;
            })
            .attr('id', function (d) {
                return 'id-' + d.indicator;
            });

        rect.enter().append('rect')
            .attr("class", function(d){
                return  "rect cat-"+ d.score;
            })
            .attr('id', function (d) {
                return 'id-' + d.indicator;
            })
            .attr('height', x.rangeBand())
            .attr("width", x.rangeBand())
            .style('fill', 'white')
            .style('opacity', 1)
            .on('mouseover', function (d) {
                d3.selectAll('.cat-'+ d.score).classed('hover', true)
                    .style('stroke', 'black')
                    .style('stroke-width', 1.2);
            })
            .on('mouseout', function (d) {
                d3.selectAll('.cat-'+ d.score).classed('hover', false)
                    .style('stroke', 'none');
            })
            .on('click', function (d) {
                $scope.$apply(function () {
                        var data = filterByScoring(d);
                        $scope.visibility = true;
                        $scope.detailData = [{
                            headline: categories[(d.score - 1)],
                            data: data,
                            count: data.length,
                            width: x.rangeBand(),
                            color: color(d.score)
                        }];
                });
            });

        rect.transition()
            .duration(500)
            .attr("x", function (d, i) {
                return x(i);
            })
            .style('fill', function (d) {
                return color(d.score);
            });

        rect.exit().remove();
    }

    function showIndicators(){

        $scope.detailData = [];
        var data = null;
        var score = 0;

        //if($scope.showedData.length < 20){
            $scope.showedData.forEach(function(d){
                if(score !== d.score){
                    if(data !== null){
                        $scope.detailData.push(data);
                    }
                    data = {
                        headline: categories[(d.score - 1)],
                        data: [],
                        count: 0,
                        width: x.rangeBand(),
                        color: color(d.score)
                    };
                    data.data.push(d);
                    data.count = data.count+1;
                    score = d.score;
                }else{
                    data.data.push(d);
                    data.count = data.count+1;
                }
            });
            $scope.detailData.push(data);
            $scope.visibility = true;
        //}
    }


    /**
     * Filtering of arrays
     */
    var filterByScoring = function (element) {
        var score = element.score;
        var filteredData = $scope.showedData.filter(function (d) {
            return (d.score === score ? true : false);
        }).sort(function (a, b) {
            var nameA = a.int_name[global_lang].toLowerCase(),
                nameB = b.int_name[global_lang].toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        return filteredData;
    };
    //No longer allowing multiple SDGs per indicator
    /*
    var filterArrayElement = function (element, id) {
        return element.filter(function (d) {
            return (d === id ? true : false);
        });
    };
    */
});

mainVizApp.filter('range', function () {
    return function (val, range) {
        range = parseInt(range);
        for (var i = 0; i < range; i++)
            val.push(i);
        return val;
    };
});
