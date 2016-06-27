var countryApp = angular.module('CountryComparisonApp', [], function ($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
});

countryApp.controller('CompareCountryCtrl', function ($scope) {


	$scope.indicator = {
		nr: null,
		mouse: false
	};
	$scope.country1 = {name: 'Deutschland'};
	$scope.country2 = {name: 'Frankreich'};
	$scope.country3 = {name: 'Schweden'};
	$scope.countries = indicatorProvider.getSupportedCountries().map(function (d) {
		return {
			name: translate(d),
			n: d
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

});

countryApp.directive('compare', function () {
	return {
		restrict: 'E',
		scope: {
			countries: '=',
			binding: '=',
			name: '=',
			indicator: '='
		},
		templateUrl: 'compare.html',
		link: function (scope) {

		}
	}
});

countryApp.directive('compareViz', function ($timeout) {
	return {
		restrict: 'E',
		scope: {
			name: '=',
			indicator: '='
		},
		templateUrl: 'compare_viz.html',
		link: function (scope, element) {
			var name = translate(scope.name);
			var data = indicatorProvider.getLastScoringForCountry(name)
				.sort(function (a, b) {
					if (a.score < b.score) {
						return -1;
					}
					if (a.score > b.score) {
						return 1;
					}
					return 0;
				});

			scope.data = data;
			var color = d3.scale.ordinal()
				.domain([1, 2, 3, 4, 5, 6])
				.range(['#2c7bb6', '#abd9e9', '#ffe89d', '#fdae61', '#d7191c', '#adadad']);

			var margin = {top: 10, bottom: 10, left: 10, right: 10};
			var width = 500;
			var height = 50 - margin.top - margin.bottom;

			var n = data.length;

			var x = d3.scale.ordinal()
				.domain(d3.range(n));

			var svg = d3.select(element[0])
				.append('svg')
				.attr("width", '100%')
				.attr("height", '100%')
				.attr('viewBox', '0 0 ' + (width) + ' ' + (height + margin.top + margin.bottom))
				.attr('preserveAspectRatio', 'xMaxYMid');

			var div = document.createElement('div');
			div.setAttribute('class', 'highlight-txt');
			var highlight = element[0].appendChild(div);
			highlight.innerText = '';

			redraw(data);
			scope.$watch(function () {
				width = element[0].offsetWidth;
			}, resize);

			function resize() {
				svg.attr('viewBox', '0 0 ' + (width) + ' ' + (height + margin.top + margin.bottom))
					.attr('preserveAspectRatio', 'xMaxYMid');
			}

			scope.$watch('name', function (name) {
				var data = indicatorProvider.getLastScoringForCountry(translate(scope.name))
					.sort(function (a, b) {
						if (a.score < b.score) {
							return -1;
						}
						if (a.score > b.score) {
							return 1;
						}
						return 0;
					});
				redraw(data);
			});

			scope.$watch('indicator.nr', function () {
				showToolTip();
			});
			scope.$watch('indicator.mouse', function () {
				if (scope.indicator.mouse === false) {
					hideToolTip();
				}
			});

			function redraw(data) {

				x.rangeBands([0, width], 0.1);

				var rect = svg.selectAll('.rect')
					.data(data)
					.attr("class", function (d) {
						return "rect id-" + d.indicator;
					})
					.attr('id', function (d) {
						return 'id-' + d.indicator;
					})
					.attr('y', margin.top)
					.attr('height', x.rangeBand())
					.attr("width", x.rangeBand());

				rect.enter().append('rect')
					.attr("class", function (d) {
						return "rect id-" + d.indicator;
					})
					.attr('id', function (d) {
						return 'id-' + d.indicator;
					})
					.attr('height', x.rangeBand())
					.attr("width", x.rangeBand())
					.style('fill', 'white')
					.on('mouseover', function (d) {
						d3.select(this).classed('hover', true);
						d3.selectAll('.id-' + d.indicator)
							.style('stroke', 'black')
							.style('stroke-width', 2);
						$timeout(function () {
							scope.indicator.nr =  d.indicator;
							scope.indicator.mouse = true;
						}, 0);
					})
					.on('mouseout', function (d) {
						d3.select(this).classed('hover', false);
						d3.selectAll('.id-' + d.indicator)
							.style('stroke', 'none');
						$timeout(function () {
							scope.indicator.mouse = false;
						}, 0);
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

			function showToolTip() {
				scope.data.forEach(function (d) {
					if (d.indicator === scope.indicator.nr) {
						console.log(d);
						var val = (d.value === -1) ? 'kein Wert vorhanden' :  (Math.round(d.value * 100) / 100) + ' ' + d.unit;
						div.textContent = d.name + ' ' +val + ' (Optimalwert: ' + d.optimum_value + ' ' + d.unit + ')';
					}
				})
			}

			function hideToolTip() {
				div.textContent = '';
			}
		}
	}
});