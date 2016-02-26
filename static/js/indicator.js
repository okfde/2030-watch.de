/**
 * Created by knutator on 16.02.16.
 */

$(document).ready(function() {

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
            return item['our_title'] === $(me).attr('value')});
        console.log(currentElement);
        updateCurrentIndicator(currentElement);
    })
});

function toggleFilter(selector, classname, element) {
    $(selector).removeClass(classname);
    $(element).toggleClass(classname);

}

function updateCurrentIndicator(indicator) {
    $('#current-indicator-title').html(indicator.our_title);
    $('#current-indicator-description').html(indicator.long_indicator_description_de);
    $('#cuurent-indicator-explanation-of-target').html(indicator.explanation_of_target);
    //$('#current-indicator-responsibility').html()

}