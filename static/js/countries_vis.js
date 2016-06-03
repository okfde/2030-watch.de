var countryApp = angular.module('CountryComparisonApp', [], function ($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
});

countryApp.controller('CompareCountryCtrl', function ($scope) {

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

	$scope.filter = ['Allgemeine Verteilung', 'Indikatoren'];
	$scope.selctedfilter = $scope.filter[0];

	$scope.changeFilter = function () {

	};
});

countryApp.directive('compare', function () {
	return {
		restrict: 'E',
		scope: {
			countries: '=',
			binding: '=',
			name: '='
		},
		templateUrl: 'compare.html',
		link: function (scope) {
			scope.change = function () {

			};

		}
	}
});

countryApp.directive('compareViz', function () {
	return {
		restrict: 'E',
		scope: {
			name: '='
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
			console.log(data);
			console.log(element);

			var color = d3.scale.ordinal()
				.domain([1, 2, 3, 4, 5, 6])
				.range(['#2c7bb6', '#abd9e9', '#ffe89d', '#fdae61', '#d7191c','#adadad']);

			var categories = ['sehr hohe Nachhaltigkeit', 'hohe Nachhaltigkeit', 'mittlere Nachhaltigkeit',
				'geringe Nachhaltigkeit', 'sehr geringe Nachhaltigkeit', 'kein Wert vorhanden'];

			//var el = document.getElementById('compare-vis-'+scope.number+'');

			var margin = {top: 10, bottom: 10, left: 10, right: 10};
			var width = 500 - margin.left - margin.right;
			var height = 70 - margin.top - margin.bottom;

			var n = data.length;

			var x = d3.scale.ordinal()
				.domain(d3.range(n))
				.rangeBands([0, width], 0.1, 0.2);

			var svg = d3.select(element[0])
				.append('svg')
				.attr("width", '100%')
				.attr("height", '100%')
				.attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
				.attr('preserveAspectRatio', 'xMaxYMax')
				.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			redraw(data);

			//var legend = svg.selectAll(".legend")
			//	.data(color.domain())
			//	.enter().append("g")
			//	.attr("class", "legend")
			//	.attr("transform", function (d, i) {
			//		return "translate(0, " + (i * 16 - margin.top) + ")";
			//	});
			//
			//legend.append("rect")
			//	.attr("x", width - 13)
			//	.attr("width", 13)
			//	.attr("height", 13)
			//	.style("fill", color);
			//
			//legend.append("text")
			//	.attr("x", width - 24)
			//	.attr("y", 7)
			//	.attr("dy", ".35em")
			//	.style("text-anchor", "end")
			//	.text(function (d) {
			//		return categories[d - 1];
			//	});


			//.on('click', function (d) {
			//    $scope.$apply(function () {
			//        if ($scope.data.length !== $scope.showedData.length) {
			//            // zuerst nach den sdgs suchen
			//            // danach die daten anhand der sdg's filtern
			//            return;
			//        } else {
			//            var data = filterByScoring(d);
			//            $scope.visibility = true;
			//            $scope.detailData = [{
			//                headline: categories[(d.score - 1)],
			//                data: data,
			//                count: data.length,
			//                width: x.rangeBand(),
			//                color: color(d.score)
			//            }];
			//        }
			//    });
			//});



			scope.$watch('name', function (name){
				scope.name = name;
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

			function redraw(data){
				var rect = svg.selectAll('.rect')
					.data(data);

				rect.enter().append('rect')
					.attr("class", "rect")
					.attr('id', function (d) {
						return 'id-' + d.indicator;
					})
					.attr('height', x.rangeBand())
					.attr("width", x.rangeBand())
					.style('fill', 'white')
					.on('mouseover', function () {
						d3.select(this).classed('hover', true);
					})
					.on('mouseout', function () {
						d3.select(this).classed('hover', false);
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
		}
	}
});