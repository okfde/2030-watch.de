var mainVizApp = angular.module('MainVizApp', []);

mainVizApp.controller('MonitoringGermanyCtrl', function ($scope) {

	var dataGermany = indicatorProvider.getLastScoringForCountry("Germany").slice();

	dataGermany.sort(function (a, b) {
		return a.score - b.score;
	});

	var filterByScoring = function (element) {
		var score = element.score;
		var filteredData = dataGermany.filter(function (d) {
			return (d.score === score ? true : false);
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
		return filteredData;
	};

	$scope.data = dataGermany;
	$scope.visibility = false;
	$scope.detailData = null;

	var color = d3.scale.ordinal()
		.domain([1, 2, 3, 4, 5])
		.range(['#2c7bb6', '#abd9e9', '#ffe89d', '#fdae61', '#d7191c']);

	var categories = ['Sehr hohe Nachhaltigkeit', 'hohe Nachhaltigkeit', 'mittlere Nachhaltigkeit',
		'geringe Nachhaltigkeit', 'sehr geringe Nachhaltigkeit', 'kein Wert vorhanden'];

	var el = document.getElementById('newViz');

	var margin = {top: 40, bottom: 10, left: 10, right: 10};
	var width = el.clientWidth - margin.left - margin.right;
	var height = 100 - margin.top - margin.bottom;

	var n = dataGermany.length;

	var x = d3.scale.ordinal()
		.domain(d3.range(n))
		.rangeBands([0, width], 0.1, 0.2);

	var svg = d3.select('#newViz')
		.append('svg')
		.attr("width", '100%')
		.attr("height", '100%')
		.attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
		.attr('preserveAspectRatio', 'xMaxYMax')
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	svg.append('text')
		.attr('y', -10)
		.text('sehr hohe Nachhaltigkeit');

	svg.append('text')
		.attr('y', -10)
		.attr('x', width)
		.style('text-anchor', 'end')
		.text('sehr geringe Nachhaltigkeit');

	var rect = svg.selectAll('.rect')
		.data(dataGermany)
		.enter().append('rect')
		.attr("class", "rect")
		.attr("x", function (d, i) {
			return x(i);
		})
		.attr('height', x.rangeBand())
		.attr("width", x.rangeBand())
		.on('ng-click', 'hello()')
		.style('fill', function (d) {
			return color(d.score);
		})
		.on('mouseover', function () {

		})
		.on('click', function (d) {
			//var appElement = document.querySelector('[ng-app=MainVizApp]');
			var appElement = document.querySelector('[ng-controller=MonitoringGermanyCtrl]');
			var $scope = angular.element(appElement).scope();
			$scope.$apply(function () {
				var data = filterByScoring(d)
				$scope.visibility = true;
				$scope.detailData = {
					headline: categories[(d.score - 1)],
					data: data,
					count: data.length,
					width: x.rangeBand(),
					color: color(d.score)
				};


			});
		});
});

mainVizApp.filter('range', function () {
	return function (val, range) {
		range = parseInt(range);
		for (var i = 0; i < range; i++)
			val.push(i);
		return val;
	};
});

// wie will ich meine datenstruktur haben?

//var visMain = new vis("visPane", dataGermany, 5, "Germany");
//visMain.show(dataGermany, 0);

var filterMainVisBySDG = function (sdg) {
	if (visMain.filterSwitchSDG(sdg) && sdg != undefined) {
		var copy = dataGermany.slice();
		var pred = function (object, index) {
			console.log('index: ' + index);
			return indicators[object.indicator].sdg.indexOf(sdg) > -1;
		};
		var filteredIndicators = copy.filter(pred);
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
			return indicators[object.indicator].ministerial_responsibility.indexOf(responsibilitiesShort[responsibility - 1]) > -1;
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
			var source = indicators[object.indicator].scoring[0].source.value;
			if (status === 1)
				return source != "OKF";
			else
				return source === "OKF";
		};
		visMain.show(copy.filter(pred), 1000);
	}
	else {
		visMain.show(dataGermany, 1000);
	}
};
//
//$(document).ready(function () {
//
//	$('.sdgIcon').click(function (event) {
//		var sdgnumber = parseInt($(event.currentTarget).attr('data-sdg-id'));
//		SDGsClick(sdgnumber);
//	});
//
//
//	// das hier ist die navigation links...großes kino..
//	for (var i = 1; i <= 15; i++) {
//		var handler = function (j) {
//			$('#responsibility' + j).on('mouseout', function (e) {
//				responsibilityMouseOut(j);
//			});
//			$('#responsibility' + j).on('mouseover', function (e) {
//				responsibilityMouseOver(j);
//			});
//			$('#responsibility' + j).on('click', function (e) {
//				responsibilityClick(j);
//			});
//		};
//		handler(i);
//	}
//
//	for (var i = 1; i <= 2; i++) {
//		var handler = function (j) {
//			$('#status' + j).on('mouseout', function (e) {
//				statusMouseOut(j);
//			});
//			$('#status' + j).on('mouseover', function (e) {
//				statusMouseOver(j);
//			});
//			$('#status' + j).on('click', function (e) {
//				statusClick(j);
//			});
//		};
//		handler(i);
//	}
//
//	for (var j = 1; j <= 7; j++) {
//		var handler = function (i) {
//			$('#color-scheme-' + j).on('click', function (event) {
//				changeAllColorSchemes(i - 1, 500);
//			});
//		};
//		handler(j);
//	}
//});
