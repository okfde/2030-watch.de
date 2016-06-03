var singleIndApp = angular.module('SingleIndicatorVizApp', [], function ($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
});

singleIndApp.controller('SingleIndicatorCtrl', function ($scope) {

	var countryList = indicatorProvider.getSupportedCountries();
	var actIndicator = indicatorProvider.getIndicatorByIndex(0);
	var countries = indicatorProvider.getLastScoringByCountryForIndicator(0);
	var indicators = indicatorProvider.getAllIndicators().map(function (d) {
		return { name: 'SDG '+d.sdg[0]+' : '+d.title, sdg : d.sdg[0]} ;
	}).sort(function (a, b) {
		if (a.sdg < b.sdg) {
			return -1;
		}
		if (a.sdg > b.sdg) {
			return 1;
		}
		return 0;
	});

	d3.select('.indicatorBarChart').remove();


	$scope.indicator = actIndicator;
	$scope.indicators = indicators;
	$scope.selIndi = { name: ''};
	$scope.change = function(){
		$scope.indicator = indicatorProvider.getIndicatorByIndex(indicatorProvider.getIndicatorByTitle($scope.selIndi.name));
	};



	var withValue = function (obj) {
		return (obj.value !== -1 ? true : false);
	};

	var inLoopUpTable = function (v) {
		return (countryList.indexOf(v.name) !== -1 ? true : false);
	};

	$scope.data = countries.filter(function (v) {
		return (withValue(v) && inLoopUpTable(v));
	}).sort(function (a, b) {
		return b.value - a.value;
	});

	var ma = d3.max($scope.data, function (d) {
		return d.value;
	});
	var ma_top = (ma.toString().split('.')[0].length) * 10 + 25;
	var margin = {
		top: 40, bottom: 10, left: ma_top, right: 10
	};
	var width = document.getElementById('highchartsPane').clientWidth - margin.left - margin.right,
		height = 400 - margin.bottom - margin.top;

	var color = d3.scale.ordinal()
		.domain([1, 2, 3, 4, 5])
		.range(['#2c7bb6', '#abd9e9', '#ffe89d', '#fdae61', '#d7191c']);

	var x = d3.scale.ordinal()
		.rangeRoundBands([0, width], 0.2)
		.domain($scope.data.map(function (c) {
			return c.name;
		}));

	var y = d3.scale.linear()
		.range([height, 0])
		.domain([0, d3.max($scope.data, function (d) {
			return d.value;
		})]);


	var svg = d3.select('#highchartsPane').append('svg')
		.attr('class', 'indicatorBarChart')
		.attr("width", '100%')
			.attr("height", '100%')
			.attr('viewBox','0 0 '+(width + margin.left + margin.right)+' '+(height + margin.top + margin.bottom))
			.attr('preserveAspectRatio','xMaxYMax')
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	svg.append('text')
		.attr('class', 'chart-title')
		.attr('y', -7)
		.attr('x', width / 2)
		.text(actIndicator.title);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.svg.axis().scale(x).orient("bottom"));

	var yAxis = svg.append("g")
		.attr("class", "y axis")
		.call(d3.svg.axis()
			.scale(y)
			.ticks(6)
			.tickSize(-width)
			.orient("left"));
	yAxis.selectAll('text')
		.attr('x', -8);
	yAxis.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 0)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text('in ' + actIndicator.baseunit);


	var bars = svg.append('g')
		.attr('class', 'bars');
	var rect = bars.selectAll(".bar")
		.data($scope.data)
		.enter().append('rect')
		.attr("class", "bar")
		.attr('id', function (d) {

			return 'bar-' +removeWhitespace(d.name);
		})
		.attr("x", function (d) {
			return x(d.name);
		})
		.attr('y', height)
		.attr("width", x.rangeBand())
		.style('fill', function (d) {
			return color(d.score);
		})
		.on('mouseover', function (d) {
			d3.select(this).classed('hover', true);
			d3.select('#t-' +removeWhitespace(d.name)).classed('hover', true);
		})
		.on('mouseout', function (d) {
			d3.select(this).classed('hover', false);
			d3.select('#t-' +removeWhitespace(d.name)).classed('hover', false);
		});

	rect.transition()
		.duration(1000)
		.attr("y", function (d) {
			return y(d.value);
		})
		.attr('height', function (d) {
			return height - y(d.value);
		});

	bars.selectAll('.bar-title')
		.data($scope.data)
		.enter().append('text')
		.attr('class', 'bar-title')
		.attr('transform', function (d) {
			return 'rotate(-90) translate(' + (-height + 5) + ',' + (x(d.name) + x.rangeBand() * 0.75) + ')';
		})
		.text(function (d) {
			return translate(d.name);
		})
		.on('mouseover', function (d) {
			d3.select('#bar-' + removeWhitespace(d.name)).classed('hover', true);
			d3.select('#t-' + removeWhitespace(d.name)).classed('hover', true);
		})
		.on('mouseout', function (d) {
			d3.select('#bar-' + removeWhitespace(d.name)).classed('hover', false);
			d3.select('#t-' + removeWhitespace(d.name)).classed('hover', false);
		});

	bars.selectAll('.custom-tooltipp')
		.data($scope.data)
		.enter().append('text')
		.attr('class', 'custom-tooltipp')
		.attr('id', function (d) {
			return 't-' + removeWhitespace(d.name);
		})
		.attr("y", function (d) {
			return y(d.value) - 3;
		})
		.attr("x", function (d) {
			return x(d.name) + x.rangeBand() * 0.5;
		})
		.text(function (d) {
			return d.value;
		});

	function redraw(){
		var rect = svg.selectAll(".bar")
			.data($scope.data);
	}

	function removeWhitespace(country){
		var name ='';
		country.split(' ').forEach(function(a){
			name += a;
		});
		return name;
	};
});