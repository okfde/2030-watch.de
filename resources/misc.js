
$('a').click(function(){


    var tag='[name="' + $.attr(this, 'href').substr(1) + '"]';

    try {
        $('html, body').animate({
            scrollTop: $(tag).offset().top
        }, 800);
    }
    catch (error) {
        return true;
    }
    return false;
});

function scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

// $('a').click(function(){
//     $('html, body').animate({
//         scrollTop: $( $.attr(this, 'href') ).offset().top
//     }, 500);
//     return false;
// });

// filter tabs
$('#sdgFilter a').click(function (e) {
    alert('SDG');

});
$('#respFilter a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
});

$(window).bind('resize', function(e)
               {
                   if (window.RT) clearTimeout(window.RT);
                   window.RT = setTimeout(function()
                                          {
                                              this.location.reload(false); /* false to get page from cache */
                                          }, 100);
               });

var getIndicatorList = function () {

    return indicators.map(function (elt) {
        return elt["our title"];
    });
}
