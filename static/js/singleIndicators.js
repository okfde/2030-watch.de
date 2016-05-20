// visualization of single indicators
var singleIndicatorIndex = null;
var singleIndicatorSortOrder = 'down';

var countryList = indicatorProvider.getSupportedCountries();

// fill single indicators dropdown from database
//for (var i = 1; i <= indicators.length; i++) {
//	document.getElementById('indicatorSelector' + i).innerHTML = indicators[i - 1]["title"];
//}

var fillIndicatorDetails = function (index) {

	var indicator = indicatorProvider.getIndicatorByIndex(index);
	var source = indicator.indicator_source ? indicator.indicator_source.value : "";
	var dataSource = indicator.source_of_data ? indicator.source_of_data : "";
	var year = indicator.most_recent_year ? indicator.most_recent_year : "";
	var sdg = indicator.sdg ? indicator.sdg : "";
	var datenpate = indicator.datenpate ? indicator.datenpate : "";

	var responsibility = indicator.ministerial_responsibility;
	var longResp = 'unbekannt';

	for (var i = 0; i < responsibilities.length; i++) {
		if (responsibilities[i][responsibility] != undefined) {
			longResp = responsibilities[i][responsibility];
		}
	}

	document.getElementById('indicatorDetailSource').innerHTML = source;
	document.getElementById('indicatorDetailDataSource').innerHTML = dataSource;
	document.getElementById('indicatorDetailResponsibility').innerHTML = responsibility;
	document.getElementById('indicatorDetailYear').innerHTML = year;
	document.getElementById('indicatorDetailSDGs').innerHTML = sdg;
	if (datenpate.length > 0) {
		document.getElementById('indicatorDetailDatenpate').innerHTML = 'Datenpate: ' + datenpate + '<br>';
		$('#indicatorDetailDatenpate').css('display', 'inline');
	} else {
		$('#indicatorDetailDatenpate').css('display', 'none');
	}
};


var barChart = function (dataIndex, order) {

	if (dataIndex === null) dataIndex = 0;

	d3.select('.indicatorBarChart').remove();

	singleIndicatorIndex = dataIndex;
	singleIndicatorSortOrder = order;

	var currentIndicator = indicatorProvider.getIndicatorByIndex(dataIndex);
	var countries = indicatorProvider.getLastScoringByCountryForIndicator(dataIndex);

	var title = currentIndicator.title;
	var unit = currentIndicator.baseunit;
	var longDescription = currentIndicator.long_indicator_description.de;

	if (longDescription === undefined)
		longDescription = "";

	var withValue = function (obj) {
		return (obj.value !== -1 ? true : false);
	};

	var inLoopUpTable = function (v) {
		return (countryList.indexOf(v.name) !== -1 ? true : false);
	};

	var data = countries.filter(function (v) {
		return (withValue(v) && inLoopUpTable(v));
	}).sort(function (a, b) {
		return b.value - a.value;
	});

	console.log(currentIndicator);

	document.getElementById('longDescription').innerHTML = longDescription;
	document.getElementById('indicator-title').innerHTML = title;
	document.getElementById('indicatorshort').innerHTML = currentIndicator.short_indicator_description.de;

	var ma = d3.max(data, function (d) {
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
		.domain(data.map(function (c) {
			return c.name;
		}));

	var y = d3.scale.linear()
		.range([height, 0])
		.domain([0, d3.max(data, function (d) {
			return d.value;
		})]);


	var svg = d3.select('#highchartsPane').append('svg')
		.attr('class', 'indicatorBarChart')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	svg.append('text')
		.attr('class', 'chart-title')
		.attr('y', -7)
		.attr('x', width / 2)
		.text(title);

	//var svg = d3.select('#highchartsPane').append('svg')
	//	.attr('class', 'indicatorBarChart')
	//	.attr("width", '100%')
	//	.attr("height", '100%')
	//	.attr('viewBox','0 0 '+(width + margin.left + margin.right)+' '+(height + margin.top + margin.bottom))
	//	.attr('preserveAspectRatio','xMaxYMax')
	//	.append('g')
	//	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

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
		.text('in ' + unit);


	var bars = svg.append('g')
		.attr('class', 'bars');
	var rect = bars.selectAll(".bar")
		.data(data)
		.enter().append('rect')
		.attr("class", "bar")
		.attr('id', function (d) {
			return 'bar-' + d.name;
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
			d3.select('#t-' + d.name).classed('hover', true);
		})
		.on('mouseout', function (d) {
			d3.select(this).classed('hover', false);
			d3.select('#t-' + d.name).classed('hover', false);
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
		.data(data)
		.enter().append('text')
		.attr('class', 'bar-title')
		.attr('transform', function (d) {
			return 'rotate(-90) translate(' + (-height + 5) + ',' + (x(d.name) + x.rangeBand() * 0.75) + ')';
		})
		.text(function (d) {
			return translate(d.name);
		})
		.on('mouseover', function (d) {
			d3.select('#bar-' + d.name).classed('hover', true);
			d3.select('#t-' + d.name).classed('hover', true);
		})
		.on('mouseout', function (d) {
			d3.select('#bar-' + d.name).classed('hover', false);
			d3.select('#t-' + d.name).classed('hover', false);
		});

	bars.selectAll('.custom-tooltipp')
		.data(data)
		.enter().append('text')
		.attr('class', 'custom-tooltipp')
		.attr('id', function (d) {
			return 't-' + d.name;
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

	fillIndicatorDetails(dataIndex);

};

$(document).ready(function () {
	barChart(0);

	var substringMatcher = function (strs) {
		return function findMatches(q, cb) {
			var matches, substrRegex;

			matches = [];

			substrRegex = new RegExp(q, 'i');

			$.each(strs, function (i, str) {
				if (substrRegex.test(str)) {
					matches.push(str);
				}
			});
			cb(matches);
		};
	};

	var indicators = indicatorProvider.getAllIndicators().map(function (d) {
		return d.title;
	});

	$('.typeahead').typeahead({
			hint: true,
			highlight: true,
			minLength: 1
		},
		{
			name: 'indicators',
			source: substringMatcher(indicators)
		});

	$('input.typeahead').unbind("keyup").keyup(function (e) {
		var code = e.which; // recommended to use e.which, it's normalized across browsers
		if (code == 13) {
			var val = $('input[name="indicator"]').val();
			barChart(indicators.indexOf(val));
			//$("#btn").click();
		}
	});
});
