var indicatorApp = angular.module('indicatorApp', ['angular.filter']);

indicatorApp.controller('MainCtrl', function ($scope) {
    $scope.indicators = indicatorProvider.getAllIndicators();
    $scope.filteredIndicators = indicatorProvider.getAllIndicators();
    $scope.datasource = false;
    $scope.sdgs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];

    var indicatorfilter = {};

    $scope.setIndicator = function (id) {
        $scope.activeIndicator = indicators[id];
        var sortedIndicators = indicatorUtils.sortScoringAsc($scope.activeIndicator.scoring);
        $scope.activeIndicator.lastScoring = _.last(sortedIndicators);
        $scope.activeIndicator.id = id;
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
    }

    function refreshFilter() {
        var indicators = indicatorProvider.getAllIndicators();
        Object.keys(indicatorfilter).forEach(function(key,index) {
            switch (key) {
                case 'datasource':
                    indicators = indicators.filter(function(item) {
                        return item.indicator_source.value === indicatorfilter['datasource']
                    });
                    break;
                case 'responsibility':
                    indicators = indicators.filter(function(item) {
                        return item.ministerial_responsibility.indexOf(indicatorfilter['responsibility']) > -1
                    });
                    break;
                case 'sdg':
                    indicators = indicators.filter(function(item) {
                        return item.sdg.indexOf(indicatorfilter['sdg']) > -1
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
});