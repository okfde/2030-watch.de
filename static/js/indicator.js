/**
 * Created by knutator on 16.02.16.
 */

var currentIndicator = { indicator: null};
var weekdays = ['Sonntage', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']

$(document).ready(function() {

    rivets.bind($('#current-indicator'), currentIndicator);

    $('.indicator-filter').click(function(event) {
       event.preventDefault();
       $(this).closest('div').next().toggleClass('hidden');
    })
    $('.btn-danger').click(function(event) {
        event.preventDefault();
        toggleFilter('.btn-danger', 'active', this);
    });
    $('.btn-warning').click(function(event) {
        event.preventDefault();
        toggleFilter('.btn-warning', 'active', this);
    });
    $('.btn-primary').click(function(event) {
        event.preventDefault();
        toggleFilter('.btn-primary', 'active', this);
    });
    $('.indicator-element').click(function(event) {
        event.preventDefault();
        var me = this;
        //alert('indicator '+ $(this).attr('value') + ' clicked');
        var currentElement = indicators.find(function(item) {
            return item['title'] === $(me).attr('value')});
        console.log(currentElement);
        currentIndicator.indicator = currentElement;
    })
});

function toggleFilter(selector, classname, element) {
    if ($(element).hasClass(classname)) {
        $(element).removeClass(classname);
    }
    else
    {
        $(selector).removeClass(classname);
        $(element).addClass(classname);
    }
    var activeFilters = {};
    $('a.btn.active').map(function(index, item) {
        activeFilters[$(item).attr('data-filter-type')] = $(item).attr('value');
    });
    filterIndicators(activeFilters);
}

function filterIndicators(filter) {
    $('.hidden').removeClass('hidden');
    $.each(filter, function(index, value) {
        console.log('Index: ' + index + ' Value: ' + value);
        $('li[' + index + '!=' + value + ']').addClass('hidden');
    });
}