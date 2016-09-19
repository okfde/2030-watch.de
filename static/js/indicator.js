var indicatorApp = angular.module('indicatorApp', ['angular.filter']);

indicatorApp.directive('scrollOnClick', function() {
    return {
        restrict: 'A',
        link: function(scope, $elm, attrs) {
            var idToScroll = attrs.href;
            $elm.on('click', function() {
                var $target;
                var offset;
                if (idToScroll) {
                    $target = $(idToScroll);
                    offset = $target.offset().top;

                } else {
                    offset = 0;
                }
                $("body").animate({scrollTop: offset}, "slow");
            });
        }
    }
});

indicatorApp.controller('MainCtrl', function ($scope, $location, $anchorScroll) {
    $scope.indicators = indicatorProvider.getAllIndicators();
    $scope.filteredIndicators = indicatorProvider.getAllIndicators();
    $scope.datasource = false;
    $scope.sdgs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
    $scope.publishers = collectDatasources();

    var indicatorfilter = {};

    $scope.init = function() {
        var urlValues = $location.search();
        if (urlValues.indicator) {
            var indicator = $scope.indicators[$location.search().indicator];
            if (indicator) {
                $scope.setIndicator(indicator);
            }
        }
    };

    $scope.setIndicator = function (indicator) {
        $scope.activeIndicator = indicator;
        var sortedIndicators = indicatorUtils.sortScoringAsc($scope.activeIndicator.scoring);
        $scope.activeIndicator.lastScoring = _.last(sortedIndicators);
        var indicatorId = $scope.indicators.indexOf(indicator);
        $scope.activeIndicator.id = indicatorId;
        $location.search({indicator: indicatorId});
        //$anchorScroll();
    };

    $scope.updateFilter = function(type, filter) {
        if (indicatorfilter[type] === filter)
            delete indicatorfilter[type];
        else
            indicatorfilter[type] = filter;
        refreshFilter();
    };

    $scope.isActiveDatasource = function(item) {
        return indicatorfilter['datasource'] === item;
    };

    $scope.isActiveResponsibility = function(item) {
        return indicatorfilter['responsibility'] === item;
    };

    $scope.isActiveSDG = function(item) {
        return indicatorfilter['sdg'] === item;
    };

    $scope.isActiveIndicator = function(id) {
        if ($scope.activeIndicator)
            return $scope.activeIndicator.id === id;
        return false;
    };

    function refreshFilter() {
        var indicators = indicatorProvider.getAllIndicators();
        Object.keys(indicatorfilter).forEach(function(key) {
            switch (key) {
                case 'datasource':
                    indicators = indicators.filter(function(item) {
                        var publishers = getPublishersForIndicator(item);
                        return publishers.indexOf(indicatorfilter.datasource) > -1;
                    });
                    break;
                case 'responsibility':
                    indicators = indicators.filter(function(item) {
                        return item.ministerial_responsibility.indexOf(indicatorfilter.responsibility) > -1;
                    });
                    break;
                case 'sdg':
                    indicators = indicators.filter(function(item) {
                        return item.sdg == indicatorfilter.sdg;
                    });
                    break;
            }
        });
        $scope.filteredIndicators = indicators;

    }

    var resps = [];
    indicatorProvider.getAllIndicators().map(function(ind, index) {
        if (ind.ministerial_responsibility)
            ind.ministerial_responsibility.map(function(resp) {
                resps.push(resp)
            });
    });
    $scope.responsibilities = resps;

    function collectDatasources() {
        var sources = [];
        indicators.map(function(indicator) {
            indicator.scoring.map(function(scoring) {
                sources.push(scoring.source.publisher);
            })
        });
        return _.uniq(sources);
    }

    function getPublishersForIndicator(indicator) {
        var sources = [];

        indicator.scoring.map(function(scoring) {
            sources.push(scoring.source.publisher);
        });

        return sources;
    }
});