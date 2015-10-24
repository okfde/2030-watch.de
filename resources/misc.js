
$('a').click(function(){
    $('html, body').animate({
        scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
    }, 800);
    return false;
});


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
