/**
 * Created by knutator on 02.03.16.
 */
// visualization of single indicators

var singleIndicatorIndex = null;
var singleIndicatorSortOrder = 'down';

var countryList = indicatorProvider.getSupportedCountries();

// fill single indicators dropdown from database
for (var i = 1; i <= indicators.length; i++) {
	document.getElementById('indicatorSelector' + i).innerHTML = indicators[i - 1]["title"];
}

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

	//console.log(countries);
	console.log(currentIndicator);

	countries.sort(function (a, b) {
		return b.value - a.value;
	});

	var begin = 0,
		steps = 0;
	countries.forEach(function (c, i) {
		if (c.value === -1) {
			if (begin === 0) begin = i;
			steps++;
		}
	});

	countries.splice(begin, steps);


	document.getElementById('longDescription').innerHTML = longDescription;

	var margin = {
		top: 10, bottom: 10, left: 50, right: 10
	};
	var width = document.getElementById('highchartsPane').clientWidth - margin.left - margin.right,
		height = 400 - margin.bottom - margin.top;

	var color = d3.scale.ordinal()
		.domain([-1, 1, 2, 3, 4, 5])
		.range(['#e0e0e0', '#d7191c', '#fdae61', '#ffe89d', '#abd9e9', '#2c7bb6']);

	var x = d3.scale.ordinal()
		.rangeRoundBands([0, width], 0.2)
		.domain(countries.map(function (c) {
			return c.name;
		}));

	var y = d3.scale.linear()
		.range([height, 0])
		.domain([0, d3.max(countries, function (d) {
			return d.value;
		})]);

	var svg = d3.select('#highchartsPane').append('svg')
		.attr('class', 'indicatorBarChart')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.svg.axis().scale(x).orient("bottom"));

	svg.append("g")
		.attr("class", "y axis")
		.call(d3.svg.axis()
			.scale(y)
			.ticks(6)
			.tickSize(-width)
			.orient("left"))
		.selectAll('text')
		.attr('x', -8)
		.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 5)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text(title+' in '+unit);

	var rect = svg.selectAll(".bar")
		.data(countries)
		.enter().append("g")
		.attr("class", "bar");

	rect.append('rect')
		.attr("x", function (d) {
			return x(d.name);
		})
		.attr("width", x.rangeBand())
		.attr("y", function (d) {
			return y(d.value);
		})
		.attr("height", function (d) {
			return height - y(d.value);
		})
		.style('fill', function (d) {
			return color(d.score);
		});
	//rect.append('text')
	//	.attr("transform", "rotate(-90)")
	//	.attr('y', height)
	//	.text(function (d) {
	//		return d.name;
	//	});

	fillIndicatorDetails(dataIndex);
};

$(document).ready(function () {
	barChart(0);
});
